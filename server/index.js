import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

const { Schema } = mongoose


const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    image: { type: String, required: true },
})

const Users = mongoose.model("users", userSchema)


app.get("/users", async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
app.get("/users/:id", async (req, res) => {
    try {
        const users = await Users.findById(req.params.id)
        res.send(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
app.delete("/users/:id", async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "yuzir silindi" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
app.post("/users", (req, res) => {
    {
        // name: req.body.name,
        // surname: req.body.surname,
        // age: req.body.age,
        // image: req.body.image
        // //...req
    }
    const newUser = new Users.create(req.body)
    newUser.save()
    res.send({ message: "User Created" })
})
app.put("/users/:id", async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id)
        if (user) {
            user.name = req.body.name
            user.surname = req.body.surname
            user.age = req.body.age
            user.image = req.body.image

            await user.save()
            res.json(user)
        }
        else {
            res.status(404).json({ message: "Tapilmadi" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

const PORT = process.env.PORT
const url = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(url).catch(err => console.log("Db not connect" + err))


app.listen(PORT, () => {
    console.log("Server Connected");
})