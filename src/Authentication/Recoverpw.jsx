import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Axios from 'axios';
export default function Recoverpw() {
    let [password, setPassword] = useState({ password: '', repassword: '' });
    let [see, setSee] = useState(true);
    let [check, setCheck] = useState(true);
    let history = useHistory();
    let email = localStorage.getItem('lome');
    let Input = (e) => {
        let { name, value } = e.target;
        setPassword((data) => {
            return { ...data, [name]: value }
        })
    }
    let Visible = () => {
        see ? setSee(false) : setSee(true);
    }
    let Verify = (e) => {
        e.preventDefault();
        setCheck(false);
        if (password.password === '' || password.repassword === '') {
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
        else if (password.password.length <= 8) {
            toast.error('Password length must be over eight character!!!', {
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
        else if (password.password !== password.repassword) {
            toast.error('Password mis-matched!!!', {
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
                let url = 'http://localhost:3001/recover-password';
                Axios.put(url, { email: email, password: password.password }).then((response) => {
                    //console.log(response);
                    alert('Password Updated');
                    localStorage.removeItem('lome');
                    setCheck(true);
                    history.push('/login');
                })
            }
            catch (err) {
                console.log(err);
            }
            //console.log(password);
        }
    }
    if (!email) {
        history.push('/forgotpassword');
    }
    return (
        <div>
            <div className="container">
                <div className="card auth">
                    <h2 className="container text-center mt-2">Recover Password</h2>
                    <hr className="mx-auto w-25" />
                    <div className="card-body">
                        <form onSubmit={Verify}>
                            <div className="mb-3">
                                <label for="recoverpw" className="form-label">Password:</label>
                                <input onChange={Input} name="password" value={password.password} type={see ? 'password' : 'text'} className="form-control" id="recoverpw" /> <span onClick={Visible} className="field-icon">{see ? (<AiFillEyeInvisible />) : (<AiFillEye />)}</span>
                            </div>
                            <div className="mb-3">
                                <label for="recoverpww" className="form-label">Re-Password:</label>
                                <input onChange={Input} name="repassword" value={password.repassword} type={see ? 'password' : 'text'} className="form-control" id="recoverpww" /><span onClick={Visible} className="field-icon">{see ? (<AiFillEyeInvisible />) : (<AiFillEye />)}</span>
                            </div>
                            <button type="submit" disabled={!check ? 'disabled' : ''} className="btn btn-primary" >{!check ? 'Processing...' : 'Recover Password'}</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
