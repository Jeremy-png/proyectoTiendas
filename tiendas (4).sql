-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2022 a las 04:23:38
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
CREATE DEFINER=`root`@`localhost` FUNCTION `get_categoriaName` (`id_p` INT) RETURNS VARCHAR(25) CHARSET utf8mb4  BEGIN
  declare cat_name varchar(25);

	Select nombre_categoria into cat_name from categorias where id = id_p;  
  
	RETURN cat_name;
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
(1, 'pasteles', 1),
(2, 'ggfg', 1),
(3, 'ggfg', 1),
(4, 'sdfs', 0),
(5, 'Electrico', 0);

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
(39, 4, 70),
(40, 4, 71),
(42, 4, 72);

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
(11, 67, 4),
(12, 67, 5),
(13, 67, 4),
(14, 68, 4),
(15, 68, 5),
(16, 72, 4),
(17, 72, 4),
(18, 72, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_tienda`
--

CREATE TABLE `categoria_tienda` (
  `id` int(11) NOT NULL,
  `id_tienda` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(52, 67, 'https://acortar.link/logo-acortar-url.png'),
(53, 67, 'https://acortar.link/logo-acortar-url.png'),
(54, 67, 'https://acortar.link/logo-acortar-url.png'),
(58, 68, 'https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000'),
(59, 68, 'https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000'),
(60, 68, 'https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000'),
(61, 72, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBcUFBUXFxcXFxcYFxkaGhcXGRccFxoYGRcaFxcaICwjGh0pIBkZJDYkKS0vMzMzGiM4PjgyPSwyMy8BCwsLDw4PHRISHTQqIikvMjUvLzI1MjQyMjI0LzQ0MjIvLzIyMjIyLzIvMjIyMjIyMjIyMjIyMjIyMjIyLzIyMv/AABEIANEA8QMBIgACEQE'),
(62, 72, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBcUFBUXFxcXFxcYFxkaGhcXGRccFxoYGRcaFxcaICwjGh0pIBkZJDYkKS0vMzMzGiM4PjgyPSwyMy8BCwsLDw4PHRISHTQqIikvMjUvLzI1MjQyMjI0LzQ0MjIvLzIyMjIyLzIvMjIyMjIyMjIyMjIyMjIyMjIyLzIyMv/AABEIANEA8QMBIgACEQE'),
(63, 72, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBcUFBUXFxcXFxcYFxkaGhcXGRccFxoYGRcaFxcaICwjGh0pIBkZJDYkKS0vMzMzGiM4PjgyPSwyMy8BCwsLDw4PHRISHTQqIikvMjUvLzI1MjQyMjI0LzQ0MjIvLzIyMjIyLzIvMjIyMjIyMjIyMjIyMjIyMjIyLzIyMv/AABEIANEA8QMBIgACEQE');

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
(233, 70, 'pina'),
(234, 70, 'pina'),
(235, 70, 'pina'),
(236, 71, 'pina'),
(237, 71, 'pina'),
(238, 71, 'pina'),
(242, 72, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBcUFBUXFxcXFxcYFxkaGhcXGRccFxoYGRcaFxcaICwjGh0pIBkZJDYkKS0vMzMzGiM4PjgyPSwyMy8BCwsLDw4PHRISHTQqIikvMjUvLzI1MjQyMjI0LzQ0MjIvLzIyMjIyLzIvMjIyMjIyMjIyMjIyMjIyMjIyLzIyMv/AABEIANEA8QMBIgACEQE'),
(243, 72, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBcUFBUXFxcXFxcYFxkaGhcXGRccFxoYGRcaFxcaICwjGh0pIBkZJDYkKS0vMzMzGiM4PjgyPSwyMy8BCwsLDw4PHRISHTQqIikvMjUvLzI1MjQyMjI0LzQ0MjIvLzIyMjIyLzIvMjIyMjIyMjIyMjIyMjIyMjIyLzIyMv/AABEIANEA8QMBIgACEQE'),
(244, 72, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBcUFBUXFxcXFxcYFxkaGhcXGRccFxoYGRcaFxcaICwjGh0pIBkZJDYkKS0vMzMzGiM4PjgyPSwyMy8BCwsLDw4PHRISHTQqIikvMjUvLzI1MjQyMjI0LzQ0MjIvLzIyMjIyLzIvMjIyMjIyMjIyMjIyMjIyMjIyLzIyMv/AABEIANEA8QMBIgACEQE');

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
(67, 24, 'jajajaj', 6, '2022-10-15', 1, 'Bananos'),
(68, 24, 'sss', 44, '2022-10-15', 1, 'Holaaaa'),
(72, 32, 'fideos calientes', 12, '2022-10-15', 1, 'fideos');

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
(70, 24, 'pina', 4, 'pina'),
(71, 24, 'pina', 4, 'pina'),
(72, 32, 'fideos frios', 12, 'fideos frios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `longitud` varchar(100) NOT NULL,
  `latitud` int(11) NOT NULL,
  `link` varchar(150) NOT NULL,
  `telefono` int(8) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `foto_logo` varchar(255) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `nombre`, `longitud`, `latitud`, `link`, `telefono`, `descripcion`, `foto_logo`, `habilitado`, `id_usuario`) VALUES
(22, 'hola', 'hola', 0, 'hola', 12345678, 'hola', 'hola', 1, 0),
(23, 'paches', 'paches', 0, 'asd', 12345678, 'paches', 'https://pbs.twimg.com/media/E3z_AptXEAA5mHs.jpg:large', 0, 0),
(24, 'jesustienda', 'tienda1', 0, 'tienda1', 12345678, 'tienda1', 'tienda1', 0, 57),
(25, 'Tienda Pasteles', '12343214', 0, 'tiendapasteles.com', 12345678, 'Tiendas pasteles', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJEAkQMBIgACEQEDEQH/', 0, 59),
(26, 'JEGAsk', '', 0, 'ajajaja', 78782337, 'jajajaj', 'kadlkasjlksf', 0, 0),
(27, 'JEGAsk', '', 0, 'ajajaja', 78782337, 'jajajaj', 'kadlkasjlksf', 0, 0),
(28, 'JEGAsk', '', 0, 'ajajaja', 78782337, 'jajajaj', 'kadlkasjlksf', 0, 0),
(29, 'JEGAsk', '', 0, 'ajajaja', 78782337, 'jajajaj', 'kadlkasjlksf', 0, 0),
(30, 'JEGAsk', '', 0, 'ajajaja', 78782337, 'jajajaj', 'kadlkasjlksf', 0, 0),
(31, 'djalskjds', '111', 1, 'jdjdjdj', 3333, 'dkjkasjdlksa', 'sdas', 0, 0),
(32, 'Tenda Gio', '123', 123, 'www.pasteles.com', 123, 'Pasteles', 'https://storage.googleapis.com/patsy-ecommerce.appspot.com/small_FRESAS_CON_CREMA_6bb4f36558', 0, 1);

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
  `id_tipousuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `firstName`, `lastName`, `correo`, `contrasena`, `id_tipousuario`) VALUES
