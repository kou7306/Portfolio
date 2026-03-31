import ViewMoreButton from "./ViewMoreButton";
import SaoPanel from "./SaoPanel";

const AboutTop = () => {
  return (
    <SaoPanel title="About" delay={0.1} className="sao-panel--about">
      <p className="sao-about-detail">
        筑波大学の情報理工学位プログラムに所属し、知能ロボット研究室で研究をする大学院生。課外活動ではSTECHに所属し、ハッカソンなどのイベントによく参加している。
      </p>
      <div className="sao-about-button">
        <ViewMoreButton rel="about" />
      </div>
    </SaoPanel>
  );
};

export default AboutTop;
