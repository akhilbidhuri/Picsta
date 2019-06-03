var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/picsta';

module.exports = {
    register(req,res){
        console.log("recieved request")
        MongoClient.connect(url, function(err, db) {
            db.collection('users').findOne({ email: req.body.email}, function(err, user) {
                if(user ===null){
                    var obj = JSON.stringify(req.body);
                    console.log("Final reg Data : "+obj);
                    var jsonObj = JSON.parse(obj);
                       MongoClient.connect(url, function(err, db) {
                       db.collection("users").insertOne(jsonObj, function(err, res) {
                      if (err) throw err;
                      console.log("1 document inserted");
                      db.close();
                       });
                   });
                   res.send({message:'registered'});
                 }      
                else if (user.email === req.body.email ){
                     res.send({message:'Already exists!!'});
                   } else {
                       res.send({message:"Couldn't create account!!"});
            }
    });
});
    },
    login(req,res){
        console.log("login request recieved")
        MongoClient.connect(url, function(err, db) {
            db.collection('users').findOne({ email: req.body.email}, function(err, user) {
                      if(user ===null){
                        res.send({message:"Given Email dosen't exist!!"});
                     }else if (user.email === req.body.email && user.pass === req.body.pass){
                     res.send({message:'logged in',user: user});
                   } else {
                     console.log("Credentials wrong");
                     res.send({message:"Wrong Password!!"});
                   }
            });
          });
    },
    allusers(req, res){
        MongoClient.connect(url,  function(err, db) {
            db.collection("users").find({},{email:1,name:1}).toArray(function(err, users) {
            if (err) throw err;
            if(users===null){
            console.log("1 document inserted",users);}
            db.close();
            console.log(users)
            res.send({users:users})
             });
         });
    },
    follow(req, res){
        console.log(req.body)
      MongoClient.connect(url,  function(err, db) {
        db.collection('users')
        .findOneAndUpdate({email: req.body.femail}, {
          $push: {
            following: {email:req.body.email,name:req.body.name,time:req.body.time}
          }
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
     });
    },
    search(req, res){
        MongoClient.connect(url,  function(err, db) {
            db.collection("users").find({name:req.body.query},{email:1,name:1}).toArray(function(err, users) {
            if (err) throw err;
            if(users===null){
            console.log("1 document inserted",users);}
            db.close();
            console.log(users)
            res.send({users:users})
             });
         });
    },
    getuser(req, res){
        MongoClient.connect(url, function(err, db){
            db.collection('users').findOne({email:req.body.email}, function(err, user){
                if (err) throw err;
                res.send({user:user})
            })
        })
    }
}