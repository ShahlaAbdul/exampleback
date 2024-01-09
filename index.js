import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
const app = express()
const port = 3100

app.use(cors())

app.use(express.json())
const carSchema = new mongoose.Schema({
    image:String,
    name: String,
    price: Number,
    year: Number,
});

const carModel = mongoose.model("Car", carSchema)
app.get('/', async (req, res) => {
   try {
    const cars= await carModel.find({})
    res.send(cars)
   } catch (error) {
    res.send(error.message)
   }
    
})

app.get('/:id', async (req, res) => {
    try {
        const {id}= req.params
        const cars = await carModel.findById(id)
    res.send('Hello World!')
    } catch (error) {
        res.send(error.message)
    } 
})

app.post('/', async (req, res) => {
    const {image,name,price,year}=req.body
    const newCars = new carModel({image,name,price,year})
    await newCars.save()
    res.send('Got a POST request')
})

app.put('/:id', async (req, res) => {
    try {
    const {id}= req.params
    const {image,name,price,year}=req.body
    const product=await carModel.findByIdAndUpdate(id)
    res.send('Put methodu ugurlu')
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
   try {
    const {id}= req.params
    const product=await carModel.findByIdAndDelete(id)
    res.send('delete methodu ugurlu')
   } catch (error) {
    res.send(error.message)
   }
})


mongoose.connect('mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/')
.then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})