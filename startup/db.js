const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  const uri = config.has("dbUri")
    ? config.get("dbUri")
    : getDbUri(
        config.get("dbUsername"),
        config.get("dbPassword"),
        config.get("dbName")
      );

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to MongoDb...${uri}`))
    .catch((err) => console.log("MongoError", err.message));
};

function getDbUri(username, password, dbName) {
  return `mongodb://${username}:${password}@bookup-shard-00-00.a0st4.mongodb.net:27017,bookup-shard-00-01.a0st4.mongodb.net:27017,bookup-shard-00-02.a0st4.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-5jd05i-shard-0&authSource=admin&retryWrites=true&w=majority`;
}
