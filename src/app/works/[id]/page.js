import { useQuery } from 'next/navigation';
import React from 'react'
import {client} from '../../../../libs/client';
import "./workDetail.css";

export const revalidate = 3600;
export default async function WorkPage({
    params,
  }) {
    const workId = params.id;

    const work = await client.get({
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
