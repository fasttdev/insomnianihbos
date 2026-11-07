(function () {
  const path = window.location.pathname.replace(/\/$/, '') || '/beranda';
  const items = [
    { href: '/beranda', label: 'Tools', icon: 'wrench' },
    { href: '/about', label: 'About', icon: 'user-round' },
    { href: '/info', label: 'Info', icon: 'info' },
    { href: '/req', label: 'Req', icon: 'message-square-plus' }
  ];
  const html = `
    <nav class="bottom-nav">
      <div class="nav-grid">
        ${items.map(it => `
          <a href="${it.href}" class="nav-item ${path === it.href ? 'active' : ''}">
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