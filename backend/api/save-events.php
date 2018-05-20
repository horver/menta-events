<?php

    $data = file_get_contents("php://input");

    $data_file = fopen("../../data/events.json", "w");
    fwrite($data_file, $data);
    fclose($data_file);
?>