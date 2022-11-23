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

	  $user = $dataObject-> usuario;
    $empleado = $dataObject-> empleado;
    $razon = $dataObject-> razon;
    $contenido = $dataObject-> contenido;
    $id = $dataObject-> id;

    $sql = "INSERT INTO `rechazos` (`usuario_rechazado`, `usuario_empleado`, fecha, tipo_contenido, razon) VALUES ('$user', '$empleado', now(), '$contenido', '$razon');";
   
    if($contenido=='t'){
      $sql2 = "Delete from tiendas_pendientes where id='$id';";
      $sql3 = "Delete from categorias_tiendas_pendientes where id_tienda='$id';";
    }elseif($contenido=='c'){
      $sql2 = "Delete from comentarios_pendientes where id='$id';";
    }else {
      $sql2 = "Delete from productos_pendientes where id='$id';";
      $sql3 = "Delete from categorias_productos_pendientes where id_producto='$id';";
      $sql4 = "Delete from fotos_productos_pendientes where id_producto='$id';";
    }
  
  
    echo $sql;
    if ($method == 'POST'){
    $result = mysqli_query($mysqli,$sql);
    $result2 = mysqli_query($mysqli,$sql2);
    $result3 = mysqli_query($mysqli,$sql3);
    $result4 = mysqli_query($mysqli,$sql4);
    }
    
   /* if ($method == 'POST') {
        echo json_encode($result);
      } else {
        echo mysqli_affected_rows($sql);
      }*/
      $mysqli->close();
?>