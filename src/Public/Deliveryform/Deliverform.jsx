import React, { useState, useContext } from 'react';
import { Authnetication } from '../../Authentication/Loginsession/Loginsession';
import Axios from 'axios';
export default function Userdeliveryform() {
    let orderUser = { fullname: '', address: '', contact: '', contact2: '', email: '' };
    let [orderData, setOrderdata] = useState(orderUser);
    let [auth, setAuth] = useContext(Authnetication);
    let userOrderr = (e) => {
        let { name, value } = e.target;
        setOrderdata((data) => {
            return { ...data, [name]: value }
        })
    }
    let userOrder = (e) => {
        e.preventDefault();
        if (orderData.fullname === "" || orderData.address === '' || orderData.contact === "" || orderData.email === "") {
            alert('Input Fields are madatory!!!');
        }
        else {
            let url = 'http://localhost:3001/userdeliveryform';
            try {
                Axios.post(url, { fullname: orderData.fullname, address: orderData.address, contact: orderData.contact, contact2: orderData.contact2, email: orderData.email, active: auth }).then((response) => {
                    if (response) {
                        alert('success');

                        // render(() => {
                        //     return props.delivery;
                        // })
                        //console.log(response);
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
            //console.log(orderData);

        }
    }
    return (
        <div>
            <form onSubmit={userOrder}>
                <div className="form-group">
                    <label for="fullname">Full Name:</label>
                    <input name='fullname' onChange={userOrderr} value={orderData.fullname} type="text" className="form-control mt-2 mb-2" id="fullname" placeholder="Enter fullname" />
                </div>
                <div className="form-group">
                    <label for="address">Address:</label>
                    <input name='address' onChange={userOrderr} value={orderData.address} type="text" className="form-control mt-2 mb-2" id="address" placeholder="Enter address" />
                </div>
                <div className="form-group">
                    <label for="contact">Contact:</label>
                    <input name='contact' onChange={userOrderr} value={orderData.contact} type="text" className="form-control mt-2 mb-2" id="contact" placeholder="Enter contact" />
                </div>
                <div className="form-group">
                    <label for="alternatecontact">Alternate Contact:</label>
                    <input name='contact2' onChange={userOrderr} value={orderData.contact2} type="text" className="form-control mt-2 mb-2" id="contact" placeholder="Enter contact" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address:</label>
                    <input name='email' onChange={userOrderr} value={orderData.email} type="email" className="form-control mt-2 mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
