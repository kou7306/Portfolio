"use client";
import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import { client } from '../../libs/client';

function GetWorks() {
    const [dataSets, setDataSets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const works = await client.get({
                    endpoint: 'works',
                    queries: {
                        limit: 100,
                        offset: 0,
                    },
                });
                const datas = works.contents;
                const sets = datas.map(work => ({
                    id: work.id,
                    imageUrl: work.work_imgs[0].url,
                }));
                setDataSets(sets);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData(); // コンポーネントがマウントされた後にデータを取得する

    }); // 第二引数の空配列はマウント時のみ実行されることを意味する

    return <Slider datas={dataSets} />;
}

export default GetWorks;
