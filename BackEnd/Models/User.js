const mongoose= require('mongoose');
const schema= mongoose.Schema;
const UserSchema= new schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
}
});
const productSchema = new mongoose.Schema({
  name:String,
  price:Number,
  description:String,
  image:String
});
const reviewSchema = new mongoose.Schema({
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },
  user:String,
  comment:String
});

const  Review= mongoose.model("Review",reviewSchema);
const  Product= mongoose.model("Product",productSchema);
const UserModel= mongoose.model('users',UserSchema);
module.exports={UserModel, Review, Product,};
