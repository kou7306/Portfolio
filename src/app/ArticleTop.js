"use client"
import React from 'react'
import { useEffect } from 'react';
import './ArticleTop.css';


const ArticleTop = () => {

    useEffect(() => {
        const container = document.querySelector('.article-all');
        const title = document.querySelector('.article-title');
        const contents = document.querySelector('.article-contents');
    
        const startScroll = 100; // 適切なスクロール位置に変更
        const endScroll = 500; // 適切なスクロール位置に変更
    
        const handleScroll = () => {
        const currentScroll = window.scrollY;
    
        if (currentScroll >= startScroll && currentScroll <= endScroll) {
            // 区間内の場合、article-titleのスクロールを無効にする
            title.style.position = 'fixed';
            title.style.top = '0';
            contents.style.marginTop = `${title.offsetHeight}px`;
        } else {
            // 区間外の場合、通常のスタイルを適用
            title.style.position = 'static';
            contents.style.marginTop = '0';
        }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  return (
    <div className='article-all'>
        <div className='article-title'>
            <h1>Article</h1>
        </div>
        <div className='article-contents'>
            <div className='article-content'>
                <h2>記事1</h2>
                <p>記事1の内容</p>
            </div>
            <div className='article-content'>
                <h2>記事2</h2>
                <p>記事2の内容</p>
            </div>
            <div className='article-content'>
                <h2>記事3</h2>
                <p>記事3の内容</p>
            </div>
            <div className='article-content'>
                <h2>記事4</h2>
                <p>記事4の内容</p>
            </div>
            <div className='article-content'>
                <h2>記事5</h2>
                <p>記事5の内容</p>
            </div>


        </div>
    </div>
  )
}

export default ArticleTop