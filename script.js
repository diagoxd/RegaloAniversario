// ---- Fondo estrellas animadas ----
const canvas = document.querySelector('.universe-bg');
let ctx = canvas.getContext('2d');
let w, h, stars = [];
function resize() { w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h; }
resize();
window.addEventListener('resize', resize);
function Star() {
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.radius = Math.random() * 1.1 + 0.2;
  this.alpha = Math.random() * 0.7 + 0.2;
  this.dx = (Math.random() - 0.5) * 0.12;
  this.dy = (Math.random() - 0.5) * 0.12;
}
for (let i = 0; i < 96; i++) stars.push(new Star());
function drawUniverse() {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff9';
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0) s.x = w;
    if (s.x > w) s.x = 0;
    if (s.y < 0) s.y = h;
    if (s.y > h) s.y = 0;
  }
  requestAnimationFrame(drawUniverse);
}
drawUniverse();

// NAVIGACIÓN por ID
function showPage(id) {
  document.querySelectorAll('.page').forEach(page => {
    if (typeof id === 'string' && page.id === id) {
      page.classList.remove('hidden');
    } else {
      page.classList.add('hidden');
    }
  });
  window.scrollTo(0,0);
  setTimeout(animateOnScroll, 80);
  if(id === 'constellationPage') setTimeout(drawConstellation,350);
}
document.addEventListener("DOMContentLoaded", function(){
  var btnConst = document.getElementById('btn-to-constellation');
  if(btnConst) btnConst.onclick = function(){ showPage('constellationPage'); };
});

// Animación galería paso 1
function updatePhotoProgress() {
  const items = document.querySelectorAll('.photo-item');
  let found = -1;
  items.forEach((el,i)=>{
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight*0.7) found = i;
  });
  document.querySelectorAll('.pb-dot').forEach((el,i)=>{
    if(i <= found) el.classList.add('active'); 
    else el.classList.remove('active');
  });
}
function animateOnScroll() {
  document.querySelectorAll('.anim-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight*0.88) el.classList.add('visible');
    else el.classList.remove('visible');
  });
  updatePhotoProgress();
  parallaxPhotos();
}
function parallaxPhotos() {
  const items = document.querySelectorAll('.parallax-photo.visible');
  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    let center = rect.top + rect.height/2 - window.innerHeight/2;
    el.style.transform = `translateY(${center/22}px) scale(${1 - Math.abs(center)/1000})`;
  });
}
function starfallBetweenPhotos() {
  if (!document.getElementById('page1') || document.getElementById('page1').classList.contains('hidden')) return;
  const gallery = document.querySelector("#page1 .photo-gallery");
  if (!gallery) return;
  let el = document.createElement("span");
  el.className = "starfall-anim";
  el.innerHTML = "✨";
  el.style.position = "absolute";
  el.style.left = (Math.random()*80+10)+"%";
  el.style.top = (Math.random()*90+4)+"%";
  el.style.opacity = .8;
  el.style.fontSize = (1+Math.random()*1.8) + "em";
  gallery.appendChild(el);
  setTimeout(()=>el.remove(),1600+Math.random()*700);
}
setInterval(starfallBetweenPhotos,700);

window.addEventListener('scroll', animateOnScroll, {passive:true});
window.addEventListener('resize', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);
setTimeout(animateOnScroll, 300);

// DECORACION extras
const extrasCont = document.getElementById('decor-extras');
const hearts = ['❤️','💖','💘','💕'];
const cupids = ['🏹','💘'];
const rocketEmoji = '🚀';
function createRocket() {
  const el = document.createElement('span');
  el.className = 'rocket-float';
  el.innerText = rocketEmoji;
  let fromLeft = Math.random() > 0.5;
  let startX = fromLeft ? -60 : window.innerWidth + 60;
  let endX = fromLeft ? window.innerWidth + 60 : -60;
  let top = 40 + Math.random()*window.innerHeight*0.7;
  let rot = fromLeft ? 15 : -15;
  el.style.top = top+'px';
  el.style.left = startX+'px';
  el.style.transform = `rotate(${rot}deg)`;
  extrasCont.appendChild(el);
  let dur = 6000 + Math.random()*3000;
  el.animate([
    { left: startX+'px', opacity: 1 },
    { left: endX+'px', opacity: .7 }
  ], { duration: dur, easing: 'linear' });
  setTimeout(()=> { el.remove(); }, dur-50);
}
setInterval(() => { createRocket(); }, 3400);
setTimeout(() => { createRocket(); }, 1000);

