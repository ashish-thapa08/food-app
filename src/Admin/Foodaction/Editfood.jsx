import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function Editfood(props) {
    let [food, setFood] = useState({ foodname: '', price: '', category: '' });
    let valuee = props.keyy;
    //let [categoryy, showCategoryy] = useState([]);
    let Action = () => {
        try {
            let url = `http://localhost:3001/editfood/${valuee}`;
            Axios.get(url).then((response) => {
                setFood({ foodname: response.data[0].name, price: response.data[0].price });
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    // let myCategory = () => {
    //     try {
    //         let url = "http://localhost:3001/showcategory";
    //         Axios.get(url).then((response) => {
    //             if (response) {
    //                 showCategoryy(response.data);
    //                 //console.log(response);
    //             }
    //         })
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
    let Update = (e) => {
        e.preventDefault();
        try {
            let url = `http://localhost:3001/updatefood/${valuee}`;
            Axios.put(url, { name: food.foodname, price: food.price }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                }
                else {
                    alert(response.data.messagee);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let Input = (e) => {
        let { name, value } = e.target;
        setFood((data) => {
            return { ...data, [name]: value }
        })
    }
    useEffect(() => {
        Action();
        //myCategory();
    }, [])
    return (
        <div>
            <form onSubmit={Update}>
                {/* <div className="form-group mb-2">
                    <label for="category">Category:</label>
                    <select className="form-select mt-2" aria-label="Default select example">
                        <option selected value='menu'>Category...</option>
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
                </div> */}
                <div className="form-group mb-2">
                    <label for="foodname">Food Name:</label>
                    <input required name="foodname" onChange={Input} value={food.foodname} type="text" className="form-control mt-2" id="foodname" required />
                </div>
                <div className="form-group mb-2">
                    <label for="price">Price:</label>
                    <input required name="price" onChange={Input} value={food.price} type="number" className="form-control mt-2" id="price" required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}
