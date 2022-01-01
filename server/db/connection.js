const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let _db;

module.exports = {
    connectToServer: function(callback){
        client.connect((err, db) => {
            //verify we got a db object
            if(db){
                _db = db.db("myFirstDatabase");
                console.log("Successfully connected to MongoDB");
            }
            return callback(err);
        });
    },
    getDb: function(){
        return _db;
    }
}