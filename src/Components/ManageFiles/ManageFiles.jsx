/* eslint-disable react/prop-types */
import styles from './ManageFiles.module.css';
import ColorPicker from '../ColorPicker/ColorPicker';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ManageFiles = ({ size, setSize, frontContent, material, setMaterial, backContent, setColor, product, downloadDesign, id, captureScreenshot }) => {
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate();
  const sizes = ['S', 'M', 'L', 'XL', '2XL'];
  const materials = ['Nazik', 'Qalın']; 

  async function convertImageToBase64(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(new Error('Error reading blob as base64'));
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting image to Base64:', error);
        throw error; // Re-throw error to handle it outside if necessary
    }
}

  function base64ToFile(base64, filename) {
    const arr = base64.split(','); 

    if (arr && arr[0] && arr[0].match(/:(.*?);/) && arr[0].match(/:(.*?);/)[1]){
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      const n = bstr.length;
      const u8arr = new Uint8Array(n);

      for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
      }

      return new File([u8arr], filename, { type: mime });
    }
    return null;
  }


  const handleOrderClick = async () => {
    captureScreenshot();
    const formData = new FormData();

    console.log(product.front);
    // console.log(backContent.screenshot);

    const emptyWhite = await convertImageToBase64(product.front);
    const emptyBlack = await convertImageToBase64(product.black_front);

    const emptyWhite64 = base64ToFile(emptyWhite, 'empty.png');
    const emptyBlack64 = base64ToFile(emptyBlack, 'emptyb.png');

    console.log(emptyWhite)
    
    const frontImageFile = frontContent.image.value && frontContent.image.value.src ? base64ToFile(frontContent.image.value.src, 'frontImage.png') : base64ToFile(frontContent.screenshot, 'frontMockup.png');
    const backImageFile = backContent.image.value && backContent.image.value.src ? base64ToFile(backContent.image.value.src, 'backImage.png') : base64ToFile(frontContent.screenshot, 'frontMockup.png');
    const frontMockupFile = base64ToFile(frontContent.screenshot, 'frontMockup.png');
    const backMockupFile = backContent.screenshot ? base64ToFile(backContent.screenshot, 'backMockup.png') : base64ToFile(frontContent.screenshot, 'frontMockup.png');
  
    if (frontContent.image.value === '' && frontContent.label.title === '' && backContent.image.value === '' && backContent.label.title === '' && backContent.tshirtColor === 'white'){
      formData.append('front_image', emptyWhite64);
      formData.append('back_image', emptyWhite64);
      formData.append('front_mockup', emptyWhite64);
      formData.append('back_mockup', emptyWhite64);
    } else if (frontContent.image.value === '' && frontContent.label.title === '' && backContent.image.value === '' && backContent.label.title === '' && backContent.tshirtColor === 'black'){
      formData.append('front_image', emptyBlack64);
      formData.append('back_image', emptyBlack64);
      formData.append('front_mockup', emptyBlack64);
      formData.append('back_mockup', emptyBlack64);
    } else {
      formData.append('front_image', frontImageFile);
      formData.append('back_image', backImageFile);
      formData.append('front_mockup', backImageFile);
      formData.append('back_mockup', backMockupFile || frontMockupFile);
    }
  
    const orderData = {
      color: frontContent.tshirtColor.toUpperCase(),
      material: material.toUpperCase(),
      size: size.toUpperCase(),
      quantity: quantity,
      text: `front: ${frontContent.label.title}, back: ${backContent.label.title}`,
      text_color: frontContent.label.color,
      text_font: frontContent.label.fontFamily,
      status: "PENDING",
      product: id
    };
  
    formData.append('color', orderData.color);
    formData.append('material', orderData.material);
    formData.append('size', orderData.size);
    formData.append('quantity', orderData.quantity);
    formData.append('text', orderData.text);
    formData.append('text_color', orderData.text_color);
    formData.append('text_font', orderData.text_font);
    formData.append('status', orderData.status);
    formData.append('product', String(orderData.product));
    try {
      const response = await axios.post(
        'https://put-print-ky689.ondigitalocean.app/api/orders/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
            'X-CSRFTOKEN': 'OuuJ0uoTkezagK8ahozdtcGZXSw2LWIdVqaSD3Rz3qSgIzZ7UeCkecAAMSSojM1G', // Use your actual CSRF token
          },
        }
      );
      console.log("Sifariş uğurla yaradıldı:", response.data);
      if (response.data.id) navigate(`/productcheck/${response.data.id}`);
    } catch (error) {
      console.error("Sifariş yaradılarkən xəta baş verdi:", error.response?.data || error.message);
      alert("Sifariş yaradılarkən xəta baş verdi.");
    }
  };
  
  

  return (
    <div className={styles.file}>
      <div className={styles.btns}>
        <Link to='/products' className={styles.btn}>Məhsullar</Link>
        <button className={`${styles.btn} ${styles.chosen}`}>Özün yarat</button>
      </div>

      <div className={styles.picker}>
        <h2 className={styles.heading}>Oversize T-shirt</h2>
        <hr className={styles.hr} />
        {product.name !== "Eko Çanta" && (
          <>
            <h3 className={styles.title}>Məhsul rəngi</h3>
            <ColorPicker setColor={(c) => {setColor(c); captureScreenshot();}} />
          </>
        )}

        {(product.name !== 'Kepka' && product.name !== 'Eko Çanta') && (
          <>
            <h3 className={styles.title}>Ölçü</h3>
            <div className={styles.btns}>
              {sizes.map((s, i) => (
                <button
                  className={size === s ? `${styles.chosen} ${styles.roundBtn}` : styles.roundBtn}
                  style={{ backgroundColor: `${s}` }}
                  key={i}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        {(product.name === "Sviter" || product.name === "Kapşonlu Sviter") && (
          <>
            <h3 className={styles.title}>Material</h3>
            <div className={styles.btns}>
              {materials.map((m, i) => (
                <button
                  className={material === m ? `${styles.chosen} ${styles.roundBtn} ${styles.long}` : `${styles.roundBtn} ${styles.long}`}
                  key={i}
                  onClick={() => setMaterial(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </>
        )}

        <div className={styles.spaceBetween}>
          <h3 className={styles.title}>Ümumi Qiymət</h3>
          {!product.price_thin && <h3 className={styles.title}>{product.price_display}</h3>}
          {product.price_thin && <h3 className={styles.title}>{material === 'Nazik' ? product.price_thin : product.price_thick}</h3>}
        </div>

        <div className={styles.spaceBetween}>
          <h3 className={styles.title}>Sayı</h3>
          <input className={styles.input} type='number' onChange={e => setQuantity(e.target.value)} defaultValue={quantity} />
        </div>
        
        <button onClick={() => { downloadDesign(); }} className={styles.orderBtn}>Dizaynı yüklə</button>
        <button onClick={handleOrderClick} className={styles.orderBtn}>Sifariş et</button>
      </div>

      <div className={styles.warning}>
        <h3>{`Çərçivədən kənarda qalan dizaynlar çap olunmayacaq!`}</h3>
      </div>
    </div>
  );
};
 
export default ManageFiles;