/**
 * わくわくスタディパーク - メインスクリプト (app.js)
 * 3Dマスコット、Kahootゲーム、自習クイズ、A4プリント印刷、先生モード、AIロボまる
 */

// ==========================================================================
// 0. 共通ユーティリティ: 問題シャッフル & 正解位置ランダム化
// ==========================================================================
function prepareQuestion(originalQ) {
  if (!originalQ || !originalQ.options || originalQ.options.length === 0) {
    return originalQ;
  }
  const originalAnswerIndex = (originalQ.answerIndex !== undefined) ? originalQ.answerIndex : 0;
  const correctText = originalQ.options[originalAnswerIndex] || originalQ.options[0];

  // 選択肢のシャッフル (Fisher-Yates)
  const shuffledOptions = [...originalQ.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }

  const newAnswerIndex = shuffledOptions.indexOf(correctText);

  return {
    ...originalQ,
    options: shuffledOptions,
    answerIndex: (newAnswerIndex >= 0) ? newAnswerIndex : 0,
    printAnswer: correctText
  };
}

// ==========================================================================
// 1. Web Audio API 効果音シンセサイザー (SoundFX)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.25, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [311.13, 293.66]; // Eb4, D4
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(0.2, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.14 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.22);
    });
  }

  playComplete() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const fan = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.50, d: 0.4 }
    ];
    let offset = 0;
    fan.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(item.f, now + offset);
      gain.gain.setValueAtTime(0.22, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + item.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + item.d + 0.05);
      offset += item.d * 0.9;
    });
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  playHurryTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  playStreak() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playAiBeep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const beeps = [900, 1200, 1600];
    beeps.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.08);
    });
  }
}

