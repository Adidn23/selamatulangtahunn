/* Ganti isi di bawah ini dengan cerita kamu sendiri. */
const D={
  nama:'Ayah',
  dari:'Anakmu',
  lahir:'2006-07-23',
  wa:'6285947274203',
  amplop:[
    {k:'Ayah lelah',t:'Istirahat dulu ya, Yah. Semua yang Ayah lakukan sudah lebih dari cukup. Kami bangga.'},
    {k:'Ayah kangen',t:'Telepon aku kapan saja, Yah. Aku selalu punya waktu untuk Ayah, sesibuk apa pun.'},
    {k:'Ayah ragu',t:'Ayah yang mengajariku berani. Percayalah, keputusan Ayah selalu lahir dari hati.'}
  ],
  balas:['Terima kasih ya, Nak. Ayah sayang kamu.','Ayah terharu sekali. Terima kasih hadiahnya!','Ayah sayang kalian semua.'],
  surat:[
    'Ayah, terima kasih sudah selalu ada, bahkan di hari-hari ketika Ayah sendiri sedang lelah.',
    'Banyak hal yang baru kumengerti setelah dewasa: kenapa Ayah pulang larut, kenapa Ayah diam saat aku bersikeras, dan kenapa Ayah selalu bilang “nanti juga mengerti”.',
    'Hari ini giliran aku yang bilang: aku bangga jadi anak Ayah. Panjang umur dan sehat selalu.'
  ],
  ajar:[
    ['Sabar','Ayah tidak pernah terburu-buru, dan hasilnya selalu lebih baik.'],
    ['Bertanggung jawab','Dari Ayah aku belajar bahwa janji itu ditepati, bukan dilupakan.'],
    ['Bercanda','Candaan Ayah yang receh tetap jadi yang paling kutunggu.']
  ],
  pesan:[
    ['Ibu','Terima kasih sudah jadi tempat kami pulang.'],
    ['Kakak','Ayah, jangan lupa istirahat. Kami sayang Ayah.'],
    ['Adik','Ayah juara satu di hati kami.']
  ],
  foto:[
    {src:'',cap:'Liburan keluarga',desc:'Perjalanan jauh yang selalu Ayah pastikan aman sampai tujuan.'},
    {src:'',cap:'Hari wisudaku',desc:'Ayah paling bangga hari itu, meski pura-pura tidak menangis.'},
    {src:'',cap:'Memancing bareng',desc:'Sabar menunggu, itu pelajaran pertama yang Ayah beri.'},
    {src:'',cap:'Tahun baru di rumah',desc:'Sederhana, tapi selalu terasa paling hangat.'},
    {src:'',cap:'Makan malam favorit',desc:'Menu yang Ayah pesan itu-itu saja, dan kami semua hafal.'},
    {src:'',cap:'Foto bersama hari ini',desc:'Satu foto lagi untuk disimpan, Ayah.'}
  ],
  kupon:{depan:'Ada satu hadiah lagi. Ketuk kartunya.',judul:'Kupon makan bareng',isi:'Di tempat favorit Ayah. Ayah yang pilih, aku yang traktir.'}
};
const $=s=>document.querySelector(s);
$('#cd').innerHTML=[150,180,210].map((x,i)=>`<rect x="${x-5}" y="126" width="10" height="46" rx="2" fill="url(#cs)"/><path d="M${x} 126v-4" stroke="#3a3a3a" stroke-width="1.5"/><g transform="translate(${x} 122)" style="--d:-${i*.07}s;--i:${.5+i*.4}s"><circle class="gl" r="32" cy="-20" fill="url(#g)"/><g class="fw"><path class="fl" d="M0 0C9-10 9-22 0-34-9-22-9-10 0 0z" fill="#F29A1F"/><path class="fl" d="M0 0C4-5 4-11 0-17-4-11-4-5 0 0z" fill="#FFE9A8"/></g><circle class="sm" r="6" cy="-10" fill="#9AA0BD"/></g>`).join('');
$('#letter').innerHTML=D.surat.map((p,i)=>`<p class="ln" style="--d:${i*.3}s">${p}</p>`).join('')+`<p class="ln sig" style="--d:${D.surat.length*.3}s">— ${D.dari}</p>`;
$('#tl').innerHTML=D.ajar.map((a,i)=>`<li style="--d:${.5+i*.6}s"><h3>${a[0]}</h3><p class="mut">${a[1]}</p></li>`).join('');
$('#foto').innerHTML=D.foto.map((f,i)=>`<div class="pw" style="--r:${[-4,3,-3,4,-3,2][i%6]}deg"><figure class="pol">${f.src?`<img src="${f.src}" alt="${f.cap}">`:`<div class="ph"><span>Foto ${i+1}</span></div>`}</figure><div class="tx"><h3>${f.cap}</h3><p class="mut">${f.desc}</p></div></div>`).join('');
$('#msgs').innerHTML=D.pesan.map(p=>`<article class="msg"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('');
$('#front').textContent=D.kupon.depan;$('#kt').textContent=D.kupon.judul;$('#kk').textContent=D.kupon.isi;
$('#end').textContent=`Dengan sayang, ${D.dari}.`;

const m=$('#m'),h=$('#h1'),go=$('#go'),st=$('#st'),cake=$('#cake');let out=false,stream=null;
function swap(t){h.style.opacity=0;setTimeout(()=>{h.textContent=t;h.style.opacity=1},450)}
function blow(){
  if(out)return;out=true;
  if(stream)stream.getTracks().forEach(t=>t.stop());
  cake.style.setProperty('--b',0);
  $('#hero').classList.add('out');
  confetti();swap(`Selamat ulang tahun, ${D.nama}!`);
  st.textContent='';$('#tap').hidden=true;
  go.textContent='Lanjut ke suratnya';go.disabled=false;
  m.classList.remove('locked');
}
async function listen(){
  go.disabled=true;
  try{
    const ac=new(window.AudioContext||window.webkitAudioContext)();
    stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
    await ac.resume();
    const an=ac.createAnalyser();an.fftSize=512;ac.createMediaStreamSource(stream).connect(an);
    const buf=new Uint8Array(an.fftSize);let n=0,base=0,hits=0;
    st.textContent='Mendengarkan… dekatkan HP ke bibir lalu tiup.';go.textContent='Mendengarkan…';
    (function tick(){
      if(out)return;
      an.getByteTimeDomainData(buf);
      let s=0;for(const v of buf){const d=(v-128)/128;s+=d*d}
      const r=Math.sqrt(s/buf.length);
      if(n<20){base+=r/20;n++}
      else{
        const thr=Math.max(.1,base*3+.05);
        hits=r>thr?hits+1:Math.max(0,hits-2);
        cake.style.setProperty('--b',Math.min(1,r*4));
        if(hits>=14){blow();return}
      }
      requestAnimationFrame(tick);
    })();
  }catch(e){
    go.disabled=false;go.textContent='Tiup lewat mikrofon';
    st.textContent='Mikrofon tidak bisa diakses di sini. Buka tautan ini langsung di browser, atau ketuk lilinnya.';
  }
}
go.onclick=()=>out?$('#surat').scrollIntoView({behavior:'smooth'}):listen();
$('#tap').onclick=blow;cake.onclick=blow;
$('#card').onclick=e=>{const c=e.currentTarget,o=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',o);if(o)confetti()};

/* Aksesoris: gambar vektor kecil yang disebar di tiap bagian */
const pet=(n,cy,rx,ry,fl,st,o=0)=>Array.from({length:n},(_,i)=>`<ellipse cy='${cy}' rx='${rx}' ry='${ry}' fill='${fl}' stroke='${st}' stroke-width='1.2' transform='rotate(${o+i*360/n})'/>`).join('');
const S={
flower:`<g transform='translate(50 50)'><g fill='#7C8A6A' stroke='#5E6A52'><ellipse cy='-36' rx='7' ry='16' transform='rotate(40)'/><ellipse cy='-36' rx='7' ry='16' transform='rotate(150)'/><ellipse cy='-36' rx='7' ry='16' transform='rotate(-70)'/></g>${pet(6,-20,13,22,'#F6F0E1','#CDBF9F')}${pet(6,-11,8,14,'#EFE5CC','#CDBF9F',30)}<circle r='6' fill='#D8C58F' stroke='#B8A56E'/><circle r='2' fill='#B8A56E'/></g>`,
bird:`<path d='M14 58C28 44 50 42 66 48C72 38 82 34 92 36C88 44 82 48 76 50C70 64 50 72 30 68C22 66 18 62 14 58Z' fill='#E9E1CF' stroke='#B5A98A' stroke-width='1.5'/><path d='M40 50C50 32 68 24 84 24C76 38 62 50 46 58Z' fill='#F6F0E1' stroke='#B5A98A' stroke-width='1.5'/><path d='M16 58L3 70L24 66Z' fill='#CFC3A5'/><path d='M92 36L99 38L92 41Z' fill='#C9A24A'/><circle cx='80' cy='38' r='1.6' fill='#3A2F26'/>`,
pin:`<g fill='none' stroke='#D2D3D9' stroke-width='3.5' stroke-linecap='round'><path d='M16 78C2 66 10 44 28 52L86 82'/><path d='M28 52L70 30C80 26 88 36 80 44L34 70'/><circle cx='20' cy='70' r='4' stroke-width='3'/></g>`,
heart:`<path d='M50 90C14 64 6 38 22 22C34 10 48 18 50 30C52 18 66 10 78 22C94 38 86 64 50 90Z' fill='#D2D3D9' stroke='#8E8F98' stroke-width='3'/><path d='M50 78C26 60 20 42 30 32C38 24 47 29 50 37C53 29 62 24 70 32C80 42 74 60 50 78Z' fill='#2B2527'/><path d='M50 62C38 52 36 44 42 40C46 37 49 40 50 43C51 40 54 37 58 40C64 44 62 52 50 62Z' fill='#F4EEDF' opacity='.85'/><circle cx='50' cy='8' r='6' fill='none' stroke='#D2D3D9' stroke-width='3'/>`,
seal:`<circle cx='50' cy='50' r='38' fill='#7A2433'/><circle cx='50' cy='50' r='30' fill='none' stroke='#5E1824' stroke-width='4'/>${pet(5,-12,7,9,'#9B3345','#5E1824').replace(/<ellipse/g,'<ellipse transform-origin="50 50"')}<circle cx='50' cy='50' r='5' fill='#5E1824'/>`,
stamp:`<rect x='14' y='8' width='72' height='84' fill='#EFE6CF' stroke='#CFC3A5' stroke-dasharray='3 3'/><rect x='22' y='16' width='56' height='68' fill='none' stroke='#7A2433' stroke-width='1.5'/><text x='50' y='42' text-anchor='middle' font-family='Pinyon Script,cursive' font-size='18' fill='#7A2433'>${D.nama}</text><circle cx='50' cy='58' r='6' fill='none' stroke='#7A2433'/><path d='M30 72h40M34 78h32' stroke='#7A2433' stroke-width='1.5'/>`,
bow:`<path d='M50 50C26 24 6 34 12 56C18 74 40 62 50 50Z M50 50C74 24 94 34 88 56C82 74 60 62 50 50Z' fill='#7A2433' stroke='#5E1824' stroke-width='2'/><path d='M48 54L34 92L46 84L50 94L54 84L66 92L52 54Z' fill='#6A1F2C'/><circle cx='50' cy='50' r='8' fill='#5E1824'/><path d='M22 44C30 46 38 48 44 50M78 44C70 46 62 48 56 50' stroke='#9B3345' stroke-width='1.5' fill='none'/>`,
tag:`<path d='M30 20h40l8 12v62H22V32z' fill='#F2EAD8' stroke='#CFC3A5' stroke-width='1.5'/><circle cx='50' cy='32' r='4' fill='#231F20'/><path d='M50 32C50 14 70 8 78 2' stroke='#C9A24A' stroke-width='2' fill='none'/><text x='50' y='66' text-anchor='middle' font-family='Pinyon Script,cursive' font-size='20' fill='#6E1F2B'>${D.nama}</text><text x='50' y='82' text-anchor='middle' font-family='Patrick Hand,cursive' font-size='9' fill='#3A2F26'>tersayang</text>`,
sprig:`<g fill='#7C8A6A' stroke='#5E6A52'><path d='M50 98C50 70 50 40 50 6' fill='none' stroke-width='2'/>${[0,1,2,3,4].map(i=>`<ellipse cy='-11' rx='5.5' ry='12' transform='translate(50 ${84-i*16}) rotate(${i%2?42:-42})'/>`).join('')}</g>`
};
[['hero','flower',150,'left:-44px;top:70px','-12'],['hero','pin',90,'left:12px;top:34px','-25'],['hero','tag',84,'right:6px;top:32px','8'],['hero','bird',70,'left:16%;top:26%','-8'],['hero','bird',48,'left:30%;top:20%','6',-1],['hero','flower',120,'right:-40px;bottom:60px','14'],['hero','sprig',90,'right:40px;bottom:118px','24'],['hero','flower',90,'left:-20px;bottom:50px','20'],['hero','bow',80,'left:18%;bottom:24px','-6'],
['surat','heart',110,'right:-10px;top:86px','14'],['surat','stamp',84,'left:4px;top:56px','-14'],['surat','flower',130,'left:-40px;bottom:70px','10'],['surat','bow',92,'right:18px;bottom:16px','8'],['surat','sprig',90,'left:60px;bottom:40px','-24'],
['ajar','flower',130,'right:-40px;top:56px','12'],['ajar','bird',66,'left:10px;top:72px','-8'],['ajar','sprig',90,'left:-4px;bottom:36px','-12'],['ajar','flower',90,'left:34px;bottom:24px','-10'],
['kenang','bow',88,'right:8px;top:40px','10'],['kenang','pin',84,'left:6px;top:50px','50'],['kenang','stamp',78,'right:8px;bottom:96px','10'],['kenang','flower',110,'left:-36px;bottom:16px','-8'],
['pesan','flower',110,'left:-34px;top:46px','-10'],['pesan','bird',72,'right:12px;top:70px','8',-1],['pesan','heart',100,'right:-10px;bottom:36px','-12'],['pesan','sprig',80,'left:60px;bottom:30px','16'],
['hadiah','flower',130,'left:-34px;top:50px','-10'],['hadiah','flower',140,'right:-44px;bottom:70px','16'],['hadiah','bird',68,'right:14%;top:64px','8',-1],['hadiah','bow',86,'left:12px;bottom:60px','-8'],['hadiah','seal',70,'left:10%;bottom:30%','-10'],['hadiah','sprig',80,'right:46px;bottom:56px','-18']
].forEach(([id,k,w,pos,r,f])=>$('#'+id).insertAdjacentHTML('beforeend',`<svg class='dc' viewBox='0 0 100 100' width='${w}' height='${w}' style='${pos};--r:${r}deg;--f:${f||1};--t:${(5+Math.random()*3).toFixed(1)}s' aria-hidden='true'>${S[k]}</svg>`));

$('#amp').innerHTML=D.amplop.map(a=>`<button class='env' type='button' aria-expanded='false'><span class='fp'></span><span class='lt'><b>${D.nama} tersayang,</b>${a.t}</span><span class='bd'><span>Buka kalau ${a.k}</span></span><span class='sl'>\u2740</span></button>`).join('');
document.querySelectorAll('.env').forEach(b=>b.onclick=()=>{const o=b.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.env').forEach(x=>x.setAttribute('aria-expanded','false'));b.setAttribute('aria-expanded',o)});

const days=Math.max(0,Math.floor((Date.now()-new Date(D.lahir))/864e5));
$('#sub').textContent=`kira-kira ${Math.floor(days/365.25)} tahun ${Math.floor(days%365.25/30.44)} bulan`;
new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.disconnect();const el=$('#num'),t0=performance.now(),fin=()=>el.textContent=days.toLocaleString('id-ID');if(matchMedia('(prefers-reduced-motion:reduce)').matches)return fin();(function f(t){const p=Math.min(1,(t-t0)/2200);el.textContent=Math.round(days*(1-Math.pow(1-p,3))).toLocaleString('id-ID');if(p<1)requestAnimationFrame(f);else fin()})(t0)}),{threshold:.5}).observe($('#num'));

let msg=D.balas[0];const wa=$('#wa'),link=()=>wa.href=`https://wa.me/${D.wa}?text=${encodeURIComponent(msg)}`;
$('#chips').innerHTML=D.balas.map((b,i)=>`<button class='chip' type='button' aria-pressed='${i==0}'>${b}</button>`).join('');
document.querySelectorAll('.chip').forEach((c,i)=>c.onclick=()=>{msg=D.balas[i];document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));link()});link();

