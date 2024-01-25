
import React from 'react'

import './ArticleTop.css';
import ViewMoreButton from './ViewMoreButton';
const accessToken = process.env.QIITA_ACCESS_TOKEN;



async function getData() {
  const res = await fetch('https://qiita.com/api/v2/authenticated_user/items', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function ArticleTop() {
   
  const data = await getData()
    
  return (
    <div className='article-all'>
        <div className='article-title'>
            <h1>Article</h1>
            <p>Qiita記事を更新中</p>
            <div className='article-button' >
                <ViewMoreButton rel="article"/>
            </div>
            
        </div>
        <ul className='article-contents'>
            {data.slice(0, 5).map((item) => (
            <li key={item.id} className='article-content'>
                <a href={item.url} className='article-item'>
                    <p>{formatDate(item.updated_at)}</p>
                    <h2>{item.title}</h2>
                </a>
            </li>
            ))}


        </ul>
    </div>
  )
}

// フォーマット関数
function formatDate(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    
    return `${year}年${month}月${day}日`;
  }
  