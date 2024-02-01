'use client';
import React, { useState, useRef } from 'react';
import './Career.css'
import Target from './Target'


export default function Career({datas}){
    
    const [flag, setFlag] = useState([true, false, false, false, false]);


    const Updateflag = (index, isIn) => {
        // ここで `flag` を更新するなどの処理を行う
        setFlag(prevFlag => {
          const newFlag = [...prevFlag];
          newFlag[index] = isIn;
          return newFlag;
        });
      };
     
    return (
      <div className='career'>
        <h2 className='gradient-border'>Career</h2>
        <div className='rotate-contents'>
  
          <div className='circle' >
            <img src="/images/img6.png" id='one' alt="" />
            <img src="/images/img7.png" id='two' alt="" />
            <img src="/images/img5.png" id='three' alt="" />
            <img src="/images/img1.png" id='four' alt="" />
          </div>
  
        <div className='detail-contents'>
        {datas.map((data, index) => (
        <Target
          index={index}
          flag={flag[index]}
          Updateflag={Updateflag}
          data={data} // ここでデータを渡す
        />
))}
        </div>
        </div>
      </div>
    );
  }
  
  