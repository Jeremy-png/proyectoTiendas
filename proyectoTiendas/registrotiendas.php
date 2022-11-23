<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $mysqli->set_charset('utf8');

	$nombre = $dataObject-> nombre;
    $longitud = $dataObject-> longitud;
    $latitud = $dataObject-> latitud;
    $descripcion = $dataObject-> descripcion;
    $link = $dataObject-> link;
    $telefono = $dataObject-> telefono;
    $logotipo = $dataObject-> logotipo;
    $id_usuario = $dataObject-> id_usuario;
    $zona = $dataObject-> zona;
    $municipio = $dataObject-> municipio;
    $departamento = $dataObject-> departamento;
    $categorias = $dataObject-> categorias;


    $sql = "INSERT INTO `tiendas_pendientes` (nombre, longitud, latitud, link, telefono, descripcion, foto_logo, id_usuario, zona, municipio, departamento) VALUES ('$nombre', '$longitud', '$latitud', '$link', '$telefono', '$descripcion', '$logotipo', '$id_usuario', '$zona', '$municipio', '$departamento');";
    $sql2 = "select id from tiendas_pendientes order by id desc;";


    if ($method == 'POST'){
      $result = mysqli_query($mysqli,$sql);
      $result2 = mysqli_query($mysqli,$sql2);
  
      $info = mysqli_fetch_assoc($result2);
      $prodID=$info['id'];
  
      //echo $prodID;
  
      for($i= 0; $i<count($categorias); $i++){
        $cat = $categorias[$i]->id;
        $sql3="Insert into categorias_tiendas_pendientes (id_categoria, id_tienda) values ('$cat', '$prodID');";
        $result3 = mysqli_query($mysqli,$sql3);
        echo json_encode($categorias);
      }
    }
    
   /* if ($method == 'POST') {
        echo json_encode($result);
      } else {
        echo mysqli_affected_rows($sql);
      }*/
      $mysqli->close();
?>