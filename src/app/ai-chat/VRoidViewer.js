"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import {
  startSpeakingAnimation,
  stopSpeakingAnimation,
  startBlinkingAnimation,
  startIdleAnimation,
} from "./animations";

export default function VRoidViewer({
  vrmPath = "/models/character.vrm",
  isSpeaking = false,
}) {
  const canvasRef = useRef(null);
  const vrmRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let handleResize; // リサイズハンドラー
    let resizeTimers = []; // リサイズタイマーを保存

    // canvasのサイズが確定するまで少し待機
    const initializeScene = () => {
      if (!canvasRef.current) return;

      // parentElementのサイズを基準にする（より確実）
      const parent = canvasRef.current.parentElement;
      const width =
        parent?.clientWidth ||
        canvasRef.current.clientWidth ||
        window.innerWidth;
      const height =
        parent?.clientHeight ||
        canvasRef.current.clientHeight ||
        window.innerHeight;

      console.log("Canvas初期化サイズ:", width, height);
      console.log(
        "Parent要素サイズ:",
        parent?.clientWidth,
        parent?.clientHeight
      );

      // シーン、カメラ、レンダラーの初期化
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        35.0,
        width / height,
        0.1,
        20.0
      );
      camera.position.set(0.0, 1.0, -2.5);
      camera.lookAt(0.0, 0.8, 0.0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      rendererRef.current = renderer;

      // ライトの設定
      const light = new THREE.DirectionalLight(0xffffff, Math.PI);
      light.position.set(1.0, 1.0, 1.0).normalize();
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // VRMモデルのロード
      const loader = new GLTFLoader();
      loader.register((parser) => {
        return new VRMLoaderPlugin(parser);
      });

      loader.load(
        vrmPath,
        (gltf) => {
          const vrm = gltf.userData.vrm;
          vrmRef.current = vrm;

          // VRMモデルをシーンに追加
          VRMUtils.removeUnnecessaryVertices(gltf.scene);
          VRMUtils.removeUnnecessaryJoints(gltf.scene);
          scene.add(vrm.scene);

          // モデルの位置と向きを調整
          vrm.scene.position.y = -0.5;
          vrm.scene.rotation.y = Math.PI; // 180度回転して正面を向かせる

          console.log("VRMモデルが正常にロードされました");

          // VRMを一度更新してから腕の位置を設定（T-pose防止）
          vrm.update(0);

          // 腕の位置設定関数
          const setArmPosition = () => {
            if (!vrm.humanoid) return;

            const leftShoulder =
              vrm.humanoid.getNormalizedBoneNode("leftShoulder");
            const rightShoulder =
              vrm.humanoid.getNormalizedBoneNode("rightShoulder");
            const leftUpperArm =
              vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
            const rightUpperArm =
              vrm.humanoid.getNormalizedBoneNode("rightUpperArm");
            const leftLowerArm =
              vrm.humanoid.getNormalizedBoneNode("leftLowerArm");
            const rightLowerArm =
              vrm.humanoid.getNormalizedBoneNode("rightLowerArm");

            if (leftShoulder) leftShoulder.rotation.z = -0.4;
            if (rightShoulder) rightShoulder.rotation.z = 0.4;
            if (leftUpperArm) {
              leftUpperArm.rotation.z = -0.8;
              leftUpperArm.rotation.x = 0.2;
            }
            if (rightUpperArm) {
              rightUpperArm.rotation.z = 0.8;
              rightUpperArm.rotation.x = 0.2;
            }
            if (leftLowerArm) leftLowerArm.rotation.z = -0.1;
            if (rightLowerArm) rightLowerArm.rotation.z = 0.1;
          };

          // 初回設定（複数回実行して確実に適用）
          setArmPosition();
          vrm.update(0);
          setArmPosition();

          // アニメーションの開始
          startBlinkingAnimation(vrm);
          startIdleAnimation(vrm);
        },
        undefined,
        (error) => {
          console.error("VRMモデルのロードに失敗しました:", error);
        }
      );

      // アニメーションループ
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);

        const deltaTime = clockRef.current.getDelta();

        if (vrmRef.current) {
          vrmRef.current.update(deltaTime);

          // VRM更新後に毎フレーム腕の位置を強制的に設定（T-pose防止）
          if (vrmRef.current.humanoid) {
            const leftUpperArm =
              vrmRef.current.humanoid.getNormalizedBoneNode("leftUpperArm");
            const rightUpperArm =
              vrmRef.current.humanoid.getNormalizedBoneNode("rightUpperArm");
            const leftShoulder =
              vrmRef.current.humanoid.getNormalizedBoneNode("leftShoulder");
            const rightShoulder =
              vrmRef.current.humanoid.getNormalizedBoneNode("rightShoulder");

            if (leftShoulder) leftShoulder.rotation.z = -0.4;
            if (rightShoulder) rightShoulder.rotation.z = 0.4;
            if (leftUpperArm) {
              leftUpperArm.rotation.z = -0.8;
              leftUpperArm.rotation.x = 0.2;
            }
            if (rightUpperArm) {
              rightUpperArm.rotation.z = 0.8;
              rightUpperArm.rotation.x = 0.2;
            }
          }
        }

        renderer.render(scene, camera);
      };
      animate();

      // リサイズハンドラー
      handleResize = () => {
        if (!canvasRef.current || !cameraRef.current || !rendererRef.current)
          return;

        // parentElementのサイズを基準にする
        const parent = canvasRef.current.parentElement;
        const width =
          parent?.clientWidth ||
          canvasRef.current.clientWidth ||
          window.innerWidth;
        const height =
          parent?.clientHeight ||
          canvasRef.current.clientHeight ||
          window.innerHeight;

        // サイズが不正確な場合はスキップ
        if (width === 0 || height === 0) {
          console.log("サイズが0のためスキップ");
          return;
        }

        console.log("リサイズ:", width, height);

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();

        rendererRef.current.setSize(width, height);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
      };

      // ResizeObserverでcanvasのサイズ変更を監視（より確実）
      if (
        typeof ResizeObserver !== "undefined" &&
        canvasRef.current.parentElement
      ) {
        resizeObserverRef.current = new ResizeObserver(() => {
          handleResize();
        });
        resizeObserverRef.current.observe(canvasRef.current.parentElement);
      }

      window.addEventListener("resize", handleResize);

      // 初回リサイズハンドラーを複数回呼び出して確実にサイズを設定
      resizeTimers.push(setTimeout(() => handleResize(), 100));
      resizeTimers.push(setTimeout(() => handleResize(), 300));
      resizeTimers.push(setTimeout(() => handleResize(), 500));
      resizeTimers.push(setTimeout(() => handleResize(), 1000)); // モバイル用に1秒後も追加
    };

    // 少し遅延させて初期化（DOMが確実にレンダリングされるのを待つ）
    // モバイルの場合はさらに長く待機
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const delay = isMobile ? 200 : 50;

    const initTimer = setTimeout(() => {
      initializeScene();
    }, delay);

    // クリーンアップ
    return () => {
      clearTimeout(initTimer);

      // リサイズタイマーをクリア
      resizeTimers.forEach((timer) => clearTimeout(timer));

      // ResizeObserverを削除
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      // リサイズイベントリスナーを削除
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [vrmPath]);

  // スピーキングアニメーションの制御
  useEffect(() => {
    if (!vrmRef.current) return;

    if (isSpeaking) {
      startSpeakingAnimation(vrmRef.current);
    } else {
      stopSpeakingAnimation(vrmRef.current);
    }
  }, [isSpeaking]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
