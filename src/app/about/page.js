import React from 'react'
import './about.css'
import MicroCMS from './MicroCMS'
import { client } from '../../../libs/client'
import Link from 'next/link';

export const revalidate = 3600;

export default async function Page() {
  const skill = await client.get({ 
    endpoint: 'skill',
    queries: {
      limit: 100, // 取得するレコード数
      offset: 0, // オフセット値
    },
   });
  const datas = skill.contents;
  console.log(datas)

  return (
    <div className="App">
      <div className='about'>
      <div className='name'>
        <div className='name-img'>
          <img src='/images/icon.png' alt='icon' className='icon-img'/>
          <Link href='/qr' className='qrLink'>QR</Link>
        </div>
        <div className='name-detail'>
          <h1>Kota Yahagi</h1>
          <p className='name-contents'>矢作恒太</p>
          <p className='profile'>今大学３年でロボットの研究をする予定です。チーム開発が大好きです。趣味はアニメとサッカー観戦です。院進予定27卒</p>
          <div className="snsLink">
          <a href='https://twitter.com/amatuzi7306' className="snsImg"><img src="/images/x.png"/></a>
          <a href='https://github.com/kou7306' className="gitlink"><svg  className="github snsImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a>
          </div>

        
        </div>
      </div>


      <div className='content-all'>
      <div className='affiliation'>
      <h2 className='gradient-border'>Affiliation</h2>
      <ul>


        <li>Student in Tsukuba University </li>
        <li>STECH</li>
        
      </ul>

      </div>

      <div className='skill'>
        <h2 className='gradient-border'>Skill</h2>
        <h3>Language</h3>
        <ul className='skill-imgs'>
        {datas.filter(skill => skill.category === 1).map((skill) => (
          <li key={skill.id}>
            <div className='skill-con'>
              <img src={`${skill.img}`} alt={skill.detail}/>
              <p>{skill.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3>Framework,Library</h3>
        <ul className='skill-imgs'>
        {datas.filter(skill => skill.category === 2).map((skill) => (
          <li key={skill.id}>
            <div className='skill-con'>
              <img src={`${skill.img}`} alt={skill.detail}/>
              <p>{skill.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3>Others</h3>
        <ul className='skill-imgs'>
        {datas.filter(skill => skill.category === 3).map((skill) => (
          <li key={skill.id}>
            <div className='skill-con'>
              <img src={`${skill.img}`} alt={skill.detail}/>
              <p>{skill.detail}</p>
            </div>
          </li>
        ))}
      </ul>
{/*           <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" /></li>

        
        <h3>Framework,Library</h3>
        <ul className='skill-imgs'>
        <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" /></li>
        </ul> */}
      </div>
      <div className='certification'>
        <h2 className='gradient-border'>Certification</h2>
        <ul>
          <li>応用情報技術者</li>
          <li>TOEIC 710点</li>
        </ul>

      </div>

      <MicroCMS/>

      </div>
    </div>
    </div>
  )
}

