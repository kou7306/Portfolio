'use client';
import React, { useEffect, useRef } from 'react';
import './Target.css';

const Target = ({ index, flag, Updateflag, data }) => {
    const targetElementRef = useRef(null);
    
    
  
    useEffect(() => {
      const targetElement = targetElementRef.current;
    
  
      if (!targetElement) {
        return;
      }
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            
            
            // 直前が非交差だった場合
            console.log(`Target element with index ${index} is now in the viewport!`);
            
            // 画面内に入ったときの処理
            // ここで特定のアクションを実行
            if (index === 1) {
            // indexが1の場合の処理
                if(flag[index] === false){
                    Updateflag(index, true);
                }
                console.log(flag);
            } else if (index === 2 || index === 3 || index === 4) {
            // indexが2, 3, 4の場合の処理
            if(flag[index] === false){
                Updateflag(index, true);
            }
 
            rotateImage(index, 180);
            console.log(flag);
            }
            
          } else {
            console.log(`Target element with index ${index} is now out the viewport!`);
            if(flag[index] === true){
                Updateflag(index, false);
            }
           
            // 画面から出たときの正しい処理
            let preindex = index - 1;
            
            if(flag[preindex] === true){
                rotateImage(index, 0);
            }
          }
        });
      }, { threshold: 0 });
  
      observer.observe(targetElement);
  
      // cleanup
      return () => {
        observer.unobserve(targetElement);
      };
    }, [index,flag]); // 空のdependenciesで初回レンダリング時のみ実行される

    const rotateImage = (index,degree) => {
        // 対象の画像を取得
        switch (index) {
            case 1:
                var image = document.getElementById('one');
                break;
            case 2:
                var image = document.getElementById('two');
                break;
            case 3:
                var image = document.getElementById('three');
                break;
            case 4: 
                var image = document.getElementById('four');
                break;  
            default:    
                break;
        }               
     
    
        // 画像が存在していれば回転
        if (image) {
          const screenWidth = window.innerWidth;
          const rotationCenterX = screenWidth * 0.125; // 画面幅の25%の位置を回転の中心に設定
          image.style.transition = `transform 1s ease-in-out`;
    
          image.style.transform = `rotate(${degree}deg)`;
          image.style.transformOrigin = `calc(100% + ${rotationCenterX}px) 50%`;
        }
      };

  return (
  
    <div ref={targetElementRef} className="targetElement">
      
        <div className='target-contents'>
            <h2 className='career-h2' >{data.title}</h2>
            <p>{data.detail}</p>
        </div>
       
    </div>
    
    
  );
};

export default Target;