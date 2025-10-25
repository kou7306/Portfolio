// VRoidモデルのアニメーション関数

let speakingInterval = null;
let blinkingInterval = null;
let idleInterval = null;

/**
 * スピーキングアニメーションを開始
 * @param {VRM} vrm - VRMモデル
 */
export function startSpeakingAnimation(vrm) {
  if (!vrm || !vrm.expressionManager) return;

  stopSpeakingAnimation(vrm);

  let isOpen = true;

  speakingInterval = setInterval(() => {
    if (isOpen) {
      vrm.expressionManager.setValue("aa", 0.6);
      vrm.expressionManager.setValue("oh", 0.3);
    } else {
      vrm.expressionManager.setValue("aa", 0.0);
      vrm.expressionManager.setValue("oh", 0.0);
    }
    isOpen = !isOpen;
  }, 200);
}

/**
 * スピーキングアニメーションを停止
 * @param {VRM} vrm - VRMモデル
 */
export function stopSpeakingAnimation(vrm) {
  if (speakingInterval) {
    clearInterval(speakingInterval);
    speakingInterval = null;
  }

  if (vrm && vrm.expressionManager) {
    vrm.expressionManager.setValue("aa", 0.0);
    vrm.expressionManager.setValue("oh", 0.0);
  }
}

/**
 * 瞬きアニメーションを開始
 * @param {VRM} vrm - VRMモデル
 */
export function startBlinkingAnimation(vrm) {
  if (!vrm || !vrm.expressionManager) {
    return;
  }

  const blink = () => {
    try {
      // 目を閉じる
      vrm.expressionManager.setValue("blink", 1.0);

      setTimeout(() => {
        // 目を開ける
        vrm.expressionManager.setValue("blink", 0.0);
      }, 100);
    } catch (error) {
      console.error("Error in blink animation:", error);
    }
  };

  // 初回の瞬き
  blink();

  // ランダムな間隔で瞬き（2〜5秒）
  const scheduleNextBlink = () => {
    const nextBlinkTime = 2000 + Math.random() * 3000;
    blinkingInterval = setTimeout(() => {
      blink();
      scheduleNextBlink();
    }, nextBlinkTime);
  };

  scheduleNextBlink();
}

/**
 * 瞬きアニメーションを停止
 */
export function stopBlinkingAnimation() {
  if (blinkingInterval) {
    clearTimeout(blinkingInterval);
    blinkingInterval = null;
  }
}

/**
 * アイドルアニメーション（小さな動き）を開始
 * @param {VRM} vrm - VRMモデル
 */
export function startIdleAnimation(vrm) {
  if (!vrm || !vrm.humanoid) {
    return;
  }

  let time = 0;

  const animate = () => {
    time += 0.01;

    try {
      // 頭を少し動かす
      const head = vrm.humanoid.getNormalizedBoneNode("head");
      if (head) {
        head.rotation.y = Math.sin(time * 0.5) * 0.1;
        head.rotation.x = Math.sin(time * 0.3) * 0.05;
      }

      // 首を少し動かす
      const neck = vrm.humanoid.getNormalizedBoneNode("neck");
      if (neck) {
        neck.rotation.y = Math.sin(time * 0.4) * 0.05;
      }

      // 体を少し動かす
      const spine = vrm.humanoid.getNormalizedBoneNode("spine");
      if (spine) {
        spine.rotation.y = Math.sin(time * 0.4) * 0.05;
        spine.rotation.x = Math.sin(time * 0.2) * 0.02;
      }

      // 肩と腕を確実に下げた状態で小さく動かす
      const leftShoulder = vrm.humanoid.getNormalizedBoneNode("leftShoulder");
      const rightShoulder = vrm.humanoid.getNormalizedBoneNode("rightShoulder");
      const leftUpperArm = vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
      const rightUpperArm = vrm.humanoid.getNormalizedBoneNode("rightUpperArm");
      const leftLowerArm = vrm.humanoid.getNormalizedBoneNode("leftLowerArm");
      const rightLowerArm = vrm.humanoid.getNormalizedBoneNode("rightLowerArm");

      // 毎フレーム確実に腕の位置を設定
      if (leftShoulder) {
        leftShoulder.rotation.z = Math.sin(time * 0.3) * 0.02 - 0.4;
      }
      if (rightShoulder) {
        rightShoulder.rotation.z = Math.sin(time * 0.3) * 0.02 + 0.4;
      }
      if (leftUpperArm) {
        leftUpperArm.rotation.z = Math.sin(time * 0.3) * 0.03 - 0.8;
        leftUpperArm.rotation.x = Math.sin(time * 0.5) * 0.02 + 0.2;
      }
      if (rightUpperArm) {
        rightUpperArm.rotation.z = Math.sin(time * 0.3) * 0.03 + 0.8;
        rightUpperArm.rotation.x = Math.sin(time * 0.5) * 0.02 + 0.2;
      }
      if (leftLowerArm) {
        leftLowerArm.rotation.z = -0.1;
      }
      if (rightLowerArm) {
        rightLowerArm.rotation.z = 0.1;
      }
    } catch (error) {
      console.error("Error in idle animation:", error);
    }

    idleInterval = requestAnimationFrame(animate);
  };

  animate();
}

/**
 * アイドルアニメーションを停止
 */
export function stopIdleAnimation() {
  if (idleInterval) {
    cancelAnimationFrame(idleInterval);
    idleInterval = null;
  }
}

/**
 * 表情を設定
 * @param {VRM} vrm - VRMモデル
 * @param {string} expression - 表情名（happy, sad, angry, surprised など）
 * @param {number} value - 表情の強度（0.0〜1.0）
 */
export function setExpression(vrm, expression, value = 1.0) {
  if (!vrm || !vrm.expressionManager) return;

  // すべての表情をリセット
  const presetNames = vrm.expressionManager.expressionMap;
  Object.keys(presetNames).forEach((key) => {
    vrm.expressionManager.setValue(key, 0.0);
  });

  // 指定された表情を設定
  vrm.expressionManager.setValue(expression, value);
}
