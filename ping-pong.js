const canvas = document.getElementById("ping-pong");
const ctx = canvas.getContext('2d');

const user = { 
    x : 0,
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    match : 0,
    color : "Red"
}
const computer = {
    x : canvas.width - 10,
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    match : 0, 
    color : "Magenta"
}

const ball = {
    x_speed : 7,
    y_speed : 7,
    x : canvas.width/2,
    y : canvas.height/2,
    radius: 10,
    speed : 8,
   	new_speed: 8,
    color : "Yellow"
}

const net = {
    x : (canvas.width - 2) / 2,
    y : 0,
    height : 25,
    width : 20,
    color : "Blue"
}
function drawRect(x, y, w, h, color){ //прорисовка игроков
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color){ //прорисовка мяча
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener("mousemove", getMousePos);
function getMousePos(evt){
    let rect = canvas.getBoundingClientRect(); //получение положения мышки
    user.y = evt.clientY - rect.top - user.height/2;
}

function BallLocation(){ //расположение мяча после выигранного очка
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.x_speed= -ball.x_speed;
    ball.new_speed = ball.speed;
}

function drawNet(){ //прорисовка сетки
    for(let i = 0; i <= canvas.height; i+=40){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

function drawText(text,match, x,y){ //прорисовка текста
    texts = text + '(' + match + ')';
    ctx.fillStyle = 'green';
    ctx.font = "60px fantasy";
    ctx.fillText(texts, x, y);
}

function touch(balls,player){ //столкновение с ракетой
    //текущее расположени ракетки и мяча
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    balls.top = balls.y - balls.radius;
    balls.bottom = balls.y + balls.radius;
    balls.left = balls.x - balls.radius;
    balls.right = balls.x + balls.radius;

    return player.left < balls.right && player.top < balls.bottom && player.right > balls.left && player.bottom > balls.top;
}

function update(){ //вычисление счёта и скорости
    if( ball.x - ball.radius < 0 ){ //касание левой границы
        computer.score++;
        BallLocation();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        BallLocation();
    }

    ball.x += ball.x_speed;
    ball.y += ball.y_speed;
    computer.y += ((ball.y - (computer.y + computer.height/2)))*0.1; //движение компьютера

    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){ //изменение направленяя мяча после касания стенки
        ball.y_speed = -ball.y_speed;
    }

    let player = (ball.x + ball.radius < canvas.width/2) ? user : computer; //определение половины, где находится мяч
    if(touch(ball,player)){
        let collidePoint = (ball.y - (player.y + player.height/2)); //определение точки столкновения
        collidePoint = collidePoint / (player.height/2); //вычисление угла (от - 1 до 1)
        let angleRad = (Math.PI/4) * collidePoint; //отскок в зависимости от части ракетки, куда попал мяч

        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1; //изменение направления, в зависимости от того, кто отбросил мяч
        ball.x_speed = direction * ball.new_speed * Math.cos(angleRad); 
        ball.y_speed = ball.new_speed * Math.sin(angleRad);
        ball.new_speed += 0.2;
    }
}

function Draw(){ //отрисовка игры
    drawRect(0, 0, canvas.width, canvas.height, "lightblue");
    drawText(user.score, user.match, 1.3 * canvas.width/6,canvas.height/12);
    drawText(computer.score,computer.match,6*canvas.width/8,canvas.height/12);
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

function Rules(){ 
	if (user.score == 11) {
		user.score = 0;
		computer.score = 0;
		user.match += 1
	}
	else if (computer.score == 11) {
		user.score = 0;
		computer.score = 0;
		computer.match += 1
	}
    if (user.match < 3 && computer.match < 3){
        update();
        Draw();
    } else if (computer.match > user.match){
        alert("Win computer!");
    } else {
        alert("Win User!");
    }
}

let loop = setInterval(Rules,1000/60);