// Three.js r149 UMD (window.THREE). Simple on-brand stand-in models until real
// STLs are loaded.
const vwInk = 0x16161a;

function vwMakeMaterial(fil, layerU) {
  const hex = new THREE.Color(fil ? fil.hex : '#F2B705').convertSRGBToLinear();
  const f = fil ? fil.finish : 'matte';
  const opts = {color: hex, roughness: 0.85, metalness: 0};
  if (f === 'silk') {
    Object.assign(opts, {roughness: 0.28, metalness: 0.45, clearcoat: 0.6});
  }
  if (f === 'gloss') Object.assign(opts, {roughness: 0.32, clearcoat: 0.35});
  if (f === 'satin') Object.assign(opts, {roughness: 0.55});
  if (f === 'translucent') {
    Object.assign(opts, {
      roughness: 0.18,
      transmission: 0.55,
      thickness: 0.6,
      transparent: true,
      opacity: 0.92,
    });
  }
  const m = new THREE.MeshPhysicalMaterial(opts);
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uLayer = layerU;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vWY;')
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvWY = (modelMatrix * vec4(transformed,1.0)).y;',
      );
    sh.fragmentShader = sh.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying float vWY;\nuniform float uLayer;',
      )
      .replace(
        '#include <color_fragment>',
        '#include <color_fragment>\nfloat ly = fract(vWY * 42.0);\nfloat ln = smoothstep(0.0,0.22,ly)*smoothstep(1.0,0.78,ly);\ndiffuseColor.rgb *= mix(1.0, mix(0.8,1.0,ln), uLayer);',
      );
  };
  return m;
}

function vwMesh(geo, part) {
  const m = new THREE.Mesh(geo);
  m.userData.part = part;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
function vwFixed(geo, color) {
  const m = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(color).convertSRGBToLinear(),
      roughness: 0.5,
    }),
  );
  m.castShadow = true;
  return m;
}

