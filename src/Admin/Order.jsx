import React, { useState, useEffect } from 'react'
import FadeIn from 'react-fade-in';
import Axios from 'axios';
import Showorder from './Showorder';
export default function Order() {
    let [show, setShow] = useState(true);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    let [orderdetail, setorderDetail] = useState([]);
    console.log(show);
    let [userorderkey, setOrderkey] = useState();
    let Orderdetail = () => {
        try {
            let url = 'http://localhost:3001/orderDetail';
            Axios.get(url).then((response) => {
                setorderDetail(response.data);
                console.log(response.data);
            })
        }
        catch (err) {
            console.log(err);
        }
    };
    let Vieworder = (orderidd) => {
        if (show) {
            setShow(false);
        }
        else {
            setOrderkey(orderidd);
            setShow(true);
        }
        //show ? setShow(orderidd) : setShow(orderidd);
        //alert(email);
    }
    let Cancelorder = (id) => {
        try {
            let url = `http://localhost:3001/cancel-order-orderdetail/${id}`;
            Axios.delete(url).then((response) => {
                if (response) {
                    Orderdetail();
                    //console.log(response);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
        //alert(id);
    }
    let Deliverorder = (id) => {
        //alert(id);
        let url = `http://localhost:3001/deliver-order-orderhistory/${id}`;
        try {
            Axios.delete(url).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                }
                else {
                    console.log(response.data);
                    alert('Successfully Delivered');
                    Orderdetail();
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        Orderdetail();
    }, [])
    return (
        <div>
            <div className="container">
                <FadeIn>
                    <div class="card cardd">
                        <div class="card-body">
                            <h2 className="text-center">User Order</h2>
                            <hr className="mx-auto w-25" />
                            {orderdetail.length === 0 ? (<p className="text-danger">No Order Has Been Received!!!</p>) :
                                orderdetail.map((curval) => {
                                    return (
                                        <>
                                            <div class="card mb-3 p-3">
                                                <h4 className="fw-bold">User Order ID:<span className="ms-1 fw-bold fs-5">{curval.orderid}</span></h4>
                                                <span>
                                                    <h5 className="fw-bold">Login User: <span className="fw-lighter fs-6">{curval.fullname}</span></h5>
                                                    <h5 className="fw-bold">Loginemail: <span className="fw-lighter fs-6">{curval.loginuser}</span></h5>
                                                    <h5 className="fw-bold">Order Date: <span className="fw-lighter fs-6">{curval.orderdate}</span></h5>
                                                    <div><span> <button className="btn btn-outline-primary dash" onClick={() => Vieworder(curval.orderid)}>View Order</button>
                                                        <span> <button className="btn dash btn-outline-success ms-3" onClick={() => Deliverorder(curval.orderid)} >Deliver All Order</button></span>
                                                        <span> <button className="btn dash btn-outline-danger ms-3" onClick={() => Cancelorder(curval.orderid)} >Cancel All Order</button></span>
                                                    </span></div>
                                                </span>
                                                {show ? (<><FadeIn>
                                                    {userorderkey === curval.orderid ? (<Showorder userkey={userorderkey} />) : null}
                                                </FadeIn></>) : null}
                                            </div>
                                        </>
                                    )
                                })}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
