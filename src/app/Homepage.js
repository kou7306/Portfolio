import React from 'react'
import './Homepage.css';
import Topimg from './Topimg'
import ViewMoreButton from './ViewMoreButton';
import Slider from './Slider';
import AboutTop from './AboutTop';
import Arrow from './Arrow';
import ArticleTop from './ArticleTop';


const Homepage = () => {
  return (
    <>
    <Topimg/>
    <div className='homepage'>
        <ul>
            <li id='about'>
                <AboutTop/>
            </li>
            <li id='work'>
                <div className='work-title title'>                  
                    <h1 className='work-title'>Works</h1>
                    <Arrow rel="works"/>
                    
                </div>
                <div className='slider'>
                <Slider/>
                </div>
                    
                
            </li>
        
            <li id='article'>
                <ArticleTop/>
            </li>
            <li id='contact'>
                <div className='title'>                  
                    <h1 className='gradient-border'>Contact</h1>
                    <ViewMoreButton rel="contact" />
                </div>
                <p>お問い合わせ</p>
            </li>
        </ul>



    </div>
    </>


  )
}

export default Homepage