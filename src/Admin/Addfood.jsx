import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default function Addfood() {
    let [categoryy, showCategoryy] = useState([]);
    let food = { foodd: '', price: '', category: '' };
    let [foodd, setFood] = useState(food);
    let Input = (e) => {
        let { name, value } = e.target;
        setFood((data) => {
            return { ...data, [name]: value };
        })
    }
    let Category = () => {
        try {
            let url = "http://localhost:3001/showcategory";
            Axios.get(url).then((response) => {
                if (response) {
                    //console.log(response);
                    showCategoryy(response.data);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let Addfood = (e) => {
        e.preventDefault();
        let url = "http://localhost:3001/addfood";
        Axios.post(url, { foodname: foodd.foodd, price: foodd.price, categoryy: foodd.category }).then((response) => {
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
                setFood(food);
            }
        })

    }
    useEffect(() => {
        Category();
    }, []);
    return (
        <div className="container">
            <FadeIn>
                <div class="card cardd">
                    <div class="card-body">
                        <h2 className="text-center">Add Food</h2>
                        <hr className="mx-auto w-25" />
                        <form onSubmit={Addfood}>
                            <div className="mb-3">
                                <label for="category" className="form-label">Choose Category:</label>
                                <select required onChange={Input} name='category' class="form-select w-75" aria-label="Default select example">
                                    <option selected value=''>Choose Category...</option>
                                    {
                                        categoryy.map((curval) => {
                                            return (
                                                <>
                                                    <option value={curval.id}>{curval.category}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="food" className="form-label">Add Food:</label>
                                <input required onChange={Input} value={foodd.foodd} name="foodd" type="text" className="form-control w-75" id="food" />
                            </div>
                            <div className="mb-3">
                                <label for="price" className="form-label">Price:</label>
                                <input required onChange={Input} value={foodd.price} name="price" type="number" className="form-control w-75" id="price" />
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
