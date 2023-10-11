import React, {  useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import FadeIn from 'react-fade-in';
import Axios from 'axios';
import { useSelector } from 'react-redux';
export default function Userorderhistory() {
    let auth = localStorage.getItem('mero');
    let userAuth = useSelector(state => state.auth.isLoggedin)
    let [ordercodee, setOrdercode] = useState();
    let [orderhistory, setOrderhistory] = useState([]);
    let [orderhistoryy, setOrderhistoryy] = useState([]);
    let history = useHistory();
    let Input = (e) => {
        let ordercode = e.target.value;
        setOrdercode(ordercode);
    }
    let Filterhistory = () => {
        if (ordercodee !== '') {
            let data = orderhistoryy.filter((curval) => {
                return curval.orderid.toLowerCase().includes(ordercodee.toLowerCase()) || curval.orderdate.toLowerCase().includes(ordercodee.toLowerCase());
            });
            setOrderhistory(data);
        }
        else {
            setOrderhistory(orderhistoryy);
        }
    }
    let Orderhistory = () => {
        let url = `http://localhost:3001/user-order-history/${auth}`;
        try {
            Axios.get(url).then((response) => {
                if (response) {
                    //console.log(response);
                    setOrderhistory(response.data);
                    setOrderhistoryy(response.data);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let a = 0;
    useEffect(() => {
        Orderhistory()
    }, [])
    useEffect(() => {
        Filterhistory()
    }, [ordercodee])
    if (!userAuth) {
        history.push('/')
    }
    return (
        <>
            <div className="container">
                <FadeIn>
                    <h2 className="text-center mt-3">Order History</h2>
                    <hr className="mx-auto w-25" />
                    <div className="row mt-2">
                        <div className="col-lg-3 col-md-3 col-12">
                            <div class="mb-3">
                                <label for="pastordercode" className="form-label fw-bold fs-5">Past Order Code:</label>
                                <input type="search" onChange={Input} value={ordercodee} className="form-control" id="pastordercode" placeholder="Order Code || Date..." />
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-12">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Food Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Order Code</th>
                                        {/* <th scope="col">Merchant Name</th> */}
                                        <th scope="col">Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {orderhistory.length === 0 ? (<>
                                        <tr>
                                            <td>
                                                <div className="alert alert-danger" role="alert">
                                                    {orderhistory.length} Items
                                                </div></td>
                                        </tr>
                                    </>) :
                                        orderhistory.map((curval) => {
                                            a++
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{a}</td>
                                                        <td>{curval.foodname}</td>
                                                        <td>{curval.price}</td>
                                                        <td>{curval.quantity}</td>
                                                        <td>{curval.orderid}</td>
                                                        <td>{curval.orderdate}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </>
    )
}
