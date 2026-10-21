import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Original, deterministic vector concept illustrations. No remote resources.
const output = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(output, { recursive: true });
const ink = '#090c17', cyan = '#79e7ef', violet = '#a99cff';
const path = (d, fill = 'none', stroke = 'none', extra = '') => `<path d="${d}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const text = (x, y, value, size = 11, fill = '#8a9ab3', extra = '') => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" fill="${fill}" ${extra}>${value}</text>`;
const rect = (x, y, w, h, r, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const circle = (x, y, r, fill, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const defs = `<defs>
  <linearGradient id="back" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111627"/><stop offset=".55" stop-color="${ink}"/><stop offset="1" stop-color="#11142a"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#213d50" stop-opacity=".94"/><stop offset=".55" stop-color="#162133" stop-opacity=".92"/><stop offset="1" stop-color="#27203d" stop-opacity=".9"/></linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#bdcce3"/><stop offset=".3" stop-color="#55647b"/><stop offset=".7" stop-color="#273047"/><stop offset="1" stop-color="#6e7b96"/></linearGradient>
  <linearGradient id="lens" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#416579" stop-opacity=".8"/><stop offset=".48" stop-color="#132738" stop-opacity=".8"/><stop offset="1" stop-color="#382f62" stop-opacity=".9"/></linearGradient>
  <linearGradient id="light" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${cyan}"/><stop offset=".6" stop-color="#a7c5ff"/><stop offset="1" stop-color="${violet}"/></linearGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#223143"/><stop offset="1" stop-color="#141b2a"/></linearGradient>
  <linearGradient id="wall" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#26344a"/><stop offset="1" stop-color="#1b2439"/></linearGradient>
  <linearGradient id="sofa" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b1a8dc"/><stop offset="1" stop-color="#756d9f"/></linearGradient>
  <radialGradient id="ambient"><stop stop-color="#5050b0" stop-opacity=".25"/><stop offset="1" stop-color="#5050b0" stop-opacity="0"/></radialGradient>
  <filter id="blur" x="-60%" y="-100%" width="220%" height="300%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="smallglow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>`;
function card(index, title, subtitle, description, art, color = cyan) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="280" viewBox="0 0 560 280" fill="none" role="img" aria-labelledby="title desc">
<title id="title">${title} — concept illustration</title><desc id="desc">${description} Concept illustration, not a product screenshot.</desc>
${defs}
${rect(0, 0, 560, 280, 14, 'url(#back)')}
<ellipse cx="328" cy="145" rx="235" ry="142" fill="url(#ambient)"/>
${rect(.5, .5, 559, 279, 13.5, 'none', 'stroke="#253047" stroke-opacity=".7"')}
${rect(24, 24, 3, 13, 1, color)}
${text(38, 35, title, 11, '#dbe7f6', 'letter-spacing="1.6" font-weight="600"')}
${text(510, 35, `0${index}`, 11, color, 'letter-spacing="1.4"')}
${art}
${path('M24 240H536', 'none', '#263147')}
${text(25, 261, subtitle, 10, '#97a8bf', 'letter-spacing="1.4"')}
${path('M519 254H529V264 M519 264L529 254', 'none', color, 'stroke-width="1.3"')}
</svg>\n`;
}

const nexus = card(1, 'CORE NEXUS AI', 'ONE GATEWAY. MANY MODELS.',
  'A luminous model core suspended above layered glass platforms with connected input and output cards.',
  `<ellipse cx="289" cy="208" rx="114" ry="17" fill="#02040b" opacity=".8" filter="url(#blur)"/>
  ${path('M155 180L279 117L411 179L287 225Z', '#192035', '#394365', 'stroke-width="1"')}
  ${path('M155 180V187L287 233L411 186V179L287 225Z', '#10172a', '#263650', 'stroke-width=".8"')}
  ${path('M171 156L279 102L395 155L287 201Z', 'url(#glass)', '#60759c', 'stroke-width="1.2"')}
  ${path('M171 156V163L287 207L395 162V155L287 201Z', '#1a253a')}
  ${path('M189 132L279 87L377 131L287 174Z', 'url(#glass)', 'url(#light)', 'stroke-width="1.2"')}
  ${path('M189 132V137L287 180L377 136V131L287 174Z', '#233348')}
  ${path('M202 129L280 91L365 130', 'none', '#b6f5f4', 'stroke-width="1.4" opacity=".5"')}
  ${path('M250 111L282 95L315 110L283 127Z', '#6de3ee', 'none', 'opacity=".5" filter="url(#blur)"')}
  ${path('M253 106L282 91L312 105V135L283 150L253 136Z', 'url(#glass)', 'url(#light)', 'stroke-width="1.5"')}
  ${path('M253 106L283 121L312 105 M283 121V150', 'none', '#b5eff4', 'stroke-width="1.4"')}
  ${path('M263 101L282 92L302 101L282 111Z', '#8be9ec', 'none', 'opacity=".9"')}
  ${path('M192 127H142V100H102 M376 131H430V98H462 M395 157H449V183H486', 'none', '#4b718c', 'stroke-width="1"')}
  ${rect(59, 75, 78, 43, 8, '#121d30', 'stroke="#435c79"')}
  ${rect(66, 82, 25, 28, 5, '#22384a')}
  ${path('M72 90H85 M72 96H82 M72 102H85', 'none', cyan, 'stroke-width="1.5"')}
  ${text(98, 101, 'ASK', 9, '#afc4dd', 'letter-spacing="1"')}
  ${rect(432, 70, 76, 43, 8, '#171e34', 'stroke="#535b83"')}
  ${path('M444 94L452 84L460 94L452 102Z', 'none', violet, 'stroke-width="1.4"')}
  ${text(470, 96, 'AI', 10, '#d3c9ff')}
  ${rect(455, 164, 60, 37, 7, '#132333', 'stroke="#365a70"')}
  ${path('M468 183L475 189L489 175', 'none', cyan, 'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"')}
  ${circle(142, 100, 2, cyan)}${circle(430, 98, 2, violet)}${circle(449, 183, 2, cyan)}
  ${text(46, 206, 'MODELS, CONNECTED.', 8, '#647891', 'letter-spacing="1.2"')}`);

const vision = card(2, 'PTL-DETECT', 'SEE THE SIGNAL. REFINE THE DATA.',
  'A stylized signal viewed through a floating annotation frame, with colored label chips beside it.',
  `<ellipse cx="278" cy="214" rx="173" ry="15" fill="#02040b" opacity=".8" filter="url(#blur)"/>
  ${rect(84, 63, 289, 151, 12, '#101a2a', 'stroke="#2c405a"')}
  ${path('M85 178L155 119L217 158L269 113L372 175V204Q372 213 363 213H94Q85 213 85 204Z', '#182b3a')}
  ${path('M85 191L160 153L230 182L290 149L372 191V204Q372 213 363 213H94Q85 213 85 204Z', '#203645')}
  ${path('M85 199H372 M131 200L184 159 M325 200L277 163', 'none', '#3f5669', 'stroke-width="1" opacity=".6"')}
  ${rect(228, 97, 14, 117, 2, '#263c50')}
  ${rect(204, 77, 62, 110, 17, '#080f1b', 'stroke="#63778e" stroke-width="2"')}
  ${rect(211, 84, 48, 96, 12, '#172637', 'stroke="#233c50"')}
  ${circle(235, 108, 15, '#3e2938')}
  ${circle(235, 108, 10, '#ed708c', 'opacity=".32"')}
  ${circle(235, 153, 18, '#79e7cf', 'opacity=".5" filter="url(#smallglow)"')}
  ${circle(235, 153, 13, '#9bf1d8')}
  ${path('M191 98V65H218 M251 65H280V98 M191 167V199H218 M251 199H280V167', 'none', cyan, 'stroke-width="2.5" stroke-linecap="round"')}
  ${path('M192 131H279', 'none', '#9eeff4', 'stroke-width="1.2" opacity=".5"')}
  ${path('M280 85H326L349 73H399 M280 179H328L349 191H399', 'none', '#5c7798', 'stroke-width="1"')}
  ${rect(387, 58, 122, 35, 8, '#142736', 'stroke="#4e929e"')}
  ${circle(404, 75, 3, cyan)}${text(416, 79, 'ANNOTATE', 9, '#c2f3f4', 'letter-spacing="1"')}
  ${rect(387, 107, 122, 35, 8, '#20233c', 'stroke="#5a6287"')}
  ${path('M400 125L405 130L413 120', 'none', violet, 'stroke-width="1.5"')}
  ${text(425, 129, 'REVIEW', 9, '#d7d0f4', 'letter-spacing="1"')}
  ${rect(387, 173, 122, 35, 8, '#142736', 'stroke="#37586d"')}
  ${path('M399 193V186 M405 193V182 M411 193V179', 'none', cyan, 'stroke-width="2" stroke-linecap="round"')}
  ${text(423, 195, 'IMPROVE', 9, '#afccd8', 'letter-spacing="1"')}
  ${rect(97, 76, 57, 18, 4, '#193245', 'stroke="#294d60"')}
  ${text(106, 88, 'VISION', 8, '#a6d5e3', 'letter-spacing=".8"')}`, violet);

const spatial = card(3, '3D ROOM STUDIO', 'PLAN YOUR SPACE. MAKE IT YOURS.',
  'An isometric room with a lavender sofa, a rug, a low table, window light and a plant.',
  `<ellipse cx="284" cy="218" rx="173" ry="15" fill="#02040b" opacity=".85" filter="url(#blur)"/>
  ${path('M110 155L270 77L433 151V176L276 237L110 169Z', '#111b2d', '#35405b', 'stroke-width="1"')}
  ${path('M110 155L270 77L433 151L276 219Z', 'url(#floor)', '#647086', 'stroke-width="1.1"')}
  ${path('M110 155V85L270 20V77Z', 'url(#wall)', '#52667c', 'stroke-width="1"')}
  ${path('M270 20L433 92V151L270 77Z', '#18243a', '#35475f', 'stroke-width="1"')}
  ${path('M112 85L270 21L431 92', 'none', '#8a9caf', 'stroke-width="1.2"')}
  ${path('M142 87L227 52V113L142 151Z', '#12293a', '#68869e', 'stroke-width="1"')}
  ${path('M149 91L220 62V108L149 139Z', '#274b5d')}
  ${path('M154 92L179 82V126L154 137Z', '#70b6c4', 'none', 'opacity=".32"')}
  ${path('M184 76V122 M149 111L220 82', 'none', '#7eb1bf', 'stroke-width="1.5"')}
  ${path('M150 151L229 115L319 160L241 199Z', '#476073', 'none', 'opacity=".32"')}
  ${path('M178 156L270 112L365 154L275 195Z', '#4d536e', '#69718d', 'stroke-width=".8"')}
  ${path('M183 156L270 116L359 154L275 191Z', '#363d56')}
  ${path('M285 99L346 126V144L284 118Z', '#5e587e')}
  ${path('M285 85L346 111V128L285 101Z', 'url(#sofa)', '#b3abd4', 'stroke-width=".8"')}
  ${path('M270 106L285 99L347 127L331 135Z', '#c4b7eb')}
  ${path('M270 106V122L331 150V135Z', '#847aa7')}
  ${path('M331 135L347 127V143L331 150Z', '#635d8b')}
  ${path('M269 101L278 97L288 101V119L279 123L269 119Z', '#9286b6', '#b3a3d7', 'stroke-width=".6"')}
  ${path('M330 127L339 123L349 127V144L340 148L330 144Z', '#9286b6', '#b3a3d7', 'stroke-width=".6"')}
  ${path('M291 106L312 116 M314 116L334 125', 'none', '#73688f', 'stroke-width=".8"')}
  ${path('M231 155L269 137L304 152L266 170Z', '#91a3af', '#c5d6df', 'stroke-width=".8"')}
  ${path('M231 155V161L266 176L304 158V152L266 170Z', '#536b7c')}
  ${path('M239 161V173 M294 160V171', 'none', '#8ca2ad', 'stroke-width="3"')}
  ${path('M260 146L269 142L277 146L268 150Z', '#c7eeed')}
  ${path('M386 143L404 151L395 169L381 162Z', '#637887')}
  ${path('M388 148V110', 'none', '#7eaaad', 'stroke-width="1.8"')}
  ${path('M388 125C370 128 369 106 378 104C388 106 390 117 388 125Z', '#639e9c')}
  ${path('M388 136C405 134 412 116 402 113C392 115 389 127 388 136Z', '#8bc2ae')}
  ${path('M388 115C377 106 380 93 389 92C397 98 394 110 388 115Z', '#a0cfb8')}
  ${rect(57, 188, 94, 25, 6, '#17243a', 'stroke="#344c65"')}
  ${text(70, 204, 'YOUR SPACE', 8, '#b2c8dd', 'letter-spacing="1"')}`, violet);

const wearable = card(4, 'ASSISTIVE VISION', 'UNDERSTAND MORE. EXPLORE FREELY.',
  'A sculpted pair of smart glasses with translucent blue lenses and a restrained voice waveform.',
  `<ellipse cx="271" cy="206" rx="182" ry="16" fill="#02040b" opacity=".85" filter="url(#blur)"/>
  ${path('M91 124L62 83Q58 77 66 76L110 88L146 119', 'none', 'url(#metal)', 'stroke-width="6" stroke-linecap="round" stroke-linejoin="round"')}
  ${path('M358 123L386 83Q390 78 398 83L437 102', 'none', 'url(#metal)', 'stroke-width="7" stroke-linecap="round" stroke-linejoin="round"')}
  ${path('M86 117Q143 93 209 117L218 127Q230 116 241 126L253 115Q309 97 369 117L364 131Q360 141 356 163Q351 190 313 193Q267 195 254 171L244 142Q233 131 220 142L211 169Q199 195 154 194Q110 193 101 168L94 139Z', '#324059', 'url(#metal)', 'stroke-width="2"')}
  ${path('M105 126Q151 108 200 125L207 135L199 164Q191 184 155 184Q120 182 114 163Z', 'url(#lens)', '#7d92aa', 'stroke-width="1.5"')}
  ${path('M258 126Q305 111 351 125L346 163Q339 183 307 183Q272 184 264 164L253 138Z', 'url(#lens)', '#7d92aa', 'stroke-width="1.5"')}
  ${path('M112 128Q145 116 181 124L132 177Q118 171 117 160Z', '#b0f2f5', 'none', 'opacity=".08"')}
  ${path('M266 128Q297 119 331 126L288 178Q272 175 267 160Z', '#b0f2f5', 'none', 'opacity=".09"')}
  ${path('M108 126Q150 111 198 126 M261 127Q306 114 350 126', 'none', '#bbdce9', 'stroke-width="1.4" opacity=".85"')}
  ${path('M92 117Q146 97 208 119 M254 117Q307 101 368 118', 'none', '#9cabc1', 'stroke-width="1.2"')}
  ${rect(350, 112, 26, 14, 4, '#172435', 'stroke="#6c88a0"')}
  ${circle(362, 119, 4, '#070c15', 'stroke="#57768e" stroke-width="1.5"')}
  ${circle(362, 119, 1.8, cyan)}
  ${circle(362, 119, 4, cyan, 'opacity=".35" filter="url(#smallglow)"')}
  ${path('M389 146H403 M411 137V155 M421 129V163 M431 119V173 M441 132V160 M451 138V154 M461 145H475', 'none', 'url(#light)', 'stroke-width="3" stroke-linecap="round"')}
  ${text(407, 193, 'VOICE', 8, '#a4b6d0', 'letter-spacing="2"')}
  ${rect(66, 202, 97, 21, 5, '#152438', 'stroke="#32475d"')}
  ${circle(78, 213, 2, cyan)}${text(88, 216, 'IN PROGRESS', 7.5, '#aac1d5', 'letter-spacing=".8"')}`);

await Promise.all([
  ['project-nexus-v3.svg', nexus], ['project-vision-v3.svg', vision],
  ['project-spatial-v3.svg', spatial], ['project-wearable-v3.svg', wearable],
].map(([name, svg]) => writeFile(`${output}/${name}`, svg)));
console.log('Built 4 original project illustrations.');
