import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Deterministic, self-contained SVGs. No external fonts, images, scripts or APIs.
const output = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(output, { recursive: true });
const C = { bg: '#080e15', panel: '#101b25', white: '#eff7f5', muted: '#8fa8b8', line: '#263b48', cyan: '#7de8df', lime: '#d4ff78', blue: '#91baff', amber: '#f4cb82' };
const sans = 'Arial, Helvetica, sans-serif';
const mono = 'Consolas, Monaco, monospace';
const text = (x,y,s,size=16,color=C.white,extra='') => `<text x="${x}" y="${y}" fill="${color}" font-family="${sans}" font-size="${size}" ${extra}>${s}</text>`;
const label = (x,y,s,color=C.muted,size=12) => `<text x="${x}" y="${y}" fill="${color}" font-family="${mono}" font-size="${size}" letter-spacing="1.6">${s}</text>`;
const line = (d,color=C.line,extra='') => `<path d="${d}" fill="none" stroke="${color}" ${extra}/>`;
const dot = (x,y,r=3,color=C.cyan,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" ${extra}/>`;
const rect = (x,y,w,h,rx=8,fill=C.panel,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const defs = `<defs>
  <radialGradient id="halo"><stop stop-color="#3bbeb1" stop-opacity=".45"/><stop offset=".5" stop-color="#185d68" stop-opacity=".35"/><stop offset="1" stop-color="#080e15" stop-opacity="0"/></radialGradient>
  <linearGradient id="accent"><stop stop-color="${C.cyan}"/><stop offset="1" stop-color="${C.lime}"/></linearGradient>
  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#5f8e9b" opacity=".22"/></pattern>
  <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5"/></filter>
</defs>`;
const styles = `<style>
  .orbit { transform-origin: 0px 0px; animation: orbit 7s linear infinite; }
  .reverse { animation-direction: reverse; animation-duration: 11s; }
  .mesh { transform-origin: 0px 0px; animation: orbit 18s linear infinite; }
  .wobble { transform-origin: 0px 0px; animation: wobble 6s ease-in-out infinite; }
  .breathe { animation: breathe 4s ease-in-out infinite; }
  .pulse { transform-origin: 0px 0px; animation: pulse 4s ease-out infinite; }
  .pulse.delay { animation-delay: -2s; }
  .flow { animation: flow 3s linear infinite; }
  .equalizer { transform-box: fill-box; transform-origin: bottom; animation: equalize 1.8s ease-in-out infinite alternate; }
  .grid { animation: grid 14s linear infinite; }
  @keyframes orbit { to { transform: rotate(360deg); } }
  @keyframes wobble { 0%,100% { transform: scale(1,.86); } 50% { transform: scale(.92,1.08); } }
  @keyframes breathe { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
  @keyframes pulse { 0% { transform: scale(.78); opacity: .55; } 100% { transform: scale(1.16); opacity: 0; } }
  @keyframes flow { to { stroke-dashoffset: -96; } }
  @keyframes equalize { from { transform: scaleY(.35); } to { transform: scaleY(1); } }
  @keyframes grid { to { transform: translate(24px,24px); } }
  @media (prefers-reduced-motion: reduce) { .orbit,.mesh,.wobble,.breathe,.pulse,.flow,.equalizer,.grid { animation: none; } .pulse { opacity: .15; } }
</style>`;
function svg(w,h,title,description,body,animated=false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">${description}</desc>${defs}${animated?styles:''}${body}</svg>\n`;
}
function torus() {
  const project = (u,v) => {
    let x=(115+43*Math.cos(v))*Math.cos(u), y=(115+43*Math.cos(v))*Math.sin(u), z=43*Math.sin(v);
    [y,z]=[y*Math.cos(.93)-z*Math.sin(.93),y*Math.sin(.93)+z*Math.cos(.93)];
    [x,z]=[x*Math.cos(.46)+z*Math.sin(.46),-x*Math.sin(.46)+z*Math.cos(.46)];
    [x,y]=[x*Math.cos(-.42)-y*Math.sin(-.42),x*Math.sin(-.42)+y*Math.cos(-.42)];
    const p=620/(620-z);
    return `${(x*p).toFixed(2)},${(y*p).toFixed(2)}`;
  };
  let out='';
  for(let i=0;i<36;i++) {
    const pts=Array.from({length:101},(_,j)=>project(i/36*Math.PI*2,j/100*Math.PI*2));
    out+=line(`M${pts.join('L')}Z`,i%3===0?C.lime:C.cyan,`stroke-width="${i%3===0?'1.15':'.75'}" opacity="${i%3===0?'.95':'.55'}"`);
  }
  for(let i=0;i<13;i++) {
    const pts=Array.from({length:141},(_,j)=>project(j/140*Math.PI*2,i/13*Math.PI*2));
    out+=line(`M${pts.join('L')}Z`,C.cyan,'stroke-width=".8" opacity=".6"');
  }
  return out;
}
function sculpture(cx,cy,scale=1) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})">
    <circle r="265" fill="url(#halo)" class="breathe"/>
    ${line('M-225 0H225 M0-217V217',C.line,'stroke-dasharray="2 8"')}
    <circle r="195" stroke="${C.line}" stroke-width="1"/>
    <circle r="215" stroke="${C.cyan}" stroke-width="1" stroke-dasharray="1 10" opacity=".42"/>
    <circle class="pulse" r="194" stroke="${C.cyan}" stroke-width="1.2"/>
    <circle class="pulse delay" r="194" stroke="${C.lime}" stroke-width=".7"/>
    <g class="orbit"><circle r="195" stroke="${C.cyan}" stroke-width="3" stroke-dasharray="155 458"/>${dot(195,0,6,C.lime)}${dot(195,0,15,C.lime,'opacity=".65" filter="url(#glow)"')}${dot(-195,0,4,C.cyan)}</g>
    <g class="orbit reverse"><circle r="176" stroke="${C.lime}" stroke-width="2" stroke-dasharray="60 120 8 365"/>${dot(0,-176,4,C.cyan)}</g>
    <g class="wobble"><g class="mesh">${torus()}</g></g>
    ${line('M-15 0H15 M0-15V15',C.lime,'opacity=".65"')}
    ${dot(0,0,3,C.lime)}
    ${line('M-224 -156V-174H-206 M206 174H224V156 M206 -174H224V-156 M-224 156V174H-206',C.cyan,'opacity=".5"')}
  </g>`;
}
function header(mobile=false) {
  const w=mobile?640:1200,h=mobile?600:480;
  let body=rect(0,0,w,h,18,C.bg)+`<g class="grid">${rect(-24,-24,w+48,h+48,18,'url(#dots)')}</g>`;
  body+=rect(32,32,7,7,1,C.lime)+label(51,40,'UTENKKEKOU / ENGINEERING',C.muted,mobile?16:13);
  if(mobile) {
    body+=sculpture(462,338,.71);
    body+=text(34,212,'lynn',148,C.white,'font-weight="700" letter-spacing="-10"');
    body+=`<g class="breathe">${rect(307,192,19,19,3,C.lime)}</g>`;
    body+=text(38,266,'AI · VISION',26,C.cyan,'font-weight="700" letter-spacing="1"');
    body+=text(38,300,'CREATIVE ENGINEERING',18,C.muted,'letter-spacing="1"');
    body+=line('M36 502H604',C.line)+line('M36 502H604',C.cyan,'class="flow" stroke-dasharray="20 76" opacity=".6"');
    body+=label(38,544,'AI SYSTEMS / WEB / MOBILE',C.white,17);
    body+=label(38,575,'CODE · PERCEPTION · INTERACTION',C.muted,13);
  } else {
    body+=sculpture(950,221,.85);
    body+=label(1130,40,'01',C.cyan,13);
    body+=text(44,238,'lynn',184,C.white,'font-weight="700" letter-spacing="-12"');
    body+=`<g class="breathe">${rect(387,211,23,23,3,C.lime)}</g>`;
    body+=text(50,299,'AI. VISION. CREATIVE ENGINEERING.',22,C.cyan,'font-weight="700" letter-spacing=".7"');
    body+=label(51,338,'MULTIMODAL / FULL-STACK / CONNECTED DEVICES',C.muted,13);
    body+=line('M48 402H1152',C.line)+line('M48 402H1152',C.cyan,'class="flow" stroke-dasharray="20 76" opacity=".6"');
    body+=label(50,441,'CODE',C.white,13)+label(178,441,'PERCEPTION',C.white,13)+label(365,441,'INTERACTION',C.white,13);
    body+=dot(139,436,2,C.lime)+dot(326,436,2,C.lime);
    body+=label(906,441,'PERSONAL / OPEN SOURCE',C.muted,11);
    body+=Array.from({length:12},(_,i)=>rect(806+i*6,425+(i%3)*3,3,17-(i%3)*3,1,i%3===0?C.lime:C.cyan,`class="equalizer" style="animation-delay:-${(i*.19).toFixed(2)}s"`)).join('');
  }
  return svg(w,h,'lynn — AI, vision and creative engineering','A luminous rotating toroidal wireframe, counter-rotating light trails, expanding pulses and flowing signals. Animation pauses when reduced motion is preferred.',body,true);
}
function card(index,kind,title,draw,color=C.cyan) {
  const body=rect(0,0,560,248,12,C.bg)+rect(0,0,560,248,12,'url(#dots)')+
    line('M20 48H540',C.line)+label(22,30,`0${index} / ${kind}`,color,12)+(index===4?label(498,30,'WIP',C.amber,11):label(508,30,'↗',C.muted,17))+
    `<g>${draw}</g>`+label(22,229,title,C.muted,10);
  return svg(560,248,`${kind} project illustration`,title,body);
}
const node = (x,y,name,color=C.cyan) => rect(x,y,88,30,6,C.panel,`stroke="${C.line}"`)+text(x+44,y+20,name,11,color,'text-anchor="middle"');
const nexus = card(1,'MULTIMODAL AI','MODEL ADAPTERS / STREAMING / ORCHESTRATION',
  line('M140 87H180Q195 87 195 103V124H236 M140 135H236 M140 183H180Q195 183 195 167V146H236 M324 135H384 M368 135V87H420 M368 135V183H420',C.cyan,'opacity=".6"')+
  node(52,72,'TEXT')+node(52,120,'IMAGE')+node(52,168,'AUDIO')+
  rect(236,91,88,88,18,'#152a2d',`stroke="${C.cyan}"`)+
  line('M259 119L280 107L301 119V146L280 158L259 146Z M280 107V132 M259 119L280 132L301 119 M280 132V158',C.lime,'stroke-width="1.5"')+
  node(420,72,'API')+node(400,120,'STREAM')+node(420,168,'TOOLS')+dot(195,124,3,C.lime)+dot(368,135,3,C.lime));
const vision = card(2,'COMPUTER VISION','ANNOTATION / YOLO TRAINING / ERROR ANALYSIS',
  rect(34,66,292,137,8,'#0d1820',`stroke="${C.line}"`)+
  line('M34 180L127 119L180 150L250 91L326 143 M49 198H312 M88 67V203 M252 67V203',C.line)+
  rect(163,84,37,92,12,'#152129',`stroke="${C.muted}"`)+dot(181.5,104,9,'#463431')+dot(181.5,130,9,'#304038')+dot(181.5,155,9,C.lime)+
  line('M151 98V76H173 M190 76H213V98 M151 157V184H173 M190 184H213V157',C.cyan,'stroke-width="2"')+
  line('M213 130H302L352 96H514',C.cyan,'stroke-dasharray="4 5"')+
  label(356,84,'DETECT',C.cyan,12)+rect(354,114,163,8,4,'#162731')+rect(354,114,131,8,4,C.cyan)+
  label(356,153,'REVIEW',C.muted,12)+rect(354,168,163,8,4,'#162731')+rect(354,168,100,8,4,'#4c747c')+dot(302,130,3,C.lime));
const annotation = card(3,'HUMAN IN THE LOOP','PRE-ANNOTATION / BROWSER REVIEW / DATA QUALITY',
  rect(40,68,270,135,7,'#101b25',`stroke="${C.line}"`)+line('M40 90H310',C.line)+dot(52,79,2,C.muted)+dot(61,79,2,C.muted)+dot(70,79,2,C.muted)+
  rect(54,104,136,84,3,'#0b141e')+line('M54 172L96 135L123 157L150 123L190 167',C.line)+
  rect(102,115,46,61,2,'none',`stroke="${C.blue}" stroke-width="1.5"`)+
  rect(204,108,86,5,2,'#3b535d')+rect(204,121,60,5,2,'#263b48')+rect(204,144,80,5,2,'#3b535d')+rect(204,157,54,5,2,'#263b48')+
  line('M330 135H362',C.blue)+line('M355 128L362 135L355 142',C.blue)+
  rect(386,81,120,45,7,'#152a2d',`stroke="${C.cyan}"`)+line('M400 103L406 109L419 96',C.lime,'stroke-width="2"')+text(432,108,'REVIEW',12,C.cyan)+
  rect(386,145,120,45,7,'#111c28',`stroke="${C.line}"`)+text(407,172,'REFINE',12,C.muted),C.blue);
const wearable = card(4,'ASSISTIVE TECHNOLOGY','IN DEVELOPMENT / VISION / VOICE / MOBILE',
  `<ellipse cx="215" cy="140" rx="159" ry="63" stroke="${C.line}" stroke-dasharray="3 8"/>`+
  line('M73 103L112 136 M317 103L280 136 M112 136Q149 118 185 135 M185 135Q199 125 212 135 M212 135Q247 118 280 136 M112 136L119 169Q150 189 180 167L185 135 M212 135L217 167Q251 189 277 167L280 136',C.cyan,'stroke-width="3" stroke-linejoin="round"')+
  dot(290,123,4,C.lime)+dot(290,123,9,C.lime,'opacity=".15"')+
  line('M305 122H340L366 96H498',C.line,'stroke-dasharray="4 4"')+
  [13,25,39,55,34,65,48,26,40,18,31].map((v,i)=>line(`M${385+i*11} ${153-v/2}V${153+v/2}`,i%3===0?C.lime:C.cyan,'stroke-width="3" stroke-linecap="round"')).join('')+
  label(386,89,'VOICE',C.cyan,11)+label(385,203,'BUILDING',C.amber,10),C.amber);

const spatial = card(3,'SPATIAL DESIGN SYSTEM','SHARED WALLS / ASSET VALIDATION / DESIGN RECOVERY',
  `<path d="M52 141L188 67L335 145L199 216Z" fill="#152c32" stroke="${C.cyan}"/>
   <path d="M52 141V87L188 18V67Z" fill="#1b3042" stroke="${C.blue}" transform="translate(0 35)"/>
   <path d="M188 53L335 130V180L188 102Z" fill="#11242e" stroke="${C.blue}"/>`+
  line('M95 155L231 82 M141 180L278 107 M99 116L247 194 M145 91L293 168',C.cyan,'opacity=".22"')+
  `<path d="M100 144L155 115L196 137L142 166Z" fill="#32545f" stroke="${C.cyan}"/>
   <path d="M100 144V124L155 96V115 M100 124L142 146L196 117V137 M142 146V166" stroke="${C.cyan}" fill="#24434d"/>
   <path d="M234 167L268 149L291 161L257 180Z" fill="#405844" stroke="${C.lime}"/>
   <path d="M234 167V156L268 138L291 150V161 M234 156L257 169L291 150 M257 169V180" stroke="${C.lime}" fill="#294138"/>`+
  line('M335 145H368',C.line,'stroke-dasharray="3 4"')+
  node(390,78,'PLAN',C.blue)+node(390,124,'SCENE',C.cyan)+node(390,170,'SAVE',C.lime)+
  line('M434 108V124 M434 154V170',C.line)+dot(368,145,3,C.cyan),C.blue);

await Promise.all([
  ['hero-kinetic-v2.svg',header()],['hero-kinetic-mobile-v2.svg',header(true)],
  ['project-nexus.svg',nexus],['project-vision.svg',vision],
  ['project-annotation.svg',annotation],['project-wearable.svg',wearable],
  ['project-spatial-v2.svg',spatial],
].map(([name,contents])=>writeFile(`${output}/${name}`,contents)));
console.log('Built 7 self-contained SVG assets.');
