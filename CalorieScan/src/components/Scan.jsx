import React, { useState, useEffect } from "react";
import QrScanner from "qr-scanner";
import "./Scan.css";
import Calori from "./Calori.png";

function Scan() {
  const [status, setStatus] = useState(false);
  const [dishData, setDishData] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const videoRef = React.createRef();

  const handleScan = () => {
    setStatus(!status); 
  };

  useEffect(() => {
    if (status && videoRef.current) {
      const qrScanner = new QrScanner(
             videoRef.current,
          (result) => {
             try {
            const data = JSON.parse(result); 
            setDishData(data);
            qrScanner.stop(); 
            setStatus(false); 
          } catch (error) {
            console.error("Invalid QR code format:", error);
            setCameraError("Failed to read valid QR data. Please try again.");
          }
        },
        {
          highlightScanRegion: true, 
        }
      );

      qrScanner.start().catch((err) => {
        console.error("Camera access error:", err);
        setCameraError("Unable to access the camera. Please check permissions.");
      });

      return () => qrScanner.stop();
    }
  }, [status, videoRef]);

  return (
    <>
      <header className="headering">
        <div className="header"> <img src={Calori} alt="CalorieScan" /> </div>
      </header>
      <main>

        <div className="main">
          <h3 className="scan">Find Your Calorie Scan</h3>
          <button onClick={handleScan} className="scan-container"> <img className="img"  src="https://img.icons8.com/?size=100&id=e5fuptQ3DaeH&format=png&color=000000"  alt="Scan" /></button>
        </div>

        <div>


        {/*............... */}

          <h4  className="listdata">Dish Calorie</h4>
          {dishData && (
            <div className="dish-details">
              <h3>{dishData.dishName}</h3>
              <ul>
                {dishData.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity})
                    </li>
                ))}
              </ul>
            </div>
          )}
        </div>

    
     {/* ....................... */}


     {status && (
  <>
    <div className="qrCode-backdrop" onClick={handleScan}></div>
    <div className="qrCode">
      <div className="Scanner">
        <h2>Scan Your Food</h2>
      </div>
      <div className="Scanner-Camera">
        <video ref={videoRef} className="camera-view"></video>
        {cameraError && <p className="error">{cameraError}</p>}
      </div>
    </div>
  </>
)}

      </main>
    </>
  );
}

export default Scan;
