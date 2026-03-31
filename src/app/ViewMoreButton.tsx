"use client";

import './ViewMoreButton.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PageRel } from '../types';

interface ViewMoreButtonProps {
  rel: PageRel | string;
}

const routeMap: Record<string, string> = {
  about: '/about',
  work: '/work',
  article: '/article',
  contact: '/contact',
};

const ViewMoreButton = ({ rel }: ViewMoreButtonProps) => {
  const url = routeMap[rel] ?? '/';

  return (
    <div className='view-con'>
      <Link href={url}>
        <motion.button
          className='custom-button sao-btn'
          whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(92,225,255,0.5)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <span className="sao-btn-bracket">&laquo;</span>
          VIEW MORE
          <span className="sao-btn-bracket">&raquo;</span>
        </motion.button>
      </Link>
    </div>
  );
};

export default ViewMoreButton;
