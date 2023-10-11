import React, { useState, useEffect, useContext } from 'react';
import FadeIn from 'react-fade-in';
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import { authAction } from './Loginsession/Loginslice';
import { useDispatch, useSelector } from 'react-redux';
export default function Login() {
    let userfield = { email: "", password: "" };
    let [user, setUserlogin] = useState(userfield);
    let [check, setCheck] = useState(true);
    let [save, setSave] = useState(false);
    let userAuth = useSelector(state => state.auth.isLoggedin)
    //let [auth, setAuth] = useContext(Authnetication);
    let dispatch = useDispatch();
    let history = useHistory();
    let Input = (e) => {
        let { name, value } = e.target;
        setUserlogin((data) => {
            return { ...data, [name]: value }
        })
    }
    let Login = (e) => {
        e.preventDefault();
        setCheck(false);
        if (user.email === "" || user.password === "") {
            toast.error('Input Fields are mandatory!!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setCheck(true);
            return;
        }
        else {
            try {
                let url = 'http://localhost:3001/user-login';
                Axios.post(url, { email: user.email, password: user.password }).then((response) => {
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
                        setCheck(true);
                    }
                    else {
                        setCheck(true);
                        localStorage.setItem('mero', user.email);
                        localStorage.setItem('login', true)
                        dispatch(authAction.login())
                        //setAuth(user.email);
                        history.push('/user-dash');
                        //console.log(response);
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    let Saveusernameandpw = () => {
        if (!save) {
            localStorage.setItem('save', !save);
            setSave(localStorage.getItem('save'));
        }
        else {
            localStorage.setItem('save', !save);
            setSave(localStorage.getItem('save'));
        }
    }
    if (userAuth) {
        history.push('/user-dash');
    }
    return (
        <div>
            <FadeIn>
                <div className="container">
                    <div className="card auth">
                        <div className="card-body">
                            <h2 className="container text-center">Welcome in Login page:)</h2>
                            <form onSubmit={Login}>
                                <div className="form-group mb-2">
                                    <label for="email">Email address:</label>
                                    <input name="email" onChange={Input} value={user.email} type="email" className="form-control mt-2" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted mt-2 ">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label for="password">Password:</label>
                                    <input name="password" onChange={Input} value={user.password} type="password" className="form-control mb-2 mt-2" id="password" placeholder="Password" />
                                </div>
                                <div class="form-check">
                                    <input onChange={Saveusernameandpw} class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for={localStorage.getItem('save') === true ? 'flexCheckChecked' : 'flexCheckDefault'}>
                                        Save Username And Password
                                    </label>
                                </div>
                                <button className="btn btn-primary mb-3" disabled={!check ? 'disabled' : ''}>{!check ? 'Processing' : 'SIGN IN'}</button>
                                <br /><Link to="forgotpassword">Forgot Password?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </FadeIn>
            <ToastContainer />
        </div>
    )
}
