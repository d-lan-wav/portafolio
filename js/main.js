// Rellena el contenido, maneja las ventanas y la terminal.

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esMovil = () => matchMedia('(max-width: 719px)').matches;

/*Contenido */
function rellenar() {
  document.title = `${PERFIL.nombre} — Portafolio`;
  $('#anio').textContent = new Date().getFullYear();

  $$('[data-perfil]').forEach(el => { el.textContent = PERFIL[el.dataset.perfil]; });
  $$('[data-href]').forEach(el => {
    const clave = el.dataset.href;
    const valor = PERFIL[clave];
    if (!valor) return el.remove();
    el.href = clave === 'email' ? `mailto:${valor}` : valor;
    if (!el.textContent.trim()) el.textContent = valor.replace(/^https?:\/\/(www\.)?/, '');
  });

  const antes = $('.scanlines');
  Object.entries(PROYECTOS).forEach(([id, p]) => antes.before(ventanaProyecto(id, p)));

  $('#stack-body').innerHTML = STACK.map(g => `
    <h3>${g.grupo}</h3>
    <div class="logos">${g.items.map(i => `
      <figure class="logo"><canvas data-logo="${i.icon}" data-nombre="${i.nombre}"></canvas>
      <figcaption>${i.nombre}</figcaption></figure>`).join('')}
    </div>`).join('');

  $('#sobre-body').innerHTML = PERFIL.sobreMi.map(p => `<p>${p}</p>`).join('');

  $$('canvas[data-icono]').forEach(c => dibujarIcono(c, c.dataset.icono));
  $$('canvas[data-logo]').forEach(c => pixelarLogo(c, c.dataset.logo, c.dataset.nombre));
}

// Ventana de un proyecto (misma plantilla para todos)
function ventanaProyecto(id, p) {
  const todos = STACK.flatMap(g => g.items);
  const chips = p.stack.map(n => {
    const item = todos.find(i => i.nombre === n) || { nombre: n, icon: '' };
    return `<span class="chip"><canvas data-logo="${item.icon}" data-nombre="${n}"></canvas>${n}</span>`;
  }).join('');
  const demo = p.url ? `<a class="btn btn-fuerte" href="${p.url}" target="_blank" rel="noopener">▶ VER DEMO</a>` : '';
  const repo = p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">VER CODIGO</a>` : '';

  const win = document.createElement('section');
  win.className = 'win';
  win.id = `win-${id}`;
  win.hidden = true;
  win.setAttribute('aria-labelledby', `t-${id}`);
  win.innerHTML = `
    <header class="win-bar"><h2 id="t-${id}" class="win-title">${p.nombre}.EXE</h2><button class="win-x" aria-label="Cerrar">×</button></header>
    <div class="win-body">
      <p class="tag">${p.tipo}</p>
      <p>${p.resumen}</p>
      <h3>QUE HACE</h3>
      <ul class="lista">${p.puntos.map(t => `<li>${t}</li>`).join('')}</ul>
      <h3>HECHO CON</h3>
      <div class="chips">${chips}</div>
      <div class="acciones">${demo}${repo}</div>
    </div>`;
  return win;
}

/* Ventanas  */
let zTope = 10;
let abiertas = 0;

function alFrente(win) {
  win.style.zIndex = ++zTope;
}

function abrir(id) {
  const win = $(`#win-${id}`);
  if (!win) return;
  if (win.hidden) {
    win.hidden = false;
    if (!esMovil() && !win.dataset.movida) {
      // Cada ventana nueva aparece un poco desplazada
      const p = $('#pantalla');
      const paso = (abiertas++ % 5) * 28;
      win.style.left = `${Math.max(12, p.clientWidth / 2 - win.offsetWidth / 2 + paso - 40)}px`;
      const top = Math.max(12, p.clientHeight * 0.06 + paso);
      win.style.top = `${top}px`;
      win.style.maxHeight = `${p.clientHeight - top - 12}px`;
    }
    win.classList.add('abriendo');
    setTimeout(() => win.classList.remove('abriendo'), 250);
  }
  alFrente(win);
  const foco = $('input', win) || $('.win-x', win);
  foco && foco.focus({ preventScroll: true });
}

function cerrar(win) {
  win.hidden = true;
}

