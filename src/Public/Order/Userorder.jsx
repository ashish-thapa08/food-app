import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import FadeIn from 'react-fade-in';
import { GrClose } from "react-icons/gr";
import { useSelector } from 'react-redux';
function Userorder() {
    let auth = localStorage.getItem('mero');
    let userAuth = useSelector(state => state.auth.isLoggedin)
    let [total, setTotal] = useState();
    let [grand, setGrand] = useState();
    let history = useHistory();
    let [userorder, setOrder] = useState([]);
    let Order = () => {
        try {
            Axios.get(`http://localhost:3001/myorder/${auth}`).then((response) => {
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
    let Calculate = () => {
        let totall = 0;
        for (let i = 0; i < userorder.length; i++) {
            totall = totall + (parseFloat(userorder[i].price) * parseInt(userorder[i].quantity));
        }
        console.log(totall);
        setTotal(totall);
        setGrand(totall + 100);
    }
    useEffect(() => {
        setTimeout(() => {
            Order();
        }, 1000)
    })
    let num = 0;
    useEffect(() => {
        Order();
    }, []);
    useEffect(() => {
        Calculate();
    })
    if (!userAuth) {
        history.push('/')
    }
    return (
        <>
            <div className="container">
                <FadeIn>
                    <h2 className="text-center mt-4">myOrder</h2>
                    <hr className="mx-auto w-25" />
                    {userorder.length === 0 ? (<><div className="alert alert-danger" role="alert">
                        {userorder.length} Items :(
                    </div></>) :
                        (
                            <>
                                <table className="table table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userorder.map((curval) => {
                                                num++;
                                                return (
                                                    <>
                                                        <tr>
                                                            <th scope="row">{num}</th>
                                                            <td>{curval.orderid}</td>
                                                            <td>{curval.foodname}</td>
                                                            <td>{curval.price}</td>
                                                            <td><span className="fs-6 me-2"><GrClose className="fw-bold fs-6 fst-italic text-danger" /></span>{curval.quantity}</td>
                                                            <td className="text-danger fw-bold">Pending</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="col-lg-7 col-md-7 col-5">
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-7">
                                        <p className="fw-bold">Total Price: <span className="text-danger">{total.toFixed(2)}</span></p>
                                        <p className="fw-bold">Delivery Charge: <span className="text-danger">100.00</span></p>
                                        <p className="fw-bold">Grand Total: <span className="text-danger">{grand.toFixed(2)}</span></p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </FadeIn>
            </div>
        </>
    )
}

export default Userorder;
