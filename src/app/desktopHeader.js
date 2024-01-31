import React from 'react';
import './header.css';
import Link from 'next/link';

const DesktopHeader = () => {
    return(
        <div className='header'>

            <nav className='nav'>
                <div class="animated-text">
                <span>H</span><span>e</span><span>l</span><span>l</span><span>o</span>
                </div>

                <ul>
                    <li>
                        <Link href='/'><span className='link'>Home</span></Link>
                    </li>
                    <li>
                        <Link href='about'><span className='link'>About</span></Link>
                    </li>
                    <li>
                        <Link href='works'><span className='link'>Works</span></Link>
                    </li>
                    <li>
                        <Link href='article'><span className='link'>Article</span></Link>
                    </li>

                    <li>
                        <Link href='contact'><span className='link'>Contact        </span></Link>
                    </li>

                </ul>
            </nav>
        </div>


    );
};

export default DesktopHeader;

