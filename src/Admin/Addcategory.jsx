import React, { useState } from 'react';
import Axios from 'axios';
import FadeIn from 'react-fade-in';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Addcategory() {
    let [category, setCategory] = useState({ category: '' });
    let myCategory = (e) => {
        let value = e.target.value;
        setCategory({ category: value });
    }
    let Addcategory = (e) => {
        e.preventDefault();
        try {
            let url = "http://localhost:3001/addcategory";
            Axios.post(url, { category: category.category }).then((response) => {
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
                    toast.success('Added!!!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setCategory({ category: '' });
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="container">
            <FadeIn>
                <div class="card cardd">
                    <div class="card-body">
                        <h2 className="text-center">Add Category</h2>
                        <hr className="mx-auto w-25" />
                        <form onSubmit={Addcategory}>
                            <div className="mb-3">
                                <label for="category" className="form-label">Add Food Category:</label>
                                <input type="text" value={category.category} onChange={myCategory} className="form-control w-75" id="category" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </FadeIn>
            <ToastContainer />
        </div>
    )
}
