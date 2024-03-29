const express = require("express");
const app = express();
const cors = require('cors');
// require('./fack');
// require('./fackClass');
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8080;

require('./db');

const classController = require('./controllers/classController');
const qrController = require('./controllers/QRController');
const loginController = require('./controllers/LoginController');
const uploadController = require('./controllers/UploadFileController');
const classRoutes = require('./routs/classRoutes');
const attendanceController = require('./controllers/attendanceController');
const studentsController = require('./controllers/studentsController');
const messagesController = require('./controllers/messagesController');

app.use('/qr', qrController);
app.use('/', classController);

app.use('/test', classRoutes);

app.use('/upload',uploadController);
app.use('/messages',messagesController);

app.post('/login', loginController);
app.use('/attendance', attendanceController);
app.use('/students', studentsController);


app.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`);
});