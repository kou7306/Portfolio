import React from 'react'

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

    <div>
        <Link href={url}>
        <span className='right-arrow link'>→</span>
        </Link>
    </div>
  )
}

export default Arrow