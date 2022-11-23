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

    $sql = "select * from (select p.id_producto id, getLink(p.id_producto, 0) link, GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') categorias FROM categoria_producto p inner join categorias c where p.id_categoria = c.id group by id_producto) l inner join productos_aprobados on l.id = productos_aprobados.id where productos_aprobados.id_tienda = '$id';";
  
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