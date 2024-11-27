/* eslint-disable react/prop-types */
import styles from './ManageFiles.module.css';
import ColorPicker from '../ColorPicker/ColorPicker';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ManageFiles = ({ setColor, product, downloadDesign, id }) => {
  const [size, setSize] = useState('S');
  const [material, setMaterial] = useState('Nazik');
  // const [frontImage, setFrontImage] = useState(null); // Front dizayn şəkli
  // const [backImage, setBackImage] = useState(null);  // Back dizayn şəkli
  const navigate = useNavigate();
  const sizes = ['S', 'M', 'L', 'XL', '2XL'];
  const materials = ['Nazik', 'Qalın'];

  // Sifariş funksiyası
  const handleOrderClick = async () => {
    const formData = new FormData();
    
    // if (frontImage) {
    //   formData.append('front_image', frontImage);
    // }

    // if (backImage) {
    //   formData.append('back_image', backImage); 
    // }

    const orderData = {
      shipping_address: "Bakı", 
      status: "PENDING", 
      products: [{
        product: id,
        color: setColor,  
        size: size,       
        material: material 
      }],
    };

    
    formData.append('order_data', JSON.stringify(orderData));

    try {
    
      const response = await axios.post(
        'https://put-print-ky689.ondigitalocean.app/api/orders/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("Sifariş uğurla yaradıldı:", response.data);
      navigate(`/productcheck/${response.data.id}`);
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
            <ColorPicker setColor={setColor} />
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
          {!product.minPrice && <h3 className={styles.title}>{product.price}</h3>}
          {product.minPrice && <h3 className={styles.title}>{material === 'Nazik' ? product.minPrice : product.maxPrice}</h3>}
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