import type { VRM } from "@pixiv/three-vrm";

let speakingInterval: ReturnType<typeof setInterval> | null = null;
let blinkingInterval: ReturnType<typeof setTimeout> | null = null;
let idleInterval: number | null = null;

export function startSpeakingAnimation(vrm: VRM) {
  if (!vrm?.expressionManager) return;

  stopSpeakingAnimation(vrm);

  let isOpen = true;

  speakingInterval = setInterval(() => {
    if (isOpen) {
      vrm.expressionManager!.setValue("aa", 0.6);
      vrm.expressionManager!.setValue("oh", 0.3);
    } else {
      vrm.expressionManager!.setValue("aa", 0.0);
      vrm.expressionManager!.setValue("oh", 0.0);
    }
    isOpen = !isOpen;
  }, 200);
}

export function stopSpeakingAnimation(vrm: VRM) {
  if (speakingInterval) {
    clearInterval(speakingInterval);
    speakingInterval = null;
  }

  if (vrm?.expressionManager) {
    vrm.expressionManager.setValue("aa", 0.0);
    vrm.expressionManager.setValue("oh", 0.0);
  }
}

export function startBlinkingAnimation(vrm: VRM) {
  if (!vrm?.expressionManager) return;

  const blink = () => {
    try {
      vrm.expressionManager!.setValue("blink", 1.0);

      setTimeout(() => {
        vrm.expressionManager!.setValue("blink", 0.0);
      }, 100);
    } catch (error) {
      console.error("Error in blink animation:", error);
    }
  };

  blink();

  const scheduleNextBlink = () => {
    const nextBlinkTime = 2000 + Math.random() * 3000;
    blinkingInterval = setTimeout(() => {
      blink();
      scheduleNextBlink();
    }, nextBlinkTime);
  };

  scheduleNextBlink();
}

export function stopBlinkingAnimation() {
  if (blinkingInterval) {
    clearTimeout(blinkingInterval);
    blinkingInterval = null;
  }
}

export function startIdleAnimation(vrm: VRM) {
  if (!vrm?.humanoid) return;

  let time = 0;

  const animate = () => {
    time += 0.01;

    try {
      const head = vrm.humanoid!.getNormalizedBoneNode("head");
      if (head) {
        head.rotation.y = Math.sin(time * 0.5) * 0.1;
        head.rotation.x = Math.sin(time * 0.3) * 0.05;
      }

      const neck = vrm.humanoid!.getNormalizedBoneNode("neck");
      if (neck) {
        neck.rotation.y = Math.sin(time * 0.4) * 0.05;
      }

      const spine = vrm.humanoid!.getNormalizedBoneNode("spine");
      if (spine) {
        spine.rotation.y = Math.sin(time * 0.4) * 0.05;
        spine.rotation.x = Math.sin(time * 0.2) * 0.02;
      }

      const leftShoulder = vrm.humanoid!.getNormalizedBoneNode("leftShoulder");
      const rightShoulder = vrm.humanoid!.getNormalizedBoneNode("rightShoulder");
      const leftUpperArm = vrm.humanoid!.getNormalizedBoneNode("leftUpperArm");
      const rightUpperArm = vrm.humanoid!.getNormalizedBoneNode("rightUpperArm");
      const leftLowerArm = vrm.humanoid!.getNormalizedBoneNode("leftLowerArm");
      const rightLowerArm = vrm.humanoid!.getNormalizedBoneNode("rightLowerArm");

      if (leftShoulder) leftShoulder.rotation.z = Math.sin(time * 0.3) * 0.02 - 0.4;
      if (rightShoulder) rightShoulder.rotation.z = Math.sin(time * 0.3) * 0.02 + 0.4;
      if (leftUpperArm) {
        leftUpperArm.rotation.z = Math.sin(time * 0.3) * 0.03 - 0.8;
        leftUpperArm.rotation.x = Math.sin(time * 0.5) * 0.02 + 0.2;
      }
      if (rightUpperArm) {
        rightUpperArm.rotation.z = Math.sin(time * 0.3) * 0.03 + 0.8;
        rightUpperArm.rotation.x = Math.sin(time * 0.5) * 0.02 + 0.2;
      }
      if (leftLowerArm) leftLowerArm.rotation.z = -0.1;
      if (rightLowerArm) rightLowerArm.rotation.z = 0.1;
    } catch (error) {
      console.error("Error in idle animation:", error);
    }

    idleInterval = requestAnimationFrame(animate);
  };

  animate();
}

export function stopIdleAnimation() {
  if (idleInterval) {
    cancelAnimationFrame(idleInterval);
    idleInterval = null;
  }
}

export function setExpression(vrm: VRM, expression: string, value: number = 1.0) {
  if (!vrm?.expressionManager) return;

  const presetNames = vrm.expressionManager.expressionMap;
  Object.keys(presetNames).forEach((key) => {
    vrm.expressionManager!.setValue(key, 0.0);
  });

  vrm.expressionManager.setValue(expression, value);
}
