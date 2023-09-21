const express = require("express")
const bcrypt = require("bcryptjs")
const { users } = require("./model/index")
const app = express()
app.set("view engine", "ejs")


//database connection
require("./model/index")

//parse incoming form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/register", (req, res) => {
    res.render("register")
})

//post api for handling user registration
app.post("/register", async (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password


    //server side validation
    if (!email || !password || !username) {
        return res.send("Please provide proper data.")
    }

    await users.create({
        email: email,
        username: username,
        password: bcrypt.hashSync(password, 8)
    })
    res.redirect("/login")

})
//login

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password


    //check for entered email with registered one
    const userExists = await users.findAll({
        where: {
            email: email
        }
    })
    if (userExists.length > 0) {
        //check password
        const isMatch = bcrypt.compareSync(password, userExists[0].password)
        if (isMatch) {
            res.send("Login successfully")
        }
        else {
            res.send("Invalid informatiion")
        }
    }
    else {
        res.send("invalid email or password")
    }
})


app.listen(3000, function () {
    console.log("Node started at port 3000")
})