// ==========================================================================
// 2. Three.js 3D マスコットキャラクター「AIロボまる」＆ステージ演出
// ==========================================================================
class MascotStage {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.robotGroup = null;
    this.headGroup = null;
    this.leftHand = null;
    this.rightHand = null;
    this.visor = null;
    this.antBall = null;
    this.screenMesh = null;
    this.particles = null;
    this.subjectProp = null;
    this.currentEmotion = 'idle'; // 'idle', 'happy', 'sad', 'thinking', 'hint'
    this.jumpProgress = 0;
    this.isJumping = false;
    this.targetRotation = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    
    this.init();
  }

  init() {
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight || 320;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 1.2, 4.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ライティング
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 6, 4);
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 0.6, 10);
    pointLight.position.set(-2, 2, 2);
    this.scene.add(pointLight);

    this.buildRobot();
    this.buildParticles();
    this.setSubjectDecorations('japanese');

    // マウス追従
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('resize', () => this.onResize());

    // キャンバスクリックでロボまるがジャンプして反応
    this.canvas.addEventListener('click', () => this.onClickRobot());

    this.animate();
  }

  buildRobot() {
    this.robotGroup = new THREE.Group();

    // マテリアル
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // スタイリッシュなブルー
      roughness: 0.3,
      metalness: 0.2
    });
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.2,
      metalness: 0.6
    });

    // 胴体 (丸っこいカプセル風)
    const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.8, 32);
    const body = new THREE.Mesh(bodyGeo, whiteMat);
    body.position.y = 0.5;
    this.robotGroup.add(body);

    // お腹のAIスクリーン
    const screenGeo = new THREE.PlaneGeometry(0.52, 0.42);
    this.screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    this.screenMesh = new THREE.Mesh(screenGeo, this.screenMat);
    this.screenMesh.position.set(0, 0.52, 0.61);
    this.robotGroup.add(this.screenMesh);

    // 頭部グループ
    this.headGroup = new THREE.Group();
    this.headGroup.position.y = 1.3;

    // 頭の球体
    const headGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const head = new THREE.Mesh(headGeo, bodyMat);
    this.headGroup.add(head);

    // 黒いバイザーフェイス
    const visorGeo = new THREE.SphereGeometry(0.62, 32, 16, 0, Math.PI, 0, Math.PI / 2.2);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.8
    });
    this.visor = new THREE.Mesh(visorGeo, visorMat);
    this.visor.rotation.x = -Math.PI / 2 + 0.3;
    this.visor.position.set(0, 0.05, 0.2);
    this.headGroup.add(this.visor);

    // 目 (発光するシアンの球)
    const eyeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    this.eyeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    this.leftEye = new THREE.Mesh(eyeGeo, this.eyeMat);
    this.leftEye.rotation.x = Math.PI / 2;
    this.leftEye.position.set(-0.24, 0.06, 0.67);
    this.headGroup.add(this.leftEye);

    this.rightEye = new THREE.Mesh(eyeGeo, this.eyeMat);
    this.rightEye.rotation.x = Math.PI / 2;
    this.rightEye.position.set(0.24, 0.06, 0.67);
    this.headGroup.add(this.rightEye);

    // 頭の上のAIアンテナ
    const antPoleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 12);
    const antPole = new THREE.Mesh(antPoleGeo, darkMat);
    antPole.position.y = 0.8;
    this.headGroup.add(antPole);

    const antBallGeo = new THREE.SphereGeometry(0.13, 16, 16);
    this.antMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.2,
      metalness: 0.6,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.2
    });
    this.antBall = new THREE.Mesh(antBallGeo, this.antMat);
    this.antBall.position.y = 1.0;
    this.headGroup.add(this.antBall);

    // 耳のヘッドフォンパーツ
    const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.1, 16);
    const leftEar = new THREE.Mesh(earGeo, goldMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.72, 0, 0);
    this.headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, goldMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.72, 0, 0);
    this.headGroup.add(rightEar);

    this.robotGroup.add(this.headGroup);

    // 両手 (球体)
    const handGeo = new THREE.SphereGeometry(0.18, 16, 16);
    this.leftHand = new THREE.Mesh(handGeo, whiteMat);
    this.leftHand.position.set(-0.85, 0.45, 0.2);
    this.robotGroup.add(this.leftHand);

    this.rightHand = new THREE.Mesh(handGeo, whiteMat);
    this.rightHand.position.set(0.85, 0.45, 0.2);
    this.robotGroup.add(this.rightHand);

    // 浮遊台座エフェクト（リング）
    const ringGeo = new THREE.RingGeometry(0.4, 0.65, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    this.hoverRing = new THREE.Mesh(ringGeo, ringMat);
    this.hoverRing.rotation.x = Math.PI / 2;
    this.hoverRing.position.y = -0.15;
    this.robotGroup.add(this.hoverRing);

    this.scene.add(this.robotGroup);
  }

  buildParticles() {
    const pCount = 35;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = Math.random() * 3.5;
      positions[i + 2] = (Math.random() - 0.5) * 3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  setSubjectDecorations(subject) {
    if (this.subjectProp) {
      this.scene.remove(this.subjectProp);
      this.subjectProp = null;
    }

    let geometry, material;
    switch (subject) {
      case 'japanese':
        geometry = new THREE.BoxGeometry(0.35, 0.45, 0.08);
        material = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        break;
      case 'math':
        geometry = new THREE.ConeGeometry(0.25, 0.5, 4);
        material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
        break;
      case 'science':
        geometry = new THREE.SphereGeometry(0.22, 16, 16);
        material = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.1 });
        break;
      case 'social':
        geometry = new THREE.DodecahedronGeometry(0.22);
        material = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
        break;
      case 'english':
        geometry = new THREE.TorusGeometry(0.18, 0.06, 16, 32);
        material = new THREE.MeshStandardMaterial({ color: 0x8b5cf6 });
        break;
      default:
        return;
    }

    this.subjectProp = new THREE.Mesh(geometry, material);
    this.subjectProp.position.set(0.9, 1.4, 0.4);
    this.scene.add(this.subjectProp);
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.targetRotation.x = y * 0.25;
    this.targetRotation.y = x * 0.45;
  }

  onResize() {
    if (!this.canvas.parentElement) return;
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight || 320;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  celebrate() {
    this.currentEmotion = 'happy';
    this.isJumping = true;
    this.jumpProgress = 0;
    this.eyeMat.color.setHex(0xf59e0b); // 目がキラキラゴールド
    this.screenMat.color.setHex(0x10b981); // お腹がグリーン

    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 }
      });
    }

    setTimeout(() => {
      this.currentEmotion = 'idle';
      this.eyeMat.color.setHex(0x38bdf8);
      this.screenMat.color.setHex(0x38bdf8);
    }, 2200);
  }

  oops() {
    this.currentEmotion = 'sad';
    this.eyeMat.color.setHex(0xef4444); // 目がレッド
    this.screenMat.color.setHex(0xef4444);
    setTimeout(() => {
      this.currentEmotion = 'idle';
      this.eyeMat.color.setHex(0x38bdf8);
      this.screenMat.color.setHex(0x38bdf8);
    }, 1800);
  }

  // AI思考中アクション
  think() {
    this.currentEmotion = 'thinking';
    this.eyeMat.color.setHex(0xa855f7); // パープル発光
    this.screenMat.color.setHex(0xa855f7);
    this.antMat.emissive.setHex(0xfbbf24);
    this.antMat.emissiveIntensity = 1.0; // アンテナが激しく光る

    setTimeout(() => {
      if (this.currentEmotion === 'thinking') {
        this.currentEmotion = 'idle';
        this.eyeMat.color.setHex(0x38bdf8);
        this.screenMat.color.setHex(0x38bdf8);
        this.antMat.emissive.setHex(0xf59e0b);
        this.antMat.emissiveIntensity = 0.2;
      }
    }, 2000);
  }

  // ヒント提示アクション
  giveHint() {
    this.currentEmotion = 'hint';
    this.eyeMat.color.setHex(0xf59e0b); // ゴールド
    this.screenMat.color.setHex(0x38bdf8);

    // 右手を上げて指差すポーズ
    if (this.rightHand) {
      this.rightHand.position.set(0.6, 1.2, 0.5);
    }

    setTimeout(() => {
      this.currentEmotion = 'idle';
      this.eyeMat.color.setHex(0x38bdf8);
      if (this.rightHand) {
        this.rightHand.position.set(0.85, 0.45, 0.2);
      }
    }, 2500);
  }

  onClickRobot() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.jumpProgress = 0;
    if (window.app) {
      window.app.soundFX.playClick();
      window.app.setSpeechBubble('ボクはAIロボまる！なんでも相談してね！✨');
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // 浮遊アニメーション
    if (this.robotGroup) {
      const hoverY = Math.sin(elapsed * 2.2) * 0.08;
      
      if (this.isJumping) {
        this.jumpProgress += delta * 3.2;
        const jumpH = Math.sin(this.jumpProgress * Math.PI) * 0.8;
        this.robotGroup.position.y = hoverY + Math.max(0, jumpH);
        this.robotGroup.rotation.y += delta * 6; // スピン
        
        if (this.leftHand && this.rightHand) {
          this.leftHand.position.y = 1.1 + Math.sin(elapsed * 10) * 0.1;
          this.rightHand.position.y = 1.1 + Math.sin(elapsed * 10) * 0.1;
        }

        if (this.jumpProgress >= 1) {
          this.isJumping = false;
          this.robotGroup.rotation.y = 0;
        }
      } else if (this.currentEmotion === 'sad') {
        // しょんぼり左右に首を振る
        this.robotGroup.position.y = hoverY - 0.15;
        this.headGroup.rotation.z = Math.sin(elapsed * 6) * 0.18;
        this.headGroup.rotation.x = 0.25;
        if (this.leftHand && this.rightHand) {
          this.leftHand.position.y = 0.2;
          this.rightHand.position.y = 0.2;
        }
      } else if (this.currentEmotion === 'thinking') {
        // 首をかしげてピクピク思考中
        this.robotGroup.position.y = hoverY;
        this.headGroup.rotation.z = Math.sin(elapsed * 8) * 0.15;
        this.headGroup.rotation.x = 0.1;
        if (this.antBall) {
          this.antMat.emissiveIntensity = 0.5 + Math.sin(elapsed * 15) * 0.5;
        }
      } else {
        // アイドル浮遊
        this.robotGroup.position.y = hoverY;
        this.headGroup.rotation.x += (this.targetRotation.x - this.headGroup.rotation.x) * 0.08;
        this.headGroup.rotation.y += (this.targetRotation.y - this.headGroup.rotation.y) * 0.08;
        this.headGroup.rotation.z = Math.sin(elapsed * 1.5) * 0.04;

        if (this.leftHand && this.rightHand && this.currentEmotion !== 'hint') {
          this.leftHand.position.y = 0.45 + Math.sin(elapsed * 2.5) * 0.05;
          this.rightHand.position.y = 0.45 - Math.sin(elapsed * 2.5) * 0.05;
        }
      }

      if (this.hoverRing) {
        this.hoverRing.rotation.z = elapsed * 1.2;
      }
    }

    // パーティクル
    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.06;
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.003;
        if (positions[i] > 3.5) positions[i] = -0.5;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // 科目アイテムの自転
    if (this.subjectProp) {
      this.subjectProp.rotation.y = elapsed * 0.8;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ==========================================================================
// 3. Kahoot! スタイル バトルゲームシステム (KahootBattleGame)
// ==========================================================================
class KahootBattleGame {
  constructor(studyApp) {
    this.app = studyApp;
    this.soundFX = studyApp.soundFX;
    this.mascot = null;

    this.questions = [];
    this.currentIndex = 0;
    this.playerScore = 0;
    this.playerStreak = 0;
    this.playerName = 'チャレンジャー';
    this.playerPrevRank = 1;

    // タイマー関連
    this.timerInterval = null;
    this.totalTime = 15;
    this.remainTime = 15;
    this.answered = false;

    // AIライバル4名
    this.rivals = [
      { name: 'うさぎちゃん', avatar: '🐰', score: 0, speedFactor: 0.85, accuracy: 0.90, prevRank: 2 },
      { name: 'くまごろう', avatar: '🐻', score: 0, speedFactor: 0.65, accuracy: 0.80, prevRank: 3 },
      { name: 'きつねまる', avatar: '🦊', score: 0, speedFactor: 0.75, accuracy: 0.85, prevRank: 4 },
      { name: 'みけねこ', avatar: '🐱', score: 0, speedFactor: 0.60, accuracy: 0.70, prevRank: 5 }
    ];

    this.initDOM();
  }

  setMascot(mascot) {
    this.mascot = mascot;
  }

  initDOM() {
    this.lobbyPanel = document.getElementById('game-lobby-panel');
    this.arenaPanel = document.getElementById('game-arena-panel');
    this.leaderboardPanel = document.getElementById('game-leaderboard-panel');
    this.podiumPanel = document.getElementById('game-podium-panel');

    this.btnStartGame = document.getElementById('btn-start-game');
    this.btnRoundNext = document.getElementById('btn-round-next');
    this.btnLbNext = document.getElementById('btn-lb-next');
    this.btnReplay = document.getElementById('btn-replay-game');
    this.btnBackStudy = document.getElementById('btn-back-study');
    this.inputNickname = document.getElementById('input-nickname');

    if (this.btnStartGame) {
      this.btnStartGame.addEventListener('click', () => {
        this.soundFX.playClick();
        this.startNewGame();
      });
    }

    if (this.btnRoundNext) {
      this.btnRoundNext.addEventListener('click', () => {
        this.soundFX.playClick();
        this.showLeaderboard();
      });
    }

    if (this.btnLbNext) {
      this.btnLbNext.addEventListener('click', () => {
        this.soundFX.playClick();
        this.advanceFromLeaderboard();
      });
    }

    if (this.btnReplay) {
      this.btnReplay.addEventListener('click', () => {
        this.soundFX.playClick();
        this.startNewGame();
      });
    }

    if (this.btnBackStudy) {
      this.btnBackStudy.addEventListener('click', () => {
        this.soundFX.playClick();
        this.app.switchMode('digital');
      });
    }

    // 4色ボタン
    this.kahootButtons = document.querySelectorAll('.kahoot-btn');
    this.kahootButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.handlePlayerAnswer(idx);
      });
    });
  }

  showLobby() {
    this.stopTimer();
    if (this.arenaPanel) this.arenaPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'none';
    if (this.lobbyPanel) this.lobbyPanel.style.display = 'block';
  }

  onConfigChanged() {
    if (this.arenaPanel && this.arenaPanel.style.display === 'flex') {
      this.showLobby();
    }
  }

  startNewGame() {
    const rawName = this.inputNickname ? this.inputNickname.value.trim() : '';
    this.playerName = rawName || 'チャレンジャー';

    // 該当学年・科目の問題を統合取得（先生自作問題＋ビルトイン）
    const rawList = this.app.getQuestionsForCurrentConfig(10);
    
    // シャッフルして5問を選び、かつ各問題の選択肢をシャッフル（正解位置ランダム化）
    this.questions = [...rawList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(q => prepareQuestion(q));

    this.currentIndex = 0;
    this.playerScore = 0;
    this.playerStreak = 0;
    this.playerPrevRank = 1;

    // ライバルスコアリセット
    this.rivals.forEach((r, idx) => {
      r.score = 0;
      r.prevRank = idx + 2;
    });

    if (this.lobbyPanel) this.lobbyPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'none';
    if (this.arenaPanel) this.arenaPanel.style.display = 'flex';

    this.startQuestion();
  }

  startQuestion() {
    this.answered = false;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    const total = this.questions.length;

    if (this.lobbyPanel) this.lobbyPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'none';
    if (this.arenaPanel) this.arenaPanel.style.display = 'flex';
    const overlay = document.getElementById('round-overlay');
    if (overlay) overlay.classList.remove('show');

    // ヘッダー情報
    const qNumEl = document.getElementById('arena-q-num');
    if (qNumEl) qNumEl.textContent = `第 ${this.currentIndex + 1} / ${total} 問`;

    const scoreEl = document.getElementById('arena-score');
    if (scoreEl) scoreEl.textContent = `${this.playerScore.toLocaleString()} pts`;

    // ストリーク
    const streakEl = document.getElementById('arena-streak');
    if (streakEl) {
      if (this.playerStreak >= 2) {
        streakEl.style.display = 'inline-flex';
        streakEl.textContent = `🔥 STREAK x${this.playerStreak}`;
      } else {
        streakEl.style.display = 'none';
      }
    }

    // 問題文
    const qTextEl = document.getElementById('arena-question-text');
    if (qTextEl) qTextEl.textContent = q.question;

    // 4色ボタンテキストリセット
    if (q && q.options) {
      q.options.forEach((opt, idx) => {
        const textEl = document.getElementById(`k-opt-${idx}`);
        if (textEl) textEl.textContent = opt;
      });
    }

    this.kahootButtons.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove('dimmed', 'correct-highlight');
    });

    this.app.setSpeechBubble('いそげ！ すばやく答えてね！⏱️');

    // タイマースタート
    this.remainTime = this.totalTime;
    this.updateTimerDisplay();

    let lastSec = Math.ceil(this.remainTime);

    this.timerInterval = setInterval(() => {
      this.remainTime -= 0.1;
      if (this.remainTime <= 0) {
        this.remainTime = 0;
        this.updateTimerDisplay();
        this.stopTimer();
        this.handleTimeUp();
        return;
      }

      this.updateTimerDisplay();

      const currentSec = Math.ceil(this.remainTime);
      if (currentSec !== lastSec) {
        lastSec = currentSec;
        if (currentSec <= 5) {
          this.soundFX.playHurryTick();
        } else {
          this.soundFX.playTick();
        }
      }
    }, 100);
  }

  updateTimerDisplay() {
    const pct = Math.max(0, (this.remainTime / this.totalTime) * 100);
    const fillEl = document.getElementById('game-timer-fill');
    const circleEl = document.getElementById('game-timer-circle');

    if (fillEl) {
      fillEl.style.width = `${pct}%`;
      if (this.remainTime <= 5) {
        fillEl.classList.add('danger');
      } else {
        fillEl.classList.remove('danger');
      }
    }

    if (circleEl) {
      const sec = Math.ceil(this.remainTime);
      circleEl.textContent = `${sec}`;
      if (this.remainTime <= 5) {
        circleEl.classList.add('warning');
      } else {
        circleEl.classList.remove('warning');
      }
    }
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handlePlayerAnswer(chosenIdx) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    const isCorrect = (chosenIdx === q.answerIndex);

    // ライバルたちの得点を計算
    this.simulateRivalsAnswer(q);

    // ボタンのスタイル更新
    this.kahootButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answerIndex) {
        btn.classList.add('correct-highlight');
      } else {
        btn.classList.add('dimmed');
      }
    });

    // 得点計算
    let pointsGained = 0;
    let speedBonus = 0;
    let streakBonus = 0;

    if (isCorrect) {
      this.playerStreak++;
      const basePts = 500;
      speedBonus = Math.round(500 * (this.remainTime / this.totalTime));
      streakBonus = (this.playerStreak >= 3) ? 200 : (this.playerStreak >= 2 ? 100 : 0);
      pointsGained = basePts + speedBonus + streakBonus;
      this.playerScore += pointsGained;

      this.soundFX.playCorrect();
      if (this.playerStreak >= 3) {
        setTimeout(() => this.soundFX.playStreak(), 260);
      }
      if (this.mascot) this.mascot.celebrate();
      this.app.setSpeechBubble('ナイス！ 超ハイスピード！⚡');
    } else {
      this.playerStreak = 0;
      this.soundFX.playWrong();
      if (this.mascot) this.mascot.oops();
      this.app.setSpeechBubble('あちゃ〜！ つぎで挽回だ！');
    }

    const scoreEl = document.getElementById('arena-score');
    if (scoreEl) scoreEl.textContent = `${this.playerScore.toLocaleString()} pts`;

    this.showRoundResult(isCorrect, pointsGained, speedBonus, streakBonus, q);
  }

  handleTimeUp() {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    this.simulateRivalsAnswer(q);

    this.kahootButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answerIndex) {
        btn.classList.add('correct-highlight');
      } else {
        btn.classList.add('dimmed');
      }
    });

    this.playerStreak = 0;
    this.soundFX.playWrong();
    if (this.mascot) this.mascot.oops();
    this.app.setSpeechBubble('じかんぎれ！ つぎは急いで答えよう！⏰');

    this.showRoundResult(false, 0, 0, 0, q, true);
  }

  simulateRivalsAnswer(q) {
    this.rivals.forEach((r) => {
      const isRight = Math.random() < r.accuracy;
      if (isRight) {
        const randomRemain = Math.max(1, (this.totalTime * r.speedFactor) + (Math.random() * 4 - 2));
        const clampedRemain = Math.min(this.totalTime - 0.5, randomRemain);
        const speedBonus = Math.round(500 * (clampedRemain / this.totalTime));
        r.score += (500 + speedBonus);
      }
    });
  }

  showRoundResult(isCorrect, pointsGained, speedBonus, streakBonus, q, isTimeUp = false) {
    const overlay = document.getElementById('round-overlay');
    const iconEl = document.getElementById('round-icon');
    const titleEl = document.getElementById('round-title');
    const ptsEl = document.getElementById('round-pts');
    const tagSpeed = document.getElementById('tag-speed');
    const tagStreak = document.getElementById('tag-streak');
    const explainEl = document.getElementById('round-explain');

    if (!overlay) return;

    if (isCorrect) {
      iconEl.textContent = '⭕️';
      titleEl.textContent = 'せいかい！ すごい！';
      ptsEl.textContent = `+${pointsGained.toLocaleString()} pts`;
      ptsEl.style.display = 'block';

      if (tagSpeed) tagSpeed.style.display = (speedBonus > 0) ? 'inline-flex' : 'none';
      if (tagStreak) tagStreak.style.display = (streakBonus > 0) ? 'inline-flex' : 'none';
    } else {
      iconEl.textContent = isTimeUp ? '⏰' : '❌';
      titleEl.textContent = isTimeUp ? 'タイムアップ！' : 'ざんねん！ 不正解';
      ptsEl.style.display = 'none';
      if (tagSpeed) tagSpeed.style.display = 'none';
      if (tagStreak) tagStreak.style.display = 'none';
    }

    if (explainEl) {
      explainEl.innerHTML = `正解：<b>${q.options[q.answerIndex]}</b><br>${q.explanation}`;
    }

    overlay.classList.add('show');
  }

  showLeaderboard() {
    this.stopTimer();
    if (this.arenaPanel) this.arenaPanel.style.display = 'none';
    if (this.lobbyPanel) this.lobbyPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'block';

    const participants = [
      { name: this.playerName, avatar: '👤', score: this.playerScore, isPlayer: true },
      ...this.rivals.map(r => ({ name: r.name, avatar: r.avatar, score: r.score, isPlayer: false }))
    ];

    participants.sort((a, b) => b.score - a.score);

    const listEl = document.getElementById('leaderboard-list');
    if (listEl) {
      listEl.innerHTML = '';
      participants.forEach((p, idx) => {
        const rank = idx + 1;
        const row = document.createElement('div');
        row.className = `leaderboard-item ${p.isPlayer ? 'is-player' : ''}`;
        row.innerHTML = `
          <div class="lb-rank rank-${rank}">${rank}</div>
          <div class="lb-avatar">${p.avatar}</div>
          <div class="lb-name">${p.name} ${p.isPlayer ? '<span style="font-size:0.75rem; background:#3b82f6; color:#fff; border-radius:4px; padding:1px 5px; margin-left:4px;">YOU</span>' : ''}</div>
          <div class="lb-score">${p.score.toLocaleString()} pts</div>
        `;
        listEl.appendChild(row);
      });
    }

    const isLastQ = (this.currentIndex + 1 >= this.questions.length);
    if (this.btnLbNext) {
      this.btnLbNext.textContent = isLastQ ? '🎊 表彰式（Podium）へ進む！ ➔' : 'つぎの問題へ進む ➔';
    }
  }

  advanceFromLeaderboard() {
    if (this.currentIndex + 1 < this.questions.length) {
      this.currentIndex++;
      this.startQuestion();
    } else {
      this.showPodium();
    }
  }

  showPodium() {
    this.stopTimer();
    if (this.arenaPanel) this.arenaPanel.style.display = 'none';
    if (this.lobbyPanel) this.lobbyPanel.style.display = 'none';
    if (this.leaderboardPanel) this.leaderboardPanel.style.display = 'none';
    if (this.podiumPanel) this.podiumPanel.style.display = 'block';

    const participants = [
      { name: this.playerName, avatar: '👤', score: this.playerScore, isPlayer: true },
      ...this.rivals.map(r => ({ name: r.name, avatar: r.avatar, score: r.score, isPlayer: false }))
    ];
    participants.sort((a, b) => b.score - a.score);

    const first = participants[0];
    const second = participants[1];
    const third = participants[2];

    const av1 = document.getElementById('podium-avatar-1');
    const nm1 = document.getElementById('podium-name-1');
    const sc1 = document.getElementById('podium-score-1');
    if (av1) av1.textContent = first.avatar;
    if (nm1) nm1.textContent = first.name;
    if (sc1) sc1.textContent = `${first.score.toLocaleString()} pts`;

    const av2 = document.getElementById('podium-avatar-2');
    const nm2 = document.getElementById('podium-name-2');
    const sc2 = document.getElementById('podium-score-2');
    if (av2) av2.textContent = second.avatar;
    if (nm2) nm2.textContent = second.name;
    if (sc2) sc2.textContent = `${second.score.toLocaleString()} pts`;

    const av3 = document.getElementById('podium-avatar-3');
    const nm3 = document.getElementById('podium-name-3');
    const sc3 = document.getElementById('podium-score-3');
    if (av3) av3.textContent = third.avatar;
    if (nm3) nm3.textContent = third.name;
    if (sc3) sc3.textContent = `${third.score.toLocaleString()} pts`;

    this.soundFX.playComplete();

    if (window.confetti) {
      window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }

    if (first.isPlayer) {
      if (this.mascot) this.mascot.celebrate();
      this.app.setSpeechBubble('優勝おめでとう！キミがナンバーワンだ！👑🎉');
    } else {
      this.app.setSpeechBubble('ナイスバトル！次は絶対1位になれるよ！🔥');
    }
  }
}

