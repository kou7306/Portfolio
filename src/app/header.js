// import React from 'react';
import './header.css';
import Link from 'next/link';

const Header = () => {
    return(
        <div className='header'>

            <nav className='nav'>
                <img id="logo" src='https://placehold.jp/150x150.png'></img>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='about'>About</Link>
                    </li>
                    <li>
                        <Link href='work'>Works</Link>
                    </li>
                    <li>
                        <Link href='article'>Article</Link>
                    </li>
                    <li>
                        <Link href='contact'>Contact</Link>
                    </li>
 

                </ul>
            </nav>
        </div>


    );
};

export default Header;

