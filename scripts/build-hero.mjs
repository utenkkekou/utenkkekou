import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Self-contained artwork: broad translucent ribbons, with light moving along their edges.
const output = fileURLToPath(new URL('../assets/', import.meta.url));
const sans = 'Arial, Helvetica, sans-serif';
const mono = 'Consolas, Monaco, monospace';
const t = (x,y,content,size,fill='#f4f6ff',extra='') => `<text x="${x}" y="${y}" font-family="${sans}" font-size="${size}" fill="${fill}" ${extra}>${content}</text>`;
const label = (x,y,content,size=12,fill='#8c95af',extra='') => t(x,y,content,size,fill,`font-family="${mono}" letter-spacing="2" ${extra}`).replace(`font-family="${sans}" `,'');
const topEdge = 'M8 361 C143 356 102 123 281 145 C438 164 412 23 615 2';
const bottomEdge = 'M8 439 C172 432 164 214 305 225 C471 238 471 104 615 82';
const sheet = `${topEdge} L615 82 C471 104 471 238 305 225 C164 214 172 432 8 439 Z`;

function artwork() {
  let etched = '';
  for (let i=1;i<10;i++) {
    const p=i/10;
    etched += `<path d="M8 ${361+78*p} C${143+29*p} ${356+76*p} ${102+62*p} ${123+91*p} ${281+24*p} ${145+80*p} C${438+33*p} ${164+74*p} ${412+59*p} ${23+81*p} 615 ${2+80*p}" stroke="#c7baff" stroke-opacity="${i%3===0?'.14':'.055'}" stroke-width=".8" fill="none"/>`;
  }
  return `<g class="ribbons" mask="url(#entrance)">
    <g transform="translate(2 -99)" opacity=".48">
      <path d="${sheet}" fill="url(#backGlass)" stroke="#7f9bc8" stroke-opacity=".22"/>
      <path d="${bottomEdge}" stroke="#9eb4dc" stroke-opacity=".32" stroke-width="1.1"/>
    </g>
    <g transform="translate(38 84)" opacity=".65">
      <path d="${sheet}" fill="url(#lowerGlass)" stroke="#7a6bef" stroke-opacity=".38"/>
      <path d="${topEdge}" stroke="#8b88ff" stroke-opacity=".65" stroke-width="1.2"/>
    </g>
    <path d="${sheet}" fill="url(#glass)"/>
    <path d="${sheet}" fill="url(#foldShading)"/>
    ${etched}
    <g clip-path="url(#ribbonClip)"><path class="sheen" d="M-130 -100H-40L270 600H180Z" fill="url(#sheen)"/></g>
    <path d="${topEdge}" stroke="url(#rim)" stroke-width="2"/>
    <path d="${bottomEdge}" stroke="url(#rimBottom)" stroke-width="1.2"/>
    <path d="${topEdge}" stroke="#a3f7ff" stroke-width="8" class="light-trail" filter="url(#softGlow)" opacity=".8"/>
    <path d="${topEdge}" stroke="#ecffff" stroke-width="2.6" class="light-trail"/>
    <path d="${bottomEdge}" stroke="#cfc7ff" stroke-width="1.8" class="light-trail second"/>
    <path d="M12 361L12 439 M614 2V82" stroke="#b9caff" stroke-opacity=".3"/>
  </g>`;
}

