const mongoose = require("mongoose");
var randomWords = require("random-words");
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
      const locations = ["Abbeville", "Abbotsford", "Abbott", "Abbottstown", "Abercrombie", "Aberdeen", "Aberdeen Proving Ground", "Abernathy", "Abilene", "Abingdon", "Abington", "Abington Township", "Abiquiu", "Abita Springs", "Abrams", "Absarokee", "Absecon", "Acampo", "Access", "Accident", "Accokeek", "Accomac", "Accord", "Accoville", "Achille", "Achilles", "Ackerly", "Ackerman", "Ackley", "Acme", "Acton", "Acushnet", "Acworth", "Ada", "Adah", "Adair", "Adairsville", "Adairville", "Adak", "Adams", "Adams Center", "Adams Run", "Adamstown", "Adamsville", "Addieville", "Addis", "Addison", "Addyston", "Adel", "Adelanto", "Adell", "Adena", "Adger", "Adin", "Adkins", "Admire", "Adolphus", "Adona", "Adrian", "Advance", "Afton", "Agar", "Agate", "Agawam", "Agency", "Agoura Hills", "Agra"]
Lessons.deleteMany({}).then(val => {
    console.log("cleared")
}).catch(error => {
    console.log(error.message)
})
Orders.deleteMany({}).then(val => {
    console.log("cleared")
}).catch(error => {
    console.log(error.message)
})
      for (let index = 1; index <= 30; index++) {
          let ph = index + 10
          if (ph === 30) {
              ph = 02
          }
          if (ph === 34) {
            ph = 03
        }
          if (ph === 17) {
              ph = 01
          }
    let lesson = {
        lesson: randomWords({ exactly: 2, join: " " }),
        location: locations[index],
        price: index>10?index * 2: index*3,
        space: 5,
        image: "https://picsum.photos/id/10"+ph+"/200/300"
    }
    Lessons.insertMany(lesson).then((data) => {
        // console.log(data)
    }).catch(error => {
        console.log(error.message)
    })
}
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
  });




