
import { client } from '../../libs/client'
import React from 'react'
import Slider from './Slider';


export default async function Get_works () {
    const works = await client.get({ 
        customRequestInit: {
            cache: "no-store", // キャッシュを利用せずに常に新しいデータを取得する
           },
        endpoint: 'works',
        queries: {
          limit: 100, // 取得するレコード数
          offset: 0, // オフセット値
        },
       });
    const datas = works.contents;
    const dataSets = []; // IDと画像URLのセットを格納する配列

    datas.forEach((work) => {
        const dataSet = {
            id: work.id,
            imageUrl: work.work_imgs[0].url
        };
        dataSets.push(dataSet);
    });

    // const images=["https://placehold.jp/150x150.png"]

    return (
        <Slider datas={dataSets}/>
    )
}



