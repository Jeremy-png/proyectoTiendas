<?php
header('Access-Control-Allow-Origin: ');
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
    $descripcion = $dataObject-> descripcion;
    $precio = $dataObject-> precio;
    $img1 = $dataObject-> img1;
    $img2 = $dataObject-> img2;
    $img3 = $dataObject-> img3;
    $idTienda=$dataObject-> idTienda;
    $categorias = $dataObject-> categorias;

    $sql = "call nuevo_producto('$idTienda', '$descripcion', '$precio','$nombre', '$img1', '$img2', '$img3');";
    $sql2 = "select id from productos_pendientes order by id desc;";
    //$sql = "INSERT INTO usuarios (firstName, lastName, correo, contrasena, id_tipousuario) VALUES ('$firstName', '$lastName', '$correo', '$contrasena', '3');";

    echo $sql;
    if ($method == 'POST'){
    $result = mysqli_query($mysqli,$sql);
    $result2 = mysqli_query($mysqli,$sql2);

    $info = mysqli_fetch_assoc($result2);
    $prodID=$info['id'];

    echo $prodID;

    for($i= 0; $i<count($categorias); $i++){
      $cat = $categorias[$i]->value;
      $sql3="Insert into categorias_productos_pendientes (id_categoria, id_producto) values ('$cat', '$prodID');";
      $result3 = mysqli_query($mysqli,$sql3);
      echo $cat;
    }


    }

   /* if ($method == 'POST') {
        echo json_encode($result);
      } else {
        echo mysqli_affected_rows($sql);
      }*/
      $mysqli->close();
?>