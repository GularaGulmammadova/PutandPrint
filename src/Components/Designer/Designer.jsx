/* eslint-disable react/prop-types */
import Canvas from "../Canvas/Canvas";
import NavBar from "../NavBar/NavBar";
import styles from "./Designer.module.css";
// import products from "../../Data/productsData";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

function Designer({ initialFront, initialBack, material, setMaterial, size, setSize, cvsHeight, setCvsHeight, cvsWidth, setCvsWidth, frontContent, setFrontContent, backContent, setBackContent}) {
  const { id } = useParams();
  // const product = products.find((p) => p.id === parseInt(id));
  // console.log(product); 
  const [product, setProduct] = useState();

  useEffect(() => { 
    const fetchProduct = async () => { 
      try {
        const response = await axios.get(
          `https://put-print-ky689.ondigitalocean.app/api/products/${id}/`
        );
        const productData = response.data;

        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setFrontContent(initialFront);
    setBackContent(initialBack);
  }, [])

  return (
    <div className={styles.fullWidth}>
      {
        product && product.name && product.front && <>
          <NavBar />
          <Canvas  initialFront={initialFront} initialBack={initialBack} material={material} setMaterial={setMaterial} size={size} setSize={setSize} cvsWidth={cvsWidth} setCvsWidth={setCvsWidth} cvsHeight={cvsHeight} setCvsHeight={setCvsHeight} frontContent={frontContent} setFrontContent={setFrontContent} backContent={backContent} setBackContent={setBackContent} product={product} id={id} />
        </>
      }
    </div>
  );
}

export default Designer;
