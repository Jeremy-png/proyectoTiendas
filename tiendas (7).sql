-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2022 a las 04:08:09
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendas`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `aprobar_comentario` (`id_p_p` INT)   BEGIN
  declare padre_p int; 
  declare comentario_p varchar(500); 
  declare id_usuario_p int;
  declare tienda_p tinyint(1);
  
  declare fecha_p date;
  declare producto_p int;
 
  select comentario_padre, comentario, id_usuario, tienda, fecha, id_producto into padre_p, comentario_p, id_usuario_p, tienda_p, fecha_p, producto_p from comentarios_pendientes where id=id_p_p;
  
  insert into comentarios values (id_p_p, padre_p, comentario_p, id_usuario_p, tienda_p, fecha_p, producto_p);
  
  delete from comentarios_pendientes where id=id_p_p;
 
  commit;
  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `aprobar_producto` (`id_p_p` INT)   BEGIN
  declare id_tienda_p int; 
  declare descripcion_p varchar(200); 
  declare precio_p float;
  declare nombre_p varchar(50);
  
  declare img1_p varchar(250);
  declare img2_p varchar(250);
  declare img3_p varchar(250);
  
  declare id_img int;
  declare contador int;
  declare done boolean DEFAULT FALSE;
  declare cat_v int;
  
  DECLARE cur1 CURSOR FOR SELECT id_categoria FROM categorias_productos_pendientes;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  Select id_tienda into id_tienda_p from productos_pendientes where id = id_p_p;
  Select descripcion into descripcion_p from productos_pendientes where id = id_p_p;
  Select precio into precio_p from productos_pendientes where id = id_p_p;
  Select nombre into nombre_p from productos_pendientes where id = id_p_p;
  
  select link into img1_p from fotos_productos_pendientes where id_producto = id_p_p limit 1;
  select link into img2_p from fotos_productos_pendientes where id_producto = id_p_p limit 1 offset 1;
  select link into img3_p from fotos_productos_pendientes where id_producto = id_p_p limit 1 offset 2;
  
  select count(*) into contador from productos_aprobados where id = id_p_p;
  
  DELETE FROM fotos_productos_pendientes WHERE `fotos_productos_pendientes`.`id_producto` = id_p_p;
  DELETE FROM fotos_productos WHERE `fotos_productos`.`id_producto` = id_p_p;

 
  
  if contador = 0 then 
     INSERT INTO `productos_aprobados` (id, id_tienda, descripcion, precio, nombre, fecha, habilitado) VALUES (id_p_p, id_tienda_p, descripcion_p, precio_p, nombre_p, now(), 1);
  else
     UPDATE `productos_aprobados` SET `id_tienda` = id_tienda_p, `descripcion` = descripcion_p, `precio` = precio_p, `nombre` = nombre_p, fecha=now() WHERE `id` = id_p_p;
  end if;
 
  
  Insert into fotos_productos (id_producto, link) values (id_p_p, img1_p);
  
  Insert into fotos_productos (id_producto, link) values (id_p_p, img2_p);
  
  Insert into fotos_productos (id_producto, link) values (id_p_p, img3_p);
  
  
  OPEN cur1;
  
  read_loop: LOOP
    FETCH cur1 INTO cat_v;
    IF done THEN
      LEAVE read_loop;
    END IF;

      INSERT INTO categoria_producto (id_producto, id_categoria) values (id_p_p, cat_v);
   
  END LOOP read_loop;
 
  
  CLOSE cur1;
  
  DELETE FROM categorias_productos_pendientes WHERE `categorias_productos_pendientes`.`id_producto` = id_p_p;
  DELETE FROM productos_pendientes WHERE id = id_p_p;
  
  commit;
  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `aprobar_tienda` (`id_p_p` INT)   BEGIN
	 declare nombre_p varchar(100); 
  declare longitud_p varchar(100); 
  declare latitud_p varchar(100); 
  
  declare link_p varchar(150);
  declare telefono_p int;
  declare descripcion_p varchar(200);
  
  declare foto_logo_p varchar(250);
  
  declare id_usuario_p int;
  declare zona_p int;
  declare departamento_p varchar(50);
  declare municipio_p varchar(50);
  
  
  
  declare contador int;
  declare done boolean DEFAULT FALSE;
  declare cat_v int;
  
  DECLARE cur1 CURSOR FOR SELECT id_categoria FROM categorias_tiendas_pendientes;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  Select nombre, longitud, latitud, link, telefono, descripcion, foto_logo, id_usuario, zona, departamento, municipio into nombre_p, longitud_p, latitud_p, link_p, telefono_p, descripcion_p, foto_logo_p, id_usuario_p, zona_p, departamento_p, municipio_p from tiendas_pendientes where id = id_p_p;

  
  select count(*) into contador from tiendas where id = id_p_p;
  

 
  
  if contador = 0 then 
     INSERT INTO `tiendas` (`id`, `nombre`, `longitud`, `latitud`, `link`, `telefono`, `descripcion`, `foto_logo`, `habilitado`, `id_usuario`, `zona`, `departamento`, `municipio`) VALUES (id_p_p, nombre_p, longitud_p, latitud_p, link_p, telefono_p, descripcion_p, foto_logo_p, 1, id_usuario_p, zona_p, departamento_p, municipio_p);
  else
     UPDATE `tiendas` SET `nombre` = nombre_p, `longitud` = longitud_p, `latitud` = latitud_p, `link` = link_p, telefono = telefono_p, descripcion = descripcion_p, foto_logo = foto_logo_p, id_usuario = id_usuario_p, zona = zona_p, departamento = departamento_p, municipio = municipio_p WHERE `id` = id_p_p;
  end if;
 
 
  
  
  OPEN cur1;
  
  read_loop: LOOP
    FETCH cur1 INTO cat_v;
    IF done THEN
      LEAVE read_loop;
    END IF;

      INSERT INTO categoria_tienda (id_tienda, id_categoria) values (id_p_p, cat_v);
   
  END LOOP read_loop;
 
  
  CLOSE cur1;
  
  DELETE FROM categorias_tiendas_pendientes WHERE `categorias_tiendas_pendientes`.`id_tienda` = id_p_p;
  DELETE FROM tiendas_pendientes WHERE id = id_p_p;
  
  commit;
  
END$$

CREATE DEFINER=`` PROCEDURE `carga_productos` (`id_p` INT, `id_tienda_p` INT, `descripcion_p` VARCHAR(200), `precio_p` FLOAT, `nombre_p` VARCHAR(50), `categoria_p` INT, `img1` VARCHAR(250), `img2` VARCHAR(250), `img3` VARCHAR(250))   BEGIN
  declare contar int;

  
  select count(*) into contar from productos_pendientes where id = id_p;
  
  if contar = 0 then 
     insert into productos_pendientes values (id_p, id_tienda_p, descripcion_p, precio_p, nombre_p);
  else
     update productos_pendientes set id_tienda =  id_tienda_p, descripcion = descripcion_p, precio = precio_p, nombre = nombre_p where id = id_p;
  end if;
  
  Insert into categorias_productos_pendientes (id_categoria, id_producto) values (categoria_p, id_p);
  
  delete from fotos_productos_pendientes where id_producto = id_p;
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_p, img1);
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_p, img2);
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_p, img3);
  
	
END$$

CREATE DEFINER=`` PROCEDURE `carga_tiendas` (`id_p` INT, `nombre_p` VARCHAR(100), `longitud_p` VARCHAR(100), `latitud_p` VARCHAR(100), `link_p` VARCHAR(150), `telefono_p` INT, `descripcion_p` VARCHAR(200), `foto_logo_p` VARCHAR(255), `id_usuario_p` INT, `zona_p` INT, `municipio_p` VARCHAR(50), `departamento_p` VARCHAR(50), `categoria_p` INT)   BEGIN
  declare contar int;

  
  select count(*) into contar from tiendas_pendientes where id = id_p;
  
  if contar = 0 then 
     insert into tiendas_pendientes values (id_p, nombre_p, longitud_p, link_p, telefono_p, descripcion_p, foto_logo_p, latitud_p, id_usuario_p, zona_p, departamento_p, municipio_p);
  else
     Update tiendas_pendientes set nombre = nombre_p, longitud = longitud_p, latitud = latitud_p, link = link_p, telefono = telefono_p, descripcion = descripcion_p, foto_logo = foto_logo_p, id_usuario = id_usuario_p, zona = zona_p, departamento = departamento_p, municipio =  municipio_p where id = id_p;
  end if;
  
  Insert into categorias_tiendas_pendientes (id_categoria, id_tienda) values (categoria_p, id_p);
  
 
  
	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_producto` (`id_p_p` INT, `id_tienda_p` INT, `descripcion_p` VARCHAR(200), `precio_p` FLOAT, `nombre_p` VARCHAR(50), `img1_p` VARCHAR(250), `img2_p` VARCHAR(250), `img3_p` VARCHAR(250))   BEGIN
	declare id_prod_v int;
  
  DELETE FROM productos_pendientes WHERE `productos_pendientes`.`id` = id_p_p;
  INSERT INTO `productos_pendientes` (id, id_tienda, descripcion, precio, nombre) VALUES (id_p_p, id_tienda_p, descripcion_p, precio_p, nombre_p);
  
  /*UPDATE `productos_pendientes` SET `id_tienda` = id_tienda_p, `descripcion` = descripcion_p, `precio` = precio_p, `nombre` = nombre_p WHERE `productos_pendientes`.`id` = id_p_p;*/
  
  DELETE FROM fotos_productos_pendientes WHERE `fotos_productos_pendientes`.`id_producto` = id_p_p;
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_p_p, img1_p);
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_p_p, img2_p);
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_p_p, img3_p);
  
  commit;
  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_producto` (`id_tienda_p` INT, `descripcion_p` VARCHAR(200), `precio_p` FLOAT, `nombre_p` VARCHAR(50), `img1_p` VARCHAR(250), `img2_p` VARCHAR(250), `img3_p` VARCHAR(250))   BEGIN
	declare id_prod_v int;
  
  INSERT INTO `productos_pendientes` (id_tienda, descripcion, precio, nombre) VALUES (id_tienda_p, descripcion_p, precio_p, nombre_p);
  
  Select id into id_prod_v from productos_pendientes order by id desc limit 1;
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_prod_v, img1_p);
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_prod_v, img2_p);
  
  Insert into fotos_productos_pendientes (id_producto, link) values (id_prod_v, img3_p);
  
  commit;
  
END$$

--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `count_comments` (`id_p` INT, `tienda` TINYINT(1)) RETURNS INT(11)  BEGIN
  declare conteo int;

   if tienda = 0 then 
     select count(*) into conteo from comentarios where id_producto = id_p and tienda = 0;
  else
     select count(*) into conteo from comentarios where id_producto = id_p and tienda = 1;
  end if;
	
	RETURN conteo;
END$$

CREATE DEFINER=`` FUNCTION `getCategorias` (`id_p` INT) RETURNS TEXT CHARSET utf8mb4  BEGIN
	declare cats_v text;
  
  select GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') into cats_v from tiendas.categoria_tienda t inner join tiendas.categorias c on c.id = t.id_categoria where t.id_tienda = id_p;
  
  
	RETURN cats_v;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getLink` (`id_p` INT, `off_p` INT) RETURNS VARCHAR(250) CHARSET utf8mb4  BEGIN
	declare imagen_v varchar(250);
  
  select link into imagen_v from fotos_productos  where id_producto = id_p limit 1 offset off_p;
  
  
	RETURN imagen_v;
