

const PERFIL = {
  nombre: 'DYLAN',
  rol: 'Desarrollador Web Junior',
  ubicacion: 'Viña del Mar, Chile',
  github: 'https://github.com/d-lan-wav',
  linkedin: 'https://www.linkedin.com/in/dylan-perez-a53935357/',
  email: 'dylanperez.quiroz@gmail.com',
  sobreMi: [
    'Soy Dylan, desarrollador web junior. Me enfoco en el frontend: construir interfaces que se sientan vivas, con animaciones, temas y detalles visuales cuidados.',
    'Me entusiasma emprender y sumarme a proyectos nuevos. Disfruto tomar una idea desde cero y convertirla en algo real, aprendiendo en el camino las herramientas que haga falta.',
    'Me adapto bien a trabajar bajo presión y con plazos ajustados, priorizando los objetivos más importantes.',
    'Manejo el inglés con fluidez, lo que me permite leer documentación técnica, colaborar con equipos internacionales y comunicarme sin problemas.',
  ],
};

const LUMINA = {
  nombre: 'LUMINA',
  tipo: 'Proyecto en equipo · Web de reseñas',
  url: 'https://lumina-fkmm.onrender.com',
  repo: 'https://github.com/d-lan-wav/Lumina',
  resumen:
    'Página de reseñas de películas y series. Permite explorar el catálogo, ver el detalle de cada película, reproducir sus trailers sin salir de la página, navegar series y guardar favoritos.',
  puntos: [
    'Animaciones de intro y aparición de elementos con GSAP.',
    'Tema claro/oscuro con variables CSS y backdrop-filter, sin librerías de UI.',
    'Logo SVG de rayos animado.',
    'Backend propio en Node.js + Express consumido con Axios.',
  ],
  stack: ['React', 'Vite', 'React Router', 'Axios', 'GSAP', 'Node.js', 'Express'],
};

const PORTAFOLIO = {
  nombre: 'PORTAFOLIO',
  tipo: 'Proyecto personal · Sitio web',
  url: '', // es este mismo sitio, así que no lleva botón de demo
  repo: 'https://github.com/d-lan-wav/portafolio',
  resumen:
    'Este mismo sitio: un portafolio con estética de computador retro, inspirado en los escritorios de los 90. Todo vive dentro de un monitor CRT, con ventanas que se pueden abrir, arrastrar y cerrar.',
  puntos: [
    'Animación de arranque tipo BIOS y pantalla que se dibuja de arriba hacia abajo.',
    'Estática de TV generada en tiempo real con Canvas.',
    'Íconos en pixel art dibujados a mano y logos de tecnologías pixelados automáticamente.',
    'Ventanas arrastrables y una terminal con comandos propios.',
    'Diseño adaptable a celular y opción para apagar los efectos.',
  ],
  stack: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'],
};

// Cada proyecto genera su propia ventana; la clave es el id de la ventana y del ícono
const PROYECTOS = { lumina: LUMINA, portafolio: PORTAFOLIO };

// Logos 
const STACK = [
  { grupo: 'FRONTEND', items: [
    { nombre: 'React', icon: 'react/react-original.svg' },
    { nombre: 'Vite', icon: 'vitejs/vitejs-original.svg' },
    { nombre: 'React Router', icon: 'reactrouter/reactrouter-original.svg' },
    { nombre: 'Axios', icon: 'axios/axios-plain.svg' },
    { nombre: 'GSAP', icon: '' },
    { nombre: 'JavaScript', icon: 'javascript/javascript-original.svg' },
    { nombre: 'HTML', icon: 'html5/html5-original.svg' },
    { nombre: 'CSS', icon: 'css3/css3-original.svg' },
  ]},
  { grupo: 'BACKEND', items: [
    { nombre: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
    { nombre: 'Express', icon: 'express/express-original.svg' },
  ]},
  { grupo: 'HERRAMIENTAS', items: [
    { nombre: 'Git', icon: 'git/git-original.svg' },
    { nombre: 'GitHub', icon: 'github/github-original.svg' },
    { nombre: 'VS Code', icon: 'vscode/vscode-original.svg' },
    { nombre: 'PowerShell', icon: 'powershell/powershell-original.svg' },
    { nombre: 'npm', icon: 'npm/npm-original-wordmark.svg' },
  ]},
];
