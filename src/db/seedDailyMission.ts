import db from '../config/db';
import { missionTasks, roadmapLevels, roles } from './schema';
import { eq, and } from 'drizzle-orm';

// ─── Tipe Data ─────────────────────────────────────────────────────────────────

type TaskSeed = {
  order: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  durationMinutes: number;
  description: string;
  learningGoal: string;
  instructions: string[];
  requirements: string[];
  hint: string;
  acceptsFigmaLink: boolean;
  acceptsFileUpload: boolean;
  question1: string;
  question2: string;
  question3: string;
};

type LevelSeed = {
  level: 'beginner' | 'intermediate' | 'advanced';
  tasks: TaskSeed[];
};

// ─── Data Seed per Role ────────────────────────────────────────────────────────

const seedData: Record<string, LevelSeed[]> = {
  'UI/UX Designer': [
    {
      level: 'beginner',
      tasks: [
        {
          order: 1,
          title: 'Riset Pengguna: Lakukan 3 Wawancara Pengguna',
          category: 'UX Research',
          difficulty: 'Easy',
          durationMinutes: 60,
          description:
            'Lakukan 3 wawancara singkat dengan pengguna (masing-masing 10–15 menit) untuk memahami pain point pengguna aplikasi mobile banking.',
          learningGoal:
            'Setelah menyelesaikan tugas ini, kamu akan mampu melakukan wawancara pengguna secara terstruktur dan mengekstrak insight yang bermakna.',
          instructions: [
            'Siapkan daftar 5–7 pertanyaan wawancara bersifat terbuka (open-ended)',
            'Rekrut 3 partisipan (teman, keluarga, atau teman sekelas)',
            'Lakukan setiap wawancara dan catat hasilnya',
            'Ringkas temuan dalam dokumen (pain point utama, kebutuhan, kutipan)',
            'Buat affinity diagram sederhana yang mengelompokkan temuan',
          ],
          requirements: [
            'Dokumen panduan wawancara (5–7 pertanyaan)',
            'Catatan dari 3 wawancara',
            'Affinity diagram atau ringkasan insight utama',
          ],
          hint: 'Fokus pada pertanyaan terbuka seperti "Ceritakan pengalamanmu ketika..." daripada pertanyaan ya/tidak.',
          acceptsFigmaLink: false,
          acceptsFileUpload: true,
          question1:
            'Apa 3 insight paling mengejutkan yang kamu temukan dari wawancara?',
          question2:
            'Bagaimana respons pengguna berbeda dari apa yang kamu perkirakan sebelumnya?',
          question3:
            'Bagaimana kamu akan menggunakan insight ini untuk meningkatkan aplikasi mobile banking?',
        },
        {
          order: 2,
          title: 'Buat Wireframe Low-Fidelity',
          category: 'UI Design',
          difficulty: 'Easy',
          durationMinutes: 45,
          description:
            'Desain wireframe low-fidelity untuk layar utama aplikasi mobile manajemen tugas menggunakan Figma.',
          learningGoal:
            'Kamu akan mampu mengubah ide menjadi wireframe terstruktur yang mengomunikasikan tata letak dan alur pengguna.',
          instructions: [
            'Buka Figma dan buat proyek baru',
            'Sketsa layar Home, layar Daftar Tugas, dan layar Tambah Tugas',
            'Gunakan hanya bentuk dasar (persegi panjang, garis, placeholder teks)',
            'Tambahkan anotasi untuk menjelaskan setiap elemen UI',
            'Bagikan file Figma dengan akses view',
          ],
          requirements: [
            'Wireframe layar Home',
            'Wireframe layar Daftar Tugas',
            'Wireframe layar Tambah Tugas',
            'Anotasi pada semua elemen utama',
          ],
          hint: 'Buat dalam skala abu-abu dan gunakan teks placeholder. Fokus pada tata letak, bukan estetika.',
          acceptsFigmaLink: true,
          acceptsFileUpload: false,
          question1: 'Keputusan tata letak apa yang kamu buat dan mengapa?',
          question2:
            'Bagaimana kamu menentukan hierarki informasi untuk setiap layar?',
          question3:
            'Apa yang akan kamu ubah jika kamu mendapat feedback pengguna pada wireframe ini?',
        },
        {
          order: 3,
          title: 'Analisis Kompetitor: 3 Aplikasi Pesaing',
          category: 'UX Research',
          difficulty: 'Easy',
          durationMinutes: 50,
          description:
            'Analisis 3 aplikasi manajemen tugas kompetitor (misalnya Todoist, Notion, TickTick) dan identifikasi kekuatan serta kelemahan UX mereka.',
          learningGoal:
            'Kamu akan mampu mengevaluasi produk kompetitor secara sistematis dan mengidentifikasi peluang desain.',
          instructions: [
            'Pilih 3 aplikasi manajemen tugas untuk dianalisis',
            'Evaluasi setiap aplikasi dalam 5 dimensi: Onboarding, Navigasi, Visual Design, Fitur Utama, Penanganan Error',
            'Buat tabel perbandingan',
            'Identifikasi 3 pola desain yang layak diadopsi',
            'Identifikasi 3 celah atau peluang',
          ],
          requirements: [
            'Tabel perbandingan (3 aplikasi × 5 dimensi)',
            'Screenshot dengan anotasi',
            'Ringkasan peluang',
          ],
          hint: 'Gunakan sistem penilaian (1–5) agar perbandingan lebih objektif.',
          acceptsFigmaLink: false,
          acceptsFileUpload: true,
          question1:
            'Kompetitor mana yang memiliki UX terbaik secara keseluruhan, dan apa yang membuatnya unggul?',
          question2:
            'Pola desain apa yang dimiliki ketiga aplikasi, dan mengapa menurut kamu hal itu terjadi?',
          question3:
            'Peluang unik apa yang kamu temukan yang belum ditangani oleh satu pun kompetitor?',
        },
        {
          order: 4,
          title: 'Buat User Persona',
          category: 'UX Research',
          difficulty: 'Easy',
          durationMinutes: 40,
          description:
            'Buat 2 user persona untuk aplikasi pelacak kebugaran berdasarkan data riset (atau asumsi jika tidak ada data).',
          learningGoal:
            'Kamu akan mampu mensintesis data riset menjadi user persona yang actionable untuk mengarahkan keputusan desain.',
          instructions: [
            'Definisikan 2 tipe pengguna berbeda untuk aplikasi pelacak kebugaran',
            'Untuk setiap persona: nama, usia, pekerjaan, tujuan, frustrasi, tingkat kenyamanan teknologi',
            'Tambahkan kutipan yang menggambarkan pola pikir mereka',
            'Deskripsikan hari tipikal dalam kehidupan mereka',
            'Desain kartu persona di Figma atau unggah sebagai dokumen',
          ],
          requirements: [
            '2 kartu persona yang lengkap',
            'Tujuan dan frustrasi untuk setiap persona',
            'Skenario yang mendeskripsikan bagaimana mereka akan menggunakan aplikasi',
          ],
          hint: 'Dasarkan persona pada pola dari riset, bukan stereotip. Setiap persona harus terasa seperti orang nyata.',
          acceptsFigmaLink: true,
          acceptsFileUpload: true,
          question1:
            'Apa perbedaan kedua persona dalam hal tujuan dan frustrasi mereka?',
          question2:
            'Bagaimana setiap persona akan menggunakan aplikasi kebugaran secara berbeda?',
          question3:
            'Jika kamu hanya bisa mendesain untuk satu persona, mana yang kamu pilih dan mengapa?',
        },
        {
          order: 5,
          title: 'User Journey Map',
          category: 'UX Strategy',
          difficulty: 'Medium',
          durationMinutes: 60,
          description:
            'Buat user journey map untuk salah satu persona kamu yang melewati alur onboarding lengkap dari aplikasi kebugaran.',
          learningGoal:
            'Kamu akan mampu memetakan pengalaman pengguna dari awal hingga akhir dan mengidentifikasi momen emosional tinggi dan rendah.',
          instructions: [
            'Pilih salah satu persona dari tugas sebelumnya',
            'Definisikan tahapan perjalanan onboarding (Awareness → Sign Up → Penggunaan Pertama → Penggunaan Rutin)',
            'Untuk setiap tahap: aksi, pikiran, emosi, pain point, peluang',
            'Tambahkan kurva emosi yang menunjukkan momen tinggi dan rendah',
            'Identifikasi 3 momen paling kritis yang perlu ditingkatkan',
          ],
          requirements: [
            'Journey map dengan 4+ tahap',
            'Kurva emosi',
            'Pain point dan peluang untuk setiap tahap',
            'Top 3 peluang peningkatan yang disorot',
          ],
          hint: 'Pikirkan perjalanan emosional, bukan hanya langkah fungsional. Apa yang dirasakan pengguna di setiap momen?',
          acceptsFigmaLink: true,
          acceptsFileUpload: true,
          question1:
            'Di tahap mana pengguna paling mungkin berhenti, dan apa yang akan kamu lakukan untuk mencegahnya?',
          question2:
            'Apa titik emosional terendah yang paling mengejutkan yang kamu identifikasi?',
          question3:
            'Bagaimana journey map ini mengubah prioritas yang akan kamu utamakan dalam desain?',
        },
      ],
    },
    {
      level: 'intermediate',
      tasks: [
        {
          order: 1,
          title: 'Desain Component Library di Figma',
          category: 'Design Systems',
          difficulty: 'Medium',
          durationMinutes: 90,
          description:
            'Bangun component library dasar di Figma untuk produk SaaS dashboard, mencakup tombol, input form, card, dan navigasi.',
          learningGoal:
            'Kamu akan memahami cara membuat komponen UI yang dapat digunakan ulang dan skalabel dengan variants dan auto layout.',
          instructions: [
            'Buat halaman Figma baru bernama "Component Library"',
            'Desain komponen Button dengan 3 variant: Primary, Secondary, Danger (dan state: Default, Hover, Disabled)',
            'Desain Input Field dengan state: Default, Focused, Error, Disabled',
            'Desain komponen Card dengan slot Header, Body, Footer',
            'Desain Sidebar Navigation dengan state aktif/tidak aktif',
            'Gunakan Figma Variables untuk warna dan tipografi',
          ],
          requirements: [
            'Komponen Button dengan 3 variant × 3 state',
            'Input field dengan 4 state',
            'Komponen Card dengan slot',
            'Komponen Sidebar navigation',
            'Color dan typography variables sudah didefinisikan',
          ],
          hint: 'Gunakan Auto Layout untuk semua komponen agar ukurannya dapat menyesuaikan dengan benar. Beri nama layer dengan jelas.',
          acceptsFigmaLink: true,
          acceptsFileUpload: false,
          question1:
            'Bagaimana kamu menentukan konvensi penamaan untuk komponen dan variant-mu?',
          question2:
            'Tantangan apa yang kamu hadapi dengan Auto Layout, dan bagaimana kamu mengatasinya?',
          question3:
            'Bagaimana component library ini perlu berkembang jika produk diperluas ke 5 fitur tambahan?',
        },
        {
          order: 2,
          title: 'Buat Prototipe Alur Onboarding',
          category: 'Prototyping',
          difficulty: 'Medium',
          durationMinutes: 75,
          description:
            'Buat prototipe interaktif high-fidelity untuk alur onboarding 5 langkah menggunakan component library-mu.',
          learningGoal:
            'Kamu akan mampu membuat prototipe interaktif yang realistis dan mensimulasikan pengalaman produk yang sesungguhnya.',
          instructions: [
            'Desain 5 layar onboarding menggunakan component library-mu',
            'Tambahkan transisi halus antar layar (Smart Animate)',
            'Sertakan progress indicator yang menampilkan penyelesaian langkah',
            'Tambahkan tombol back dengan navigasi yang berfungsi',
            'Tes prototipe sendiri sebelum mengumpulkan',
          ],
          requirements: [
            '5 layar onboarding yang terhubung',
            'Animasi transisi pada setiap pergantian layar',
            'Navigasi maju dan mundur yang berfungsi',
            'Komponen progress indicator',
            'Link prototipe diatur ke "siapa saja dengan link dapat melihat"',
          ],
          hint: 'Gunakan Smart Animate untuk transisi yang lebih halus. Pastikan prototipe mencerminkan apa yang sesungguhnya akan dibangun engineer.',
          acceptsFigmaLink: true,
          acceptsFileUpload: false,
          question1:
            'Pola interaksi apa yang kamu pilih untuk langkah-langkah onboarding, dan mengapa?',
          question2:
            'Bagaimana kamu memastikan onboarding terasa ramah tanpa terkesan berlebihan?',
          question3:
            'Jika kamu menjalankan usability test pada prototipe ini, apa yang menurutmu akan menyulitkan pengguna?',
        },
        {
          order: 3,
          title: 'Lakukan Usability Test',
          category: 'UX Research',
          difficulty: 'Medium',
          durationMinutes: 80,
          description:
            'Jalankan usability test termoderasi dengan 3 partisipan menggunakan prototipe onboarding-mu, lalu analisis dan laporkan temuan.',
          learningGoal:
            'Kamu akan mampu merencanakan, melaksanakan, dan mensintesis insight dari usability test termoderasi.',
          instructions: [
            'Tulis skrip usability test dengan 3 tugas untuk diselesaikan partisipan',
            'Rekrut 3 partisipan dan jalankan sesi 20 menit untuk masing-masing',
            'Rekam sesi (layar + audio dengan izin)',
            'Dokumentasikan observasi: apa yang pengguna lakukan, katakan, dan rasakan',
            'Buat laporan temuan dengan rating keparahan untuk setiap masalah',
          ],
          requirements: [
            'Dokumen skrip test',
            'Catatan dari 3 sesi',
            'Laporan temuan dengan rating keparahan (Kritis / Mayor / Minor)',
            'Top 5 rekomendasi perubahan desain',
          ],
          hint: 'Ingat: kamu menguji desain, bukan pengguna. Jangan pernah mengarahkan mereka—biarkan mereka kesulitan agar kamu bisa belajar.',
          acceptsFigmaLink: false,
          acceptsFileUpload: true,
          question1: 'Apa masalah usability paling kritis yang kamu temukan?',
          question2:
            'Bagaimana perilaku aktual pengguna berbeda dari apa yang kamu desain?',
          question3:
            'Temuan mana yang paling mengejutkanmu, dan bagaimana hal itu mengubah arah desainmu?',
        },
        {
          order: 4,
          title: 'Redesain Berdasarkan Temuan Usability',
          category: 'UI Design',
          difficulty: 'Hard',
          durationMinutes: 90,
          description:
            'Terapkan temuan usability-mu untuk mendesain ulang minimal 3 layar, dan dokumentasikan perbandingan sebelum/sesudah beserta alasan desain.',
          learningGoal:
            'Kamu akan berlatih melakukan iterasi desain berdasarkan bukti, sebuah keterampilan kritis bagi setiap desainer UX.',
          instructions: [
            'Prioritaskan 3 masalah utama dari usability test-mu',
            'Redesain layar yang terdampak di Figma',
            'Buat slide perbandingan sebelum/sesudah untuk setiap perubahan',
            'Tulis alasan desain (2–3 kalimat per perubahan)',
            'Perbarui prototipe dengan desain baru',
          ],
          requirements: [
            'Perbandingan sebelum/sesudah untuk 3+ layar',
            'Alasan desain terdokumentasi',
            'Link prototipe yang sudah diperbarui',
          ],
          hint: 'Fokus pada penyelesaian masalah dengan keparahan tertinggi terlebih dahulu. Perubahan kecil yang terfokus sering kali lebih efektif daripada desain ulang secara menyeluruh.',
          acceptsFigmaLink: true,
          acceptsFileUpload: true,
          question1:
            'Untuk perubahan redesain terbesarmu, alternatif apa yang kamu pertimbangkan sebelum memutuskan?',
          question2:
            'Bagaimana kamu menyeimbangkan perbaikan masalah usability sambil menjaga konsistensi visual?',
          question3:
            'Bagaimana kamu akan mengukur apakah redesain-mu benar-benar meningkatkan pengalaman?',
        },
        {
          order: 5,
          title: 'Buat Dokumen Design Handoff',
          category: 'Design Systems',
          difficulty: 'Medium',
          durationMinutes: 60,
          description:
            'Siapkan dokumen design handoff yang lengkap untuk tim engineer, mencakup spesifikasi, catatan interaksi, dan ekspor aset.',
          learningGoal:
            'Kamu akan memahami cara mengomunikasikan keputusan desain dengan jelas kepada tim engineering.',
          instructions: [
            'Gunakan Dev Mode Figma atau anotasi untuk menambahkan spesifikasi',
            'Dokumentasikan semua nilai spacing, tipografi, dan warna',
            'Tambahkan catatan interaksi untuk setiap animasi dan perubahan state',
            'Ekspor semua ikon dan ilustrasi sebagai SVG',
            'Tulis bagian "Catatan Desain" yang mencakup edge case dan error state',
          ],
          requirements: [
            'Semua spacing dan tipografi sudah dianotasi',
            'Catatan interaksi untuk setiap elemen animasi',
            'Aset yang diekspor diorganisir dalam folder',
            'Edge case dan error state terdokumentasi',
          ],
          hint: 'Berpikirlah seperti engineer: informasi apa yang kamu butuhkan untuk membangun ini persis seperti yang didesain?',
          acceptsFigmaLink: true,
          acceptsFileUpload: true,
          question1:
            'Interaksi mana yang paling kompleks untuk didokumentasikan, dan bagaimana kamu menjelaskannya?',
          question2:
            'Edge case apa yang kamu temukan yang tidak ada dalam desain awal?',
          question3:
            'Bagaimana proses handoff-mu akan berubah jika kamu bekerja dalam tim yang lebih besar?',
        },
      ],
    },
    {
      level: 'advanced',
      tasks: [
        {
          order: 1,
          title: 'Pimpin Design Sprint',
          category: 'UX Strategy',
          difficulty: 'Hard',
          durationMinutes: 120,
          description:
            'Fasilitasi design sprint solo yang dipadatkan (Hari 1: Pahami + Sketsa, Hari 2: Prototipe) untuk memecahkan masalah bisnis nyata.',
          learningGoal:
            'Kamu akan mengalami metodologi design sprint secara penuh dan mampu memfasilitasinya bersama tim.',
          instructions: [
            'Definisikan tantangan produk nyata (misalnya konversi checkout yang rendah)',
            'Hari 1: Tulis pernyataan How Might We, sketsa 5 konsep solusi',
            'Hari 1: Pilih konsep terkuat menggunakan dot voting (sendiri)',
            'Hari 2: Bangun prototipe 5 layar di Figma',
            'Dokumentasikan setiap fase dengan foto/screenshot',
          ],
          requirements: [
            'Dokumen pernyataan HMW',
            'Sketsa 5 konsep (foto diperbolehkan)',
            'Prototipe high-fidelity (link Figma)',
            'Catatan retrospektif sprint',
          ],
          hint: 'Design sprint tentang kecepatan dan pembelajaran, bukan kesempurnaan. Batasi waktu setiap fase dengan ketat.',
          acceptsFigmaLink: true,
          acceptsFileUpload: true,
          question1:
            'Bagaimana batasan waktu sprint mengubah cara kamu mengambil keputusan desain?',
          question2:
            'Fase sprint mana yang paling bernilai, dan mana yang terasa kurang berguna?',
          question3:
            'Apa yang akan kamu lakukan berbeda jika menjalankan sprint ini bersama tim lintas fungsi yang nyata?',
        },
        {
          order: 2,
          title: 'Bangun Design System End-to-End',
          category: 'Design Systems',
          difficulty: 'Hard',
          durationMinutes: 180,
          description:
            'Buat design system siap produksi untuk aplikasi fintech, mencakup token, komponen, pola, dan dokumentasi.',
          learningGoal:
            'Kamu akan mampu merancang design system yang skalabel untuk mendukung tim produk yang nyata.',
          instructions: [
            'Definisikan dan dokumentasikan semua design token (warna, spacing, tipografi, elevasi)',
            'Bangun 20+ komponen dengan semua variant dan state',
            'Buat 5 template halaman menggunakan komponen-mu',
            'Tulis panduan penggunaan untuk setiap komponen',
            'Organisir semuanya dengan penamaan dan struktur yang jelas',
          ],
          requirements: [
            'Token library (warna, spacing, skala tipografi)',
            '20+ komponen dengan variant',
            '5 template halaman',
            'Dokumentasi penggunaan untuk setiap komponen',
          ],
          hint: 'Pelajari Atlassian Design System atau Carbon Design System sebagai inspirasi kedalaman dokumentasi.',
          acceptsFigmaLink: true,
          acceptsFileUpload: true,
          question1:
            'Bagaimana kamu memutuskan komponen mana yang harus diprioritaskan untuk dibangun terlebih dahulu?',
          question2:
            'Keputusan tata kelola apa yang kamu buat (misalnya siapa yang bisa berkontribusi, bagaimana perubahan di-versioning)?',
          question3:
            'Bagaimana design system-mu memastikan kepatuhan aksesibilitas?',
        },
        {
          order: 3,
          title: 'Definisikan Metrik UX & Kerangka Pengukuran',
          category: 'UX Strategy',
          difficulty: 'Hard',
          durationMinutes: 90,
          description:
            'Definisikan kerangka pengukuran UX untuk sebuah produk, mencakup metrik keberhasilan, metode pengukuran, dan target baseline.',
          learningGoal:
            'Kamu akan mampu menghubungkan pekerjaan UX dengan hasil bisnis dan mendefinisikan praktik desain berbasis data.',
          instructions: [
            'Pilih produk untuk dianalisis (nyata atau hipotetis)',
            'Definisikan North Star metric UX',
            'Identifikasi 5 KPI UX menggunakan kerangka HEART',
            'Untuk setiap KPI: definisikan cara mengukurnya, target baseline, dan target peningkatan',
            'Tulis rencana 1 halaman tentang cara menginstrumentasi metrik-metrik ini',
          ],
          requirements: [
            'North Star metric didefinisikan beserta alasannya',
            'Kerangka HEART diisi (5 metrik)',
            'Rencana pengukuran untuk setiap metrik',
            'Nilai baseline dan target',
          ],
          hint: 'HEART = Happiness (Kesenangan), Engagement (Keterlibatan), Adoption (Adopsi), Retention (Retensi), Task Success (Keberhasilan Tugas). Tidak semua perlu diterapkan pada setiap produk.',
          acceptsFigmaLink: false,
          acceptsFileUpload: true,
          question1:
            'Mengapa kamu memilih North Star metric-mu dibandingkan kandidat lainnya?',
          question2:
            'Metrik mana yang paling sulit diukur dalam praktik, dan proxy apa yang akan kamu gunakan?',
          question3:
            'Bagaimana kamu mempresentasikan metrik-metrik ini kepada CEO yang skeptis terhadap dampak bisnis UX?',
        },
        {
          order: 4,
          title: 'Studi Kasus: Redesain Produk Secara Menyeluruh',
          category: 'UI Design',
          difficulty: 'Hard',
          durationMinutes: 240,
          description:
            'Pilih aplikasi nyata yang memiliki masalah UX, lakukan riset, redesain 5 layar kunci, dan presentasikan studi kasusmu.',
          learningGoal:
            'Kamu akan menghasilkan studi kasus berkualitas portofolio yang mendemonstrasikan proses UX dari awal hingga akhir.',
          instructions: [
            'Pilih aplikasi nyata dengan masalah UX yang jelas',
            'Lakukan evaluasi heuristik (dokumentasikan 10 pelanggaran)',
            'Definisikan pernyataan masalah dan kriteria keberhasilan',
            'Redesain 5 layar kunci dengan anotasi',
            'Presentasikan perbandingan sebelum/sesudah dengan data dan alasan',
          ],
          requirements: [
            'Laporan evaluasi heuristik',
            'Pernyataan masalah',
            '5 layar yang sudah didesain ulang beserta anotasi',
            'Perbandingan sebelum/sesudah',
            'Dokumen studi kasus atau presentasi Figma',
          ],
          hint: 'Perlakukan ini seperti karya portofolio nyata. Rekruter akan mencari definisi masalah yang jelas, prosesmu, dan keputusan berbasis bukti.',
          acceptsFigmaLink: true,
          acceptsFileUpload: true,
          question1:
            'Perubahan paling berdampak apa yang kamu buat, dan bukti apa yang mendukung keputusan tersebut?',
          question2:
            'Bagaimana kamu akan memvalidasi bahwa redesain-mu benar-benar meningkatkan pengalaman?',
          question3:
            'Jika kamu mempresentasikan studi kasus ini dalam wawancara kerja, apa yang paling kamu tekankan?',
        },
        {
          order: 5,
          title: 'Review Mentor: Beri Feedback pada Karya Pemula',
          category: 'UX Strategy',
          difficulty: 'Hard',
          durationMinutes: 60,
          description:
            'Tinjau dan berikan feedback terstruktur yang konstruktif pada wireframe atau prototipe level pemula (disediakan di bawah).',
          learningGoal:
            'Kamu akan berlatih mengartikulasikan feedback desain dengan jelas, keterampilan kritis untuk peran UX senior.',
          instructions: [
            'Tinjau wireframe pemula yang disediakan (link ada di deskripsi tugas)',
            'Identifikasi 5 masalah spesifik menggunakan kerangka evaluasi heuristik',
            'Untuk setiap masalah: deskripsikan problemnya, jelaskan mengapa itu penting, sarankan solusi',
            'Beri rating setiap masalah: Kritis / Mayor / Minor',
            'Tulis ringkasan keseluruhan 200 kata dengan semangat dan prioritas',
          ],
          requirements: [
            '5 masalah terdokumentasi dengan rating keparahan',
            'Solusi konstruktif untuk setiap masalah',
            'Ulasan ringkasan 200 kata',
          ],
          hint: 'Feedback yang baik bersifat spesifik, dapat ditindaklanjuti, dan menjelaskan "mengapa" di balik setiap saran. Hindari feedback yang samar seperti "buat lebih bersih."',
          acceptsFigmaLink: false,
          acceptsFileUpload: true,
          question1:
            'Prinsip UX paling mendasar apa yang dilanggar dalam karya yang kamu tinjau?',
          question2:
            'Bagaimana kamu menyeimbangkan kejujuran tentang masalah sambil tetap memberikan feedback yang mendorong semangat?',
          question3:
            'Bagaimana meninjau karya orang lain mengubah cara kamu memikirkan proses desainmu sendiri?',
        },
      ],
    },
  ],
};

