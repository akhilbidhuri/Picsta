var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/picsta';
module.exports = {
  upload(req, res, next){
    var post={
        id: parseInt(Math.random()*100000),
        email: req.body.email,
        name: req.body.name,
        caption: req.body.caption,
        likes: 0,
        comments:[],
        media: {
            name: req.file === undefined? '': req.file.originalname,
            link: req.file === undefined? '': 'uploads/' + req.file.filename,    
        },
        time: Date().slice(0,24)
    }
    let f =0;
    MongoClient.connect(url, function(err, db) {
        db.collection("posts").insertOne(post, function(err, res) {
       if (err) throw err;
       console.log("1 document inserted");
       f = 1;
       db.close();
        });
    });
    if(f==0){
        res.send({message:"Could not create post"})
    }
    res.send({message:"Post Created"})
  },
  get(req, res){
    MongoClient.connect(url,  function(err, db) {
       db.collection("posts").find({}).toArray(function(err, posts) {
       if (err) throw err;
       if(posts===null){
       console.log("1 document inserted",posts);}
       db.close();
       res.send({posts:posts})
        });
    });
  },
  getpopular(req, res){
    MongoClient.connect(url,  function(err, db) {
        db.collection("posts").find({}).sort({likes:-1}).toArray(function(err, posts) {
        if (err) throw err;
        if(posts===null){
        console.log("1 document inserted",posts);}
        db.close();
        res.send({posts:posts})
         });
     });
  }
}