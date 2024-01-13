import React from 'react'
import './Homepage.css';
import Topimg from './Topimg'
import Arrow from './Arrow';
import Slider from './Slider';

const Homepage = () => {
  return (
    <>
    <Topimg/>
    <div className='homepage'>
        <ul>
            <li id='about'>
                <div className='title'>                  
                    <h1 className='gradient-border'>
                        About</h1>
                    <Arrow rel="about"/>
                </div>
                <p>私について</p>
            </li>
            <li id='work'>
                <div className='title'>                  
                    <h1 className='gradient-border'>Work</h1>
                    <Arrow rel="work"/>
                </div>
                <Slider/>
            </li>
        
            <li id='article'>
                <div className='title'>                  
                    <h1 className='gradient-border'>Article</h1>
                    <Arrow rel="article"/>
                </div>
                <p>Zenn,Qiitaの記事</p>
            </li>
            <li id='contact'>
                <div className='title'>                  
                    <h1 className='gradient-border'>Contact</h1>
                    <Arrow rel="contact" />
                </div>
                <p>お問い合わせ</p>
            </li>
        </ul>



    </div>
    </>


  )
}

export default Homepage