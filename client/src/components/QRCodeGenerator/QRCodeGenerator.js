import {useGenerateQRCodeQuery} from "../../features/qrApi";

const QRCodeGenerator = () => {
    const { data, error, isLoading } = useGenerateQRCodeQuery({ userId:1, classroomId:1 });

    if (isLoading) return <p>Loading QR code...</p>;
    if (error) return <p>Error fetching QR code: {error.message}</p>;

     return (
        <div>
            <>QR</>
            <img src={data.qrCode} alt="QR Code" />
        </div>
    );
};

export default QRCodeGenerator;