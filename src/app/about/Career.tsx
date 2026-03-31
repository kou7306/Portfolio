'use client';

import { useState } from 'react';
import './Career.css';
import Target from './Target';
import type { Career as CareerType } from '../../types';

interface CareerProps {
  datas: CareerType[];
}

export default function Career({ datas }: CareerProps) {
  const [flag, setFlag] = useState([true, false, false, false, false]);

  const Updateflag = (index: number, isIn: boolean) => {
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
        <div className='circle'>
          <img src="/images/img6.png" id='one' alt="" />
          <img src="/images/img7.png" id='two' alt="" />
          <img src="/images/img5.png" id='three' alt="" />
          <img src="/images/img1.png" id='four' alt="" />
        </div>

        <div className='detail-contents'>
          {datas.map((data, index) => (
            <Target
              key={data.id}
              index={index}
              flag={flag}
              Updateflag={Updateflag}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
