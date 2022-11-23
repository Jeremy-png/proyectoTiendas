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


    

    if($inicio=='' && $fin==''){
      $sql = "select count(u.id) comentarios, u.id, c.fecha, u.firstName, u.lastName, c.tienda, c.id_producto from usuarios u inner join comentarios c on u.id = c.id_usuario where 1 = 1";
    }else if($inicio=='' && $fin!=''){
      $sql = "select count(u.id) comentarios, u.id, c.fecha, u.firstName, u.lastName, c.tienda, c.id_producto from usuarios u inner join comentarios c on u.id = c.id_usuario where c.fecha <= '$fin'";
    }else if($inicio!='' && $fin==''){
      $sql = "select count(u.id) comentarios, u.id, c.fecha, u.firstName, u.lastName, c.tienda, c.id_producto from usuarios u inner join comentarios c on u.id = c.id_usuario where c.fecha >= '$inicio'";
    }else{
      $sql = "select count(u.id) comentarios, u.id, c.fecha, u.firstName, u.lastName, c.tienda, c.id_producto from usuarios u inner join comentarios c on u.id = c.id_usuario where c.fecha >= '$inicio' AND c.fecha <= '$fin'";
    }

    
    
    $sql .= " group by u.id order by count(u.id) desc;";
  

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
        echo json_encode($resultados);
      } else {
        echo mysqli_affected_rows($sql);
      }
      $mysqli->close();
?>