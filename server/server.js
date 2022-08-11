import express from  'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from  'mongoose';
import loginRoutes from './routes/loginRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import videosRoutes from './routes/videosRoutes.js';
import userDataRoutes from './routes/dataRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

//ROUTES
app.use('/', loginRoutes);
app.use('/', blogRoutes);
app.use('/', videosRoutes);
app.use('/', userDataRoutes);
app.use('/', ratingRoutes);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(
    app.listen(port, () =>
      console.log(
        "Database and Server listening on port:", port
      )
    )
  )
  .catch((err) => console.log(err.message));

mongoose.connection.on(`disconnected`, () => {console.log("DB disconnected");})

//http://localhost:5000/
app.get('/', (req,res) => {
    res.send('Hi there')
})