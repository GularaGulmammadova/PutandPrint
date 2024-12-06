/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import homepageclothing from "./../../site assets/homepageclothing.png";
import homepagelogo from "./../../site assets/homepagelogo.png";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://put-print-ky689.ondigitalocean.app/api/products/?ordering=id"
      )
      .then((response) => {
        const filteredProducts = response.data.filter(
          (product) => product.id >= 7 && product.id <= 14
        );
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOrderClick = (productId) => {
    navigate(`/preparedcheck/${productId}`);
  };

  return (
    <div className="container">
      <div className="home-row">
        <div className="home-row-text">
          <p>Öz tərzini yarat</p>
          <p>Etdiyin dizaynlarla fərqini göstər!</p>
          <Link to="/products">
            <button className="home-page-btn">Dizayna Başla</button>
          </Link>
        </div>
        <div className="home-row-images">
          <img src={homepageclothing} alt="homepage clothing" />
        </div>
      </div>

      <div className="home-page-part2">
        <p>AtlazWear – dan kolleksiyalar</p>
        <div className="home-product-cards">
          {products.map((product) => (
            <div key={product.id} className="home-product-card">
              {/* <Link to={`/productdetail/${product.id}`}> */}
                <div className="image">
                  <img
                    src={
                      product.black_front ||
                      product.front ||
                      "default-image-url.jpg"
                    }
                    alt="Product Black Front"
                    className="hover-img"
                  />
                  <img
                    src={product.front || "default-image-url.jpg"}
                    alt="Product Front"
                  />
                </div>
              {/* </Link> */}
              <hr />
              <div className="home-product-name">{product.name}</div>
              <div className="home-detail">
                {product.colors && product.colors.length > 0 && (
                  <div className="home-colors">
                    {product.colors.map((color) => (
                      <div
                        key={color.color}
                        data-color={color.color}
                        className="color"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                    ))}
                  </div>
                )}
                <div className="size">
                  <span>{product.sizeRange || "Ölçü mövcud deyil"}</span>
                </div>
                {product.material && (
                  <div className="material">
                    <span>{product.material}</span>
                  </div>
                )}
              </div>
              <div className="home-desc">
                <div className="home-price">
                  <span>{product.price_display}</span>
                  <Link to={`/preparedcheck/${product.id}`}>
                    <button
                      className="home-design-button"
                      onClick={() => handleOrderClick(product.id)}
                    >
                      Sifariş et
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-page-part3">
        <p>Bizə güvənən brendlər</p>
        <Link
          to="/about"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              "https://www.instagram.com/atlaz.wear?igsh=MWU5bnV1ejVjbWVkbw%3D%3D&utm_source=qr",
              "_blank"
            );
          }}
        >
          <div className="slider-logos">
            <div className="slide-track">
              {[...Array(15)].map((_, index) => (
                <div className="slide" key={index}>
                  <img
                    src={homepagelogo}
                    alt="Brand logo"
                    className="slide-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;