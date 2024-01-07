import Link from 'next/link';
import Header from './header';
import Homepage from './Homepage';

export default function Page() {
  return (
    <div className="App">
        <Header/>
        <div className='Contents'>
          <Homepage/>
          
        </div>
        
    </div>
  );
}
