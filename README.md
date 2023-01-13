# lab4
## Цель работы
Разработать и реализовать игру пинг-понг. Для отрисовки вида используется canvas. Игра завершается при достижении нужного счёта одним из игроков.

## Ход работы

### 1) Разработка пользовательского интерфейса

[Пользовательский интерфейс](https://www.figma.com/file/R5sTZRMo1JGB2srim3KWYp/Untitled?node-id=0%3A1&t=5rPowaLivv0hOcEg-0)
![Пользовательский интерфейс](https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%812.PNG)

### 2) Описание пользовательских сценариев работы
Пользователь заходит на сайт и попадает на главную страницу. 
У пользователя есть возможности:
- Опубликовать новую запись на форуме.

Для того, чтобы опубликовать новую запись пользователю необходимо ввести текст (от 4 до 900 символов) в поле, в котором написано "Напишите ваш пост", после чего нажать кнопку "отправить".

- Поставить лайк на записи, которые публиковались ранее. 


Пользователю нужно нажать на кнопку с лайком и количество лайков увеличится. Количество реакций не ограничено (до 999).
- Комментировать запись

Чтобы прокомментировать запись, пользователю необходимо нажать на кнопку "Показать комментарии", после чего нужно в поле "Напишите комментарий" написать текст(от 4 до 200 символов), который он бы хотел сделать к этой записи сделать. Нажать на кнопку "Ответить".

- Оставить комментарий к комментарию

Для того, чтобы ответить пользователю, который оставил комментарий необходимо под его комментарием ввести текст в поле (от 4 до 200 символов), в котором написано "Ответить" и нажать на кнопку "Ответить".

- Перемещение по страницам форума и чтение
 
С помощью стрелок можно перемещаться и смотреть новые и старые записи. Нажав на стрелку вправо, пользователь переходит к более старым записям. Если нажата левая стрелка, то пользователь возвращается к более новым записям. При нажатии на "домик", пользователь возвращается на главную старницу.

### 3) Описание алгоритмов

**1) Новая запись:**

<img src="https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C.png">

**2) Комментарий:**

<img src="https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%80%D0%B8%D0%B8.png">

**3) Реакция:**

<img src="https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%BB%D0%B0%D0%B9%D0%BA%D0%B8.png">

**4) Переключение между страницами:**

<img src="https://github.com/evgeniimarkovskii2003/lab2/blob/main/%D0%BF%D1%80%D0%BE%D0%BB%D0%B8%D1%81%D1%82%D1%8B%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.png">



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
