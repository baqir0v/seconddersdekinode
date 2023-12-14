import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const { Schema } = mongoose

const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
})

const Books = mongoose.model("users", bookSchema)

// Get All

app.get("/books", async (req, res) => {
    try {
        const user = await Books.find({})
        res.send(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Get By ID

app.get("/books/:id", async (req, res) => {
    try {
        const user = await Books.findById(req.params.id)
        if (user) {
            res.send(user)
        } else {
            res.status(404).json({ message: 'Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Delete By ID

app.delete("/books/:id", async (req, res) => {
    try {
        const deleteUser = await Books.findByIdAndDelete(req.params.id)
        if (deleteUser) {
            res.send(deleteUser)

        } else {
            res.status(404).json({ message: "lethal " })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Post

app.post("/books", async (req, res) => {
    try {
        const nyuBuk = new Books({
            ...req.body
        })
        nyuBuk.save()
        res.send(nyuBuk)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

const PORT = process.env.PORT
const url = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(url).catch(err => console.log("Db not connect" + err))

app.listen(PORT, () => {
    console.log("Salamtagi")
})