[['hitung','flower',130,'right:-40px;top:56px','10'],['hitung','bird',64,'left:12px;top:70px','-8'],['hitung','sprig',80,'left:-6px;bottom:36px','-14'],['amplop','flower',120,'left:-36px;top:50px','-10'],['amplop','bow',86,'right:10px;top:46px','8'],['amplop','pin',80,'right:14px;bottom:50px','30'],['balas','flower',130,'right:-40px;top:50px','12'],['balas','heart',90,'left:6px;bottom:40px','-10'],['balas','bird',60,'left:14px;top:70px','-6']].forEach(([id,k,w,pos,r,f])=>$('#'+id).insertAdjacentHTML('beforeend',`<svg class='dc' viewBox='0 0 100 100' width='${w}' height='${w}' style='${pos};--r:${r}deg;--f:${f||1};--t:${(5+Math.random()*3).toFixed(1)}s' aria-hidden='true'>${S[k]}</svg>`));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.35});
document.querySelectorAll('.ln,#tl,.pw').forEach(el=>io.observe(el));

function confetti(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const c=$('#cf'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;
  const cols=['#B8892D','#1E2B5E','#7A4B2A','#E2B84F','#C95F6B'];
  const p=Array.from({length:150},()=>({x:innerWidth/2,y:innerHeight*.5,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,s:Math.random()*7+4,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:cols[Math.random()*5|0]}));
  let t=0;
  (function f(){
    x.clearRect(0,0,c.width,c.height);
    p.forEach(q=>{q.vy+=.35;q.vx*=.99;q.x+=q.vx;q.y+=q.vy;q.r+=q.vr;x.save();x.translate(q.x,q.y);x.rotate(q.r);x.fillStyle=q.c;x.fillRect(-q.s/2,-q.s/4,q.s,q.s/2);x.restore()});
    if(++t<170)requestAnimationFrame(f);else x.clearRect(0,0,c.width,c.height);
  })();
}

/* kreatif.js — lapisan gerak & kejutan. Dimuat SETELAH script.js. */
(function(){
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const buzz=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(_){}};
document.documentElement.classList.add('kx');

/* 1. Judul tiap bagian muncul saat terlihat */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('kx-in');io.unobserve(e.target)}}),{threshold:.4});
document.querySelectorAll('section:not(#hero) h2').forEach(h=>io.observe(h));

