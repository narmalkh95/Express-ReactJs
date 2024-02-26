const express = require("express");
const app = express();
const cors = require('cors');
// require('./fack');
// require('./fackClass');
app.use(express.json());
app.use(cors());





const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST_IP || 'localhost';

require('./db');

const classController = require('./controllers/classController');
const qrController = require('./controllers/QRController');
const loginController = require('./controllers/LoginController');
const uploadController = require('./controllers/UploadFileController');
const classRoutes = require('./routs/classRoutes');

app.use('/qr', qrController);
app.use('/', classController);

app.use('/test', classRoutes)

app.use('file',uploadController)

app.post('/login', loginController);


app.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`);
});