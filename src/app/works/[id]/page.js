import { useQuery } from 'next/navigation';
import React from 'react'
import {client} from '../../../../libs/client';
import "./workDetail.css";


export default async function WorkPage({
    params,
  }) {
    const workId = params.id;

    const work = await client.get({
        customRequestInit: {
            cache: "no-store", // キャッシュを利用せずに常に新しいデータを取得する
           },
        endpoint: 'works', // MicroCMSのコンテンツタイプ名に置き換えてください
        queries: {
            limit: 100, // 取得するレコード数
            offset: 0, // オフセット値
          },
        contentId: workId
    });
    
    const data = work;    

    return (
        <div className='workALL'>
            <div className='workTitle'>
                <h1>{data.work_name}</h1>        
            </div>
            <img src={data.work_imgs[0].url} alt={data.work_name} />
            
            <div className='workDetail' style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: data.detail }} />
        </div>
    );
}
