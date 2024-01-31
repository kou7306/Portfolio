'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import "./mobile.css"
import "./header.css"
import Link from 'next/link';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // 画面サイズが変更されたときに実行
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // 画面が小さい場合はモバイル表示に切り替え
      } else {
        setIsMobile(false); // 画面が大きい場合は通常の表示に切り替え
      }
    }

    // 初期化時にも実行
    handleResize();

    // イベントリスナーを追加
    window.addEventListener('resize', handleResize);

    let nav = document.querySelector('#navArea');
    let btn= document.querySelector('#toggle-btn');
    let mask= document.querySelector('#mask');

 
    // クリーンアップ関数を追加
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // モバイル表示用のハンバーガーメニュー
  if (isMobile) {
    return (
      // ハンバーガーメニューのコンポーネントをここに表示
      <div className={`navArea ${isOpen ? 'open' : ''}`}>
        <nav className='mobile'>
            <div className='inner'>
                <ul>
                    <li className='navlist'><Link href='/'><span className='link'>Home</span></Link></li>
                    <li className='navlist'><Link href='about'><span className='link'>About</span></Link></li>
                    <li className='navlist'><Link href='works'><span className='link'>Works</span></Link></li>
                    <li className='navlist'><Link href='article'><span className='link'>Article</span></Link></li>
                    <li className='navlist'><Link href='contact'><span className='link'>Contact</span></Link></li>
                </ul>
            </div>
        </nav>

        <div className='toggle-btn' onClick={handleToggleClick}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div id="mask"></div>
      </div>
    );
  } else {
    return (
      // 通常のヘッダーのコンポーネントをここに表示
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
                  <Link href='contact'><span className='link'>Contact</span></Link>
              </li>

          </ul>
      </nav>
  </div>
    );
  }
}

export default Header;