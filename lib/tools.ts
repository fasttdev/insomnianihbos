export type ParamType = "text" | "number" | "select" | "textarea" | "file";

export interface Param {
  name: string;
  label: string;
  type: ParamType;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  default?: string;
}

export interface Tool {
  id: string;
  name: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  category: string;
  params: Param[];
}

const p = (name: string, label: string, placeholder = "", required = false): Param => ({
  name, label, type: "text", placeholder, required
});
const pn = (name: string, label: string, placeholder = "", required = false): Param => ({
  name, label, type: "number", placeholder, required
});
const pt = (name: string, label: string, placeholder = "", required = false): Param => ({
  name, label, type: "textarea", placeholder, required
});
const ps = (name: string, label: string, options: { label: string; value: string }[], required = false): Param => ({
  name, label, type: "select", options, required
});
const pf = (name: string, label: string, required = false): Param => ({
  name, label, type: "file", required
});

export const TOOLS: Tool[] = [
  /* ============== ISLAMIC ============== */
  { id: "asmaulhusna", name: "Asmaul Husna", category: "Islamic", method: "GET", path: "/api/v1/islamic/asmaulhusna", description: "99 nama indah Allah SWT beserta nomor, lafadz Arab, latin, dan arti.", params: [] },
  { id: "murottal", name: "Murottal 30 Juz", category: "Islamic", method: "GET", path: "/api/v1/islamic/murottal", description: "Audio MP3 murottal 30 Juz dari 6 Imam & Qari dunia.", params: [p("imam","Imam / Qari","Misyari Rasyid Al-Afasi"), pn("surah","Nomor Surah","1-114")] },
  { id: "hadits", name: "Hadits Shahih", category: "Islamic", method: "GET", path: "/api/v1/islamic/hadits", description: "Hadits shahih dari 9 imam perawi besar.", params: [ps("imam","Imam",[{label:"Bukhari",value:"bukhari"},{label:"Muslim",value:"muslim"},{label:"Abu Dawud",value:"abu-dawud"},{label:"Tirmidzi",value:"tirmidzi"},{label:"Nasai",value:"nasai"},{label:"Ibnu Majah",value:"ibnu-majah"},{label:"Ahmad",value:"ahmad"},{label:"Malik",value:"malik"},{label:"Darimi",value:"darimi"}]), pn("nomor","Nomor Hadits","1"), p("q","Kata Kunci","sabar")] },
  { id: "arbain", name: "Hadits Arbain", category: "Islamic", method: "GET", path: "/api/v1/islamic/arbain", description: "Hadits Arbain An-Nawawi nomor 1-42 atau acak.", params: [pn("nomor","Nomor (1-42)","1")] },
  { id: "hijriah", name: "Kalender Hijriah", category: "Islamic", method: "GET", path: "/api/v1/islamic/hijriah", description: "Kalender Hijriah harian & konversi Masehi ke Hijriah (Kemenag RI).", params: [p("date","Tanggal (YYYY-MM-DD)","2025-01-01")] },
  { id: "doa", name: "Doa Harian", category: "Islamic", method: "GET", path: "/api/v1/islamic/doa", description: "Doa-doa harian mustajab lengkap Arab, latin, arti.", params: [p("q","Cari Doa","sebelum makan")] },
  { id: "tafsir", name: "Tafsir Kemenag", category: "Islamic", method: "GET", path: "/api/v1/islamic/tafsir", description: "Tafsir Kemenag RI per surah/ayat.", params: [pn("surah","Surah (1-114)","1",true), pn("ayat","Ayat","1")] },

  /* ============== ADZAN ============== */
  { id: "adzan-kota", name: "Cari Kota Adzan", category: "Adzan & Sholat", method: "GET", path: "/api/v1/adzan/kota", description: "Cari daftar & ID kota/kabupaten di Indonesia.", params: [p("q","Nama Kota","Jakarta")] },
  { id: "adzan-jadwal", name: "Jadwal Sholat", category: "Adzan & Sholat", method: "GET", path: "/api/v1/adzan/jadwal", description: "Jadwal sholat 5 waktu + Imsak, Terbit, Dhuha.", params: [p("kota","Nama Kota","Jakarta"), pn("id","ID Kota"), p("date","Tanggal","YYYY-MM-DD")] },

  /* ============== AI (NON-VIP) ============== */
  { id: "unblur", name: "AI Unblur", category: "AI", method: "GET", path: "/api/v1/ai/unblur", description: "Perjelas foto buram & low-res dengan AI Super-Resolution.", params: [p("url","URL Gambar","https://...")] },
  { id: "tts-voices", name: "TTS Voices", category: "AI", method: "GET", path: "/api/v1/ai/tts/voices", description: "Daftar 320+ karakter suara Text to Speech.", params: [p("lang","Kode Bahasa","id"), ps("gender","Gender",[{label:"Male",value:"male"},{label:"Female",value:"female"}]), p("q","Cari Suara","gadis")] },
  { id: "websearch", name: "AI Web Search", category: "AI", method: "POST", path: "/api/v1/ai/websearch", description: "Pencarian internet real-time dengan rangkuman AI + sitasi.", params: [p("query","Query","berita hari ini",true)] },
  { id: "duckai", name: "DuckAI", category: "AI", method: "GET", path: "/api/v1/ai/duckai", description: "AI assistant DuckDuckGo tanpa pelacakan.", params: [p("q","Prompt","halo",true), ps("model","Model",[{label:"GPT-4o mini",value:"gpt-4o-mini"},{label:"Claude 3 Haiku",value:"claude-3-haiku"},{label:"Llama 3",value:"llama-3"},{label:"Mixtral",value:"mixtral"}])] },
  { id: "emochi", name: "Emochi Karakter", category: "AI", method: "GET", path: "/api/v1/ai/emochi", description: "Cari ribuan karakter anime & AI roleplay dari Emochi.", params: [p("q","Cari Karakter","anime")] },
  { id: "gemini", name: "Gemini AI", category: "AI", method: "POST", path: "/api/v1/ai/gemini", description: "Google Gemini Multi-Modal (Flash / Pro).", params: [pt("prompt","Prompt","Jelaskan AI",true), ps("model","Model",[{label:"Flash",value:"gemini-1.5-flash"},{label:"Pro",value:"gemini-1.5-pro"}])] },
  { id: "llama", name: "Llama 70B", category: "AI", method: "POST", path: "/api/v1/ai/llama", description: "Model open-weights 70B dari Meta.", params: [pt("prompt","Prompt","halo",true)] },
  { id: "qwen-coder", name: "Qwen Coder", category: "AI", method: "POST", path: "/api/v1/ai/qwen-coder", description: "AI spesialis coding dari Alibaba Cloud.", params: [pt("prompt","Prompt","buat fungsi fibonacci di JS",true)] },

  /* ============== AL-QUR'AN ============== */
  { id: "quran-juz", name: "Al-Qur'an Juz", category: "Al-Qur'an", method: "GET", path: "/api/v1/quran/juz", description: "Ayat-ayat Al-Qur'an per Juz (1-30) + audio & info surah.", params: [pn("juz","Juz (1-30)","1",true), pn("page","Page","1")] },
  { id: "quran-surah", name: "Al-Qur'an Surah", category: "Al-Qur'an", method: "GET", path: "/api/v1/quran/surah", description: "Daftar 114 surah atau detail lengkap satu surah.", params: [pn("surah","Nomor Surah","1")] },
  { id: "quran-ayah", name: "Al-Qur'an Ayah", category: "Al-Qur'an", method: "GET", path: "/api/v1/quran/ayah", description: "Cari ayat berdasarkan surah/ayat, kata kunci, atau random.", params: [pn("surah","Surah","2"), pn("ayah","Ayat","255"), p("q","Kata Kunci","kursi")] },

  /* ============== APK PREMIUM ============== */
  { id: "alight-send", name: "Alight Magic Link", category: "APK Premium", method: "POST", path: "/api/v1/apk/alightmotion/send-link", description: "Kirim email login Magic Link Alight Motion Premium.", params: [p("email","Email","user@gmail.com",true)] },
  { id: "alight-verify", name: "Alight Verify Link", category: "APK Premium", method: "POST", path: "/api/v1/apk/alightmotion/verify-link", description: "Verifikasi token Magic Link & aktifkan Premium.", params: [p("email","Email","user@gmail.com",true), p("token","Token","...",true)] },

  /* ============== BERITA ============== */
  { id: "berita-cnn", name: "CNN Indonesia", category: "Berita", method: "GET", path: "/api/v1/berita/cnn", description: "Berita terkini dari CNN Indonesia per kanal atau search.", params: [ps("channel","Kanal",[{label:"Nasional",value:"nasional"},{label:"Internasional",value:"internasional"},{label:"Ekonomi",value:"ekonomi"},{label:"Olahraga",value:"olahraga"},{label:"Teknologi",value:"teknologi"},{label:"Hiburan",value:"hiburan"},{label:"Gaya Hidup",value:"gaya-hidup"}]), p("q","Cari","politik")] },
  { id: "berita-inews", name: "iNews", category: "Berita", method: "GET", path: "/api/v1/berita/inews", description: "Berita terkini portal iNews.", params: [ps("channel","Kanal",[{label:"News",value:"news"},{label:"Finance",value:"finance"},{label:"Sport",value:"sport"},{label:"Lifestyle",value:"lifestyle"},{label:"Travel",value:"travel"},{label:"Otomotif",value:"otomotif"},{label:"Techno",value:"techno"}]), p("q","Cari","")] },
  { id: "berita-kompas", name: "Kompas.com", category: "Berita", method: "GET", path: "/api/v1/berita/kompas", description: "Berita terkini Kompas.com + pencarian.", params: [p("q","Cari","")] },

  /* ============== CANVAS (NON-VIP) ============== */
  { id: "bratvid", name: "Brat Video", category: "Canvas", method: "GET", path: "/api/v1/canvas/bratvid", description: "Video animasi kata-per-kata Brat 512x512 MP4.", params: [p("text","Teks","halo dunia",true)] },
  { id: "brat-hd", name: "Brat HD", category: "Canvas", method: "GET", path: "/api/v1/canvas/brat-hd", description: "Gambar meme Brat Ultra HD 2048x2048.", params: [p("text","Teks","halo",true), ps("theme","Tema",[{label:"Green/Lime",value:"green"},{label:"White",value:"white"},{label:"Dark",value:"dark"}])] },
  { id: "brat", name: "Brat", category: "Canvas", method: "GET", path: "/api/v1/canvas/brat", description: "Gambar meme Brat klasik 1024x1024.", params: [p("text","Teks","halo",true)] },
  { id: "brat-video", name: "Brat Video Retro", category: "Canvas", method: "GET", path: "/api/v1/canvas/brat-video", description: "Stiker video animasi retro hijau lime.", params: [p("text","Teks","halo",true)] },
  { id: "donation", name: "Donation Receipt", category: "Canvas", method: "GET", path: "/api/v1/canvas/donation", description: "Struk bukti donasi + ucapan terima kasih.", params: [p("nominal","Nominal","50000",true), p("name","Nama Donatur","Budi",true)] },
  { id: "testimoni", name: "Testimoni Toko", category: "Canvas", method: "GET", path: "/api/v1/canvas/testimoni", description: "Banner testimoni toko modern 1080x1080.", params: [p("text","Isi Testimoni","Barang bagus!",true), p("name","Nama","Budi"), p("store","Nama Toko","Toko Budi")] },
  { id: "fakecall", name: "Fake WhatsApp Call", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakecall", description: "Mock WhatsApp Voice Call realistis 1080x2344.", params: [p("name","Nama Kontak","Budi",true), p("duration","Durasi","00:30")] },
  { id: "fakechannel", name: "Fake WA Channel", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakechannel", description: "Mock WhatsApp Channel Profile 1080x2344.", params: [p("name","Nama Saluran","Info Berita",true), p("followers","Followers","1000")] },
  { id: "fakedana", name: "Fake DANA", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakedana", description: "Mock e-wallet DANA custom saldo.", params: [pn("saldo","Saldo","100000",true), p("jam","Jam","12:00")] },
  { id: "fakegroup", name: "Fake WA Group", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakegroup", description: "Mock WhatsApp Group Profile.", params: [p("name","Nama Grup","Grup Mabar",true), p("members","Anggota","10")] },
  { id: "ktp", name: "Fake e-KTP", category: "Canvas", method: "GET", path: "/api/v1/canvas/ktp", description: "Mock e-KTP Indonesia realistis 720x463.", params: [p("nik","NIK","3171234567890001",true), p("nama","Nama","Budi Santoso",true), p("ttl","Tempat/Tgl Lahir","Jakarta, 01-01-1990")] },
  { id: "fakenotif", name: "Fake Notif Lock", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakenotif", description: "Mock notifikasi lockscreen Android/iOS.", params: [p("name","Nama Pengirim","Budi",true), p("message","Pesan","Halo!",true), ps("platform","Platform",[{label:"Android",value:"android"},{label:"iOS",value:"ios"}])] },
  { id: "fakespotify", name: "Fake Spotify", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakespotify", description: "Screenshot pemutar Spotify custom.", params: [p("title","Judul","Shape of You",true), p("artist","Artis","Ed Sheeran",true)] },
  { id: "faketweet", name: "Fake Tweet", category: "Canvas", method: "GET", path: "/api/v1/canvas/faketweet", description: "Fake tweet / X dengan verifikasi & stats.", params: [p("name","Nama","Budi",true), p("username","Username","budi"), p("text","Teks","Halo dunia!",true)] },
  { id: "fakex", name: "Fake X Post", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakex", description: "Screenshot X post dengan stats.", params: [p("name","Nama","Budi",true), p("text","Teks","Halo dunia!",true)] },
  { id: "fflobby", name: "FF Lobby", category: "Canvas", method: "POST", path: "/api/v1/canvas/fflobby", description: "Screenshot lobby Free Fire HD 1920x3413.", params: [p("nickname","Nickname","INSOMDEV",true)] },
  { id: "ffprofile", name: "FF Profile", category: "Canvas", method: "GET", path: "/api/v1/canvas/ffprofile", description: "Kartu profil esports Free Fire 1080x1440.", params: [p("nickname","Nickname","INSOMDEV",true), p("uid","UID","123456789")] },
  { id: "fakestory", name: "Fake IG Story", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakestory", description: "Mockup Instagram Story pixel-perfect.", params: [p("username","Username","budi",true), p("text","Teks","Halo"), p("imgUrl","URL Gambar")] },
  { id: "iqc", name: "IQC Bubble Chat", category: "Canvas", method: "GET", path: "/api/v1/canvas/iqc", description: "Mock bubble chat WhatsApp iOS.", params: [p("text","Teks","Halo",true), p("time","Jam","12:00")] },
  { id: "card-profile", name: "Card Profile", category: "Canvas", method: "GET", path: "/api/v1/canvas/card-profile", description: "Kartu identitas profil member modern.", params: [p("name","Nama","Budi",true), p("role","Role","Member"), p("avatar","URL Avatar")] },
  { id: "smeme", name: "SMeme Sticker", category: "Canvas", method: "GET", path: "/api/v1/canvas/smeme", description: "Meme dari gambar/stiker dengan teks Impact.", params: [p("url","URL Gambar",undefined,true), p("top","Teks Atas",""), p("bottom","Teks Bawah","")] },
  { id: "photobox-koran", name: "Photobox / Koran", category: "Canvas", method: "POST", path: "/api/v1/canvas/photobox-koran", description: "Photostrip / photobox modern multi-tema.", params: [ps("theme","Tema",[{label:"Retro Film",value:"retro-film"},{label:"Y2K Digital",value:"y2k"},{label:"Korean Studio",value:"korean"},{label:"Pink Love",value:"pink-love"},{label:"Vintage Polaroid",value:"polaroid"},{label:"Cyber Neon",value:"cyber-neon"},{label:"Koran Vintage",value:"koran"}]), p("caption","Caption","Kenangan 2025")] },
  { id: "struk", name: "Struk Belanja", category: "Canvas", method: "POST", path: "/api/v1/canvas/struk", description: "Struk belanja thermal realistis.", params: [p("store","Nama Toko","Indomaret",true), p("items","Items (format: qty|nama|harga, pisah koma)","1|Aqua|5000,2|Roti|4000",true), ps("theme","Tema",[{label:"Classic",value:"classic"},{label:"Modern",value:"modern"},{label:"Indomaret",value:"indomaret"},{label:"Dark",value:"dark"}])] },
  { id: "tiktok-profile", name: "Fake TikTok Profile", category: "Canvas", method: "GET", path: "/api/v1/canvas/tiktok-profile", description: "Mock profil TikTok 1080x2344.", params: [p("name","Display Name","Budi",true), p("username","Username","budi"), p("bio","Bio","Halo!")] },
  { id: "fakewanted", name: "Fake Wanted Poster", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakewanted", description: "Poster Wanted vintage pixel-accurate.", params: [p("name","Nama Target","Budi",true), p("reward","Reward","$1000"), p("imgUrl","URL Foto")] },
  { id: "ch-ios", name: "WA Channel iOS", category: "Canvas", method: "GET", path: "/api/v1/canvas/ch-ios", description: "Mock header WA Channel iOS.", params: [p("name","Nama Channel","Info Berita",true), p("followers","Followers","1000")] },
  { id: "gc-ios", name: "WA Group iOS", category: "Canvas", method: "GET", path: "/api/v1/canvas/gc-ios", description: "Mock WA Group iOS.", params: [p("name","Nama Grup","Grup Mabar",true), p("description","Deskripsi",""), p("members","Anggota","10")] },
  { id: "left", name: "WA Goodbye Banner", category: "Canvas", method: "GET", path: "/api/v1/canvas/left", description: "Banner WA goodbye 1280x720.", params: [p("name","Nama Member","Budi",true), p("group","Nama Grup","Grup Mabar",true), p("members","Jumlah Member","9")] },
  { id: "welcome", name: "WA Welcome Banner", category: "Canvas", method: "GET", path: "/api/v1/canvas/welcome", description: "Banner WA welcome 1280x720.", params: [p("name","Nama Member","Budi",true), p("group","Nama Grup","Grup Mabar",true), p("phone","Nomor HP","628xxx")] },
  { id: "whatsapp-profile", name: "WA Profile", category: "Canvas", method: "GET", path: "/api/v1/canvas/whatsapp-profile", description: "Mock WA Info Kontak 1080x2344.", params: [p("name","Nama","Budi",true), p("phone","Nomor","628xxx",true)] },
  { id: "whatsapp-status", name: "WA Status", category: "Canvas", method: "GET", path: "/api/v1/canvas/whatsapp-status", description: "Mock WA Status dengan foto & waktu.", params: [p("name","Nama","Budi",true), p("imgUrl","URL Foto")] },
  { id: "fakeyt", name: "Fake YouTube Channel", category: "Canvas", method: "GET", path: "/api/v1/canvas/fakeyt", description: "Mock YouTube mobile channel Android.", params: [p("name","Nama Channel","Insomnia Dev",true), p("handle","Handle","@insomdev"), p("subs","Subscribers","1.2M")] },

  /* ============== CONVERT ============== */
  { id: "heic-to-jpg", name: "HEIC → JPG", category: "Convert", method: "POST", path: "/api/v1/convert/heic-to-jpg", description: "Konversi foto HEIC iPhone ke JPG.", params: [pf("file","File HEIC",true)] },
  { id: "image-to-pdf", name: "Image → PDF", category: "Convert", method: "POST", path: "/api/v1/convert/image-to-pdf", description: "Bungkus gambar jadi PDF.", params: [pf("file","File Gambar",true)] },
  { id: "image-to-webp", name: "Image → WebP", category: "Convert", method: "POST", path: "/api/v1/convert/image-to-webp", description: "Konversi gambar ke WebP.", params: [pf("file","File Gambar",true)] },
  { id: "pdf-to-image", name: "PDF → Image", category: "Convert", method: "POST", path: "/api/v1/convert/pdf-to-image", description: "Ekstrak halaman PDF jadi JPG/PNG.", params: [pf("file","File PDF",true)] },
  { id: "pdf-to-word", name: "PDF → Word", category: "Convert", method: "POST", path: "/api/v1/convert/pdf-to-word", description: "Konversi PDF ke DOCX.", params: [pf("file","File PDF",true)] },
  { id: "video-to-gif", name: "Video → GIF", category: "Convert", method: "POST", path: "/api/v1/convert/video-to-gif", description: "Konversi cuplikan video jadi GIF.", params: [p("url","URL Video","https://...",true)] },
  { id: "video-to-mp3", name: "Video → MP3", category: "Convert", method: "POST", path: "/api/v1/convert/video-to-mp3", description: "Ekstrak audio MP3 dari video.", params: [p("url","URL Video","https://...",true)] },
  { id: "webp-to-png", name: "WebP → PNG", category: "Convert", method: "POST", path: "/api/v1/convert/webp-to-png", description: "Konversi WebP/stiker WA ke PNG.", params: [pf("file","File WebP",true)] },
  { id: "word-to-pdf", name: "Word → PDF", category: "Convert", method: "POST", path: "/api/v1/convert/word-to-pdf", description: "Konversi DOC/DOCX ke PDF.", params: [pf("file","File Word",true)] },

  /* ============== DOWNLOAD (NON-VIP) ============== */
  { id: "dl-capcut", name: "CapCut Downloader", category: "Download", method: "GET", path: "/api/v1/download/capcut", description: "Download template CapCut tanpa watermark.", params: [p("url","URL CapCut","https://...",true)] },
  { id: "dl-facebook", name: "Facebook Downloader", category: "Download", method: "GET", path: "/api/v1/download/facebook", description: "Download video/reel/story Facebook HD & SD.", params: [p("url","URL Facebook","https://...",true)] },
  { id: "dl-instagram", name: "Instagram Downloader", category: "Download", method: "GET", path: "/api/v1/download/instagram", description: "Download IG Reels/Post/Foto/Carousel HD.", params: [p("url","URL Instagram","https://...",true)] },
  { id: "dl-mediafire", name: "MediaFire Downloader", category: "Download", method: "GET", path: "/api/v1/download/mediafire", description: "Download file dari MediaFire tanpa iklan.", params: [p("url","URL MediaFire","https://...",true)] },
  { id: "dl-sfile", name: "Sfile Downloader", category: "Download", method: "GET", path: "/api/v1/download/sfile", description: "Download file dari Sfile tanpa timer.", params: [p("url","URL Sfile","https://...",true)] },
  { id: "dl-spotify", name: "Spotify Downloader", category: "Download", method: "GET", path: "/api/v1/download/spotify", description: "Download lagu Spotify MP3 + metadata.", params: [p("url","URL Lagu Spotify","https://...",true)] },
  { id: "dl-threads", name: "Threads Downloader", category: "Download", method: "POST", path: "/api/v1/download/threads", description: "Download video/gambar/carousel Threads.", params: [p("url","URL Threads","https://...",true)] },
  { id: "dl-tiktok", name: "TikTok Downloader", category: "Download", method: "GET", path: "/api/v1/download/tiktok", description: "Download TikTok HD no watermark + audio MP3.", params: [p("url","URL TikTok","https://...",true)] },
  { id: "dl-twitter", name: "Twitter/X Downloader", category: "Download", method: "GET", path: "/api/v1/download/twitter", description: "Download video/GIF/gambar dari X.", params: [p("url","URL Tweet","https://...",true), ps("quality","Kualitas",[{label:"720p",value:"720p"},{label:"360p",value:"360p"},{label:"180p",value:"180p"}])] },
  { id: "ytmusic", name: "YouTube Music", category: "Download", method: "GET", path: "/api/v1/ytmusic", description: "Universal search + downloader YouTube Music.", params: [p("q","Cari Lagu","lagu populer"), p("url","URL Track"), ps("format","Format",[{label:"MP3 320k",value:"mp3"},{label:"M4A",value:"m4a"},{label:"FLAC",value:"flac"},{label:"WAV",value:"wav"}])] },
  { id: "dl-youtube", name: "YouTube Downloader", category: "Download", method: "GET", path: "/api/v1/download/youtube", description: "Download video/audio YouTube berbagai resolusi.", params: [p("url","URL YouTube","https://...",true)] },

  /* ============== DRAMA ============== */
  { id: "cutad-detail", name: "CutAD Detail", category: "Drama", method: "GET", path: "/api/v1/drama/cutad/detail", description: "Sinopsis + daftar episode + cover serial.", params: [p("id","ID Drama","...",true)] },
  { id: "cutad-stream", name: "CutAD Stream", category: "Drama", method: "GET", path: "/api/v1/drama/cutad/stream", description: "Direct stream MP4/HLS episode.", params: [p("id","ID Episode","...",true)] },
  { id: "cutad-latest", name: "CutAD Latest", category: "Drama", method: "GET", path: "/api/v1/drama/cutad/latest", description: "Serial mini drama trending terbaru.", params: [] },
  { id: "cutad-search", name: "CutAD Search", category: "Drama", method: "GET", path: "/api/v1/drama/cutad/search", description: "Cari serial drama pendek.", params: [p("q","Kata Kunci","CEO",true)] },

  /* ============== DRAMABOX ============== */
  { id: "db-browse", name: "DramaBox Browse", category: "DramaBox", method: "GET", path: "/api/v1/dramabox/browse", description: "Jelajahi kategori drama + paginasi.", params: [p("genre","Genre","romance"), pn("page","Page","1")] },
  { id: "db-detail", name: "DramaBox Detail", category: "DramaBox", method: "GET", path: "/api/v1/dramabox/detail", description: "Info drama + sinopsis + daftar episode.", params: [p("id","ID Drama","...",true)] },
  { id: "db-episodes", name: "DramaBox Episodes", category: "DramaBox", method: "GET", path: "/api/v1/dramabox/episodes", description: "Direct MP4 720p + HLS M3U8.", params: [p("id","ID Episode","...",true)] },
  { id: "db-search", name: "DramaBox Search", category: "DramaBox", method: "GET", path: "/api/v1/dramabox/search", description: "Cari drama pendek multi-bahasa.", params: [p("q","Kata Kunci","CEO",true), pn("page","Page","1")] },
  { id: "db-stream", name: "DramaBox Stream", category: "DramaBox", method: "GET", path: "/api/v1/dramabox/stream", description: "Direct stream 1080p/720p/540p.", params: [p("id","ID Episode","...",true)] },
  { id: "db-trending", name: "DramaBox Trending", category: "DramaBox", method: "GET", path: "/api/v1/dramabox/trending", description: "Tayangan terpopuler DramaBox.", params: [] },
  { id: "db-keywords", name: "DramaBox Keywords", category: "DramaBox", method: "GET", path: "/api/v1/dramabox/keywords", description: "Kata kunci trending DramaBox.", params: [] },

  /* ============== FINANCE ============== */
  { id: "currency", name: "Currency Convert", category: "Finance", method: "GET", path: "/api/v1/finance/currency", description: "Konversi mata uang real-time 160+ dunia.", params: [p("from","Dari","USD",true), p("to","Ke","IDR",true), pn("amount","Jumlah","1")] },

  /* ============== GAMES ============== */
  { id: "kuis-indo", name: "Kuis B. Indonesia", category: "Games", method: "GET", path: "/api/v1/games/kuis-indo", description: "Kuis Bahasa Indonesia per jenjang.", params: [ps("level","Jenjang",[{label:"SD",value:"sd"},{label:"SMP",value:"smp"},{label:"SMA",value:"sma"},{label:"Kuliah",value:"kuliah"}])] },
  { id: "kuis-ipa", name: "Kuis IPA", category: "Games", method: "GET", path: "/api/v1/games/kuis-ipa", description: "Kuis IPA per jenjang.", params: [ps("level","Jenjang",[{label:"SD",value:"sd"},{label:"SMP",value:"smp"},{label:"SMA",value:"sma"},{label:"Kuliah",value:"kuliah"}])] },
  { id: "kuis-ips", name: "Kuis IPS", category: "Games", method: "GET", path: "/api/v1/games/kuis-ips", description: "Kuis IPS per jenjang.", params: [ps("level","Jenjang",[{label:"SD",value:"sd"},{label:"SMP",value:"smp"},{label:"SMA",value:"sma"},{label:"Kuliah",value:"kuliah"}])] },
  { id: "kuis-mtk", name: "Kuis Matematika", category: "Games", method: "GET", path: "/api/v1/games/kuis-mtk", description: "Kuis MTK berjenjang + pembahasan.", params: [ps("level","Jenjang",[{label:"SD",value:"sd"},{label:"SMP",value:"smp"},{label:"SMA",value:"sma"},{label:"Kuliah",value:"kuliah"}])] },
  { id: "kuis-pelajaran", name: "Kuis Pelajaran", category: "Games", method: "GET", path: "/api/v1/games/kuis-pelajaran", description: "Kuis lengkap MTK/IPA/IPS/B.Indo per jenjang.", params: [ps("mapel","Mapel",[{label:"MTK",value:"mtk"},{label:"IPA",value:"ipa"},{label:"IPS",value:"ips"},{label:"B.Indo",value:"bindo"}]), ps("level","Jenjang",[{label:"SD",value:"sd"},{label:"SMP",value:"smp"},{label:"SMA",value:"sma"},{label:"Kuliah",value:"kuliah"}])] },
  { id: "ff-karakter-search", name: "FF Karakter Search", category: "Games", method: "GET", path: "/api/v1/games/search-karakter-freefire", description: "Cari karakter Free Fire (58 karakter).", params: [p("q","Nama Karakter","alok")] },
  { id: "susunkata", name: "Susun Kata", category: "Games", method: "GET", path: "/api/v1/games/susunkata", description: "Game anagram KBBI 600+ kata.", params: [] },
  { id: "tebakbendera", name: "Tebak Bendera", category: "Games", method: "GET", path: "/api/v1/games/tebakbendera", description: "Kuis tebak bendera dunia (254 negara).", params: [] },
  { id: "ff-karakter-tebak", name: "Tebak FF Karakter", category: "Games", method: "GET", path: "/api/v1/games/tebak-karakter-freefire", description: "Kuis tebak karakter Free Fire.", params: [] },
  { id: "tebakprovinsi", name: "Tebak Provinsi", category: "Games", method: "GET", path: "/api/v1/games/tebakprovinsi", description: "Kuis tebak provinsi Indonesia (38).", params: [] },

  /* ============== KOMIK ============== */
  { id: "komik-chapter", name: "Komik Chapter", category: "Komik", method: "GET", path: "/api/v1/komik/chapter", description: "Daftar gambar halaman chapter komik.", params: [p("url","URL Chapter","https://...",true)] },
  { id: "komik-search", name: "Komik Search", category: "Komik", method: "GET", path: "/api/v1/komik/search", description: "Cari manga/manhwa/manhua.", params: [p("q","Judul","solo leveling",true)] },
  { id: "komik-detail", name: "Komik Detail", category: "Komik", method: "GET", path: "/api/v1/komik/detail", description: "Detail komik + daftar chapter.", params: [p("url","URL Komik","https://...",true)] },
  { id: "komik-latest", name: "Komik Latest", category: "Komik", method: "GET", path: "/api/v1/komik/latest", description: "Update chapter terbaru hari ini.", params: [] },
  { id: "komik-popular", name: "Komik Popular", category: "Komik", method: "GET", path: "/api/v1/komik/popular", description: "Komik terpopuler Komiku.", params: [] },

  /* ============== MOVIE ============== */
  { id: "movie-discover", name: "Movie Discover", category: "Movie & Series", method: "GET", path: "/api/v1/movie/discover", description: "Eksplorasi film/TV berdasarkan genre & tahun.", params: [pn("genre","Genre ID","28"), pn("year","Tahun","2024"), p("sort","Sort","popularity.desc")] },
  { id: "movie-detail", name: "Movie Detail", category: "Movie & Series", method: "GET", path: "/api/v1/movie/detail", description: "Detail film/TV + cast + 21 server player.", params: [pn("id","TMDB ID","550",true), ps("type","Tipe",[{label:"Movie",value:"movie"},{label:"TV",value:"tv"}])] },
  { id: "movie-stream", name: "Movie Stream", category: "Movie & Series", method: "GET", path: "/api/v1/movie/stream", description: "21 server player streaming embed HD.", params: [pn("id","TMDB ID","550",true), ps("type","Tipe",[{label:"Movie",value:"movie"},{label:"TV",value:"tv"}])] },
  { id: "movie-search", name: "Movie Search", category: "Movie & Series", method: "GET", path: "/api/v1/movie/search", description: "Cari film/serial/anime.", params: [p("q","Judul","avengers",true)] },
  { id: "movie-trending", name: "Movie Trending", category: "Movie & Series", method: "GET", path: "/api/v1/movie/trending", description: "Film trending global minggu ini.", params: [ps("window","Window",[{label:"Hari Ini",value:"day"},{label:"Minggu Ini",value:"week"}])] },
  { id: "movie-season", name: "Movie Season", category: "Movie & Series", method: "GET", path: "/api/v1/movie/season", description: "Daftar episode per season TV series.", params: [pn("id","TV ID","1399",true), pn("season","Season","1",true)] },

  /* ============== RANDOM ============== */
  { id: "rand-quote", name: "Random Quote", category: "Random", method: "GET", path: "/api/v1/random/quote", description: "Quote inspiratif tech & software engineering.", params: [] },
  { id: "rand-user", name: "Random User", category: "Random", method: "GET", path: "/api/v1/random/user", description: "Identitas dummy (nama, email, avatar, dll).", params: [p("nat","Nationality","id")] },
  { id: "rand-uuid", name: "Random UUID", category: "Random", method: "GET", path: "/api/v1/random/uuid", description: "Generate UUID v4 kriptografis.", params: [pn("count","Jumlah","1")] },

  /* ============== SEARCH ============== */
  { id: "bmkg", name: "BMKG Cuaca & Gempa", category: "Search", method: "GET", path: "/api/v1/search/bmkg", description: "Data cuaca & gempa terkini BMKG.", params: [p("q","Wilayah","jakarta")] },
  { id: "grupwa", name: "Grup WA Search", category: "Search", method: "GET", path: "/api/v1/search/grupwa", description: "Cari link grup WhatsApp publik.", params: [p("q","Topik","mabar",true)] },
  { id: "dafont", name: "Dafont", category: "Search", method: "GET", path: "/api/v1/search/dafont", description: "Cari font Dafont + download ZIP.", params: [p("q","Nama Font","handwritten",true)] },
  { id: "sekolah", name: "Lokasi Sekolah", category: "Search", method: "GET", path: "/api/v1/search/lokasi-sekolah", description: "Data sekolah dari Kemendikbud.", params: [p("q","Nama Sekolah",""), p("wilayah","Wilayah","")] },
  { id: "stickerly", name: "Stickerly", category: "Search", method: "GET", path: "/api/v1/search/stickerly", description: "Cari paket stiker WhatsApp Sticker.ly.", params: [p("q","Kata Kunci","kucing",true)] },
  { id: "groupwa", name: "Group WA Search", category: "Search", method: "GET", path: "/api/v1/search/group-wa", description: "Cari link grup WhatsApp publik by topik.", params: [p("q","Topik","anime",true)] },

  /* ============== SEARCH APIS ============== */
  { id: "amfinder", name: "AM Finder (Alight Preset)", category: "Search APIs", method: "GET", path: "/api/v1/search/amfinder", description: "Cari link preset Alight Motion di semua sosmed.", params: [p("url","URL Postingan","https://...",true)] },
  { id: "cuaca", name: "Cuaca BMKG", category: "Search APIs", method: "GET", path: "/api/v1/search/cuaca", description: "Prakiraan cuaca resmi BMKG seluruh Indonesia.", params: [p("q","Wilayah","jakarta",true)] },
  { id: "google", name: "Google Search", category: "Search APIs", method: "GET", path: "/api/v1/search/google", description: "Google Web & Image search tanpa limit.", params: [p("q","Query","berita hari ini",true), ps("type","Tipe",[{label:"Web",value:"web"},{label:"Image",value:"image"}])] },
  { id: "web-search", name: "Web Search", category: "Search APIs", method: "GET", path: "/api/v1/search/web", description: "Web search article snippets + citations.", params: [p("q","Query","latest AI news",true)] },
  { id: "kbbi", name: "KBBI Online", category: "Search APIs", method: "GET", path: "/api/v1/search/kbbi", description: "Cari arti kata KBBI resmi.", params: [p("q","Kata","rumah",true)] },
  { id: "pinterest", name: "Pinterest", category: "Search APIs", method: "GET", path: "/api/v1/search/pinterest", description: "Cari foto/video Pinterest HD (1-50).", params: [p("q","Kata Kunci","wallpaper aesthetic",true), pn("count","Jumlah","10")] },
  { id: "search-anime", name: "Anime Search", category: "Search APIs", method: "GET", path: "/api/v1/search/anime", description: "Cari anime + episode, rating, genre, poster.", params: [p("q","Judul","naruto",true)] },
  { id: "wallpaper", name: "Wallpaper", category: "Search APIs", method: "GET", path: "/api/v1/search/wallpaper", description: "Cari wallpaper HD by keyword.", params: [p("q","Kata Kunci","cyberpunk",true)] },
  { id: "spotify-search", name: "Spotify Search", category: "Search APIs", method: "GET", path: "/api/v1/search/spotify", description: "Cari katalog lagu Spotify.", params: [p("q","Lagu","shape of you",true)] },
  { id: "tiktok-search", name: "TikTok Search", category: "Search APIs", method: "GET", path: "/api/v1/search/tiktok", description: "Pencarian TikTok multi-card tab.", params: [p("q","Kata Kunci","dance",true)] },
  { id: "youtube-search", name: "YouTube Search", category: "Search APIs", method: "GET", path: "/api/v1/search/youtube", description: "Cari video/channel/playlist YouTube.", params: [p("q","Query","coding tutorial",true), ps("type","Tipe",[{label:"Video",value:"video"},{label:"Channel",value:"channel"},{label:"Playlist",value:"playlist"}]), pn("limit","Limit","10")] },

  /* ============== SPORTS ============== */
  { id: "sports-detail", name: "Sports Detail", category: "Sports", method: "GET", path: "/api/v1/sports/detail", description: "Detail pertandingan Goal.com (formasi, XI, dll).", params: [p("id","Match ID","...",true)] },
  { id: "sports-results", name: "Sports Results", category: "Sports", method: "GET", path: "/api/v1/sports/results", description: "Hasil akhir pertandingan sepak bola.", params: [p("date","Tanggal","YYYY-MM-DD"), p("league","Liga","")] },
  { id: "sports-fixtures", name: "Sports Fixtures", category: "Sports", method: "GET", path: "/api/v1/sports/fixtures", description: "Jadwal pertandingan mendatang.", params: [p("date","Tanggal","YYYY-MM-DD"), p("league","Liga","")] },
  { id: "sports-live", name: "Sports Live", category: "Sports", method: "GET", path: "/api/v1/sports/live", description: "Skor live pertandingan sepak bola.", params: [p("league","Liga","")] },

  /* ============== STALK ============== */
  { id: "stalk-fb", name: "Stalk Facebook", category: "Stalk", method: "GET", path: "/api/v1/stalkfb", description: "Profil publik Facebook.", params: [p("username","Username","zuck",true)] },
  { id: "stalk-ff", name: "Stalk Free Fire", category: "Stalk", method: "GET", path: "/api/v1/stalk/ff", description: "Cek profil Free Fire by UID.", params: [p("uid","UID","123456789",true)] },
  { id: "stalk-ig", name: "Stalk Instagram", category: "Stalk", method: "GET", path: "/api/v1/stalkig", description: "Profil IG publik (nama, followers, bio).", params: [p("username","Username","instagram",true)] },
  { id: "stalk-ml", name: "Stalk Mobile Legends", category: "Stalk", method: "GET", path: "/api/v1/stalkml", description: "Cek nickname Mobile Legends by UID+Zone.", params: [p("uid","User ID","12345",true), p("zone","Zone ID","2000",true)] },
  { id: "stalk-tt", name: "Stalk TikTok", category: "Stalk", method: "GET", path: "/api/v1/stalktt", description: "Profil TikTok all-in-one.", params: [p("username","Username","tiktok",true)] },
  { id: "stalk-x", name: "Stalk X/Twitter", category: "Stalk", method: "GET", path: "/api/v1/stalkx", description: "Profil X publik.", params: [p("username","Username","elonmusk",true)] },

  /* ============== SYSTEM ============== */
  { id: "sys-ip", name: "My IP", category: "System", method: "GET", path: "/api/v1/system/ip", description: "Deteksi IP publik, ISP, dan negara.", params: [] },
  { id: "sys-stats", name: "Server Stats", category: "System", method: "GET", path: "/api/v1/system/stats", description: "Load average, RAM, total volume API.", params: [] },
  { id: "sys-ping", name: "Ping API", category: "System", method: "GET", path: "/api/v1/system/ping", description: "Cek availability + response time.", params: [] },

  /* ============== TEMP MAIL ============== */
  { id: "tm-message", name: "Temp Mail Message", category: "Temp Mail", method: "GET", path: "/api/v1/tempmail/message", description: "Baca isi lengkap email tertentu.", params: [p("token","Token","...",true), p("id","Message ID","...",true)] },
  { id: "tm-create", name: "Temp Mail Create", category: "Temp Mail", method: "GET", path: "/api/v1/tempmail/create", description: "Buat email sementara instan.", params: [p("domain","Domain","")] },
  { id: "tm-inbox", name: "Temp Mail Inbox", category: "Temp Mail", method: "GET", path: "/api/v1/tempmail/inbox", description: "List inbox email sementara.", params: [p("token","Token","...",true)] },
  { id: "tm-domains", name: "Temp Mail Domains", category: "Temp Mail", method: "GET", path: "/api/v1/tempmail/domains", description: "List domain email sementara aktif.", params: [] },
  { id: "tm-aio", name: "Temp Mail AIO", category: "Temp Mail", method: "GET", path: "/api/v1/tempmail", description: "All-in-one temp mail (create/inbox/message/domains).", params: [ps("action","Action",[{label:"Create",value:"create"},{label:"Inbox",value:"inbox"},{label:"Message",value:"message"},{label:"Domains",value:"domains"}],true), p("token","Token","...")] },

  /* ============== TOOLS (NON-VIP) ============== */
  { id: "js-deobfuscator", name: "JS Deobfuscator", category: "Tools", method: "POST", path: "/api/v1/tools/js-deobfuscator", description: "Parser AST rekonstruksi JS terenkripsi.", params: [pt("code","Kode JS","...",true)] },
  { id: "base64", name: "Base64 Encode/Decode", category: "Tools", method: "GET", path: "/api/v1/text/base64", description: "Encode/decode Base64 UTF-8.", params: [p("text","Teks","halo",true), ps("mode","Mode",[{label:"Encode",value:"encode"},{label:"Decode",value:"decode"}],true)] },
  { id: "check-phone", name: "Check Phone", category: "Tools", method: "GET", path: "/api/v1/tools/check-phone", description: "Cek provider, paket, masa aktif nomor HP.", params: [p("phone","Nomor HP","08123456789",true)] },
  { id: "cek-operator", name: "Cek Operator", category: "Tools", method: "GET", path: "/api/v1/tools/cek-operator", description: "Deteksi operator seluler Indonesia.", params: [p("phone","Nomor HP","08123456789",true)] },
  { id: "hash", name: "Text Hash", category: "Tools", method: "GET", path: "/api/v1/text/hash", description: "Hitung hash MD5/SHA-1/SHA-256/SHA-512.", params: [p("text","Teks","halo",true), ps("algo","Algoritma",[{label:"MD5",value:"md5"},{label:"SHA-1",value:"sha1"},{label:"SHA-256",value:"sha256"},{label:"SHA-512",value:"sha512"}],true)] },
  { id: "file-checksum", name: "File Checksum", category: "Tools", method: "POST", path: "/api/v1/file/checksum", description: "Checksum SHA-256 & CRC32 file.", params: [pf("file","File",true)] },
  { id: "decode-js", name: "Decode JS", category: "Tools", method: "POST", path: "/api/v1/tools/decode-js", description: "Decode JS terenkripsi jadi bersih.", params: [pt("code","Kode JS","...",true)] },
  { id: "kahoot", name: "Kahoot Extractor", category: "Tools", method: "GET", path: "/api/v1/tools/kahoot", description: "Ekstrak pertanyaan + kunci jawaban Kahoot.", params: [p("url","URL/UUID Kahoot","...",true)] },
  { id: "netflix-token", name: "Netflix Token", category: "Tools", method: "POST", path: "/api/v1/tools/netflix-token", description: "Generate sign-in token (nftoken) Netflix.", params: [p("cookie","Cookie Netflix","")] },
  { id: "ngl", name: "NGL Send", category: "Tools", method: "POST", path: "/api/v1/tools/ngl", description: "Kirim pesan anonim ke NGL.link.", params: [p("username","Username","...",true), p("message","Pesan","halo",true)] },
  { id: "quizizz", name: "Quizizz Extractor", category: "Tools", method: "GET", path: "/api/v1/tools/quizizz", description: "Ekstrak pertanyaan + jawaban Quizizz.", params: [p("code","Game Code / URL","...",true)] },
  { id: "subdomain-finder", name: "Subdomain Finder", category: "Tools", method: "GET", path: "/api/v1/tools/subdomain-finder", description: "Petakan subdomain aktif dari domain.", params: [p("domain","Domain","example.com",true)] },
  { id: "slug", name: "Text → Slug", category: "Tools", method: "GET", path: "/api/v1/text/slug", description: "Ubah teks jadi slug URL SEO-friendly.", params: [p("text","Teks","Judul Artikel Baru",true)] },
  { id: "design-extractor", name: "Design Extractor", category: "Tools", method: "GET", path: "/api/v1/tools/design-extractor", description: "Ekstrak design system dari URL website.", params: [p("url","URL Website","https://example.com",true)] }
];

export const CATEGORIES = Array.from(
  new Set(TOOLS.map((t) => t.category))
);