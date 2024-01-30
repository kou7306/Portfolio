import React from 'react'
import './contact.css'

export default function Page() {
  return (
    <div className='contact_page'>
    {/* <div className="Form">
      <div className='text-center text-6xl font-bold my-14'>
      <h1 className="Form-Title">Contact</h1>
      </div>
      
      <div className="Form-Item">
        <p className="Form-Item-Label"><span className="Form-Item-Label-Required">必須</span>氏名</p>
        <input type="text" className="Form-Item-Input" placeholder="例）山田太郎"/>
      </div>

      <div className="Form-Item">
        <p className="Form-Item-Label"><span className="Form-Item-Label-Required">必須</span>メールアドレス</p>
        <input type="email" className="Form-Item-Input" placeholder="例）example@gmail.com"/>
      </div>
      <div className="Form-Item">
        <p className="Form-Item-Label isMsg"><span className="Form-Item-Label-Required">必須</span>お問い合わせ内容</p>
        <textarea className="Form-Item-Textarea"></textarea>
      </div>
      <input type="submit" value="送信する" className="Form-Btn"/> 
    </div> */}

    <div className="otherInfo">
    <h1 className="otherTitle">Contact</h1>
    </div>

  <div className="contactLink">
  <p>XのDMでの問い合わせをお願いします。</p>
  <a href='https://twitter.com/amatuzi7306' className="contactImage"><img src="/images/x.png"/></a>
  
  </div>

  </div>

  )
}