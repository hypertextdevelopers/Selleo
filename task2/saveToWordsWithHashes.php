<?php

    $g = $_POST['hashes'];

    $encode = json_decode($g);
    var_dump($encode);

    foreach($encode as $row){

        file_put_contents('./words_with_hashes.txt', $row->word."   ".$row->hash."\r\n" , FILE_APPEND);

    };

?>