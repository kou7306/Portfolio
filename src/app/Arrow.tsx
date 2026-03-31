"use client";

import './Arrow.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PageRel } from '../types';

interface ArrowProps {
  rel: PageRel | string;
}

const routeMap: Record<string, string> = {
  about: '/about',
  works: '/works',
  article: '/article',
  contact: '/contact',
};

const Arrow = ({ rel }: ArrowProps) => {
  const url = routeMap[rel] ?? '/';

  return (
    <Link href={url}>
      <motion.span
        className='right-arrow link'
        whileHover={{ x: 8, textShadow: "0 0 16px rgba(92,225,255,0.8)" }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        &rarr;
      </motion.span>
    </Link>
  );
};

export default Arrow;
