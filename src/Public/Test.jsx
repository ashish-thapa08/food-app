import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Switch, Route, Link, useHistory } from "react-router-dom";
//import Admin from '../Admin/Admin';
import Home from './Home/Home';
import Registration from '../Authentication/Registration';
import Login from '../Authentication/Login';
import Verification from '../Authentication/Verification'
import Forgotpw from '../Authentication/Forgotpw';
import Recoverpw from '../Authentication/Recoverpw';
import Menu from '../Menu/Menu';
import Dashboard from './Dashboard/Dashboard';
import Mycart from '../Public/Cart/Mycart';
import Myorder from '../Public/Order/Userorder';
import Userorderhistory from './Dashboard/Userorderhistory';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../Authentication/Loginsession/Loginslice';
//mport Orderhistory from '../Admin/Orderhistory';

export default function Test() {
    let [home, setHome] = useState(false);
    let [mymenu, setMenu] = useState(true);
    let [mycart, setCart] = useState(true);
    let [myorder, setOrder] = useState(true);
    let [orderhistory, setHistory] = useState(true);
    let [reg, setReg] = useState(true);
    let [login, setLogin] = useState(true);
    let history = useHistory();
    let userAuth = useSelector(state => state.auth.isLoggedin)
    let userCart = useSelector(state => state.cart.cart)
    let dispatch = useDispatch();
    let Logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('mero');
        localStorage.removeItem('login')
        dispatch(authAction.logout())
        history.push('/login');
    }
    let Homee = () => {
        setHome(false);
        setMenu(true);
        setCart(true);
        setOrder(true);
        setHistory(true);
        setReg(true);
        setLogin(true);

    }
    let Menuu = () => {
        setHome(true);
        setMenu(false);
        setCart(true);
        setOrder(true);
        setHistory(true);
        setReg(true);
        setLogin(true);

    }
    let Cart = () => {
        setHome(true);
        setMenu(true);
        setCart(false);
        setOrder(true);
        setHistory(true);
        setReg(true);
        setLogin(true);

    }
    let Order = () => {
        setHome(true);
        setMenu(true);
        setCart(true);
        setOrder(false);
        setHistory(true);
        setReg(true);
        setLogin(true);

    }
    let History = () => {
        setHome(true);
        setMenu(true);
        setCart(true);
        setOrder(true);
        setHistory(false);
        setReg(true);
        setLogin(true);

    }
    let Reg = () => {
        setHome(true);
        setMenu(true);
        setCart(true);
        setOrder(true);
        setHistory(true);
        setReg(false);
        setLogin(true);

    }
    let Loginn = () => {
        setHome(true);
        setMenu(true);
        setCart(true);
        setOrder(true);
        setHistory(true);
        setReg(true);
        setLogin(false);

    }
    return (
        <div>
            <Navbar className="p-4 shadow " bg="light" expand="lg">
                <div className="container">
                    <Navbar.Brand href="#home">Ashish-Restaurant</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navv">
                            <Nav.Link ><Link to='/' className={home ? '' : 'text-danger text-decoration-underline'} id="home" onClick={Homee} >Home</Link></Nav.Link>
                            <Nav.Link><Link onClick={Menuu} className={mymenu ? '' : 'text-danger text-decoration-underline'} to='/ourMenu' id="ourmenu" >Our Menu</Link></Nav.Link>
                            {
                                userAuth ? (
                                    <>
                                        <Nav.Link><Link onClick={Cart} className={mycart ? '' : 'text-danger text-decoration-underline'} to='/my-cart' id="home">myCart <span className="badge bg-secondary">{userCart}</span></Link></Nav.Link>
                                        {/* <Nav.Link><Link onClick={Cart} className={mycart ? '' : 'text-danger text-decoration-underline'} to='/my-cart' id="mycart">myCart</Link></Nav.Link> */}
                                        <Nav.Link><Link onClick={Order} className={myorder ? '' : 'text-danger text-decoration-underline'} to='/my-order' id="myorder">myOrder</Link></Nav.Link>
                                        <Nav.Link><Link onClick={History} className={orderhistory ? '' : 'text-danger text-decoration-underline'} to='/order-history' id="orderhistory">Order History</Link></Nav.Link>
                                        <NavDropdown title={localStorage.getItem('mero')} id="basic-nav-dropdown">
                                            <NavDropdown.Item onClick={Logout}><a href='/logout' className="text-dark text-decoration-none">Logout</a></NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link><Link onClick={Reg} className={reg ? '' : 'text-danger text-decoration-underline'} to='/registration' id="signup">Sign Up</Link></Nav.Link>
                                        <Nav.Link><Link onClick={Loginn} className={login ? '' : 'text-danger text-decoration-underline'} to='/login' id="login">Login</Link></Nav.Link>
                                    </>
                                )
                            }
                            {/* <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <Switch>
                {/* <Route exact path="/admin" component={Admin} /> */}
                <Route exact path="/" component={Home} />
                <Route exact path="/ourMenu" component={Menu} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/verification" component={Verification} />
                <Route exact path="/forgotpassword" component={Forgotpw} />
                <Route exact path="/recoverpassword" component={Recoverpw} />
                <Route exact path="/user-dash" component={Dashboard} />
                <Route exact path="/my-cart" component={Mycart} />
                <Route exact path="/my-order" component={Myorder} />
                <Route exact path="/order-history" component={Userorderhistory} />
            </Switch>
        </div>
    )
}
