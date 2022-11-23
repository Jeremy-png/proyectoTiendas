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
		


    
      $sql = "SELECT * FROM home_box where id = $id;";
    

    
  

    //echo json_encode($sql);
   /*if(count($filtros)==0){
      $sql .= ";";
    }else if(count($filtros)==1){
      $sql .= " order by $filtros[0] asc;";
    }else if(count($filtros)==2){
      $sql .= " order by $filtros[0] asc, $filtros[1] asc;";
    }else{
      $sql .= " order by $filtros[0] asc, $filtros[1] asc, $filtros[2] asc;";
    }
    */

    //echo json_encode($sql);
  
    if ($method == 'GET'){
    $result = mysqli_query($mysqli,$sql);
    
    }
    
    if ($method == 'GET') {
        $resultados = array();
        while($fila = mysqli_fetch_assoc($result)){
            $resultados[] = $fila;
        }
        echo json_encode($resultados[0]);
      } else {
        echo mysqli_affected_rows($sql);
      }
      $mysqli->close();
?>