import React from 'react'
import './contact.css'

export default function Page() {
  return (
    <div className="Form">
      <h1 className="Form-Title">お問い合わせ</h1>
      <div className="Form-Item">
        <p className="Form-Item-Label">
          <span className="Form-Item-Label-Required">必須</span>会社名
        </p>
        <input type="text" className="Form-Item-Input" placeholder="例）株式会社令和"/>
      </div>
      <div className="Form-Item">
        <p className="Form-Item-Label"><span className="Form-Item-Label-Required">必須</span>氏名</p>
        <input type="text" className="Form-Item-Input" placeholder="例）山田太郎"/>
      </div>
      <div className="Form-Item">
        <p className="Form-Item-Label"><span className="Form-Item-Label-Required">必須</span>電話番号</p>
        <input type="text" className="Form-Item-Input" placeholder="例）000-0000-0000"/>
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
    </div>

  )
}