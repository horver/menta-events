<?php
    header("Content-Type: application/json; charset=UTF-8");
    
    $data = file_get_contents("../../data/events.json");

    echo $data;
?>