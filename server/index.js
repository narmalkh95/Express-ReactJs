const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8080;

require('./db');

const classController = require('./controllers/classController');
const qrController = require('./controllers/QRController');
const loginController = require('./controllers/LoginController');
app.use('/qr', qrController);
app.use('/', classController);



app.post('/login', loginController);


app.listen(PORT, process.env.HOST_IP, () => {
    console.log(`Server is listening on port ${PORT}`);
});