function createHeart() {
  const el = document.createElement('span');
  el.className = 'heart-float' + (Math.random()>0.6?' heart-float2':'');
  el.innerText = hearts[Math.floor(Math.random()*hearts.length)];
  let left = 10 + Math.random()*80;
  let size = 1 + Math.random()*1.3;
  let dur = 3500+Math.random()*1900;
  el.style.left = left+'vw';
  el.style.top = (window.innerHeight-40)+'px';
  el.style.fontSize = `${size+0.4}em`;
  extrasCont.appendChild(el);
  el.animate([
    { top: (window.innerHeight-40)+'px', opacity: 0.7 },
    { top: (window.innerHeight*0.6)+'px', opacity: 0.22, offset: .6},
    { top: '-40px', opacity: 0 }
  ], {duration: dur, easing:'cubic-bezier(.42,2,.54,.98)'});
  setTimeout(()=>el.remove(), dur);
}
setInterval(createHeart, 900);
setTimeout(createHeart, 400);

function createCupid() {
  const el = document.createElement('span');
  el.className = 'cupid-float';
  el.innerText = cupids[Math.floor(Math.random()*cupids.length)];
  let left = 5 + Math.random()*90;
  let top = window.innerHeight - 60 - Math.random()*120;
  el.style.left = left+'vw';
  el.style.top = top+'px';
  let dur = 4800 + Math.random()*3200;
  extrasCont.appendChild(el);
  el.animate([
    { transform: 'translateY(0px) scale(1) rotate(-10deg)', opacity: 1 },
    { transform: 'translateY(-40px) scale(1.2) rotate(8deg)', opacity: .7, offset:0.7 },
    { transform: 'translateY(-120px) scale(.95) rotate(-8deg)', opacity: 0 }
  ], { duration: dur, easing:'cubic-bezier(.42,2,.54,.98)'});
  setTimeout(()=>el.remove(), dur);
}
setInterval(()=>{ if(Math.random()>.55) createCupid(); }, 3200);
setTimeout(createCupid, 2200);

function createTwinkle() {
  const el = document.createElement('span');
  el.className = 'twinkle';
  let left = Math.random()*100;
  let top = Math.random()*100;
  let size = 7+Math.random()*6;
  el.style.left = `${left}vw`;
  el.style.top = `${top}vh`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  extrasCont.appendChild(el);
  setTimeout(()=>el.remove(), 2200+Math.random()*1100);
}
setInterval(()=>{ if(Math.random()>0.38) createTwinkle(); }, 680);
function createShootingStar() {
  const el = document.createElement('span');
  el.className = 'twinkle';
  let left = Math.random()*100;
  let top = 10+Math.random()*40;
  let size = 23 + Math.random()*10;
  el.style.left = `${left}vw`;
  el.style.top = `${top}vh`;
  el.style.width = `${size}px`;
  el.style.height = `3px`;
  el.style.background = 'linear-gradient(90deg, #fffce8 30%, #fff0 100%)';
  el.style.opacity = "0.62";
  el.style.borderRadius = '99px';
  el.style.transform = 'rotate(-24deg)';
  extrasCont.appendChild(el);

  el.animate([
    { left: `${left}vw`, top: `${top}vh`, opacity: 0.82 },
    { left: `${left+12}vw`, top: `${top+2}vh`, opacity: 0 }
  ], {duration: 1370+Math.random()*2600, easing:'cubic-bezier(.65,0,.34,.97)'});
  setTimeout(()=>el.remove(), 1830);
}
setInterval(()=>{ if(Math.random()>.62) createShootingStar(); },1500);

