import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
#define PI 3.14159265359
#define TAU 6.28318530718

uniform float uTime;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform vec4 uColor4;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vUv;

float easing(float t) {
  return t * t * (3.0 - 2.0 * t);
}

vec4 gradient(float a) {
  vec4 colors[4];
  colors[0] = uColor1;
  colors[1] = uColor2;
  colors[2] = uColor3;
  colors[3] = uColor4;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float t = fract((a + fi * 0.33) / 0.66);
    t = easing(t);
    return mix(colors[i], colors[i + 1], t);
  }
  return colors[0];
}

void main() {
  vec2 uv = (vUv - 0.5) * 2.0;
  uv.x *= uResolution.x / uResolution.y;

  float mouseDistance = distance(uMouse, uv);
  float angle = atan(uv.y, uv.x);
  float radius = length(uv);
  float animTime = uTime * 1.5;
  float t = angle / TAU;

  vec4 colors[4] = vec4[](uColor1, uColor2, uColor3, uColor4);
  vec4 col = gradient(t);
  col *= radius;

  float breathe = sin(animTime) * 0.05 + 0.95;
  col *= breathe;

  float mouseInfluence = smoothstep(1.0, 0.0, mouseDistance) * 0.3;
  col += mouseInfluence;

  col *= smoothstep(1.2, 0.0, radius);

  gl_FragColor = col;
}
`;

const imgVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const imgFragmentShader = `
uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uMultiplier;
varying vec2 vUv;
void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  texColor.rgb *= texColor.a;
  gl_FragColor = vec4(((texColor.rgb * uMultiplier) + uColor) * texColor.a, texColor.a);
}
`;

interface AuraCanvasProps {
  onReady?: () => void;
}

export default function AuraCanvas({ onReady }: AuraCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    time: 0,
    mouseX: 0,
    mouseY: 0,
    mouseTargetX: 0,
    mouseTargetY: 0,
    rafId: 0,
    disposed: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const state = stateRef.current;
    state.disposed = false;

    const isMobile = window.innerWidth < 768;
    const gridWidth = isMobile ? 30 : 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(1.6, window.devicePixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0b1320, 1);
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    // Aura Quad
    const auraGeometry = new THREE.PlaneGeometry(1, 1);
    const auraMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Vector4(0.0, 0.29, 0.71, 1.0) },
        uColor2: { value: new THREE.Vector4(0.0, 0.71, 0.85, 1.0) },
        uColor3: { value: new THREE.Vector4(1.0, 0.62, 0.0, 1.0) },
        uColor4: { value: new THREE.Vector4(1.0, 0.76, 0.0, 1.0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
    });
    const auraMesh = new THREE.Mesh(auraGeometry, auraMaterial);
    scene.add(auraMesh);

    // Blob Grid
    const total = gridWidth * gridWidth;
    const size = 0.2;
    const padding = 0.05;
    const gridSize = size + padding;
    const gridHalfSize = (gridSize * (gridWidth - 1)) / 2;

    const dotGeometry = new THREE.CircleGeometry(0.04, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: 0x0077b6,
      transparent: true,
      opacity: 0.4,
    });
    const mesh = new THREE.InstancedMesh(dotGeometry, dotMaterial, total);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    let index = 0;
    const originalPositions: THREE.Vector3[] = [];
    const directions: THREE.Vector3[] = [];
    const velocities: number[] = [];
    const distances: number[][] = [];
    const waves: number[][] = [];
    const originalDistances: number[][] = [];
    const originalDistancesFlattened: number[] = [];

    for (let i = 0; i < gridWidth; i++) {
      distances[i] = [];
      waves[i] = [];
      originalDistances[i] = [];
      for (let j = 0; j < gridWidth; j++) {
        const x = j * gridSize - gridHalfSize;
        const y = i * gridSize - gridHalfSize;
        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);

        const pos = new THREE.Vector3(x, y, 0);
        const d = pos.distanceTo(new THREE.Vector3(0, 0, 0));
        originalPositions.push(pos.clone());
        directions.push(pos.clone().normalize());
        velocities.push(0);
        distances[i].push(d);
        waves[i].push(d);
        originalDistances[i].push(d);
        originalDistancesFlattened.push(d);
        index++;
      }
    }
    scene.add(mesh);

    // Image Overlay
    const imgGeometry = new THREE.PlaneGeometry(2, 2);
    const imgMaterial = new THREE.ShaderMaterial({
      vertexShader: imgVertexShader,
      fragmentShader: imgFragmentShader,
      uniforms: {
        uTexture: { value: new THREE.Texture() },
        uColor: { value: new THREE.Vector3(0, 0, 0) },
        uMultiplier: { value: 0.7 },
      },
      transparent: true,
      opacity: 0.08,
    });
    const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
    imgMesh.position.z = 0.1;
    scene.add(imgMesh);

    // Load texture
    const loader = new THREE.TextureLoader();
    loader.load('/images/hero-control-room.jpg', (texture) => {
      if (state.disposed) return;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      imgMaterial.uniforms.uTexture.value = texture;
      imgMaterial.opacity = 0.08;
      onReady?.();
    }, undefined, () => {
      onReady?.();
    });

    // Mouse
    const mouse = new THREE.Vector2();
    const mouseTarget = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove);
    }

    // Resize
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      auraMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      camera.left = -1;
      camera.right = 1;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (state.disposed) return;
      state.rafId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      state.time += dt;

      // Update aura
      auraMaterial.uniforms.uTime.value = state.time * 0.5;

      // Smooth mouse
      if (!isMobile) {
        mouse.lerp(mouseTarget, 0.1);
        auraMaterial.uniforms.uMouse.value.set(
          mouse.x * (window.innerWidth / window.innerHeight),
          mouse.y
        );
      } else {
        // Auto pulse on mobile
        auraMaterial.uniforms.uMouse.value.set(
          Math.sin(state.time * 0.5) * 0.3,
          Math.cos(state.time * 0.7) * 0.2
        );
      }

      // Update blob grid
      const maxDistance = 6;
      const maxDist = Math.max(...originalDistancesFlattened);
      const freq = 0.5;
      const waveSpeed = -10;
      const viscosity = 0.08;
      const mouseForce = 15;

      // Update distances from wave
      for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
          distances[i][j] = originalDistances[i][j] + Math.sin(waves[i][j]) * 0.05;
        }
      }

      // Flatten and update velocities
      const flattened = distances.flat();
      for (let i = 0; i < total; i++) {
        velocities[i] += (-flattened[i]) * viscosity;
      }

      // Raycast for mouse position in 3D
      raycaster.setFromCamera(mouse, camera);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(mousePlane, target);
      mousePlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(target.x, target.y, 0));

      // Update instances
      for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
          const idx = i * gridWidth + j;

          waves[i][j] += velocities[idx];
          const d = originalDistances[i][j] + Math.sin(waves[i][j]) * 0.1;

          mesh.getMatrixAt(idx, dummy.matrix);
          dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

          const dist = isMobile ? 999 : Math.sqrt(
            Math.pow(target.x - dummy.position.x, 2) +
            Math.pow(target.y - dummy.position.y, 2)
          );

          const pos = directions[idx].clone().multiplyScalar(originalDistancesFlattened[idx]);

          if (dist < maxDistance && !isMobile) {
            const d2 = (1 - dist / maxDistance) * -mouseForce;
            const d3 = Math.pow(
              Math.sin((d / maxDist) * Math.PI * freq + state.time * waveSpeed) * 0.5 + 0.5,
              4
            ) * (d2 / 1);
            pos.add(directions[idx].clone().multiplyScalar(d3));
          }

          dummy.position.copy(pos);
          dummy.updateMatrix();
          mesh.setMatrixAt(idx, dummy.matrix);
        }
      }
      mesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      state.disposed = true;
      cancelAnimationFrame(state.rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      auraGeometry.dispose();
      auraMaterial.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      imgGeometry.dispose();
      imgMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
