import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Original, static purpose illustrations. These are not screenshots of a product UI.
const output = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(output, { recursive: true });
const cyan = '#79e7ef', violet = '#a99cff';
const path = (d, fill = 'none', stroke = 'none', extra = '') => `<path d="${d}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const text = (x, y, value, size = 11, fill = '#8a9ab3', extra = '') => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" fill="${fill}" ${extra}>${value}</text>`;
const rect = (x, y, w, h, r, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const circle = (x, y, r, fill, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const star = (x, y, r = 6, fill = cyan) => path(`M${x} ${y-r}Q${x+r*.18} ${y-r*.18} ${x+r} ${y}Q${x+r*.18} ${y+r*.18} ${x} ${y+r}Q${x-r*.18} ${y+r*.18} ${x-r} ${y}Q${x-r*.18} ${y-r*.18} ${x} ${y-r}Z`, fill);
const defs = `<defs>
  <linearGradient id="back" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111627"/><stop offset=".55" stop-color="#090c17"/><stop offset="1" stop-color="#11142a"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#213d50" stop-opacity=".94"/><stop offset=".55" stop-color="#162133" stop-opacity=".92"/><stop offset="1" stop-color="#27203d" stop-opacity=".9"/></linearGradient>
  <linearGradient id="light" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${cyan}"/><stop offset=".6" stop-color="#a7c5ff"/><stop offset="1" stop-color="${violet}"/></linearGradient>
  <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#2b485c"/><stop offset=".55" stop-color="#273249"/><stop offset="1" stop-color="#3b2e56"/></linearGradient>
  <linearGradient id="purple" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b3a4ec"/><stop offset="1" stop-color="#655c96"/></linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#7186a4"/><stop offset=".4" stop-color="#303b57"/><stop offset="1" stop-color="#8991b3"/></linearGradient>
  <radialGradient id="ambient"><stop stop-color="#5050b0" stop-opacity=".25"/><stop offset="1" stop-color="#5050b0" stop-opacity="0"/></radialGradient>
  <filter id="blur" x="-60%" y="-100%" width="220%" height="300%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>`;
function card(title, subtitle, description, art, color = cyan) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="280" viewBox="0 0 560 280" fill="none" role="img" aria-labelledby="title desc">
<title id="title">${title} — concept illustration</title><desc id="desc">${description} Original concept illustration, not a product screenshot.</desc>
${defs}
${rect(0, 0, 560, 280, 14, 'url(#back)')}
<ellipse cx="328" cy="145" rx="235" ry="142" fill="url(#ambient)"/>
${rect(.5, .5, 559, 279, 13.5, 'none', 'stroke="#253047" stroke-opacity=".7"')}
${rect(24, 24, 3, 13, 1, color)}
${text(38, 35, title, 11, '#dbe7f6', 'letter-spacing="1.6" font-weight="600"')}
${art}
${path('M24 240H536', 'none', '#263147')}
${text(25, 261, subtitle, 10, '#97a8bf', 'letter-spacing="1.4"')}
${path('M519 254H529V264 M519 264L529 254', 'none', color, 'stroke-width="1.3"')}
</svg>\n`;
}

const footage = card('FOOTAGE OS', 'FROM FOOTAGE TO FIRST CUT.',
  'A local media library, a selected video scene and a layered editing timeline suggest finding clips, arranging a rough cut and preparing an export.',
  `<ellipse cx="286" cy="216" rx="181" ry="15" fill="#02040b" opacity=".8" filter="url(#blur)"/>
  <g transform="rotate(-8 119 123)">
    ${rect(56, 72, 126, 100, 10, '#152035', 'stroke="#465271"')}
    ${rect(64, 80, 110, 67, 5, '#253347')}
    ${path('M64 130L94 104L120 122L146 95L174 122V147H64Z', '#4b6273')}
    ${path('M64 139L110 117L145 138L174 126V147H64Z', '#779293')}
    ${rect(69, 155, 58, 4, 2, '#61738b')}
    ${rect(134, 155, 32, 4, 2, '#3e4f6a')}
  </g>
  ${rect(154, 57, 303, 164, 12, '#121a2c', 'stroke="#526784" stroke-width="1.2"')}
  ${path('M155 81H456', 'none', '#31435b')}
  ${circle(169, 69, 2, '#6a7d99')}${circle(178, 69, 2, '#6a7d99')}${circle(187, 69, 2, '#6a7d99')}
  ${rect(360, 64, 82, 11, 4, '#22394b')}
  ${rect(166, 91, 76, 60, 5, '#1b2c3d')}
  ${rect(173, 99, 27, 19, 3, '#49627a')}${rect(206, 99, 27, 19, 3, '#666084')}
  ${rect(173, 124, 27, 19, 3, '#3c6674')}${rect(206, 124, 27, 19, 3, '#424a6d')}
  ${rect(253, 91, 192, 60, 5, 'url(#screen)')}
  ${circle(399, 105, 8, '#afaad0', 'opacity=".7"')}
  ${path('M253 137L301 106L336 132L375 112L445 139V151H253Z', '#405d70')}
  ${path('M253 146L311 124L365 147L403 129L445 147V151H253Z', '#6c8191')}
  ${path('M342 109L342 132L359 120Z', '#d3f2f1')}
  ${path('M167 164H445', 'none', '#3f526c')}
  ${Array.from({length: 17}, (_, i) => path(`M${173+i*16} 161V${i%4===0?168:165}`, 'none', '#5b708e', 'stroke-width=".8"')).join('')}
  ${rect(171, 175, 77, 12, 3, '#538c9f')}${rect(252, 175, 99, 12, 3, '#7181b6')}${rect(355, 175, 85, 12, 3, '#8174ad')}
  ${path('M180 180H191 M199 180H214 M223 180H239 M263 180H279 M287 180H302 M309 180H337 M366 180H379 M387 180H421', 'none', '#c5d7ea', 'stroke-width="1.3" opacity=".65"')}
  ${rect(186, 193, 104, 9, 3, '#344664')}${rect(296, 193, 124, 9, 3, '#3f4a6a')}
  ${path('M190 198H221 M228 198H266 M307 198H336 M346 198H385 M390 198H410', 'none', '#8f9fc1', 'stroke-width="1"')}
  ${path('M324 161V209', 'none', cyan, 'stroke-width="1.4"')}
  ${path('M320 159H328L324 165Z', cyan)}
  ${rect(430, 163, 63, 39, 8, '#183142', 'stroke="#568b9b"')}
  ${path('M452 188V176 M447 181L452 176L457 181 M444 185V191H460V185', 'none', '#b4f2ef', 'stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"')}`);

const calendarCells = Array.from({length: 21}, (_, i) => {
  const x = 335 + (i%7)*18.5, y = 115 + Math.floor(i/7)*25;
  return rect(x, y, 13, 16, 3, i===3||i===11||i===15?'#3d516e':'#26344d');
}).join('');
const tradewind = card('TRADEWIND', 'TURN IDEAS INTO A CONTENT PLAN.',
  'Brand notes and draft content cards sit beside a publishing calendar, representing research, writing and planning without performance metrics.',
  `<ellipse cx="282" cy="217" rx="185" ry="15" fill="#02040b" opacity=".8" filter="url(#blur)"/>
  <g transform="rotate(-8 157 129)">
    ${rect(65, 72, 168, 133, 10, '#192439', 'stroke="#495572"')}
    ${rect(80, 89, 35, 35, 7, '#2e435e')}
    ${path('M91 109L98 98L106 109L98 117Z', 'none', '#b1c8ea', 'stroke-width="1.4"')}
    ${rect(124, 91, 77, 5, 2, '#6c7e9d')}${rect(124, 103, 55, 4, 2, '#405573')}
    ${rect(81, 139, 127, 4, 2, '#455c77')}${rect(81, 150, 107, 4, 2, '#455c77')}${rect(81, 161, 119, 4, 2, '#344a66')}
  </g>
  ${rect(289, 67, 195, 143, 12, '#172038', 'stroke="#65718d" stroke-width="1.2"')}
  ${rect(289, 67, 195, 34, 12, '#303850')}
  ${path('M289 91V101H484V91', '#303850')}
  ${rect(313, 57, 6, 22, 3, '#9aa9c5')}${rect(455, 57, 6, 22, 3, '#9aa9c5')}
  ${text(342, 88, 'CONTENT PLAN', 9, '#c8d6e8', 'letter-spacing="1.4"')}
  ${calendarCells}
  ${rect(316, 116, 12, 15, 3, '#344760')}${rect(316, 141, 12, 15, 3, '#344760')}${rect(316, 166, 12, 15, 3, '#344760')}
  ${rect(352, 117, 48, 12, 3, '#788ab4')}${rect(371, 142, 48, 12, 3, '#609ba8')}${rect(335, 167, 47, 12, 3, '#8b7cae')}
  ${path('M358 123H390 M377 148H409 M341 173H373', 'none', '#e3edf3', 'stroke-width="1.2" opacity=".7"')}
  ${rect(146, 91, 171, 129, 10, 'url(#glass)', 'stroke="#7e8aa8" stroke-width="1.2"')}
  ${rect(160, 106, 28, 28, 6, '#465272')}
  ${path('M168 121C168 115 173 113 176 116 M177 125L183 115', 'none', violet, 'stroke-width="2" stroke-linecap="round"')}
  ${text(198, 120, 'DRAFT', 10, '#d7def2', 'letter-spacing="1.4"')}
  ${rect(161, 146, 135, 4, 2, '#788ba7')}${rect(161, 158, 121, 4, 2, '#536e8c')}${rect(161, 170, 130, 4, 2, '#536e8c')}
  ${rect(161, 191, 75, 15, 5, '#345367')}
  ${path('M173 198H223', 'none', '#93c7d6', 'stroke-width="1.1"')}
  ${path('M276 194L282 200L294 188', 'none', cyan, 'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"')}`, violet);

const frontdesk = card('AI FRONT-DESK', 'WELCOME VISITORS. START CONVERSATIONS.',
  'A company website with a welcoming chat panel and a short contact form suggests answering common questions and collecting visitor enquiries.',
  `<ellipse cx="282" cy="215" rx="187" ry="16" fill="#02040b" opacity=".8" filter="url(#blur)"/>
  ${rect(70, 62, 357, 154, 12, '#131d30', 'stroke="#4e6681" stroke-width="1.2"')}
  ${path('M71 86H426', 'none', '#35445d')}
  ${circle(86, 74, 2, '#6d819a')}${circle(96, 74, 2, '#6d819a')}${circle(106, 74, 2, '#6d819a')}
  ${rect(146, 69, 176, 10, 4, '#24344c')}
  ${path('M163 74H239', 'none', '#516783', 'stroke-width="1"')}
  ${text(94, 119, 'Welcome.', 22, '#dce7f8', 'font-weight="600" letter-spacing="-.4"')}
  ${rect(96, 132, 156, 4, 2, '#4f6581')}${rect(96, 143, 118, 4, 2, '#364e6a')}
  ${rect(96, 163, 117, 11, 4, '#1d3147', 'stroke="#40556d"')}
  ${rect(96, 180, 117, 11, 4, '#1d3147', 'stroke="#40556d"')}
  ${path('M105 168H154 M105 185H175', 'none', '#617a93', 'stroke-width="1"')}
  ${rect(223, 163, 44, 28, 5, '#3b6677')}
  ${path('M236 177H254 M249 172L254 177L249 182', 'none', '#bef2ef', 'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"')}
  ${rect(316, 87, 176, 135, 11, 'url(#glass)', 'stroke="#7281a3" stroke-width="1.2"')}
  ${path('M317 118H491', 'none', '#3b506a')}
  ${rect(330, 96, 16, 14, 5, '#4e8496')}
  ${path('M334 109L332 113L339 110', '#4e8496')}
  ${text(355, 106, 'LET’S TALK', 9, '#cfdfed', 'letter-spacing="1.2"')}
  ${circle(474, 103, 2, '#99e5d1')}
  ${rect(329, 129, 137, 29, 7, '#2d4c63')}
  ${text(339, 147, 'How can we help?', 10, '#d4e9f0')}
  ${rect(373, 164, 104, 20, 6, '#4a456a')}
  ${path('M384 174H432 M438 174H463', 'none', '#b1acd2', 'stroke-width="1.2"')}
  ${rect(329, 194, 148, 16, 6, '#101d2f', 'stroke="#384e68"')}
  ${path('M340 202H389 M461 198L467 202L461 206', 'none', '#7797b1', 'stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"')}`);

const lumechoArt = `<ellipse cx="285" cy="218" rx="158" ry="15" fill="#02040b" opacity=".8" filter="url(#blur)"/>
  ${star(119, 83, 7, '#99c9e8')}${star(428, 109, 8, violet)}${star(454, 174, 5, cyan)}
  ${circle(149, 133, 1.5, '#91a8d3')}${circle(399, 66, 1.5, '#ada8d2')}${circle(412, 193, 1.5, '#81c1cb')}
  <g transform="rotate(-12 197 145)">
    ${rect(155, 87, 84, 123, 8, '#20283f', 'stroke="#665c88" stroke-width="1.1"')}
    ${rect(162, 94, 70, 109, 5, 'none', 'stroke="#4b5378"')}
    ${path('M197 117L213 143L197 169L181 143Z', 'none', '#9695c7', 'stroke-width="1.1"')}
    ${star(197, 143, 13, '#b2a6df')}
    ${circle(179, 111, 1.5, '#8f8eb8')}${circle(214, 184, 1.5, '#8f8eb8')}
    ${path('M184 185H209', 'none', '#7e719c', 'stroke-width="1"')}
  </g>
  ${rect(237, 51, 114, 175, 19, '#0c1121', 'stroke="url(#metal)" stroke-width="2"')}
  ${rect(244, 58, 100, 161, 14, 'url(#screen)')}
  ${rect(278, 63, 32, 5, 3, '#0c1324')}
  ${text(263, 86, 'LUMECHO', 8, '#d9def1', 'letter-spacing="1.7"')}
  ${path('M304 97C286 92 274 107 278 120C283 136 303 139 314 124C302 127 291 119 291 109C292 103 297 99 304 97Z', '#b6c1e7')}
  ${star(321, 105, 4, '#d4d6f0')}${circle(263, 117, 1.1, '#a4c3df')}${circle(311, 141, 1.1, '#a4c3df')}
  ${rect(255, 150, 77, 39, 7, '#1d2a43', 'stroke="#65708f"')}
  ${text(265, 165, 'TODAY', 7.5, '#c9cfe8', 'letter-spacing="1.4"')}
  ${path('M265 175H319 M265 181H302', 'none', '#6f86a6', 'stroke-width="1"')}
  ${rect(260, 198, 66, 12, 5, '#4b527e')}
  ${star(271, 204, 3, '#c9c8ef')}
  ${path('M280 204H314', 'none', '#b8bfe2', 'stroke-width="1"')}
  ${rect(335, 139, 93, 52, 9, '#1e3147', 'stroke="#62748c"')}
  ${path('M352 190L345 202L367 190', '#1e3147', '#62748c', 'stroke-width="1"')}
  ${path('M351 155H408 M351 164H397 M351 173H382', 'none', '#8ab5c9', 'stroke-width="1.5" stroke-linecap="round"')}
  ${star(381, 86, 5, '#c1b8e7')}`;
const lumecho = card('LUMECHO', 'A DAILY MOMENT OF WONDER.',
  'A luminous mobile screen with celestial motifs, an inspiration card and a small question bubble suggests daily reflection, star culture, card draws and AI conversation.',
  lumechoArt, violet);

// The panoramic composition keeps the original mobile illustration at its native size.
// The surrounding night landscapes are decorative, not additional product capabilities.
const lumechoWide = `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="280" viewBox="0 0 1120 280" fill="none" role="img" aria-labelledby="title desc">
<title id="title">LUMECHO — panoramic concept illustration</title><desc id="desc">A luminous mobile screen, an inspiration card and a conversation bubble sit between softly lit night landscapes and quiet constellations. Original concept illustration, not a product screenshot.</desc>
${defs}
${rect(0, 0, 1120, 280, 14, 'url(#back)')}
<ellipse cx="560" cy="145" rx="425" ry="165" fill="url(#ambient)"/>
<ellipse cx="192" cy="155" rx="230" ry="115" fill="url(#ambient)" opacity=".45"/>
<ellipse cx="935" cy="145" rx="215" ry="130" fill="url(#ambient)" opacity=".55"/>
${rect(.5, .5, 1119, 279, 13.5, 'none', 'stroke="#253047" stroke-opacity=".7"')}
${rect(24, 24, 3, 13, 1, violet)}
${text(38, 35, 'LUMECHO', 11, '#dbe7f6', 'letter-spacing="1.6" font-weight="600"')}
${path('M58 217C126 205 157 211 216 201S330 205 388 213 M731 214C795 196 854 204 909 211S1010 212 1064 202', 'none', '#37435f', 'stroke-width="1" opacity=".65"')}
${path('M77 154C178 114 272 141 367 104 M756 120C841 83 947 111 1035 76', 'none', '#606a9a', 'stroke-width="1" opacity=".22"')}
<g transform="rotate(-5 234 141)">
  ${rect(128, 83, 213, 120, 12, 'url(#glass)', 'stroke="#4b5f7c" stroke-width="1"')}
  ${rect(136, 91, 197, 104, 7, '#1b263c')}
  ${path('M136 169L168 150L196 165L234 129L267 155L299 143L333 168V195H136Z', '#30435a')}
  ${path('M136 184L186 163L222 180L270 161L307 178L333 172V195H136Z', '#42546c')}
  ${path('M136 194Q193 176 240 187T333 186V195H136Z', '#536278')}
  ${path('M160 113L186 124L213 107L243 116L271 103L307 118', 'none', '#98a1ca', 'stroke-width=".9" opacity=".6"')}
  ${circle(160, 113, 1.8, '#aac5de')}${circle(186, 124, 1.4, '#9eb6d5')}${star(213, 107, 4, '#c1b5e4')}${circle(243, 116, 1.5, '#a5b0d1')}${circle(271, 103, 2, '#a6b9df')}${circle(307, 118, 1.3, '#a5b0d1')}
  ${path('M151 181Q185 174 211 182', 'none', '#8c9bb3', 'stroke-width=".8" opacity=".6"')}
</g>
${star(98, 103, 5, '#8eb7d1')}${star(306, 61, 5, '#aaa0d4')}${star(357, 171, 3, '#91c7d4')}
${circle(69, 176, 1.4, '#8b98bd')}${circle(112, 63, 1.1, '#909ac2')}${circle(364, 82, 1.5, '#8793ba')}
<g transform="rotate(5 895 139)">
  ${rect(797, 75, 196, 132, 12, 'url(#glass)', 'stroke="#665f84" stroke-width="1"')}
  ${rect(805, 83, 180, 116, 7, '#20283e')}
  ${path('M805 171Q839 146 869 165L900 143L940 166L963 151L985 164V199H805Z', '#3b425f')}
  ${path('M805 187Q848 165 891 181T985 179V199H805Z', '#55506f')}
  ${path('M805 195Q848 182 895 192T985 187V199H805Z', '#6c607f')}
  ${path('M832 114L861 101L882 123L914 106L950 119', 'none', '#b2a2d1', 'stroke-width=".9" opacity=".7"')}
  ${circle(832, 114, 1.7, '#a7b8d9')}${star(861, 101, 4, '#d4c5ed')}${circle(882, 123, 1.7, '#b9acd7')}${circle(914, 106, 2, '#b8b8df')}${circle(950, 119, 1.6, '#c1b6e0')}
  ${star(961, 94, 3, '#a9bbdb')}${circle(925, 143, 1.1, '#979bbf')}${circle(840, 143, 1.2, '#979bbf')}
  ${path('M845 187Q868 181 892 187', 'none', '#b4a1bd', 'stroke-width=".8" opacity=".55"')}
</g>
${star(1030, 120, 6, '#b8a8dc')}${star(779, 72, 4, '#a7b9e1')}${star(747, 180, 3, '#a0c5db')}
${circle(1012, 177, 1.5, '#9897c0')}${circle(1061, 83, 1.1, '#9897c0')}${circle(769, 143, 1.2, '#9a9cc7')}
<g transform="translate(266 0)">${lumechoArt}</g>
${path('M24 240H1096', 'none', '#263147')}
${text(25, 261, 'A DAILY MOMENT OF WONDER.', 10, '#97a8bf', 'letter-spacing="1.4"')}
${path('M1079 254H1089V264 M1079 264L1089 254', 'none', violet, 'stroke-width="1.3"')}
</svg>\n`;

await Promise.all([
  ['project-footage-v1.svg', footage], ['project-tradewind-v1.svg', tradewind],
  ['project-frontdesk-v1.svg', frontdesk], ['project-lumecho-v1.svg', lumecho],
  ['project-lumecho-wide-v1.svg', lumechoWide],
].map(([name, svg]) => writeFile(`${output}/${name}`, svg)));
console.log('Built 4 original portfolio purpose illustrations and 1 panoramic variant.');
