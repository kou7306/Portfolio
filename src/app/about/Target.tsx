'use client';

import { useEffect, useRef } from 'react';
import './Target.css';
import type { Career } from '../../types';

interface TargetProps {
  index: number;
  flag: boolean[];
  Updateflag: (index: number, isIn: boolean) => void;
  data: Career;
}

const Target = ({ index, flag, Updateflag, data }: TargetProps) => {
  const targetElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (index === 1) {
            if (!flag[index]) {
              Updateflag(index, true);
            }
          } else if (index === 2 || index === 3 || index === 4) {
            if (!flag[index]) {
              Updateflag(index, true);
            }
            rotateImage(index, 180);
          }
        } else {
          if (flag[index]) {
            Updateflag(index, false);
          }
          const preindex = index - 1;
          if (flag[preindex]) {
            rotateImage(index, 0);
          }
        }
      });
    }, { threshold: 0 });

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [index, flag, Updateflag]);

  const rotateImage = (idx: number, degree: number) => {
    const idMap: Record<number, string> = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
    };

    const elementId = idMap[idx];
    if (!elementId) return;

    const image = document.getElementById(elementId) as HTMLElement | null;
    if (image) {
      const screenWidth = window.innerWidth;
      const rotationCenterX = screenWidth * 0.125;
      image.style.transition = `transform 1s ease-in-out`;
      image.style.transform = `rotate(${degree}deg)`;
      image.style.transformOrigin = `calc(100% + ${rotationCenterX}px) 50%`;
    }
  };

  return (
    <div ref={targetElementRef} className="targetElement">
      <div className='target-contents'>
        <h2 className='career-h2'>{data.title}</h2>
        <p>{data.detail}</p>
      </div>
    </div>
  );
};

export default Target;
