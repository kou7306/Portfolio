import { createClient } from 'microcms-js-sdk';

// app.js や index.js などのエントリーポイントファイル
const dotenv = require('dotenv');
dotenv.config();

// アプリケーションコード
const apiKey = process.env.microCMS_APIKEY;
// const keys = require('../key.json');
// const apiKey = keys.microCMS_APIKEY;
export const client = createClient({
  serviceDomain: 'kotaportfolio', 
  apiKey: apiKey,
});