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

    $busqueda = $_GET['filtro'];

    if($busqueda==''){
      $sql = "select * from (select t.*, tiendas.getCategorias(t.id) categorias from tiendas.tiendas t) l;";
    }else{
      $sql = "select * from (select t.*, tiendas.getCategorias(t.id) categorias from tiendas.tiendas t) l where nombre like '%$busqueda%' or longitud  like '%$busqueda%' or latitud like '%$busqueda%' or telefono like '%$busqueda%' or zona like '%$busqueda$%' or departamento  like '%$busqueda%' or municipio like '%$busqueda%' or categorias like '%$busqueda%' or l.descripcion like '%$busqueda%';";
    }
    
  
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