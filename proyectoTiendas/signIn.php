<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();

	/*$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);  */  
    session_start();    
    $mysqli->set_charset('utf8');


    $correo = $_POST ['correo'];
    $contrasena = $_POST ['contrasena'];

    $sql = "SELECT * FROM `usuarios` WHERE `correo` = '$correo' AND `contrasena` = '$contrasena';" ;
  
    
    if ($method == 'POST'){
    $result = mysqli_query($mysqli,$sql);
    $count = mysqli_num_rows($result);
    if ($count == 1){
        $resultados = array();
        while($fila = mysqli_fetch_assoc($result)){
            $resultados[] = $fila;
            
        }
        echo json_encode($resultados[0]);
    } else http_response_code(404);

    }
    
      $mysqli->close();
?>