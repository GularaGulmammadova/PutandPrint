/* eslint-disable no-unused-vars */
import React, { Profiler, useEffect, useState } from 'react'
import Nav from './Components/Nav/Nav'
import Products from './Components/Products/Products'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import { Route, Routes, useLocation, useParams } from 'react-router'
import About from './Components/About/About'
import Contact from './Components/ContactPage/Contact'
import Footer from './Components/Footer/Footer' 
import HomePage from "./Components/HomePage/HomePage";
import Corporate from './Components/Corporate/Corporate'
import ScrollToTop from './ScrollToTop/ScrollToTop'
import ProductCheck from './Components/ProductCheck/ProductCheck'
import Designer from './Components/Designer/Designer'
// import Loading from './Components/Loading/Loading'
 
const App = () => {

  const location = useLocation();

  const [cvsWidth, setCvsWidth] = useState(window.innerWidth / 2);
  const [cvsHeight, setCvsHeight] = useState((window.innerHeight / 10) * 8);
  const [size, setSize] = useState('S');
  const [material, setMaterial] = useState('Nazik'); 

  useEffect(() => {
    const handleResize = () => {
      setCvsWidth(window.innerWidth / 2);
      setCvsHeight((window.innerHeight / 10) * 8);
    };


    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, []);

  const [backContent, setBackContent] = useState({
    screenshot: 'null',
    tshirtColor: "white",
    image: {
      value: "",
      width: cvsWidth / 8,
      height: cvsWidth / 8,
      rotation: 0,
      x: (7 * (cvsWidth / 2)) / 8,
      y: cvsHeight / 2 - cvsWidth / 16 - 20,
    },
    label: {
      title: "",
      tshirtLabel: "",
      width: cvsWidth / 8,
      height: 20,
      fontFamily: "Arial",
      fontSize: 20,
      rotation: 0,
      color: "black",
      x: (7 * (cvsWidth / 2)) / 8,
      y: cvsHeight / 2 - cvsWidth / 16 - 20,
    },
  });

  const [frontContent, setFrontContent] = useState({
    tshirtColor: "white",
    screenshot: 'null',
    image: {
      value: "",
      width: cvsWidth / 8,
      height: cvsWidth / 8,
      rotation: 0,
      x: (7 * (cvsWidth / 2)) / 8,
      y: cvsHeight / 2 - cvsWidth / 16 - 20,
    },

    label: {
      title: "",
      tshirtLabel: "",
      fontFamily: "Arial",
      fontSize: 20,
      rotation: 0,
      color: "black",
      x: (7 * (cvsWidth / 2)) / 8,
      y: cvsHeight / 2 - cvsWidth / 16 - 20,
    },
  });

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 3000);
  // }, []);

  // if (loading) {
  //   return <Loading/>;
  // }

  return (
    <div>
      {!location.pathname.includes('/designer') && <Nav/>}
      {!location.pathname.includes('/designer') && <ScrollToTop/>}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/corporate' element={<Corporate/>}/>
        <Route path='/products' element={<Products />} />
        <Route path='/productdetail/:id' element={<ProductDetail material={material} setMaterial={setMaterial} size={size} setSize={setSize} cvsWidth={cvsWidth} setCvsWidth={setCvsWidth} cvsHeight={cvsHeight} setCvsHeight={setCvsHeight} frontContent={frontContent} setFrontContent={setFrontContent} backContent={backContent} setBackContent={setBackContent} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/productcheck/:id' element={<ProductCheck/>}/> 
        <Route path='/designer/:id' element={<Designer material={material} setMaterial={setMaterial} size={size} setSize={setSize} cvsWidth={cvsWidth} setCvsWidth={setCvsWidth} cvsHeight={cvsHeight} setCvsHeight={setCvsHeight} frontContent={frontContent} setFrontContent={setFrontContent} backContent={backContent} setBackContent={setBackContent} />}/>
      </Routes>
      {!location.pathname.includes('/designer') && <Footer />}
    </div>
  )
}

export default App;  