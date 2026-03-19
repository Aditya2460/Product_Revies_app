const bodyParser = require('body-parser');
const express = require ('express');
const AuthRouter=require('./Routes/Auth_Routes')
const productRoutes=require('./Routes/ProductRouter')
const reviewRoutes=require('./Routes/review')
const adminRoutes=require('./Routes/Admin')
const app = express();
const cors=require('cors')
require('dotenv').config();
require('./Models/db');

app.get('/pong',(req,res)=>{
    res.send('hello')
})
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)
app.use("/products",productRoutes);
app.use("/reviews",reviewRoutes);
app.use("/admin", adminRoutes);


const PORT = process.env.PORT || 8090;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
});