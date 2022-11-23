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


    $inicio = $_GET['inicio'];
		$fin = $_GET['fin'];

    $empleado = $_GET['emp'];


    

    if($inicio=='' && $fin==''){
      $sql = "select r.*, count(*) conteo from tiendas.rechazos r";
    }else if($inicio=='' && $fin!=''){
      $sql = "select r.*, count(*) conteo from tiendas.rechazos r where r.fecha <= '$fin'";
    }else if($inicio!='' && $fin==''){
      $sql = "select r.*, count(*) conteo from tiendas.rechazos r where r.fecha >= '$inicio'";
    }else{
      $sql = "select r.*, count(*) conteo from tiendas.rechazos r where r.fecha >= '$inicio' AND r.fecha <= '$fin'";
    }

    
    
   
  

    //echo json_encode($sql);
   if($empleado==0){
     $sql .= " group by usuario_rechazado order by count(*) desc;";
    }else{
     $sql .= " group by usuario_empleado order by count(*) desc;";
    }

    //echo json_encode($sql);
  
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