const PHOTOS=[
["images/photo-01.jpg","Selfie on the steps",1],["images/photo-02.jpg","Flowers and paper hearts"],["images/photo-03.jpg","Goofing around outside"],["images/photo-04.jpg","The whole class"],
["images/photo-05.jpg","Streamers and polaroids"],["images/photo-06.jpg","Another group pic"],["images/photo-07.jpg","In our classroom"],["images/photo-08.jpg","Career day"],
["images/photo-09.jpg","Strike a pose!"],["images/photo-10.jpg","Cafe hangout",1],["images/photo-11.jpg","A gift for you"],["images/photo-12.jpg","Balloons!"],["images/photo-13.jpg","Boodle fight!"]];
const $=s=>document.querySelector(s),sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* intro letters */
"Ma'am Jame".split("").forEach((c,i)=>{const s=document.createElement("span");s.textContent=c===" "?"\u00A0":c;s.style.animationDelay=(.3+i*.09)+"s";$("#ih").appendChild(s)});
/* streamers + gallery */
const wall=$("#wall");
PHOTOS.forEach((p,i)=>{const d=document.createElement("div");d.className="hang";
d.style.setProperty("--h",(30+(i*47)%70)+"px");d.style.setProperty("--d",-(i*1.3)+"s");
d.innerHTML=`<div class="pol ${p[2]?"p":""}" style="--t:${(i%2?1:-1)*(1+i%3)}deg"><img src="${p[0]}" alt="${p[1]}" loading="lazy"></div>`;
d.onclick=()=>{$("#lbi").src=p[0];$("#lbi").alt=p[1];$("#lb").classList.add("on")};
wall.appendChild(d)});
$("#lb").onclick=()=>$("#lb").classList.remove("on");
document.addEventListener("keydown",e=>e.key==="Escape"&&$("#lb").classList.remove("on"));
const hero=$("#hero");
for(let i=0;i<9;i++){const s=document.createElement("div");s.className="str";s.style.left=(i*12+2)+"%";s.style.height=(80+(i*37)%160)+"px";s.style.background=i%2?"var(--cream)":"var(--brown)";s.style.setProperty("--r",(i%2?4:-4)+"deg");s.style.animationDelay=-i+"s";hero.appendChild(s)}
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".hang,.fade").forEach((e,i)=>{e.style.transitionDelay=(e.classList.contains("hang")?(i%3)*.15:0)+"s";io.observe(e)});
/* canvas fx */
const cv=$("#fx"),cx=cv.getContext("2d");let W,H,P=[];
function rs(){const r=devicePixelRatio||1;W=cv.width=innerWidth*r;H=cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0);W=innerWidth;H=innerHeight}rs();addEventListener("resize",rs);
const SYM=["♥","★","✧","✦","✿"],COL=["#4cc9ff","#8a7bff","#ffffff","#a8e0ff","#3b82f6"];
function amb(){return{k:"a",x:Math.random()*W,y:H+20,vx:(Math.random()-.5)*.4,vy:-(.4+Math.random()*.9),s:10+Math.random()*16,c:COL[Math.random()*5|0],t:SYM[Math.random()*4|0],a:.5,l:1e9,r:Math.random()*6}}
function burst(x,y,n=120){for(let i=0;i<n;i++){const a=Math.random()*6.283,v=4+Math.random()*10;P.push({k:"c",x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-6,s:6+Math.random()*8,c:COL[Math.random()*5|0],t:Math.random()<.3?"♥":"■",a:1,l:110+Math.random()*60,r:Math.random()*6})}}
for(let i=0;i<22;i++){const p=amb();p.y=Math.random()*H;P.push(p)}
let tick=0;
function loop(){cx.clearRect(0,0,W,H);tick++;if(tick%22===0&&P.filter(p=>p.k==="a").length<34)P.push(amb());
for(const p of P){p.x+=p.vx;p.y+=p.vy;p.r+=.03;
if(p.k==="c"){p.vy+=.35;p.vx*=.985;p.l--;p.a=Math.min(1,p.l/40)}
else if(p.k==="s"){p.l--;p.a=p.l/30;p.vy+=.05}
else{p.x+=Math.sin(p.r)*.4}
cx.globalAlpha=Math.max(p.a,0);cx.fillStyle=p.c;cx.font=p.s+"px serif";cx.save();cx.translate(p.x,p.y);cx.rotate(p.k==="c"?p.r:0);cx.fillText(p.t,0,0);cx.restore()}
P=P.filter(p=>p.l>0&&p.y>-40&&p.y<H+60);requestAnimationFrame(loop)}loop();
addEventListener("pointermove",e=>{if(tick%3===0)P.push({k:"s",x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*1.5,vy:Math.random()*-1,s:8+Math.random()*8,c:"#4cc9ff",t:"✦",a:1,l:30,r:0})});
/* typing */
async function type(el,t,sp=70){for(const c of t){el.textContent+=c;await sleep(sp)}}
$("#open").onclick=async e=>{const b=e.target.getBoundingClientRect();burst(b.left+b.width/2,b.top,160);
$("#intro").classList.add("go");document.body.classList.remove("lock");
await sleep(900);await type($("#l1"),"Happy Teachers' Day,",55);await sleep(200);await type($("#h1"),"Ma'am Jame!",110);
$("#h1").classList.remove("cur");burst(innerWidth/2,innerHeight/2.3,140)};
/* card tilt */
const card=$("#card");card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`});
card.addEventListener("pointerleave",()=>card.style.transform="");