import React from 'react'
import styles from './Homepage.module.css';
import Topimg from './Topimg'
import ViewMoreButton from './ViewMoreButton';
import AboutTop from './AboutTop';
import Arrow from './Arrow';
import ArticleTop from './ArticleTop';
import Get_works from './get_works';


const Homepage = () => {
  return (
    <>
    <Topimg/>
    <div className={styles.homepage}>
        <ul>
            <li className={styles.pagelist}>
                <AboutTop/>
            </li>
            <li className={styles.pagelist} >
                <div className={`${styles.title} ${styles.worktitle}`}>                  
                    <h1 className={styles.worktitle}>Works</h1>
                    <Arrow rel="works"/>
                    
                </div>
                <div className={styles.slider}>
                <Get_works/>
                </div>
                    
                
            </li>
        
            <li  className={styles.pagelist}>
                <ArticleTop/>

            </li>
            {/* <li className={`${styles.pagelist} ${styles.contactpage}`}>
                                  
                <h1 className={styles.contactTitle}>Contact</h1>
                    
                <Link href='/contact'>
                <button className='custom-button'>こちらへ</button>
                </Link>
            </li> */}
        </ul>



    </div>
    </>


  )
}

export default Homepage