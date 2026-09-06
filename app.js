import * as THREE from "https://esm.sh/three@0.180.0";
import { RoundedBoxGeometry } from "https://esm.sh/three@0.180.0/examples/jsm/geometries/RoundedBoxGeometry.js?deps=three@0.180.0";
import { EffectComposer } from "https://esm.sh/three@0.180.0/examples/jsm/postprocessing/EffectComposer.js?deps=three@0.180.0";
import { RenderPass } from "https://esm.sh/three@0.180.0/examples/jsm/postprocessing/RenderPass.js?deps=three@0.180.0";
import { UnrealBloomPass } from "https://esm.sh/three@0.180.0/examples/jsm/postprocessing/UnrealBloomPass.js?deps=three@0.180.0";
import gsap from "https://esm.sh/gsap@3.13.0";
import ScrollTrigger from "https://esm.sh/gsap@3.13.0/ScrollTrigger.js";
import Lenis from "https://esm.sh/lenis@1.3.11";

gsap.registerPlugin(ScrollTrigger);

document.body.classList.add("is-loading");
function showWebGLError(message){
  const box=document.createElement("div");
  box.style.cssText="position:fixed;inset:0;z-index:200;background:#030303;color:#fff;display:grid;place-items:center;padding:28px;text-align:center;font:12px/1.7 Inter,Arial,sans-serif;letter-spacing:.08em";
  box.innerHTML=`<div><div style="font-family:Georgia,serif;font-size:34px;letter-spacing:.02em;margin-bottom:14px">VERSACE EROS</div><div style="opacity:.65;max-width:520px">${message}</div></div>`;
  document.body.appendChild(box);
}


const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#020304");

const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.25, 11.5);

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
} catch (err) {
  console.error(err);
  showWebGLError("WebGL could not start in this browser/device. Try Chrome and make sure hardware acceleration is enabled.");
  throw err;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const composer = new EffectComposer(renderer);
composer.setPixelRatio(Math.min(devicePixelRatio, 1.35));
composer.setSize(innerWidth, innerHeight);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const bloom = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  1.15,
  0.65,
  0.72
);
composer.addPass(bloom);

const world = new THREE.Group();
scene.add(world);

const ambient = new THREE.HemisphereLight(0x9bb9c8, 0x020202, 0.42);
scene.add(ambient);

const key = new THREE.SpotLight(0xe8f5ff, 900, 30, Math.PI / 5, 0.55, 1.3);
key.position.set(-4, 5, 7);
scene.add(key);

const rim = new THREE.PointLight(0x0b8db8, 18, 10);
rim.position.set(3, 1.5, 2);
scene.add(rim);

const doorLight = new THREE.PointLight(0xffffff, 0, 14);
doorLight.position.set(0, 0.2, -1.3);
scene.add(doorLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(8, 96),
  new THREE.MeshStandardMaterial({ color: 0x030404, roughness: 0.48, metalness: 0.15 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.55;
world.add(floor);

const backWall = new THREE.Mesh(
  new THREE.PlaneGeometry(28, 18),
  new THREE.MeshStandardMaterial({ color: 0x030506, roughness: 0.9 })
);
backWall.position.set(0, 1, -3.4);
world.add(backWall);

function makeDoorPanel(side){
  const group = new THREE.Group();
  const panel = new THREE.Mesh(
    new RoundedBoxGeometry(3.65, 7.3, 0.34, 8, 0.16),
    new THREE.MeshPhysicalMaterial({
      color: 0x070b0c,
      roughness: 0.28,
      metalness: 0.55,
      clearcoat: 0.35,
      clearcoatRoughness: 0.2
    })
  );
  panel.position.x = side * 1.86;
  group.add(panel);

  for(let i=0;i<5;i++){
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 6.5, 0.06),
      new THREE.MeshBasicMaterial({color:0x26333a, transparent:true, opacity:.3})
    );
    bar.position.set(side * (0.45 + i*.58), 0, 0.19);
    panel.add(bar);
  }

  group.position.set(0, 0, -1.05);
  group.userData.side = side;
  group.userData.panel = panel;
  return group;
}

const leftDoor = makeDoorPanel(-1);
const rightDoor = makeDoorPanel(1);
world.add(leftDoor, rightDoor);

const doorFrameMat = new THREE.MeshStandardMaterial({color:0x11191d, metalness:.7, roughness:.22});
const frameTop = new THREE.Mesh(new THREE.BoxGeometry(8.1,.35,.5), doorFrameMat);
frameTop.position.set(0,3.8,-1.05);
world.add(frameTop);

const frameL = new THREE.Mesh(new THREE.BoxGeometry(.35,7.3,.5), doorFrameMat);
frameL.position.set(-4,0,-1.05);
const frameR = frameL.clone(); frameR.position.x=4;
world.add(frameL,frameR);

const glowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(7.2, 7.0),
  new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false})
);
glowPlane.position.set(0,.2,-1.2);
world.add(glowPlane);

