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

    $sql = "SELECT tiendas.*, AVG(ratingtienda.rating) promedio FROM tiendas inner join ratingtienda on tiendas.id = ratingtienda.tiendaID group by ratingtienda.tiendaID order by AVG(ratingtienda.rating) limit 5; ";
  
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