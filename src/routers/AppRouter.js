import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useParams
} from "react-router-dom"
import Home from "../components/Home/Home";
import { LoginContext } from "../context/contexto"; //para usar variables de usuario y tipo en la app
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Users from "../components/Users/Users";
import RegistroTienda from "../components/RegistroTienda/RegistroTienda";
import { useContext } from "react";
import Tiendas from "../components/Tiendas/Tiendas";
import RegistroProductos from "../components/registroProductos/registroProductos";
import Mantenimiento from "../components/Mantenimiento/Mantenimiento";
import EditHome from "../components/EditHome/EditHome";
import ShowProductPage from "../components/ShowProductPage/ShowProductPage";
import CatalogoProductosPage from "../components/CatalogoProductosPage/CatalogoProductosPage";
import AprobarProductos from "../components/ApproveProduct/ApproveProduct";
import CatalogoTiendas from "../components/CatalogoTiendas/CatalogoTiendas";
import PaginaTienda from "../components/PaginaTienda/PaginaTienda";
import AprobarComentarios from "../components/AprobarComentario/AprobarComentarios";
import Reportes from "../components/Reportes/Reportes";
import AprobarTienda from "../components/AprobarTienda/AprobarTienda";
import Restablecer from "../components/NuevaPassword/NuevaPassword";
import CargaMasiva from "../components/CargaMasiva/CargaMasiva";

export default function AppRouter(){
    
    const{
        username, setUsername, setTipoUsuario, tipoUsuario
    } = useContext(LoginContext);

    
    
    return(
        <Router>
            {tipoUsuario == 1 ?
            <Switch>
            <Route path = "/home" component={Home}/>
            <Route path = "/registroTienda" component={RegistroTienda}/>
            <Route path = "/users" component={Users}/>
            <Route path = "/tiendas" component={Tiendas}/>
            <Route path = "/signIn" component={SignIn}/>
            <Route path = "/signUp" component={SignUp}/>
            <Route path = "/productos" component={RegistroProductos}/>
            <Route path = "/editHome" component={EditHome}/>
            <Route path = "/mantenimiento" component={Mantenimiento}/>
            <Route path = "/catalogoProductos" component={CatalogoProductosPage}/>
            <Route path = "/showProduct/:id" component={ShowProductPage}/>
            <Route path = "/aprobarProductos" component={AprobarProductos}/>
            <Route path = "/catalogoTiendas" component={CatalogoTiendas}/>
            <Route exact path = "/showTienda/:id" component={PaginaTienda}/>
            <Route exact path = "/aprobarComentarios" component={AprobarComentarios}/>
            <Route exact path = "/reportes" component={Reportes}/>
            <Route exact path = "/aprobarTienda" component={AprobarTienda}/>
            <Route exact path = "/restablecer" component={Restablecer}/>
            <Route exact path = "/cargaMasiva" component={CargaMasiva}/>
            <Redirect path = "*" to = "/home"/>

            </Switch> :

            tipoUsuario == 2?
            <Switch>
            <Route path = "/home" component={Home}/>
            <Route path = "/tiendas" component={Tiendas}/>
            <Route path = "/productos" component={RegistroProductos}/>
            <Route path = "/editHome" component={EditHome}/>
            <Route path = "/mantenimiento" component={Mantenimiento}/>
            <Route path = "/catalogoProductos" component={CatalogoProductosPage}/>
            <Route path = "/showProduct/:id" component={ShowProductPage}/>
            <Route path = "/aprobarProductos" component={AprobarProductos}/>
            <Route path = "/catalogoTiendas" component={CatalogoTiendas}/>
            <Route exact path = "/showTienda/:id" component={PaginaTienda}/>
            <Route exact path = "/aprobarComentarios" component={AprobarComentarios}/>
            <Route exact path = "/reportes" component={Reportes}/>
            <Route exact path = "/aprobarTienda" component={AprobarTienda}/>
            <Route exact path = "/restablecer" component={Restablecer}/>
            <Redirect path = "*" to = "/home"/>

        </Switch> :
        tipoUsuario == 3?
        <Switch>
        <Route path = "/home" component={Home}/>
        <Route path = "/registroTienda" component={RegistroTienda}/>
        <Route path = "/catalogoProductos" component={CatalogoProductosPage}/>
        <Route path = "/showProduct/:id" component={ShowProductPage}/>
        <Route path = "/catalogoTiendas" component={CatalogoTiendas}/>
        <Route exact path = "/showTienda/:id" component={PaginaTienda}/>
        <Route exact path = "/restablecer" component={Restablecer}/>
        <Redirect path = "*" to = "/home"/>
        
    </Switch> :
     <Switch>
                <Route path = "/home" component={Home}/>
                <Route path = "/signIn" component={SignIn}/>
                <Route path = "/signUp" component={SignUp}/>
                <Route path = "/catalogoProductos" component={CatalogoProductosPage}/>
                <Route path = "/showProduct/:id" component={ShowProductPage}/>
                <Route path = "/catalogoTiendas" component={CatalogoTiendas}/>
                <Route exact path = "/showTienda/:id" component={PaginaTienda}/>
                <Route exact path = "/restablecer" component={Restablecer}/>
                <Redirect path = "*" to = "/home"/>

            </Switch>
            }
        </Router>
    );
}