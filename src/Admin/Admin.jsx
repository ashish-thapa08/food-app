import React, { useState, useEffect } from 'react';
import AddCategory from './Addcategory';
import Addfood from './Addfood';
import Dasboard from './Dashboard';
import Orderr from './Order';
import Menu from './Showfood';
import Categoryy from './Showcategory';
import Orderhistoryy from './Orderhistory';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export default function Admin() {
    let [check, showDash] = useState(false);
    let [showcat, showCategory] = useState(true);
    let [showwcat, showwCategory] = useState(true);
    let [showfood, showFood] = useState(true);
    let [showwfood, showwFood] = useState(true);
    let [order, showOrder] = useState(true);
    let [down, setDown] = useState(true);
    let [downn, setDownn] = useState(true);
    let [orderr, setOrderr] = useState(true);
    let [orderhistory, setOrderhistory] = useState(true);
    let Dash = () => {
        showDash(false);
        showOrder(true);
        showCategory(true);
        showwCategory(true);
        showFood(true);
        showwFood(true);
        setOrderhistory(true);
    }
    //category
    let Category = () => {
        showCategory(false);
        showwCategory(true);
        showOrder(true);
        showDash(true);
        showFood(true);
        showwFood(true);
        setOrderhistory(true);
    }
    let ShowCategory = () => {
        showwCategory(false);
        showCategory(true);
        showOrder(true);
        showDash(true);
        showFood(true);
        showwFood(true);
        setOrderhistory(true);
    }
    //Food
    let Food = () => {
        showFood(false);
        showwCategory(true);
        showCategory(true);
        showOrder(true);
        showDash(true);
        showwFood(true);
        setOrderhistory(true);
    }
    let Showfood = () => {
        showwFood(false);
        showFood(true);
        showCategory(true);
        showwCategory(true);
        showOrder(true);
        showDash(true);
        setOrderhistory(true);

    }
    //Order
    let Orders = () => {
        orderr ? setOrderr(false) : setOrderr(true);
    }
    let Order = () => {
        showOrder(false);
        showFood(true);
        showCategory(true);
        showwCategory(true);
        showDash(true);
        showwFood(true);
        setOrderhistory(true);
    }
    let Orderhistory = () => {
        showOrder(true);
        showFood(true);
        showCategory(true);
        showwCategory(true);
        showDash(true);
        showwFood(true);
        setOrderhistory(false);
    }
    let Check = () => {
        down ? setDown(false) : setDown(true);
    }
    let Checkk = () => {
        downn ? setDownn(false) : setDownn(true);
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-3 col-12 mb-4">
                        <div className="card dash">
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className={`list-group-item statuss ${!check ? ` active` : ''}`} aria-current="true}" onClick={Dash}>Dashboard</li>
                                    <li className="list-group-item">
                                        <span className="showw" onClick={Check}>Category <span className="iconn">{down ? (<IoIosArrowDown />) : (<IoIosArrowUp />)}</span></span>
                                        {!down ? (<>
                                            <li className={`list-group-item statuss mt-2 ${!showcat ? ` active` : ''}`} onClick={Category}>Add Category</li>
                                            <li className={`list-group-item statuss mt-2 ${!showwcat ? ` active` : ''}`} onClick={ShowCategory}>Show Category</li>
                                        </>) : null}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="showw" onClick={Checkk}>Food <span className="iconn">{downn ? (<IoIosArrowDown />) : (<IoIosArrowUp />)}</span></span>
                                        {!downn ? (<>
                                            <li className={`list-group-item statuss mt-2 ${!showfood ? ` active` : ''}`} onClick={Food}>Add Food</li>
                                            <li className={`list-group-item statuss mt-2 ${!showwfood ? ` active` : ''}`} onClick={Showfood}>Show Food</li>
                                        </>) : null}
                                    </li>
                                    <li className="list-group-item">
                                        <span className="showw" onClick={Orders}>Orders <span className="iconn">{orderr ? (<IoIosArrowDown />) : (<IoIosArrowUp />)}</span></span>
                                        {!orderr ? (<>
                                            <li className={`list-group-item statuss mb-2 ${!order ? ` active` : ''}`} onClick={Order}>New Orders</li>
                                            <li className={`list-group-item statuss ${!orderhistory ? ` active` : ''}`} onClick={Orderhistory}>Order History</li>
                                        </>) : null}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                        {!check ? (<><Dasboard /></>) : null}
                        {!showcat ? (<AddCategory />) : null}
                        {!showwcat ? (<Categoryy />) : null}
                        {!showfood ? (<Addfood />) : null}
                        {!showwfood ? (<Menu />) : null}
                        {!order ? (<Orderr />) : null}
                        {!orderhistory ? (<Orderhistoryy />) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
