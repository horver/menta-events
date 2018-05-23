<?php

    $data = file_get_contents("php://input");
    $file = "../../data/events.json";
    if (!file_exists($file)) {
        print "File not found";
    }
    else if(!$data_file = fopen($file, "w")) {
        print "Can't open file";
    }
    else {
        fwrite($data_file, $data);
        fclose($data_file);
    }
    
?>