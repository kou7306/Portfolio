import './article.css';
import Item from './item';




export default async function Page() {
 
  return (
    <div className="article">
      
      <div className='articleTitle'>
      <h1>Article</h1>
      </div>
      
      <ul className='items'>
        <Item/>
      </ul>
    </div>
  );
}