const glowOrb = new THREE.Mesh(
  new THREE.SphereGeometry(2.8, 48, 48),
  new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false})
);
glowOrb.position.set(0,.2,-1.1);
world.add(glowOrb);

function createGreekTexture(){
  const c = document.createElement("canvas");
  c.width=1024;c.height=1024;
  const ctx=c.getContext("2d");
  ctx.fillStyle="#06171b";ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle="rgba(0,0,0,.72)";ctx.lineWidth=22;
  const s=74;
  for(let y=20;y<c.height;y+=s){
    for(let x=20;x<c.width;x+=s){
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+s*.65,y);
      ctx.lineTo(x+s*.65,y+s*.38);
      ctx.lineTo(x+s*.2,y+s*.38);
      ctx.lineTo(x+s*.2,y+s*.78);
      ctx.lineTo(x+s,y+s*.78);
      ctx.stroke();
    }
  }
  ctx.fillStyle="#d6bd78";
  ctx.font="600 76px Inter, Arial";
  ctx.textAlign="center";
  ctx.fillText("VERSACE",512,850);
  ctx.font="600 42px Inter, Arial";
  ctx.fillText("EROS",512,905);
  const tex=new THREE.CanvasTexture(c);
  tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}

function createBottle(){
  const bottle = new THREE.Group();
  bottle.name="VersaceErosBottle";

  const glass = new THREE.MeshPhysicalMaterial({
    color:0x063d4a,
    roughness:.13,
    metalness:.16,
    transmission:.18,
    thickness:.65,
    clearcoat:1,
    clearcoatRoughness:.08
  });

  const body = new THREE.Mesh(
    new RoundedBoxGeometry(3.8,4.5,.92,10,.22),
    glass
  );
  body.position.y=-.25;
  bottle.add(body);

  const texture=createGreekTexture();
  const frontMat=new THREE.MeshPhysicalMaterial({
    map:texture,
    color:0x0b5866,
    roughness:.19,
    metalness:.22,
    clearcoat:.75
  });
  const front = new THREE.Mesh(new THREE.PlaneGeometry(3.45,4.1),frontMat);
  front.position.set(0,-.25,.49);
  bottle.add(front);

  const medusa = new THREE.Mesh(
    new THREE.CircleGeometry(.55,64),
    new THREE.MeshStandardMaterial({color:0x1b5960,metalness:.5,roughness:.2})
  );
  medusa.position.set(0,.45,.505);
  bottle.add(medusa);

  const gold = new THREE.MeshStandardMaterial({color:0xb89545,metalness:.9,roughness:.18});
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.42,64),gold);
  neck.position.y=2.12;
  bottle.add(neck);

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(.73,.73,1.5,64),
    new THREE.MeshStandardMaterial({color:0x0a5b78,metalness:.45,roughness:.16})
  );
  cap.position.y=2.9;
  bottle.add(cap);

  const capTop = new THREE.Mesh(new THREE.CylinderGeometry(.73,.55,.18,64),gold);
  capTop.position.y=3.67;
  bottle.add(capTop);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(.66,.07,20,64),gold);
  ring.rotation.x=Math.PI/2;
  ring.position.y=2.25;
  bottle.add(ring);

  const bottomGlow = new THREE.PointLight(0x0c8aa8,2.5,5);
  bottomGlow.position.set(0,-1.7,.8);
  bottle.add(bottomGlow);

  bottle.scale.setScalar(.24);
  bottle.position.set(0,-.1,-.6);
  return bottle;
}
const bottle=createBottle();
world.add(bottle);

const particles = new THREE.Group();
world.add(particles);
const particleCount = innerWidth < 800 ? 500 : 900;
const positions = new Float32Array(particleCount*3);
const sizes = new Float32Array(particleCount);
for(let i=0;i<particleCount;i++){
  const r=THREE.MathUtils.randFloat(2.2,7.5);
  const a=Math.random()*Math.PI*2;
  positions[i*3]=Math.cos(a)*r;
  positions[i*3+1]=THREE.MathUtils.randFloat(-3.5,4);
  positions[i*3+2]=THREE.MathUtils.randFloat(-5,2);
  sizes[i]=THREE.MathUtils.randFloat(.015,.055);
}
const pGeo=new THREE.BufferGeometry();
pGeo.setAttribute("position",new THREE.BufferAttribute(positions,3));
const pMat=new THREE.PointsMaterial({
  color:0x9bd4e4,size:.035,transparent:true,opacity:.5,depthWrite:false,blending:THREE.AdditiveBlending
});
const pts=new THREE.Points(pGeo,pMat);
particles.add(pts);

const dust = [];
for(let i=0;i<18;i++){
  const m=new THREE.Mesh(
    new THREE.SphereGeometry(THREE.MathUtils.randFloat(.03,.11),12,12),
    new THREE.MeshBasicMaterial({color:0x77bfd2,transparent:true,opacity:.15,blending:THREE.AdditiveBlending})
  );
  m.position.set(THREE.MathUtils.randFloat(-4,4),THREE.MathUtils.randFloat(-2.5,3),THREE.MathUtils.randFloat(-2,1));
  particles.add(m); dust.push(m);
}

