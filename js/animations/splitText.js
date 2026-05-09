/* Custom SplitText — replaces paid GSAP Club plugin */

function splitTextIntoChars(el) {
  if (!el) return [];
  const original = el.innerHTML;
  const text = el.textContent || '';
  el.innerHTML = text
    .split('')
    .map(ch =>
      ch === ' '
        ? '<span style="display:inline-block;width:0.28em"> </span>'
        : `<span class="split-char" style="display:inline-block">${ch}</span>`
    )
    .join('');
  el._splitOriginal = original;
  return Array.from(el.querySelectorAll('.split-char'));
}

function splitTextIntoWords(el) {
  if (!el) return [];
  const original = el.innerHTML;
  const text = el.textContent || '';
  el.innerHTML = text
    .split(' ')
    .filter(w => w.length)
    .map(w => `<span class="split-word" style="display:inline-block">${w}</span>`)
    .join('<span style="display:inline-block;width:0.28em"> </span>');
  el._splitOriginal = original;
  return Array.from(el.querySelectorAll('.split-word'));
}

function splitTextIntoLines(el) {
  if (!el) return [];
  // Split on <br> or newlines, wrap each line
  const lines = el.innerHTML.split(/<br\s*\/?>/i);
  el.innerHTML = lines
    .map(l => `<span class="split-line" style="display:block;overflow:hidden"><span class="split-line-inner" style="display:block">${l}</span></span>`)
    .join('');
  return Array.from(el.querySelectorAll('.split-line-inner'));
}
