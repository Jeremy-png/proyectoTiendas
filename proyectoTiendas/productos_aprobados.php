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

    $id = $_GET['id'];

    $sql = "SELECT * FROM productos_aprobados p INNER JOIN fotos_productos f ON p.id = f.id_producto INNER JOIN categoria_producto cp ON p.id = cp.id_producto INNER JOIN categorias c ON c.id = cp.id_categoria where p.id = '$id'";
  
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