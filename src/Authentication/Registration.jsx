import React, { useState, useContext } from "react";
import FadeIn from "react-fade-in";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import { Authnetication } from "../Authentication/Loginsession/Loginsession";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function Registration() {
  //let [auth, setAuth] = useContext(Authnetication);
  let userAuth = useSelector((state) => state.auth.isLoggedin);
  let userfield = { fullname: "", email: "", password: "" };
  let [user, setUserregistration] = useState(userfield);
  let [check, setCheck] = useState(true);
  let history = useHistory();
  let Input = (e) => {
    let { name, value } = e.target;
    setUserregistration((data) => {
      return { ...data, [name]: value };
    });
  };
  let Signup = (e) => {
    e.preventDefault();
    if (user.fullname === "" || user.email === "" || user.password === "") {
      toast.error("Input Fields are mandatory!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (user.password.length <= 8) {
      toast.error("Password Length must be greater than 8!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setError("Password Length must be greater than 8!!!");
      return;
    } else {
      setCheck(false);
      Axios.post("http://localhost:3001/user-registration", {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
      })
        .then((response) => {
          //console.log(response);
          if (response.data.message) {
            toast.error(response.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setCheck(true);
            return;
          } else if (response.data.errmsg) {
            console.log(response.data.errmsg);
            alert(response.data.errmsg);
            setCheck(true);
          } else {
            alert(response.data);
            setCheck(true);
            //alert('message sent');
            setUserregistration(userfield);
            // setAuth(user.email);
            // history.push('/dashboard');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //console.log(user)
  };
  if (userAuth) {
    history.push("/my-cart");
  }
  return (
    <div>
      <FadeIn>
        <div className="container">
          <div className="container">
            <div className="card auth">
              <div className="card-body">
                <h2 className="container text-center">
                  Welcome in Sign up page:)
                </h2>
                <form onSubmit={Signup}>
                  <div className="form-group">
                    <label for="name">Full Name:</label>
                    <input
                      name="fullname"
                      onChange={Input}
                      value={user.fullname}
                      type="text"
                      className="form-control mb-2 mt-2"
                      id="name"
                      aria-describedby="emailHelp"
                      placeholder="Enter fullname"
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email address:</label>
                    <input
                      name="email"
                      onChange={Input}
                      value={user.email}
                      type="email"
                      className="form-control mb-2 mt-2"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group mb-2">
                    <label for="password">Password:</label>
                    <input
                      name="password"
                      onChange={Input}
                      value={user.password}
                      type="password"
                      className="form-control mt-2"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <button
                    className="btn btn-primary mb-3"
                    disabled={!check ? "disabled" : ""}
                  >
                    {!check ? "submitting" : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
      <ToastContainer />
    </div>
  );
}