// ==========================================================================
// 4. アプリ統合メインコントローラー (StudyApp)
// ==========================================================================
class StudyApp {
  constructor() {
    this.currentGrade = 1;
    this.currentSubject = 'japanese';
    this.currentMode = 'digital'; // 'digital', 'game', 'print', 'teacher'

    this.soundFX = new SoundFX();
    this.mascot = null;
    this.aiGenerator = new AIGenerator();
    this.teacherManager = new TeacherManager(this);

    // クイズ状態
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    // 音声読み上げ設定
    this.voiceEnabled = true;

    // 科目名マッピング
    this.subjectNames = {
      japanese: '国語（こくご）',
      math: '算数（さんすう）',
      science: '理科（りか）',
      social: '社会（しゃかい）',
      english: '英語（えいご）'
    };

    this.initDOM();
    this.initMascot();
    this.initTeacherDOM();
    this.initAiModalsDOM();
    this.initRobotAiSupportDOM();

    this.game = new KahootBattleGame(this);
    if (this.mascot) this.game.setMascot(this.mascot);

    this.loadQuiz();
    this.updateWorksheetPreview();
  }

  // --------------------------------------------------------------------------
  // 問題取得: 先生自作問題 ＋ ビルトイン ＋ 足りない場合のAI自動補充
  // --------------------------------------------------------------------------
  getQuestionsForCurrentConfig(neededCount = 5) {
    let list = this.teacherManager.getMergedQuestions(this.currentGrade, this.currentSubject);
    
    // もし指定数未満ならAIジェネレーターで即座に動的生成して補充！
    if (list.length < neededCount) {
      const diff = neededCount - list.length;
      for (let i = 0; i < diff; i++) {
        list.push(this.aiGenerator.generateQuestion(this.currentGrade, this.currentSubject));
      }
    }
    return list;
  }

