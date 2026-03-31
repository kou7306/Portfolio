import './qr.css';

export default function Page() {
  return (
    <div className='qr_page'>
      <div className="qrInfo">
        <h1 className="qrTitle">ポートフォリオのQR</h1>
        <img src="/images/qr.png" alt="ポートフォリオQR" />
      </div>

      <div className="qrInfo">
        <h1 className="qrTitle">XのQR</h1>
        <img src="/images/x_qr.png" alt="XのQR" />
      </div>
    </div>
  );
}
