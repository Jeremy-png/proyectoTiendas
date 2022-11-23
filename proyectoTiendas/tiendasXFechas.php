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

    $date1=$_GET['date1'];
    $date2=$_GET['date2'];

    $sql = "SELECT * FROM `productos_aprobados` WHERE (fecha BETWEEN '$date1' AND '$date2');";
  
    if ($method == 'GET'){
        $result = mysqli_query($mysqli,$sql);
        }
        
        if ($method == 'GET') {
            $resultados = array();
            while($fila = mysqli_fetch_assoc($result)){
                $resultados[] = $fila;
            }
            echo json_encode($resultados);
          } else {
            echo mysqli_affected_rows($sql);
          }
          $mysqli->close();
?>