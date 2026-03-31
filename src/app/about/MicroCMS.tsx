import Career2 from './Career2';
import { client } from '../../../libs/client';
import type { Career } from '../../types';

export const revalidate = 3600;

export default async function MicroCMS() {
  const career = await client.get({
    endpoint: 'career',
    queries: {
      limit: 100,
      offset: 0,
    },
  });
  const datas: Career[] = career.contents;
  datas.sort((a, b) => a.index - b.index);

  return <Career2 datas={datas} />;
}
