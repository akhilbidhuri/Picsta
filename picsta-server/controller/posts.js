var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/picsta';

module.exports ={
    like(req, res){
        MongoClient.connect(url,  function(err, db) {
            db.collection('posts')
            .findOneAndUpdate({id: req.body.id}, {
              $set: {
                likes: req.body.likes
              }
            }, (err, result) => {
              if (err) return res.send(err)
              res.send(result)
            })
         });
    },
    comment(req, res){
      console.log(req.body)
      MongoClient.connect(url,  function(err, db) {
        db.collection('posts')
        .findOneAndUpdate({id: req.body.id}, {
          $push: {
            comments: req.body
          }
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
     });
    }
}