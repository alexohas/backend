const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
var cors = require('cors')
const Lessons = require("./models/lessons");
const Orders = require("./models/orders");

//Connecting to mongodb.
mongoose
  .connect("mongodb+srv://tech:Wittercell@development.8h65w.mongodb.net/after-school?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
      console.log("Mongo Connection Open");
      app.use(cors("*"))

    // app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.use(express.json()) 
    app.use (express.urlencoded({extended: false}))
    //SHOW PRODUCTS
    app.get("/lessons", async (req, res) => {
        const lessons = await Lessons.find({});
        res.json({ lessons });
    });
      
      //SAVE ORDER
      app.post("/orders", async (req, res) => {
          let { contents, user, total } = req.body
          const order = await Orders.create({ contents, user, total });
          for (let item of contents) {
              await Lessons.update({_id: item.lesson}, {$inc: {space: -1*item.quantity}})
          }
        res.json({ order, message: "Order placed successfully" });
      });
      
      app.post("/fetch-orders", async (req, res) => {
        let { user } = req.body
          const orders = await Orders.find({
              $or: [{
            'user.name': user.name
        }, {'user.phone': user.phone}] }).populate("contents.lesson");
      res.json({ orders, message: "Orders retrieved successfully" });
  });


    //SHOW SPECIFIC PRODUCT
    app.get("/lessons/:id", async (req, res) => {
        const { id } = req.params;
        const lesson = await Lessons.findById(id);
        res.json({ lesson });
    });

    app.listen(1002, () => {
        console.log("App is listening at port 1002");
    });
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
  });
