import React from 'react'
import './ViewMoreButton.css';
import Link from 'next/link';

const ViewMoreButton = ({rel}) => {
    let url;
    console.log(rel)
    if (rel == 'about'){
        url='/about'
    }
    else if (rel == 'work'){
        url='/work'
    }
    else if (rel == 'article'){
        url='/article'
    }
    else if (rel == 'contact'){
        url='/contact'
    }
    else{
        url='/'
    }
  return (

    <div>
        <Link href={url}>
        <button className='custom-button'>VIEW MORE</button>
        </Link>
    </div>
  )
}

export default ViewMoreButton