import React from 'react'
import Career2 from './Career2'
import { client } from '../../../libs/client'

export const revalidate = 3600;

export default async function MicroCMS () {
    const career = await client.get({ 
      endpoint: 'career',
      queries: {
        limit: 100, // 取得するレコード数
        offset: 0, // オフセット値
      },
     });
    const datas = career.contents;


  return <Career2 datas={datas} />
}