  initDOM() {
    // 学年選択
    this.gradeSelect = document.getElementById('grade-select');
    this.gradeSelect.addEventListener('change', (e) => {
      this.currentGrade = parseInt(e.target.value, 10);
      this.soundFX.playClick();
      this.onGradeChanged();
    });

    // モード切替タブ
    this.tabDigital = document.getElementById('tab-digital');
    this.tabGame = document.getElementById('tab-game');
    this.tabPrint = document.getElementById('tab-print');
    this.tabTeacher = document.getElementById('tab-teacher');

    this.digitalView = document.getElementById('digital-view');
    this.gameView = document.getElementById('game-view');
    this.printView = document.getElementById('print-view');
    this.teacherView = document.getElementById('teacher-view');

    if (this.tabDigital) this.tabDigital.addEventListener('click', () => this.switchMode('digital'));
    if (this.tabGame) this.tabGame.addEventListener('click', () => this.switchMode('game'));
    if (this.tabPrint) this.tabPrint.addEventListener('click', () => this.switchMode('print'));
    if (this.tabTeacher) this.tabTeacher.addEventListener('click', () => this.switchMode('teacher'));

    // サウンドトグル
    this.btnSound = document.getElementById('btn-sound');
    this.btnSound.addEventListener('click', () => {
      const enabled = this.soundFX.toggle();
      this.btnSound.textContent = enabled ? '🔊' : '🔇';
      this.btnSound.title = enabled ? 'おと：ON' : 'おと：OFF';
    });

    // 科目選択カード
    this.subjectCards = document.querySelectorAll('.subject-card');
    this.subjectCards.forEach(card => {
      card.addEventListener('click', () => {
        const subj = card.dataset.subject;
        this.selectSubject(subj);
      });
    });

    // クイズ操作
    this.btnNext = document.getElementById('btn-next');
    this.btnNext.addEventListener('click', () => {
      this.soundFX.playClick();
      this.nextQuestion();
    });

    this.btnRetry = document.getElementById('btn-retry');
    this.btnRetry.addEventListener('click', () => {
      this.soundFX.playClick();
      this.loadQuiz();
    });

    this.btnGoPrint = document.getElementById('btn-go-print');
    this.btnGoPrint.addEventListener('click', () => {
      this.switchMode('print');
    });

    // プリントモード操作
    this.printQCount = document.getElementById('print-q-count');
    this.printQCount.addEventListener('change', () => this.updateWorksheetPreview());

    this.printIncludeAnswer = document.getElementById('print-include-answer');
    this.printIncludeAnswer.addEventListener('change', () => this.updateWorksheetPreview());

    this.btnDoPrint = document.getElementById('btn-do-print');
    this.btnDoPrint.addEventListener('click', () => {
      window.print();
    });

    this.btnShufflePrint = document.getElementById('btn-shuffle-print');
    this.btnShufflePrint.addEventListener('click', () => {
      this.soundFX.playClick();
      this.updateWorksheetPreview();
    });
  }

