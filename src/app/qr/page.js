import React from 'react'
import './qr.css'

export default function Page() {
  return (
    <div className='qr_page'>


    <div className="qrInfo">
    <h1 className="qrTitle">ポートフォリオのQR</h1>
    <img src="/images/qr.png" alt="" />
    </div>

    <div className="qrInfo">
    <h1 className="qrTitle">XのQR</h1>
    <img src="/images/x_qr.png" alt="" />
    </div>

  </div>

  )
}