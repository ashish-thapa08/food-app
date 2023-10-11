import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function Editcategory(props) {
    let id = props.keyy;
    let [category, showCategory] = useState({ category: '' });
    let Edit = () => {
        let url = `http://localhost:3001/editcategory/${id}`;
        try {
            Axios.get(url).then((response) => {
                if (response) {
                    showCategory({ category: response.data[0].category });
                    //console.log(response)
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let Input = (e) => {
        let valuee = e.target.value;
        showCategory({ category: valuee });
    }
    let Update = (e) => {
        e.preventDefault();
        try {
            let url = `http://localhost:3001/updatecategory`;
            Axios.put(url, { category: category.category, id: id }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                }
                else {
                    alert('Data Updated!!!');
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        Edit();
    }, [])
    return (
        <div>
            <form onSubmit={Update}>
                <div className="form-group">
                    <label for="category">Category</label>
                    <input onChange={Input} value={category.category} type="text" className="form-control" id="category" required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </form>
        </div>
    )
}
