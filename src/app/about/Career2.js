import React from 'react'
import './Career2.css';

const Career2 = ({datas}) => {
  return (
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

    
  )
}

export default Career2