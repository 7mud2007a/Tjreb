import * as THREE from "https://esm.sh/three@0.180.0";
import {RoundedBoxGeometry} from "https://esm.sh/three@0.180.0/examples/jsm/geometries/RoundedBoxGeometry.js?deps=three@0.180.0";
import gsap from "https://esm.sh/gsap@3.13.0";
import {ScrollTrigger} from "https://esm.sh/gsap@3.13.0/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

const canvas=document.querySelector('#stage');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});}catch(e){document.querySelector('.loader__sub').textContent='WEBGL UNAVAILABLE';throw e}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x020304);
const camera=new THREE.PerspectiveCamera(29,innerWidth/innerHeight,.1,100);camera.position.set(0,.15,10.8);
const world=new THREE.Group();scene.add(world);
scene.add(new THREE.HemisphereLight(0xaec5d0,0x010203,.45));
const key=new THREE.DirectionalLight(0xd9f1ff,2.2);key.position.set(-4,5,7);scene.add(key);
const rim=new THREE.PointLight(0x0b7897,7,14);rim.position.set(4,1,2);scene.add(rim);
const threshold=new THREE.PointLight(0xffffff,0,18);threshold.position.set(0,.2,-2.6);scene.add(threshold);

function gradientTexture(){const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');const g=x.createRadialGradient(256,256,10,256,256,256);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.22,'rgba(255,255,255,.75)');g.addColorStop(.55,'rgba(210,245,255,.18)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,512,512);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const glowTex=gradientTexture();
const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xffffff,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));glow.position.set(0,.25,-2.25);glow.scale.set(9,9,1);world.add(glow);

// Deep doorway / threshold
const chamber=new THREE.Mesh(new THREE.BoxGeometry(7.6,7.1,2.2),new THREE.MeshStandardMaterial({color:0x010203,roughness:.96,metalness:.05}));chamber.position.set(0,.2,-2.8);world.add(chamber);
const chamberFloor=new THREE.Mesh(new THREE.PlaneGeometry(7.6,4.8),new THREE.MeshStandardMaterial({color:0x071014,roughness:.7,metalness:.15}));chamberFloor.rotation.x=-Math.PI/2;chamberFloor.position.set(0,-3.25,-2.3);world.add(chamberFloor);

function door(side){
  const pivot=new THREE.Group();pivot.position.x=side*3.86;pivot.position.y=.25;pivot.position.z=-1.25;
  const mat=new THREE.MeshPhysicalMaterial({color:0x070b0d,roughness:.25,metalness:.72,clearcoat:.5,clearcoatRoughness:.16});
  const panel=new THREE.Mesh(new RoundedBoxGeometry(3.86,7.15,.34,12,.12),mat);panel.position.x=-side*1.93;pivot.add(panel);
  // recessed architectural lines
  const lineMat=new THREE.MeshStandardMaterial({color:0x243138,metalness:.8,roughness:.28});
  for(let i=0;i<5;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.035,6.35,.045),lineMat);l.position.set(-side*(.5+i*.62),0,.205);panel.add(l)}
  world.add(pivot);return pivot;
}
const left=door(-1),right=door(1);
const frameMat=new THREE.MeshStandardMaterial({color:0x10171a,metalness:.82,roughness:.22});
const top=new THREE.Mesh(new THREE.BoxGeometry(8.25,.34,.5),frameMat);top.position.set(0,3.85,-1.25);world.add(top);
const fl=new THREE.Mesh(new THREE.BoxGeometry(.34,7.4,.5),frameMat);fl.position.set(-4.03,.25,-1.25);const fr=fl.clone();fr.position.x=4.03;world.add(fl,fr);

// Ground reflection
const ground=new THREE.Mesh(new THREE.PlaneGeometry(28,28),new THREE.MeshStandardMaterial({color:0x020506,roughness:.3,metalness:.35}));ground.rotation.x=-Math.PI/2;ground.position.y=-3.28;world.add(ground);

function greekTexture(){const c=document.createElement('canvas');c.width=1024;c.height=1024;const x=c.getContext('2d');x.fillStyle='#063d47';x.fillRect(0,0,1024,1024);x.strokeStyle='rgba(0,0,0,.72)';x.lineWidth=22;const s=88;for(let y=12;y<1024;y+=s){for(let xx=12;xx<1024;xx+=s){x.beginPath();x.moveTo(xx,y);x.lineTo(xx+s*.62,y);x.lineTo(xx+s*.62,y+s*.35);x.lineTo(xx+s*.18,y+s*.35);x.lineTo(xx+s*.18,y+s*.77);x.lineTo(xx+s*.9,y+s*.77);x.stroke()}}x.fillStyle='#d7bd73';x.font='600 73px Inter,Arial';x.textAlign='center';x.fillText('VERSACE',512,815);x.font='600 40px Inter,Arial';x.fillText('EROS',512,870);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
function createBottle(){
 const g=new THREE.Group();
 const glass=new THREE.MeshPhysicalMaterial({color:0x063e49,roughness:.11,metalness:.2,transmission:.12,thickness:.7,clearcoat:1,clearcoatRoughness:.07});
 const body=new THREE.Mesh(new RoundedBoxGeometry(3.55,4.15,.9,14,.24),glass);body.position.y=-.25;g.add(body);
 const face=new THREE.Mesh(new RoundedBoxGeometry(3.23,3.84,.08,10,.12),new THREE.MeshPhysicalMaterial({map:greekTexture(),roughness:.18,metalness:.25,clearcoat:.8,clearcoatRoughness:.08}));face.position.set(0,-.25,.49);g.add(face);
 const gold=new THREE.MeshStandardMaterial({color:0xc3a04e,metalness:.95,roughness:.16});
 const medusa=new THREE.Mesh(new THREE.CircleGeometry(.48,64),new THREE.MeshStandardMaterial({color:0x245b5e,metalness:.65,roughness:.2}));medusa.position.set(0,.48,.535);g.add(medusa);
 const neck=new THREE.Mesh(new THREE.CylinderGeometry(.58,.58,.38,64),gold);neck.position.y=1.95;g.add(neck);
 const cap=new THREE.Mesh(new THREE.CylinderGeometry(.68,.68,1.42,64),new THREE.MeshPhysicalMaterial({color:0x07516c,metalness:.5,roughness:.13,clearcoat:.55}));cap.position.y=2.85;g.add(cap);
 const capTop=new THREE.Mesh(new THREE.CylinderGeometry(.67,.51,.2,64),gold);capTop.position.y=3.61;g.add(capTop);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.62,.065,18,64),gold);ring.rotation.x=Math.PI/2;ring.position.y=2.16;g.add(ring);
 // tiny contact shadow under bottle
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(1.35,64),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.5}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-2.34;shadow.scale.set(1,.35,1);g.add(shadow);
 g.scale.setScalar(.78);g.position.set(0,-.05,-4.0);g.rotation.y=-.35;return g;
}
const bottle=createBottle();world.add(bottle);