/* 2. Latar malam elegan (gaya ada di style.css); warna aurora bergeser halus mengikuti scroll */
const bg=document.createElement('div');bg.id='kx-bg';bg.setAttribute('aria-hidden','true');
bg.innerHTML=['a1','a2','a3','s1','s2','sh','sh s2'].map(k=>`<span class="${k}"></span>`).join('');
document.body.prepend(bg);
function paintDusk(){
  const max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
  document.documentElement.style.setProperty('--kx-p',p.toFixed(3));
}


/* 2b. Pemandangan luar angkasa: tiap bagian punya suasana sendiri */
const ROCKET='<svg viewBox="0 0 40 100"><path class="fl" d="M13 64C13 84 20 98 20 98C20 98 27 84 27 64Z" fill="#F29A1F"/><path class="fl" d="M16 64C16 78 20 88 20 88C20 88 24 78 24 64Z" fill="#FFE29A"/><path d="M20 2C31 20 33 42 30 64H10C7 42 9 20 20 2Z" fill="#F4EEDF"/><path d="M20 2C25 12 28 22 29 32H11C12 22 15 12 20 2Z" fill="#C95F6B"/><circle cx="20" cy="40" r="6.5" fill="#1E2B5E" stroke="#E2B84F" stroke-width="2.5"/><path d="M10 50L0 74L10 68Z M30 50L40 74L30 68Z" fill="#C95F6B"/><rect x="13" y="62" width="14" height="5" rx="2" fill="#B8892D"/></svg>';
const ASTRO='<svg viewBox="0 0 100 130"><rect x="20" y="40" width="24" height="44" rx="9" fill="#B8C0DA"/><path d="M30 60C20 68 14 82 18 96" stroke="#F4EEDF" stroke-width="12" stroke-linecap="round" fill="none"/><g class="wv"><path d="M70 60C84 62 90 52 88 38" stroke="#F4EEDF" stroke-width="12" stroke-linecap="round" fill="none"/><circle cx="88" cy="36" r="7" fill="#E2B84F"/></g><rect x="34" y="48" width="36" height="46" rx="14" fill="#F4EEDF"/><rect x="40" y="62" width="24" height="12" rx="3" fill="#1E2B5E"/><circle cx="46" cy="68" r="2.4" fill="#E2B84F"/><circle cx="56" cy="68" r="2.4" fill="#C95F6B"/><path d="M43 92L40 116M62 92L66 114" stroke="#F4EEDF" stroke-width="13" stroke-linecap="round"/><path d="M36 118H46M62 116H72" stroke="#E2B84F" stroke-width="8" stroke-linecap="round"/><circle cx="52" cy="30" r="22" fill="#F4EEDF"/><ellipse cx="52" cy="31" rx="15" ry="12.5" fill="#1B2350"/><ellipse cx="47" cy="27" rx="5" ry="3" fill="#8FA3E8" opacity=".85"/></svg>';
const SAT='<svg viewBox="0 0 100 50"><rect x="2" y="14" width="30" height="22" fill="#2B5FD8" stroke="#9DB2FF"/><rect x="68" y="14" width="30" height="22" fill="#2B5FD8" stroke="#9DB2FF"/><path d="M12 14V36M22 14V36M78 14V36M88 14V36" stroke="#9DB2FF" stroke-width=".8"/><rect x="34" y="10" width="32" height="30" rx="4" fill="#E2B84F"/><rect x="38" y="16" width="24" height="18" rx="2" fill="#B8892D"/><path d="M50 10V3" stroke="#F4EEDF" stroke-width="2"/><circle class="bl" cx="50" cy="3" r="2.5" fill="#FF5A5A"/></svg>';
const UFO='<svg viewBox="0 0 120 80"><defs><linearGradient id="ub" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DF5D0" stop-opacity=".45"/><stop offset="1" stop-color="#9DF5D0" stop-opacity="0"/></linearGradient></defs><path d="M44 40L12 80H108L76 40Z" fill="url(#ub)"/><ellipse cx="60" cy="22" rx="20" ry="16" fill="#9DF5D0" opacity=".85"/><ellipse cx="60" cy="30" rx="50" ry="13" fill="#B7BCD6"/><ellipse cx="60" cy="27" rx="50" ry="10" fill="#D7DBEF"/><circle class="bl" cx="22" cy="31" r="3" fill="#E2B84F"/><circle class="bl b2" cx="60" cy="35" r="3" fill="#FF8AB5"/><circle class="bl" cx="98" cy="31" r="3" fill="#E2B84F"/></svg>';
const FLAG='<svg viewBox="0 0 40 60"><path d="M4 2V58" stroke="#F4EEDF" stroke-width="2.5"/><path class="fw2" d="M5 4C16 0 22 10 34 5V26C22 31 16 21 5 25Z" fill="#E2B84F"/></svg>';
const spiral=()=>{let d='';for(let a=0;a<3;a++){let p='';for(let r=3;r<=46;r+=2){const t=a*2.094+r*.16;p+=(p?'L':'M')+(50+r*Math.cos(t)).toFixed(1)+' '+(50+r*Math.sin(t)).toFixed(1)}d+=`<path d="${p}"/>`}
  return `<svg viewBox="0 0 100 100"><g fill="none" stroke="#9DB2FF" stroke-width="6" opacity=".18">${d}</g><g fill="none" stroke="#E2B84F" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="0.1 3.4">${d}</g><circle cx="50" cy="50" r="13" fill="#E2B84F" opacity=".25"/><circle cx="50" cy="50" r="6" fill="#FFF6E5"/></svg>`};
