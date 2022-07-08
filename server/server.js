import express from  'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from  'mongoose';
import loginRoutes from './routes/loginRoutes.js'

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

//ROUTES
app.use('/', loginRoutes);

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

//To handle errors after initial connection was established
mongoose.connection.on('disconnected', () => { console. log('DB-> lost connection'); }); 

//http://localhost:5000/
app.get('/', (req,res) => {
    res.send('Hi there')
})