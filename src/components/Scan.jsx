import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import "./Scan.css";
import Calori from "./Calori.png";
import axios from "axios";


function DishDetails({ dish, editableUnits, handleUnitChange, calculateTotalCalories }) {
  return (
    <div className="items">
            
      <div className="dishhead">
        <h2 className="listdata tophead">
          <span>Dish Name:</span> {dish.name}
        </h2>
      </div>


      <div className="listdata">
        <h3>Description:</h3>
        <ul>
          {dish.description.map((desc, idx) => ( <li key={idx} type="none"> {desc} </li> ))}
        </ul>
      </div>


      <div className="listdata">
        <h3>Items Nutrition:</h3>
        <div className="itemNet">
          {dish.items_nutrition.map((item, idx) => (
            <div key={idx} className="itemNutrition">
             <p> <span className="cal">Name:</span> {item.name} </p>
             <p>  <span className="cal">Calories per unit:</span> {item.calorie}</p>
            <div className="uniter" style={{ display: "flex" }}>
              <p style={{ paddingRight: "10px" }}>
                 <span className="cal">Quantity:</span>
                <input type="number" value={editableUnits[idx] || item.unit} onChange={(e) => handleUnitChange(idx, parseInt(e.target.value, 10))} style={{ width: "40px" }} />{" "} pc  </p>
              </div>
              <p> <strong>Total:</strong> {(editableUnits[idx] || item.unit) * item.calorie} calories </p>
            </div>
          ))}
        </div>

        <div className="DishTotal"> 
          <h3> <div className="totalDish">Total Dish Calories:</div> <div className="meter"> {calculateTotalCalories(dish.items_nutrition)} kcal</div></h3>
          </div>
      </div>
    </div>
  );
}

function Scan() {
  const [status, setStatus] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [list, setList] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [editableUnits, setEditableUnits] = useState({});

  // Fetch dishes data
  useEffect(() => {
    const fetchMenuDishes = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://data-30d0d-default-rtdb.firebaseio.com/menu_items.json");
        setDishes(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuDishes();
  }, []);

  // Filter dishes based on selection
  useEffect(() => {
    if (list) {
      const filtered = dishes.filter((item) => item.name.toLowerCase() === list.toLowerCase());
      setFilteredDishes(filtered);
      const initialUnits = {};
      if (filtered.length > 0) {
        filtered[0].items_nutrition.forEach((item, idx) => { initialUnits[idx] = item.unit; });
        setEditableUnits(initialUnits);
      }
    } else {
      setFilteredDishes([]);
      setEditableUnits({});
    }
  }, [list, dishes]);



  // Toggle QR Scanner
  const handleScan = () => {
    setStatus(!status);
  };

  // QR Scanner 
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
        { highlightScanRegion: true }
      );

      qrScanner
        .start()
        .catch((err) => {
          console.error("Camera access error:", err);
          setCameraError( "Unable to access the camera. Please check permissions." );
        });

      return () => qrScanner.stop();
    }
  }, [status]);



  const handleUnitChange = (idx, value) => {
    setEditableUnits((prevUnits) => ({ ...prevUnits, [idx]: value || 1,  })) };


  const calculateTotalCalories = (nutrition) => {
    return nutrition.reduce( (total, item, idx) => total + (editableUnits[idx] || item.unit) * item.calorie, 0 ); };



  return (
    <>

      <header className="headering">
        <div className="header"> <img src={Calori} alt="CalorieScan" /> </div>
      </header>
      <main>


        <div className="main">
          <h3 className="scan">Find Your Calorie</h3>
          <button onClick={handleScan} className="scan-container"> <img className="img" src="https://img.icons8.com/?size=100&id=e5fuptQ3DaeH&format=png&color=000000"  alt="Scan" /> </button>
        </div>



        <div>
          <div className="selected-option">
            <h4 className="listdata">Dishes List</h4>
            <select value={list} onChange={(e) => setList(e.target.value)}>
              <option value="">Select Dish</option>
              <option value="Idli Vada Combo">Idli Vada Combo</option>
              <option value="Idli Sambhar">Idli Sambhar</option>
              <option value="Veg Thaali">Veg Thaali</option>
              <option value="Dal Rice">Dal Rice</option>
            </select>
          </div>



          <div className="DishCalorie">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish, dishIdx) => (

            /* //////////////upper function /////////////////////  */
              
                <DishDetails key={dishIdx} dish={dish}  editableUnits={editableUnits}  handleUnitChange={handleUnitChange}  calculateTotalCalories={calculateTotalCalories}  /> ))         
            ) : ( <div className="NoData">
                <p>No Dish Found</p>
              </div>)}
          </div>
        </div>

        {status && (
    <div className="qrCode-backdrop" onClick={handleScan}>
    <div className="qrCode">
      <div className="Scanner">
        <h2>Scan Your Food</h2>
      </div>
      <div className="Scanner-Camera">
        <video ref={videoRef} className="camera-view"></video>
        {cameraError && <p className="error">{cameraError}</p>}
      </div>
    </div>
  </div>
)}

      </main>
    </>
  );
}

export default Scan;
