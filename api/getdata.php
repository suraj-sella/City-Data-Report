<?php
    //Parameters
    $host = "localhost";
    $user = "root";
    $pass = "";
    $databaseName = "assignment";
    $tableName = "citydata";

    // Connection To DB
    $con = mysqli_connect($host, $user, $pass, $databaseName);

    // Check connection
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    // Fetch Data From Table
    $area = $_POST['area'];
    if($area==''){
        $area = 10000;
    }
    $height = $_POST['height'];
    if($height==''){
        $height = 0;
    }
    $growth = $_POST['growth'];
    if($growth==''){
        $growth = 0;
    }
    $birthmin = $_POST['birthmin'];
    if($birthmin==''){
        $birthmin = 0;
    }
    $birthmax = $_POST['birthmax'];
    if($birthmax==''){
        $birthmax = 2000;
    }
    $populationmin = $_POST['populationmin'];
    if($populationmin==''){
        $populationmin = 0;
    }
    $populationmax = $_POST['populationmax'];
    if($populationmax==''){
        $populationmax = 10000000;
    }
    $sql = "SELECT * FROM " . $tableName . " WHERE area <= " . $area . " AND height >= " . $height . " AND growth >= " . $growth . " AND births BETWEEN " . $birthmin . " AND " . $birthmax . " AND population BETWEEN " . $populationmin . " AND " . $populationmax;
    // echo $sql;die();
    if($result = mysqli_query($con, $sql)){
        while($row = $result->fetch_assoc()){
            if($row['height']!==NULL){
                $row['height'] = trim(mb_convert_encoding($row['height'], 'UTF-8', 'UTF-8'), '?');
            }
            $rows[] = $row;
        }
        
        // Freeing The Result Set
        mysqli_free_result($result);
        
        // Closing Connection
        mysqli_close($con);
        
        // Send Data To Ajax
        echo json_encode($rows);
    }
?>