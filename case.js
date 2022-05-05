// let canvas = document.getElementById('gamezone');
// let context = canvas.getContext('2d');
let canvas = document.getElementById('gamezone');
let ctx = canvas.getContext('2d');
let game = 'start';
let start;
let time = 30;
let score = 0;

// background;
class IMGs {
    constructor(imps, CX, CY, CW, CH) {
        this.imps = imps;
        this.CX = CX;
        this.CY = CY;
        this.CW = CW;
        this.CH = CH;
    }

    draw() {
        let img = new Image();
        img.src = this.imps;
        ctx.drawImage(img, this.CX, this.CY, this.CW, this.CH);
    }
}

class Texts {
    constructor(text, CX, CY) {
        this.text = text;
        this.CX = CX;
        this.CY = CY;
    }

    drawtext() {
        ctx.font = "60px Verdana";
        var gradient = ctx.createLinearGradient(this.CX, this.CY, 1000, 800);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText(this.text, this.CX, this.CY);
    }
}

class Gruond {
    constructor(imps, CX, CY, CW, CH, DX) {
        this.imps = imps;
        this.CX = CX;
        this.CY = CY;
        this.CW = CW;
        this.CH = CH;
        this.DX = -2;
    }

    draw() {
        let img = new Image();
        img.src = this.imps;
        ctx.beginPath();
        ctx.drawImage(img, this.CX, this.CY, this.CW, this.CH);
    }
}

function random(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

class Pipes {
    constructor(CX, CY, space, CH) {
        this.CX = CX;
        this.CY = CY;
        this.CW = 50;
        this.CH = CH;
        this.DX = -2;
        this.space = space;

    }

    draw() {
        let ongtren = new Image();
        let ongduoi = new Image();
        // ongtren.height=this.CH;
        // ongduoi.height=this.CH
        ongtren.src = "https://raw.githubusercontent.com/simplecodecodesimple/Flappy-Bird/master/ongtren.png";
        ongduoi.src = "https://raw.githubusercontent.com/simplecodecodesimple/Flappy-Bird/master/ongduoi.png";
        ctx.beginPath();
        ctx.drawImage(ongtren, this.CX, this.CY, this.CW, this.CH);
        ctx.drawImage(ongduoi, this.CX, this.CY + this.CH + this.space, this.CW, this.CH);
    }
}

let background = new IMGs("https://raw.githubusercontent.com/simplecodecodesimple/Flappy-Bird/master/nenchinh.png", 0, 0, 1000, 700);
let flappybird = new IMGs("http://www.baytekgames.com/wp-content/uploads/2017/06/Flappy_Logo.png", canvas.width / 3, canvas.height / 10, 300, 200);
let getready = new Texts("Get READY", canvas.width / 3, canvas.height / 2);
let bird = new IMGs("https://raw.githubusercontent.com/simplecodecodesimple/Flappy-Bird/master/bird.png", canvas.width / 5, canvas.height / 2 - 200, 50, 50);
let bird1 = new IMGs("https://raw.githubusercontent.com/simplecodecodesimple/Flappy-Bird/master/bird.png", canvas.width / 3, canvas.height / 1.8, 100, 100);
let bird2 = new IMGs("https://raw.githubusercontent.com/simplecodecodesimple/Flappy-Bird/master/bird.png", canvas.width / 2, canvas.height / 1.8, 100, 100);
let bird3 = new IMGs("https://raw.githubusercontent.com/simplecodecodesimple/Flappy-Bird/master/bird.png", canvas.width / 1.5, canvas.height / 1.8, 100, 100);
let ground = new Gruond("gruond.PNG", 0, 700, 1000, 100);
canvas.addEventListener('click', function () {
    switch (game) {
        case 'start':
            game = 'play';
            break;
        case 'play':
            console.log('game play');
            break
        case 'end':
            break;
    }
})
//
let arrGround = [];
let gruond = new Gruond("gruond.PNG", 0, 700, 1000, 100)
arrGround.push(gruond);

function drawArrGruond() {
    arrGround.forEach(gruond => gruond.draw());
}

function updatearrgruond() {
    arrGround.forEach(ground => {
        ground.CX += ground.DX;
    })
    if (arrGround[0].CX <= 1000) {
        let ground = new Gruond("gruond.PNG", 0, 700, 1000, 100);
        arrGround.push(ground)
        arrGround.splice(0, 1)
    }

}


//
let arrPipe = [];
let pipe = new Pipes(1000, 0, 200, 300);
arrPipe.push(pipe);

//
function drawArrPipe() {
    arrPipe.forEach(pipes => pipes.draw());
}

function updatearrPipe() {
    arrPipe.forEach(pipes => {
        pipes.CX += pipes.DX;
    })
    let radomHeight = random(250, 500)

    if (arrPipe[0].CX == 500) {
        let pipe = new Pipes(1000, 0, 200, 300);
        arrPipe.push(pipe)
    }

    if (arrPipe[0].CX <= 0 - arrPipe[0].CW) {
        arrPipe.splice(0, 1)
        let pipe = new Pipes(1000, 0, 200, radomHeight);
        arrPipe.push(pipe)
    }

}

function Bird() {
    bird.CY += 3;
    if (bird.CY + bird.CH >= 700) {
        game = "end";
        bird.CY = 700;
    }
    if (bird.CX + bird.CW > arrPipe[0].CX && bird.CX < arrPipe[0].CX + arrPipe[0].CW && (
        bird.CY < arrPipe[0].CY + arrPipe[0].CH || bird.CY + bird.CH > arrPipe[0].CY + arrPipe[0].CH + arrPipe[0].space
    )) {
        game = "end";
    }
    if (bird.CX == arrPipe[0].CX + 30 || bird.CX == arrPipe[0].CX + 29) {
        score++;
        time--;
    }
    let score1 = new Texts("SCORE: " + score, 100, 100)
    return score1.drawtext();
}

function update() {
    if (game == "play") {
        updatearrgruond();
        updatearrPipe();
        Bird();
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (game == "start") {
        background.draw();
        flappybird.draw();
        getready.drawtext();
        bird1.draw();
        bird2.draw();
        bird3.draw();
        ground.draw();


    }
    if (game == "play") {
        background.draw();
        drawArrPipe();
        drawArrGruond();
        bird.draw();
        update();
    }
    if (game == "end") {
        background.draw();
        drawArrGruond();
        let score1 = new Texts("SCORE: " + score, 100, 100)
        score1.drawtext();
        let gameover = new Texts("Game Over", 250, 400);
        gameover.drawtext();
    }
}

document.addEventListener("keydown", function () {
    bird.CY -= 50;
})
animate();
