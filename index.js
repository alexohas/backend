require('dotenv').config()
const express = require("express");
const app = express();
const methodOverride = require("method-override");
var cors = require('cors')
var ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

//Connecting to mongodb.
MongoClient.connect("mongodb+srv://ao1283:Valexcon19@cluster0.flsye.mongodb.net/after-school", { useUnifiedTopology: true}, function(err, client) {
      console.log("Mongo Connection Open");
      app.use(cors("*"))

    // app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.use(express.json()) 
    app.use (express.urlencoded({extended: false}))
    //SHOW PRODUCTS
    app.get("/lessons", async (req, res) => {
        try {
            let val = await client.db('after-school').collection('lessons').find({}).toArray()
            res.json({ lessons: val });
        } catch (error) {
            res.status(400).json({error})
        }
        
    });
      
      //SAVE ORDER
      app.post("/orders", async (req, res) => {
          let { contents, user, total } = req.body
          
          let val = await client.db().collection('orders').insertOne({ contents, user, total })
          for (let item of contents) {
                await client.db().collection('lessons').updateOne({ _id: new ObjectId(item.lesson) }, { $inc: { space: -1 * item.quantity } })
            }
        res.json({ order: val.ops[0], message: "Order placed successfully" });
      });
      
      app.post("/fetch-orders", async (req, res) => {
        let { user } = req.body
          let val = await client.db().collection('orders').find({
              $or: [{
            'user.name': user.name
              }, { 'user.phone': user.phone }]
          }).toArray()

          for (let order of val) {
            for (let content of order.contents) {
                let lesson = await client.db().collection('lessons').findOne({ _id: new ObjectId(content.lesson) })
                content.lesson = lesson
            }
        }
      res.json({ orders: val, message: "Orders retrieved successfully" });
      
  });

    app.listen(process.env.PORT, () => {
        console.log("App is listening at port "+process.env.PORT );
    });
  })
