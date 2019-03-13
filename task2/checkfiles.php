<?php

    $checkWordList = file_get_contents('./word_list.txt');

    if($checkWordList != ""){
        echo "no";
    }else{
        echo "yes";
    }

?>