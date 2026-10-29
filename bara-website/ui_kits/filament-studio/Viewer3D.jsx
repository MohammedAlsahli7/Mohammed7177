// Three.js r149 UMD (window.THREE). Simple on-brand stand-in models until real STLs are loaded.
const vwInk = 0x16161a;

function vwMakeMaterial(fil, layerU) {
  const hex = new THREE.Color(fil ? fil.hex : '#F2B705').convertSRGBToLinear();
  const f = fil ? fil.finish : 'matte';
  const opts = { color: hex, roughness: .85, metalness: 0 };
  if (f === 'silk') Object.assign(opts, { roughness: .28, metalness: .45, clearcoat: .6 });
  if (f === 'gloss') Object.assign(opts, { roughness: .32, clearcoat: .35 });
  if (f === 'satin') Object.assign(opts, { roughness: .55 });
  if (f === 'translucent') Object.assign(opts, { roughness: .18, transmission: .55, thickness: .6, transparent: true, opacity: .92 });
  const m = new THREE.MeshPhysicalMaterial(opts);
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uLayer = layerU;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vWY;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvWY = (modelMatrix * vec4(transformed,1.0)).y;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vWY;\nuniform float uLayer;').replace('#include <color_fragment>', '#include <color_fragment>\nfloat ly = fract(vWY * 42.0);\nfloat ln = smoothstep(0.0,0.22,ly)*smoothstep(1.0,0.78,ly);\ndiffuseColor.rgb *= mix(1.0, mix(0.8,1.0,ln), uLayer);');
  };
  return m;
}

function vwMesh(geo, part) { const m = new THREE.Mesh(geo); m.userData.part = part; m.castShadow = true; m.receiveShadow = true; return m; }
function vwFixed(geo, color) { const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: new THREE.Color(color).convertSRGBToLinear(), roughness: .5 })); m.castShadow = true; return m; }

