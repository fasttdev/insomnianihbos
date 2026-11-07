(function () {
  if (!window.TOOLS) return;

  const gridWrap = document.getElementById('gridWrap');
  const searchInput = document.getElementById('searchInput');
  const chipsWrap = document.getElementById('chipsWrap');
  const modalBg = document.getElementById('modalBg');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const modalMethod = document.getElementById('modalMethod');
  const modalPath = document.getElementById('modalPath');
  const modalForm = document.getElementById('modalForm');
  const toastWrap = document.getElementById('toastWrap');

  let state = { query: '', category: 'All', tool: null, values: {}, files: {} };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function toast(msg, type = 'info') {
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = msg;
    toastWrap.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity .3s';
      setTimeout(() => el.remove(), 300);
    }, 2500);
  }

  // Chips
  function renderChips() {
    const html = [
      `<button class="chip ${state.category === 'All' ? 'active' : ''}" data-cat="All">All <span class="count">${window.TOOLS.length}</span></button>`
    ].concat(
      window.CATEGORIES.map((c) => {
        const n = window.TOOLS.filter((t) => t.category === c).length;
        return `<button class="chip ${state.category === c ? 'active' : ''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)} <span class="count">${n}</span></button>`;
      })
    ).join('');
    chipsWrap.innerHTML = html;
    chipsWrap.querySelectorAll('.chip').forEach((b) =>
      b.addEventListener('click', () => {
        state.category = b.dataset.cat;
        renderChips();
        renderGrid();
      })
    );
  }

  // Grid
  function renderGrid() {
    const q = state.query.trim().toLowerCase();
    const filtered = window.TOOLS.filter((t) => {
      if (state.category !== 'All' && t.category !== state.category) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.path.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      gridWrap.innerHTML = `<div style="text-align:center;padding:40px;color:var(--muted);font-size:13px;">Tidak ada tool yang cocok.</div>`;
      return;
    }

    const groups = {};
    filtered.forEach((t) => {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    });

    const singleGroup = state.category !== 'All' || state.query;
    let html = '';
    for (const [cat, tools] of Object.entries(groups)) {
      if (!singleGroup) {
        html += `<div class="group-title">${escapeHtml(cat)} <span class="count">${tools.length}</span><span class="line"></span></div>`;
      }
      html += '<div class="grid">';
      tools.forEach((t) => {
        html += `
          <button class="card" data-id="${escapeHtml(t.id)}">
            <div class="card-head">
              <span class="tag ${t.method}">${t.method}</span>
              <span class="card-cat">${escapeHtml(t.category)}</span>
            </div>
            <div class="card-title">${escapeHtml(t.name)}</div>
            <div class="card-desc">${escapeHtml(t.description)}</div>
            <div class="card-path">${escapeHtml(t.path)}</div>
          </button>
        `;
      });
      html += '</div>';
    }
    gridWrap.innerHTML = html;

    gridWrap.querySelectorAll('.card').forEach((c) =>
      c.addEventListener('click', () => {
        const tool = window.TOOLS.find((t) => t.id === c.dataset.id);
        if (tool) openModal(tool);
      })
    );
  }

  // Modal
  function openModal(tool) {
    state.tool = tool;
    state.values = {};
    state.files = {};
    modalTitle.textContent = tool.name;
    modalSub.textContent = tool.description;
    modalMethod.textContent = tool.method;
    modalMethod.className = 'tag ' + tool.method;
    modalPath.textContent = tool.path;

    let form = '';
    if (tool.params.length === 0) {
      form = `<p style="font-size:13px;color:var(--muted);">Tool ini tidak butuh parameter. Tekan <b>Jalankan</b>.</p>`;
    } else {
      tool.params.forEach((param) => {
        form += `<div class="form-field">
          <label><span>${escapeHtml(param.label)}${param.required ? '<span class="req"> *</span>' : ''}</span><span class="param-key">${escapeHtml(param.name)}</span></label>`;
        if (param.type === 'select') {
          form += `<select class="form-select" data-param="${escapeHtml(param.name)}">
            <option value="">-- Pilih --</option>
            ${param.options.map((o) => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
          </select>`;
        } else if (param.type === 'textarea') {
          form += `<textarea class="form-textarea" data-param="${escapeHtml(param.name)}" placeholder="${escapeHtml(param.placeholder || '')}"></textarea>`;
        } else if (param.type === 'file') {
          form += `<input type="file" class="form-input" data-param="${escapeHtml(param.name)}" />`;
        } else {
          form += `<input type="${param.type}" class="form-input" data-param="${escapeHtml(param.name)}" placeholder="${escapeHtml(param.placeholder || '')}" />`;
        }
        form += `</div>`;
      });
    }
    form += `<div class="btn-row">
      <button type="submit" class="btn-primary" id="btnRun">Jalankan</button>
      <button type="button" class="btn-secondary" id="btnReset">Reset</button>
    </div>
    <div id="responseArea"></div>`;

    modalForm.innerHTML = form;
    modalForm.onsubmit = handleSubmit;
    document.getElementById('btnReset').onclick = () => openModal(tool);

    modalBg.classList.add('open');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeModal() {
    modalBg.classList.remove('open');
    state.tool = null;
  }

  // Submit
  async function handleSubmit(e) {
    e.preventDefault();
    const tool = state.tool;
    if (!tool) return;

    const values = {};
    const files = {};
    modalForm.querySelectorAll('[data-param]').forEach((el) => {
      const key = el.dataset.param;
      if (el.type === 'file') {
        files[key] = el.files && el.files[0] ? el.files[0] : null;
      } else {
        values[key] = el.value;
      }
    });

    const btn = document.getElementById('btnRun');
    btn.disabled = true;
    btn.textContent = 'Memproses...';

    const hasFile = Object.values(files).some((f) => f);

    try {
      const headers = {
        'x-proxy-path': tool.path,
        'x-proxy-method': tool.method,
        'x-proxy-query': JSON.stringify(values)
      };
      let body;
      if (hasFile) {
        const fd = new FormData();
        Object.entries(files).forEach(([k, f]) => { if (f) fd.append(k, f); });
        body = fd;
      } else if (tool.method === 'POST') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(values);
      }

      const res = await fetch('/api/proxy', { method: 'POST', headers, body });
      const json = await res.json();
      const status = json.status || res.status;
      const ok = json.ok !== false;

      let pretty = json.data;
      try { pretty = JSON.stringify(json.data, null, 2); } catch { pretty = String(json.data); }

      document.getElementById('responseArea').innerHTML = `
        <div class="response-box">
          <div class="response-head">
            <h3>Response</h3>
            <span class="status-code ${ok ? 'ok' : 'err'}">HTTP ${status}</span>
          </div>
          <pre class="response">${escapeHtml(pretty || 'No response')}</pre>
        </div>
      `;
      toast(ok ? 'Berhasil' : 'Gagal', ok ? 'success' : 'error');
    } catch (err) {
      document.getElementById('responseArea').innerHTML = `
        <div class="response-box"><pre class="response">${escapeHtml(err.message)}</pre></div>
      `;
      toast('Error: ' + err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Jalankan';
    }
  }

  // Search
  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    renderGrid();
  });

  // Modal bg click
  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) closeModal();
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);

  // Init
  renderChips();
  renderGrid();
})();