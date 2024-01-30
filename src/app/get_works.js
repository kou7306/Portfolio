import { dividerClasses } from '@mui/material';
import { client } from '../../libs/client'
import React from 'react'
import Slider from './Slider';


export default async function Get_works () {
    // const works = await client.get({ endpoint: 'works' });
    // const datas = works.contents;
    // const images = [];
    // datas.forEach((work) => {
    //     // 画像のURLを取得して追加
        
    //     images.push(work.work_imgs[0].url);
    // });
    const images=["https://placehold.jp/150x150.png"]

    return (
        <Slider images={images}/>
    )
}



