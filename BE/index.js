import express from 'express';
import { config } from 'dotenv';
import cros from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import ProductModel from './model/product.js';
import UserModel from './model/users.js';


config();
await mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log('Connected database!');
});

// const port = 8080;
const app = express();
app.use(express.json());
app.use(cros());


app.get('', (req, res) => {
    req.send({
        message: 'Connected!'
    })
});

// up pic

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })


// endpoint up pic
app.use("/images", express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${8080}/images/${req.file.filename}`
    })
})

// create sp

app.post("/addproduct", async (req, res) => {
    let products = await ProductModel.find({}); // lấy dang sach sp trog Db
    let id;
    if (products.length > 0) { // 
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    try {
        const newData = req.body;
        newData.id = id;
        const createProduct = await ProductModel.create(newData);
        res.status(201).send({
            message: 'Successful!',
            data: createProduct
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: null
        })
    }
});

app.post('/removeproduct', async (req, res) => {
    await ProductModel.findOneAndDelete({ id: req.body.id });
    console.log("Remove");
    res.json({
        success: true,
        name: req.body.name
    })
})


// get list product
app.get('/allproduct', async (req, res) => {
    try {
        const product = await ProductModel.find({});
        res.status(200).send({
            message: 'Successful',
            data: product
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: null
        });
    }
})

// create user
app.post('/signup', async (req, res) => {

    let check = await UserModel.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false,errors:"exist user found with same email"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0
    }
    const user = new UserModel({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    } 

    const token = jwt.sign(data, process.env.SCRETKEY);
    res.json({success:true,token})
});


// login users
app.post('/login', async (req, res) => {

    let user = await UserModel.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, process.env.SCRETKEY);
            res.json({ success: true, token });
        } else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }else{
        res.json({success:false,errors:"Wrong Email"})
    }

});

//creat newcollection

app.get('/newcollections',async (req,res)=>{
    let products = await ProductModel.find({category:"nc"});
    let newcollection = products.slice(0, 4);
    console.log("NewCollection");
    res.send(newcollection);
})

//create hotitems
app.get('/hotitems', async(req,res)=>{
    let products = await ProductModel.find({category:"hi"});
    let hotitems = products.slice(0,4);
    console.log("Hot items fetched");
    res.send(hotitems)
})

//middleware create user
    const fetchUser = async(req,res,next)=>{
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({
                errors:"Please authenticate using valid token "
            })
        }
        else{
            try {
                const data = jwt.verify(token,process.env.SCRETKEY);
                req.user = data.user;
                next();
            } catch (error) {
                res.status(401).send({
                    error:"please authenticate using a valid token"
                })
            }
        }
    }


//create cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    // console.log(req.body,req.user);
    console.log("Added",req.body.itemId);
    let userData = await UserModel.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await UserModel.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//remove cart
app.post('/removefromcart', fetchUser,async ()=>{
    console.log("Removed",req.body.itemId);
    let userData = await UserModel.findOne({ _id: req.user.id });
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await UserModel.findByIdAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Remove")
})

// create cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await UserModel.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(8080, () => {
    console.log('Server is running!');
})