<?php
    header("Content-Type: application/json; charset=UTF-8");
    
    $shalt = "&feplERko";
    $results = array();
    $results["success"] = false;

    $data = file_get_contents("key.txt");
    $pass = file_get_contents("php://input");
    if ( sha1($pass.$shalt) == $data) 
        $results["success"]=true;
    
    echo json_encode($results);
?>