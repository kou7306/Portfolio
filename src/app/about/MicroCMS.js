import React from 'react'
import Career from './Career'
import { client } from '../../../libs/client'

export default async function MicroCMS () {
    const career = await client.get({ endpoint: 'career' });
    const datas = career.contents;


  return <Career datas={datas} />
}