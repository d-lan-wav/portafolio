// Pixel art

const PALETA = {
  K: '#151515', W: '#f4f4f4', S: '#8a8a8a', D: '#0d0d0d',
  O: '#e8862a', Y: '#f5c518', L: '#b6d98f',
  R: '#c8322b', B: '#2f4fb5', C: '#5ab4ef',
  g: '#3c8a24', b: '#1f6fc0', G: '#76c043', // Messenger
  N: '#2d3e66', n: '#141c30', V: '#a9c1e3', Q: '#cdd5e0', // Nokia
  E: '#e2dbb8', e: '#a39c7d', T: '#1a8f8f', // Monitor del portafolio
};

// Cada letra es un pixel; "." es transparente.
const ICONOS = {
  // Sol de Lumina: anillo con rayos (17x17)
  lumina: [
    '........K........', '.....K..K..K.....', '..K.....K.....K..', '...K.........K...',
    '......KKKKK......', '.K...KK...KK...K.', '....KK.....KK....', '....K.......K....',
    'KKK.K.......K.KKK', '....K.......K....', '....KK.....KK....', '.K...KK...KK...K.',
    '......KKKKK......', '...K.........K...', '..K.....K.....K..', '.....K..K..K.....',
    '........K........',
  ],
  // Monitor CRT con escritorio turquesa estilo Win95 (17x17). También es el favicon.
  portafolio: [
    '.KKKKKKKKKKKKKKK.', 'KEEEEEEEEEEEEEEEK', 'KEKKKKKKKKKKKKKEK', 'KEKTTTTTTTTTTTKEK',
    'KEKTBBBBBBBTTTKEK', 'KEKTQQQQQQQTTTKEK', 'KEKTQRQYQGQTTTKEK', 'KEKTQQQQQQQTWTKEK',
    'KEKTTTTTTTTTWWKEK', 'KEKKKKKKKKKKKKKEK', 'KEEEEEEEEEEEEEGEK', 'KeeeeeeeeeeeeeeeK',
    '.KKKKKKKKKKKKKKK.', '......KeeeK......', '....KKKKKKKKK....', '....KEEEEEEEK....',
    '....KKKKKKKKK....',
  ],
  // Monigotes estilo Messenger (16x16)
  sobre: [
    '................', '...ggg..........', '..gGGGg.........', '.gGGGGGg..bbb...',
    '.gGGGGGg.bCCCb..', '..gGGGg.bCCCCCb.', '...ggg..bCCCCCb.', '..ggggg.bCCCCCb.',
    '.gGGGGGg.bCCCbOO', 'gGGGGGGGg.bbOO..', 'gGGGGGGbbOOObbb.', 'gGGGGGOOOCCCCCCb',
    'gGGOOObCCCCCCCCb', 'OOOGGGbCCCCCCCCb', 'ggggggbCCCCCCCCb', '......bbbbbbbbbb',
  ],
  stack: [
    'KKKKKKKKKKK.', 'KBBWWWWWBBKK', 'KBBWWWKWBBBK', 'KBBWWWKWBBBK',
    'KBBWWWWWBBBK', 'KBBBBBBBBBBK', 'KBWWWWWWWWBK', 'KBWKKKKKKWBK',
    'KBWWWWWWWWBK', 'KBWKKKKKKWBK', 'KBWWWWWWWWBK', 'KKKKKKKKKKKK',
  ],
  // Celular estilo Nokia 3310 (16x16)
  contacto: [
    '....nnnnnnnnn...', '...nNNNNNNNNNn..', '...nNSSSSSSSNn..', '...nNSLLLLLSNn..',
    '...nNSLDDDLSNn..', '...nNSLLLLLSNn..', '...nNSSSSSSSNn..', '...nNNNVVVNNNn..',
    '...nNQNNNNNQNn..', '...nNNNNNNNNNn..', '...nNQNNQNNQNn..', '...nNNNNNNNNNn..',
    '...nNQNNQNNQNn..', '...nNNNNNNNNNn..', '...nNQNNQNNQNn..', '....nnnnnnnnn...',
  ],
  terminal: [
    'KKKKKKKKKKKK', 'KSSSSSSSRYGK', 'KKKKKKKKKKKK', 'KDDDDDDDDDDK',
    'KDLDDDDDDDDK', 'KDDLDDDDDDDK', 'KDLDDLLLDDDK', 'KDDDDDDDDDDK',
    'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KKKKKKKKKKKK', '............',
  ],
  github: [
    '...KKKKKK...', '..KKKKKKKK..', '.KKWKKKKWKK.', 'KKKWWWWWWKKK',
    'KKWWWWWWWWKK', 'KKWWKWWKWWKK', 'KKWWWWWWWWKK', 'KKKWWWWWWKKK',
    '.KKKKWWKKKK.', '.WKKKWWKKKK.', '..WWKWWKKK..', '...KKKKKK...',
  ],
  cv: [
    '.KKKKKKK....', '.KWWWWWKK...', '.KWWWWWKWK..', '.KWWWWWKKKK.',
    '.KWKKKWWWWK.', '.KWWWWWWWWK.', '.KWKKKKKKWK.', '.KWWWWWWWWK.',
    '.KWKKKKKKWK.', '.KWWWWWWWWK.', '.KWKKKKWWWK.', '.KKKKKKKKKK.',
  ],
};

function dibujarIcono(canvas, nombre) {
  const filas = ICONOS[nombre];
  if (!filas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = filas[0].length;
  canvas.height = filas.length;
  // El CSS usa --n para que todos los íconos tengan el mismo tamaño de pixel
  canvas.style.setProperty('--n', filas[0].length);
  filas.forEach((fila, y) => {
    [...fila].forEach((c, x) => {
      if (c === '.') return;
      ctx.fillStyle = PALETA[c];
      ctx.fillRect(x, y, 1, 1);
    });
  });
}

// Reduce los colores para que el logo parezca de consola vieja.
function posterizar(ctx, w, h) {
  try {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = Math.round(d[i] / 64) * 64;
      d[i + 1] = Math.round(d[i + 1] / 64) * 64;
      d[i + 2] = Math.round(d[i + 2] / 64) * 64;
      d[i + 3] = d[i + 3] > 110 ? 255 : 0;
    }
    ctx.putImageData(img, 0, 0);
  } catch (e) { /* imagen sin CORS: se deja sin posterizar */ }
}

function letrasPixel(ctx, texto, size) {
  ctx.fillStyle = PALETA.K;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#88ce02'; // verde GSAP
  ctx.font = `bold ${Math.floor(size * 0.42)}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(texto.slice(0, 4).toUpperCase(), size / 2, size / 2 + 1);
}

// Dibuja un logo SVG a muy baja resolución; CSS lo amplía sin suavizado.
function pixelarLogo(canvas, ruta, nombre, size = 18) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = size;
  canvas.height = size;
  if (!ruta) return letrasPixel(ctx, nombre, size);
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 1, 1, size - 2, size - 2);
    posterizar(ctx, size, size);
  };
  img.onerror = () => letrasPixel(ctx, nombre, size);
  img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${ruta}`;
}