function hero(mobile=false) {
  const w=mobile?640:1200, h=mobile?640:440;
  const defs=`<defs>
    <linearGradient id="background" x2="1" y2="1"><stop stop-color="#090c17"/><stop offset=".54" stop-color="#0d1223"/><stop offset="1" stop-color="#12152b"/></linearGradient>
    <radialGradient id="ambient"><stop stop-color="#5160b8" stop-opacity=".24"/><stop offset="1" stop-color="#20254f" stop-opacity="0"/></radialGradient>
    <linearGradient id="glass" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#1e3a52"/><stop offset=".23" stop-color="#4c85a4" stop-opacity=".65"/><stop offset=".47" stop-color="#292d5b"/><stop offset=".68" stop-color="#7b68b5" stop-opacity=".8"/><stop offset="1" stop-color="#aec9e6" stop-opacity=".4"/></linearGradient>
    <linearGradient id="foldShading" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#060b18" stop-opacity=".4"/><stop offset=".27" stop-color="#73e9ef" stop-opacity=".25"/><stop offset=".46" stop-color="#0c1028" stop-opacity=".6"/><stop offset=".67" stop-color="#be9bff" stop-opacity=".12"/><stop offset="1" stop-color="#7bdff5" stop-opacity=".2"/></linearGradient>
    <linearGradient id="backGlass"><stop stop-color="#7b9aae" stop-opacity=".04"/><stop offset=".6" stop-color="#41628d" stop-opacity=".28"/><stop offset="1" stop-color="#859bd3" stop-opacity=".15"/></linearGradient>
    <linearGradient id="lowerGlass"><stop stop-color="#142b53" stop-opacity=".1"/><stop offset=".5" stop-color="#3b2863" stop-opacity=".7"/><stop offset="1" stop-color="#565098" stop-opacity=".15"/></linearGradient>
    <linearGradient id="rim"><stop stop-color="#79e7ef" stop-opacity=".2"/><stop offset=".27" stop-color="#bdfaff"/><stop offset=".55" stop-color="#aca0f2"/><stop offset="1" stop-color="#e6e1ff"/></linearGradient>
    <linearGradient id="rimBottom"><stop stop-color="#7ec8f5" stop-opacity=".6"/><stop offset=".5" stop-color="#9b8add"/><stop offset="1" stop-color="#81c8eb" stop-opacity=".15"/></linearGradient>
    <linearGradient id="sheen"><stop stop-color="#dcfaff" stop-opacity="0"/><stop offset=".5" stop-color="#dcfaff" stop-opacity=".22"/><stop offset="1" stop-color="#dcfaff" stop-opacity="0"/></linearGradient>
    <pattern id="grain" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#b7c3df" opacity=".1"/></pattern>
    <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
    <linearGradient id="entranceFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="95" y2="0"><stop stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <mask id="entrance" maskUnits="userSpaceOnUse" x="-20" y="-200" width="800" height="900"><rect x="-20" y="-200" width="800" height="900" fill="url(#entranceFade)"/></mask>
    <clipPath id="canvas"><rect width="${w}" height="${h}" rx="18"/></clipPath>
    <clipPath id="ribbonClip"><path d="${sheet}"/></clipPath>
  </defs>`;
  const styles=`<style>
    .light-trail { stroke-dasharray: 110 960; animation: travel 5s linear infinite; }
    .second { stroke-dasharray: 65 1005; animation-duration: 7s; animation-delay: -3s; opacity: .75; }
    .sheen { animation: sweep 9s ease-in-out infinite; }
    .spark { animation: drift 7s ease-in-out infinite alternate; }
    @keyframes travel { from { stroke-dashoffset: 1070; } to { stroke-dashoffset: 0; } }
    @keyframes sweep { 0%,8% { transform: translateX(-180px); opacity: 0; } 24% { opacity: 1; } 70%,100% { transform: translateX(770px); opacity: 0; } }
    @keyframes drift { from { transform: translateY(3px); opacity:.2; } to { transform: translateY(-8px); opacity:.65; } }
    @media (prefers-reduced-motion: reduce) { .light-trail,.sheen,.spark { animation: none; } .light-trail { stroke-dasharray: none; opacity: .35; } .sheen { opacity: 0; } }
  </style>`;
  const graphic = mobile ? `<g transform="translate(65 265) scale(.96 .65)">${artwork()}</g>` : `<g transform="translate(650 -2) scale(1 .86)">${artwork()}</g>`;
  let body=`<g clip-path="url(#canvas)"><rect width="${w}" height="${h}" fill="url(#background)"/><ellipse cx="${mobile?440:970}" cy="${mobile?420:220}" rx="410" ry="300" fill="url(#ambient)"/><rect width="${w}" height="${h}" fill="url(#grain)"/>${graphic}`;
  const sparks = mobile ? [[98,410],[530,320],[574,492]] : [[700,103],[1125,271],[796,322]];
  body += sparks.map(([x,y],i)=>`<path class="spark" style="animation-delay:-${i*2}s" d="M${x-3} ${y}H${x+3}M${x} ${y-3}V${y+3}" stroke="#a8c9f4" stroke-width="1"/>`).join('');
  if (mobile) {
    body += `<path d="M36 42H53" stroke="#79e7ef" stroke-width="2"/>`+label(66,46,'UTENKKEKOU / DIGITAL LAB',14);
    body += t(32,208,'lynn',150,'#f3f5ff','font-weight="700" letter-spacing="-10"');
    body += `<rect x="309" y="187" width="16" height="16" rx="2" fill="#a99cff"/>`;
    body += t(38,270,'AI. Vision. Creative engineering.',23,'#b8c7e1');
    body += label(38,302,'IDEAS INTO EXPERIENCES',11,'#7e8da8');
    body += `<path d="M36 576H604" stroke="#353b56" stroke-opacity=".65"/>`;
    body += label(38,610,'AI SYSTEMS',13,'#c9d4e8')+label(246,610,'WEB',13,'#c9d4e8')+label(376,610,'MOBILE',13,'#c9d4e8');
    body += `<path d="M572 603H596M590 597L596 603L590 609" stroke="#9eabda" stroke-width="1.2"/>`;
  } else {
    body += `<path d="M48 44H65" stroke="#79e7ef" stroke-width="2"/>`+label(79,48,'UTENKKEKOU / DIGITAL LAB',12);
    body += t(42,230,'lynn',188,'#f3f5ff','font-weight="700" letter-spacing="-12"');
    body += `<rect x="391" y="205" width="21" height="21" rx="3" fill="#a99cff"/>`;
    body += t(50,302,'AI. Vision. Creative engineering.',25,'#becae0');
    body += label(51,335,'IDEAS INTO EXPERIENCES',12,'#7887a3');
    body += `<path d="M48 380H1152" stroke="#353b56" stroke-opacity=".65"/>`;
    body += label(50,413,'AI SYSTEMS',12,'#c9d4e8')+label(217,413,'WEB',12,'#c9d4e8')+label(310,413,'MOBILE',12,'#c9d4e8');
    body += label(916,413,'BUILD WITH INTENT',11,'#929eb9');
    body += `<path d="M1126 408H1150M1144 402L1150 408L1144 414" stroke="#9eabda" stroke-width="1.2"/>`;
  }
  body += `<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="17.5" stroke="#4d5776" stroke-opacity=".3"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-labelledby="title desc"><title id="title">lynn — AI, vision and creative engineering</title><desc id="desc">Translucent cyan and violet ribbons with light flowing along their edges. A calm dark canvas, bold typography and no rotating objects. Motion pauses when reduced motion is preferred.</desc>${defs}${styles}${body}</svg>\n`;
}
await writeFile(`${output}/hero-prism-v3.svg`,hero());
await writeFile(`${output}/hero-prism-mobile-v3.svg`,hero(true));
console.log('Built desktop and mobile prism headers.');
