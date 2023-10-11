import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
export default function Home() {
    let userAuth = useSelector(state => state.auth.isLoggedin)
    let history = useHistory();
    if (userAuth) {
        history.push('/user-dash')
    }
    return (
        <div>
            <div className="container">
                <h1 className="text-center mt-4">Welcome to Ashish Restaurant</h1>
                <hr className="mx-auto w-25" />
            </div>
        </div>
    )
}
