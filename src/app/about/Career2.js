import React from 'react'
import './Career2.css';
import Link from 'next/link';


const Career2 = ({datas}) => {
  return (
    <div className='careers'>
    <h2 className='gradient-border'>Career</h2>
    <div className='timeline'>
        
        {datas.map((data, index) => (
          <li className={`careerCon ${index % 2 === 0 ? 'left-container' : 'right-container'}`}>
            <img src="/images/pin.png"/>
            <div className='text-box'>
            <h1 className='careerTopic'>{data.title}</h1>
            <small>{data.date}</small>
            <p className='careerDetail'>{data.detail}</p>
            </div>
          </li>
        ))}
      </div>

      </div>
  )
}

export default Career2