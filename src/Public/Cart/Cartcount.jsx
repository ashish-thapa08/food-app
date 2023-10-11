import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Authnetication } from '../../Authentication/Loginsession/Loginsession';
export let Countt = createContext();
let Cartcount = (props) => {
    let [cartcount, setCount] = useState();
    let [auth, setAuth] = useContext(Authnetication);
    let Cart = () => {
        let url = `http://localhost:3001/finalCart/${auth}`;
        try {
            Axios.get(url).then((response) => {
                setCount(response.data.length);
                console.log(response.data.length)
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        Cart()
    })
    console.log(cartcount)
    return (
        <div>
            <Countt.Provider value={[cartcount, setCount]}>
                {props.children}
            </Countt.Provider>
        </div>
    )
}
export default Cartcount;
