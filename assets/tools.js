(function () {
  const t = (name, label, ph = '', req = false) => ({ name, label, type: 'text', placeholder: ph, required: req });
  const n = (name, label, ph = '', req = false) => ({ name, label, type: 'number', placeholder: ph, required: req });
  const a = (name, label, ph = '', req = false) => ({ name, label, type: 'textarea', placeholder: ph, required: req });
  const s = (name, label, opts, req = false) => ({ name, label, type: 'select', options: opts, required: req });
  const f = (name, label, req = false) => ({ name, label, type: 'file', required: req });
  const T = (id, name, method, path, desc, cat, params = []) => ({ id, name, method, path, description: desc, category: cat, params });

  window.TOOLS = [
    // Islamic
    T('asmaulhusna','Asmaul Husna','GET','/api/v1/islamic/asmaulhusna','99 nama indah Allah SWT beserta nomor, lafadz Arab, latin, dan arti.','Islamic'),
    T('murottal','Murottal 30 Juz','GET','/api/v1/islamic/murottal','Audio MP3 murottal 30 Juz dari 6 Imam & Qari dunia.','Islamic',[t('imam','Imam / Qari','Misyari Rasyid Al-Afasi'),n('surah','Nomor Surah','1-114')]),
    T('hadits','Hadits Shahih','GET','/api/v1/islamic/hadits','Hadits shahih dari 9 imam perawi besar.','Islamic',[s('imam','Imam',[{label:'Bukhari',value:'bukhari'},{label:'Muslim',value:'muslim'},{label:'Abu Dawud',value:'abu-dawud'},{label:'Tirmidzi',value:'tirmidzi'},{label:'Nasai',value:'nasai'},{label:'Ibnu Majah',value:'ibnu-majah'},{label:'Ahmad',value:'ahmad'},{label:'Malik',value:'malik'},{label:'Darimi',value:'darimi'}]),n('nomor','Nomor Hadits','1'),t('q','Kata Kunci','sabar')]),
    T('arbain','Hadits Arbain','GET','/api/v1/islamic/arbain','Hadits Arbain An-Nawawi nomor 1-42 atau acak.','Islamic',[n('nomor','Nomor (1-42)','1')]),
    T('hijriah','Kalender Hijriah','GET','/api/v1/islamic/hijriah','Kalender Hijriah harian & konversi Masehi ke Hijriah (Kemenag RI).','Islamic',[t('date','Tanggal (YYYY-MM-DD)','2025-01-01')]),
    T('doa','Doa Harian','GET','/api/v1/islamic/doa','Doa-doa harian mustajab lengkap Arab, latin, arti.','Islamic',[t('q','Cari Doa','sebelum makan')]),
    T('tafsir','Tafsir Kemenag','GET','/api/v1/islamic/tafsir','Tafsir Kemenag RI per surah/ayat.','Islamic',[n('surah','Surah (1-114)','1',true),n('ayat','Ayat','1')]),

    // Adzan
    T('adzan-kota','Cari Kota Adzan','GET','/api/v1/adzan/kota','Cari daftar & ID kota/kabupaten di Indonesia.','Adzan & Sholat',[t('q','Nama Kota','Jakarta')]),
    T('adzan-jadwal','Jadwal Sholat','GET','/api/v1/adzan/jadwal','Jadwal sholat 5 waktu + Imsak, Terbit, Dhuha.','Adzan & Sholat',[t('kota','Nama Kota','Jakarta'),n('id','ID Kota'),t('date','Tanggal','YYYY-MM-DD')]),

    // AI (non-VIP)
    T('unblur','AI Unblur','GET','/api/v1/ai/unblur','Perjelas foto buram & low-res dengan AI Super-Resolution.','AI',[t('url','URL Gambar','https://...')]),
    T('tts-voices','TTS Voices','GET','/api/v1/ai/tts/voices','Daftar 320+ karakter suara Text to Speech.','AI',[t('lang','Kode Bahasa','id'),s('gender','Gender',[{label:'Male',value:'male'},{label:'Female',value:'female'}]),t('q','Cari Suara','gadis')]),
    T('websearch','AI Web Search','POST','/api/v1/ai/websearch','Pencarian internet real-time dengan rangkuman AI + sitasi.','AI',[t('query','Query','berita hari ini',true)]),
    T('duckai','DuckAI','GET','/api/v1/ai/duckai','AI assistant DuckDuckGo tanpa pelacakan.','AI',[t('q','Prompt','halo',true),s('model','Model',[{label:'GPT-4o mini',value:'gpt-4o-mini'},{label:'Claude 3 Haiku',value:'claude-3-haiku'},{label:'Llama 3',value:'llama-3'},{label:'Mixtral',value:'mixtral'}])]),
    T('emochi','Emochi Karakter','GET','/api/v1/ai/emochi','Cari ribuan karakter anime & AI roleplay dari Emochi.','AI',[t('q','Cari Karakter','anime')]),
    T('gemini','Gemini AI','POST','/api/v1/ai/gemini','Google Gemini Multi-Modal (Flash / Pro).','AI',[a('prompt','Prompt','Jelaskan AI',true),s('model','Model',[{label:'Flash',value:'gemini-1.5-flash'},{label:'Pro',value:'gemini-1.5-pro'}])]),
    T('llama','Llama 70B','POST','/api/v1/ai/llama','Model open-weights 70B dari Meta.','AI',[a('prompt','Prompt','halo',true)]),
    T('qwen-coder','Qwen Coder','POST','/api/v1/ai/qwen-coder','AI spesialis coding dari Alibaba Cloud.','AI',[a('prompt','Prompt','buat fungsi fibonacci di JS',true)]),

    // Al-Qur'an
    T('quran-juz','Al-Qur\'an Juz','GET','/api/v1/quran/juz','Ayat Al-Qur\'an per Juz (1-30) + audio & info surah.','Al-Qur\'an',[n('juz','Juz (1-30)','1',true),n('page','Page','1')]),
    T('quran-surah','Al-Qur\'an Surah','GET','/api/v1/quran/surah','Daftar 114 surah atau detail lengkap satu surah.','Al-Qur\'an',[n('surah','Nomor Surah','1')]),
    T('quran-ayah','Al-Qur\'an Ayah','GET','/api/v1/quran/ayah','Cari ayat berdasarkan surah/ayat, kata kunci, atau random.','Al-Qur\'an',[n('surah','Surah','2'),n('ayah','Ayat','255'),t('q','Kata Kunci','kursi')]),

    // APK Premium
    T('alight-send','Alight Magic Link','POST','/api/v1/apk/alightmotion/send-link','Kirim email login Magic Link Alight Motion Premium.','APK Premium',[t('email','Email','user@gmail.com',true)]),
    T('alight-verify','Alight Verify Link','POST','/api/v1/apk/alightmotion/verify-link','Verifikasi token Magic Link & aktifkan Premium.','APK Premium',[t('email','Email','user@gmail.com',true),t('token','Token','...',true)]),

    // Berita
    T('berita-cnn','CNN Indonesia','GET','/api/v1/berita/cnn','Berita terkini CNN Indonesia per kanal atau search.','Berita',[s('channel','Kanal',[{label:'Nasional',value:'nasional'},{label:'Internasional',value:'internasional'},{label:'Ekonomi',value:'ekonomi'},{label:'Olahraga',value:'olahraga'},{label:'Teknologi',value:'teknologi'},{label:'Hiburan',value:'hiburan'},{label:'Gaya Hidup',value:'gaya-hidup'}]),t('q','Cari','politik')]),
    T('berita-inews','iNews','GET','/api/v1/berita/inews','Berita terkini portal iNews.','Berita',[s('channel','Kanal',[{label:'News',value:'news'},{label:'Finance',value:'finance'},{label:'Sport',value:'sport'},{label:'Lifestyle',value:'lifestyle'},{label:'Travel',value:'travel'},{label:'Otomotif',value:'otomotif'},{label:'Techno',value:'techno'}]),t('q','Cari','')]),
    T('berita-kompas','Kompas.com','GET','/api/v1/berita/kompas','Berita terkini Kompas.com + pencarian.','Berita',[t('q','Cari','')]),

    // Canvas
    T('bratvid','Brat Video','GET','/api/v1/canvas/bratvid','Video animasi kata-per-kata Brat 512x512 MP4.','Canvas',[t('text','Teks','halo dunia',true)]),
    T('brat-hd','Brat HD','GET','/api/v1/canvas/brat-hd','Gambar meme Brat Ultra HD 2048x2048.','Canvas',[t('text','Teks','halo',true),s('theme','Tema',[{label:'Green/Lime',value:'green'},{label:'White',value:'white'},{label:'Dark',value:'dark'}])]),
    T('brat','Brat','GET','/api/v1/canvas/brat','Gambar meme Brat klasik 1024x1024.','Canvas',[t('text','Teks','halo',true)]),
    T('brat-video','Brat Video Retro','GET','/api/v1/canvas/brat-video','Stiker video animasi retro hijau lime.','Canvas',[t('text','Teks','halo',true)]),
    T('donation','Donation Receipt','GET','/api/v1/canvas/donation','Struk bukti donasi + ucapan terima kasih.','Canvas',[t('nominal','Nominal','50000',true),t('name','Nama Donatur','Budi',true)]),
    T('testimoni','Testimoni Toko','GET','/api/v1/canvas/testimoni','Banner testimoni toko modern 1080x1080.','Canvas',[t('text','Isi Testimoni','Barang bagus!',true),t('name','Nama','Budi'),t('store','Nama Toko','Toko Budi')]),
    T('fakecall','Fake WhatsApp Call','GET','/api/v1/canvas/fakecall','Mock WhatsApp Voice Call realistis 1080x2344.','Canvas',[t('name','Nama Kontak','Budi',true),t('duration','Durasi','00:30')]),
    T('fakechannel','Fake WA Channel','GET','/api/v1/canvas/fakechannel','Mock WhatsApp Channel Profile 1080x2344.','Canvas',[t('name','Nama Saluran','Info Berita',true),t('followers','Followers','1000')]),
    T('fakedana','Fake DANA','GET','/api/v1/canvas/fakedana','Mock e-wallet DANA custom saldo.','Canvas',[n('saldo','Saldo','100000',true),t('jam','Jam','12:00')]),
    T('fakegroup','Fake WA Group','GET','/api/v1/canvas/fakegroup','Mock WhatsApp Group Profile.','Canvas',[t('name','Nama Grup','Grup Mabar',true),t('members','Anggota','10')]),
    T('ktp','Fake e-KTP','GET','/api/v1/canvas/ktp','Mock e-KTP Indonesia realistis 720x463.','Canvas',[t('nik','NIK','3171234567890001',true),t('nama','Nama','Budi Santoso',true),t('ttl','Tempat/Tgl Lahir','Jakarta, 01-01-1990')]),
    T('fakenotif','Fake Notif Lock','GET','/api/v1/canvas/fakenotif','Mock notifikasi lockscreen Android/iOS.','Canvas',[t('name','Nama Pengirim','Budi',true),t('message','Pesan','Halo!',true),s('platform','Platform',[{label:'Android',value:'android'},{label:'iOS',value:'ios'}])]),
    T('fakespotify','Fake Spotify','GET','/api/v1/canvas/fakespotify','Screenshot pemutar Spotify custom.','Canvas',[t('title','Judul','Shape of You',true),t('artist','Artis','Ed Sheeran',true)]),
    T('faketweet','Fake Tweet','GET','/api/v1/canvas/faketweet','Fake tweet / X dengan verifikasi & stats.','Canvas',[t('name','Nama','Budi',true),t('username','Username','budi'),t('text','Teks','Halo dunia!',true)]),
    T('fakex','Fake X Post','GET','/api/v1/canvas/fakex','Screenshot X post dengan stats.','Canvas',[t('name','Nama','Budi',true),t('text','Teks','Halo dunia!',true)]),
    T('fflobby','FF Lobby','POST','/api/v1/canvas/fflobby','Screenshot lobby Free Fire HD 1920x3413.','Canvas',[t('nickname','Nickname','INSOMDEV',true)]),
    T('ffprofile','FF Profile','GET','/api/v1/canvas/ffprofile','Kartu profil esports Free Fire 1080x1440.','Canvas',[t('nickname','Nickname','INSOMDEV',true),t('uid','UID','123456789')]),
    T('fakestory','Fake IG Story','GET','/api/v1/canvas/fakestory','Mockup Instagram Story pixel-perfect.','Canvas',[t('username','Username','budi',true),t('text','Teks','Halo'),t('imgUrl','URL Gambar')]),
    T('iqc','IQC Bubble Chat','GET','/api/v1/canvas/iqc','Mock bubble chat WhatsApp iOS.','Canvas',[t('text','Teks','Halo',true),t('time','Jam','12:00')]),
    T('card-profile','Card Profile','GET','/api/v1/canvas/card-profile','Kartu identitas profil member modern.','Canvas',[t('name','Nama','Budi',true),t('role','Role','Member'),t('avatar','URL Avatar')]),
    T('smeme','SMeme Sticker','GET','/api/v1/canvas/smeme','Meme dari gambar/stiker dengan teks Impact.','Canvas',[t('url','URL Gambar','',true),t('top','Teks Atas',''),t('bottom','Teks Bawah','')]),
    T('photobox-koran','Photobox / Koran','POST','/api/v1/canvas/photobox-koran','Photostrip / photobox modern multi-tema.','Canvas',[s('theme','Tema',[{label:'Retro Film',value:'retro-film'},{label:'Y2K Digital',value:'y2k'},{label:'Korean Studio',value:'korean'},{label:'Pink Love',value:'pink-love'},{label:'Vintage Polaroid',value:'polaroid'},{label:'Cyber Neon',value:'cyber-neon'},{label:'Koran Vintage',value:'koran'}]),t('caption','Caption','Kenangan 2025')]),
    T('struk','Struk Belanja','POST','/api/v1/canvas/struk','Struk belanja thermal realistis.','Canvas',[t('store','Nama Toko','Indomaret',true),t('items','Items (qty|nama|harga, pisah koma)','1|Aqua|5000,2|Roti|4000',true),s('theme','Tema',[{label:'Classic',value:'classic'},{label:'Modern',value:'modern'},{label:'Indomaret',value:'indomaret'},{label:'Dark',value:'dark'}])]),
    T('tiktok-profile','Fake TikTok Profile','GET','/api/v1/canvas/tiktok-profile','Mock profil TikTok 1080x2344.','Canvas',[t('name','Display Name','Budi',true),t('username','Username','budi'),t('bio','Bio','Halo!')]),
    T('fakewanted','Fake Wanted Poster','GET','/api/v1/canvas/fakewanted','Poster Wanted vintage pixel-accurate.','Canvas',[t('name','Nama Target','Budi',true),t('reward','Reward','$1000'),t('imgUrl','URL Foto')]),
    T('ch-ios','WA Channel iOS','GET','/api/v1/canvas/ch-ios','Mock header WA Channel iOS.','Canvas',[t('name','Nama Channel','Info Berita',true),t('followers','Followers','1000')]),
    T('gc-ios','WA Group iOS','GET','/api/v1/canvas/gc-ios','Mock WA Group iOS.','Canvas',[t('name','Nama Grup','Grup Mabar',true),t('description','Deskripsi',''),t('members','Anggota','10')]),
    T('left','WA Goodbye Banner','GET','/api/v1/canvas/left','Banner WA goodbye 1280x720.','Canvas',[t('name','Nama Member','Budi',true),t('group','Nama Grup','Grup Mabar',true),t('members','Jumlah Member','9')]),
    T('welcome','WA Welcome Banner','GET','/api/v1/canvas/welcome','Banner WA welcome 1280x720.','Canvas',[t('name','Nama Member','Budi',true),t('group','Nama Grup','Grup Mabar',true),t('phone','Nomor HP','628xxx')]),
    T('whatsapp-profile','WA Profile','GET','/api/v1/canvas/whatsapp-profile','Mock WA Info Kontak 1080x2344.','Canvas',[t('name','Nama','Budi',true),t('phone','Nomor','628xxx',true)]),
    T('whatsapp-status','WA Status','GET','/api/v1/canvas/whatsapp-status','Mock WA Status dengan foto & waktu.','Canvas',[t('name','Nama','Budi',true),t('imgUrl','URL Foto')]),
    T('fakeyt','Fake YouTube Channel','GET','/api/v1/canvas/fakeyt','Mock YouTube mobile channel Android.','Canvas',[t('name','Nama Channel','Insomnia Dev',true),t('handle','Handle','@insomdev'),t('subs','Subscribers','1.2M')]),

    // Convert
    T('heic-to-jpg','HEIC → JPG','POST','/api/v1/convert/heic-to-jpg','Konversi foto HEIC iPhone ke JPG.','Convert',[f('file','File HEIC',true)]),
    T('image-to-pdf','Image → PDF','POST','/api/v1/convert/image-to-pdf','Bungkus gambar jadi PDF.','Convert',[f('file','File Gambar',true)]),
    T('image-to-webp','Image → WebP','POST','/api/v1/convert/image-to-webp','Konversi gambar ke WebP.','Convert',[f('file','File Gambar',true)]),
    T('pdf-to-image','PDF → Image','POST','/api/v1/convert/pdf-to-image','Ekstrak halaman PDF jadi JPG/PNG.','Convert',[f('file','File PDF',true)]),
    T('pdf-to-word','PDF → Word','POST','/api/v1/convert/pdf-to-word','Konversi PDF ke DOCX.','Convert',[f('file','File PDF',true)]),
    T('video-to-gif','Video → GIF','POST','/api/v1/convert/video-to-gif','Konversi cuplikan video jadi GIF.','Convert',[t('url','URL Video','https://...',true)]),
    T('video-to-mp3','Video → MP3','POST','/api/v1/convert/video-to-mp3','Ekstrak audio MP3 dari video.','Convert',[t('url','URL Video','https://...',true)]),
    T('webp-to-png','WebP → PNG','POST','/api/v1/convert/webp-to-png','Konversi WebP/stiker WA ke PNG.','Convert',[f('file','File WebP',true)]),
    T('word-to-pdf','Word → PDF','POST','/api/v1/convert/word-to-pdf','Konversi DOC/DOCX ke PDF.','Convert',[f('file','File Word',true)]),

    // Download
    T('dl-capcut','CapCut Downloader','GET','/api/v1/download/capcut','Download template CapCut tanpa watermark.','Download',[t('url','URL CapCut','https://...',true)]),
    T('dl-facebook','Facebook Downloader','GET','/api/v1/download/facebook','Download video/reel/story Facebook HD & SD.','Download',[t('url','URL Facebook','https://...',true)]),
    T('dl-instagram','Instagram Downloader','GET','/api/v1/download/instagram','Download IG Reels/Post/Foto/Carousel HD.','Download',[t('url','URL Instagram','https://...',true)]),
    T('dl-mediafire','MediaFire Downloader','GET','/api/v1/download/mediafire','Download file dari MediaFire tanpa iklan.','Download',[t('url','URL MediaFire','https://...',true)]),
    T('dl-sfile','Sfile Downloader','GET','/api/v1/download/sfile','Download file dari Sfile tanpa timer.','Download',[t('url','URL Sfile','https://...',true)]),
    T('dl-spotify','Spotify Downloader','GET','/api/v1/download/spotify','Download lagu Spotify MP3 + metadata.','Download',[t('url','URL Lagu Spotify','https://...',true)]),
    T('dl-threads','Threads Downloader','POST','/api/v1/download/threads','Download video/gambar/carousel Threads.','Download',[t('url','URL Threads','https://...',true)]),
    T('dl-tiktok','TikTok Downloader','GET','/api/v1/download/tiktok','Download TikTok HD no watermark + audio MP3.','Download',[t('url','URL TikTok','https://...',true)]),
    T('dl-twitter','Twitter/X Downloader','GET','/api/v1/download/twitter','Download video/GIF/gambar dari X.','Download',[t('url','URL Tweet','https://...',true),s('quality','Kualitas',[{label:'720p',value:'720p'},{label:'360p',value:'360p'},{label:'180p',value:'180p'}])]),
    T('ytmusic','YouTube Music','GET','/api/v1/ytmusic','Universal search + downloader YouTube Music.','Download',[t('q','Cari Lagu','lagu populer'),t('url','URL Track'),s('format','Format',[{label:'MP3 320k',value:'mp3'},{label:'M4A',value:'m4a'},{label:'FLAC',value:'flac'},{label:'WAV',value:'wav'}])]),
    T('dl-youtube','YouTube Downloader','GET','/api/v1/download/youtube','Download video/audio YouTube berbagai resolusi.','Download',[t('url','URL YouTube','https://...',true)]),

    // Drama
    T('cutad-detail','CutAD Detail','GET','/api/v1/drama/cutad/detail','Sinopsis + daftar episode + cover serial.','Drama',[t('id','ID Drama','...',true)]),
    T('cutad-stream','CutAD Stream','GET','/api/v1/drama/cutad/stream','Direct stream MP4/HLS episode.','Drama',[t('id','ID Episode','...',true)]),
    T('cutad-latest','CutAD Latest','GET','/api/v1/drama/cutad/latest','Serial mini drama trending terbaru.','Drama'),
    T('cutad-search','CutAD Search','GET','/api/v1/drama/cutad/search','Cari serial drama pendek.','Drama',[t('q','Kata Kunci','CEO',true)]),

    // DramaBox
    T('db-browse','DramaBox Browse','GET','/api/v1/dramabox/browse','Jelajahi kategori drama + paginasi.','DramaBox',[t('genre','Genre','romance'),n('page','Page','1')]),
    T('db-detail','DramaBox Detail','GET','/api/v1/dramabox/detail','Info drama + sinopsis + daftar episode.','DramaBox',[t('id','ID Drama','...',true)]),
    T('db-episodes','DramaBox Episodes','GET','/api/v1/dramabox/episodes','Direct MP4 720p + HLS M3U8.','DramaBox',[t('id','ID Episode','...',true)]),
    T('db-search','DramaBox Search','GET','/api/v1/dramabox/search','Cari drama pendek multi-bahasa.','DramaBox',[t('q','Kata Kunci','CEO',true),n('page','Page','1')]),
    T('db-stream','DramaBox Stream','GET','/api/v1/dramabox/stream','Direct stream 1080p/720p/540p.','DramaBox',[t('id','ID Episode','...',true)]),
    T('db-trending','DramaBox Trending','GET','/api/v1/dramabox/trending','Tayangan terpopuler DramaBox.','DramaBox'),
    T('db-keywords','DramaBox Keywords','GET','/api/v1/dramabox/keywords','Kata kunci trending DramaBox.','DramaBox'),

    // Finance
    T('currency','Currency Convert','GET','/api/v1/finance/currency','Konversi mata uang real-time 160+ dunia.','Finance',[t('from','Dari','USD',true),t('to','Ke','IDR',true),n('amount','Jumlah','1')]),

    // Games
    T('kuis-indo','Kuis B. Indonesia','GET','/api/v1/games/kuis-indo','Kuis Bahasa Indonesia per jenjang.','Games',[s('level','Jenjang',[{label:'SD',value:'sd'},{label:'SMP',value:'smp'},{label:'SMA',value:'sma'},{label:'Kuliah',value:'kuliah'}])]),
    T('kuis-ipa','Kuis IPA','GET','/api/v1/games/kuis-ipa','Kuis IPA per jenjang.','Games',[s('level','Jenjang',[{label:'SD',value:'sd'},{label:'SMP',value:'smp'},{label:'SMA',value:'sma'},{label:'Kuliah',value:'kuliah'}])]),
    T('kuis-ips','Kuis IPS','GET','/api/v1/games/kuis-ips','Kuis IPS per jenjang.','Games',[s('level','Jenjang',[{label:'SD',value:'sd'},{label:'SMP',value:'smp'},{label:'SMA',value:'sma'},{label:'Kuliah',value:'kuliah'}])]),
    T('kuis-mtk','Kuis Matematika','GET','/api/v1/games/kuis-mtk','Kuis MTK berjenjang + pembahasan.','Games',[s('level','Jenjang',[{label:'SD',value:'sd'},{label:'SMP',value:'smp'},{label:'SMA',value:'sma'},{label:'Kuliah',value:'kuliah'}])]),
    T('kuis-pelajaran','Kuis Pelajaran','GET','/api/v1/games/kuis-pelajaran','Kuis lengkap MTK/IPA/IPS/B.Indo per jenjang.','Games',[s('mapel','Mapel',[{label:'MTK',value:'mtk'},{label:'IPA',value:'ipa'},{label:'IPS',value:'ips'},{label:'B.Indo',value:'bindo'}]),s('level','Jenjang',[{label:'SD',value:'sd'},{label:'SMP',value:'smp'},{label:'SMA',value:'sma'},{label:'Kuliah',value:'kuliah'}])]),
    T('ff-karakter-search','FF Karakter Search','GET','/api/v1/games/search-karakter-freefire','Cari karakter Free Fire (58 karakter).','Games',[t('q','Nama Karakter','alok')]),
    T('susunkata','Susun Kata','GET','/api/v1/games/susunkata','Game anagram KBBI 600+ kata.','Games'),
    T('tebakbendera','Tebak Bendera','GET','/api/v1/games/tebakbendera','Kuis tebak bendera dunia (254 negara).','Games'),
    T('ff-karakter-tebak','Tebak FF Karakter','GET','/api/v1/games/tebak-karakter-freefire','Kuis tebak karakter Free Fire.','Games'),
    T('tebakprovinsi','Tebak Provinsi','GET','/api/v1/games/tebakprovinsi','Kuis tebak provinsi Indonesia (38).','Games'),

    // Komik
    T('komik-chapter','Komik Chapter','GET','/api/v1/komik/chapter','Daftar gambar halaman chapter komik.','Komik',[t('url','URL Chapter','https://...',true)]),
    T('komik-search','Komik Search','GET','/api/v1/komik/search','Cari manga/manhwa/manhua.','Komik',[t('q','Judul','solo leveling',true)]),
    T('komik-detail','Komik Detail','GET','/api/v1/komik/detail','Detail komik + daftar chapter.','Komik',[t('url','URL Komik','https://...',true)]),
    T('komik-latest','Komik Latest','GET','/api/v1/komik/latest','Update chapter terbaru hari ini.','Komik'),
    T('komik-popular','Komik Popular','GET','/api/v1/komik/popular','Komik terpopuler Komiku.','Komik'),

    // Movie
    T('movie-discover','Movie Discover','GET','/api/v1/movie/discover','Eksplorasi film/TV berdasarkan genre & tahun.','Movie & Series',[n('genre','Genre ID','28'),n('year','Tahun','2024'),t('sort','Sort','popularity.desc')]),
    T('movie-detail','Movie Detail','GET','/api/v1/movie/detail','Detail film/TV + cast + 21 server player.','Movie & Series',[n('id','TMDB ID','550',true),s('type','Tipe',[{label:'Movie',value:'movie'},{label:'TV',value:'tv'}])]),
    T('movie-stream','Movie Stream','GET','/api/v1/movie/stream','21 server player streaming embed HD.','Movie & Series',[n('id','TMDB ID','550',true),s('type','Tipe',[{label:'Movie',value:'movie'},{label:'TV',value:'tv'}])]),
    T('movie-search','Movie Search','GET','/api/v1/movie/search','Cari film/serial/anime.','Movie & Series',[t('q','Judul','avengers',true)]),
    T('movie-trending','Movie Trending','GET','/api/v1/movie/trending','Film trending global minggu ini.','Movie & Series',[s('window','Window',[{label:'Hari Ini',value:'day'},{label:'Minggu Ini',value:'week'}])]),
    T('movie-season','Movie Season','GET','/api/v1/movie/season','Daftar episode per season TV series.','Movie & Series',[n('id','TV ID','1399',true),n('season','Season','1',true)]),

    // Random
    T('rand-quote','Random Quote','GET','/api/v1/random/quote','Quote inspiratif tech & software engineering.','Random'),
    T('rand-user','Random User','GET','/api/v1/random/user','Identitas dummy (nama, email, avatar, dll).','Random',[t('nat','Nationality','id')]),
    T('rand-uuid','Random UUID','GET','/api/v1/random/uuid','Generate UUID v4 kriptografis.','Random',[n('count','Jumlah','1')]),

    // Search
    T('bmkg','BMKG Cuaca & Gempa','GET','/api/v1/search/bmkg','Data cuaca & gempa terkini BMKG.','Search',[t('q','Wilayah','jakarta')]),
    T('grupwa','Grup WA Search','GET','/api/v1/search/grupwa','Cari link grup WhatsApp publik.','Search',[t('q','Topik','mabar',true)]),
    T('dafont','Dafont','GET','/api/v1/search/dafont','Cari font Dafont + download ZIP.','Search',[t('q','Nama Font','handwritten',true)]),
    T('sekolah','Lokasi Sekolah','GET','/api/v1/search/lokasi-sekolah','Data sekolah dari Kemendikbud.','Search',[t('q','Nama Sekolah',''),t('wilayah','Wilayah','')]),
    T('stickerly','Stickerly','GET','/api/v1/search/stickerly','Cari paket stiker WhatsApp Sticker.ly.','Search',[t('q','Kata Kunci','kucing',true)]),
    T('groupwa','Group WA Search','GET','/api/v1/search/group-wa','Cari link grup WhatsApp publik by topik.','Search',[t('q','Topik','anime',true)]),

    // Search APIs
    T('amfinder','AM Finder','GET','/api/v1/search/amfinder','Cari link preset Alight Motion di semua sosmed.','Search APIs',[t('url','URL Postingan','https://...',true)]),
    T('cuaca','Cuaca BMKG','GET','/api/v1/search/cuaca','Prakiraan cuaca resmi BMKG seluruh Indonesia.','Search APIs',[t('q','Wilayah','jakarta',true)]),
    T('google','Google Search','GET','/api/v1/search/google','Google Web & Image search tanpa limit.','Search APIs',[t('q','Query','berita hari ini',true),s('type','Tipe',[{label:'Web',value:'web'},{label:'Image',value:'image'}])]),
    T('web-search','Web Search','GET','/api/v1/search/web','Web search article snippets + citations.','Search APIs',[t('q','Query','latest AI news',true)]),
    T('kbbi','KBBI Online','GET','/api/v1/search/kbbi','Cari arti kata KBBI resmi.','Search APIs',[t('q','Kata','rumah',true)]),
    T('pinterest','Pinterest','GET','/api/v1/search/pinterest','Cari foto/video Pinterest HD (1-50).','Search APIs',[t('q','Kata Kunci','wallpaper aesthetic',true),n('count','Jumlah','10')]),
    T('search-anime','Anime Search','GET','/api/v1/search/anime','Cari anime + episode, rating, genre, poster.','Search APIs',[t('q','Judul','naruto',true)]),
    T('wallpaper','Wallpaper','GET','/api/v1/search/wallpaper','Cari wallpaper HD by keyword.','Search APIs',[t('q','Kata Kunci','cyberpunk',true)]),
    T('spotify-search','Spotify Search','GET','/api/v1/search/spotify','Cari katalog lagu Spotify.','Search APIs',[t('q','Lagu','shape of you',true)]),
    T('tiktok-search','TikTok Search','GET','/api/v1/search/tiktok','Pencarian TikTok multi-card tab.','Search APIs',[t('q','Kata Kunci','dance',true)]),
    T('youtube-search','YouTube Search','GET','/api/v1/search/youtube','Cari video/channel/playlist YouTube.','Search APIs',[t('q','Query','coding tutorial',true),s('type','Tipe',[{label:'Video',value:'video'},{label:'Channel',value:'channel'},{label:'Playlist',value:'playlist'}]),n('limit','Limit','10')]),

    // Sports
    T('sports-detail','Sports Detail','GET','/api/v1/sports/detail','Detail pertandingan Goal.com.','Sports',[t('id','Match ID','...',true)]),
    T('sports-results','Sports Results','GET','/api/v1/sports/results','Hasil akhir pertandingan sepak bola.','Sports',[t('date','Tanggal','YYYY-MM-DD'),t('league','Liga','')]),
    T('sports-fixtures','Sports Fixtures','GET','/api/v1/sports/fixtures','Jadwal pertandingan mendatang.','Sports',[t('date','Tanggal','YYYY-MM-DD'),t('league','Liga','')]),
    T('sports-live','Sports Live','GET','/api/v1/sports/live','Skor live pertandingan sepak bola.','Sports',[t('league','Liga','')]),

    // Stalk
    T('stalk-fb','Stalk Facebook','GET','/api/v1/stalkfb','Profil publik Facebook.','Stalk',[t('username','Username','zuck',true)]),
    T('stalk-ff','Stalk Free Fire','GET','/api/v1/stalk/ff','Cek profil Free Fire by UID.','Stalk',[t('uid','UID','123456789',true)]),
    T('stalk-ig','Stalk Instagram','GET','/api/v1/stalkig','Profil IG publik.','Stalk',[t('username','Username','instagram',true)]),
    T('stalk-ml','Stalk Mobile Legends','GET','/api/v1/stalkml','Cek nickname Mobile Legends by UID+Zone.','Stalk',[t('uid','User ID','12345',true),t('zone','Zone ID','2000',true)]),
    T('stalk-tt','Stalk TikTok','GET','/api/v1/stalktt','Profil TikTok all-in-one.','Stalk',[t('username','Username','tiktok',true)]),
    T('stalk-x','Stalk X/Twitter','GET','/api/v1/stalkx','Profil X publik.','Stalk',[t('username','Username','elonmusk',true)]),

    // System
    T('sys-ip','My IP','GET','/api/v1/system/ip','Deteksi IP publik, ISP, dan negara.','System'),
    T('sys-stats','Server Stats','GET','/api/v1/system/stats','Load average, RAM, total volume API.','System'),
    T('sys-ping','Ping API','GET','/api/v1/system/ping','Cek availability + response time.','System'),

    // Temp Mail
    T('tm-message','Temp Mail Message','GET','/api/v1/tempmail/message','Baca isi lengkap email tertentu.','Temp Mail',[t('token','Token','...',true),t('id','Message ID','...',true)]),
    T('tm-create','Temp Mail Create','GET','/api/v1/tempmail/create','Buat email sementara instan.','Temp Mail',[t('domain','Domain','')]),
    T('tm-inbox','Temp Mail Inbox','GET','/api/v1/tempmail/inbox','List inbox email sementara.','Temp Mail',[t('token','Token','...',true)]),
    T('tm-domains','Temp Mail Domains','GET','/api/v1/tempmail/domains','List domain email sementara aktif.','Temp Mail'),
    T('tm-aio','Temp Mail AIO','GET','/api/v1/tempmail','All-in-one temp mail.','Temp Mail',[s('action','Action',[{label:'Create',value:'create'},{label:'Inbox',value:'inbox'},{label:'Message',value:'message'},{label:'Domains',value:'domains'}],true),t('token','Token','...')]),

    // Tools (non-VIP)
    T('js-deobfuscator','JS Deobfuscator','POST','/api/v1/tools/js-deobfuscator','Parser AST rekonstruksi JS terenkripsi.','Tools',[a('code','Kode JS','...',true)]),
    T('base64','Base64 Encode/Decode','GET','/api/v1/text/base64','Encode/decode Base64 UTF-8.','Tools',[t('text','Teks','halo',true),s('mode','Mode',[{label:'Encode',value:'encode'},{label:'Decode',value:'decode'}],true)]),
    T('check-phone','Check Phone','GET','/api/v1/tools/check-phone','Cek provider, paket, masa aktif nomor HP.','Tools',[t('phone','Nomor HP','08123456789',true)]),
    T('cek-operator','Cek Operator','GET','/api/v1/tools/cek-operator','Deteksi operator seluler Indonesia.','Tools',[t('phone','Nomor HP','08123456789',true)]),
    T('hash','Text Hash','GET','/api/v1/text/hash','Hitung hash MD5/SHA-1/SHA-256/SHA-512.','Tools',[t('text','Teks','halo',true),s('algo','Algoritma',[{label:'MD5',value:'md5'},{label:'SHA-1',value:'sha1'},{label:'SHA-256',value:'sha256'},{label:'SHA-512',value:'sha512'}],true)]),
    T('file-checksum','File Checksum','POST','/api/v1/file/checksum','Checksum SHA-256 & CRC32 file.','Tools',[f('file','File',true)]),
    T('decode-js','Decode JS','POST','/api/v1/tools/decode-js','Decode JS terenkripsi jadi bersih.','Tools',[a('code','Kode JS','...',true)]),
    T('kahoot','Kahoot Extractor','GET','/api/v1/tools/kahoot','Ekstrak pertanyaan + kunci jawaban Kahoot.','Tools',[t('url','URL/UUID Kahoot','...',true)]),
    T('netflix-token','Netflix Token','POST','/api/v1/tools/netflix-token','Generate sign-in token (nftoken) Netflix.','Tools',[t('cookie','Cookie Netflix','')]),
    T('ngl','NGL Send','POST','/api/v1/tools/ngl','Kirim pesan anonim ke NGL.link.','Tools',[t('username','Username','...',true),t('message','Pesan','halo',true)]),
    T('quizizz','Quizizz Extractor','GET','/api/v1/tools/quizizz','Ekstrak pertanyaan + jawaban Quizizz.','Tools',[t('code','Game Code / URL','...',true)]),
    T('subdomain-finder','Subdomain Finder','GET','/api/v1/tools/subdomain-finder','Petakan subdomain aktif dari domain.','Tools',[t('domain','Domain','example.com',true)]),
    T('slug','Text → Slug','GET','/api/v1/text/slug','Ubah teks jadi slug URL SEO-friendly.','Tools',[t('text','Teks','Judul Artikel Baru',true)]),
    T('design-extractor','Design Extractor','GET','/api/v1/tools/design-extractor','Ekstrak design system dari URL website.','Tools',[t('url','URL Website','https://example.com',true)])
  ];

  window.CATEGORIES = [...new Set(window.TOOLS.map((x) => x.category))];
})();