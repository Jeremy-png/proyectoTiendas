<?php
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $mysqli->set_charset('utf8');

	  $xml = $_FILES['xml'];



    copy($_FILES['xml']['tmp_name'],$_FILES['xml']['name']);
	$products = simplexml_load_file(str_replace("\\", "/", $_FILES['xml']['tmp_name']));
	foreach($products as $product){
   
      $sql = "call carga_productos('$product->id', '$product->tienda', '$product->descripcion', '$product->precio', '$product->nombre', '$product->categoria', '$product->img1', '$product->img2', '$product->img3');";
      echo json_encode($sql);
    

    if ($method == 'POST'){
      $result = mysqli_query($mysqli,$sql);  
    }
		
  }

// Assign values


    
   /* if ($method == 'POST') {
        echo json_encode($result);
      } else {
        echo mysqli_affected_rows($sql);
      }*/
      $mysqli->close();
?>