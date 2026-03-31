import { client } from '../../../../libs/client';
import "./workDetail.css";
import type { Work } from "../../../types";

export const revalidate = 3600;

interface WorkPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id: workId } = await params;

  const data: Work = await client.get({
    endpoint: 'works',
    queries: {
      limit: 100,
      offset: 0,
    },
    contentId: workId,
  });

  return (
    <div className='workALL'>
      <div className='workTitle'>
        <h1>{data.work_name}</h1>
      </div>
      <img src={data.work_imgs[0].url} alt={data.work_name} />
      <div
        className='workDetail'
        style={{ whiteSpace: 'pre-line' }}
        dangerouslySetInnerHTML={{ __html: data.detail }}
      />
    </div>
  );
}