(1, 'Gio2', 'xxxx', 'gio2@gmail.com', '123', 3),
(5, '', '', '', '', 3),
(57, 'jesus', 'jesus', 'jesus', '123', 3),
(58, 'jose', 'jose', 'jose@gmail.com', '123', 1),
(59, 'Gio', 'Gio', 'Gio@gmail.com', '123', 3);

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
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categorias_productos_pendientes`
--
ALTER TABLE `categorias_productos_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `categoria_tienda`
--
ALTER TABLE `categoria_tienda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotos_productos`
--
ALTER TABLE `fotos_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `fotos_productos_pendientes`
--
ALTER TABLE `fotos_productos_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- AUTO_INCREMENT de la tabla `homepage`
--
ALTER TABLE `homepage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos_pendientes`
--
ALTER TABLE `productos_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categorias_productos_pendientes`
--
ALTER TABLE `categorias_productos_pendientes`
  ADD CONSTRAINT `categorias_productos_pendientes_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `categorias_productos_pendientes_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos_pendientes` (`id`);

--
-- Filtros para la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  ADD CONSTRAINT `categoria_producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `categoria_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos_aprobados` (`id`);

--
-- Filtros para la tabla `categoria_tienda`
--
ALTER TABLE `categoria_tienda`
  ADD CONSTRAINT `categoria_tienda_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `categoria_tienda_ibfk_2` FOREIGN KEY (`id_tienda`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`comentario_padre`) REFERENCES `comentarios` (`id`);

--
-- Filtros para la tabla `fotos_productos`
--
ALTER TABLE `fotos_productos`
  ADD CONSTRAINT `fotos_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos_aprobados` (`id`);

--
-- Filtros para la tabla `fotos_productos_pendientes`
--
ALTER TABLE `fotos_productos_pendientes`
  ADD CONSTRAINT `fotos_productos_pendientes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos_pendientes` (`id`);

--
-- Filtros para la tabla `productos_aprobados`
--
ALTER TABLE `productos_aprobados`
  ADD CONSTRAINT `productos_aprobados_ibfk_1` FOREIGN KEY (`id_tienda`) REFERENCES `tiendas` (`id`);

--
-- Filtros para la tabla `productos_pendientes`
--
ALTER TABLE `productos_pendientes`
  ADD CONSTRAINT `productos_pendientes_ibfk_1` FOREIGN KEY (`id_tienda`) REFERENCES `tiendas` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_tipousuario`) REFERENCES `tipo_usuario` (`id_tipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
