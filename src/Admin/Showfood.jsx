import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FadeIn from 'react-fade-in';
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import { Modal } from 'react-bootstrap';
import Foodaction from './Foodaction/Editfood';
export default function Addcategory() {
    let num = 0;
    let [menu, showMenu] = useState([]);
    let [filtermenu, filterMenu] = useState([]);
    let [categoryy, showCategoryy] = useState([]);
    let [foodvalue, setFoodvalue] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let Filtermenu = (e) => {
        let value = e.target.value;
        let dataa = filtermenu.filter((curval) => {
            return curval.category === value;
        })
        showMenu(dataa);
    }
    let All = (e) => {
        e.preventDefault();
        showMenu(filtermenu);
    }
    let myCategory = () => {
        try {
            let url = "http://localhost:3001/showcategory";
            Axios.get(url).then((response) => {
                if (response) {
                    showCategoryy(response.data);
                    //console.log(response);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let myFood = () => {
        let url = 'http://localhost:3001/adminfood';
        try {
            Axios.get(url).then((response) => {
                if (response) {
                    console.log(response);
                    showMenu(response.data);
                    filterMenu(response.data);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let Edit = (valuee) => {
        setFoodvalue(valuee);
        //alert(valuee);
        handleShow();
    }
    let Delete = (valuee) => {
        try {
            let url = `http://localhost:3001/deletefood/${valuee}`;
            Axios.delete(url).then((response) => {
                if (response) {
                    myFood();
                }
            })
        }
        catch (err) {
            console.log(err);
        }
        //alert(valuee);
    }
    let Action = () => {
        if (show === false) {
            myFood();
        }
    }
    useEffect(() => {
        Action();
    }, [show])
    useEffect(() => {
        myFood();
        myCategory();
    }, []);
    return (
        <div className="container">
            <FadeIn>
                <div className="card cardd">
                    <div className="card-body">
                        <h2 className="text-center">Our Menu</h2>
                        <hr className="mx-auto w-25" />
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-12 mb-3">
                                <select className="form-select" aria-label="Default select example" onChange={Filtermenu}>
                                    <option selected value=''>Filter Menu By Category...</option>
                                    {categoryy.map((curval) => {
                                        return (
                                            <>
                                                <option value={curval.category}>{curval.category}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                                <button className="btn btn-outline-info" onClick={All}>My Menu</button>
                            </div>
                        </div>
                        <table className="table table-striped table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menu.length === 0 ? (
                                    <>
                                        <div class="alert alert-danger p-2 mt-2 w-100" role="alert">
                                            Data Doesnot Exists!!!
                                    </div>

                                    </>
                                ) :
                                    menu.map((curval) => {
                                        num++;
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{num}</th>
                                                    <td>{curval.name}</td>
                                                    <td>{curval.price}</td>
                                                    <td>{curval.category}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-lg-1 col-md-1 col-3">
                                                                <IoPencilSharp onClick={() => Edit(curval.id)} id="actionn" />
                                                            </div>
                                                            <div className="col-lg-1 col-md-1 col-3">
                                                                <IoTrashOutline onClick={() => Delete(curval.id)} id="action" />
                                                            </div>
                                                        </div>

                                                    </td>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Food</Modal.Title>
                </Modal.Header>
                <Modal.Body><Foodaction keyy={foodvalue} /></Modal.Body>
            </Modal>
        </div>
    )
}
