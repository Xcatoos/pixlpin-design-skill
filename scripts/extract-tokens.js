// Paste into javascript_tool on a live reference site. Returns design tokens as JSON.
(() => {
  const top = (m, n = 8) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n);
  const c = { color: {}, bg: {}, font: {}, size: {}, weight: {}, radius: {}, shadow: {}, gap: {}, tr: {}, lh: {}, ls: {} };
  const bump = (k, v) => { if (v && v !== 'none' && v !== 'normal' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') c[k][v] = (c[k][v] || 0) + 1; };
  const els = [...document.querySelectorAll('body *')].slice(0, 2500);
  for (const e of els) {
    const s = getComputedStyle(e);
    if (!e.offsetParent && s.position !== 'fixed') continue;
    if (e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) {
      bump('color', s.color); bump('font', s.fontFamily.split(',')[0].replace(/["']/g, '').trim());
      bump('size', s.fontSize); bump('weight', s.fontWeight); bump('lh', s.lineHeight); bump('ls', s.letterSpacing);
    }
    bump('bg', s.backgroundColor); bump('radius', s.borderRadius); bump('shadow', s.boxShadow);
    bump('gap', s.rowGap); bump('gap', s.paddingTop); bump('tr', s.transition.split(',')[0]);
  }
  const root = getComputedStyle(document.documentElement);
  const vars = [...document.styleSheets].flatMap(ss => { try { return [...ss.cssRules]; } catch { return []; } })
    .filter(r => r.selectorText === ':root').flatMap(r => [...r.style].filter(p => p.startsWith('--')).map(p => [p, root.getPropertyValue(p).trim()])).slice(0, 60);
  const h = document.querySelector('h1'); const hs = h && getComputedStyle(h);
  return JSON.stringify({
    url: location.href, title: document.title,
    body: { bg: getComputedStyle(document.body).backgroundColor, color: getComputedStyle(document.body).color, font: getComputedStyle(document.body).fontFamily },
    h1: hs && { text: h.innerText.slice(0, 80), size: hs.fontSize, weight: hs.fontWeight, lh: hs.lineHeight, ls: hs.letterSpacing, font: hs.fontFamily },
    maxWidth: top([...document.querySelectorAll('main, section > div, header > div')].reduce((m, e) => { const v = getComputedStyle(e).maxWidth; if (v !== 'none') m[v] = (m[v] || 0) + 1; return m; }, {}), 4),
    ...Object.fromEntries(Object.entries(c).map(([k, v]) => [k, top(v)])),
    cssVars: vars,
    scrollMotion: !!document.querySelector('[data-aos],[data-scroll],canvas,video,.swiper,[class*="lenis"]'),
    libs: ['gsap', 'Lenis', 'THREE', 'framer', '__NEXT_DATA__'].filter(k => k in window),
  }, null, 1);
})()
