const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AuthRoute = require('./routes/auth');
const AdminRoute = require('./routes/admin_routes');
const CronRoute = require('./routes/cron_routes');
const tranport = require('./transports/transport.js');
const PORT = process.env.PORT|| 8000

var cors = require('cors')
dotenv.config();
 mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true,useFindAndModify: false,useUnifiedTopology: true },
()=>console.log('Connected to db'))

app.use(cors())

app.use(express.json());
app.use('/api/admin',AdminRoute);
app.use('/api/user',AuthRoute);
app.use('/api/cron',CronRoute);


app.use(express.static('uploads'));


app.listen(PORT,()=>console.log(`server is working ${PORT}`))