  initMascot() {
    const canvas = document.getElementById('three-canvas');
    if (canvas) {
      this.mascot = new MascotStage(canvas);
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.soundFX.playClick();

    if (this.tabDigital) this.tabDigital.classList.remove('active');
    if (this.tabGame) this.tabGame.classList.remove('active');
    if (this.tabPrint) this.tabPrint.classList.remove('active');
    if (this.tabTeacher) this.tabTeacher.classList.remove('active');

    if (this.digitalView) this.digitalView.style.display = 'none';
    if (this.gameView) {
      this.gameView.classList.remove('show');
      this.gameView.style.display = 'none';
    }
    if (this.printView) {
      this.printView.classList.remove('show');
      this.printView.style.display = 'none';
    }
    if (this.teacherView) {
      this.teacherView.style.display = 'none';
    }

    if (mode === 'digital') {
      if (this.tabDigital) this.tabDigital.classList.add('active');
      if (this.digitalView) this.digitalView.style.display = 'grid';
    } else if (mode === 'game') {
      if (this.tabGame) this.tabGame.classList.add('active');
      if (this.gameView) {
        this.gameView.classList.add('show');
        this.gameView.style.display = 'block';
      }
      if (this.game) this.game.showLobby();
    } else if (mode === 'print') {
      if (this.tabPrint) this.tabPrint.classList.add('active');
      if (this.printView) {
        this.printView.classList.add('show');
        this.printView.style.display = 'block';
      }
      this.updateWorksheetPreview();
    } else if (mode === 'teacher') {
      if (this.tabTeacher) this.tabTeacher.classList.add('active');
      if (this.teacherView) {
        this.teacherView.style.display = 'flex';
      }
      this.renderTeacherView();
    }
  }

  selectSubject(subj) {
    if (this.currentSubject === subj) return;
    this.currentSubject = subj;
    this.soundFX.playClick();

    this.subjectCards.forEach(c => {
      if (c.dataset.subject === subj) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    if (this.mascot) {
      this.mascot.setSubjectDecorations(subj);
    }

    this.loadQuiz();
    this.updateWorksheetPreview();
    if (this.game) this.game.onConfigChanged();
    if (this.currentMode === 'teacher') {
      this.renderTeacherView();
    }
  }

  onGradeChanged() {
    this.loadQuiz();
    this.updateWorksheetPreview();
    if (this.game) this.game.onConfigChanged();
    if (this.currentMode === 'teacher') {
      this.renderTeacherView();
    }
  }

  // --------------------------------------------------------------------------
  // クイズ進行ロジック (正解ランダム化済み)
  // --------------------------------------------------------------------------
  loadQuiz() {
    // 該当学年・科目の問題を統合取得
    const rawList = this.getQuestionsForCurrentConfig(5);
    
    // シャッフルして5問を選び、選択肢をランダムシャッフル
    this.questions = [...rawList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(q => prepareQuestion(q));

    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    // UI初期化
    document.getElementById('quiz-play-area').style.display = 'block';
    document.getElementById('result-card').classList.remove('show');
    document.getElementById('stat-solved').textContent = '0';
    document.getElementById('stat-grade').textContent = `${this.currentGrade}年生`;

    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    this.answered = false;
    const q = this.questions[this.currentIndex];
    const total = this.questions.length;

    // バッジ
    document.getElementById('quiz-grade-badge').textContent = `小学${this.currentGrade}年生 • ${this.subjectNames[this.currentSubject]}`;
    document.getElementById('quiz-progress').textContent = `${this.currentIndex + 1} / ${total}問`;
    document.getElementById('quiz-score').textContent = `⭐ ${this.score}`;

    // プログレスバー
    const pct = ((this.currentIndex) / total) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    // 吹き出しリセット
    this.setSpeechBubble('いっしょに かんがえよう！');

    // 問題文
    document.getElementById('question-num-tag').textContent = `第 ${this.currentIndex + 1} 問`;
    document.getElementById('question-text').textContent = q.question;

    // 選択肢ボタン
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    const keys = ['ア', 'イ', 'ウ', 'エ'];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.id = `opt-btn-${idx}`;
      btn.innerHTML = `<span class="option-key">${keys[idx]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => this.handleAnswer(idx, btn));
      optionsGrid.appendChild(btn);
    });

    // フィードバック非表示
    const fb = document.getElementById('feedback-box');
    fb.className = 'feedback-box';
    this.btnNext.style.display = 'none';

    // 音声読み上げ
    if (this.voiceEnabled) {
      this.speakText(q.question);
    }
  }

  handleAnswer(selectedIdx, btnElement) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = (selectedIdx === q.answerIndex);

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.answerIndex) {
        b.classList.add('correct');
      } else if (idx === selectedIdx) {
        b.classList.add('incorrect');
      }
    });

    const fb = document.getElementById('feedback-box');
    const fbTitle = document.getElementById('feedback-title');
    const fbDesc = document.getElementById('feedback-desc');

    if (isCorrect) {
      this.score += 20;
      this.soundFX.playCorrect();
      if (this.mascot) this.mascot.celebrate();
      this.setSpeechBubble('やったね！ だいせいかい！🎉');

      fb.className = 'feedback-box correct show';
      fbTitle.innerHTML = '⭕️ <b>だいせいかい！ すごいね！</b>';
      fbDesc.textContent = q.explanation;

      if (this.voiceEnabled) {
        this.speakText('大正解！すごいね！');
      }
    } else {
      this.soundFX.playWrong();
      if (this.mascot) this.mascot.oops();
      this.setSpeechBubble('おしい！ つぎは がんばろう！💪');

      fb.className = 'feedback-box incorrect show';
      fbTitle.innerHTML = '❌ <b>おしい！ もうちょっと！</b>';
      fbDesc.textContent = `正解は「${q.options[q.answerIndex]}」です。${q.explanation}`;

      if (this.voiceEnabled) {
        this.speakText('おしい！次は頑張ろう！');
      }
    }

    document.getElementById('stat-solved').textContent = `${this.currentIndex + 1}`;
    document.getElementById('quiz-score').textContent = `⭐ ${this.score}`;

    this.btnNext.style.display = 'inline-flex';
    this.btnNext.textContent = (this.currentIndex + 1 < this.questions.length) ? 'つぎのもんだいへ ➔' : 'けっかをみる ➔';
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.renderCurrentQuestion();
    } else {
      this.showResult();
    }
  }

  showResult() {
    document.getElementById('quiz-play-area').style.display = 'none';
    const resultCard = document.getElementById('result-card');
    resultCard.classList.add('show');

    const total = this.questions.length;
    const maxScore = total * 20;
    const isPerfect = (this.score === maxScore);

    this.soundFX.playComplete();

    if (isPerfect && window.confetti) {
      window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      this.setSpeechBubble('まんてん！ てんさいだね！🏆✨');
      if (this.voiceEnabled) this.speakText('満点！天才だね！おめでとう！');
    } else {
      this.setSpeechBubble('よくがんばったね！ はなまる！💮');
      if (this.voiceEnabled) this.speakText('よく頑張ったね！はなまる！');
    }

    document.getElementById('result-score-val').textContent = `${this.score}点`;
    document.getElementById('result-total-val').textContent = `${maxScore}点`;

    const titleEl = document.getElementById('result-title');
    const msgEl = document.getElementById('result-message');

    if (isPerfect) {
      titleEl.textContent = '🎊 まんてん！ おめでとう！ 🎊';
      msgEl.textContent = '全問正解！キミはまさに学習マスターだ！この調子でどんどん進もう！';
    } else if (this.score >= maxScore * 0.6) {
      titleEl.textContent = '🌟 たいへん よくできました！ 🌟';
      msgEl.textContent = 'すばらしい集中力！まちがえたところを復習するともっとレベルアップできるよ！';
    } else {
      titleEl.textContent = '🌱 ナイスファイト！ つぎはもっとできる！ 🌱';
      msgEl.textContent = 'あきらめずに挑戦してえらい！プリントでもう一度おさらいしてみよう！';
    }
  }

  setSpeechBubble(text) {
    const bubble = document.getElementById('speech-bubble');
    if (bubble) bubble.textContent = text;
  }

  // --------------------------------------------------------------------------
  // AI音声読み上げ機能 (Web Speech API)
  // --------------------------------------------------------------------------
  speakText(text) {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
    try {
      window.speechSynthesis.cancel(); // 前の音声をキャンセル
      const clean = text.replace(/【.*?】/g, '').replace(/第\s*\d+\s*問/g, '');
      const uttr = new SpeechSynthesisUtterance(clean);
      uttr.lang = 'ja-JP';
      uttr.pitch = 1.3; // 可愛らしいロボットボイス
      uttr.rate = 1.05;
      window.speechSynthesis.speak(uttr);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  // --------------------------------------------------------------------------
  // 5. ロボまる AI サポートコントロール (ヒント、50:50、チャット相談)
  // --------------------------------------------------------------------------
  initRobotAiSupportDOM() {
    const btnHint = document.getElementById('btn-ai-hint');
    const btn5050 = document.getElementById('btn-ai-5050');
    const btnChat = document.getElementById('btn-ai-chat');
    const btnVoice = document.getElementById('btn-ai-voice');

    // 💡 AIヒント
    if (btnHint) {
      btnHint.addEventListener('click', () => {
        if (!this.questions || this.questions.length === 0) return;
        const q = this.questions[this.currentIndex];
        if (!q) return;

        this.soundFX.playAiBeep();
        if (this.mascot) this.mascot.think();
        this.setSpeechBubble('ピピピッ… AIスキャン中！🔍');

        setTimeout(() => {
          if (this.mascot) this.mascot.giveHint();
          const hintMsg = `【AIロボまるのヒント】${q.explanation}`;
          this.setSpeechBubble(hintMsg);
          if (this.voiceEnabled) {
            this.speakText(q.explanation);
          }
        }, 800);
      });
    }

    // 🎯 50:50 (2択にする)
    if (btn5050) {
      btn5050.addEventListener('click', () => {
        if (!this.questions || this.questions.length === 0 || this.answered) return;
        const q = this.questions[this.currentIndex];
        if (!q) return;

        this.soundFX.playAiBeep();
        if (this.mascot) this.mascot.think();
        this.setSpeechBubble('AI解析完了！ハズレを2つ消去したよ！🎯');

        // 正解以外のインデックスを2つ選んで非表示
        const wrongIndices = [0, 1, 2, 3].filter(idx => idx !== q.answerIndex);
        const shuffledWrong = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);

        shuffledWrong.forEach(idx => {
          const btn = document.getElementById(`opt-btn-${idx}`);
          if (btn) {
            btn.style.opacity = '0.2';
            btn.style.pointerEvents = 'none';
          }
        });

        if (this.voiceEnabled) {
          this.speakText('間違っている選択肢を２つ消去したよ！残りから選んでね！');
        }
      });
    }

    // 💬 ロボまる相談チャット
    if (btnChat) {
      btnChat.addEventListener('click', () => {
        const modal = document.getElementById('robo-chat-modal');
        if (modal) modal.style.display = 'flex';
      });
    }

    // 🔊 音声トグル
    if (btnVoice) {
      btnVoice.addEventListener('click', () => {
        this.voiceEnabled = !this.voiceEnabled;
        btnVoice.textContent = this.voiceEnabled ? '🔊 音声: ON' : '🔇 音声: OFF';
        btnVoice.classList.toggle('off', !this.voiceEnabled);
        this.soundFX.playClick();
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. プリント自動生成ロジック (A4学習プリント・10問対応 ＆ 解答解説シート)
  // --------------------------------------------------------------------------
  updateWorksheetPreview() {
    const container = document.getElementById('worksheet-container');
    if (!container) return;

    // 出題数（5問または10問）
    const countSelect = parseInt(this.printQCount.value, 10) || 5;

    // 該当学年・科目の問題を統合取得（先生自作問題＋ビルトイン＋不足時AI動的生成）
    const fullList = this.getQuestionsForCurrentConfig(countSelect);
    
    // ランダムに選定して、各問題の選択肢もシャッフル（正解位置ランダム化）
    const selectedQuestions = [...fullList]
      .sort(() => Math.random() - 0.5)
      .slice(0, countSelect)
      .map(q => prepareQuestion(q));

    const includeAnswer = this.printIncludeAnswer.checked;
    const subjectName = this.subjectNames[this.currentSubject];
    const keys = ['ア', 'イ', 'ウ', 'エ'];

    let html = '';

    // ========================================================================
    // 5問の場合: A4 1枚にゆったり配置
    // 10問の場合: A4 2枚（1〜5問、6〜10問）に分割配置して書き込み枠を確保！
    // ========================================================================
    const chunkSize = 5;
    const pageCount = Math.ceil(selectedQuestions.length / chunkSize);

    for (let page = 0; page < pageCount; page++) {
      const pageQuestions = selectedQuestions.slice(page * chunkSize, (page + 1) * chunkSize);
      const isMultiPage = pageCount > 1;
      const pageTag = isMultiPage ? `<span class="ws-page-tag">（ ${page + 1} / ${pageCount} ページ）</span>` : '';

      html += `
        <div class="a4-sheet ws-question-sheet">
          <div class="ws-header">
            <div class="ws-top-row">
              <div class="ws-title-group">
                <h2>小学${this.currentGrade}年生 【${subjectName}】 まなびプリント ${pageTag}</h2>
                <div class="ws-subtitle">わくわくスタディパーク 自習＆力だめしプリント（全${selectedQuestions.length}問）</div>
              </div>
              <div class="ws-score-box">
                <div class="ws-score-title">とくてん</div>
                <div class="ws-score-val">/ 100</div>
              </div>
            </div>
            <div class="ws-user-info-row">
              <div class="ws-info-field">
                <span>ひづけ：</span><span class="ws-line">　月　日</span>
              </div>
              <div class="ws-info-field">
                <span>${this.currentGrade}年</span><span class="ws-line" style="min-width:40px;">　組</span>
              </div>
              <div class="ws-info-field">
                <span>なまえ：</span><span class="ws-line name-line"></span>
              </div>
            </div>
          </div>

          <div class="ws-questions">
      `;

      pageQuestions.forEach((q, idx) => {
        const globalIdx = page * chunkSize + idx + 1;
        html += `
          <div class="ws-q-item">
            <div class="ws-q-head">
              <span class="ws-q-num">${globalIdx}</span>
              <span>${q.question}</span>
            </div>
            <div class="ws-q-body">
              <div class="ws-choices-box">
                ${q.options.map((opt, i) => `<span class="ws-choice-item"><b>[${keys[i]}]</b> ${opt}</span>`).join('')}
              </div>
              <div class="ws-answer-area">
                <span>【 こたえ 】</span>
                <div class="ws-answer-box"></div>
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    // ========================================================================
    // こたえ と かいせつ シート（オプション）
    // ========================================================================
    if (includeAnswer) {
      // 10問のときは2ページ、5問のときは1ページ
      for (let page = 0; page < pageCount; page++) {
        const pageQuestions = selectedQuestions.slice(page * chunkSize, (page + 1) * chunkSize);
        const isMultiPage = pageCount > 1;
        const pageTag = isMultiPage ? `<span class="ws-page-tag">（ ${page + 1} / ${pageCount} ）</span>` : '';

        html += `
          <div class="a4-sheet ws-answer-sheet">
            <div class="ws-header">
              <div class="ws-top-row">
                <div class="ws-title-group">
                  <h2>【こたえ と かいせつ】小学${this.currentGrade}年生 ${subjectName} ${pageTag}</h2>
                  <div class="ws-subtitle">おうちの方・先生用 まるつけ＆サポートシート（全${selectedQuestions.length}問）</div>
                </div>
              </div>
            </div>

            <div class="ws-questions">
        `;

        pageQuestions.forEach((q, idx) => {
          const globalIdx = page * chunkSize + idx + 1;
          const correctKey = keys[q.answerIndex];
          const correctText = q.options[q.answerIndex];

          html += `
            <div class="ws-q-item ws-ans-item">
              <div class="ws-q-head">
                <span class="ws-q-num">${globalIdx}</span>
                <span>${q.question}</span>
              </div>
              <div class="ws-q-body">
                <div class="ws-ans-correct">
                  <span>正解：<b>[ ${correctKey} ]　${correctText}</b></span>
                </div>
                <div class="ws-ans-explain">
                  💡 <b>ワンポイント解説：</b>${q.explanation}
                </div>
              </div>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // 7. 先生モード UI制御
  // --------------------------------------------------------------------------
  initTeacherDOM() {
    const form = document.getElementById('form-create-question');
    const formGrade = document.getElementById('form-grade');
    const formSubject = document.getElementById('form-subject');
    const btnAiAssist = document.getElementById('btn-form-ai-assist');

    // エクスポート・インポートツールバー
    const btnExpJson = document.getElementById('btn-export-json');
    const btnExpCsv = document.getElementById('btn-export-csv');
    const fileImport = document.getElementById('file-import');
    const btnOpenTextImport = document.getElementById('btn-open-text-import');
    const btnCsvTemplate = document.getElementById('btn-csv-template');
    const btnClearCustom = document.getElementById('btn-clear-custom');

    if (btnExpJson) {
      btnExpJson.addEventListener('click', () => {
        this.soundFX.playClick();
        this.teacherManager.exportToJSON();
      });
    }

    if (btnExpCsv) {
      btnExpCsv.addEventListener('click', () => {
        this.soundFX.playClick();
        this.teacherManager.exportToCSV();
      });
    }

    if (btnCsvTemplate) {
      btnCsvTemplate.addEventListener('click', () => {
        this.soundFX.playClick();
        this.teacherManager.downloadCSVTemplate();
      });
    }

    if (fileImport) {
      fileImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          try {
            let count = 0;
            if (file.name.endsWith('.json')) {
              count = this.teacherManager.importFromJSON(content);
            } else {
              count = this.teacherManager.importFromCSV(content);
            }
            alert(`🎉 ${count}問の問題をインポートしました！`);
            this.renderTeacherView();
            this.loadQuiz();
            this.updateWorksheetPreview();
          } catch (err) {
            alert('❌ インポートエラー: ' + err.message);
          }
          fileImport.value = '';
        };
        reader.readAsText(file, 'utf-8');
      });
    }

    if (btnOpenTextImport) {
      btnOpenTextImport.addEventListener('click', () => {
        const modal = document.getElementById('text-import-modal');
        if (modal) modal.style.display = 'flex';
      });
    }

    if (btnClearCustom) {
      btnClearCustom.addEventListener('click', () => {
        if (confirm('先生が作成・インポートした自作問題をすべて消去して標準状態に戻しますか？')) {
          this.teacherManager.clearAllCustomQuestions();
          alert('自作問題を消去しました。');
          this.renderTeacherView();
          this.loadQuiz();
          this.updateWorksheetPreview();
        }
      });
    }

    // AIに下書きを作ってもらう
    if (btnAiAssist) {
      btnAiAssist.addEventListener('click', () => {
        this.soundFX.playAiBeep();
        const g = parseInt(formGrade.value, 10);
        const s = formSubject.value;
        const qDraft = this.aiGenerator.generateQuestion(g, s);

        document.getElementById('form-question').value = qDraft.question;
        document.getElementById('form-opt-0').value = qDraft.options[0];
        document.getElementById('form-opt-1').value = qDraft.options[1];
        document.getElementById('form-opt-2').value = qDraft.options[2];
        document.getElementById('form-opt-3').value = qDraft.options[3];
        document.getElementById('form-explanation').value = qDraft.explanation;
        document.getElementById('form-print-answer').value = qDraft.printAnswer;
        document.getElementById('opt-radio-0').checked = true;

        if (this.mascot) this.mascot.celebrate();
      });
    }

    // 問題保存フォーム送信
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const grade = parseInt(formGrade.value, 10);
        const subject = formSubject.value;
        const question = document.getElementById('form-question').value.trim();
        const opt0 = document.getElementById('form-opt-0').value.trim();
        const opt1 = document.getElementById('form-opt-1').value.trim();
        const opt2 = document.getElementById('form-opt-2').value.trim();
        const opt3 = document.getElementById('form-opt-3').value.trim();
        const correctRadio = document.querySelector('input[name="form-correct"]:checked');
        const answerIndex = correctRadio ? parseInt(correctRadio.value, 10) : 0;
        const explanation = document.getElementById('form-explanation').value.trim();
        const printAnswer = document.getElementById('form-print-answer').value.trim();

        this.teacherManager.addQuestion({
          grade,
          subject,
          question,
          options: [opt0, opt1, opt2, opt3],
          answerIndex,
          explanation,
          printAnswer,
          author: 'teacher'
        });

        this.soundFX.playCorrect();
        alert('✅ 新しい問題を保存・登録しました！');
        form.reset();

        // フォームを現在の学年・科目に再設定
        formGrade.value = this.currentGrade;
        formSubject.value = this.currentSubject;

        this.renderTeacherView();
        this.loadQuiz();
        this.updateWorksheetPreview();
      });
    }
  }

  renderTeacherView() {
    const listEl = document.getElementById('teacher-questions-list');
    const badgeEl = document.getElementById('question-count-badge');
    const filterEl = document.getElementById('filter-display-info');
    if (!listEl) return;

    if (filterEl) {
      filterEl.textContent = `小学${this.currentGrade}年生 • ${this.subjectNames[this.currentSubject]}`;
    }

    // フォームのセレクトも同期
    const formGrade = document.getElementById('form-grade');
    const formSubject = document.getElementById('form-subject');
    if (formGrade) formGrade.value = this.currentGrade;
    if (formSubject) formSubject.value = this.currentSubject;

    const questions = this.teacherManager.getMergedQuestions(this.currentGrade, this.currentSubject);
    if (badgeEl) {
      badgeEl.textContent = `全 ${questions.length} 問`;
    }

    listEl.innerHTML = '';
    const keys = ['ア', 'イ', 'ウ', 'エ'];

    questions.forEach((q, idx) => {
      const card = document.createElement('div');
      const isCustom = (q.author === 'teacher');
      const isAi = (q.author === 'ai' || q.isAIGenerated);

      card.className = `teacher-q-card ${isCustom ? 'is-custom' : (isAi ? 'is-ai' : '')}`;

      let badgeHtml = '<span class="badge-tag badge-standard">📚 標準問題</span>';
      if (isCustom) badgeHtml = '<span class="badge-tag badge-custom">👤 先生自作</span>';
      else if (isAi) badgeHtml = '<span class="badge-tag badge-ai">🤖 AI生成</span>';

      card.innerHTML = `
        <div class="q-card-head">
          <div class="q-card-title">${idx + 1}. ${q.question}</div>
          <div class="q-badges">${badgeHtml}</div>
        </div>

        <div class="q-card-options">
          ${q.options.map((opt, i) => `
            <div class="q-card-opt-item ${i === q.answerIndex ? 'correct' : ''}">
              <b>[${keys[i]}]</b> ${opt} ${i === q.answerIndex ? '✓' : ''}
            </div>
          `).join('')}
        </div>

        ${q.explanation ? `<div class="q-card-explain">💡 解説: ${q.explanation}</div>` : ''}

        ${isCustom ? `
          <div class="q-card-actions">
            <button class="btn-card-del" data-id="${q.id}">🗑️ 削除</button>
          </div>
        ` : ''}
      `;

      listEl.appendChild(card);
    });

    // 削除ボタン
    listEl.querySelectorAll('.btn-card-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (confirm('この問題を削除しますか？')) {
          this.teacherManager.deleteQuestion(id);
          this.renderTeacherView();
          this.loadQuiz();
          this.updateWorksheetPreview();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. AIモーダル ＆ チャットモーダル DOM連携
  // --------------------------------------------------------------------------
  initAiModalsDOM() {
    // 1. AI問題生成モーダル
    const btnOpenAi = document.getElementById('btn-open-ai-modal');
    const aiModal = document.getElementById('ai-modal');
    const btnCloseAi = document.getElementById('btn-close-ai-modal');
    const btnRunBuiltinAi = document.getElementById('btn-run-builtin-ai');
    const btnRunGeminiAi = document.getElementById('btn-run-gemini-ai');
    const btnCopyPrompt = document.getElementById('btn-copy-prompt');

    if (btnOpenAi && aiModal) {
      btnOpenAi.addEventListener('click', () => {
        aiModal.style.display = 'flex';
      });
    }

    if (btnCloseAi && aiModal) {
      btnCloseAi.addEventListener('click', () => {
        aiModal.style.display = 'none';
      });
    }

    // ビルトインAI生成
    if (btnRunBuiltinAi) {
      btnRunBuiltinAi.addEventListener('click', () => {
        const count = parseInt(document.getElementById('builtin-ai-count').value, 10) || 5;
        this.soundFX.playAiBeep();

        for (let i = 0; i < count; i++) {
          const q = this.aiGenerator.generateQuestion(this.currentGrade, this.currentSubject);
          q.author = 'ai';
          this.teacherManager.addQuestion(q);
        }

        alert(`🤖 小学${this.currentGrade}年生【${this.subjectNames[this.currentSubject]}】の問題を【${count}問】AI生成して登録しました！`);
        if (aiModal) aiModal.style.display = 'none';
        this.renderTeacherView();
        this.loadQuiz();
        this.updateWorksheetPreview();
      });
    }

    // Gemini API生成
    if (btnRunGeminiAi) {
      btnRunGeminiAi.addEventListener('click', async () => {
        const key = document.getElementById('input-gemini-key').value.trim();
        const topic = document.getElementById('input-ai-topic').value.trim();
        if (!key) {
          alert('Gemini API Key を入力してください。');
          return;
        }

        btnRunGeminiAi.disabled = true;
        btnRunGeminiAi.textContent = '生成中... ⏳';

        try {
          const generatedList = await this.aiGenerator.generateWithGemini(key, this.currentGrade, this.currentSubject, topic, 3);
          generatedList.forEach(q => {
            q.grade = this.currentGrade;
            q.subject = this.currentSubject;
            q.author = 'ai';
            this.teacherManager.addQuestion(q);
          });
          alert(`🎉 Gemini AIにより【${generatedList.length}問】の新しい問題が生成されました！`);
          if (aiModal) aiModal.style.display = 'none';
          this.renderTeacherView();
          this.loadQuiz();
          this.updateWorksheetPreview();
        } catch (e) {
          alert('❌ 生成エラー: ' + e.message);
        } finally {
          btnRunGeminiAi.disabled = false;
          btnRunGeminiAi.textContent = '🤖 Geminiで生成して追加';
        }
      });
    }

    // プロンプトコピー
    if (btnCopyPrompt) {
      btnCopyPrompt.addEventListener('click', () => {
        const topic = document.getElementById('input-ai-topic')?.value.trim() || '';
        const promptText = this.aiGenerator.getCopyablePrompt(this.currentGrade, this.currentSubject, topic, 5);
        navigator.clipboard.writeText(promptText).then(() => {
          alert('📋 プロンプトをクリップボードにコピーしました！ChatGPTやGeminiに貼り付けてご使用ください。');
        });
      });
    }

    // 2. テキストインポートモーダル
    const importModal = document.getElementById('text-import-modal');
    const btnCloseImport = document.getElementById('btn-close-import-modal');
    const btnDoTextImport = document.getElementById('btn-do-text-import');

    if (btnCloseImport && importModal) {
      btnCloseImport.addEventListener('click', () => {
        importModal.style.display = 'none';
      });
    }

    if (btnDoTextImport) {
      btnDoTextImport.addEventListener('click', () => {
        const text = document.getElementById('import-text-content').value.trim();
        if (!text) {
          alert('テキストを入力してください。');
          return;
        }

        try {
          let count = 0;
          if (text.startsWith('[') || text.startsWith('{')) {
            count = this.teacherManager.importFromJSON(text);
          } else {
            count = this.teacherManager.importFromCSV(text);
          }
          alert(`🎉 ${count}問の問題をインポートしました！`);
          if (importModal) importModal.style.display = 'none';
          document.getElementById('import-text-content').value = '';
          this.renderTeacherView();
          this.loadQuiz();
          this.updateWorksheetPreview();
        } catch (err) {
          alert('❌ インポートエラー: ' + err.message);
        }
      });
    }

    // 3. ロボまる相談チャットモーダル
    const chatModal = document.getElementById('robo-chat-modal');
    const btnCloseChat = document.getElementById('btn-close-chat-modal');
    const chatInput = document.getElementById('chat-input');
    const btnChatSend = document.getElementById('btn-chat-send');
    const chatContainer = document.getElementById('chat-messages-container');

    if (btnCloseChat && chatModal) {
      btnCloseChat.addEventListener('click', () => {
        chatModal.style.display = 'none';
      });
    }

    const sendChatMessage = (userMsg) => {
      if (!userMsg.trim()) return;

      // ユーザーの吹き出し追加
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.innerHTML = `<div class="chat-text">${userMsg}</div>`;
      chatContainer.appendChild(userBubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // ロボまるの応答生成
      setTimeout(() => {
        const reply = this.getRoboMaruReply(userMsg);
        const robotBubble = document.createElement('div');
        robotBubble.className = 'chat-bubble robot';
        robotBubble.innerHTML = `
          <span class="chat-avatar">🤖</span>
          <div class="chat-text">${reply}</div>
        `;
        chatContainer.appendChild(robotBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        this.soundFX.playAiBeep();
        if (this.voiceEnabled) {
          this.speakText(reply);
        }
      }, 500);
    };

    if (btnChatSend && chatInput) {
      btnChatSend.addEventListener('click', () => {
        const msg = chatInput.value;
        chatInput.value = '';
        sendChatMessage(msg);
      });

      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const msg = chatInput.value;
          chatInput.value = '';
          sendChatMessage(msg);
        }
      });
    }

    // クイック質問チップス
    document.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = btn.dataset.msg;
        sendChatMessage(msg);
      });
    });
  }

  // ロボまるのAI対話ロジック
  getRoboMaruReply(msg) {
    const text = msg.toLowerCase();
    if (text.includes('集中') || text.includes('コツ')) {
      return '勉強に集中するには「ポモドーロ・テクニック（15分集中して3分休憩）」がおすすめだよ！タイマーをセットして、1問ずつ丁寧に解いていこう！ボクがいつもそばで見守っているよ！⏱️✨';
    } else if (text.includes('算数') || text.includes('計算') || text.includes('苦手')) {
      return '算数はね、絵や図をかいてイメージするのが一番の近道だよ！計算は毎日5問だけでいいから続けると、脳の計算回路がどんどんパワーアップするよ！いっしょにプリントで練習しよう！📐';
    } else if (text.includes('ひみつ') || text.includes('誰') || text.includes('ロボまる')) {
      return 'ボクは「学習支援AIロボまる」！未来のスタディ研究所で生まれたんだ！キミが「わかった！」って笑顔になると、ボクのエネルギーバッテリーが満タンになるんだよ！🚀🔋';
    } else if (text.includes('応援') || text.includes('元気') || text.includes('やる気')) {
      return 'キミは毎日こうして挑戦していて本当にえらい！小さな一歩の積み重ねが、未来のとびらを開くんだよ！「失敗は成功のもと」！さあ、胸を張ってつぎの問題へGO！🌟';
    } else if (text.includes('国語') || text.includes('漢字')) {
      return '漢字は部首（へんやつくり）の意味を知ると一気に覚えやすくなるよ！国語の文章題は「誰が・何を・どうした」を見つけるのがポイントだよ！📕';
    } else {
      return `「${msg}」について考えてくれてありがとう！学習でわからないことがあったらいつでもAIヒントボタンを押してね！キミの挑戦を全力で応援するよ！🤖👍`;
    }
  }
}

// 起動
document.addEventListener('DOMContentLoaded', () => {
  window.app = new StudyApp();
});
