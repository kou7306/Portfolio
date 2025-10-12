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

  useEffect(() => {
    if (!canvasRef.current) return;

    // シーン、カメラ、レンダラーの初期化
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      35.0,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
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
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
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
    const handleResize = () => {
      if (!canvasRef.current) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);

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
