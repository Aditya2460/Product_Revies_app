const mongoose= require('mongoose');

const mongo_url=process.env.Mong_conn;
mongoose.connect(mongo_url)
.then(()=>{
    console.log("mongodb connected .....");
    
}) .catch((err)=>{
    console.log("mongodb not connected", err);
    
})