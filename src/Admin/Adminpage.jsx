import React from 'react';
import Admin from './Admin';
import { Switch, Route, useHistory } from "react-router-dom";
export default function Adminpage() {
    return (
        <>
            <Switch>
                <Route exact path="/admin" component={Admin} />
            </Switch>
        </>
    )
}
