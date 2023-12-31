import React from 'react'
import './work.css'
import { client } from '../../../libs/client'



export default async function Page() {
  const works = await client.get({ endpoint: 'works' });
  const datas = works.contents;


  return (
  
    <div className='work_page'>
      <h1 className='work_title'>Works</h1>
      <ul className='works'>
      {datas.map((work) => (
        <li className='work' key={work.id} >
          <a href={`/works/${work.id}`} >
            
              <img className='work-img' src={work.work_imgs[0].url} alt={work.work_name} />
              <div className='work-detail'>
                <h2 className='work-title'>{work.work_name}</h2>
                <p className='work-ex'>{work.easy}</p>
              </div>
          </a>
        </li>
      ))}
      </ul>
    </div>
  );
};

  

