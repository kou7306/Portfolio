'use client';
import React, { useRef, useEffect } from 'react';
import "./threeStyle.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { mergeGeometries } from './BufferGeometryUtils.js';

const ThreeBackground = () => {
 

  useEffect(() => {

    function createDiskGeometry(innerRadius, outerRadius, segments) {
      const diskGeometry = new THREE.RingGeometry(innerRadius, outerRadius, segments, 1);
      return diskGeometry;
    }
    
    
    // 新しい要素を追加する関数
    function addNewElement(newElement) {
      // 既存のデータをコピーした新しい配列を作成
      const newFloatArray = new Float32Array(diskGeometries.length + newElement.length);
    
      // 既存のデータを新しい配列にコピー
      newFloatArray.set(diskGeometries, 0);
    
      // 新しい要素を追加
      newFloatArray.set(newElement, diskGeometries.length);
    
      // 新しい配列を代入
      diskGeometries = newFloatArray;
    }

    
    const canvas = document.querySelector("#webgl");
// 親要素のサイズを取得
    // let parentElement = document.getElementById('app');
    //Sizes
    // const sizes = {
    //   width: parentElement.clientWidth,
    //   height: parentElement.clientWidth,
    // };
    let sizes = {
      width: window.innerWidth, 
      height: window.innerHeight,
    };

    console.log(sizes);
    
    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 6;
    camera.position.x = 2;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0); // カメラの向きを原点に設定
    scene.add(camera);
    
    //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    /**
     * ここからパーティクルを記述
     */
    const segments = 206;
    let diskGeometries = new Float32Array();// 円盤のジオメトリを格納する配列
    
    const innerRadius =  0; // 内側の半径
    let radius=0;
    let diff = 0;
    
    // 内側の円周の頂点を削除
    const innerVertices = segments + 1; // 円盤のセグメント数 + 1（中心点）
    
    
    const num =50;
    const zmax = 10;
    for (let i = 0; i < num; i++) {
      // z軸方向に-2から2まで配置
      let a = 2*zmax/num;
      let z =  i * a - zmax ;
      if(z != 0){
     
        radius = (1/(Math.abs(z))- 1/(zmax+1)) * 10 ;
        
        
        
        // diff = Math.abs(radius - 1/(Math.abs(z-0.04)*5));
        // if(diff < 0.4){
        //   radius = Math.abs(radius - 1/(1/(Math.abs(z)*(1+diff)*8)));
        // }
      }
      else{
        continue;
      }
      
    
    
      // 円盤のジオメトリを作成
      const diskGeometry = createDiskGeometry(innerRadius, radius, segments, 1);
      // 各頂点のZ座標を設定
      for (let j = 0; j < diskGeometry.attributes.position.count; j++) {
        diskGeometry.attributes.position.setZ(j, z);
      }
    
    
    // 内側の円周の頂点を削除して格納
      // let index = 0;
      // let originalPositionArray = diskGeometry.attributes.position.array; // 元の頂点座標配列
      // let newPositionArray = new Float32Array((originalPositionArray.length / 3 - innerVertices) * 3); // 内側を削除した新しい頂点座標配列
      // for (let i = innerVertices * 3; i < originalPositionArray.length; i++) {
      //   newPositionArray[index++] = originalPositionArray[i];
      // }
      let index = 0;
      let originalPositionArray = diskGeometry.attributes.position.array; // 元の頂点座標配列
      let newPositionArray = new Float32Array((originalPositionArray.length / 3 - 1) * 3); // 内側を削除した新しい頂点座標配列
      for (let i = innerVertices * 3; i < originalPositionArray.length; i++) {
        newPositionArray[index++] = originalPositionArray[i];
      }
    
      // 配列にジオメトリを追加
      addNewElement(newPositionArray);
    }
    

    
    
    // すべての円盤のジオメトリを結合する
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( diskGeometries, 3 ) );
    
    // マテリアルを設定
    const material = new THREE.PointsMaterial({
      size: 0.05, // ポイントのサイズ
      color: new THREE.Color(0x87CEEB), // ポイントの色（赤色）
      transparent: true, // 透明にする
      opacity: 0.7, 
    });
    
    // ポイントクラウドを作成
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    
    
    
    //カメラ制御
    // const controls = new OrbitControls(camera, canvas);
    // controls.enableDamping = true;
    
    /**
     * アニメーション
     */
    const clock = new THREE.Clock();
    
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      // カメラの回転角度を更新
      const time = performance.now() * 0.001; // 時間に基づいた値を取得
      const rotationSpeed = 0.1; // 回転速度を調整
      camera.position.x = Math.cos(time * rotationSpeed) * 10; // X座標を更新


      // カメラの向きを再設定
    camera.lookAt(0, 0, 0);
      // controls.update();
      renderer.render(scene, camera);
    
      window.requestAnimationFrame(tick);
    };
    
    tick();
    //ブラウザのリサイズ操作
    window.addEventListener("resize", () => {
      
      
      let sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });



    function onMouseMove(event) {
      // マウス座標を取得
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
      // カメラの向きを変更
      camera.rotation.y = mouseX * 2 * Math.PI;
      camera.rotation.x = mouseY * Math.PI;
    
      // カメラの更新
      camera.updateProjectionMatrix();
    }

    window.addEventListener('mousemove', onMouseMove);
    
  }, []);

  return (
    
    <canvas id="webgl" ></canvas>
   
  );
};





export default ThreeBackground;