function vwBuild(id) {
  const g = new THREE.Group();
  if (id === 'tower') {
    const tray = vwMesh(new THREE.CylinderGeometry(1.05, 1.05, .22, 6), 'base'); tray.position.y = .11; g.add(tray);
    const lip = vwMesh(new THREE.TorusGeometry(.98, .06, 8, 6), 'base'); lip.rotation.x = Math.PI / 2; lip.rotation.z = Math.PI / 6; lip.position.y = .24; g.add(lip);
    const tower = vwMesh(new THREE.CylinderGeometry(.5, .56, 1.9, 6), 'body'); tower.position.set(-.3, 1.17, -.3); g.add(tower);
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; const c = vwMesh(new THREE.BoxGeometry(.2, .22, .2), 'body'); c.position.set(-.3 + Math.cos(a) * .42, 2.22, -.3 + Math.sin(a) * .42); c.rotation.y = -a; g.add(c); }
    const chute = vwMesh(new THREE.BoxGeometry(.5, .14, .7), 'body'); chute.position.set(-.05, .4, .25); chute.rotation.x = .35; chute.rotation.y = -.7; g.add(chute);
    const hole = vwFixed(new THREE.BoxGeometry(.32, .36, .1), vwInk); hole.position.set(-.05, .48, .17); hole.rotation.y = -.7; g.add(hole);
  } else if (id === 'taba') {
    const tube = (pts, r, part) => { const cv = new THREE.CatmullRomCurve3(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z))); g.add(vwMesh(new THREE.TubeGeometry(cv, 220, r, 14, false), part)); };
    const coil = (cx, cy, cz, R, turns, rise, phase) => Array.from({ length: turns * 12 + 1 }, (_, i) => { const t = i / 12 * Math.PI * 2 + phase; const rr = R * (1 - i / (turns * 12 + 1) * .35); return [cx + Math.cos(t) * rr, cy + i * rise, cz + Math.sin(t) * rr]; });
    tube(coil(0, .14, 0, .78, 3, .022, 0), .13, 'body');
    tube(coil(-.1, .34, .05, .5, 2, .03, 1.4), .12, 'hat');
    tube(coil(.05, .72, -.05, .32, 2, .028, 2.6), .11, 'body');
    tube([[.7, .2, .3], [.95, .45, .1], [1.05, .75, .2], [.92, .98, .05]], .09, 'hat');
    tube([[-.75, .15, -.2], [-1.0, .3, .2], [-.9, .55, .4]], .09, 'body');
    const face = new THREE.Group(); face.position.set(0, .82, .62); g.add(face); g.userData.face = face;
    [-1, 1].forEach((s) => {
      const eye = vwFixed(new THREE.SphereGeometry(.15, 24, 16), 0xffffff); eye.position.set(s * .2, .05, 0); eye.scale.z = .5; face.add(eye);
      const pup = vwFixed(new THREE.SphereGeometry(.07, 16, 12), vwInk); pup.position.set(s * .2, .04, .07); face.add(pup);
    });
    const mouth = vwFixed(new THREE.TorusGeometry(.09, .022, 8, 24, Math.PI), vwInk); mouth.position.set(0, -.17, .04); mouth.rotation.z = Math.PI; face.add(mouth);
  } else if (id === 'planter') {
    const p = [[0, .14], [.5, .14], [.62, .5], [.72, 1.0], [.78, 1.32], [.82, 1.4], [.74, 1.4], [.68, 1.28], [.6, .9], [.48, .24], [0, .24]].map(([x, y]) => new THREE.Vector2(x, y));
    const pot = vwMesh(new THREE.LatheGeometry(p, 10), 'body'); g.add(pot);
    const soil = vwFixed(new THREE.CircleGeometry(.66, 10), 0x3b2b1e); soil.rotation.x = -Math.PI / 2; soil.position.y = 1.22; g.add(soil);
    const saucer = vwMesh(new THREE.CylinderGeometry(.82, .74, .14, 10), 'base'); saucer.position.y = .07; g.add(saucer);
  } else {
    const s = new THREE.Shape();
    s.moveTo(-.55, 0); s.lineTo(-.14, 0); s.lineTo(0, .38); s.lineTo(.14, 0); s.lineTo(.55, 0);
    s.quadraticCurveTo(.48, .5, .26, .72); s.lineTo(.72, .86); s.quadraticCurveTo(.84, 1.06, .6, 1.12); s.lineTo(.24, 1.08);
    s.absarc(0, 1.34, .3, -.9, Math.PI + .9, false); s.lineTo(-.24, 1.08); s.lineTo(-.6, 1.12); s.quadraticCurveTo(-.84, 1.06, -.72, .86); s.lineTo(-.26, .72); s.quadraticCurveTo(-.48, .5, -.55, 0);
    const geo = new THREE.ExtrudeGeometry(s, { depth: .38, bevelEnabled: true, bevelThickness: .04, bevelSize: .04, bevelSegments: 3, curveSegments: 24 });
    geo.translate(0, .12, -.19);
    const m = vwMesh(geo, 'body'); m.scale.setScalar(1.25); m.position.y = -.03; g.add(m);
    const stand = vwMesh(new THREE.CylinderGeometry(.8, .84, .14, 40), 'base'); stand.position.y = .07; g.add(stand);
  }
  return g;
}

const VW_LIGHTS = {
  daylight: { bg: '#F5F0E4', build: (L) => { L.add(new THREE.HemisphereLight(0xfff7e8, 0xcfc4ad, .85)); const d = new THREE.DirectionalLight(0xfff0d6, 1.5); d.position.set(4, 6, 3); L.add(d); return d; } },
  studio: { bg: '#24242A', build: (L) => { L.add(new THREE.AmbientLight(0xffffff, .25)); const k = new THREE.DirectionalLight(0xffffff, 1.4); k.position.set(-3, 5, 4); L.add(k); const r = new THREE.DirectionalLight(0xbcd2ff, 1.1); r.position.set(3, 3, -4); L.add(r); const f = new THREE.DirectionalLight(0xffffff, .35); f.position.set(4, 1, 3); L.add(f); return k; } },
  shelf: { bg: '#D9D0BA', build: (L) => { L.add(new THREE.AmbientLight(0xffe6c4, .3)); const s = new THREE.SpotLight(0xffd9a0, 2.2, 20, .5, .6); s.position.set(.5, 6, 2); L.add(s); L.add(s.target); return s; } },
};

