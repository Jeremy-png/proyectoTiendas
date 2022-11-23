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
    $tienda=$_GET['tienda'];


    $sql = "SELECT c.id, c.comentario_padre parentId, c.comentario body, c.tienda, c.fecha createdAt, c.id_usuario, u.firstName username FROM comentarios c inner join usuarios u on c.id_usuario = u.id where c.id_producto = '$id' AND c.tienda='$tienda' having like_ratio(c.id)>-20;";
  
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