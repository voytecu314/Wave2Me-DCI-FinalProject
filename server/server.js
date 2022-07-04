import express from  'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from  'mongoose';

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(
    app.listen(port, () =>
      console.log(
        "Database and Server listening on port:", port
      )
    )
  )
  .catch((err) => console.log(err));

//http://localhost:5000/
app.get('/', (req,res) => {
    res.send('Hi there')
})