// -- CONSTELACIÓN D + T: ahora bien proporcionada! --
function drawConstellation() {
  const canvas = document.getElementById('constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const w = canvas.width, h = canvas.height;

  // Proporciones óptimas para móvil y desktop
  const alto = h * 0.68;
  const yTop = (h - alto) / 2;
  const yBot = yTop + alto;

  const nCirc = 38; // más puntos, curva más suave

  // Centro de la D pegado a la izquierda, la D es una gran media circunferencia
  const R = alto / 2;
  const centerX = w * 0.18 + R * 0.07; // pegada a la izquierda
  const centerY = (yTop + yBot) / 2;

  const pointsD = [];
  // Recorre desde PI/2 (arriba) hasta -PI/2 (abajo) –> sentido horario, contorno D clásico
  for (let i = 0; i < nCirc; i++) {
    let angle = Math.PI/2 - Math.PI * i / (nCirc - 1); // de arriba a abajo
    // Toques para pegar la curva a la izquierda (más "D"):
    let x = centerX + R * Math.cos(angle);
    if (angle > Math.PI/3 && angle < 2*Math.PI/3) x -= R * 0.11; // ensancha arriba a la izq
    if (angle > -2*Math.PI/3 && angle < -Math.PI/3) x -= R * 0.20; // ensancha abajo a la izq
    let y = centerY + R * Math.sin(angle);
    pointsD.push({ x, y });
  }

  // + bien separado y centrado
  const gapDPlus = w * 0.21;
  const xPlus = centerX + R + gapDPlus;
  const plusSize = alto * 0.14;
  const centerYPlus = centerY;
  const plus = [
    { x: xPlus - plusSize/2, y: centerYPlus }, { x: xPlus + plusSize/2, y: centerYPlus },
    { x: xPlus, y: centerYPlus - plusSize / 2 }, { x: xPlus, y: centerYPlus + plusSize / 2 }
  ];

  // T bien separada
  const gapPlusT = w * 0.19;
  const xT = xPlus + plusSize + gapPlusT;
  const Twidth = R * .93;
  const Ttop = yTop + 1, Tbot = yBot - 1;
  const t = [
    { x: xT - Twidth / 2, y: Ttop }, { x: xT + Twidth / 2, y: Ttop },
    { x: xT, y: Ttop }, { x: xT, y: Tbot }
  ];

  // Un solo array para la D, luego los bloques +
  const all_points = [...pointsD, ...plus, ...t];
  const lines = [
    Array.from({ length: pointsD.length }, (v, k) => k),                   // D completa
    [pointsD.length, pointsD.length + 1],                                 // + horiz
    [pointsD.length + 2, pointsD.length + 3],                             // + vert
    [pointsD.length + 4, pointsD.length + 5],                             // T horiz
    [pointsD.length + 6, pointsD.length + 7]                              // T vert
  ];

  let progress = 0;
  function render() {
    ctx.clearRect(0, 0, w, h);
    for(let i=0;i<18;i++) {
      const sx = Math.random()*w;
      const sy = Math.random()*h;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.random()*0.8+0.2, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fill();
    }
    ctx.strokeStyle = '#ffe591b8';
    ctx.lineWidth = 2.1;
    ctx.save();

    // D entera, continua
    let drawn = Math.min(pointsD.length, Math.floor(progress) + 1);
    if (drawn >= 2) {
      ctx.beginPath();
      for (let p = 0; p < drawn; p++) {
        let { x, y } = pointsD[p];
        if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // + y T
    let groupIndex = pointsD.length;
    for (let blk = 1; blk < lines.length; blk++) {
      const pts = lines[blk].map(idx => all_points[idx]);
      let dr = Math.min(pts.length, Math.max(0, Math.floor(progress) - groupIndex + 1));
      if (dr >= 2) {
        ctx.beginPath();
        for (let p = 0; p < dr; p++) {
          let { x, y } = pts[p];
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      groupIndex += pts.length;
    }
    ctx.restore();

    // Puntos brillan
    let total = all_points.length;
    for (let i = 0; i < total && i < progress; i++) {
      let { x, y } = all_points[i];
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      let shine = (Math.sin(Date.now() / 284 + i * 2.1) + 1) * 0.35 + 0.68;
      ctx.fillStyle = `rgba(255,236,172,${shine})`;
      ctx.shadowColor = "#fff7c8";
      ctx.shadowBlur = 7;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    // Puntos pulsan
    if (progress >= total) {
      for (let i = 0; i < total; i++) {
        let { x, y } = all_points[i];
        if ((Date.now() / 900 + i) % 1 > 0.85) {
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.11)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }
  }
  function step() {
    progress += 0.13;
    render();
    if (progress < all_points.length) {
      requestAnimationFrame(step);
    } else {
      render();
      setTimeout(() => { document.getElementById('constellation-next').classList.add('visible'); }, 700);
    }
  }
  document.getElementById('constellation-next').classList.remove('visible');
  requestAnimationFrame(step);
}
window.addEventListener("resize", function () {
  if (!document.getElementById("constellationPage").classList.contains("hidden")) {
    setTimeout(drawConstellation, 60);
  }
});