// Procedural stand-in 3D models for every shop item (three.js r149 UMD). Swap
// for real STLs later.
const M3_INK = 0x16161a;
function m3Mat(hex, rough = 0.62) {
  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex).convertSRGBToLinear(),
    roughness: rough,
    metalness: 0,
  });
  m.onBeforeCompile = (sh) => {
    sh.vertexShader =
      'varying float vY;\n' +
      sh.vertexShader.replace(
        '#include <project_vertex>',
        '#include <project_vertex>\nvY = (modelMatrix * vec4(transformed,1.0)).y;',
      );
    sh.fragmentShader =
      'varying float vY;\n' +
      sh.fragmentShader.replace(
        '#include <color_fragment>',
        '#include <color_fragment>\ndiffuseColor.rgb *= 0.9 + 0.1 * smoothstep(0.25, 0.75, abs(fract(vY * 26.0) - 0.5) * 2.0);',
      );
  };
  return m;
}
function m3Build(id, hex) {
  const g = new THREE.Group();
  const body = m3Mat(hex);
  const ink = new THREE.MeshStandardMaterial({color: M3_INK, roughness: 0.4});
  const white = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
  });
  const add = (geo, mat = body, p = [0, 0, 0], r = [0, 0, 0], s) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...p);
    m.rotation.set(...r);
    if (s) m.scale.set(...s);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
    return m;
  };
  const eyes = (y, z, sp = 0.2, r = 0.13) =>
    [-1, 1].forEach((s) => {
      add(
        new THREE.SphereGeometry(r, 24, 16),
        white,
        [s * sp, y, z],
        [0, 0, 0],
        [1, 1, 0.6],
      );
      add(new THREE.SphereGeometry(r * 0.5, 16, 12), ink, [
        s * sp,
        y,
        z + r * 0.5,
      ]);
    });
  const tube = (pts, r, mat = body) =>
    add(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))),
        120,
        r,
        12,
        false,
      ),
      mat,
    );
  if (id === 'tower') {
    add(new THREE.CylinderGeometry(1.05, 1.05, 0.22, 6), body, [0, 0.11, 0]);
    add(
      new THREE.CylinderGeometry(0.5, 0.56, 1.9, 6),
      body,
      [-0.3, 1.17, -0.3],
    );
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      add(new THREE.BoxGeometry(0.2, 0.22, 0.2), body, [
        -0.3 + Math.cos(a) * 0.42,
        2.22,
        -0.3 + Math.sin(a) * 0.42,
      ]);
    }
    add(
      new THREE.BoxGeometry(0.5, 0.14, 0.7),
      body,
      [-0.05, 0.4, 0.25],
      [0.35, -0.7, 0],
    );
    add(
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      white,
      [0.55, 0.38, 0.45],
      [0.4, 0.6, 0.2],
    );
  } else if (id === 'insert' || id === 'bins') {
    const cols = id === 'bins' ? 3 : 4;
    const rows = id === 'bins' ? 2 : 3;
    const w = id === 'bins' ? 0.62 : 0.5;
    const h = id === 'bins' ? 0.55 : 0.32;
    if (id === 'insert') {
      add(
        new THREE.BoxGeometry(cols * w + 0.12, 0.1, rows * w + 0.12),
        body,
        [0, 0.05, 0],
      );
    }
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const cx = (x - (cols - 1) / 2) * (w + (id === 'bins' ? 0.06 : 0));
        const cz = (z - (rows - 1) / 2) * (w + (id === 'bins' ? 0.06 : 0));
        const hh = id === 'bins' ? h * (1 + ((x + z) % 2) * 0.4) : h;
        const sh = new THREE.Shape();
        const q = w / 2 - 0.02;
        const rr = 0.06;
        sh.moveTo(-q + rr, -q);
        sh.lineTo(q - rr, -q);
        sh.quadraticCurveTo(q, -q, q, -q + rr);
        sh.lineTo(q, q - rr);
        sh.quadraticCurveTo(q, q, q - rr, q);
        sh.lineTo(-q + rr, q);
        sh.quadraticCurveTo(-q, q, -q, q - rr);
        sh.lineTo(-q, -q + rr);
        sh.quadraticCurveTo(-q, -q, -q + rr, -q);
        const hole = new THREE.Path();
        const iq = q - 0.05;
        hole.moveTo(-iq, -iq);
        hole.lineTo(iq, -iq);
        hole.lineTo(iq, iq);
        hole.lineTo(-iq, iq);
        hole.lineTo(-iq, -iq);
        sh.holes.push(hole);
        const wall = new THREE.ExtrudeGeometry(sh, {
          depth: hh,
          bevelEnabled: false,
        });
        wall.rotateX(-Math.PI / 2);
        add(wall, body, [cx, 0.1, cz]);
        add(new THREE.BoxGeometry(w - 0.04, 0.04, w - 0.04), body, [
          cx,
          0.12,
          cz,
        ]);
      }
    }
  } else if (id === 'grip') {
    add(new THREE.CylinderGeometry(0.9, 0.9, 0.12, 48), body, [0, 0.06, 0]);
    add(new THREE.CylinderGeometry(0.4, 0.55, 0.5, 32), body, [0, 0.37, 0]);
    add(
      new THREE.TorusGeometry(0.75, 0.16, 20, 48),
      body,
      [0, 0.74, 0],
      [Math.PI / 2, 0, 0],
    );
    add(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 48), body, [0, 0.74, 0]);
  } else if (id === 'goblin') {
    add(
      new THREE.CylinderGeometry(0.55, 0.62, 1.0, 32, 1, true),
      body,
      [0, 0.5, 0],
    );
    add(new THREE.CylinderGeometry(0.62, 0.62, 0.06, 32), body, [0, 0.03, 0]);
    add(
      new THREE.SphereGeometry(0.62, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      body,
      [0, 0.98, 0],
    );
    [-1, 1].forEach((s) =>
      add(
        new THREE.ConeGeometry(0.16, 0.7, 16),
        body,
        [s * 0.68, 1.2, 0],
        [0, 0, -s * 1.1],
      ),
    );
    eyes(1.22, 0.5, 0.22, 0.14);
    [0.3, -0.1, -0.3].forEach((x, n) =>
      add(
        new THREE.CylinderGeometry(0.06, 0.06, 1.2, 12),
        n === 1 ? white : ink,
        [x, 1.1 + n * 0.1, -0.1],
        [0.1 * (n - 1), 0, 0.15 * (n - 1)],
      ),
    );
  } else if (id === 'meeple') {
    const s = new THREE.Shape();
    s.moveTo(-0.5, 0);
    s.lineTo(-0.14, 0);
    s.lineTo(0, 0.3);
    s.lineTo(0.14, 0);
    s.lineTo(0.5, 0);
    s.quadraticCurveTo(0.44, 0.4, 0.24, 0.62);
    s.lineTo(0.62, 0.74);
    s.quadraticCurveTo(0.72, 0.92, 0.52, 0.96);
    s.lineTo(0.22, 0.94);
    s.absarc(0, 1.16, 0.26, -0.9, Math.PI + 0.9, false);
    s.lineTo(-0.22, 0.94);
    s.lineTo(-0.52, 0.96);
    s.quadraticCurveTo(-0.72, 0.92, -0.62, 0.74);
    s.lineTo(-0.24, 0.62);
    s.quadraticCurveTo(-0.44, 0.4, -0.5, 0);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3,
      curveSegments: 20,
    });
    geo.translate(0, 0, -0.16);
    [
      [-0.7, 0, 0.3, 0.3],
      [0.0, 0, -0.2, -0.2],
      [0.75, 0, 0.35, -0.5],
    ].forEach(([x, y, z, ry]) => add(geo, body, [x, y + 0.04, z], [0, ry, 0]));
  } else if (id === 'snake') {
    const pts = Array.from({length: 40}, (_, i) => {
      const t = (i / 39) * Math.PI * 5;
      const r = 0.7 - (i / 39) * 0.1;
      return [Math.cos(t) * r, 0.2 + (i / 39) * 1.4, Math.sin(t) * r];
    });
    tube(pts, 0.14);
    const h = pts[pts.length - 1];
    add(
      new THREE.SphereGeometry(0.24, 24, 16),
      body,
      [h[0], h[1] + 0.05, h[2]],
      [0, 0, 0],
      [1.3, 0.9, 1],
    );
    add(
      new THREE.CylinderGeometry(0.25, 0.25, 1.8, 16),
      new THREE.MeshStandardMaterial({color: 0x2a2a30, roughness: 0.5}),
      [0, 0.95, 0],
    );
    eyes(h[1] + 0.16, h[2] + 0.18, 0.1, 0.07);
  } else if (id === 'pot' || id === 'planter2') {
    const self = id === 'planter2';
    const p = (
      self
        ? [
            [0, 0],
            [0.6, 0],
            [0.72, 0.4],
            [0.8, 1.1],
            [0.84, 1.3],
            [0.76, 1.3],
            [0.7, 1.1],
            [0.62, 0.42],
            [0, 0.4],
          ]
        : [
            [0, 0],
            [0.5, 0],
            [0.64, 0.5],
            [0.74, 1.0],
            [0.8, 1.32],
            [0.72, 1.32],
            [0.66, 1.0],
            [0.56, 0.5],
            [0, 0.12],
          ]
    ).map(([x, y]) => new THREE.Vector2(x, y));
    add(new THREE.LatheGeometry(p, self ? 48 : 10), body);
    add(
      new THREE.CircleGeometry(self ? 0.72 : 0.68, self ? 48 : 10),
      new THREE.MeshStandardMaterial({color: 0x3b2b1e, roughness: 1}),
      [0, 1.18, 0],
      [-Math.PI / 2, 0, 0],
    );
    const leaf = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5BA84A').convertSRGBToLinear(),
      roughness: 0.6,
    });
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      add(
        new THREE.SphereGeometry(0.22, 16, 12),
        leaf,
        [Math.cos(a) * 0.3, 1.45 + (i % 3) * 0.12, Math.sin(a) * 0.3],
        [0, -a, 0.6],
        [1.4, 0.35, 0.7],
      );
    }
    if (self) {
      add(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 12), white, [0, 0.8, 0]);
    }
  } else if (id === 'cards') {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(1.0, 0);
    s.lineTo(1.0, 0.14);
    s.lineTo(0.28, 0.14);
    s.lineTo(0.12, 0.7);
    s.lineTo(0, 0.7);
    s.lineTo(0, 0);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 1.4,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
    geo.translate(-0.5, 0, -0.7);
    add(geo, body, [-0.6, 0, 0], [0, 0.2, 0]);
    add(geo, body, [0.6, 0, 0.2], [0, -0.15, 0]);
    [0, 1, 2].forEach((n) =>
      add(
        new THREE.BoxGeometry(0.6, 0.9, 0.02),
        white,
        [-0.62 + n * 0.04, 0.55, -0.35 + n * 0.2],
        [-0.25, 0.2, 0],
      ),
    );
  } else if (id === 'dragon') {
    const pts = Array.from({length: 16}, (_, i) => {
      const t = i / 15;
      return [
        -1.4 + t * 2.6,
        0.3 + Math.sin(t * Math.PI) * 0.25,
        Math.sin(t * Math.PI * 2.2) * 0.45,
      ];
    });
    pts.forEach((p, i) => {
      const s = 0.32 - i * 0.014;
      add(
        new THREE.OctahedronGeometry(s, 0),
        body,
        p,
        [0, i * 0.4, Math.PI / 4],
        [1.1, 0.8, 1],
      );
    });
    const h = pts[pts.length - 1];
    add(
      new THREE.ConeGeometry(0.26, 0.7, 6),
      body,
      [h[0] + 0.35, h[1] + 0.1, h[2]],
      [0, 0, -Math.PI / 2],
    );
    [-1, 1].forEach((s) =>
      add(
        new THREE.ConeGeometry(0.08, 0.35, 6),
        body,
        [h[0] + 0.1, h[1] + 0.38, h[2] + s * 0.12],
        [s * 0.3, 0, -0.4],
      ),
    );
    const wing = new THREE.Shape();
    wing.moveTo(0, 0);
    wing.lineTo(0.9, 0.2);
    wing.lineTo(0.7, 0.5);
    wing.lineTo(0.5, 0.32);
    wing.lineTo(0.3, 0.55);
    wing.lineTo(0, 0);
    const wg = new THREE.ExtrudeGeometry(wing, {
      depth: 0.04,
      bevelEnabled: false,
    });
    [-1, 1].forEach((s) =>
      add(wg, body, [0.1, 0.55, s * 0.15], [s * -1.1, s * -0.2, 0]),
    );
  } else if (id === 'octo') {
    add(
      new THREE.SphereGeometry(0.62, 32, 24),
      body,
      [0, 1.0, 0],
      [0, 0, 0],
      [1, 1.12, 1],
    );
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const c = Math.cos(a);
      const s = Math.sin(a);
      tube(
        [
          [c * 0.35, 0.7, s * 0.35],
          [c * 0.7, 0.25, s * 0.7],
          [c * 1.05, 0.12, s * 1.05],
          [c * 1.2, 0.3, s * 1.2],
          [c * 1.05, 0.42, s * 1.05],
        ],
        0.1 - (i % 2) * 0.015,
      );
    }
    eyes(1.08, 0.52, 0.22, 0.15);
  } else if (id === 'stand') {
    const s = new THREE.Shape();
    for (let i = 0; i <= 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r = i % 2 ? 0.22 : 0.34;
      i
        ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r)
        : s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 2.0,
      steps: 60,
      bevelEnabled: false,
    });
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const t = y * 1.4;
      pos.setXYZ(
        i,
        x * Math.cos(t) - z * Math.sin(t),
        y,
        x * Math.sin(t) + z * Math.cos(t),
      );
    }
    geo.computeVertexNormals();
    add(geo, body, [0, 0.14, 0]);
    add(new THREE.CylinderGeometry(0.8, 0.86, 0.14, 48), body, [0, 0.07, 0]);
    add(
      new THREE.TorusGeometry(0.5, 0.1, 16, 40, Math.PI),
      body,
      [0, 2.05, 0],
      [0, 0, 0],
      [1.2, 0.5, 1],
    );
  } else if (id === 'clip') {
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 0.8;
      add(new THREE.BoxGeometry(0.6, 0.12, 0.5), body, [x, 0.06, 0]);
      add(
        new THREE.TorusGeometry(0.2, 0.07, 12, 32, Math.PI * 1.5),
        body,
        [x, 0.32, 0],
        [0, 0, -Math.PI * 0.25],
      );
    }
    tube(
      [
        [-1.8, 0.32, 0.2],
        [-0.8, 0.32, 0],
        [0, 0.32, -0.05],
        [0.8, 0.32, 0],
        [1.8, 0.3, 0.25],
      ],
      0.07,
      new THREE.MeshStandardMaterial({color: 0xf5f0e4, roughness: 0.5}),
    );
  }
  return g;
}

