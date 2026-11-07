(function () {
  const path = window.location.pathname.replace(/\/$/, '') || '/beranda';
  const items = [
    { href: '/beranda', label: 'Tools', icon: 'layout-grid' },
    { href: '/about', label: 'About', icon: 'user-round' },
    { href: '/info', label: 'Info', icon: 'info' },
    { href: '/req', label: 'Request', icon: 'message-square-plus' }
  ];

  const activeIdx = items.findIndex(it => it.href === path);

  const html = `
    <nav class="bottom-nav" role="navigation">
      <div class="nav-grid">
        ${items.map((it, i) => `
          <a href="${it.href}" class="nav-item ${i === activeIdx ? 'active' : ''}" aria-label="${it.label}">
            ${i === activeIdx ? '<div class="nav-pill"></div>' : ''}
            <i data-lucide="${it.icon}"></i>
            <span>${it.label}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  if (window.lucide) window.lucide.createIcons();
})();