END$$

CREATE DEFINER=`` FUNCTION `getName` (`id_p` INT) RETURNS VARCHAR(100) CHARSET utf8mb4  BEGIN
	declare name_v varchar(100);
  
  select nombre into name_v from tiendas where id = id_p limit 1;
  
  
	RETURN name_v;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `get_categoriaName` (`id_p` INT) RETURNS VARCHAR(25) CHARSET utf8mb4  BEGIN
  declare cat_name varchar(25);

	Select nombre_categoria into cat_name from categorias where id = id_p;  
  
	RETURN cat_name;
END$$

CREATE DEFINER=`` FUNCTION `get_imagenes` (`id_prod` INT) RETURNS INT(11)  BEGIN
	declare conteo int;
  select count(*) into conteo from fotos_productos where id_producto = id_prod;
  
	RETURN conteo;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `like_ratio` (`id_comment_p` INT) RETURNS INT(11)  BEGIN

 declare likes int;
 declare dislikes int;
 
 select count(*) into likes from like_comment where id_comment = id_comment_p and is_like = 1;
 select count(*) into dislikes from like_comment where id_comment = id_comment_p and is_like = 0;
	
	RETURN likes - dislikes;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre_categoria` varchar(25) NOT NULL,
  `tienda` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre_categoria`, `tienda`) VALUES
