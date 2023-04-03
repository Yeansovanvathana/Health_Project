const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const { db } = require("./config/firebase");
const bcrypt = require("bcrypt");
const passwordHash = require("password-hash");
const session = require("express-session");
const flash = require("connect-flash");
const async = require("hbs/lib/async");

const app = express();
const port = process.env.PORT || 5000;
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "/public");
const viewPath = path.join(__dirname, "/templete/views");
const PartialsPath = path.join(__dirname, "/templete/partials");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(PartialsPath);

app.use(express.static(publicDirectoryPath));
app.get("/", (req, res) => {
    res.render("login", { message: req.flash("message") });
});
app.get("/login", (req, res) => {
    res.render("index", { message: req.flash("message") });
});

app.get("/test", async (req, res) => {
    try {
        const userRef = db.collection("Admin");
        const snapshot = await userRef.get();
        const list = snapshot.docs.map((doc) => doc.data());
        list.forEach((element) => {
            console.log("loop" + element.username);
        });
        res.send(list);
        // console.log(list)
    } catch (error) {
        console.log(error);
    }
});
// app.use(logger)
app.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const userRef = db.collection("Admin").doc("Admin");
        const doc = await userRef.get();
        if (
            doc.data().username == username &&
            doc.data().password == password
        ) {
            req.flash("message", "Login successfully");
            res.redirect("/login");
        } else {
            req.flash("message", "Wrong username and password");
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
    }
});

// try {
// const salt = await bcrypt.genSalt(10);
// const hashedpassword = await bcrypt.hash(password, salt);
// const hashedpassword = passwordHash.generate(password);
// console.log(hashedpassword)
// const Admin = {
//     username,
//     hashedpassword,
// };
// await db.collection("Admin").doc("Admin").set(Admin);

//     const userRef = db.collection("Admin").doc("Admin");
//     const doc = await userRef.get();
//     if (
//         doc.data().username == username &&
//         doc.data().password == password
//     ) {
//         req.flash('message', 'Login successfully')
//         res.redirect('/login')
//     }else{
//         req.flash('message', 'Wrong username and password')
//         res.redirect('/')
//     }
// } catch (error) {
//         console.error(error);
// }

// function logger (){
//    return async function(req, res, next) {
//     try{
//         const userRef = db.collection("Admin")
//         const snapshot = await userRef.get();
//         const list = snapshot.docs.map((doc) => doc.data())
//         list.forEach((element) => {
//             console.log(element)
//             if ( element.username == username && element.password == password) {
//                 req.flash('message', 'Login successfully')
//                 res.redirect('/login')
//             }else {
//                 req.flash('message', 'Wrong username and password')
//                 res.redirect('/')
//             }
//         })
//         // res.send(list)
//         // console.log(list)
//     }catch(error){
//         console.log(error)
//     }
//     // next()
// }};
app.listen(port, () => {
    console.log("Server is up on port " + port);
});