// Soft beams and particles inside the door
const beamGroup=new THREE.Group();world.add(beamGroup);
for(let i=-3;i<=3;i++){
 const b=new THREE.Mesh(new THREE.PlaneGeometry(.85,7),new THREE.MeshBasicMaterial({map:glowTex,color:0xdff8ff,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));b.position.set(i*1.05,.1,-2.05);b.rotation.z=i*.055;beamGroup.add(b);
}
const count=innerWidth<800?380:720;const pos=new Float32Array(count*3);for(let i=0;i<count;i++){const r=THREE.MathUtils.randFloat(1.8,6.5),a=Math.random()*Math.PI*2;pos[i*3]=Math.cos(a)*r;pos[i*3+1]=THREE.MathUtils.randFloat(-3,4);pos[i*3+2]=THREE.MathUtils.randFloat(-5,1)}const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x9edceb,size:.035,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false}));world.add(particles);

const mouse={x:0,y:0};addEventListener('pointermove',e=>{mouse.x=e.clientX/innerWidth-.5;mouse.y=e.clientY/innerHeight-.5},{passive:true});
const state={p:0};
const start=document.querySelector('.copy--start'),thresholdCopy=document.querySelector('.copy--threshold'),productCopy=document.querySelector('.copy--product');
const tl=gsap.timeline({scrollTrigger:{trigger:'#scene',start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true,onUpdate:s=>{state.p=s.progress;document.querySelector('#progress').style.width=(s.progress*100)+'%';document.querySelector('#percent').textContent=String(Math.round(s.progress*100)).padStart(2,'0')}}});
tl.to(left.rotation,{y:-1.28,duration:.18,ease:'none'},.05).to(right.rotation,{y:1.28,duration:.18,ease:'none'},.05)
.to(threshold,{intensity:1100,duration:.16,ease:'none'},.09).to(glow.material,{opacity:.52,duration:.14,ease:'none'},.1)
.to(beamGroup.children.map(m=>m.material),{opacity:.13,duration:.12,ease:'none',stagger:.01},.11)
.to(camera.position,{z:9.5,y:.1,duration:.18,ease:'none'},.13)
.to(start,{opacity:0,y:-45,duration:.1,ease:'none'},.12)
.to(thresholdCopy,{opacity:1,y:0,duration:.11,ease:'none'},.22)
.to(bottle.position,{z:-1.05,y:-.03,duration:.22,ease:'none'},.27)
.to(bottle.rotation,{y:Math.PI*1.65,duration:.42,ease:'none'},.27)
.to(camera.position,{z:8.2,duration:.2,ease:'none'},.35)
.to(bottle.rotation,{y:Math.PI*3.0,duration:.3,ease:'none'},.48)
.to(bottle.position,{z:.05,y:-.02,duration:.2,ease:'none'},.54)
.to(productCopy,{opacity:1,y:0,duration:.1,ease:'none'},.58)
.to(bottle.rotation,{y:Math.PI*3.7,duration:.28,ease:'none'},.6)
.to(camera.position,{z:7.55,duration:.2,ease:'none'},.63)
.to(threshold,{intensity:420,duration:.16,ease:'none'},.73).to(glow.material,{opacity:.22,duration:.16,ease:'none'},.73)
.to(beamGroup.children.map(m=>m.material),{opacity:.05,duration:.16,ease:'none'},.73);

function frame(t){const time=t*.001;bottle.rotation.x=Math.sin(time*.55)*.018+mouse.y*.025;bottle.rotation.z=Math.sin(time*.35)*.009;particles.rotation.y=time*.012;particles.rotation.x=Math.sin(time*.2)*.025;camera.position.x+=(mouse.x*.18-camera.position.x)*.025;camera.lookAt(0,.15,-.5);renderer.render(scene,camera);requestAnimationFrame(frame)}requestAnimationFrame(frame);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);ScrollTrigger.refresh()});
addEventListener('load',()=>{gsap.to('.loader__track i',{width:'100%',duration:1.1,ease:'power2.inOut',onComplete:()=>{gsap.delayedCall(.25,()=>document.querySelector('#loader').classList.add('done'))}})});
