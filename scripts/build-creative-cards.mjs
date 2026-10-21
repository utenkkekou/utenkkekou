import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Original product-purpose illustrations, not screenshots or implementation diagrams.
const output = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(output, { recursive: true });
const cyan = '#79e7ef', violet = '#a99cff', gold = '#dfbf86';
const path = (d, fill = 'none', stroke = 'none', extra = '') => `<path d="${d}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const rect = (x, y, w, h, r, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const circle = (x, y, r, fill, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const text = (x, y, value, size = 11, fill = '#8a9ab3', extra = '') => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" fill="${fill}" ${extra}>${value}</text>`;
const star = (x, y, r, fill) => path(`M${x} ${y-r}Q${x+1} ${y-1} ${x+r} ${y}Q${x+1} ${y+1} ${x} ${y+r}Q${x-1} ${y+1} ${x-r} ${y}Q${x-1} ${y-1} ${x} ${y-r}Z`, fill);
const defs = `<defs>
  <linearGradient id="back" x2="1" y2="1"><stop stop-color="#111627"/><stop offset=".55" stop-color="#090c17"/><stop offset="1" stop-color="#11142a"/></linearGradient>
  <linearGradient id="glass" x2="1" y2="1"><stop stop-color="#243d50" stop-opacity=".94"/><stop offset=".55" stop-color="#192338" stop-opacity=".96"/><stop offset="1" stop-color="#2e2546" stop-opacity=".9"/></linearGradient>
  <linearGradient id="rim" x2="1" y2="1"><stop stop-color="#8ddae3"/><stop offset=".5" stop-color="#7189aa"/><stop offset="1" stop-color="#b2a0d7"/></linearGradient>
  <linearGradient id="pages" x2="1" y2="1"><stop stop-color="#c4cfdf"/><stop offset=".58" stop-color="#8b9db7"/><stop offset="1" stop-color="#63738e"/></linearGradient>
  <linearGradient id="pageFold"><stop stop-color="#25344c" stop-opacity="0"/><stop offset=".83" stop-color="#27334b" stop-opacity=".08"/><stop offset="1" stop-color="#172035" stop-opacity=".42"/></linearGradient>
  <linearGradient id="portrait" x2="1" y2="1"><stop stop-color="#423857"/><stop offset=".5" stop-color="#273149"/><stop offset="1" stop-color="#223e4c"/></linearGradient>
  <linearGradient id="hair" x2=".7" y2="1"><stop stop-color="#c1afd6"/><stop offset=".52" stop-color="#8d7da9"/><stop offset="1" stop-color="#4c496e"/></linearGradient>
  <linearGradient id="skin" x2="1" y2="1"><stop stop-color="#e2c6c8"/><stop offset="1" stop-color="#b392a5"/></linearGradient>
  <linearGradient id="jacket" x2="1" y2="1"><stop stop-color="#354c69"/><stop offset="1" stop-color="#1c2d47"/></linearGradient>
  <linearGradient id="album" x2="1" y2="1"><stop stop-color="#493743"/><stop offset=".54" stop-color="#29243c"/><stop offset="1" stop-color="#142a3c"/></linearGradient>
  <linearGradient id="gold" x2="1" y2="1"><stop stop-color="#f4d9aa"/><stop offset=".42" stop-color="#c3a678"/><stop offset="1" stop-color="#856c6e"/></linearGradient>
  <linearGradient id="wave" gradientUnits="userSpaceOnUse" x1="305" y1="0" x2="445" y2="0"><stop stop-color="#809cb4"/><stop offset=".43" stop-color="#e3c28e"/><stop offset=".72" stop-color="#bc9ab4"/><stop offset="1" stop-color="#8c89b9"/></linearGradient>
  <radialGradient id="ambient"><stop stop-color="#5050b0" stop-opacity=".25"/><stop offset="1" stop-color="#5050b0" stop-opacity="0"/></radialGradient>
  <filter id="blur" x="-60%" y="-100%" width="220%" height="300%"><feGaussianBlur stdDeviation="9"/></filter>
  <clipPath id="portraitClip"><rect x="194" y="65" width="132" height="157" rx="13"/></clipPath>
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

const storyloom = card('STORYLOOM', 'GIVE YOUR STORY A WORLD.',
  'An open illustrated book leads into a floating world map and branching story cards, suggesting story planning, world exploration and alternative narrative paths.',
  `<ellipse cx="278" cy="214" rx="185" ry="16" fill="#02040b" opacity=".85" filter="url(#blur)"/>
  ${rect(309, 58, 181, 119, 11, 'url(#glass)', 'stroke="#556a89" stroke-width="1.2"')}
  ${path('M324 92L353 78L374 90L397 74L421 83L437 75L473 96L465 121L440 134L412 122L392 143L366 130L341 136L324 115Z', '#34475d', '#536b83', 'stroke-width=".8"')}
  ${path('M355 85C374 99 369 108 394 116C412 121 418 130 431 133', 'none', '#80b8c3', 'stroke-width="2" opacity=".65"')}
  ${path('M345 115Q370 101 398 95T455 104', 'none', '#b9b2e2', 'stroke-width="1.2" stroke-dasharray="3 5"')}
  ${path('M386 98L396 82L405 97 M427 107L437 92L447 108', 'none', '#91a3bd', 'stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"')}
  ${circle(345, 115, 3, cyan)}${circle(399, 95, 3, '#d4bded')}${circle(455, 104, 3, '#d4bded')}
  ${rect(325, 151, 45, 4, 2, '#6e839c')}${rect(377, 151, 27, 4, 2, '#425b74')}
  ${path('M95 137Q148 111 207 130Q256 104 309 122L315 197Q260 188 209 214Q153 192 96 208Z', '#26334e', '#66718f', 'stroke-width="1"')}
  ${path('M103 132Q152 111 207 128V205Q156 186 102 200Z', 'url(#pages)', '#a6b4cc', 'stroke-width=".8"')}
  ${path('M207 128Q254 102 302 117L307 190Q254 183 207 205Z', '#b2bdd4', '#b7c5dd', 'stroke-width=".8"')}
  ${path('M103 132Q152 111 207 128V205Q156 186 102 200Z', 'url(#pageFold)')}
  ${path('M207 129V205 M103 204Q155 191 207 211Q255 186 308 196', 'none', '#515e78', 'stroke-width="1.2"')}
  ${path('M223 145L246 127L260 139L280 122L289 159Q254 157 224 173Z', '#697b9d')}
  ${path('M225 163L245 145L264 155L280 140L289 159Q252 158 225 174Z', '#426578')}
  ${circle(278, 128, 5, '#dfcae7')}
  ${path('M119 143Q147 132 188 140 M119 152Q145 142 187 149 M119 162Q145 152 177 156 M119 179Q145 170 186 177 M222 182Q255 170 286 176', 'none', '#65758e', 'stroke-width="2" stroke-linecap="round"')}
  ${path('M207 128L213 127V171L209 166L205 174V129', '#9b7bab')}
  ${path('M316 198H339Q346 198 346 191V180 M346 198H385 M346 198V211Q346 219 355 219H424', 'none', '#637d9d', 'stroke-width="1.2"')}
  ${rect(365, 177, 43, 26, 6, '#22374a', 'stroke="#7ca6b6"')}
  ${path('M375 187H396 M375 193H389', 'none', '#9fc3d4', 'stroke-width="1.2"')}
  ${rect(424, 201, 45, 26, 6, '#302d48', 'stroke="#82729f"')}
  ${path('M434 211H457 M434 217H450', 'none', '#b7a4d5', 'stroke-width="1.2"')}
  ${star(274, 77, 6, '#c1b5e5')}${star(132, 91, 4, '#8ab8d2')}`, violet);

const kirakira = card('KIRAKIRA', 'CHARACTERS. CONVERSATIONS. STORIES.',
  'An original illustrated character portrait sits between soft glass chat bubbles, suggesting character creation and gentle story conversations.',
  `<ellipse cx="278" cy="218" rx="179" ry="14" fill="#02040b" opacity=".8" filter="url(#blur)"/>
  <g transform="rotate(-7 226 138)">
    ${rect(176, 66, 126, 154, 12, '#302a48', 'stroke="#60587d"')}
    ${rect(185, 75, 108, 135, 8, '#283448')}
  </g>
  ${rect(194, 65, 132, 157, 13, 'url(#portrait)', 'stroke="url(#rim)" stroke-width="1.3"')}
  <g clip-path="url(#portraitClip)">
    ${path('M201 222Q199 187 228 180L242 176H279L295 184Q319 190 325 222Z', 'url(#jacket)')}
    ${path('M245 161V183L258 196L276 181V161Z', 'url(#skin)')}
    ${path('M228 182L244 177L258 196L244 210Z M277 177L293 184L273 210L258 196Z', '#6d7e9d', '#94a4bb', 'stroke-width=".8"')}
    ${path('M216 147Q208 103 230 89Q255 71 282 88Q309 100 304 143L299 177L281 186L282 160H233L232 188L216 171Z', 'url(#hair)')}
    ${path('M229 117Q259 93 289 115V145Q286 171 261 181Q236 175 229 149Z', 'url(#skin)')}
    ${path('M220 122Q220 92 247 89Q273 78 293 100L299 125L285 111Q275 105 268 103Q258 122 235 129L241 110Q231 120 220 132Z', 'url(#hair)')}
    ${path('M243 101Q247 111 238 120 M269 95Q284 98 289 111', 'none', '#d1bfdc', 'stroke-width="1.5" opacity=".55"')}
    ${path('M237 143Q243 139 249 143 M271 143Q277 139 283 143', 'none', '#4b405c', 'stroke-width="1.5" stroke-linecap="round"')}
    ${circle(244, 144, 2.4, '#4f526f')}${circle(277, 144, 2.4, '#4f526f')}
    ${circle(244.7, 143.2, .7, '#e5eaf5')}${circle(277.7, 143.2, .7, '#e5eaf5')}
    ${path('M257 163Q262 167 268 162', 'none', '#8c627c', 'stroke-width="1.2" stroke-linecap="round"')}
    <ellipse cx="238" cy="155" rx="5" ry="2.4" fill="#c989a7" opacity=".35"/><ellipse cx="283" cy="155" rx="5" ry="2.4" fill="#c989a7" opacity=".35"/>
    ${path('M212 109Q206 146 220 172 M300 108Q311 145 296 175', 'none', '#a195bf', 'stroke-width="3" stroke-linecap="round"')}
    ${circle(288, 159, 2, '#b5e3e6')}
    ${rect(206, 207, 108, 10, 5, '#101c2e', 'opacity=".5"')}
  </g>
  ${rect(62, 92, 115, 66, 12, '#23374c', 'stroke="#618398" stroke-width="1.1"')}
  ${path('M155 157L169 171L166 157', '#23374c', '#618398', 'stroke-width="1.1"')}
  ${text(78, 119, 'Hello, you.', 15, '#c6edf0', 'font-weight="500"')}
  ${path('M79 136H145', 'none', '#6b9dad', 'stroke-width="2" stroke-linecap="round"')}
  ${rect(337, 127, 156, 64, 12, 'url(#glass)', 'stroke="#8a789f" stroke-width="1.1"')}
  ${path('M349 190L337 203L342 190', '#243046', '#8a789f', 'stroke-width="1.1"')}
  ${text(353, 150, 'Our story starts here.', 12, '#d9c9ed')}
  ${path('M353 167H450 M353 177H417', 'none', '#8e80a7', 'stroke-width="1.6" stroke-linecap="round"')}
  ${star(364, 86, 9, '#d2a9d2')}${star(397, 71, 4, '#a99cff')}${star(117, 196, 5, '#81c4cf')}
  ${circle(431, 100, 2, '#8ea6cc')}${circle(153, 77, 1.6, '#a99bbf')}`, '#c8a5d4');

const waveHeights = [11,17,30,48,61,43,23,36,69,84,59,37,24,47,64,44,25,15,25,38,20];
const waveform = waveHeights.map((h,i) => path(`M${305+i*7} ${145-h/2}V${145+h/2}`, 'none', 'url(#wave)', `stroke-width="3" stroke-linecap="round" opacity="${i%4===0?'.7':'1'}"`)).join('');
const aurum = card('AURUM', 'FROM A SPARK TO A SOUND.',
  'A warm gold album cover and a sculpted waveform float above a small playback strip, suggesting musical ideas, listening and organizing creative works.',
  `<ellipse cx="280" cy="217" rx="183" ry="15" fill="#02040b" opacity=".85" filter="url(#blur)"/>
  <g transform="rotate(7 204 135)">
    ${rect(124, 61, 146, 151, 9, '#292b44', 'stroke="#5d5876"')}
    ${rect(132, 69, 130, 135, 5, '#232c42')}
  </g>
  ${rect(286, 88, 200, 115, 12, 'url(#glass)', 'stroke="#625c78" stroke-width="1.1"')}
  ${path('M300 145H469', 'none', '#50536b', 'stroke-width=".8" opacity=".45"')}
  ${waveform}
  ${path('M300 187H470', 'none', '#3c435b', 'stroke-width="1"')}
  ${path('M300 187H401', 'none', '#bca17d', 'stroke-width="1.5"')}
  ${circle(401, 187, 2, '#ead4ac')}
  <g transform="rotate(-7 179 137)">
    ${rect(101, 58, 152, 157, 10, 'url(#album)', 'stroke="#8c7b87" stroke-width="1.2"')}
    ${rect(110, 67, 134, 139, 6, 'none', 'stroke="#6e5a65" stroke-opacity=".7"')}
    ${path('M111 169C139 154 142 136 165 143C184 149 188 110 217 111C228 111 236 100 243 90V188H111Z', '#b9966a', 'none', 'opacity=".12"')}
    ${path('M111 173C142 158 145 137 169 145C189 153 191 115 218 116C227 117 235 108 243 103', 'none', '#dfbd82', 'stroke-width="1.2" opacity=".7"')}
    ${path('M111 181C139 163 149 149 170 155C190 164 202 129 225 132C233 133 238 125 243 120', 'none', '#ae8c79', 'stroke-width="1" opacity=".55"')}
    ${path('M150 139L176 88L204 139H189L176 112L162 139Z', 'url(#gold)')}
    ${path('M164 129H189', 'none', '#ead4ac', 'stroke-width="1.4"')}
    ${text(137, 190, 'A U R U M', 12, '#dcc6a2', 'font-weight="500"')}
    ${star(217, 86, 4, '#d9bd93')}
  </g>
  ${rect(286, 211, 124, 14, 7, '#1b2437', 'stroke="#424a64"')}
  ${path('M299 215V221L304 218Z', '#dcc39b')}
  ${path('M316 218H394', 'none', '#7f7585', 'stroke-width="1.5" stroke-linecap="round"')}
  ${star(457, 66, 5, '#c0aacd')}`, gold);

await Promise.all([
  ['project-storyloom-v1.svg', storyloom],
  ['project-kirakira-v1.svg', kirakira],
  ['project-aurum-v1.svg', aurum],
].map(([name, svg]) => writeFile(`${output}/${name}`, svg)));
console.log('Built 3 original creative project illustrations.');
