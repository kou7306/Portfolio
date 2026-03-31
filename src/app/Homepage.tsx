"use client";

import type { ReactNode } from "react";
import styles from "./Homepage.module.css";
import Topimg from "./Topimg";
import AboutTop from "./AboutTop";
import SaoPanel from "./SaoPanel";
import Arrow from "./Arrow";

type HomepageProps = {
  /** Server Component（GetWorks）を親から渡す — microCMS はサーバー専用 */
  worksSlider: ReactNode;
  /** Qiita 取得はサーバー専用 env のため、クライアントから import しない */
  articlesSlot: ReactNode;
};

const Homepage = ({ worksSlider, articlesSlot }: HomepageProps) => {
  return (
    <>
      <Topimg />
      <div className={styles.homepage}>
        <section className={styles.section}>
          <AboutTop />
        </section>

        <section className={styles.section}>
          <SaoPanel title="Works">
            <div className={styles.sectionHeader}>
              <Arrow rel="works" />
            </div>
            <div className={styles.slider}>{worksSlider}</div>
          </SaoPanel>
        </section>

        <section className={styles.section}>
          <SaoPanel title="Article">{articlesSlot}</SaoPanel>
        </section>
      </div>
    </>
  );
};

export default Homepage;
