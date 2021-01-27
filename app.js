'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

const conn = mongoose.connect('mongodb://localhost:27017/haikuJamDb', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
              useCreateIndex: true
  }, (err, db)=>{
    if(err){
      console.log("Connection Error.", err);
      process.exit()
    }
    console.log(db)

});
SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('Node Server rinning!!\ncurl http://127.0.0.1:' + port);
  }
});
