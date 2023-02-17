require('dotenv').config();
const express = require('express');
const mongoose = require ('mongoose');
const Book = require ('./models/books');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB = async () => {
 try {
    const conn =await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
 } catch (error){
    console.log(error);
    process.exit(1);
 }

}


app.get('/', (req, res) =>{
   res.send({title: 'Books'});
});


app.get('/add-note',  async (req, res) =>{
    try {
        await Book.insertMany([
            {
                title: "Son of Anarchy",
                body: " Body 1",
            },
            {
                title: "Games of Thrones",
                body: " Body 2",
            }
        ]);        
    } catch(error) {
        console.log("err", + error);
    }
    res.send({title: 'Books added'});
 });


 app.get('/books',  async (req, res) =>{
   const book = await Book.find();

   if (book) {
    res.json(book)
   } else {
    res.send('Something wnet wrong');
   }
 });






connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Listering on port ${PORT}`)
})
});
