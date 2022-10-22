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
                <Route path = "/productos" component={RegistroProductos}/>
                <Route path = "/mantenimiento" component={Mantenimiento}/>
                <Route path = "/editHome" component={EditHome}/>
                <Route path = "/catalogoProductos" component={CatalogoProductosPage}/>
                <Route path = "/showProduct/:id" component={ShowProductPage}/>
                <Route path = "/aprobarProductos" component={AprobarProductos}/>
                <Redirect path = "*" to = "/home"/>
            </Switch> :

            tipoUsuario == 2?
            <Switch>
            <Route path = "/home" component={Home}/>
            <Route path = "/registroTienda" component={RegistroTienda}/>
            <Route path = "/tiendas" component={Tiendas}/>
            <Route path = "/productos" component={RegistroProductos}/>
            <Route path = "/mantenimiento" component={Mantenimiento}/>
            <Route path = "/editHome" component={EditHome}/>
            <Route path = "/catalogoProductos" component={CatalogoProductosPage}/>
            <Route path = "/showProduct/:id" component={ShowProductPage}/>
            <Route path = "/aprobarProductos" component={AprobarProductos}/>
            <Redirect path = "*" to = "/home"/>
        </Switch> :
        tipoUsuario == 3?
        <Switch>
        <Route path = "/home" component={Home}/>
        <Route path = "/registroTienda" component={RegistroTienda}/>
        <Route path = "/productos" component={RegistroProductos}/>
        <Route path = "/mantenimiento" component={Mantenimiento}/>
        <Route path = "/editHome" component={EditHome}/>
        <Route path = "/catalogoProductos" component={CatalogoProductosPage}/>
        <Route path = "/showProduct/:id" component={ShowProductPage}/>
        <Route path = "/aprobarProductos" component={AprobarProductos}/>
        <Redirect path = "*" to = "/home"/>
        
    </Switch> :
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
                <Redirect path = "*" to = "/home"/>
                    
            </Switch>
            }
        </Router>
    );
}