const pointer={x:0,y:0};
addEventListener("pointermove",e=>{
  pointer.x=(e.clientX/innerWidth-.5);
  pointer.y=(e.clientY/innerHeight-.5);
},{passive:true});

const state={p:0};

function render(){
  const t=performance.now()*.001;
  bottle.rotation.y += 0.0018;
  bottle.rotation.x = Math.sin(t*.5)*.025 + pointer.y*.035;
  bottle.rotation.z = Math.sin(t*.35)*.012;
  particles.rotation.y = t*.018;
  particles.rotation.x = Math.sin(t*.16)*.035;
  dust.forEach((m,i)=>{
    m.position.y += Math.sin(t*(.4+i*.02)+i)*.0009;
    m.position.x += Math.cos(t*(.3+i*.01)+i)*.0006;
  });

  camera.position.x += ((pointer.x*.35)-camera.position.x)*.025;
  camera.position.y += ((.25-pointer.y*.2)-camera.position.y)*.025;
  camera.lookAt(0,.2,-.2);

  composer.render();
  requestAnimationFrame(render);
}
render();

const intro=document.querySelector(".scene-copy--intro");
const reveal=document.querySelector(".scene-copy--reveal");
const bottleCopy=document.querySelector(".scene-copy--bottle");
const progressBar=document.querySelector(".scene-progress__bar i");
const progressText=document.querySelector("#progressText");

const tl=gsap.timeline({
  scrollTrigger:{
    trigger:"#hero",
    start:"top top",
    end:"bottom bottom",
    scrub:0.75,
    pin:false,
    invalidateOnRefresh:true,
    onUpdate:self=>{
      state.p=self.progress;
      progressBar.style.width=(self.progress*100)+"%";
      progressText.textContent=String(Math.round(self.progress*99)).padStart(2,"0");
    }
  }
});

tl
.to(leftDoor.rotation,{y:-1.12,duration:.18,ease:"none"},0.03)
.to(rightDoor.rotation,{y:1.12,duration:.18,ease:"none"},0.03)
.to(doorLight,{intensity:850,duration:.16,ease:"none"},0.07)
.to(glowPlane.material,{opacity:.78,duration:.12,ease:"none"},0.08)
.to(glowOrb.material,{opacity:.28,duration:.12,ease:"none"},0.1)
.to(camera.position,{z:8.1,duration:.2,ease:"none"},0.12)
.to(intro,{opacity:0,y:-40,duration:.1,ease:"none"},0.10)
.to(reveal,{opacity:1,y:0,duration:.1,ease:"none"},0.20)
.to(bottle.position,{z:1.25,y:.05,duration:.2,ease:"none"},0.24)
.to(bottle.scale,{x:1.18,y:1.18,z:1.18,duration:.22,ease:"none"},0.24)
.to(bottle.rotation,{y:Math.PI*1.65,duration:.4,ease:"none"},0.24)
.to(camera.position,{z:5.25,duration:.22,ease:"none"},0.42)
.to(bottleCopy,{opacity:1,y:0,duration:.1,ease:"none"},0.52)
.to(bottle.position,{z:2.25,y:-.1,duration:.2,ease:"none"},0.55)
.to(bottle.scale,{x:1.42,y:1.42,z:1.42,duration:.2,ease:"none"},0.55)
.to(camera.position,{z:4.6,duration:.18,ease:"none"},0.68)
.to(doorLight,{intensity:170,duration:.16,ease:"none"},0.72)
.to(glowPlane.material,{opacity:.32,duration:.16,ease:"none"},0.72)
.to(glowOrb.material,{opacity:.08,duration:.16,ease:"none"},0.72)
.to(particles.position,{z:1.2,duration:.2,ease:"none"},0.74);

const lenis = new Lenis({
  duration:1.15,
  smoothWheel:true,
  syncTouch:false,
  wheelMultiplier:.9
});
lenis.on("scroll",()=>ScrollTrigger.update());

function raf(time){
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

addEventListener("resize",()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  const dpr=Math.min(devicePixelRatio,1.7);
  renderer.setPixelRatio(dpr);
  renderer.setSize(innerWidth,innerHeight);
  composer.setPixelRatio(Math.min(devicePixelRatio,1.35));
  composer.setSize(innerWidth,innerHeight);
  ScrollTrigger.refresh();
});

document.querySelector("#soundBtn").addEventListener("click",e=>{
  const active=e.currentTarget.dataset.active==="1";
  e.currentTarget.dataset.active=active?"0":"1";
  e.currentTarget.textContent=active?"SOUND OFF":"SOUND ON";
});

window.addEventListener("load",()=>{
  gsap.to(".loader__line span",{width:"100%",duration:1.2,ease:"power2.inOut",onComplete:()=>{
    setTimeout(()=>{
      document.body.classList.remove("is-loading");
      document.querySelector("#loader").classList.add("is-done");
      ScrollTrigger.refresh();
    },350);
  }});
});
