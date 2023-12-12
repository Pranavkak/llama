const socket = io();

var arena = document.getElementById("arena");
var submit = document.getElementById("sub");
var go = document.getElementById("go"); //add event listerner to this to send commands to arduino
var clear = document.getElementById("clr");
var reset = document.getElementById("res");
var question = document.getElementById("question");
var response = document.getElementById("response");
var tex = document.getElementById("text");
var coordinates = "00";

var player = "none";
var switcher1 = document.getElementById("switcher1");
switcher1.addEventListener("click", function () {
    player = "master";
});
var switcher2 = document.getElementById("switcher2");
switcher2.addEventListener("click", function () {
    player = "normie";
});


document.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            var button = document.createElement("button");
            button.innerHTML = i + '' + j;
            button.classList.add("btn");
            arena.appendChild(button);
            if (i == 0 && j == 0) {
                button.classList.add("btn-active");
            }
            button.addEventListener("click", function () {
                socket.emit('active', {coor:this.innerHTML , role: player});
            });
            //
            button.addEventListener("keydown", function(event) {
                if (event.key === "w")
                    socket.emit('wall', this.innerHTML );
                if (event.key === "r")
                    socket.emit('red', this.innerHTML );
                if (event.key === "g")
                    socket.emit('green', this.innerHTML );
                if (event.key === "b")
                    socket.emit('blue', this.innerHTML );
                if (event.key === "c")
                    socket.emit('cat', this.innerHTML );
                if (event.key === "m")
                    socket.emit('mouse', this.innerHTML );
            });
            //
        }
    }
});
socket.on('active', (payload) => {
    if(payload.role == "master"){
        var buttons = document.querySelectorAll(".btn");
        buttons.forEach(function (button) {
            if (button.innerHTML == payload.coor) {
                button.classList.add("btn-active");
            }
        });//select the newly active one
        coordinates = coordinates + ',' + payload.coor; //update coordinates
        response.innerHTML = response.innerHTML + payload.coor + ','; //what is the new response
    }
});
//
socket.on('wall', (something) => {
    var buttons = document.querySelectorAll(".btn");
        buttons.forEach(function (button) {
            if (button.innerHTML == something) {
                button.classList.add("wall");
            }
    });
});
socket.on('red', (something) => {
    var buttons = document.querySelectorAll(".btn");
        buttons.forEach(function (button) {
            if (button.innerHTML == something) {
                button.classList.add("red");
            }
    });
});
socket.on('green', (something) => {
    var buttons = document.querySelectorAll(".btn");
        buttons.forEach(function (button) {
            if (button.innerHTML == something) {
                button.classList.add("green");
            }
    });
});
socket.on('blue', (something) => {
    var buttons = document.querySelectorAll(".btn");
        buttons.forEach(function (button) {
            if (button.innerHTML == something) {
                button.classList.add("blue");
            }
    });
});
socket.on('mouse', (something) => {
    var buttons = document.querySelectorAll(".btn");
        buttons.forEach(function (button) {
            if (button.innerHTML == something) {
                button.classList.add("mouse");
            }
    });
});
socket.on('cat', (something) => {
    var buttons = document.querySelectorAll(".btn");
        buttons.forEach(function (button) {
            if (button.innerHTML == something) {
                button.classList.add("cat");
            }
    });
});
//

clear.addEventListener("click", function () {
    if(player != "none"){
        coordinates = coordinates.slice(-2);
        socket.emit('clear', coordinates);
    }
});
socket.on('clear', (coor) => {
    response.innerHTML = "";
    question.innerHTML = "";
    coordinates = coor;
    var buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button) {
        button.classList.remove("btn-active");
    });
    buttons.forEach(function (button) {
        if (button.innerHTML == coor) {
            button.classList.add("btn-active");
        }
    });
});


reset.addEventListener("click", function () {
    if(player != "none")
        socket.emit('reset');
});
socket.on('reset', () => {
    response.innerHTML = "";
    question.innerHTML = "";
    coordinates = "00"
    var buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button) {
        button.classList.remove("btn-active");

    });
    buttons.forEach(function (button) {
        if (button.innerHTML == coordinates) {
            button.classList.add("btn-active");
        }
    });
});


submit.addEventListener("click", function () {
    if(player != "none")
        socket.emit('submit', tex.value);

});
socket.on('submit', (submission) => {
    question.innerHTML = submission;
    tex.value = "";
});


go.addEventListener("click",function(){
    socket.emit('go',coordinates);
})