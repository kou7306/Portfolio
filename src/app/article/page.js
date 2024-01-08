import './article.css';

const accessToken = process.env.QIITA_ACCESS_TOKEN;



async function getData() {
  const res = await fetch('https://qiita.com/api/v2/authenticated_user/items', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Page() {
  const data = await getData()
 
  return (
    <div className="article">
      <h1>Qiita Items</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}