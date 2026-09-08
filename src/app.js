import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const coarse = window.matchMedia('(hover: none), (pointer: coarse)');
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#070707');
scene.fog = new THREE.FogExp2('#070707', 0.035);
const camera = new THREE.PerspectiveCamera(34, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0,0.35,7.5);
const renderer = new THREE.WebGLRenderer({canvas, antialias: !window.devicePixelRatio || window.devicePixelRatio < 2, alpha:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio || 1,2));
renderer.setSize(innerWidth,innerHeight,false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

scene.add(new THREE.AmbientLight('#aab0b0', .55));
const key = new THREE.DirectionalLight('#fff2d0', 3.5); key.position.set(3,5,4); scene.add(key);
const rim = new THREE.DirectionalLight('#7ec0c8', 4); rim.position.set(-4,1,-3); scene.add(rim);

const root = new THREE.Group(); root.position.y = .05; scene.add(root);
const bottle = new THREE.Group(); root.add(bottle);
const glassMat = new THREE.MeshPhysicalMaterial({color:'#d9fbf7',metalness:.05,roughness:.08,transmission:.82,transparent:true,opacity:.78,thickness:.32,ior:1.45});
const metalMat = new THREE.MeshStandardMaterial({color:'#b9955a',metalness:.92,roughness:.2});
const darkMat = new THREE.MeshStandardMaterial({color:'#111313',metalness:.7,roughness:.26});
const liquidMat = new THREE.MeshPhysicalMaterial({color:'#d4a85d',metalness:0,roughness:.22,transmission:.12,transparent:true,opacity:.7});

const body = new THREE.Mesh(new THREE.CylinderGeometry(1.16,1.28,2.65,96,true), glassMat); body.scale.set(1,1,0.76); body.position.y=-.45; bottle.add(body);
const inner = new THREE.Mesh(new THREE.CylinderGeometry(.98,1.08,2.15,72,true), liquidMat); inner.scale.set(1,1,.73); inner.position.y=-.7; bottle.add(inner);
const base = new THREE.Mesh(new THREE.CylinderGeometry(1.30,1.36,.28,96), darkMat); base.scale.z=.8; base.position.y=-1.8; bottle.add(base);
const neck = new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.58,64), glassMat); neck.position.y=1.22; bottle.add(neck);
const cap = new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.92,64), metalMat); cap.position.y=1.97; bottle.add(cap);
const ring = new THREE.Mesh(new THREE.TorusGeometry(.43,.045,24,96), darkMat); ring.rotation.x=Math.PI/2; ring.position.y=1.56; bottle.add(ring);

const labelGroup = new THREE.Group(); labelGroup.position.set(0,-.25,.93); bottle.add(labelGroup);
const label = new THREE.Mesh(new THREE.PlaneGeometry(1.36,.82), new THREE.MeshStandardMaterial({color:'#f0e8d7',roughness:.75,metalness:.0})); labelGroup.add(label);

const particlesGeo = new THREE.BufferGeometry(); const pCount=500; const pos=new Float32Array(pCount*3);
for(let i=0;i<pCount;i++){const r=2.5+Math.random()*3.8; const a=Math.random()*Math.PI*2; const y=(Math.random()-.5)*6; pos[i*3]=Math.cos(a)*r; pos[i*3+1]=y; pos[i*3+2]=Math.sin(a)*r*.55;}
particlesGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
const particles = new THREE.Points(particlesGeo,new THREE.PointsMaterial({color:'#8fbcc0',size:.018,transparent:true,opacity:.5})); scene.add(particles);

let pointerX=0,pointerY=0; let scrollTarget=0,scrollCurrent=0;
addEventListener('pointermove',e=>{if(coarse.matches)return; pointerX=(e.clientX/innerWidth-.5); pointerY=(e.clientY/innerHeight-.5)});
addEventListener('scroll',()=>{scrollTarget=scrollY/(document.documentElement.scrollHeight-innerHeight||1)},{passive:true});
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);});

const sections=[...document.querySelectorAll('.chapter,.final')];
const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('is-in')),{threshold:.14}); sections.forEach(s=>observer.observe(s));

const track=document.querySelector('.track'); const gallery=document.querySelector('.gallery');
function layout(){
  if(!track||!gallery)return;
  const max=Math.max(0,track.scrollWidth-innerWidth*.86);
  const rect=gallery.getBoundingClientRect();
  const p=Math.min(1,Math.max(0,(innerHeight*.65-rect.top)/(gallery.offsetHeight-innerHeight*.3)));
  track.style.transform=`translate3d(${-max*p}px,0,0)`;
}
addEventListener('scroll',layout,{passive:true}); addEventListener('resize',layout);

function animate(t){
  const dt=.045;
  if(!reduce.matches) scrollCurrent += (scrollTarget-scrollCurrent)*dt; else scrollCurrent=scrollTarget;
  const s=scrollCurrent;
  root.rotation.y = s*Math.PI*2.2 + pointerX*.32;
  const reveal = Math.min(1, Math.max(0, (s-.20)/.28));
  const close = Math.min(1, Math.max(0, (s-.58)/.22));
  const split = reduce.matches ? 0 : reveal*(1-close);
  body.position.y = -.45 + split*.24;
  inner.position.y = -.7 - split*.42;
  cap.position.y = 1.97 + split*.72;
  neck.position.y = 1.22 + split*.34;
  ring.position.y = 1.56 + split*.22;
  labelGroup.position.z = .93 + split*.12;
  base.position.y = -1.8 - split*.18;
  root.rotation.x = .12 + Math.sin(s*Math.PI*1.8)*.16 - pointerY*.12;
  root.position.y = .05 + Math.sin(s*Math.PI*2.4)*.3;
  root.position.z = -s*1.25;
  particles.rotation.y += reduce.matches ? 0 : 0.00045;
  particles.position.y = Math.sin(t*0.00025)*.15;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate(0);

// Exposed hook for future real GLB swaps; core build needs no model asset.
window.AURELIS = { THREE, GLTFLoader, scene, camera, renderer, bottle };