const M3 = {cache: {}, queue: [], busy: false, r: null};
function m3Stage() {
  if (M3.r) return M3.r;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(1);
  renderer.setSize(520, 520);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff7e8, 0xbfb49c, 0.9));
  const key = new THREE.DirectionalLight(0xfff0d6, 1.5);
  key.position.set(3, 6, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {left: -4, right: 4, top: 4, bottom: -4});
  key.shadow.bias = -0.0005;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xdfe8ff, 0.5);
  rim.position.set(-4, 3, -3);
  scene.add(rim);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.ShadowMaterial({opacity: 0.22}),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  M3.r = {renderer, scene, camera};
  return M3.r;
}
function m3Frame(camera, obj, theta = 0.6, phi = 1.1, pad = 1.12) {
  const box = new THREE.Box3().setFromObject(obj);
  const c = box.getCenter(new THREE.Vector3());
  const r = box.getBoundingSphere(new THREE.Sphere()).radius;
  const d = (r / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2))) * pad;
  camera.position.set(
    c.x + d * Math.sin(phi) * Math.sin(theta),
    c.y + d * Math.cos(phi),
    c.z + d * Math.sin(phi) * Math.cos(theta),
  );
  camera.lookAt(c);
}
function m3Pump() {
  if (M3.busy || !M3.queue.length) return;
  M3.busy = true;
  setTimeout(() => {
    const {key, id, hex, cbs} = M3.queue.shift();
    try {
      const {renderer, scene, camera} = m3Stage();
      const obj = m3Build(id, hex);
      scene.add(obj);
      m3Frame(camera, obj);
      renderer.render(scene, camera);
      M3.cache[key] = renderer.domElement.toDataURL('image/png');
      scene.remove(obj);
      obj.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
      });
    } catch (e) {
      M3.cache[key] = null;
    }
    cbs.forEach((f) => f(M3.cache[key]));
    M3.busy = false;
    m3Pump();
  }, 16);
}
function useModelShot(id, hex) {
  const key = id + hex;
  const [src, setSrc] = React.useState(M3.cache[key]);
  React.useEffect(() => {
    if (!window.THREE) return;
    if (key in M3.cache) {
      setSrc(M3.cache[key]);
      return;
    }
    const q = M3.queue.find((x) => x.key === key);
    if (q) q.cbs.push(setSrc);
    else M3.queue.push({key, id, hex, cbs: [setSrc]});
    m3Pump();
  }, [key]);
  return src;
}

