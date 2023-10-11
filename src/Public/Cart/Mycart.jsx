import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import FadeIn from 'react-fade-in';
import Axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Userdeliveryform from '../Deliveryform/Deliverform';
import { HiLocationMarker, HiHome } from "react-icons/hi";
import { cartAction } from './Cartslice';
import { v4 as uuidv4 } from 'uuid';
import date from 'date-and-time';
import { useSelector, useDispatch } from 'react-redux';
export default function Mycart() {
    let auth = localStorage.getItem('mero');
    let history = useHistory();
    let [cart, setCart] = useState([]);
    let [sum, setTotal] = useState();
    let [grand, setGrand] = useState();
    const [show, setShow] = useState(false);
    let userAuth = useSelector(state => state.auth.isLoggedin);
    let userCart = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [check, setCheck] = useState(true);
    let [checkk, setCheckk] = useState(true);
    let [userdeliver, setDeliver] = useState();
    let [userDeliver, setDelivery] = useState([]);
    let orderid = uuidv4();
    const now = new Date();
    const pattern = date.compile('ddd, MMM DD YYYY HH:mm:ss');
    let datee = date.format(now, pattern);
    let Cart = () => {
        Axios.get(`http://localhost:3001/finalCart/${auth}`).then((response) => {
            setCart(response.data);
            userCart(cartAction.count(response.data.length))
            console.log(response.data.length);
        }).catch((err) => console.log(err))
    }
    let Total = () => {
        // let total = 0;
        // for (let i = 0; i < cart.length; i++) {
        //     total = total + (parseFloat(cart[i].price) * parseInt(cart[i].quantity));
        // }
        let total = cart.reduce((totall, curval) => {
            return totall = Math.round((parseFloat(curval.price) * parseInt(curval.quantity)))
        }, 0)
        setTotal(total);
        setGrand(total + 100);
    }
    //sessionStorage.setItem('cart', cart.length);
    let Increment = (id) => {
        let exist = cart.find((curval) => { return curval.id === id.id });
        if (exist) {
            setCart(cart.map((curval) => curval.id === id.id ? { ...exist, quantity: exist.quantity + 1 } : curval))
            try {
                Axios.put(`http://localhost:3001/cartUpdate`, { id: id.id, quantity: exist.quantity + 1 }).then((response) => {
                    if (response) {
                        Cart();
                    }
                })
            }
            catch (err) {
                alert('Something Wrong!!!');
            }
        }
        //alert(id.id);
    }
    let Decrement = (id) => {
        let exist = cart.find((curval) => { return curval.id === id.id });
        if (exist) {
            setCart(cart.map((curval) => curval.id === id.id ? { ...exist, quantity: exist.quantity - 1 } : curval))
            try {
                Axios.put(`http://localhost:3001/cartUpdate`, { id: id.id, quantity: exist.quantity - 1 }).then((response) => {
                    if (response) {
                        Cart();
                    }
                })
            }
            catch (err) {
                alert('Something Wrong!!!');
            }
        }
        if (exist.quantity === 1) {
            try {
                Axios.delete(`http://localhost:3001/cartDelete/${id.id}`).then((response) => {
                    if (response) {
                        Cart();
                    }
                })
            }
            catch (err) {
                alert('Something Wrong!!!');
            }
        }
        //alert(id.id);
    }
    let Checkout = () => {
        setCheckk(false)
        if (check) {
            alert('No Customer delivery detail!!!')
            setCheckk(true);
        }
        else {
            try {
                let urll = 'http://localhost:3001/orderdetail';
                Axios.post(urll, { orderid: orderid, user: auth, orderdate: datee }).then((response) => {
                    if (response) {
                        let url = 'http://localhost:3001/userOrder';
                        cart.map((curval) => {
                            return Axios.post(url, { foodname: curval.name, price: curval.price, quantity: curval.quantity, active: auth, deliverid: userdeliver, orderid: orderid, orderdate: datee }).then((response) => {
                                if (response) {
                                    alert('success');
                                    setCheck(true);
                                    history.push('/my-order');
                                }
                            })
                        })
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
            //alert('ok!!!');
        }

    }
    let userDelivery = () => {
        let url = `http://localhost:3001/userdeliveryformm/${auth}`;
        try {
            Axios.get(url).then((response) => {
                setDelivery(response.data);
                //console.log(response);
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let Deliver = (e) => {
        //console.log(e.target.value);
        setDeliver(e.target.value);
        setCheck(false);
    }
    let Userdeliverr = () => {
        if (!show) {
            userDelivery();
        }
    }
    useEffect(() => {
        Cart();
        userDelivery();
    }, []);
    useEffect(() => {
        Total();
    })
    useEffect(() => {
        Userdeliverr();
    }, [show])
    if (!userAuth) {
        history.push('/')
    }
    // if (totalcart < 1) {
    //     history.push('/')
    // }
    return (
        <div>
            <div className="container">
                <FadeIn>
                    <div className="row  mt-4">
                        <div className="col-lg-8 col-md-8 col-12 mb-3">
                            <h3 className="text-center">Choose a delivery address</h3>
                            <hr className="w-25 mx-auto" />
                            <div className="card orderr">
                                <div className="card-body">
                                    <div className="row">
                                        {userDeliver.map((curval) => {
                                            return (
                                                <>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <div className="card mb-2">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-3 col-lg-3 col-3">
                                                                        <HiHome id="location" />
                                                                    </div>
                                                                    <div className="col-md-9 col-lg-9 col-9">
                                                                        <h4>Current Address</h4>
                                                                        <p>{curval.fullname}</p>
                                                                        <p>{curval.address}</p>
                                                                        <p>{curval.contact}</p>
                                                                        <div class="form-check">
                                                                            <input onChange={Deliver} class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={curval.id} />
                                                                            <label class="form-check-label" for="exampleRadios2">
                                                                                DELIVER HERE
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-3 col-3">
                                                            <HiLocationMarker id="location" />
                                                        </div>
                                                        <div className="col-md-9 col-lg-9 col-9">
                                                            <h5 className="text-muted">other</h5>
                                                            <p className="text-muted">New Address</p>
                                                            <Button variant="danger" onClick={handleShow}>
                                                                ADD NEW ADDRESS
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Delivery Address
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body><Userdeliveryform /></Modal.Body>
                            </Modal>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <h3 className="text-center">Order</h3>
                            <hr className="mx-auto w-25" />
                            <div className="card bg-danger orderr">
                                <p className="ms-4 text-white">Your Order:</p>
                                {
                                    cart.length === 0 ? (<><div className="container"><p className="text-white">({cart.length}) Items</p></div></>) : (<>
                                        <div className="container"><p className="text-white">({cart.length}) Items</p></div>
                                        {
                                            cart.map((curval) => {
                                                return (
                                                    <>
                                                        <div className="container">
                                                            <div className="card mb-4">
                                                                <div className="card-body">
                                                                    <p className="ms-2"><span className="fw-bold">Item: </span> {curval.name}</p>
                                                                    <p className="text-muted ms-2"><span className="fw-bold">Price: </span>{curval.price}</p>
                                                                    <p className="ms-2 fw-bold">Quantity: </p>
                                                                    <div class="counter">
                                                                        <span class="down" onClick={() => Decrement({ id: curval.id })}>-</span>
                                                                        <input type="text" disabled value={curval.quantity} />
                                                                        <span class="up" onClick={() => Increment({ id: curval.id })}>+</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                        <div className="container">
                                            <div className="card mb-2">
                                                <p className="ms-2 mb-2 fw-bold">Sub Total: <span className="text-danger">Rs {sum.toFixed(2)}</span> </p>
                                                <p className="ms-2 mb-2 fw-bold">Delivery Charge: <span className="text-danger">Rs 100.00 </span></p>
                                                <p className="ms-2 mb-2 fw-bold">Grand Charge:  <span className="text-danger">Rs {grand.toFixed(2)}</span> </p>
                                            </div>
                                            <button className="btn btn-success checkout w-100 mb-2" onClick={Checkout} disabled={checkk ? '' : 'disabled'}>{checkk ? 'Checkout' : 'Processing'}</button>
                                        </div>
                                    </>)
                                }
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
