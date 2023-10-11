import React, { useState, useEffect, createContext } from 'react'
export let Authnetication = createContext();
export default function Loginsession(props) {
    let [auth, setAuth] = useState('');
    let email = sessionStorage.getItem('mero');
    let Auth = () => {
        if (email) {
            setAuth(email);
        }
        else {
            setAuth(false);
        }
    }
    useEffect(() => {
        Auth();
    })

    return (
        <>
            <Authnetication.Provider value={[auth, setAuth]}>
                {props.children}
            </Authnetication.Provider>
        </>
    )
}
