import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in';
import Axios from 'axios';
export default function Dashboard() {
    let [categoryy, showCategoryy] = useState();
    let [menu, showMenu] = useState();
    let myCategory = () => {
        try {
            let url = "http://localhost:3001/showcategory";
            Axios.get(url).then((response) => {
                if (response) {
                    showCategoryy(response.data.length);
                    //console.log(response);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    let myFood = () => {
        let url = 'http://localhost:3001/adminfood';
        try {
            Axios.get(url).then((response) => {
                if (response) {
                    console.log(response);
                    showMenu(response.data.length);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        myCategory();
        myFood();
    }, [])
    return (
        <div className="container">
            <FadeIn>
                <div class="card cardd">
                    <div class="card-body">
                        <h2 className="text-center">Dashboard</h2>
                        <hr className="mx-auto w-25" />
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-12 mb-3">
                                <div class="card card-dash prduct">
                                    <div class="card-body text-white p-3 text-center">
                                        <h4>Total Product:</h4>
                                        <h5>{menu}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 col-12">
                                <div class="card card-dash catg">
                                    <div class="card-body text-white p-3 text-center">
                                        <h4>Total Category:</h4>
                                        <h5>{categoryy}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}
