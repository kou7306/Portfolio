import React from 'react'
import './Arrow.css'
import Link from 'next/link';

const Arrow = ({rel}) => {
    let url;
    console.log(rel)
    if (rel == 'about'){
        url='/about'
    }
    else if (rel == 'works'){
        url='/works'
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

    <>
        <Link href={url}>
        <span className='right-arrow link'>→</span>
        </Link>
    </>
  )
}

export default Arrow