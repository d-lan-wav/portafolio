// Estática de TV en blanco y negro 

const FX = (() => {
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activo = !reducir;
  let ultimo = 0;
  let banda = 0;

  function ruido(canvas, ancho, alto, conBandas) {
    const ctx = canvas.getContext('2d');
    ancho = Math.max(1, ancho);
    alto = Math.max(1, alto);
    if (canvas.width !== ancho || canvas.height !== alto) {
      canvas.width = ancho;
      canvas.height = alto;
    }
    const img = ctx.createImageData(ancho, alto);
    const d = img.data;
    for (let y = 0; y < alto; y++) {
      // Bandas horizontales más claras que bajan lento, como en una TV vieja
      const dist = Math.abs(((y - banda + alto) % alto) - alto * 0.35);
      const brillo = conBandas && dist < alto * 0.08 ? 70 : 0;
      for (let x = 0; x < ancho; x++) {
        const v = Math.min(255, (Math.random() * 150 + 40 + brillo) | 0);
        const i = (y * ancho + x) * 4;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function fondo() {
    const c = document.getElementById('estatica');
    const p = c.parentElement;
    ruido(c, Math.ceil(p.clientWidth / 3), Math.ceil(p.clientHeight / 3), true);
  }

  function bucle(t) {
    if (activo && t - ultimo > 70) { // ~14 fps: suficiente y liviano
      banda = (banda + 1) % Math.max(1, Math.ceil(innerHeight / 3));
      fondo();
      ultimo = t;
    }
    requestAnimationFrame(bucle);
  }

  function iniciar() {
    fondo();
    addEventListener('resize', fondo);
    requestAnimationFrame(bucle);
  }

  function alternar(valor) {
    activo = valor;
    document.body.classList.toggle('sin-fx', !valor);
  }

  return { iniciar, alternar, get activo() { return activo; } };
})();
