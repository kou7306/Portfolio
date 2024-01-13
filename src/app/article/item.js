import React from 'react'
import './item.css'
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


export default async function Item() {
    const data = await getData()
  return (
    <>
        {data.map((item) => (
          <li key={item.id} className='item'>
            <a href={item.url}>
              <p className='date'>{formatDate(item.updated_at)}</p>
              <h2>{item.title}</h2>
              <p className='spans'>
                {item.tags.map((tag) => (
                  <span className='tag' key={tag.name}>{tag.name}</span>        
                  ))}
              </p>

                
                <p className='likes'><span className='heart'>♡</span>{item.likes_count}</p>
            </a>
            
          </li>
        ))}
    </>
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
  
