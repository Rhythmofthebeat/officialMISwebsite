(() => {
  const controls = document.querySelector('[data-path-controls]');
  if (controls) {
    const cards = [...document.querySelectorAll('[data-program]')];
    const input = document.querySelector('#program-search');
    const buttons = [...controls.querySelectorAll('[data-filter]')];
    let category = 'all';
    function update() {
      const query = input.value.trim().toLowerCase();
      let count = 0;
      cards.forEach(card => {
        const matches = (category === 'all' || card.dataset.category === category) && card.textContent.toLowerCase().includes(query);
        card.hidden = !matches;
        if (matches) count += 1;
      });
      document.querySelector('[data-path-results]').textContent = `${count} ${count === 1 ? 'opportunity' : 'opportunities'}`;
      document.querySelector('[data-path-empty]').hidden = count !== 0;
    }
    buttons.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.filter;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      update();
    }));
    input.addEventListener('input', update);
    controls.hidden = false;
    update();
  }
  document.querySelectorAll('[data-print-report]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
})();
