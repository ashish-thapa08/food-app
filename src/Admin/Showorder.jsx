import React, { useEffect, useState } from 'react'
import { GrClose } from "react-icons/gr";
import Axios from 'axios';
import { Modal } from 'react-bootstrap';
import Edituserorder from './Edituserorder';
export default function Showorder(props) {
    let [order, setOrder] = useState([]);
    let [total, setTotal] = useState();
    let [subtotal, setSubtotal] = useState();
    let [showw, setShoww] = useState();
    const handleClose = () => setShoww(false);
    const handleShow = () => setShoww(true);
    let [editid, setEditid] = useState();
    let userOrder = () => {
        let keyy = props.userkey
        let url = `http://localhost:3001/userOrderr/${keyy}`;
        try {
            Axios.get(url).then((response) => {
                if (response) {
                    setOrder(response.data);
                    console.log(response);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let Total = () => {
        let totall = 0;
        for (let i = 0; i < order.length; i++) {
            totall = totall + (parseFloat(order[i].price) * parseFloat(order[i].quantity));
            setTotal(totall);
        }
        setSubtotal(total + 100);
    }
    let Editorder = (id) => {
        //console.log(id)
        setEditid(id);
        handleShow();
        //alert(id);
    }
    //console.log(editid.foodname)
    let Cancel = (id) => {
        //alert(id);
        try {
            let url = `http://localhost:3001/cancelOrder/${id}`
            Axios.delete(url).then((response) => {
                if (response) {
                    userOrder();
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let Action = () => {
        if (!showw) {
            userOrder();
        }
    }
    useEffect(() => {
        Action()
    }, [showw])
    //console.log(order);
    let num = 0;
    useEffect(() => {
        userOrder();
    }, [])
    useEffect(() => {
        Total();
    })
    return (
        <>
            <div className="container">
                <table class="table table-striped table-hover mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">Food Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Merchant Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Contact2</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.length === 0 ? (
                                <>
                                    <div class="alert alert-danger p-2 mt-2 w-100" role="alert">
                                        No Order has been ordered!!!
                                    </div>
                                </>
                            ) : order.map((curval) => {
                                num++;
                                return (
                                    <tr>
                                        <th scope="row">{num}</th>
                                        <td>{curval.orderid}</td>
                                        <td>{curval.foodname}</td>
                                        <td>{curval.quantity} <span className="fs-6 ms-1"><GrClose className="fw-bold fs-6 fst-italic text-danger" /></span></td>
                                        <td>{curval.price}</td>
                                        <td>{curval.fullname}</td>
                                        <td>{curval.address}</td>
                                        <td>{curval.contact}</td>
                                        <td>{curval.contact2}</td>
                                        <td>
                                            <button className="btn btn-outline-success mb-2" onClick={() => { Editorder({ orderid: curval.id, quantity: curval.quantity, foodname: curval.foodname }) }}>Edit Order</button>
                                            <button className="btn btn-outline-danger" onClick={() => Cancel(curval.id)}>Cancel Order</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="card dash mb-2 p-1">
                    <p className="ms-2 mb-2 fw-bold">Sub Total: <span className="text-danger">Rs {total}.00</span> </p>
                    <p className="ms-2 mb-2 fw-bold">Delivery Charge: <span className="text-danger">Rs 100.00 </span></p>
                    <p className="ms-2 mb-2 fw-bold">Grand Charge:  <span className="text-danger">Rs {subtotal}.00</span> </p>
                </div>
            </div>
            <Modal className="w-100" show={showw} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Order</Modal.Title>
                </Modal.Header>
                <Modal.Body ><Edituserorder data={editid} /></Modal.Body>
            </Modal>
        </>
    )
}
