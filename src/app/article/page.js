import './article.css';
import Item from './item';




export default async function Page() {
 
  return (
    <div className="article">
      <h1>Article</h1>
      <ul className='items'>
        <Item/>
      </ul>
    </div>
  );
}