function vwBuild(id) {
  const g = new THREE.Group();
  if (id === 'tower') {
    const tray = vwMesh(
      new THREE.CylinderGeometry(1.05, 1.05, 0.22, 6),
      'base',
    );
    tray.position.y = 0.11;
    g.add(tray);
    const lip = vwMesh(new THREE.TorusGeometry(0.98, 0.06, 8, 6), 'base');
    lip.rotation.x = Math.PI / 2;
    lip.rotation.z = Math.PI / 6;
    lip.position.y = 0.24;
    g.add(lip);
    const tower = vwMesh(new THREE.CylinderGeometry(0.5, 0.56, 1.9, 6), 'body');
    tower.position.set(-0.3, 1.17, -0.3);
    g.add(tower);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const c = vwMesh(new THREE.BoxGeometry(0.2, 0.22, 0.2), 'body');
      c.position.set(
        -0.3 + Math.cos(a) * 0.42,
        2.22,
        -0.3 + Math.sin(a) * 0.42,
      );
      c.rotation.y = -a;
      g.add(c);
    }
    const chute = vwMesh(new THREE.BoxGeometry(0.5, 0.14, 0.7), 'body');
    chute.position.set(-0.05, 0.4, 0.25);
    chute.rotation.x = 0.35;
    chute.rotation.y = -0.7;
    g.add(chute);
    const hole = vwFixed(new THREE.BoxGeometry(0.32, 0.36, 0.1), vwInk);
    hole.position.set(-0.05, 0.48, 0.17);
    hole.rotation.y = -0.7;
    g.add(hole);
  } else if (id === 'taba') {
    const tube = (pts, r, part) => {
      const cv = new THREE.CatmullRomCurve3(
        pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      );
      g.add(vwMesh(new THREE.TubeGeometry(cv, 220, r, 14, false), part));
    };
    const coil = (cx, cy, cz, R, turns, rise, phase) =>
      Array.from({length: turns * 12 + 1}, (_, i) => {
        const t = (i / 12) * Math.PI * 2 + phase;
        const rr = R * (1 - (i / (turns * 12 + 1)) * 0.35);
        return [cx + Math.cos(t) * rr, cy + i * rise, cz + Math.sin(t) * rr];
      });
    tube(coil(0, 0.14, 0, 0.78, 3, 0.022, 0), 0.13, 'body');
    tube(coil(-0.1, 0.34, 0.05, 0.5, 2, 0.03, 1.4), 0.12, 'hat');
    tube(coil(0.05, 0.72, -0.05, 0.32, 2, 0.028, 2.6), 0.11, 'body');
    tube(
      [
        [0.7, 0.2, 0.3],
        [0.95, 0.45, 0.1],
        [1.05, 0.75, 0.2],
        [0.92, 0.98, 0.05],
      ],
      0.09,
      'hat',
    );
    tube(
      [
        [-0.75, 0.15, -0.2],
        [-1.0, 0.3, 0.2],
        [-0.9, 0.55, 0.4],
      ],
      0.09,
      'body',
    );
    const face = new THREE.Group();
    face.position.set(0, 0.82, 0.62);
    g.add(face);
    g.userData.face = face;
    [-1, 1].forEach((s) => {
      const eye = vwFixed(new THREE.SphereGeometry(0.15, 24, 16), 0xffffff);
      eye.position.set(s * 0.2, 0.05, 0);
      eye.scale.z = 0.5;
      face.add(eye);
      const pup = vwFixed(new THREE.SphereGeometry(0.07, 16, 12), vwInk);
      pup.position.set(s * 0.2, 0.04, 0.07);
      face.add(pup);
    });
    const mouth = vwFixed(
      new THREE.TorusGeometry(0.09, 0.022, 8, 24, Math.PI),
      vwInk,
    );
    mouth.position.set(0, -0.17, 0.04);
    mouth.rotation.z = Math.PI;
    face.add(mouth);
  } else if (id === 'planter') {
    const p = [
      [0, 0.14],
      [0.5, 0.14],
      [0.62, 0.5],
      [0.72, 1.0],
      [0.78, 1.32],
      [0.82, 1.4],
      [0.74, 1.4],
      [0.68, 1.28],
      [0.6, 0.9],
      [0.48, 0.24],
      [0, 0.24],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const pot = vwMesh(new THREE.LatheGeometry(p, 10), 'body');
    g.add(pot);
    const soil = vwFixed(new THREE.CircleGeometry(0.66, 10), 0x3b2b1e);
    soil.rotation.x = -Math.PI / 2;
    soil.position.y = 1.22;
    g.add(soil);
    const saucer = vwMesh(
      new THREE.CylinderGeometry(0.82, 0.74, 0.14, 10),
      'base',
    );
    saucer.position.y = 0.07;
    g.add(saucer);
  } else {
    const s = new THREE.Shape();
    s.moveTo(-0.55, 0);
    s.lineTo(-0.14, 0);
    s.lineTo(0, 0.38);
    s.lineTo(0.14, 0);
    s.lineTo(0.55, 0);
    s.quadraticCurveTo(0.48, 0.5, 0.26, 0.72);
    s.lineTo(0.72, 0.86);
    s.quadraticCurveTo(0.84, 1.06, 0.6, 1.12);
    s.lineTo(0.24, 1.08);
    s.absarc(0, 1.34, 0.3, -0.9, Math.PI + 0.9, false);
    s.lineTo(-0.24, 1.08);
    s.lineTo(-0.6, 1.12);
    s.quadraticCurveTo(-0.84, 1.06, -0.72, 0.86);
    s.lineTo(-0.26, 0.72);
    s.quadraticCurveTo(-0.48, 0.5, -0.55, 0);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3,
      curveSegments: 24,
    });
    geo.translate(0, 0.12, -0.19);
    const m = vwMesh(geo, 'body');
    m.scale.setScalar(1.25);
    m.position.y = -0.03;
    g.add(m);
    const stand = vwMesh(
      new THREE.CylinderGeometry(0.8, 0.84, 0.14, 40),
      'base',
    );
    stand.position.y = 0.07;
    g.add(stand);
  }
  return g;
}

const VW_LIGHTS = {
  daylight: {
    bg: '#F5F0E4',
    build: (L) => {
      L.add(new THREE.HemisphereLight(0xfff7e8, 0xcfc4ad, 0.85));
      const d = new THREE.DirectionalLight(0xfff0d6, 1.5);
      d.position.set(4, 6, 3);
      L.add(d);
      return d;
    },
  },
  studio: {
    bg: '#24242A',
    build: (L) => {
      L.add(new THREE.AmbientLight(0xffffff, 0.25));
      const k = new THREE.DirectionalLight(0xffffff, 1.4);
      k.position.set(-3, 5, 4);
      L.add(k);
      const r = new THREE.DirectionalLight(0xbcd2ff, 1.1);
      r.position.set(3, 3, -4);
      L.add(r);
      const f = new THREE.DirectionalLight(0xffffff, 0.35);
      f.position.set(4, 1, 3);
      L.add(f);
      return k;
    },
  },
  shelf: {
    bg: '#D9D0BA',
    build: (L) => {
      L.add(new THREE.AmbientLight(0xffe6c4, 0.3));
      const s = new THREE.SpotLight(0xffd9a0, 2.2, 20, 0.5, 0.6);
      s.position.set(0.5, 6, 2);
      L.add(s);
      L.add(s.target);
      return s;
    },
  },
};

