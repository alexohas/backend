var randomWords = require("random-words");
const MongoClient = require('mongodb').MongoClient;
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect("mongodb+srv://ao1283:Valexcon19@cluster0.flsye.mongodb.net/after-school?retryWrites=true&w=majority",
    function (err, client) {
        console.log("Connected successfully to server");
        const locations = ["Abbeville", "Abbotsford", "Abbott", "Abbottstown", "Abercrombie", "Aberdeen", "Aberdeen Proving Ground", "Abernathy", "Abilene", "Abingdon", "Abington", "Abington Township", "Abiquiu", "Abita Springs", "Abrams", "Absarokee", "Absecon", "Acampo", "Access", "Accident", "Accokeek", "Accomac", "Accord", "Accoville", "Achille", "Achilles", "Ackerly", "Ackerman", "Ackley", "Acme", "Acton", "Acushnet", "Acworth", "Ada", "Adah", "Adair", "Adairsville", "Adairville", "Adak", "Adams", "Adams Center", "Adams Run", "Adamstown", "Adamsville", "Addieville", "Addis", "Addison", "Addyston", "Adel", "Adelanto", "Adell", "Adena", "Adger", "Adin", "Adkins", "Admire", "Adolphus", "Adona", "Adrian", "Advance", "Afton", "Agar", "Agate", "Agawam", "Agency", "Agoura Hills", "Agra"]
        client.db().collection('lessons').deleteMany({}).then(val => {
            console.log("cleared")
        }).catch(error => {
            console.log(error.message)
        })
        client.db().collection('orders').deleteMany({}).then(val => {
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
            client.db().collection('lessons').insertOne(lesson).then((data) => {
                // console.log(data)
            }).catch(error => {
                console.log(error.message)
            })
        }
    client.close();
});





