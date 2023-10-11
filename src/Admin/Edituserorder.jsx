import React, { useState, useEffect } from 'react'
import Axios from 'axios';
export default function Edituserorder(props) {
    let data = props.data;
    let [id, setId] = useState(data.quantity);
    //console.log(data);
    let Input = (e) => {
        setId(e.target.value);
    }
    let Update = () => {
        if (id.match(/^[1-9]+$/)) {
            // alert(id);
            try {
                let url = 'http://localhost:3001/edit-user-order';
                Axios.put(url, { updateid: data.orderid, quantity: id }).then((response) => {
                    if (response) {
                        alert('Updated Successfully...');
                        //console.log(response);
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
            return;
        }
        else {
            alert('invalid');
            return;
        }
    }
    return (
        <>
            <div className="container">
                <h4>Foodname: {data.foodname}</h4>
                <div class="mb-3">
                    <label for="quantity" className="form-label fs-4">Quantity:</label>
                    <input type="number" onChange={Input} value={id} className="form-control" id="quantity" min="1" placeholder="Edit Quantity..." />
                </div>
                <button className="btn btn-outline-primary" onClick={Update}>Update</button>
            </div>
        </>
    )
}
