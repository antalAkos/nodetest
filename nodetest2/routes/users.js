var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

/* GET userlist. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/* POST to adduser. */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/updateuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToUpdate = req.params.id;
    collection.find({'_id': userToUpdate},function(e,docs){
        res.json(docs);
    });

});

router.post('/saveupdateduser/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToUpdate = req.params.id;
    collection.update({ _id : ObjectId(userToUpdate)},{$set: req.body}, { upsert: true }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
