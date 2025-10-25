# VRM モデルファイルの配置ガイド

このディレクトリに VRM モデルファイルを配置してください。

## 📁 ファイル配置

1. VRoid で作成したキャラクターを VRM 形式でエクスポート
2. このディレクトリに `character.vrm` として保存

```
public/
  models/
    character.vrm  ← ここに配置
    README.md
```

## 🎭 VRM モデルの準備方法

### VRoid Studio を使用する場合

1. **VRoid Studio をダウンロード**

   - https://vroid.com/studio からダウンロード
   - 無料で使用できます

2. **キャラクターを作成**

   - 髪型、顔、体型、服装をカスタマイズ
   - プリセットから選択することも可能

3. **VRM 形式でエクスポート**

   - 上部メニューから「エクスポート」を選択
   - 「VRM エクスポート」を選択
   - ファイル名を `character.vrm` に設定
   - エクスポート

4. **ファイルを配置**
   - エクスポートした `character.vrm` を `public/models/` ディレクトリにコピー

### 既存の VRM モデルを使用する場合

1. **VRM モデルをダウンロード**

   - VRoid Hub (https://hub.vroid.com/) から無料モデルをダウンロード
   - または自分で作成した VRM ファイルを使用

2. **ライセンスを確認**

   - モデルの利用規約を必ず確認してください
   - 商用利用が許可されているか確認

3. **ファイルを配置**
   - VRM ファイルを `character.vrm` にリネーム
   - `public/models/` ディレクトリにコピー

## ⚙️ カスタマイズ

別の名前の VRM ファイルを使用する場合は、`src/app/ai-chat/page.js` を編集：

```javascript
<VRoidViewer
  vrmPath="/models/your-model-name.vrm" // ← ここを変更
  isSpeaking={isLoading}
/>
```

## 📦 ファイルサイズ

- 推奨: 10MB 以下
- VRM ファイルが大きい場合、読み込みに時間がかかる可能性があります
- VRoid Studio のエクスポート設定で「軽量化」オプションを使用することをおすすめします

## 🎨 アニメーションについて

このアプリケーションでは以下のアニメーションが自動的に適用されます：

- **瞬き**: ランダムな間隔で自動的に瞬きします
- **アイドルアニメーション**: 小さな頭や体の動きが継続的に行われます
- **スピーキングアニメーション**: AI が応答中、口が動きます

## 🚨 トラブルシューティング

### モデルが表示されない場合

1. ファイルパスが正しいか確認
   - `public/models/character.vrm` に配置されているか
2. ブラウザのコンソールでエラーを確認

   - Developer Tools (F12) を開いてエラーメッセージを確認

3. VRM ファイルが壊れていないか確認

   - 別の VRM ビューワー（https://vrm.dev/en/univrm/viewer/viewer）でファイルを開いてみる

4. ファイルサイズが大きすぎる場合
   - VRoid Studio で軽量化してエクスポート
   - テクスチャサイズを削減

### アニメーションが動かない場合

- VRM ファイルに標準的な表情（blink, aa, oh など）が含まれているか確認
- VRoid Studio で作成されたモデルは通常、これらの表情が含まれています

## 📚 参考リンク

- VRoid Studio: https://vroid.com/studio
- VRoid Hub: https://hub.vroid.com/
- VRM 仕様: https://vrm.dev/
- @pixiv/three-vrm ドキュメント: https://github.com/pixiv/three-vrm
