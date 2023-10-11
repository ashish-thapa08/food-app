import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import FadeIn from 'react-fade-in';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
export default function Menu() {
    let history = useHistory();
    let [category, setCategory] = useState([]);
    let [food, setFood] = useState([]);
    let [foodd, setFoodd] = useState([]);
    let [order, setOrder] = useState([]);
    let [total, setTotal] = useState();
    let [grand, setGrand] = useState();
    let userAuth = useSelector(state => state.auth.isLoggedin);
    let [pageNumber, setPageno] = useState(0);
    let foodMenu = 5;
    let Category = () => {
        Axios.get('http://localhost:3001/showcategory').then((response) => {
            setCategory(response.data);
            //console.log(response.data);
        })
    }
    let Food = () => {
        Axios.get('http://localhost:3001/food').then((response) => {
            setFood(response.data);
            setFoodd(response.data);
            // console.log(response);
        })
    }
    let All = () => {
        Food();
    }
    let Add = (data) => {
        let exist = order.find((curval) => { return curval.id === data.id });
        if (exist) {
            setOrder(order.map((curval) =>
                curval.id === data.id ? { ...exist, quantity: exist.quantity + 1 } : curval
            ))
        }
        else {
            setOrder((dataa) => { return [...dataa, data] });
        }
        //console.log(data);
    }
    useEffect(() => {
        Category();
        Food();
    }, []);
    let Categoryy = (id) => {
        let exist = foodd.filter((curval) => {
            return curval.category === id;
        });
        //console.log(exist);
        setFood(exist);
        setPageno(0);
    }
    let Increment = (id) => {
        let exist = order.find((curval) => { return curval.id === id.id });
        if (exist) {
            setOrder(order.map((curval) =>
                curval.id === id.id ? { ...exist, quantity: exist.quantity + 1, price: parseFloat(curval.price * parseInt(curval.quantity)) } : curval
            ))
        }
    }
    let Decrement = (id) => {
        let exist = order.find((curval) => { return curval.id === id.id });
        if (exist.quantity === 1) {
            let existt = order.filter((curval) => {
                return curval.id !== id.id
            })
            //console.log(exist)
            setOrder(existt);
        }
        else {
            setOrder(order.map((curval) =>
                curval.id === id.id ? { ...exist, quantity: exist.quantity - 1, totalprice: parseFloat(curval.price * parseInt(curval.quantity)) } : curval
            ))
        }
    }
    let Total = () => {
        let totall = 0
        order.map((curval) => {
            return totall = totall + (parseFloat(curval.price * parseInt(curval.quantity)));
        })
        // let totall = order.reduce((curval, total) => {
        //     return total += total + (parseFloat(curval.price * parseInt(curval.quantity)))
        // }, 0)
        setTotal(totall)
        setGrand(totall + 100);
    }
    let Checkout = () => {
        order.map((curval) => {
            return Axios.post('http://localhost:3001/cart', { name: curval.name, price: curval.price, quantity: curval.quantity, user: localStorage.getItem('mero') }).then((response) => {
                if (response.data.msg) {
                    alert(response.data.msg);
                    //setOrder([]);
                }
                else {
                    //setCartt(data[i].length)
                    history.push('/my-cart');
                }
            })
        })
    }
    const pagevisited = pageNumber * foodMenu;
    let pageCount = Math.ceil(food.length / foodMenu);
    //selected is the number we move to anoter page react paginate do its job now
    let changePage = ({ selected }) => {
        setPageno(selected);
    }
    let displayFood = food.slice(pagevisited, pagevisited + foodMenu).map((curval, index) => {
        return (<>
            <div className="col-lg-9 col-md-9 col-6">
                <FadeIn>
                    <li className="list-item">{curval.name}</li>
                    <p className="text-muted ms-4">Price: {curval.price}</p>
                </FadeIn>
            </div>
            <div className="col-lg-3 col-md-3 col-6">
                <FadeIn>
                    <button className="btn btn-outline-danger w-100" onClick={() => Add({ id: curval.id, name: curval.name, price: curval.price, quantity: 1 })}>Add</button>
                </FadeIn>
            </div>
            <hr className="w-100 ml-3 mr-3" />
        </>)
    });
    useEffect(() => {
        Total();
    })
    return (
        <>
            <FadeIn>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-lg-8 col-md-8 col-12">
                            <h1 className="text-center">Our Menu</h1>
                            <hr className="w-25 mx-auto " />
                            <div className="row">
                                {
                                    category.map((curval) => {
                                        return (
                                            <>
                                                <div className="col-lg-3 col-md-3 col-4 mb-3">
                                                    <button className="dash btn btn-danger w-100 rounded-start" onClick={() => Categoryy(curval.id)}>{curval.category}</button>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                                <div className="col-lg-3 col-md-3 col-4">
                                    <button className="btn btn-danger w-100 rounded-start dash" onClick={All}>All</button>
                                </div>
                            </div>
                            <div className="card cardd w-100 p-3 mb-2 mt-3">
                                <div className="row">
                                    {
                                        food.length === 0 ? (<p className="ml-3">Data does not exists!!!</p>) :
                                            (
                                                <>
                                                    {displayFood}
                                                    < ReactPaginate
                                                        previousLabel="Previous"
                                                        nextLabel="Next"
                                                        pageCount={pageCount}
                                                        onPageChange={changePage}
                                                        containerClassName={"paginationbtn"}
                                                        previousLinkClassName={"previousbtn"}
                                                        nextLinkClassName={"nextbtn"}
                                                        disabledClassName={"paginaiondisabled"}
                                                        activeClassName={"paginationactive"}
                                                    />
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <h3 className="text-center">Your Cart</h3>
                            <hr className="w-25 mx-auto" />
                            <div className="card bg-danger orderr">
                                <div className="container">
                                    <p className="text-white ml-2">Your Cart:</p>
                                </div>
                                {
                                    order.length === 0 ? (<><div className="container"><p className="text-white ml-2">({order.length}) Items</p></div></>) : (<>
                                        <div className="container">
                                            <p className="text-white ml-2">({order.length}) Items</p>
                                        </div>
                                        {
                                            order.map((curval) => {
                                                return (
                                                    <>
                                                        <div className="container">
                                                            <div className="card mb-4">
                                                                <div className="card-body">
                                                                    <p className="ms-2"><span className="fw-bold">Item: </span> {curval.name}</p>
                                                                    <p className="text-muted ms-2"><span className="fw-bold">Price: </span>{curval.price}</p>
                                                                    <p className="ms-2 fw-bold">Quantity: </p>
                                                                    <div className="counter">
                                                                        <span className="down" onClick={() => Decrement({ id: curval.id })}>-</span>
                                                                        <input type="text" disabled value={curval.quantity} />
                                                                        <span className="up" onClick={() => Increment({ id: curval.id })}>+</span>
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
                                                <div className="card-body">
                                                    <p className="ms-2 mb-2 fw-bold">Sub Total: <span className="text-danger">Rs {total.toFixed(2)}</span> </p>
                                                    <p className="ms-2 mb-2 fw-bold">Delivery Charge: <span className="text-danger">Rs 100.00 </span></p>
                                                    <p className="ms-2 mb-2 fw-bold">Grand Charge:  <span className="text-danger">Rs {grand.toFixed(2)}</span> </p>
                                                </div>
                                            </div>
                                            {userAuth ? null : (<div className="alert alert-danger fw-bold mt-3 fs-6" role="alert">
                                                Login Required!!!
                                            </div>)}
                                            <button className="btn btn-success checkout w-100 mb-2" disabled={userAuth ? '' : 'disabled'} onClick={Checkout}>Add to cart</button>
                                        </div>
                                    </>)

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </>
    )
}