function Viewer3D({
  modelId = 'tower',
  colors = {},
  lighting = 'daylight',
  layers = true,
  autoRotate = true,
  height = 480,
  radius = 18,
  label,
}) {
  const host = React.useRef(null);
  const st = React.useRef(null);
  React.useEffect(() => {
    const el = host.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NoToneMapping;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({opacity: 0.2}),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    const lights = new THREE.Group();
    scene.add(lights);
    const pivot = new THREE.Group();
    scene.add(pivot);
    const s = {
      renderer,
      scene,
      camera,
      lights,
      pivot,
      theta: 0.35,
      phi: 1.15,
      r: 8.2,
      drag: null,
      auto: autoRotate,
      layerU: {value: layers ? 1 : 0},
      model: null,
    };
    st.current = s;
    const place = () => {
      const t = new THREE.Vector3(0, 0.95, 0);
      camera.position.set(
        t.x + s.r * Math.sin(s.phi) * Math.sin(s.theta),
        t.y + s.r * Math.cos(s.phi),
        t.z + s.r * Math.sin(s.phi) * Math.cos(s.theta),
      );
      camera.lookAt(t);
    };
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
    let raf;
    const loop = () => {
      if (s.auto && !s.drag) s.theta += 0.004;
      if (s.model && s.model.userData.face) {
        const f = s.model.userData.face;
        f.position.y = 0.82 + Math.sin(performance.now() / 450) * 0.04;
        f.lookAt(camera.position.x, f.position.y, camera.position.z);
      }
      place();
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
        0.35,
        Math.min(1.5, s.drag.p - (e.clientY - s.drag.y) * 0.008),
      );
    };
    const up = () => {
      s.drag = null;
    };
    const wheel = (e) => {
      e.preventDefault();
      s.r = Math.max(4, Math.min(12, s.r + e.deltaY * 0.005));
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('wheel', wheel, {passive: false});
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
    if (s.model) s.pivot.remove(s.model);
    s.model = vwBuild(modelId);
    s.pivot.add(s.model);
    s.applied = null;
  }, [modelId]);
  React.useEffect(() => {
    const s = st.current;
    if (!s || !s.model) return;
    const mats = {};
    s.model.traverse((o) => {
      if (o.userData.part) {
        const p = o.userData.part;
        mats[p] = mats[p] || vwMakeMaterial(colors[p] || colors.body, s.layerU);
        if (o.material && o.material.dispose) o.material.dispose();
        o.material = mats[p];
      }
    });
  }, [
    modelId,
    colors.body && colors.body.id,
    colors.base && colors.base.id,
    colors.hat && colors.hat.id,
    colors.body && colors.body.hex,
  ]);
  React.useEffect(() => {
    const s = st.current;
    if (s) s.layerU.value = layers ? 1 : 0;
  }, [layers]);
  React.useEffect(() => {
    const s = st.current;
    if (s) s.auto = autoRotate;
  }, [autoRotate]);
  React.useEffect(() => {
    const s = st.current;
    if (!s) return;
    s.lights.clear();
    const p = VW_LIGHTS[lighting] || VW_LIGHTS.daylight;
    const key = p.build(s.lights);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0005;
    if (key.shadow.camera.isOrthographicCamera) {
      Object.assign(key.shadow.camera, {
        left: -3,
        right: 3,
        top: 3,
        bottom: -3,
      });
    }
    s.scene.background = new THREE.Color(p.bg).convertSRGBToLinear();
  }, [lighting]);
  return (
    <div
      style={{
        position: 'relative',
        height,
        borderRadius: radius,
        overflow: 'hidden',
        border: '2px solid var(--graphite-900)',
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      <div ref={host} style={{position: 'absolute', inset: 0}} />
      {label && (
        <div
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            pointerEvents: 'none',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

Object.assign(window, {Viewer3D});