function ModelViewer({id, hex, bg = 'var(--paper-1)'}) {
  const host = React.useRef(null);
  const st = React.useRef(null);
  React.useEffect(() => {
    const el = host.current;
    if (!window.THREE) return;
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xfff7e8, 0xbfb49c, 0.9));
    const key = new THREE.DirectionalLight(0xfff0d6, 1.5);
    key.position.set(3, 6, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, {left: -4, right: 4, top: 4, bottom: -4});
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xdfe8ff, 0.5);
    rim.position.set(-4, 3, -3);
    scene.add(rim);
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({opacity: 0.22}),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const pivot = new THREE.Group();
    scene.add(pivot);
    const s = {
      renderer,
      scene,
      camera,
      pivot,
      theta: 0.6,
      phi: 1.1,
      drag: null,
      obj: null,
      last: performance.now(),
    };
    st.current = s;
    const size = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size);
    ro.observe(el);
    size();
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const loop = () => {
      if (!s.drag && !rm) s.theta += 0.005;
      if (s.obj) m3Frame(camera, s.obj, s.theta, s.phi, 1.2);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();
    const down = (e) => {
      s.drag = {x: e.clientX, y: e.clientY, t: s.theta, p: s.phi};
      el.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      if (!s.drag) return;
      s.theta = s.drag.t - (e.clientX - s.drag.x) * 0.01;
      s.phi = Math.max(
        0.4,
        Math.min(1.45, s.drag.p - (e.clientY - s.drag.y) * 0.008),
      );
    };
    const up = () => {
      s.drag = null;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      el.innerHTML = '';
    };
  }, []);
  React.useEffect(() => {
    const s = st.current;
    if (!s) return;
    if (s.obj) s.pivot.remove(s.obj);
    s.obj = m3Build(id, hex);
    s.pivot.add(s.obj);
  }, [id, hex]);
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        background: bg,
        backgroundImage: 'var(--tex-bed)',
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      <div ref={host} style={{position: 'absolute', inset: 0}} />
    </div>
  );
}

Object.assign(window, {m3Build, useModelShot, ModelViewer});
