const express = require('express');
const cron = require('node-cron')
const dbconnection = require('./database/db')
const config = require('config');
const api = require('./routes/index').router;
const { save } = require('./controllers/rssfeed');

const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use('/api/v1', api);


cron.schedule('0 * * * *', () => {
  console.log("running a task every hour " + new Date().getUTCHours() + + new Date().getUTCMinutes());
  save();
})

const PORT = config.get('PORT') || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));