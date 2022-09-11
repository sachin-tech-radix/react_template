import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { templatePath } from "../../Constants";

const QrCode = (props) => {
  const [url, setUrl] = useState(templatePath+'user/'+props.public_id);

  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    //setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#f8dddd"}
      level={"H"}
    />
  );

  return (
    <div className="qrcode__container">
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <button color="light-danger" type="submit" disabled={!url}>
            download
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;