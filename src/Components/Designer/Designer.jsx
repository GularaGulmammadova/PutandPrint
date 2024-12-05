/* eslint-disable react/prop-types */
import Canvas from "../Canvas/Canvas";
import NavBar from "../NavBar/NavBar";
import styles from "./Designer.module.css";
import products from "../../Data/productsData";
import { useParams } from "react-router";

function Designer({material, setMaterial, size, setSize, cvsHeight, setCvsHeight, cvsWidth, setCvsWidth, frontContent, setFrontContent, backContent, setBackContent}) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  console.log(product); 

  return (
    <div className={styles.fullWidth}>
      <NavBar />
      <Canvas material={material} setMaterial={setMaterial} size={size} setSize={setSize} cvsWidth={cvsWidth} setCvsWidth={setCvsWidth} cvsHeight={cvsHeight} setCvsHeight={setCvsHeight} frontContent={frontContent} setFrontContent={setFrontContent} backContent={backContent} setBackContent={setBackContent} product={product} id={id} />
    </div>
  );
}

export default Designer;