const E=(c,s,h='')=>`<span class="${c}" style="${s}">${h}</span>`;
const NB=(s,c,x,y,d=40)=>E('k-neb',`--s:${s}px;--c:${c};left:${x};top:${y};--d:${d}s`);
const PL=(s,c1,c2,x,y,ex='',d=30,dx=12,dy=-18)=>E('k-pl '+ex,`--s:${s}px;--c1:${c1};--c2:${c2};left:${x};top:${y};--d:${d}s;--dx:${dx}px;--dy:${dy}px`);
const SP=(x,y,s=14,dl=0)=>E('k-sp',`left:${x};top:${y};width:${s}px;height:${s}px;animation-delay:-${dl}s`);
const RK=(x,tx,dl,sc=1,du=16)=>E('k-rk',`left:${x};--tx:${tx};--sc:${sc};animation-duration:${du}s;animation-delay:-${dl}s`,ROCKET);
const CM=(x,y,dl,du=13)=>E('k-cm',`left:${x};top:${y};animation-duration:${du}s;animation-delay:-${dl}s`);
const AU=(x,y,w=88,dl=0)=>E('k-au',`left:${x};top:${y};--w:${w}px;animation-delay:-${dl}s`,ASTRO);
const ST=(x,y,w=70,dl=0)=>E('k-st',`left:${x};top:${y};width:${w}px;animation-delay:-${dl}s`,SAT);
const RO=(x,y,s,dl=0)=>E('k-ro',`left:${x};top:${y};width:${s}px;height:${s}px;animation-delay:-${dl}s`);
const OB=(s,t,dir='normal',dc='#E2B84F')=>E('k-ob',`--s:${s}px;--t:${t}s;--dir:${dir};--dc:${dc}`);
const stars=(a)=>a.map((q,i)=>SP(q[0],q[1],q[2]||12,i*.7)).join('');
const SCENES={
 hero:[NB(340,'#4A63C8aa','-22%','-6%',44),NB(300,'#9A3F7Aaa','55%','52%',50),PL(60,'#FFB28A','#C0462E','10%','12%','',34),PL(92,'#8FC7FF','#2B5FD8','72%','30%','band',40,-12,16),CM('70%','8%',3),CM('94%','34%',9,17),RK('14%','10vh',4,1,17),RK('80%','-8vh',11,.7,21),stars([['22%','30%'],['60%','10%',10],['85%','60%'],['8%','62%',10],['45%','74%'],['92%','14%',9]]),E('k-ea','--h:24vh')],
 surat:[NB(380,'#9A3F7Acc','45%','-6%',46),NB(340,'#6A3FD0aa','-18%','45%',52),AU('62%','8%',92),PL(52,'#FFC2E0','#C2417F','8%','74%','',30,12,-14),CM('88%','55%',6,15),stars([['10%','12%'],['30%','40%',10],['90%','38%'],['20%','88%'],['70%','82%',10],['52%','24%',9],['6%','48%',10]])],
 ajar:[NB(300,'#F29A1F66','60%','30%',48),PL(250,'#F6D58A','#B8761F','58%','20%','ring band',60,-16,10),PL(38,'#C9C2D8','#6B6A84','8%','14%','',26),RO('12%','48%',14),RO('26%','56%',9,3),RO('40%','44%',12,6),RO('18%','70%',10,2),RO('34%','78%',16,8),RO('6%','86%',8,5),CM('80%','8%',5,15),stars([['30%','10%'],['85%','80%',10],['50%','90%'],['70%','6%',9]])],
 kenang:[NB(360,'#1FA7A8aa','-10%','10%',46),NB(300,'#4A63C8aa','55%','60%',52),E('k-gal','--s:330px;left:-14%;top:22%',spiral()),ST('72%','10%',74),CM('90%','40%',4,16),stars([['70%','30%'],['86%','20%',10],['60%','50%',9],['80%','70%'],['10%','8%'],['45%','86%',10],['92%','90%',10]])],
 hitung:[E('k-bh','--s:170px'),OB(280,26),OB(400,44,'reverse','#9DB2FF'),OB(540,70,'normal','#FF8AB5'),stars([['12%','14%'],['84%','20%',10],['20%','80%'],['78%','84%',10],['50%','8%',9],['6%','50%',9],['94%','56%']])],
 pesan:[NB(340,'#2BD9A8aa','-12%','0%',44),NB(320,'#1FA7A8aa','50%','50%',50),E('k-uf','left:12%;top:12%',UFO),ST('74%','64%',64,6),CM('86%','20%',2,17),stars([['14%','50%'],['40%','30%',10],['88%','40%'],['26%','80%',10],['60%','10%'],['8%','20%',9],['66%','90%',10]])],
 amplop:[NB(300,'#4A63C866','-10%','10%',48),PL(56,'#9DD0FF','#2B6BD8','72%','8%','earth',32,-8,12),E('k-ms','--h:26vh'),E('k-fg','left:62%;top:calc(100% - 26vh - 52px)',FLAG),AU('10%','26%',72,4),CM('40%','6%',7,18),stars([['20%','10%'],['50%','20%',10],['88%','44%'],['8%','60%',9],['34%','46%']])],
 hadiah:[E('k-bu','--s:620px'),E('k-co',''),NB(320,'#C95F6Baa','-16%','70%',46),RK('50%','0vh',2,1.1,14),RK('20%','12vh',8,.7,18),RK('80%','-12vh',12,.7,19),CM('86%','12%',3,14),CM('10%','40%',8,17),stars([['12%','12%'],['88%','24%',10],['24%','60%'],['76%','70%',10],['50%','6%',9],['8%','84%',10],['92%','88%']])],
 balas:[NB(320,'#4A63C8aa','50%','10%',48),E('k-ea','--h:30vh'),ST('62%','44%',68,3),AU('8%','14%',80,2),RK('42%','6vh',5,.8,19),stars([['20%','40%'],['86%','16%',10],['56%','8%'],['10%','60%',9],['74%','30%']])]
};
const scenes=[];
Object.entries(SCENES).forEach(([id,items])=>{
  const s=document.getElementById(id);if(!s)return;
  const d=document.createElement('div');d.className='kx-scene sc-'+id;d.setAttribute('aria-hidden','true');d.innerHTML=items.join('');
  s.prepend(d);scenes.push(d);
});
const sio=new IntersectionObserver(es=>es.forEach(e=>e.target.querySelector('.kx-scene')?.classList.toggle('off',!e.isIntersecting)),{rootMargin:'120px'});
scenes.forEach(d=>sio.observe(d.parentElement));

