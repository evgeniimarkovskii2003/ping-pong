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

<img src="https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C.png">

**2) Условие победы в партии:**

<img src="https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%80%D0%B8%D0%B8.png">

**3) Условие победы в игре:**

<img src="https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%BB%D0%B0%D0%B9%D0%BA%D0%B8.png">





### 4) Значимые фрагменты кода

Фрагмент кода выдачи постов: 
```sh
<?php
	$max_page_posts = 100;
				
	$page = 1;
	if (isset($_GET["page"]) && $_GET["page"] > 0)
		$page = $_GET["page"];
			
	if (($page - 1) * $max_page_posts >= $max_posts)
		$page = ceil($max_posts / $max_page_posts); 
			
	for ($i = 1 + ($max_page_posts * ($page - 1)); $i <= ($max_page_posts*$page); $i++) {				
		
		if ($i > $max_posts)
			break;
				
		[$text, $like, $post_id] = parse_post($i - 1, $result);
		[$comments, $comm_count, $c_id, $sub_comm_count] = parse_comment($post_id, $comments_db);
				
		echo "<tr> <td>";
		include ("post.php");
		echo "</td></tr>";
				
		echo "<tr height = 5> </tr>";
		echo "<tr><td>";
		include ("comments.php"); 
		echo "</td></tr>";
				
		echo "<tr height = 20> <td> <hr> <td> </tr>";
	}
		
?>
```

Фрагмент кода, создающий новую запись о посте в базе данных:
```sh
$sql = "INSERT INTO `posts` (`id`, `text`, `like_count`) VALUES (NULL, '".$text."', '0');";
$link = mysqli_connect("localhost", "admin", "admin", "crud");
mysqli_set_charset($link, "utf8");
$res = mysqli_query($link, $sql);
```
## Вывод
В ходе выполнения лабораторной работы была разработана система клиент-сервер, реализующую механизм CRUD. Был создан анонимный форум, в котором пользователи могут: оставлять записи, ставить реакции, оставлять комментарии. 
