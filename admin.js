
const express=require('express');
const app=express();
const morgan=require('morgan');
const connection=require('./config/ownerdb');
const ownerModel = require('./models/owner');
const cors = require('cors');
const userModel=require('./models/users')
const cartModel= require('./models/cart')

app.set('view engine', 'ejs')
app.use(cors());


//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


//gopalsinghtanwar2005_db_user
//1E2sUnmmO7WwCmPa
//mongodb+srv://gopalsinghtanwar2005_db_user:1E2sUnmmO7WwCmPa@cluster1.z9uif9k.mongodb.net/
//mongodb+srv://gopalsinghtanwar2005_db_user:<db_password>@cluster1.z9uif9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1


app.get('/',(req, res)=>{
    res.render('home');
})

app.get('/find-owner',(req, res)=>{
    res.render('find-owner');
})


// //third party middleware
// app.use(morgan('dev'));


// async function main(){
//     await dbConnection()
// }

//  main()
//     .then(()=>{console.log("connection successful")})
//     .catch(()=>{console.log("connection error")})


// app.use((req, res, next)=>{
//     console.log('these is middleware');
//     const a=2;
//     const b=3;

//     console.log(a+b);

//     return next();
// })



// app.get('/register',(req, res)=>{
//     console.log("request recived on home page")
//     res.render('index');
// })

// app.get('/get-details',(req, res)=>{
//     console.log(req.query);
//     res.send("details recived");
// })


app.post('/find-owner',async(req, res)=>{
    const {shopName} = req.body;
    const owner = await ownerModel.find({shopName: shopName});
   res.send(owner);
    })




app.get('/delete-owner', (req, res)=>{
    res.render('delete-owner');
})

app.post('/delete-owner', async(req, res)=>{
    const {shopName} = req.body;
     await ownerModel.findOneAndDelete({shopName: shopName});
    res.send("Shop Deleted");
})

app.get('/update-owner', (req, res)=>{
   
    res.render('find-shop');
})

app.post('/update-owner', async(req, res)=>{
    const {shopName} = req.body;
    console.log(shopName);
    const shop=await ownerModel.findOne({shopName});
    console.log(shop);
    res.render('update-owner', {shop});
})

app.post('/updated-owner', async(req,res)=>{
    const {shopId, shopName, ownerName, email, phone, password} = req.body;

    await ownerModel.findByIdAndUpdate(shopId, { shopName, ownerName, email, phone, password}, {new: true, runValidators: false});
    res.send("data successfully updated");
})

// app.get('/',(req, res)=>{
//     res.send('these is home page');
// })


// //custom middleware
// app.get('/profile' ,(req, res, next)=>{
//     console.log('these is middleware');
//     const a=2;
//     const b=3;

//     console.log(a+b);

//     return next();
// },
// (req, res)=>{
//     console.log("request recived on profile page")
//     res.send('these is profile page');
// })

app.get('/about',(req, res)=>{
    res.send('these is about page');
})

app.listen( 5000);



// const mongoose=require('mongoose');

// const connection=mongoose.connect('mongodb://0.0.0.0/redArc')
// .then(()=>{console.log("Database connected")})


// module.exports=connection;


