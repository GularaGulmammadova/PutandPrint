/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import styles from "./Canvas.module.css";
import LeftTools from "../LeftTools/LeftTools";
import ManageFiles from "../ManageFiles/ManageFiles";
import {
  Transformer,
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Rect,
} from "react-konva";

const Canvas = ({ material, setMaterial, size, setSize, product,id, cvsHeight, cvsWidth, frontContent, setFrontContent, backContent, setBackContent}) => {
  const stageRef = useRef(null);

  const [imageNode, setImageNode] = useState(null);
  const [labelNode, setLabelNode] = useState(null);
  // const [cvsWidth, setCvsWidth] = useState(window.innerWidth / 2);
  // const [cvsHeight, setCvsHeight] = useState((window.innerHeight / 10) * 8);
  const [showTrasformer, setShowTransformer] = useState(false);
  const [showTrasformerL, setShowTransformerL] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageClick = () => {
    setShowTransformer(true);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setCvsWidth(window.innerWidth / 2);
  //     setCvsHeight((window.innerHeight / 10) * 8);
  //   };


  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
    
  // }, []);

  const [showFront, setShowFront] = useState(true);

  const [tShirt, setTshirt] = useState(null);
  const [backTshirt, setBackTshirt] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrcBack, setImageSrcBack] = useState(null);

  // const [backContent, setBackContent] = useState({
  //   screenshot: 'null',
  //   tshirtColor: "white",
  //   image: {
  //     value: "",
  //     width: cvsWidth / 8,
  //     height: cvsWidth / 8,
  //     rotation: 0,
  //     x: (7 * (cvsWidth / 2)) / 8,
  //     y: cvsHeight / 2 - cvsWidth / 16 - 20,
  //   },
  //   label: {
  //     title: "",
  //     tshirtLabel: "",
  //     width: cvsWidth / 8,
  //     height: 20,
  //     fontFamily: "Arial",
  //     fontSize: 20,
  //     rotation: 0,
  //     color: "black",
  //     x: (7 * (cvsWidth / 2)) / 8,
  //     y: cvsHeight / 2 - cvsWidth / 16 - 20,
  //   },
  // });

  // const [frontContent, setFrontContent] = useState({
  //   tshirtColor: "white",
  //   screenshot: 'null',
  //   image: {
  //     value: "",
  //     width: cvsWidth / 8,
  //     height: cvsWidth / 8,
  //     rotation: 0,
  //     x: (7 * (cvsWidth / 2)) / 8,
  //     y: cvsHeight / 2 - cvsWidth / 16 - 20,
  //   },

  //   label: {
  //     title: "",
  //     tshirtLabel: "",
  //     fontFamily: "Arial",
  //     fontSize: 20,
  //     rotation: 0,
  //     color: "black",
  //     x: (7 * (cvsWidth / 2)) / 8,
  //     y: cvsHeight / 2 - cvsWidth / 16 - 20,
  //   },
  // });

  const handleTransform = (e) => {
    const node = e.target;
    const newWidth = Math.max(node.width() * node.scaleX(), 20);
    const newHeight = Math.max(node.height() * node.scaleY(), 20);
    const newRotation = node.rotation();

    node.setAttrs({
      scaleX: 1,
      scaleY: 1,
    });

    if (showFront) {
      setFrontContent((prevContent) => ({
        ...prevContent,
        image: {
          ...prevContent.image,
          width: newWidth,
          height: newHeight,
          rotation: newRotation,
        },
      }));
    } else {
      setBackContent((prevContent) => ({
        ...prevContent,
        image: {
          ...prevContent.image,
          width: newWidth,
          height: newHeight,
          rotation: newRotation,
        },
      }));
    }

    node.getLayer().batchDraw();
  };

  const captureScreenshot = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const dataURL = stage.toDataURL(); 
    
    console.log('New screenshot');
    return dataURL;
  };


  const handleLabelTransform = (e) => {
    const node = e.target;
    const newWidth = Math.max(node.width() * node.scaleX(), 20);
    const newHeight = Math.max(node.height() * node.scaleY(), 20);
    const newRotation = node.rotation();

    node.setAttrs({
      scaleX: 1,
      scaleY: 1,
    });

    if (showFront) {
      setFrontContent((prevContent) => ({
        ...prevContent,
        label: {
          ...prevContent.label,
          width: newWidth,
          height: newHeight,
          rotation: newRotation,
        },
      }));
    } else {
      setBackContent((prevContent) => ({
        ...prevContent,
        label: {
          ...prevContent.label,
          width: newWidth,
          height: newHeight,
          rotation: newRotation,
        },
      }));
    }

    node.getLayer().batchDraw();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        const img = new Image();
        img.src = event.target.result;
        setFrontContent({
          ...frontContent,
          image: { ...frontContent.image, value: img },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrcBack(event.target.result);
        const img = new Image();
        img.src = event.target.result;
        setBackContent({
          ...backContent,
          image: { ...backContent.image, value: img },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnd = (e, t) => {
    const newX = e.target.x();
    const newY = e.target.y();

    if (showFront && t === "img")
      setFrontContent({
        ...frontContent,
        image: { ...frontContent.image, x: newX, y: newY },
      });
    if (!showFront && t === "img")
      setBackContent({
        ...backContent,
        image: { ...backContent.image, x: newX, y: newY },
      });
    if (showFront && t === "label")
      setFrontContent({
        ...frontContent,
        label: { ...frontContent.label, x: newX, y: newY },
      });
    if (!showFront && t === "label")
      setBackContent({
        ...backContent,
        label: { ...backContent.label, x: newX, y: newY },
      });
  };

  useEffect(() => {
    if (product.front) {
      const img = new window.Image();
      img.src =
        frontContent.tshirtColor === "white"
          ? product.front
          : product.blackFront;
      img.onload = () => {
        setTshirt(img);
      };
    }

    if (product.back) {
      const backImg = new window.Image();
      backImg.src =
        backContent.tshirtColor === "white" ? product.back : product.blackBack;
      backImg.onload = () => {
        setBackTshirt(backImg);
      };
    }

  }, [product, frontContent, backContent]);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      setFrontContent({
        ...frontContent,
        image: {
          ...frontContent.image,
          value: img,
          height: (currentImage.width * img.naturalHeight) / img.naturalWidth,
        },
      });
    }
  }, [imageSrc, showFront]);

  useEffect(() => {
    if (imageSrcBack) {
      const img = new Image();
      img.src = imageSrcBack;
      setBackContent({
        ...backContent,
        image: { ...backContent.image, value: img },
      });
    }
  }, [imageSrcBack, showFront]);

  const currentImage = showFront ? frontContent.image : backContent.image;
  const currentLabel = showFront ? frontContent.label : backContent.label;

  const submitDesign = () => {
    setShowTransformer(false);console.log([frontContent.screenshot, backContent.screenshot]); 
    return [frontContent.screenshot, backContent.screenshot];
  }

  const downloadDesign = () => {
    const base64Images = submitDesign()
    base64Images && base64Images.length>0 && base64Images.forEach((base64String, index) => {
      if (base64String!==null && base64String!==undefined && base64String && typeof base64String === 'string' && base64String!=='null'){
        const link = document.createElement('a');
        link.href = base64String; 
        link.download = `image_${index + 1}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  // useEffect(() => {
  //   showFront ? setFrontContent({...frontContent, screenshot: captureScreenshot()}) : setBackContent({...backContent, screenshot: captureScreenshot()});
  // }, [])

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (showFront) {
        setFrontContent(prev => ({ ...prev, screenshot: captureScreenshot() }));
      } else {
        setBackContent(prev => ({ ...prev, screenshot: captureScreenshot() }));
      }
    }
  }, [isLoaded, showFront]);

  // useEffect(() => {
  //   console.log(frontContent.screenshot)
  // }, [frontContent])

  useEffect(() => {
    showFront ? setFrontContent({...frontContent, screenshot: captureScreenshot()}) : setBackContent({...backContent, screenshot: captureScreenshot()});
    
  }, [frontContent.image, frontContent.label, backContent.image, backContent.label, frontContent.tshirtColor, backContent.tshirtColor])

  return (
    <div className={styles.flex}>
      <LeftTools
        setShowTransformer={setShowTransformer}
        setContent={showFront ? setFrontContent : setBackContent}
        content={showFront ? frontContent : backContent}
        deleteImg={() => {
          if (showFront) {
            setImageSrc("");
            setFrontContent({
              ...frontContent,
              image: { ...frontContent.image, value: "" },
            });
          } else {
            setImageSrcBack("");
            setBackContent({
              ...backContent,
              image: { ...backContent.image, value: "" },
            });
          }
          setImageNode(null);
        }}
        handleImageChange={
          showFront ? handleImageChange : handleBackImageChange
        }
      />
      <div id='cvs' className={styles.canvas}>
        <Stage width={cvsWidth} height={cvsHeight} ref={stageRef}>
          <Layer>
            {tShirt && (
              <>
                <KonvaImage
                  image={showFront ? tShirt : backTshirt}
                  width={cvsWidth / 2}
                  height={
                    ((cvsWidth / 2) * tShirt.naturalHeight) /
                    tShirt.naturalWidth
                  }
                  x={cvsWidth / 4}
                  y={
                    cvsHeight / 2 -
                    ((cvsWidth / 4) * tShirt.naturalHeight) /
                      tShirt.naturalWidth
                  }
                />

                {currentImage.value && (
                  <KonvaImage
                    image={currentImage.value}
                    width={currentImage.width}
                    height={currentImage.height}
                    x={currentImage.x}
                    y={currentImage.y}
                    rotation={currentImage.rotation}
                    draggable
                    onDragEnd={(e) => handleDragEnd(e, "img")}
                    onDragMove={(e) => {
                      setImageNode(e.target);
                    }}
                    onTransform={handleTransform}
                    onClick={handleImageClick}
                    ref={(node) => {
                      if (node) {
                        setImageNode(node);
                      }
                    }}
                  />
                )}

                {showTrasformer && imageNode && (
                  <Transformer
                    nodes={[imageNode]}
                    padding={5}
                    flipEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (
                        Math.abs(newBox.width) < 20 ||
                        Math.abs(newBox.height) < 20
                      ) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}

                {currentLabel &&
                  currentLabel.title &&
                  currentLabel.title.length > 0 && (
                    <Text
                      draggable
                      text={currentLabel.tshirtLabel}
                      fontSize={currentLabel.fontSize}
                      fill={currentLabel.color}
                      fontFamily={currentLabel.fontFamily}
                      x={currentLabel.x}
                      y={currentLabel.y}
                      rotation={currentLabel.rotation}
                      onTransform={handleLabelTransform}
                      onClick={() => setShowTransformerL(true)}
                      onDragEnd={(e) => handleDragEnd(e, "label")}
                      onDragMove={(e) => setLabelNode(e.target)}
                    />
                  )}

                {labelNode && showTrasformerL && (
                  <Transformer
                    nodes={[labelNode]}
                    padding={5}
                    flipEnabled={false}
                    enabledAnchors={[
                      "top-left",
                      "top-right",
                      "bottom-left",
                      "bottom-right",
                    ]}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (
                        Math.abs(newBox.width) < 20 ||
                        Math.abs(newBox.height) < 20
                      ) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}

                {product.name !== "Eko Çanta" &&
                  product.name !== "Kepka" &&
                  product.name !== "Kapşonlu Sviter" && (
                    <Rect
                      width={cvsWidth / 5}
                      height={cvsWidth / 4}
                      x={(4 * (cvsWidth / 2)) / 5}
                      y={cvsHeight / 2 - cvsWidth / 8 - 20}
                      fill="transparent"
                      stroke="lightGrey"
                      strokeWidth={2}
                      listening={false}
                    />
                  )}

                {product.name === "Kapşonlu Sviter" && showFront && (
                  <Rect
                    width={cvsWidth / 6}
                    height={cvsWidth / 6}
                    x={(5 * (cvsWidth / 2)) / 6}
                    y={cvsHeight / 2 - cvsWidth / 12 + 20}
                    fill="transparent"
                    stroke="lightGrey"
                    strokeWidth={2}
                    listening={false}
                  />
                )}

                {product.name === "Kapşonlu Sviter" && !showFront && (
                  <Rect
                    width={cvsWidth / 6}
                    height={cvsWidth / 4}
                    x={(5 * (cvsWidth / 2)) / 6}
                    y={cvsHeight / 2 - cvsWidth / 12}
                    fill="transparent"
                    stroke="lightGrey"
                    strokeWidth={2}
                    listening={false}
                  />
                )}

                {product.name === "Kepka" && (
                  <Rect
                    width={cvsWidth / 6}
                    height={cvsWidth / 6}
                    x={(5 * (cvsWidth / 2)) / 6}
                    y={cvsHeight / 2 - cvsWidth / 8}
                    fill="transparent"
                    stroke="lightGrey"
                    strokeWidth={2}
                    listening={false}
                  />
                )}

                {product.name === "Eko Çanta" && (
                  <Rect
                    width={cvsWidth / 4}
                    height={cvsWidth / 4}
                    x={(3 * (cvsWidth / 2)) / 4}
                    y={cvsHeight / 2 - cvsWidth / 24}
                    fill="transparent"
                    stroke="lightGrey"
                    strokeWidth={2}
                    listening={false}
                  />
                )}

                <KonvaImage
                  image={tShirt}
                  width={100}
                  height={100}
                  x={10}
                  y={10}
                  stroke="lightGrey"
                  strokeWidth={3}
                  onClick={() => {
                    setShowFront(true);
                    setShowTransformer(false);
                    setShowTransformerL(false);
                    setBackContent({...backContent, screenshot: captureScreenshot()});
                  }}
                />

                {backTshirt && (
                  <KonvaImage
                    image={backTshirt}
                    width={100}
                    height={100}
                    x={10}
                    y={120}
                    stroke={"lightGrey"}
                    strokeWidth={3}
                    onClick={() => {
                      setShowFront(false);
                      setShowTransformer(false);
                      setShowTransformerL(false);
                      setFrontContent({...frontContent, screenshot: captureScreenshot()});
                    }}
                  />
                )}
              </>
            )}
          </Layer>
        </Stage>
      </div>
      <ManageFiles
        id={id}
        product={product}
        // handleDownload={handleDownload}
        backContent={backContent}
        frontContent={frontContent}
        setColor={(c) => {
          setFrontContent({ ...frontContent, tshirtColor: c });
          setBackContent({ ...backContent, tshirtColor: c });
          captureScreenshot();
        }}
        image={
          showFront ? frontContent.image.value.src : backContent.image.value.src
        }
        captureScreenshot={captureScreenshot}
        submitDesign={submitDesign}
        downloadDesign={downloadDesign}
        material={material} 
        setMaterial={setMaterial} 
        size={size} 
        setSize={setSize}
      />
    </div>
  );
};

export default Canvas;
