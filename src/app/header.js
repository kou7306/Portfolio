import React from 'react';
import './header.css';
import Link from 'next/link';

const Header = () => {
    return(
        <div className='header'>

            <nav className='nav'>
                <img id="logo" src='https://placehold.jp/150x150.png'></img>
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

 

                </ul>
            </nav>
        </div>


    );
};

export default Header;

