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

interface VRoidViewerProps {
  vrmPath?: string;
  isSpeaking?: boolean;
}

export default function VRoidViewer({
  vrmPath = "/models/character.vrm",
  isSpeaking = false,
}: VRoidViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vrmRef = useRef<VRM | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let handleResize: (() => void) | undefined;
    const resizeTimers: ReturnType<typeof setTimeout>[] = [];

    const initializeScene = () => {
      if (!canvasRef.current) return;

      const parent = canvasRef.current.parentElement;
      const width = parent?.clientWidth || canvasRef.current.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || canvasRef.current.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(35.0, width / height, 0.1, 20.0);
      camera.position.set(0.0, 1.0, -2.5);
      camera.lookAt(0.0, 0.8, 0.0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      rendererRef.current = renderer;

      const light = new THREE.DirectionalLight(0xffffff, Math.PI);
      light.position.set(1.0, 1.0, 1.0).normalize();
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const loader = new GLTFLoader();
      loader.register((parser) => new VRMLoaderPlugin(parser));

      loader.load(
        vrmPath,
        (gltf) => {
          const vrm = gltf.userData.vrm as VRM;
          vrmRef.current = vrm;

          VRMUtils.removeUnnecessaryVertices(gltf.scene);
          VRMUtils.removeUnnecessaryJoints(gltf.scene);
          scene.add(vrm.scene);

          vrm.scene.position.y = -0.5;
          vrm.scene.rotation.y = Math.PI;

          vrm.update(0);

          const setArmPosition = () => {
            if (!vrm.humanoid) return;

            const leftShoulder = vrm.humanoid.getNormalizedBoneNode("leftShoulder");
            const rightShoulder = vrm.humanoid.getNormalizedBoneNode("rightShoulder");
            const leftUpperArm = vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
            const rightUpperArm = vrm.humanoid.getNormalizedBoneNode("rightUpperArm");
            const leftLowerArm = vrm.humanoid.getNormalizedBoneNode("leftLowerArm");
            const rightLowerArm = vrm.humanoid.getNormalizedBoneNode("rightLowerArm");

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

          setArmPosition();
          vrm.update(0);
          setArmPosition();

          startBlinkingAnimation(vrm);
          startIdleAnimation(vrm);
        },
        undefined,
        (error) => {
          console.error("VRMモデルのロードに失敗しました:", error);
        }
      );

      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);

        const deltaTime = clockRef.current.getDelta();

        if (vrmRef.current) {
          vrmRef.current.update(deltaTime);

          if (vrmRef.current.humanoid) {
            const leftUpperArm = vrmRef.current.humanoid.getNormalizedBoneNode("leftUpperArm");
            const rightUpperArm = vrmRef.current.humanoid.getNormalizedBoneNode("rightUpperArm");
            const leftShoulder = vrmRef.current.humanoid.getNormalizedBoneNode("leftShoulder");
            const rightShoulder = vrmRef.current.humanoid.getNormalizedBoneNode("rightShoulder");

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

      handleResize = () => {
        if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return;

        const parent = canvasRef.current.parentElement;
        const w = parent?.clientWidth || canvasRef.current.clientWidth || window.innerWidth;
        const h = parent?.clientHeight || canvasRef.current.clientHeight || window.innerHeight;

        if (w === 0 || h === 0) return;

        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
      };

      if (typeof ResizeObserver !== "undefined" && canvasRef.current?.parentElement) {
        resizeObserverRef.current = new ResizeObserver(() => {
          handleResize?.();
        });
        resizeObserverRef.current.observe(canvasRef.current.parentElement);
      }

      window.addEventListener("resize", handleResize);

      resizeTimers.push(setTimeout(() => handleResize?.(), 100));
      resizeTimers.push(setTimeout(() => handleResize?.(), 300));
      resizeTimers.push(setTimeout(() => handleResize?.(), 500));
      resizeTimers.push(setTimeout(() => handleResize?.(), 1000));
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const delay = isMobile ? 200 : 50;

    const initTimer = setTimeout(() => {
      initializeScene();
    }, delay);

    return () => {
      clearTimeout(initTimer);
      resizeTimers.forEach((timer) => clearTimeout(timer));

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

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
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        });
      }
    };
  }, [vrmPath]);

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