function arrastrable(win) {
  const barra = $('.win-bar', win);
  let dx = 0, dy = 0, p;

 
  barra.addEventListener('pointerdown', e => {
    if (esMovil() || e.target.closest('button')) return;
    p = $('#pantalla').getBoundingClientRect();
    const r = win.getBoundingClientRect();
    dx = e.clientX - r.left + p.left;
    dy = e.clientY - r.top + p.top;
    barra.setPointerCapture(e.pointerId);
    win.dataset.movida = '1';
    alFrente(win);
  });

  barra.addEventListener('pointermove', e => {
    if (!barra.hasPointerCapture(e.pointerId)) return;
    const x = Math.min(Math.max(0, e.clientX - dx), p.width - 80);
    const y = Math.min(Math.max(0, e.clientY - dy), p.height - 40);
    win.style.left = `${x}px`;
    win.style.top = `${y}px`;
  });
}

function ventanas() {
  $$('[data-open]').forEach(b => b.addEventListener('click', () => abrir(b.dataset.open)));
  $$('.win').forEach(win => {
    win.addEventListener('pointerdown', () => alFrente(win));
    const x = $('.win-x', win);
    if (x) x.addEventListener('click', () => cerrar(win));
    if (!win.classList.contains('win-main')) arrastrable(win);
  });

  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const visibles = $$('.win:not([hidden]):not(.win-main)');
    if (!visibles.length) return;
    visibles.sort((a, b) => (b.style.zIndex | 0) - (a.style.zIndex | 0));
    cerrar(visibles[0]);
  });
}

/*  Terminal */
const COMANDOS = {
  ayuda: () => 'Comandos: ayuda, quien, proyectos, stack, contacto, abrir <seccion>, limpiar',
  quien: () => `${PERFIL.nombre} — ${PERFIL.rol}\n${PERFIL.sobreMi[0]}`,
  proyectos: () => Object.values(PROYECTOS).map(p => `${p.nombre}: ${p.resumen}`).join('\n\n'),
  stack: () => STACK.map(g => `${g.grupo}: ${g.items.map(i => i.nombre).join(', ')}`).join('\n'),
  contacto: () => `Email: ${PERFIL.email}\nGitHub: ${PERFIL.github}`,
  limpiar: () => { $('#term-salida').innerHTML = ''; return null; },
  abrir: arg => {
    if (!$(`#win-${arg}`)) return 'Uso: abrir lumina | portafolio | stack | sobre | contacto';
    abrir(arg);
    return `Abriendo ${arg}...`;
  },
};

function imprimir(texto, clase = '') {
  const p = document.createElement('pre');
  p.className = clase;
  p.textContent = texto;
  const salida = $('#term-salida');
  salida.append(p);
  salida.parentElement.scrollTop = salida.parentElement.scrollHeight;
}

function terminal() {
  imprimir(`PORTAFOLIO OS v1.0\nEscribe "ayuda" para ver los comandos.`);
  $('#term-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#term-input');
    const [cmd, ...args] = input.value.trim().toLowerCase().split(/\s+/);
    input.value = '';
    if (!cmd) return;
    imprimir(`C:\\> ${cmd} ${args.join(' ')}`, 'eco');
    const fn = COMANDOS[cmd];
    const r = fn ? fn(args.join(' ')) : `"${cmd}" no se reconoce. Prueba "ayuda".`;
    if (r) imprimir(r);
  });
}

/* Efectos  */
function efectos() {
  const btn = $('#toggle-fx');
  let guardado = null;
  try { guardado = localStorage.getItem('fx'); } catch (e) {}
  if (guardado === 'off') FX.alternar(false);

  const pintar = () => {
    btn.textContent = `EFECTOS: ${FX.activo ? 'ON' : 'OFF'}`;
    btn.setAttribute('aria-pressed', FX.activo);
  };
  btn.addEventListener('click', () => {
    FX.alternar(!FX.activo);
    try { localStorage.setItem('fx', FX.activo ? 'on' : 'off'); } catch (e) {}
    pintar();
  });
  pintar();
  FX.iniciar();
}

/*  Arranque  */
function arranque() {
  const el = $('#arranque');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return el.remove();
  el.addEventListener('animationend', e => { if (e.target === el) el.remove(); });
  setTimeout(() => el.remove(), 2200); // por si la animación no dispara el evento
}

arranque();
rellenar();
ventanas();
terminal();
efectos();
