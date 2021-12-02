const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static("uploads"));

const auth = require('./routes/auth')
const products = require('./routes/products')
const category = require('./routes/category')

// database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(() => console.log("Connect database successfully"))
.catch((err) => console.log(err))

app.use('/api', auth)
app.use('/api/product', products)
app.use('/api/category', category)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})