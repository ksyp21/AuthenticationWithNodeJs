const express = require("express")
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
        password: password
    })
    res.send("User registered successfully")
})


app.listen(3000, function () {
    console.log("Node started at port 3000")
})