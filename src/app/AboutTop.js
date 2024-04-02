import React from 'react'
import './AboutTop.css';
import ViewMoreButton from './ViewMoreButton';

const AboutTop = () => {
  return (
    <div className='about-all'>
        <div className='about-contents'>
            <h1 className='about-title'>About</h1>
            <p className='about-detail'>coins21所属し、知能ロボット研究室で研究をする大学生。課外活動ではSTECHに所属し、ハッカソンなどのイベントによく参加している。</p>
            <div className='about-button'>
                <ViewMoreButton rel="about"/>
            </div>
        </div>

    </div>
  )
}

export default AboutTop