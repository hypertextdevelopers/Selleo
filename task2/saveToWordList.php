<?php

    ini_set('max_execution_time', 0);

    $words = $_POST['words'];

    $readyFile = json_decode($words);

    foreach ($readyFile as $word) {

        file_put_contents('./word_list.txt', $word."\r\n", FILE_APPEND);

    }

?>