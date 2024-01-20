import React from 'react'
import styles from './Homepage.module.css';
import Topimg from './Topimg'
import ViewMoreButton from './ViewMoreButton';
import Slider from './Slider';
import AboutTop from './AboutTop';
import Arrow from './Arrow';
import ArticleTop from './ArticleTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


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
                <Slider/>
                </div>
                    
                
            </li>
        
            <li  className={styles.pagelist}>
                <ArticleTop/>

            </li>
            <li className={`${styles.pagelist} ${styles.contactpage}`}>
                <div className={`${styles.title} ${styles.contacttitle}`}>                  
                    <h1 className='gradient-border'>Contact</h1>
                    <Arrow rel="contact"/>
                </div>
                <p className={styles.pageP}><FontAwesomeIcon icon="fa-brands fa-square-x-twitter" /></p>
            </li>
        </ul>



    </div>
    </>


  )
}

export default Homepage