 import QRCode from 'qrcode.react';
import {getToken} from "../../helpers/auth";

const QRCodeGenerator = () => {
    const token = getToken();

    const qrData = `192.168.0.100:8080/qr/verify?token=${token}`;


    return (
        <div>
            <h2>QR Code</h2>
             <QRCode value={qrData} />
        </div>
    );
};

export default QRCodeGenerator;