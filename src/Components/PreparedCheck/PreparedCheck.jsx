// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./PreparedCheck.css";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const PreparedCheck = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("white"); 
  const [data, setData] = useState();

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const getOrdering = async (id) => {
    try {
      const response = await axios.get(
        `https://put-print-ky689.ondigitalocean.app/api/products/${id}/`
      );
      setData(response.data);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getOrdering(id);
  }, [id]);

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid rgba(255, 255, 255, 0.3)",
            borderBottom: "4px solid #ae4559",
            borderTop: "4px solid #f15620",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  
  const renderImage = () => {
    if (data.id >= 7 && data.id <= 14) {
      return selectedColor === "black" ? data.black_front : data.front;
    } else if (data.id >= 1 && data.id <= 6) {
      if (selectedColor === "black" && data.id !== 6) {
        return data.black_front || "default-black.png";
      }
      return data.front || "default-white.png";
    } else {
      return "default-image.png";
    }
  };

  
  const showColorOptions = data.id >= 1 && data.id <= 14;

  return (
    <div className="container" style={{ width: "100%", maxWidth: "800px" }}>
      <div className="product-check-box">
        <div className="check-box-heading">Məhsullar</div>
        <hr style={{ border: "1px solid #DEDEDE" }} />
        <div className="check-boxes">
          <div className="product-check-item-image">
            <img
            style={{height: "auto", objectFit: "cover"}}
              src={renderImage()}
              alt={data?.name || "Product Image"}
              className="product-image"
            />
          </div>
          <div className="check-boxes-desc">
            <div className="check-box-title">{data?.name}</div>
            <div className="check-boxes-options">
              {showColorOptions && (
                <div className="check-boxes-option">
                  <label>Rəng</label>
                  <select
                    value={selectedColor}
                    onChange={handleColorChange}
                    disabled={data.id === 6} 
                  >
                    <option value="white">Ağ</option>
                    {data.id !== 6 && (
                      <option value="black">Qara</option>
                    )}
                  </select>
                </div>
              )}
              <div className="check-boxes-option">
                <label>Ölçü</label>
                <select>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>2XL</option>
                </select>
              </div>
            </div>
            <div className="check-box-info">
              <div className="prices-title">Qiyməti</div>
              <div className="product-prices">
                {data?.price_display} ×
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="check-quantity-input"
                  min="1"
                />
                <div className="product-totally-price">
                  {data?.price_thick * quantity} ₼
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            window.open(
              "https://api.whatsapp.com/send?phone=994506976357&text=Salam%0AM%C9%99hsulun%20%C3%B6d%C9%99ni%C5%9Fini%20etm%C9%99k%20%C3%BC%C3%A7%C3%BCn%20yaz%C4%B1rd%C4%B1m%20%F0%9F%98%8A",
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          <button className="checkout-btn">
            <p className="checkout-text">Ödənişə keç</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PreparedCheck;