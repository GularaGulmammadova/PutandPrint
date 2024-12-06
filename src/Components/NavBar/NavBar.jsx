/* eslint-disable react/prop-types */
import styles from './NavBar.module.css';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NavBar = ({setFrontContent, setBackContent, initialFront, initialBack}) => {
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    setFrontContent(initialFront);
    setBackContent(initialBack);
    navigate(-1);
  };

  useEffect(() => {
    // setFrontContent(initialFront);
    // setBackContent(initialBack);
  }, [])

  return (
    <div className={styles.flex}>    
      <button style={{cursor:"pointer"}} onClick={goToPreviousPage} className={styles.link} >x</button>
        <div className={styles.links}>
        </div>
    </div> 
  )
}

export default NavBar