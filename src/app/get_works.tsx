import { client } from '../../libs/client';
import Slider from './Slider';
import type { Work, WorkSliderData } from '../types';

export const revalidate = 3600;

export default async function GetWorks() {
  const works = await client.get({
    endpoint: 'works',
    queries: {
      limit: 100,
      offset: 0,
    },
  });
  const datas: Work[] = works.contents;
  const dataSets: WorkSliderData[] = datas.map((work) => ({
    id: work.id,
    imageUrl: work.work_imgs[0].url,
  }));

  return <Slider datas={dataSets} />;
}
