# lab4
## Цель работы
Разработать и реализовать игру пинг-понг. Для отрисовки вида используется canvas. Игра завершается при достижении нужного счёта одним из игроков.

## Ход работы

### 1) Разработка пользовательского интерфейса

[Пользовательский интерфейс](https://www.figma.com/file/TwAftJMGVcVuqynRlKpPAo/Untitled?t=EufwWkbxpgjCXBv5-0)
![Пользовательский интерфейс](https://github.com/evgeniimarkovskii2003/lab4/blob/main/UI.PNG)

### 2) Описание пользовательских сценариев работы
Пользователь заходит на сайт и попадает на главную страницу. 

У пользователя есть возможность сыграть в игру пинг-понг против компьютера. 

Игра проходит из 5 партий, до трех побед. Кто первый выиграет три партии, каждая из которых до 11 очков, тот побеждает.

Для того, чтобы играть, нужно попадать ракеткой в мячик. Если мячик пересекает вашу границу, а вы по нему не попадаете ракеткой, то очко присуждается сопернику и наоборот. 

Мячик с каждым касанием ракетки ускоряется на 0,1с. Каждое новое очко ускорение сбрасывается до начального.

В конце игры программа выдаст, кто победил, после чего можно перезагрузить сайт и сыграть повторно.
### 3) Описание алгоритмов

**1) Розыгрыш очка:**

<img src="https://github.com/evgeniimarkovskii2003/lab4/blob/main/point%20draw.png">

**2) Условие победы в партии:**

<img src="https://github.com/evgeniimarkovskii2003/lab4/blob/main/victory%20condition%20in%20the%20game.png">

**3) Условие победы в игре:**

<img src="https://github.com/evgeniimarkovskii2003/lab4/blob/main/match%20win%20condition.png">





### 4) Значимые фрагменты кода

Столкновение мяча с ракеткой: 
```sh
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
```

Определение победителя:
```sh
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
```
## Вывод
В ходе выполнения лабораторной работы была игра пинг-понг, которая позволяет пользователю играть против компьютера. При разработке игры был использован canvas.