function Viewer3D({ modelId = 'tower', colors = {}, lighting = 'daylight', layers = true, autoRotate = true, height = 480, radius = 18, label }) {
  const host = React.useRef(null);
  const st = React.useRef(null);
  React.useEffect(() => {
    const el = host.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio)); renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NoToneMapping;
    el.appendChild(renderer.domElement); renderer.domElement.style.display = 'block';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: .2 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    const lights = new THREE.Group(); scene.add(lights);
    const pivot = new THREE.Group(); scene.add(pivot);
    const s = { renderer, scene, camera, lights, pivot, theta: .35, phi: 1.15, r: 8.2, drag: null, auto: autoRotate, layerU: { value: layers ? 1 : 0 }, model: null };
    st.current = s;
    const place = () => { const t = new THREE.Vector3(0, .95, 0); camera.position.set(t.x + s.r * Math.sin(s.phi) * Math.sin(s.theta), t.y + s.r * Math.cos(s.phi), t.z + s.r * Math.sin(s.phi) * Math.cos(s.theta)); camera.lookAt(t); };
    const size = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(size); ro.observe(el); size();
    let raf; const loop = () => { if (s.auto && !s.drag) s.theta += .004; if (s.model && s.model.userData.face) { const f = s.model.userData.face; f.position.y = .82 + Math.sin(performance.now() / 450) * .04; f.lookAt(camera.position.x, f.position.y, camera.position.z); } place(); renderer.render(scene, camera); raf = requestAnimationFrame(loop); }; loop();
    const down = (e) => { s.drag = { x: e.clientX, y: e.clientY, t: s.theta, p: s.phi }; el.setPointerCapture(e.pointerId); };
    const move = (e) => { if (!s.drag) return; s.theta = s.drag.t - (e.clientX - s.drag.x) * .01; s.phi = Math.max(.35, Math.min(1.5, s.drag.p - (e.clientY - s.drag.y) * .008)); };
    const up = () => { s.drag = null; };
    const wheel = (e) => { e.preventDefault(); s.r = Math.max(4, Math.min(12, s.r + e.deltaY * .005)); };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('wheel', wheel, { passive: false });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); el.innerHTML = ''; };
  }, []);
  React.useEffect(() => { const s = st.current; if (!s) return; if (s.model) s.pivot.remove(s.model); s.model = vwBuild(modelId); s.pivot.add(s.model); s.applied = null; }, [modelId]);
  React.useEffect(() => {
    const s = st.current; if (!s || !s.model) return;
    const mats = {};
    s.model.traverse((o) => { if (o.userData.part) { const p = o.userData.part; mats[p] = mats[p] || vwMakeMaterial(colors[p] || colors.body, s.layerU); if (o.material && o.material.dispose) o.material.dispose(); o.material = mats[p]; } });
  }, [modelId, colors.body && colors.body.id, colors.base && colors.base.id, colors.hat && colors.hat.id, colors.body && colors.body.hex]);
  React.useEffect(() => { const s = st.current; if (s) s.layerU.value = layers ? 1 : 0; }, [layers]);
  React.useEffect(() => { const s = st.current; if (s) s.auto = autoRotate; }, [autoRotate]);
  React.useEffect(() => {
    const s = st.current; if (!s) return; s.lights.clear(); const p = VW_LIGHTS[lighting] || VW_LIGHTS.daylight;
    const key = p.build(s.lights); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -.0005;
    if (key.shadow.camera.isOrthographicCamera) Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3 });
    s.scene.background = new THREE.Color(p.bg).convertSRGBToLinear();
  }, [lighting]);
  return (
    <div style={{ position: 'relative', height, borderRadius: radius, overflow: 'hidden', border: '2px solid var(--graphite-900)', cursor: 'grab', touchAction: 'none' }}>
      <div ref={host} style={{ position: 'absolute', inset: 0 }} />
      {label && <div style={{ position: 'absolute', left: 10, bottom: 10, pointerEvents: 'none' }}>{label}</div>}
    </div>
  );
}

Object.assign(window, { Viewer3D });
