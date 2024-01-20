import Link from 'next/link';
import Header from './header';
import Homepage from './Homepage';
import './home.css';

export default function Page() {
  return (
    <div className="App">
        
        <div className='Contents'>
          
          <Homepage/>
          
        </div>
        
    </div>
  );
}
