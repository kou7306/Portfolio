import React from 'react'
import './Homepage.css';
import Topimg from './Topimg'

const Homepage = () => {
  return (
    <>
    <Topimg/>
    <div className='homepage'>
        <ul>
            <li id='about'>
                <h1>About</h1>
                <p>私について</p>
            </li>
            <li id='work'>
                <h1>Work</h1>
                <p>制作物を紹介します</p>
            </li>
        
            <li id='article'>
                <h1>Article</h1>
                <p>Zenn,Qiitaの記事</p>
            </li>
            <li id='contact'>
                <h1>Contact</h1>
                <p>お問い合わせ</p>
            </li>
        </ul>



    </div>
    </>


  )
}

export default Homepage