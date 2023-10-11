import React, { useState } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
export default function Forgotpw() {
    let [email, setEmail] = useState('');
    let [check, setCheck] = useState(true);
    let [msg, setMsg] = useState('');
    let history = useHistory();
    let userAuth = useSelector(state => state.auth.isLoggedin)
    let Input = (e) => {
        let email = e.target.value;
        setEmail(email);
        setCheck(true);
    }
    let Verify = (e) => {
        e.preventDefault();
        setCheck(false);
        setMsg('');
        if (email === "") {
            alert('Input Fields are mandatory!!!');
            setCheck(true);
        }
        try {
            let url = `http://localhost:3001/forgot-pw/${email}`;
            Axios.get(url).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                    setCheck(true);
                }
                else if (response.data.msg) {
                    alert(response.data.msg);
                    setCheck(true);
                }
                else {
                    localStorage.setItem('lome', email);
                    setCheck(true);
                    setMsg(response.data);
                    setEmail('');
                    //console.log(response.data);
                }
            })
        }
        catch (err) {
            console.log(err);
            setCheck(true);
        }
        //alert(email);
    }
    if (userAuth) {
        history.push('/my-cart');
    }
    return (
        <div>
            <div className="container">
                <div className="card auth">
                    <h2 className="container text-center mt-2">yourEmail</h2>
                    <hr className="mx-auto w-25" />
                    <div className="card-body">
                        {msg ? (<div className="alert alert-success p-3 fw-bold" role="alert">
                            {msg}
                        </div>) : null}
                        <form onSubmit={Verify}>
                            <div className="mb-3">
                                <label for="forgotpw" className="form-label">Email:</label>
                                <input onChange={Input} value={email} type="email" className="form-control" id="forgotpw" />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={!check ? 'disabled' : ''}>{!check ? 'Verifying' : 'Verify'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
