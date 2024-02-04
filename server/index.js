const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8080;

require('./db');

const productController = require('./controllers/productController');
const qrController = require('./controllers/QRController');
app.use('/qr', qrController);

app.use('/', productController);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});