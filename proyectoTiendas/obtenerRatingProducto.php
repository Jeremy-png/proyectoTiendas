<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();
    
    session_start();    
    $mysqli->set_charset('utf8');

    $id=$_GET['id'];

    $sql = "select avg(rating) from ratingproducto where productID = '$id'";
  
    if ($method == 'GET'){
    $result = mysqli_query($mysqli,$sql);
    $count = mysqli_num_rows($result);
    }
    
    if ($method == 'GET') {
        if ($count == 1){
            $resultados = mysqli_fetch_assoc($result);
            echo json_encode($resultados);
        }else{
            echo json_encode(array('id'=>0));
        }
    }
      $mysqli->close();
?>