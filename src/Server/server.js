let express = require("express");
const app = express();
let mysql = require("mysql");
let cors = require("cors");
let bodyParser = require("body-parser");
let conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactuser",
});
app.use(cors());
app.use(express.json()); //this allows you to grap the data from frontend i.e. form input filed which store the data in json format
app.use(bodyParser.urlencoded({ extended: true }));
const { textTransform } = require("text-transform");
let bcrypt = require("bcrypt"); //helps to secure password
const saltRounds = 10;
const nodemailer = require("nodemailer");
var randomToken = require("random-token");
//addcategory
app.post("/addcategory", (req, resp) => {
  let category = req.body.category;
  let validate = "SELECT * FROM `category` WHERE category=?";
  conn.query(validate, category, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      resp.send({ message: `${category} is already added!!!` });
    } else {
      let insert = "INSERT INTO `category`(`category`) VALUES (?)";
      conn.query(insert, category, (err, response) => {
        if (err) throw err;
        resp.send(response);
      });
    }
  });
});
//showcategory
app.get("/showcategory", (req, resp) => {
  let getcategory = "SELECT * FROM `category`";
  conn.query(getcategory, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//editcategory
app.get("/editcategory/:id", (req, resp) => {
  let id = req.params.id;
  let getcategory = "SELECT * FROM `category` WHERE id=?";
  conn.query(getcategory, id, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//updatecategory
app.put("/updatecategory", (req, resp) => {
  let category = req.body.category;
  let id = req.body.id;
  let getcategory = "SELECT * FROM `category` WHERE category=?";
  conn.query(getcategory, category, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      resp.send({ message: `${category} already exist in your system!!!` });
    } else {
      let update = "UPDATE `category` SET `category`=? WHERE id=?";
      conn.query(update, [category, id], (err, response) => {
        if (err) throw err;
        resp.send(response);
      });
    }
  });
});
//deletecategory
app.delete("/deletecategory/:id", (req, resp) => {
  let id = req.params.id;
  let getcategory = "SELECT * FROM `food` WHERE category=?";
  conn.query(getcategory, id, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      resp.send({ message: "Data Cannot Be Deleted!!!" });
    } else {
      let deletee = "DELETE FROM `category` WHERE id=?";
      conn.query(deletee, id, (err, response) => {
        if (err) throw err;
        resp.send(response);
      });
    }
  });
});
//adminFood
app.get("/adminfood", (req, resp) => {
  //let getfood = 'SELECT a.id,a.name,a.price,a.category,b.id,b.category FROM `food` a,`category` b WHERE a.category=b.id';
  let getfood = `SELECT food.id,food.name,food.price,category.category FROM food LEFT JOIN category ON food.category=category.id`;
  conn.query(getfood, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
app.get("/food", (req, resp) => {
  let category = "SELECT * FROM `food`";
  try {
    conn.query(category, (err, response) => {
      if (err) throw err;
      resp.send(response);
    });
  } catch (err) {
    console.log(err);
  }
});
//adminaddFood
app.post("/addfood", (req, resp) => {
  let foodname = req.body.foodname;
  let category = req.body.categoryy;
  let price = req.body.price;
  let testing = textTransform(foodname, "title");
  //console.log(testing);
  //let data = [foodname, category, price];
  let check = "SELECT * FROM `food` WHERE name=?";
  conn.query(check, testing, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      resp.send({ message: `${testing} is already added in your database!!!` });
    } else {
      let insert =
        "INSERT INTO `food`(`name`, `price`, `category`) VALUES (?,?,?)";
      conn.query(insert, [testing, price, category], (err, response) => {
        if (err) throw err;
        resp.send(response);
      });
    }
  });
  //console.log(data);
});
//admindeletefood
app.delete("/deletefood/:valuee", (req, resp) => {
  let foodname = req.params.valuee;
  let deletee = "DELETE FROM `food` WHERE id=?";
  conn.query(deletee, foodname, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//admineditfood
app.get("/editfood/:valuee", (req, resp) => {
  let foodname = req.params.valuee;
  let check = "SELECT * FROM `food` WHERE id=?";
  conn.query(check, foodname, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//adminupdatefood
app.put("/updatefood/:value", (req, resp) => {
  let foodid = req.params.value;
  let name = req.body.name;
  let price = req.body.price;
  let updatee = "UPDATE `food` SET `name`=?,`price`=? WHERE id = ?";
  conn.query(updatee, [name, price, foodid], (err, response) => {
    if (err) {
      resp.send({ message: "Server Err!!!" });
    } else {
      resp.send({ messagee: "Data Updated" });
    }
  });
  // let check = 'SELECT * FROM `food` WHERE name=?';
  // conn.query(check, name, (err, response) => {
  //     if (err) throw err;
  //     if (response.length > 0) {
  //         resp.send({ message: `${name} already exists!!!}` })
  //     }
  //     else {
  //         let updatee = 'UPDATE `food` SET `name`=?,`price`=? WHERE id = ?';
  //         conn.query(updatee, [name, price, foodid], (err, response) => {
  //             if (err) throw err;
  //             resp.send(response);
  //         })
  //     }
  // })
});
//adminorderdetail
app.get("/orderDetail", (req, resp) => {
  let orderdetail = `SELECT orderdetail.orderid,orderdetail.loginuser, orderdetail.orderdate,login.fullname FROM orderdetail LEFT JOIN login ON orderdetail.loginuser=login.email`;
  conn.query(orderdetail, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//adminuserorder
app.get("/userOrderr/:userkey", (req, resp) => {
  //let orders = 'SELECT  a.foodname, a.price, a.quantity, a.loginuser, a.userdelivery,b.id,b.fullname,b.address,b.contact,b.contact2,b.email FROM `userorder` a,`userdeliverform` b WHERE  a.userdelivery=b.id';
  let userkey = req.params.userkey;
  let orders = `SELECT userorder.id,userorder.orderid,userorder.foodname, userorder.price,userorder.quantity,userorder.loginuser,userdeliverform.fullname,userdeliverform.address,userdeliverform.contact,userdeliverform.contact2,userdeliverform.email
    FROM userorder LEFT JOIN userdeliverform ON userdeliverform.id=userorder.userdelivery`;
  conn.query(orders, (err, response) => {
    if (err) throw err;
    let data = response.filter((curval) => {
      return curval.orderid === userkey;
    });
    if (data) {
      resp.send(data);
      //console.log(data);
    }
  });
});
//adminCancelorderANDorder-detail
app.delete("/cancel-order-orderdetail/:orderid", (req, resp) => {
  let orderid = req.params.orderid;
  let orderdetail = "DELETE FROM `orderdetail` WHERE orderid = ?";
  conn.query(orderdetail, orderid, (err, response) => {
    if (err) throw err;
    if (response) {
      let deletee = "DELETE FROM `userorder` WHERE orderid=?";
      conn.query(deletee, orderid, (err, response) => {
        if (err) throw err;
        if (response) {
          resp.send(true);
        }
      });
    }
  });
  //console.log(orderid);
});
//admincancelorder
app.delete("/cancelOrder/:id", (req, resp) => {
  let id = req.params.id;
  //console.log(id);
  let deletee = "DELETE FROM `userorder` WHERE id=?";
  conn.query(deletee, id, (err, response) => {
    if (err) throw err;
    if (response) {
      resp.send(true);
    }
  });
});
//deliverallorder--orderhistory
app.delete("/deliver-order-orderhistory/:orderid", (req, resp) => {
  let orderid = req.params.orderid;
  let orders = "SELECT * FROM `userorder` WHERE orderid=?";
  conn.query(orders, orderid, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      let dataa = response;
      let orderhistory =
        "INSERT INTO `order-history`( `foodname`, `price`, `quantity`, `orderid`, `userdelivery`, `loginuser`, `orderdate`) VALUES ?";
      conn.query(
        orderhistory,
        [
          dataa.map((curval) => [
            curval.foodname,
            curval.price,
            curval.quantity,
            curval.orderid,
            curval.userdelivery,
            curval.loginuser,
            curval.orderdate,
          ]),
        ],
        (err, response) => {
          if (err) throw err;
          if (response) {
            let orderdetail = "DELETE FROM `orderdetail` WHERE orderid = ?";
            conn.query(orderdetail, orderid, (err, response) => {
              if (err) throw err;
              if (response) {
                let deletee = "DELETE FROM `userorder` WHERE orderid=?";
                conn.query(deletee, orderid, (err, response) => {
                  if (err) throw err;
                  if (response) {
                    resp.send(true);
                    //console.log(true);
                  }
                });
              }
            });
          }
        }
      );
    } else {
      resp.send({ message: "No order exists!!!" });
    }
  });
  //console.log(orderid);
});
//admin-edit-userorder
app.put("/edit-user-order", (req, resp) => {
  let updateid = req.body.updateid;
  let quantity = req.body.quantity;
  //console.log([updateid, quantity]);
  let update = "UPDATE `userorder` SET `quantity`=? WHERE id=?";
  conn.query(update, [quantity, updateid], (err, response) => {
    if (err) throw err;
    if (response) {
      resp.send(true);
    }
  });
});
//Authentication
//user email section
let transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  auth: {
    user: "mailtesting246@gmail.com",
    pass: "gyvnisfcuailexba",
  },
});
//user-registration
app.post("/user-registration", (req, resp) => {
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;
  let check = "SELECT * FROM `login` WHERE email =?";
  conn.query(check, email, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      resp.send({ message: "Email Already Exists!!!" });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        let status = "inactive";
        var token = randomToken(16);
        let insert =
          "INSERT INTO `login`( `fullname`,`email`, `password`, `status`, `token`) VALUES (?,?,?,?,?)";
        conn.query(
          insert,
          [fullname, email, hash, status, token],
          (err, response) => {
            if (err) throw err;
            if (response) {
              let mail = {
                from: "mailtesting246@gmail.com",
                to: email,
                subject: "Email Testing",
                html: `<h3 className="text-center">Email Verification</h3>
                            <h2>Your Token No: ${token}</h2>
                                  Hello ${fullname}. Your Account has been succesfully created. To verify your account click this click: http://localhost:3000/verification`,
              };
              transporter.sendMail(mail, (err) => {
                if (err) {
                  console.log(err);
                  resp.send({ errmsg: "Error Sending Mail" });
                  console.log("Email Err");
                } else {
                  resp.send(
                    `Hello, ${fullname} your account has been successfully created. Please Check Your Email for your Verification.`
                  );
                }
              });
            }
          }
        );
      });
    }
  });
});
//user-login
app.post("/user-login", (req, resp) => {
  let email = req.body.email;
  let password = req.body.password;
  //console.log(email);
  let check = "SELECT * FROM `login` WHERE email =?";
  conn.query(check, email, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      let status = "active";
      let login = "SELECT * FROM `login` WHERE email =? AND status=?";
      conn.query(login, [email, status], (err, response) => {
        if (err) throw err;
        if (response.length > 0) {
          bcrypt.compare(password, response[0].password, (err, validate) => {
            if (err) throw err;
            if (validate) {
              resp.send(true);
            } else {
              resp.send({ message: "Password Invalid!!!" });
            }
          });
        } else {
          resp.send({ message: "Please Verify Your Email." });
        }
      });
    } else {
      resp.send({ message: `${email} doesn't exist in our system!!!` });
    }
  });
});
//forgot-pw
app.get("/forgot-pw/:email", (req, resp) => {
  let email = req.params.email;
  let validate = "SELECT * FROM `login` WHERE email =?";
  conn.query(validate, email, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      let email = response[0].email;
      let fullname = response[0].fullname;
      let mail = {
        from: "mailtesting246@gmail.com",
        to: email,
        subject: "Email Testing",
        html: `<h3 className="text-center">Forgot Password Verification</h3>
                  Hello ${fullname}. To Recover Your Password, click this click: http://localhost:3000/recoverpassword`,
      };
      transporter.sendMail(mail, (err) => {
        if (err) {
          console.log(err);
          resp.send({ msg: "Server Err..." });
        } else {
          resp.send(
            `Hello ${fullname}, Please Check Your Email For Password Recovery:)`
          );
        }
      });
    } else {
      resp.send({ message: `${email} doesn't exist in our system!!!` });
    }
  });
});
//reconerpassword
app.put("/recover-password", (req, resp) => {
  let email = req.body.email;
  let password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    let recover = "UPDATE `login` SET `password`=? WHERE email=?";
    conn.query(recover, [hash, email], (err, response) => {
      if (err) throw err;
      if (response) {
        let mail = {
          from: "mailtesting246@gmail.com",
          to: email,
          subject: "Email Testing",
          html: `<h3 className="text-center">Recover Password</h3>
                <p>Hello ${email}, Your Password has been successfully recovered:)</p>`,
        };
        transporter.sendMail(mail, (err) => {
          if (err) throw err;
          resp.send(true);
        });
      }
    });
  });
});
//tokenVerification
app.put("/token-verification", (req, resp) => {
  let tokenn = req.body.token;
  let check = "SELECT * FROM `login` WHERE token = ?";
  conn.query(check, tokenn, (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      let fullname = response[0].fullname;
      let email = response[0].email;
      let status = "active";
      let verify = " UPDATE `login` SET `status`=? WHERE token = ?";
      conn.query(verify, [status, tokenn], (err, response) => {
        if (err) throw err;
        if (response) {
          let mail = {
            from: "mailtesting246@gmail.com",
            to: email,
            subject: "Login Status",
            html: `<h3 className="text-center">Login Status</h3>
                          Hello ${fullname}. Your Account Has Been Succesfully Activated:).`,
          };
          transporter.sendMail(mail, (err) => {
            if (err) {
              console.log(err);
            } else {
              resp.send({
                msg: `Hello ${fullname}, Your Account Is Successfully Activated:)`,
              });
            }
          });
        }
      });
    } else {
      resp.send({ message: "Token No. Invalid!!!" });
    }
  });
});
//userAddtocart
app.post("/cart", (req, resp) => {
  let name = req.body.name;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let user = req.body.user;
  // let data = [name, price, quantity]
  //console.log(data);
  try {
    let verification = "SELECT * FROM `cart` WHERE name =? AND user=?";
    conn.query(verification, [name, user], (err, response) => {
      if (err) throw err;
      if (response.length > 0) {
        resp.send({ msg: `${name} is already in your cart!!!` });
      } else {
        let insert =
          "INSERT INTO `cart`( `name`, `price`, `quantity`,`user`) VALUES (?,?,?,?)";
        conn.query(insert, [name, price, quantity, user], (err, response) => {
          if (err) throw err;
          resp.send(response);
        });
      }
    });
  } catch (err) {
    resp.send({ msg: "Something Wrong. Refresh it!!!" });
    console.log(err);
  }
});
app.get("/finalCart/:user", (req, resp) => {
  let user = req.params.user;
  try {
    let valid = "SELECT * FROM `cart` WHERE user=?";
    conn.query(valid, user, (err, response) => {
      if (err) throw err;
      resp.send(response);
    });
  } catch (err) {
    console.log(err);
  }
});
app.put("/cartUpdate", (req, resp) => {
  let id = req.body.id;
  let quantity = req.body.quantity;
  //let data = [id, quantity];
  let update = "UPDATE `cart` SET `quantity`=? WHERE id=?";
  conn.query(update, [quantity, id], (err, response) => {
    if (err) throw err;
    resp.send(response);
  });

  //console.log(data);
});
app.delete("/cartDelete/:id", (req, resp) => {
  let id = req.params.id;
  let deletee = "DELETE FROM `cart` WHERE id=?";
  conn.query(deletee, id, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//user delivery form
app.post("/userdeliveryform", (req, resp) => {
  let fullname = req.body.fullname;
  let address = req.body.address;
  let contact = req.body.contact;
  let contact2 = req.body.contact2;
  let email = req.body.email;
  let activeuser = req.body.active;
  // let data = [fullname, address, contact, contact2, email, activeuser];
  // console.log(data);
  let insert =
    "INSERT INTO `userdeliverform`(`fullname`, `address`, `contact`, `contact2`, `email`, `loginemail`) VALUES (?,?,?,?,?,?)";
  conn.query(
    insert,
    [fullname, address, contact, contact2, email, activeuser],
    (err, response) => {
      if (err) throw err;
      resp.send(response);
    }
  );
});
app.get("/userdeliveryformm/:active", (req, resp) => {
  let active = req.params.active;
  let get = "SELECT * FROM `userdeliverform` WHERE loginemail=?";
  conn.query(get, active, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//orderdetail
app.post("/orderdetail", (req, resp) => {
  let orderid = req.body.orderid;
  let user = req.body.user;
  let orderdate = req.body.orderdate;
  console.log(orderdate);
  let orderdetail =
    "INSERT INTO `orderdetail`( `orderid`,`loginuser`,`orderdate`) VALUES (?,?,?)";
  conn.query(orderdetail, [orderid, user, orderdate], (err, response) => {
    if (err) throw err;
    resp.send(true);
  });
});
//userOrder
app.post("/userOrder", (req, resp) => {
  let foodname = req.body.foodname;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let auth = req.body.active;
  let deliveryid = req.body.deliverid;
  let orderid = req.body.orderid;
  let orderdate = req.body.orderdate;
  //let data = [foodname, price, quantity, auth, deliveryid];
  let insert =
    "INSERT INTO `userorder`( `orderdate`,`orderid`,`foodname`, `price`, `quantity`, `loginuser`, `userdelivery`) VALUES (?,?,?,?,?,?,?)";
  conn.query(
    insert,
    [orderdate, orderid, foodname, price, quantity, auth, deliveryid],
    (err, response) => {
      if (err) throw err;
      if (response) {
        let deletee = "DELETE FROM `cart` WHERE user=?";
        conn.query(deletee, auth, (err, response) => {
          if (err) throw err;
          if (response) {
            let user = "SELECT * FROM `login` WHERE email=? ";
            conn.query(user, auth, (err, response) => {
              if (err) throw err;
              if (response.length > 0) {
                let fullname = response[0].fullname;
                let mail = {
                  from: "mailtesting246@gmail.com",
                  to: auth,
                  subject: "Product Order!!!",
                  html: `<h3 className="text-center">User Order</h3>
                                  Hello ${fullname}, Your Order Has Been Succesfully Received.<br/><h3">Your OrderId: ${orderid}</h3>.`,
                };
                transporter.sendMail(mail, (err) => {
                  if (err) throw err;
                  resp.send(true);
                });
              }
            });
          }
        });
      }
    }
  );
  //console.log(data);
});
app.get("/myorder/:auth", (req, resp) => {
  let auth = req.params.auth;
  let order = "SELECT * FROM `userorder` WHERE loginuser=?";
  conn.query(order, auth, (err, response) => {
    if (err) throw err;
    resp.send(response);
  });
});
//user-order-history
app.get("/user-order-history/:user", (req, resp) => {
  let user = req.params.user;
  let orderhistory = "SELECT * FROM `order-history` WHERE loginuser = ?";
  conn.query(orderhistory, user, (err, response) => {
    if (err) throw err;
    if (response) {
      resp.send(response);
    }
  });
});
app.get("/", (req, res) => {
  res.send("Hello Ashish"); //return the data to client side i.e. front end
});
app.listen(3001, () => {
  console.log("running port on 3001");
});
