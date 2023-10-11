import React, { useState, useEffect } from 'react'
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import Editcategory from './Categoryaction/Editcategory';
import Axios from 'axios';
import FadeIn from 'react-fade-in';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
export default function Showcategory() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [idd, setId] = useState();
    let [categoryy, showCategoryy] = useState([]);
    //let categoryy = props.category;
    let urll = "http://localhost:3001/showcategory";
    let myCategory = () => {
        try {
            Axios.get(urll).then((response) => {
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
    let Edit = (id) => {
        setId(id);
        handleShow();
        //alert(id);
    }
    let Action = () => {
        if (show === false) {
            myCategory();
        }
    }
    let Delete = (id) => {
        try {
            let url = `http://localhost:3001/deletecategory/${id}`;
            Axios.delete(url).then((response) => {
                if (response.data.message) {
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    myCategory();
                }
            })
        }
        catch (err) {
            console.log(err);
        }
        //alert(id);
    }
    useEffect(() => {
        Action();
    }, [show]);
    useEffect(() => {
        myCategory();
    }, [urll]);
    let num = 0;
    return (
        <div className="container">
            <FadeIn>
                <div className="card cardd">
                    <div className="card-body">
                        <h2 className="text-center">Our Food Category</h2>
                        <hr className="mx-auto w-25" />
                        <table className="table table-striped table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryy.map((curval) => {
                                    num++;
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{num}</th>
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
                                })}
                            </tbody>
                        </table>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Editcategory keyy={idd} />
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </FadeIn>
            <ToastContainer />
        </div>
    )
}
