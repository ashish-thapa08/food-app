import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Authnetication } from '../../Authentication/Loginsession/Loginsession';
import { useSelector } from 'react-redux';
export default function Dashboard() {
    // let [auth, setAuth] = useContext(Authnetication);
    let userAuth = useSelector(state => state.auth.isLoggedin)
    let history = useHistory();
    console.log(userAuth)
    if (!userAuth) {
        history.push('/')
    }
    return (
        <div>
            <div className="container">
                <h5 className="text-center">Signed in as:<span><p>{localStorage.getItem('mero')}</p></span></h5>
            </div>
        </div>
    )
}
