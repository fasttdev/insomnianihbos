(function () {
  if (!window.TOOLS) return;

  const gridWrap = document.getElementById('gridWrap');
  const searchInput = document.getElementById('searchInput');
  const chipsWrap = document.getElementById('chipsWrap');
  const modalBg = document.getElementById('modalBg');
  const modalCat = document.getElementById('modalCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const modalForm = document.getElementById('modalForm');
  const toastWrap = document.getElementById('toastWrap');

  let state = { query: '', category: 'All', tool: null };

  // ============ HELPERS ============
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function isUrl(s) {
    return typeof s === 'string' && /^https?:\/\//i.test(s.trim());
  }

  function isArabic(s) {
    return typeof s === 'string' && /[\u0600-\u06FF]/.test(s);
  }

  function urlType(u) {
    const p = u.split('?')[0].split('#')[0].toLowerCase();
    if (/\.(jpg|jpeg|png|webp|gif|bmp|svg|avif)$/.test(p)) return 'image';
    if (/\.(mp4|webm|mov|m3u8)$/.test(p)) return 'video';
    if (/\.(mp3|m4a|ogg|wav|flac|aac)$/.test(p)) return 'audio';
    if (/\.(pdf|docx?|xlsx?|pptx?|zip|rar|apk|7z|tar|gz)$/.test(p)) return 'file';
    return 'link';
  }

  const KEY_TYPE = {
    image: 'image', images: 'image', img: 'image', thumbnail: 'image', thumb: 'image',
    cover: 'image', picture: 'image', photo: 'image', avatar: 'image', poster: 'image',
    image_url: 'image', url_image: 'image', thumb_url: 'image',
    video: 'video', videos: 'video', video_url: 'video', url_video: 'video', mp4: 'video',
    audio: 'audio', audios: 'audio', audio_url: 'audio', url_audio: 'audio', mp3: 'audio',
    file: 'file', files: 'file', download: 'file', download_url: 'file'
  };

  const LABELS = {
    arab: 'Arab', arabic: 'Arab', latin: 'Latin', arti: 'Arti', indo: 'Indonesia',
    indonesia: 'Indonesia', translation: 'Terjemahan', translate: 'Terjemahan',
    meaning: 'Arti', tafsir: 'Tafsir', ayat: 'Ayat', ayah: 'Ayat',
    title: 'Judul', judul: 'Judul', name: 'Nama', nama: 'Nama',
    description: 'Deskripsi', deskripsi: 'Deskripsi', content: 'Konten',
    question: 'Pertanyaan', answer: 'Jawaban', soal: 'Soal', jawaban: 'Jawaban',
    number: 'Nomor', nomor: 'Nomor', no: 'Nomor',
    surah: 'Surah', juz: 'Juz', link: 'Link', url: 'URL', source: 'Sumber',
    date: 'Tanggal', tanggal: 'Tanggal', time: 'Waktu', durasi: 'Durasi',
    author: 'Penulis', creator: 'Pembuat', publisher: 'Penerbit',
    desc: 'Deskripsi', summary: 'Ringkasan', excerpt: 'Cuplikan',
    amount: 'Jumlah', from: 'Dari', to: 'Ke', result: 'Hasil', rate: 'Kurs',
    total: 'Total', count: 'Jumlah', uid: 'UID', level: 'Level',
    followers: 'Pengikut', following: 'Mengikuti', posts: 'Postingan',
    likes: 'Suka', views: 'Tayangan', comments: 'Komentar', shares: 'Bagikan',
    nickname: 'Nickname', username: 'Username', bio: 'Bio', email: 'Email',
    year: 'Tahun', month: 'Bulan', day: 'Hari',
    jadwal: 'Jadwal', imsak: 'Imsak', subuh: 'Subuh', dzuhur: 'Dzuhur',
    ashar: 'Ashar', maghrib: 'Maghrib', isya: 'Isya', terbit: 'Terbit', dhuha: 'Dhuha',
    imam: 'Imam', qari: 'Qari', category: 'Kategori', kategori: 'Kategori',
    type: 'Tipe', tipe: 'Tipe', status: 'Status', gender: 'Gender',
    country: 'Negara', negara: 'Negara', city: 'Kota', kota: 'Kota',
    latitude: 'Latitude', longitude: 'Longitude', timezone: 'Timezone',
    province: 'Provinsi', kabupaten: 'Kabupaten', kecamatan: 'Kecamatan',
    artist: 'Artis', album: 'Album', duration: 'Durasi', size: 'Ukuran',
    extension: 'Ekstensi', quality: 'Kualitas', resolution: 'Resolusi',
    season: 'Season', episode: 'Episode', rating: 'Rating', genre: 'Genre',
    vote_average: 'Rating', overview: 'Ringkasan', release_date: 'Rilis',
    popularity: 'Popularitas', runtime: 'Durasi', tagline: 'Tagline'
  };

  function labelFor(k) {
    return LABELS[k] || k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function toast(msg, type = 'info') {
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = msg;
    toastWrap.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      el.style.transition = 'all 0.25s ease';
      setTimeout(() => el.remove(), 260);
    }, 2400);
  }

  // ============ UNWRAP ============
  function unwrap(data) {
    let d = data, depth = 0;
    while (depth < 4) {
      if (!d || typeof d !== 'object' || Array.isArray(d)) break;
      const keys = Object.keys(d);
      if (keys.length === 0) break;

      if (keys.length === 1 && ['data', 'result', 'response', 'results', 'payload', 'output'].includes(keys[0])) {
        d = d[keys[0]];
        depth++;
        continue;
      }

      const dk = keys.find(k => ['data', 'result', 'response', 'results'].includes(k));
      if (dk && keys.length <= 4) {
        const inner = d[dk];
        if (inner !== null && inner !== undefined && (typeof inner === 'object')) {
          d = inner;
          depth++;
          continue;
        }
      }
      break;
    }
    return d;
  }

  // ============ MEDIA EXTRACTOR ============
  function findMedia(obj) {
    const out = { images: [], videos: [], audios: [], files: [] };
    const seen = new Set();

    function walk(v, parentKey) {
      if (typeof v === 'string') {
        if (!isUrl(v) || seen.has(v)) return;
        seen.add(v);
        let t = urlType(v);
        if (t === 'link' && parentKey && KEY_TYPE[parentKey.toLowerCase()]) {
          t = KEY_TYPE[parentKey.toLowerCase()];
        }
        if (t === 'image') out.images.push(v);
        else if (t === 'video') out.videos.push(v);
        else if (t === 'audio') out.audios.push(v);
        else if (t === 'file') out.files.push(v);
      } else if (Array.isArray(v)) {
        v.forEach(x => walk(x, parentKey));
      } else if (v && typeof v === 'object') {
        Object.entries(v).forEach(([k, val]) => walk(val, k));
      }
    }
    walk(obj, null);
    return out;
  }

  // ============ RENDERERS ============
  function renderMedia(media) {
    let html = '';

    media.images.slice(0, 12).forEach(url => {
      html += `<div class="pv-media">
        <a href="${esc(url)}" target="_blank" rel="noopener" class="pv-media-click">
          <img src="${esc(url)}" alt="" loading="lazy" onerror="this.parentElement.parentElement.style.display='none'" />
        </a>
        <a href="${esc(url)}" download target="_blank" class="pv-dl" title="Unduh">↓</a>
      </div>`;
    });

    media.videos.slice(0, 3).forEach(url => {
      html += `<div class="pv-media">
        <video src="${esc(url)}" controls playsinline preload="metadata"></video>
        <a href="${esc(url)}" download target="_blank" class="pv-dl" title="Unduh">↓</a>
      </div>`;
    });

    media.audios.slice(0, 3).forEach(url => {
      html += `<div class="pv-media"><audio src="${esc(url)}" controls preload="metadata"></audio></div>`;
    });

    media.files.slice(0, 6).forEach(url => {
      const name = decodeURIComponent(url.split('/').pop().split('?')[0]) || 'File';
      const ext = (name.split('.').pop() || 'FILE').toUpperCase().slice(0, 4);
      html += `<a href="${esc(url)}" target="_blank" rel="noopener" class="pv-file">
        <div class="pv-file-icon">${esc(ext)}</div>
        <div class="pv-file-info"><div class="pv-file-name">${esc(name)}</div></div>
        <div class="pv-file-act">Unduh</div>
      </a>`;
    });

    return html;
  }

  function renderValue(v) {
    const s = String(v);
    if (isArabic(s)) return `<div class="pv-value arabic">${esc(s)}</div>`;
    return `<div class="pv-value">${esc(s)}</div>`;
  }

  function renderFields(obj) {
    const entries = Object.entries(obj).filter(([k, v]) =>
      v !== null && v !== undefined && v !== '' &&
      typeof v !== 'object' && String(v).length < 2000
    );
    if (!entries.length) return '';
    let html = '<div class="pv-fields">';
    entries.forEach(([k, v]) => {
      html += `<div class="pv-field">
        <div class="pv-label">${esc(labelFor(k))}</div>
        ${renderValue(v)}
      </div>`;
    });
    html += '</div>';
    return html;
  }

  function renderStringArray(arr) {
    return '<div class="pv-pills">' +
      arr.slice(0, 30).map(v => `<span class="pv-pill">${esc(String(v))}</span>`).join('') +
      '</div>';
  }

  function renderCardMeta(item, title, desc, img) {
    const skip = new Set([
      title, desc, img,
      item.link, item.url, item.href, item.source,
      item.thumbnail, item.thumb, item.image, item.cover,
      item.picture, item.photo, item.avatar, item.poster
    ]);
    const fields = Object.entries(item).filter(([k, v]) =>
      v !== null && v !== undefined && v !== '' &&
      typeof v !== 'object' &&
      !skip.has(v) &&
      String(v).length < 100
    ).slice(0, 5);
    if (!fields.length) return '';
    return `<div class="pv-card-meta">${fields.map(([k, v]) =>
      `<span>${esc(labelFor(k))}: <b>${esc(String(v))}</b></span>`
    ).join('')}</div>`;
  }

  function renderCardList(arr) {
    let html = '<div class="pv-list">';
    arr.slice(0, 30).forEach(item => {
      if (typeof item !== 'object' || item === null) {
        html += `<div class="pv-text">${esc(String(item))}</div>`;
        return;
      }
      const img = item.thumbnail || item.thumb || item.image || item.cover ||
                  item.picture || item.photo || item.avatar || item.poster;
      const title = item.title || item.judul || item.name || item.nama ||
                    item.headline || item.surah_name || item.surah;
      const desc = item.description || item.deskripsi || item.content ||
                   item.summary || item.excerpt || item.arti || item.indo ||
                   item.translation || item.overview;
      const link = item.link || item.url || item.href || item.source;
      const isImg = img && isUrl(img);

      const inner = `<div class="pv-card">
        ${isImg ? `<img src="${esc(img)}" class="pv-card-img" loading="lazy" onerror="this.style.display='none'" />` : ''}
        <div class="pv-card-body">
          ${title ? `<div class="pv-card-title">${esc(String(title))}</div>` : ''}
          ${desc ? `<div class="pv-card-desc">${esc(String(desc))}</div>` : ''}
          ${renderCardMeta(item, title, desc, img)}
        </div>
      </div>`;

      if (link && isUrl(link)) {
        html += `<a href="${esc(link)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${inner}</a>`;
      } else {
        html += inner;
      }
    });
    html += '</div>';
    return html;
  }

  function renderContent(data) {
    if (data === null || data === undefined) return '';
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
      return `<div class="pv-text">${esc(String(data))}</div>`;
    }
    if (Array.isArray(data)) {
      if (!data.length) return '';
      if (typeof data[0] !== 'object') return renderStringArray(data);
      return renderCardList(data);
    }
    if (typeof data === 'object') {
      let html = renderFields(data);
      for (const [k, v] of Object.entries(data)) {
        if (Array.isArray(v) && v.length > 0) {
          if (typeof v[0] === 'object') {
            html += `<div class="pv-subtitle">${esc(labelFor(k))}</div>` + renderCardList(v);
          } else {
            html += `<div class="pv-subtitle">${esc(labelFor(k))}</div>` + renderStringArray(v);
          }
        }
      }
      return html;
    }
    return '';
  }

  function renderPreview(data) {
    const clean = unwrap(data);

    if (Array.isArray(clean) && clean.length && typeof clean[0] === 'object') {
      return renderCardList(clean) + renderMedia(findMedia(clean));
    }

    if (clean && typeof clean === 'object' && !Array.isArray(clean)) {
      const arrayEntry = Object.entries(clean).find(([k, v]) =>
        Array.isArray(v) && v.length > 0 && typeof v[0] === 'object'
      );
      if (arrayEntry) {
        const [key, arr] = arrayEntry;
        let html = '';
        const otherFields = {};
        Object.entries(clean).forEach(([k, v]) => {
          if (k !== key && v !== null && v !== undefined && typeof v !== 'object' && v !== '') {
            otherFields[k] = v;
          }
        });
        if (Object.keys(otherFields).length) html += renderFields(otherFields);
        html += `<div class="pv-subtitle">${esc(labelFor(key))}</div>` + renderCardList(arr);
        const media = findMedia(clean);
        html += renderMedia(media);
        return html;
      }
    }

    const media = findMedia(clean);
    let html = renderMedia(media);
    html += renderContent(clean);
    return html;
  }

  // ============ CHIPS ============
  function renderChips() {
    const html = [
      `<button class="chip ${state.category === 'All' ? 'active' : ''}" data-cat="All">Semua<span class="count">${window.TOOLS.length}</span></button>`
    ].concat(window.CATEGORIES.map(c => {
      const n = window.TOOLS.filter(t => t.category === c).length;
      const active = state.category === c ? 'active' : '';
      return `<button class="chip ${active}" data-cat="${esc(c)}">${esc(c)}<span class="count">${n}</span></button>`;
    })).join('');

    chipsWrap.innerHTML = html;
    chipsWrap.querySelectorAll('.chip').forEach(b =>
      b.addEventListener('click', () => {
        state.category = b.dataset.cat;
        renderChips();
        renderGrid();
      })
    );
  }

  // ============ GRID ============
  function renderGrid() {
    const q = state.query.trim().toLowerCase();
    const filtered = window.TOOLS.filter(t => {
      if (state.category !== 'All' && t.category !== state.category) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });

    if (!filtered.length) {
      gridWrap.innerHTML = `<div style="text-align:center;padding:48px 20px;color:var(--muted);font-size:13px;">Tidak ada tool yang cocok.</div>`;
      return;
    }

    const groups = {};
    filtered.forEach(t => {
      (groups[t.category] = groups[t.category] || []).push(t);
    });

    const singleGroup = state.category !== 'All' || state.query;
    let html = '';
    let globalIdx = 0;

    for (const [cat, tools] of Object.entries(groups)) {
      if (!singleGroup) {
        html += `<div class="group-title">${esc(cat)}<span class="line"></span></div>`;
      }
      html += '<div class="grid">';
      tools.forEach(t => {
        const delay = Math.min(globalIdx * 18, 280);
        globalIdx++;
        html += `<button class="card" data-id="${esc(t.id)}" style="animation-delay:${delay}ms">
          <span class="card-cat">${esc(t.category)}</span>
          <div class="card-title">${esc(t.name)}</div>
          <div class="card-desc">${esc(t.description)}</div>
        </button>`;
      });
      html += '</div>';
    }
    gridWrap.innerHTML = html;

    gridWrap.querySelectorAll('.card').forEach(c =>
      c.addEventListener('click', () => {
        const tool = window.TOOLS.find(t => t.id === c.dataset.id);
        if (tool) openModal(tool);
      })
    );
  }

  // ============ MODAL ============
  function openModal(tool) {
    state.tool = tool;
    modalCat.textContent = tool.category;
    modalTitle.textContent = tool.name;
    modalSub.textContent = tool.description;

    let form = '';
    if (!tool.params.length) {
      form = `<p style="font-size:13px;color:var(--muted);text-align:center;padding:12px 0;">Tidak butuh parameter. Tekan <b style="color:var(--text);">Jalankan</b>.</p>`;
    } else {
      tool.params.forEach(p => {
        form += `<div class="form-field">
          <label><span>${esc(p.label)}${p.required ? '<span class="req"> *</span>' : ''}</span></label>`;
        if (p.type === 'select') {
          form += `<select class="form-select" data-param="${esc(p.name)}">
            <option value="">-- Pilih --</option>
            ${p.options.map(o => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('')}
          </select>`;
        } else if (p.type === 'textarea') {
          form += `<textarea class="form-textarea" data-param="${esc(p.name)}" placeholder="${esc(p.placeholder || '')}"></textarea>`;
        } else if (p.type === 'file') {
          form += `<input type="file" class="form-input" data-param="${esc(p.name)}" />`;
        } else {
          form += `<input type="${p.type}" class="form-input" data-param="${esc(p.name)}" placeholder="${esc(p.placeholder || '')}" />`;
        }
        form += `</div>`;
      });
    }
    form += `<div class="btn-row">
      <button type="submit" class="btn-primary" id="btnRun">Jalankan</button>
      <button type="button" class="btn-secondary" id="btnReset">Reset</button>
    </div>
    <div id="previewArea"></div>`;

    modalForm.innerHTML = form;
    modalForm.onsubmit = handleSubmit;
    document.getElementById('btnReset').onclick = () => openModal(tool);

    modalBg.classList.add('open');
    modalBg.querySelector('.modal').scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBg.classList.remove('open');
    document.body.style.overflow = '';
    state.tool = null;
  }

  // ============ SUBMIT ============
  async function handleSubmit(e) {
    e.preventDefault();
    const tool = state.tool;
    if (!tool) return;

    const values = {}, files = {};
    modalForm.querySelectorAll('[data-param]').forEach(el => {
      const k = el.dataset.param;
      if (el.type === 'file') {
        files[k] = el.files && el.files[0] ? el.files[0] : null;
      } else {
        values[k] = el.value;
      }
    });

    const btn = document.getElementById('btnRun');
    const previewArea = document.getElementById('previewArea');
    btn.disabled = true;
    btn.textContent = 'Memproses...';
    previewArea.innerHTML = `<div class="preview-loading"><div class="spinner"></div><span>Sedang diproses...</span></div>`;

    const hasFile = Object.values(files).some(f => f);

    try {
      const headers = {
        'x-proxy-path': tool.path,
        'x-proxy-method': tool.method,
        'x-proxy-query': JSON.stringify(values)
      };

      let body;
      if (hasFile) {
        const fd = new FormData();
        Object.entries(files).forEach(([k, f]) => {
          if (f) fd.append(k, f);
        });
        body = fd;
      } else if (tool.method === 'POST') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(values);
      }

      const res = await fetch('/api/proxy', { method: 'POST', headers, body });
      const json = await res.json();

      if (json.ok === false) {
        const errData = json.data;
        const msg = errData && (errData.message || errData.error) || 'Gagal memproses';
        throw new Error(msg);
      }

      const html = renderPreview(json.data);
      previewArea.innerHTML = `
        <div class="preview-area">
          <div class="preview-head"><h3>Hasil</h3></div>
          ${html || '<div class="preview-empty">Tidak ada hasil untuk ditampilkan.</div>'}
        </div>`;
      toast('Selesai', 'success');
    } catch (err) {
      previewArea.innerHTML = `<div class="preview-area">
        <div class="preview-empty">${esc(err.message || 'Terjadi kesalahan')}</div>
      </div>`;
      toast(err.message || 'Error', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Jalankan';
    }
  }

  // ============ EVENTS ============
  searchInput.addEventListener('input', e => {
    state.query = e.target.value;
    renderGrid();
  });

  modalBg.addEventListener('click', e => {
    if (e.target === modalBg) closeModal();
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalBg.classList.contains('open')) closeModal();
  });

  // ============ INIT ============
  renderChips();
  renderGrid();
})();