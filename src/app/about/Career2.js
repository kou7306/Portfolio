import React from 'react'
import './Career2.css';

const Career2 = ({datas}) => {
  return (
    <div className='careerAll'>
        {datas.map((data) => (
        <li className='careerCon'>
          <h1 className='careerTopic'>{data.title}</h1>
          <p className='careerDetail'>{data.detail}</p>
        </li>
      ))}
    </div>
  )
}

export default Career2