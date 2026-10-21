import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

// Generated tiles are entirely local. --fetch refreshes the vendored artwork from
// this pinned Simple Icons revision; regular builds require no network access.
const revision = 'c71c69e3a27e4436936b831c72643e6513b9f49b';
const base = `https://raw.githubusercontent.com/simple-icons/simple-icons/${revision}`;
const root = fileURLToPath(new URL('../', import.meta.url));
const output = `${root}/assets/stack`;
const licenses = `${root}/LICENSES`;
const selections = [
  ['python', 'python', 'Python'],
  ['typescript', 'typescript', 'TypeScript'],
  ['javascript', 'javascript', 'JavaScript'],
  ['go', 'go', 'Go'],
  ['dart', 'dart', 'Dart'],
  ['swift', 'swift', 'Swift'],
  ['pytorch', 'pytorch', 'PyTorch'],
  ['huggingface', 'huggingface', 'Hugging Face'],
  ['opencv', 'opencv', 'OpenCV'],
  ['onnx', 'onnx', 'ONNX'],
  ['react', 'react', 'React'],
  ['nextjs', 'nextdotjs', 'Next.js'],
  ['vue', 'vuedotjs', 'Vue.js'],
  ['tailwindcss', 'tailwindcss', 'Tailwind CSS'],
  ['threejs', 'threedotjs', 'Three.js'],
  ['flutter', 'flutter', 'Flutter'],
  ['fastapi', 'fastapi', 'FastAPI'],
  ['nodejs', 'nodedotjs', 'Node.js'],
  ['postgresql', 'postgresql', 'PostgreSQL'],
  ['redis', 'redis', 'Redis'],
  ['docker', 'docker', 'Docker'],
  ['git', 'git', 'Git'],
];
await mkdir(output, { recursive: true });
await mkdir(licenses, { recursive: true });

const get = async url => {
  // curl also honors system proxy configuration on hosts where Node fetch does not.
  const { stdout } = await promisify(execFile)(process.platform === 'win32' ? 'curl.exe' : 'curl',
    ['--fail', '--silent', '--show-error', '--location', '--retry', '2', url], { maxBuffer: 8 * 1024 * 1024 });
  return stdout;
};
if (process.argv.includes('--fetch')) {
  const catalog = JSON.parse(await get(`${base}/data/simple-icons.json`));
  const icons = await Promise.all(selections.map(async ([slug, sourceSlug, name]) => {
    const artwork = await get(`${base}/icons/${sourceSlug}.svg`);
    const title = artwork.match(/<title>(.*?)<\/title>/)?.[1];
    const path = artwork.match(/<path d="([^"]+)"\s*\/?>(?:<\/path>)?/)[1];
    const metadata = catalog.find(icon => icon.title === title);
    if (!metadata) throw new Error(`Missing official metadata: ${title}`);
    return { slug, name, sourceSlug, path, hex: metadata.hex, source: metadata.source,
      ...(metadata.license ? { license: metadata.license } : {}),
      upstream: `https://github.com/simple-icons/simple-icons/blob/${revision}/icons/${sourceSlug}.svg` };
  }));
  await writeFile(`${output}/source-icons.json`, JSON.stringify({ revision, icons }, null, 2) + '\n');
  await writeFile(`${licenses}/simple-icons-CC0-1.0.txt`, await get(`${base}/LICENSE.md`));
  await writeFile(`${licenses}/javascript-logo-MIT.txt`, await get('https://raw.githubusercontent.com/voodootikigod/logo.js/1544bdeed6d618a6cfe4f0650d04ab8d9cfa76d9/LICENSE'));
}

const { icons } = JSON.parse(await readFile(`${output}/source-icons.json`, 'utf8'));
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const overrides = { nextjs: 'F1F7FC', threejs: 'F1F7FC', onnx: '87AAFF', python: '62A9DF', typescript: '5AA7ED', postgresql: '81B9E2', dart: '36C7EE', flutter: '54C5F8', opencv: '9A83FF' };
for (const icon of icons) {
  const color = `#${overrides[icon.slug] || icon.hex}`;
  const name = escape(icon.name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="104" viewBox="0 0 96 104" role="img" aria-labelledby="title desc">
<title id="title">${name}</title>
<desc id="desc">${name} technology icon, with official Simple Icons artwork on a dark rounded tile.</desc>
<defs><linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${color}" stop-opacity=".52"/><stop offset=".55" stop-color="#263b48"/><stop offset="1" stop-color="#263b48" stop-opacity=".6"/></linearGradient></defs>
<rect x="3.5" y="3.5" width="89" height="97" rx="16" fill="#0b1320" stroke="url(#edge)"/>
<rect x="4" y="4" width="88" height="48" rx="15" fill="${color}" opacity=".035"/>
<circle cx="48" cy="39" r="27" fill="${color}" opacity=".055"/>
<g transform="translate(28 19) scale(1.6666667)" fill="${color}"><path d="${icon.path}"/></g>
<text x="48" y="79" text-anchor="middle" fill="#e9f2f7" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="600">${name}</text>
<rect x="39" y="90" width="18" height="2" rx="1" fill="${color}" opacity=".75"/>
</svg>\n`;
  await writeFile(`${output}/${icon.slug}.svg`, svg);
}

const attribution = `# Technology icon sources\n\nThe 22 technology tiles in \`assets/stack/\` embed artwork from [Simple Icons](https://github.com/simple-icons/simple-icons), pinned to revision [\`${revision}\`](https://github.com/simple-icons/simple-icons/tree/${revision}). The Simple Icons project is distributed under CC0 1.0 Universal; its complete license is preserved in [simple-icons-CC0-1.0.txt](./simple-icons-CC0-1.0.txt).\n\nTile backgrounds, borders, type and layout are custom. Selected darker logo colors are lightened for contrast on the dark background; logo paths are unchanged. Brand names and marks identify the technologies used in the owner's projects and do not imply endorsement. Individual upstream icon metadata and any listed licenses are retained in \`assets/stack/source-icons.json\`.\n\nRegenerate offline with \`node scripts/build-stack.mjs\`. The optional \`--fetch\` flag re-downloads the pinned upstream artwork and license; published SVGs make no external requests.\n\n| Tile | Artwork | Brand source |\n| --- | --- | --- |\n${icons.map(i=>`| ${i.name} | [Simple Icons](${i.upstream}) | [Source](${i.source}) |`).join('\n')}\n`;
await writeFile(`${licenses}/technology-icons.md`, attribution);
await writeFile(`${licenses}/brand-attributions.md`, `# Additional brand artwork notices\n\n- **JavaScript logo**: Copyright (c) 2011 Christopher Williams. Distributed under the MIT License, preserved in [javascript-logo-MIT.txt](./javascript-logo-MIT.txt). [Original artwork](https://github.com/voodootikigod/logo.js).\n- **Vue.js logo**: Designed by [Evan You](https://github.com/yyx990803). The [Vue.js artworks](https://github.com/vuejs/art) are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) with extra permissions explicitly allowing use to illustrate professional expertise in portfolios, resumes and personal websites. The logo artwork is retained under that license. This tile uses the monochrome shape provided by Simple Icons; its geometry is unchanged and a background and label are added.\n- **Git logo**: Designed by [Jason Long](https://bsky.app/profile/jasonlong.me), licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). [Official artwork and license notice](https://git-scm.com/community/logos). The logo shape and orange color are unchanged; a background and label are added.\n\nThe Simple Icons collection license does not replace the trademark rights of the relevant owners or the upstream artwork notices above.\n`);
console.log(`Built ${icons.length} local technology icon tiles.`);
