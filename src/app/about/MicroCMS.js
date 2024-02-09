import React from 'react'
import Career2 from './Career2'
import { client } from '../../../libs/client'

export default async function MicroCMS () {
    const career = await client.get({ 
      customRequestInit: {
        cache: "no-store", // キャッシュを利用せずに常に新しいデータを取得する
       },
      endpoint: 'career',
      queries: {
        limit: 100, // 取得するレコード数
        offset: 0, // オフセット値
      },
     });
    const datas = career.contents;


  return <Career2 datas={datas} />
}