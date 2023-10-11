import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
export default function Verification() {
    let [token, setToken] = useState({ token: '' });
    let [check, setCheck] = useState(true);
    let history = useHistory();
    let Input = (e) => {
        let tokenn = e.target.value;
        setToken(tokenn);
    }
    let Verify = (e) => {
        e.preventDefault();
        setCheck(false);
        try {
            let url = 'http://localhost:3001/token-verification';
            Axios.put(url, { token: token }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                    setCheck(true);
                }
                else {
                    alert(response.data.msg);
                    // setToken({ token: '' });
                    // setCheck(true);
                    history.push('/login');
                }
            })
        }
        catch (err) {
            console.log(err);
        }
        //alert(token);
    }
    return (
        <div>
            <div className="container">
                <div className="card auth">
                    <h2 className="container text-center mt-2">yourToken</h2>
                    <hr className="mx-auto w-25" />
                    <div className="card-body">
                        <form onSubmit={Verify}>
                            <div className="mb-3">
                                <label for="verification" className="form-label">Token No:</label>
                                <input onChange={Input} value={token.token} name="token" type="text" className="form-control" id="verification" />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={!check ? 'disabled' : ''}>{!check ? 'Verifying' : 'Verify'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
