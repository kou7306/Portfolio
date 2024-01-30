import React from 'react'
import Career2 from './Career2'
import { client } from '../../../libs/client'

export default async function MicroCMS () {
    const career = await client.get({ endpoint: 'career' });
    const datas = career.contents;


  return <Career2 datas={datas} />
}