(1, 'Nueva', 0),
(2, 'Nueva2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_productos_pendientes`
--

CREATE TABLE `categorias_productos_pendientes` (
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias_productos_pendientes`
--

INSERT INTO `categorias_productos_pendientes` (`id`, `id_categoria`, `id_producto`) VALUES
(9, 1, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_tiendas_pendientes`
--

CREATE TABLE `categorias_tiendas_pendientes` (
  `id` int(11) NOT NULL,
  `id_tienda` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

CREATE TABLE `categoria_producto` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`id`, `id_producto`, `id_categoria`) VALUES
(1, 5, 1),
(2, 8, 1),
(3, 13, 1),
(4, 13, 1),
(5, 14, 1),
(6, 14, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_tienda`
--

CREATE TABLE `categoria_tienda` (
  `id` int(11) NOT NULL,
  `id_tienda` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria_tienda`
--

INSERT INTO `categoria_tienda` (`id`, `id_tienda`, `id_categoria`) VALUES
(1, 12, 2),
(2, 22, 2),
(3, 1, 2),
(4, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `comentario_padre` int(11) DEFAULT NULL,
  `comentario` varchar(500) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tienda` tinyint(1) NOT NULL,
  `fecha` date NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `comentario_padre`, `comentario`, `id_usuario`, `tienda`, `fecha`, `id_producto`) VALUES
(2, NULL, 'Hola', 59, 1, '2022-10-30', 22),
(3, 2, 'Hola', 59, 1, '2022-10-30', 22),
(7, NULL, 'sandraaaaaaaa', 58, 0, '2022-10-30', 68),
(70, NULL, 'Buenas ', 59, 0, '2022-11-03', 72),
(72, 70, 'buenas que', 59, 0, '2022-11-03', 72),
(73, NULL, 'sddadsadas', 90, 1, '2022-11-09', 1),
(74, 70, 'Buenas tarde xd', 59, 0, '2022-11-03', 72),
(75, NULL, 'Hola', 59, 0, '2022-11-21', 5),
(79, 75, 'que onda', 90, 0, '2022-11-22', 5),
(80, 75, 'no es con vos', 90, 0, '2022-11-22', 5),
(81, 75, 'cualquier cosa', 90, 0, '2022-11-22', 5),
(82, 75, 'que onda de que', 90, 0, '2022-11-22', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_pendientes`
--

CREATE TABLE `comentarios_pendientes` (
  `id` int(11) NOT NULL,
  `comentario_padre` int(11) DEFAULT NULL,
  `comentario` varchar(500) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tienda` tinyint(1) NOT NULL,
  `fecha` date NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos_productos`
--

CREATE TABLE `fotos_productos` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `link` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fotos_productos`
--

INSERT INTO `fotos_productos` (`id`, `id_producto`, `link`) VALUES
(4, 5, 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
(5, 5, 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
(6, 5, 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
(7, 8, 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg'),
(8, 8, 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg'),
(9, 8, 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg'),
(10, 13, 'sdlkfj'),
(11, 13, 'sdlfkj'),
(12, 13, 'sdflk'),
(13, 14, 'https://www5.minijuegosgratis.com/v3/games/thumbnails/222662_1.jpg'),
(14, 14, 'https://www5.minijuegosgratis.com/v3/games/thumbnails/222662_1.jpg'),
(15, 14, 'https://www5.minijuegosgratis.com/v3/games/thumbnails/222662_1.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos_productos_pendientes`
--

CREATE TABLE `fotos_productos_pendientes` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `link` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fotos_productos_pendientes`
--

INSERT INTO `fotos_productos_pendientes` (`id`, `id_producto`, `link`) VALUES
(26, 11, 'lksj'),
(27, 11, 'jlks'),
(28, 11, 'ssfd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `homepage`
--

CREATE TABLE `homepage` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `contenido` text NOT NULL,
  `link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `homepage`
--

INSERT INTO `homepage` (`id`, `titulo`, `contenido`, `link`) VALUES
(1, 'aaa', 'aaaaaaa', 'facebook.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `home_box`
--

CREATE TABLE `home_box` (
  `id` int(11) NOT NULL,
  `titulo` varchar(20) NOT NULL,
  `cuerpo` varchar(200) NOT NULL,
  `link` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `home_box`
--

INSERT INTO `home_box` (`id`, `titulo`, `cuerpo`, `link`) VALUES
(1, '', '', ''),
(2, '', '', ''),
(3, '', '', ''),
(4, '', '', ''),
(5, '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `like_comment`
--

CREATE TABLE `like_comment` (
  `id_usuario` int(11) NOT NULL,
  `id_comment` int(11) NOT NULL,
  `is_like` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `like_comment`
--

INSERT INTO `like_comment` (`id_usuario`, `id_comment`, `is_like`) VALUES
(90, 73, 1),
(90, 75, 1),
(90, 79, 1),
(90, 80, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_aprobados`
--

CREATE TABLE `productos_aprobados` (
  `id` int(11) NOT NULL,
  `id_tienda` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` float NOT NULL,
  `fecha` date NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos_aprobados`
--

INSERT INTO `productos_aprobados` (`id`, `id_tienda`, `descripcion`, `precio`, `fecha`, `habilitado`, `nombre`) VALUES
(3, 0, 'Hola', 23, '2022-11-13', 1, 'Nuevo091122'),
(5, 12, '12', 12, '2022-11-13', 1, 'jajajaj'),
(8, 1, 'ssss', 23, '2022-11-20', 1, 'Nuevo091122'),
(13, 37, 'sdf', 4, '2022-11-21', 1, 'soda'),
(14, 1, 'Bros', 4, '2022-11-22', 1, 'Mario'),
(72, 22, 'sdsdsad', 34, '2022-10-29', 1, 'sdsdsf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_pendientes`
--

CREATE TABLE `productos_pendientes` (
  `id` int(11) NOT NULL,
  `id_tienda` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` float NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos_pendientes`
--

INSERT INTO `productos_pendientes` (`id`, `id_tienda`, `descripcion`, `precio`, `nombre`) VALUES
(11, 37, 'man', 43, 'mano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ratingproducto`
--

CREATE TABLE `ratingproducto` (
  `userID` int(10) UNSIGNED NOT NULL,
  `productID` int(10) UNSIGNED NOT NULL,
  `rating` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ratingproducto`
--

INSERT INTO `ratingproducto` (`userID`, `productID`, `rating`) VALUES
(59, 72, 3),
(90, 72, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ratingtienda`
--

CREATE TABLE `ratingtienda` (
  `userID` int(11) NOT NULL,
  `tiendaID` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ratingtienda`
--

INSERT INTO `ratingtienda` (`userID`, `tiendaID`, `rating`) VALUES
(59, 1, 1),
(59, 22, 5),
(90, 1, 5),
(90, 22, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rechazos`
--

CREATE TABLE `rechazos` (
  `id` int(11) NOT NULL,
  `usuario_rechazado` int(11) NOT NULL,
  `usuario_empleado` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tipo_contenido` enum('t','c','p') NOT NULL,
  `razon` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rechazos`
--

INSERT INTO `rechazos` (`id`, `usuario_rechazado`, `usuario_empleado`, `fecha`, `tipo_contenido`, `razon`) VALUES
(1, 90, 90, '2022-11-19', 't', 'Mala tienda'),
(2, 90, 90, '2022-11-19', 't', 'Mala tienda'),
(3, 90, 59, '2022-11-02', 'c', 'Mal Comentario'),
(4, 90, 59, '2022-11-19', 'c', 'Mal Comentario'),
(5, 90, 90, '2022-11-10', 'c', 'MalCCC'),
(6, 59, 90, '2022-11-16', 'c', 'razon'),
(7, 90, 90, '2022-11-19', 'p', 'MalProd'),
(8, 90, 90, '2022-11-19', 'p', 'MalProducto'),
(9, 90, 90, '2022-11-19', 'p', 'MalProdsss'),
(10, 90, 90, '2022-11-19', 'p', 'razon2.0'),
(11, 0, 59, '2022-11-21', 'p', 'lkjo'),
(12, 0, 59, '2022-11-21', 'p', 'SALADA'),
(13, 0, 59, '2022-11-21', 'p', 'malo'),
(14, 90, 59, '2022-11-21', 'c', 'sad'),
(15, 59, 59, '2022-11-21', 't', 'lkjo'),
(16, 59, 59, '2022-11-21', 'c', 'malo'),
(17, 59, 59, '2022-11-22', 'c', 'Mal comentario'),
(18, 59, 59, '2022-11-22', 'c', 'Inapropiado');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `reportes_comentarios_productos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `reportes_comentarios_productos` (
`fecha` date
,`id` int(11)
,`nombre` varchar(50)
,`id_tienda` int(11)
,`precio` float
,`comentarios` int(11)
,`rating` decimal(14,4)
,`cantidad_votos` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `reportes_comentarios_tiendas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `reportes_comentarios_tiendas` (
`fecha` date
,`id` int(11)
,`nombre` varchar(100)
,`id_usuario` int(11)
,`comentarios` int(11)
,`rating` decimal(14,4)
,`cantidad_votos` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `longitud` varchar(100) NOT NULL,
  `latitud` varchar(100) NOT NULL,
  `link` varchar(150) NOT NULL,
  `telefono` int(8) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `foto_logo` varchar(255) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `zona` int(11) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `municipio` varchar(50) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `nombre`, `longitud`, `latitud`, `link`, `telefono`, `descripcion`, `foto_logo`, `habilitado`, `id_usuario`, `zona`, `departamento`, `municipio`, `fecha`) VALUES
(1, 'lll', '111', '1112', '1111', 1111, 'Hola Gio', 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', 1, 90, 2, '2', '2', '2022-11-13'),
(12, 'w', 'w', 'w', '1', 1, '1', '1', 0, 90, 1, '1', '1', '2022-11-13'),
(22, 'sfsdfsd', '123423', '13123', 'adsadsa', 12345678, 'sdad', 'weqwe', 1, 90, 2, 'sdda', 'sada', '2022-11-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas_pendientes`
--

CREATE TABLE `tiendas_pendientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `longitud` varchar(100) NOT NULL,
  `link` varchar(150) NOT NULL,
  `telefono` int(8) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `foto_logo` varchar(255) NOT NULL,
  `latitud` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `zona` int(11) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `municipio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `tienda_usuario`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `tienda_usuario` (
`correo` varchar(255)
,`id` int(11)
,`tienda` int(11)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipo`, `tipo`) VALUES
(1, 'administrador'),
(2, 'empleado'),
(3, 'usuario_logueado'),
(4, 'usuario_anonimo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `id_tipousuario` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `firstName`, `lastName`, `correo`, `contrasena`, `id_tipousuario`, `fecha`) VALUES
(1, 'Benja', 'Caceres', 'benja@gmail.com', '123', 3, '2022-11-10'),
(58, 'jose', 'jose', 'jose@gmail.com', '123', 1, '2022-11-10'),
(59, 'Gio', 'Gio', 'caceres191453@unis.edu.gt', 'caceres', 3, '2022-11-10'),
(90, 'r', 'r', 'r', '1234', 1, '2022-11-10');

-- --------------------------------------------------------

--
-- Estructura para la vista `reportes_comentarios_productos`
--
DROP TABLE IF EXISTS `reportes_comentarios_productos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`` SQL SECURITY DEFINER VIEW `reportes_comentarios_productos`  AS SELECT `t`.`fecha` AS `fecha`, `t`.`id` AS `id`, `t`.`nombre` AS `nombre`, `t`.`id_tienda` AS `id_tienda`, `t`.`precio` AS `precio`, `count_comments`(`t`.`id`,0) AS `comentarios`, avg(`r`.`rating`) AS `rating`, count(`r`.`productID`) AS `cantidad_votos` FROM (`productos_aprobados` `t` join `ratingproducto` `r` on(`t`.`id` = `r`.`productID`)) GROUP BY `r`.`productID``productID`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `reportes_comentarios_tiendas`
--
DROP TABLE IF EXISTS `reportes_comentarios_tiendas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`` SQL SECURITY DEFINER VIEW `reportes_comentarios_tiendas`  AS SELECT `t`.`fecha` AS `fecha`, `t`.`id` AS `id`, `t`.`nombre` AS `nombre`, `t`.`id_usuario` AS `id_usuario`, `count_comments`(`t`.`id`,1) AS `comentarios`, avg(`r`.`rating`) AS `rating`, count(`r`.`tiendaID`) AS `cantidad_votos` FROM (`tiendas` `t` join `ratingtienda` `r` on(`t`.`id` = `r`.`tiendaID`)) GROUP BY `r`.`tiendaID``tiendaID`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `tienda_usuario`
--
DROP TABLE IF EXISTS `tienda_usuario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tienda_usuario`  AS SELECT `u`.`correo` AS `correo`, `u`.`id` AS `id`, `t`.`id` AS `tienda` FROM (`tiendas` `t` join `usuarios` `u` on(`u`.`id` = `t`.`id_usuario`))  ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias_productos_pendientes`
--
ALTER TABLE `categorias_productos_pendientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `categorias_tiendas_pendientes`
--
ALTER TABLE `categorias_tiendas_pendientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `categoria_tienda`
--
ALTER TABLE `categoria_tienda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_tienda` (`id_tienda`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `comentario_padre` (`comentario_padre`);

--
-- Indices de la tabla `comentarios_pendientes`
--
ALTER TABLE `comentarios_pendientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fotos_productos`
--
ALTER TABLE `fotos_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `fotos_productos_pendientes`
--
ALTER TABLE `fotos_productos_pendientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `homepage`
--
ALTER TABLE `homepage`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `home_box`
--
ALTER TABLE `home_box`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `like_comment`
--
ALTER TABLE `like_comment`
  ADD PRIMARY KEY (`id_usuario`,`id_comment`),
  ADD KEY `id_comment` (`id_comment`);

--
-- Indices de la tabla `productos_aprobados`
--
ALTER TABLE `productos_aprobados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tienda` (`id_tienda`);

--
-- Indices de la tabla `productos_pendientes`
--
ALTER TABLE `productos_pendientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tienda` (`id_tienda`);

--
-- Indices de la tabla `ratingproducto`
--
ALTER TABLE `ratingproducto`
  ADD PRIMARY KEY (`userID`,`productID`);

--
-- Indices de la tabla `ratingtienda`
--
ALTER TABLE `ratingtienda`
  ADD PRIMARY KEY (`userID`,`tiendaID`);

--
-- Indices de la tabla `rechazos`
--
ALTER TABLE `rechazos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiendas_pendientes`
--
ALTER TABLE `tiendas_pendientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipousuario` (`id_tipousuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categorias_productos_pendientes`
--
ALTER TABLE `categorias_productos_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `categorias_tiendas_pendientes`
--
ALTER TABLE `categorias_tiendas_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `categoria_tienda`
--
ALTER TABLE `categoria_tienda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `comentarios_pendientes`
--
ALTER TABLE `comentarios_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `fotos_productos`
--
ALTER TABLE `fotos_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `fotos_productos_pendientes`
--
ALTER TABLE `fotos_productos_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `homepage`
--
ALTER TABLE `homepage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `home_box`
--
ALTER TABLE `home_box`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos_pendientes`
--
ALTER TABLE `productos_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `rechazos`
--
ALTER TABLE `rechazos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `tiendas_pendientes`
--
ALTER TABLE `tiendas_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `like_comment`
--
ALTER TABLE `like_comment`
  ADD CONSTRAINT `like_comment_ibfk_1` FOREIGN KEY (`id_comment`) REFERENCES `comentarios` (`id`),
  ADD CONSTRAINT `like_comment_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
