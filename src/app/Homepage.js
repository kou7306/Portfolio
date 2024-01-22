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
                                  
                <h1 className={styles.contactTitle}>Contact</h1>
                    
               <div className={styles.contactLink}>
                    <a href='https://twitter.com/amatuzi7306' className={styles.contactImg}><img src="/images/x.png"/></a>
                    <a href='https://github.com/kou7306' className={styles.gitlink}><svg  className={`${styles.github} ${styles.contactImg}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a>
                    
                    
                </div>
            </li>
        </ul>



    </div>
    </>


  )
}

export default Homepage