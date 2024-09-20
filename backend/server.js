const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {APP_PORT, DB_URL} = require('./config');
const routes = require('./routes');
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler')
const cron = require('node-cron');
const mailController  = require('./services/mailController');

cron.schedule('0 * * * *', async () => {
  console.log('Running a task every hour to check submissions...');
  mailController.sendmail();
});

// cron.schedule('*/5 * * * *', async () => {
//   console.log('Running a task every 5 minutes to check submissions...');
//   mailController.sendmail();
// });

mongoose.connect(DB_URL, {
serverSelectionTimeoutMS: 30000
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(APP_PORT,()=>{
  console.log(`app running on the ${APP_PORT}`);
});