/* 3. Parallax ornamen (bunga, burung, pita) */
const decor=scenes.map(el=>({el,f:-.07,sec:el.parentElement}));
function paintParallax(){
  if(rm)return;
  for(const d of decor){
    const r=d.sec.getBoundingClientRect();
    if(r.bottom<0||r.top>innerHeight)continue;
    d.el.style.translate='0 '+((r.top+r.height/2-innerHeight/2)*d.f).toFixed(1)+'px';
  }
}
let tick=false;
function onScroll(){if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;paintDusk();paintParallax()})}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);paintDusk();

/* 4. Partikel emas + kelopak saat disentuh */
let burst=()=>{};
if(!rm){
  const c=document.createElement('canvas');c.id='kx-p';c.setAttribute('aria-hidden','true');document.body.appendChild(c);
  const x=c.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1);let W,H;
  const size=()=>{W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)};size();addEventListener('resize',size);
  const N=(navigator.hardwareConcurrency||4)<=4?14:26;
  const mk=init=>({x:Math.random()*W,y:init?Math.random()*H:H+10,r:1+Math.random()*2.2,vy:.15+Math.random()*.35,ph:Math.random()*6.28,a:.25+Math.random()*.5});
  const ps=Array.from({length:N},()=>mk(true)),petals=[];let run=true,going=true;
  function loop(){
    if(!run){going=false;return}
    x.clearRect(0,0,W,H);
    for(const p of ps){
      p.y-=p.vy;p.x+=Math.sin(p.ph+=.01)*.3;
      if(p.y<-10)Object.assign(p,mk(false));
      x.globalAlpha=p.a*(.6+.4*Math.sin(p.ph*3));x.fillStyle='#E2B84F';x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
    }
    for(let i=petals.length-1;i>=0;i--){
      const q=petals[i];q.vy+=.12;q.x+=q.vx;q.y+=q.vy;q.rot+=q.vr;q.life--;
      if(q.life<=0||q.y>H+20){petals.splice(i,1);continue}
      x.save();x.globalAlpha=Math.min(1,q.life/30);x.translate(q.x,q.y);x.rotate(q.rot);x.fillStyle=q.c;
      x.beginPath();x.ellipse(0,0,q.s,q.s*.5,0,0,6.283);x.fill();x.restore();
    }
    x.globalAlpha=1;requestAnimationFrame(loop);
  }
  loop();
  document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run&&!going){going=true;loop()}});
  burst=(px,py)=>{for(let i=0;i<16;i++)petals.push({x:px,y:py,vx:(Math.random()-.5)*6,vy:-Math.random()*5-1,s:4+Math.random()*4,rot:Math.random()*6,vr:(Math.random()-.5)*.3,c:['#F6F0E1','#E2B84F','#C95F6B'][i%3],life:90+Math.random()*40})};
}

/* 5. Sentuhan: kelopak di polaroid, getar halus di amplop & kartu */
document.addEventListener('click',e=>{
  if(e.target.closest('.pol')){burst(e.clientX,e.clientY);buzz(15)}
  else if(e.target.closest('.env')){buzz(20)}
  else if(e.target.closest('#card')){burst(innerWidth/2,innerHeight/2);buzz([20,40,20])}
});
const hero=document.getElementById('hero');
if(hero)new MutationObserver(()=>{if(hero.classList.contains('out'))buzz([40,60,40])}).observe(hero,{attributes:true,attributeFilter:['class']});
})();