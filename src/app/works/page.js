import React from 'react'
import './work.css'
import { client } from '../../../libs/client'
import Link from 'next/link';


export default async function Page() {
  const works = await client.get({ 
    endpoint: 'works',
    queries: {
      limit: 100, // 取得するレコード数
      offset: 0, // オフセット値
    },
   });
  const datas = works.contents;

  return (
  
    <div className='work_page'>
      <div className='co'>
      <h1 className='work_title'>Works</h1>
      </div>
      
      <ul className='works'>
      {datas.map((work) => (
        <li className='work frame' key={work.id} >
          <Link key={work.id} className='work-img-container' href={`/works/${work.id}`} >        
              <img className='work-img' src={work.work_imgs[0].url} alt={work.work_name} />
              <div className='work-detail'>
                <h2 className='work-title'>{work.work_name}</h2>
                {/* <p className='work-ex'>{work.easy}</p> */}
            </div>
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
};