// ─── Fungsi Seed ──────────────────────────────────────────────────────────────

const seedMissionTasks = async () => {
  console.log('Menyemai mission tasks...\n');

  for (const [roleName, levelSeeds] of Object.entries(seedData)) {
    const [role] = await db
      .select({ id: roles.id })
      .from(roles)
      .where(eq(roles.name, roleName));

    if (!role) {
      console.warn(`⚠️  Role "${roleName}" tidak ditemukan, dilewati.`);
      continue;
    }

    for (const levelSeed of levelSeeds) {
      const [roadmapLevel] = await db
        .select({ id: roadmapLevels.id, levelLabel: roadmapLevels.levelLabel })
        .from(roadmapLevels)
        .where(
          and(
            eq(roadmapLevels.roleId, role.id),
            eq(roadmapLevels.level, levelSeed.level),
          ),
        );

      if (!roadmapLevel) {
        console.warn(
          `⚠️  Level "${levelSeed.level}" untuk role "${roleName}" tidak ditemukan, dilewati.`,
        );
        continue;
      }

      for (const task of levelSeed.tasks) {
        await db
          .insert(missionTasks)
          .values({
            roadmapLevelId: roadmapLevel.id,
            ...task,
          })
          .onConflictDoNothing();
      }

      console.log(
        `✓ ${levelSeed.tasks.length} tasks disemai → ${roleName} / ${roadmapLevel.levelLabel}`,
      );
    }
  }

  console.log('\nSeed mission tasks selesai!');
  process.exit(0);
};

seedMissionTasks().catch((err) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
