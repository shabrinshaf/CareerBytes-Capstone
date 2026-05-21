import dotenv from 'dotenv';
import path from 'path';

// Menjamin environment termuat terlepas dari direktori eksekusi terminal.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { db } from '../config/db';
import { roles, quizQuestions } from './schema';

const rolesData = [
  { name: 'UI/UX Designer', description: 'Design intuitive and engaging digital experiences' },
  { name: 'Frontend Developer', description: 'Membangun user interface dan pengalaman pengguna' },
  { name: 'Backend Engineer', description: 'Membangun dan maintain server-side applications' },
  { name: 'Mobile Developer', description: 'Mengembangkan aplikasi mobile Android dan iOS' },
  { name: 'Data Analyst / Business Intelligence', description: 'Menganalisis data untuk menghasilkan insight bisnis dan inteligensia' },
  { name: 'DevOps Engineer', description: 'Mengelola infrastruktur, deployment, dan operasional sistem' },
  { name: 'Cybersecurity Specialist', description: 'Melindungi aset digital dari ancaman keamanan siber' },
  { name: 'IT Auditor & Governance Specialist', description: 'Mengaudit dan memastikan kepatuhan tata kelola TI' },
  { name: 'Cloud Engineer', description: 'Merancang dan mengelola infrastruktur komputasi cloud' },
  { name: 'AI / Machine Learning Engineer', description: 'Membangun dan men-deploy model machine learning' },
];

interface QuestionSeed {
  role: string;
  question: string;
  options: string[];
  correctAnswer: number;
  skillName: string;
  difficulty: string;
  explanation: string;
}

const questionsData: QuestionSeed[] = [
  // ===== UI/UX Designer =====
  // Visual Design (3 soal)
  {
    role: 'UI/UX Designer', skillName: 'Visual Design', difficulty: 'intermediate',
    question: 'Berdasarkan standar aksesibilitas WCAG 2.1, berapa rasio kontras minimal yang diperlukan untuk teks normal (body text) agar memenuhi level AA?',
    options: ['A. 3:1', 'B. 4.5:1', 'C. 7:1', 'D. 2:1'],
    correctAnswer: 1,
    explanation: 'Standar WCAG 2.1 AA untuk teks normal membutuhkan rasio kontras minimal 4.5:1 agar mudah dibaca oleh pengguna dengan gangguan penglihatan.',
  },
  {
    role: 'UI/UX Designer', skillName: 'Visual Design', difficulty: 'intermediate',
    question: 'Saat merancang hierarki visual pada dashboard yang padat informasi, elemen mana yang paling efektif digunakan untuk memisahkan grup konten tanpa menambah "visual clutter"?',
    options: ['A. Garis pembatas (Border) yang tebal', 'B. Pemanfaatan White Space (Gestalt Law of Proximity)', 'C. Background warna yang kontras di setiap section', 'D. Drop shadow yang tebal pada setiap card'],
    correctAnswer: 1,
    explanation: 'White space secara alami memisahkan grup konten berdasarkan prinsip Gestalt Law of Proximity tanpa menambah kebisingan visual.',
  },
  {
    role: 'UI/UX Designer', skillName: 'Visual Design', difficulty: 'intermediate',
    question: 'Manakah prinsip utama dari F-Shaped Pattern dalam perilaku membaca user di halaman web?',
    options: ['A. User membaca dari bawah ke atas secara diagonal', 'B. User fokus membaca di area kiri atas dan memindai secara horizontal sebelum turun ke bawah', 'C. User hanya melihat gambar tanpa membaca teks', 'D. User membaca secara acak di tengah halaman'],
    correctAnswer: 1,
    explanation: 'F-Shaped Pattern menunjukkan bahwa user memindai layar membentuk huruf F: horizontal di bagian atas, lalu turun dan horizontal lagi.',
  },
  // Typography (2 soal)
  {
    role: 'UI/UX Designer', skillName: 'Typography', difficulty: 'basic',
    question: 'Jika Anda menggunakan Base Font Size sebesar 16px dan menerapkan Type Scale Ratio "Golden Ratio" (1.618) untuk Heading, berapa ukuran font yang paling mendekati untuk komponen H2?',
    options: ['A. 24px', 'B. 32px', 'C. 42px', 'D. 64px'],
    correctAnswer: 2,
    explanation: '16px × 1.618 ≈ 25.9px (H3), lalu 25.9 × 1.618 ≈ 42px (H2). Golden ratio memberikan skala tipografi yang harmonis.',
  },
  {
    role: 'UI/UX Designer', skillName: 'Typography', difficulty: 'basic',
    question: 'Apa dampak utama dari penataan Line Height (Leading) yang terlalu rapat pada artikel yang panjang?',
    options: ['A. Meningkatkan kecepatan membaca user', 'B. Mengurangi keterbacaan (Readability) karena baris teks terlihat menumpuk', 'C. Membuat tampilan visual menjadi lebih estetik dan modern', 'D. Menghemat ruang penyimpanan database backend'],
    correctAnswer: 1,
    explanation: 'Line height yang terlalu rapat membuat mata kesulitan mengikuti baris teks, secara signifikan menurunkan readability.',
  },
  // Prototyping (3 soal)
  {
    role: 'UI/UX Designer', skillName: 'Prototyping', difficulty: 'intermediate',
    question: 'Dalam pembuatan High-Fidelity Prototype di Figma, fitur apa yang paling tepat digunakan untuk membuat animasi transisi micro-interaction yang halus (seperti tombol toggle atau loading spinner)?',
    options: ['A. Smart Animate', 'B. Dissolve Instant', 'C. Move In / Move Out', 'D. Overlay Slide'],
    correctAnswer: 0,
    explanation: 'Smart Animate mendeteksi perbedaan properti antar frame dan menginterpolasi transisi secara otomatis untuk animasi yang halus.',
  },
  {
    role: 'UI/UX Designer', skillName: 'Prototyping', difficulty: 'intermediate',
    question: 'Kapan waktu terbaik untuk melakukan Paper Prototyping (Low-Fidelity) dalam siklus Design Thinking?',
    options: ['A. Setelah aplikasi selesai di-coding oleh developer', 'B. Pada tahap awal ideasi untuk memvalidasi konsep dasar dengan cepat', 'C. Saat melakukan final serah-terima (handover) aset ke UI Engineer', 'D. Ketika ingin melakukan pengujian performa server load aplikasi'],
    correctAnswer: 1,
    explanation: 'Paper prototyping memungkinkan validasi konsep dengan cepat dan murah tanpa investasi waktu untuk desain detail atau coding.',
  },
  {
    role: 'UI/UX Designer', skillName: 'Prototyping', difficulty: 'intermediate',
    question: 'Apa fungsi utama dari Usability Testing menggunakan interaktif prototipe?',
    options: ['A. Mencari celah keamanan (vulnerability) pada sistem', 'B. Memvalidasi apakah alur dan fungsi desain mudah dipahami oleh target user', 'C. Menghitung biaya produksi pembuatan aplikasi asli', 'D. Mengubah kode backend secara otomatis'],
    correctAnswer: 1,
    explanation: 'Usability testing memastikan desain memenuhi kebutuhan user sebelum masuk ke tahap development, menghemat biaya revisi.',
  },
  // Design System (2 soal)
  {
    role: 'UI/UX Designer', skillName: 'Design System', difficulty: 'advanced',
    question: 'Dalam konsep Atomic Design oleh Brad Frost, komponen seperti "Search Bar" yang terdiri dari Label, Input Field, dan Tombol Cari diklasifikasikan ke dalam tingkatan apa?',
    options: ['A. Atoms', 'B. Molecules', 'C. Organisms', 'D. Templates'],
    correctAnswer: 1,
    explanation: 'Molecules adalah gabungan beberapa Atoms yang bekerja bersama sebagai satu unit fungsional, seperti Search Bar yang terdiri dari label, input, dan tombol.',
  },
  {
    role: 'UI/UX Designer', skillName: 'Design System', difficulty: 'advanced',
    question: 'Mengapa penggunaan Design Tokens sangat direkomendasikan dalam pengembangan produk skala besar saat ini?',
    options: ['A. Untuk menggantikan fungsi bahasa pemrograman utama seperti JavaScript', 'B. Menyimpan nilai desain (warna, spacing, font) secara terpusat agar konsisten saat diimplementasikan ke berbagai platform (Web, iOS, Android)', 'C. Untuk memperkecil ukuran file gambar di server', 'D. Agar proses deployment aplikasi ke Play Store menjadi lebih cepat'],
    correctAnswer: 1,
    explanation: 'Design tokens memastikan konsistensi visual di seluruh platform dengan menyimpan keputusan desain dalam satu sumber kebenaran.',
  },

  // ===== Frontend Developer =====
  // Core Web Vitals (3 soal)
  {
    role: 'Frontend Developer', skillName: 'Core Web Vitals', difficulty: 'advanced',
    question: 'Metrik Core Web Vitals apa yang digunakan untuk mengukur responsivitas halaman terhadap interaksi pengguna, menggantikan First Input Delay (FID)?',
    options: ['A. Cumulative Layout Shift (CLS)', 'B. Largest Contentful Paint (LCP)', 'C. Interaction to Next Paint (INP)', 'D. First Contentful Paint (FCP)'],
    correctAnswer: 2,
    explanation: 'INP menggantikan FID sebagai metrik responsivitas, mengukur latency semua interaksi pengguna, bukan hanya interaksi pertama.',
  },
  {
    role: 'Frontend Developer', skillName: 'Core Web Vitals', difficulty: 'advanced',
    question: 'Masalah apa yang diindikasikan jika sebuah web mendapatkan nilai score Cumulative Layout Shift (CLS) yang buruk?',
    options: ['A. Waktu loading server backend terlalu lama', 'B. Elemen layout bergeser secara tidak terduga saat halaman dimuat', 'C. Ukuran file gambar terlalu besar tanpa kompresi', 'D. Penggunaan library JavaScript pihak ketiga yang memblokir main-thread'],
    correctAnswer: 1,
    explanation: 'CLS mengukur pergeseran layout yang tidak terduga. Skor buruk berarti elemen visual bergeser setelah dimuat, mengganggu pengalaman user.',
  },
  {
    role: 'Frontend Developer', skillName: 'Core Web Vitals', difficulty: 'advanced',
    question: 'Untuk mengoptimalkan Largest Contentful Paint (LCP) pada sebuah aset gambar hero di halaman utama, optimasi apa yang paling direkomendasikan?',
    options: ['A. Menggunakan properti loading="lazy"', 'B. Menggunakan tag atribut fetchpriority="high"', 'C. Mengonversi gambar menjadi format GIF', 'D. Menyimpan gambar langsung di lokal internal storage client'],
    correctAnswer: 1,
    explanation: 'fetchpriority="high" memberi sinyal ke browser untuk memprioritaskan unduhan gambar hero, sementara loading="lazy" malah menunda pemuatan.',
  },
  // State Management (2 soal)
  {
    role: 'Frontend Developer', skillName: 'State Management', difficulty: 'intermediate',
    question: 'Apa yang dimaksud dengan fenomena "Prop Drilling" pada framework berbasis komponen seperti React?',
    options: ['A. Proses pengambilan data dari REST API menggunakan metode rekursif', 'B. Kondisi di mana data/props harus melewati banyak layer komponen anak yang tidak membutuhkannya demi mencapai komponen tujuan', 'C. Teknik membagi satu state besar menjadi state-state kecil otomatis', 'D. Kegagalan sistem akibat state diubah di luar siklus lifecycle komponen'],
    correctAnswer: 1,
    explanation: 'Prop drilling terjadi saat props diturunkan melalui komponen perantara yang tidak membutuhkannya, membuat kode sulit dipelihara.',
  },
  {
    role: 'Frontend Developer', skillName: 'State Management', difficulty: 'intermediate',
    question: 'Mengapa arsitektur Redux menggunakan prinsip Immutability (state tidak boleh diubah langsung)?',
    options: ['A. Biar performa aplikasi menjadi jauh lebih lambat namun aman', 'B. Memudahkan pelacakan riwayat perubahan state (time-travel debugging) dan mencegah bug inkonsistensi rendering UI', 'C. Karena JavaScript tidak mendukung pengubahan nilai variabel objek secara native', 'D. Menghilangkan kebutuhan penulisan fungsi reducers'],
    correctAnswer: 1,
    explanation: 'Immutability memungkinkan time-travel debugging, memudahkan deteksi perubahan state, dan mencegah side effect yang tidak diinginkan.',
  },
  // Component Architecture (3 soal)
  {
    role: 'Frontend Developer', skillName: 'Component Architecture', difficulty: 'intermediate',
    question: 'Apa keuntungan utama menggunakan React Server Components (RSC) dibandingkan Client Components pada Next.js?',
    options: ['A. Mengurangi ukuran bundle size JavaScript yang dikirim ke browser', 'B. Mengizinkan penggunaan React Hooks seperti useState secara langsung', 'C. Mempercepat proses animasi CSS di sisi client', 'D. Mempermudah manipulasi DOM secara langsung'],
    correctAnswer: 0,
    explanation: 'RSC di-render di server, sehingga kode komponen tidak dikirim ke browser, mengurangi bundle size JavaScript secara signifikan.',
  },
  {
    role: 'Frontend Developer', skillName: 'Component Architecture', difficulty: 'intermediate',
    question: 'Kapan Anda harus menggunakan teknik Dynamic Import / Lazy Loading pada level komponen frontend?',
    options: ['A. Saat komponen tersebut harus langsung di-render pertama kali di halaman utama', 'B. Untuk menunda pemuatan komponen yang berat (seperti chart/modal) hingga komponen tersebut benar-benar dibutuhkan oleh user', 'C. Ketika ingin mengubah arsitektur REST API menjadi GraphQL', 'D. Jika komponen tersebut menggunakan global state management'],
    correctAnswer: 1,
    explanation: 'Lazy loading menunda pemuatan komponen non-kritis sampai diperlukan, mempercepat initial load time halaman.',
  },
  {
    role: 'Frontend Developer', skillName: 'Component Architecture', difficulty: 'intermediate',
    question: 'Apa tujuan utama dari pembuatan Reusable Component dalam sebuah project frontend?',
    options: ['A. Mengurangi jumlah line of code agar file database backend lebih ringan', 'B. Menjaga konsistensi tampilan visual UI dan mempermudah pemeliharaan kode di masa depan', 'C. Agar proses kompilasi (build project) bisa dilewati tanpa error', 'D. Menghilangkan fungsi file router eksternal'],
    correctAnswer: 1,
    explanation: 'Reusable component mengurangi duplikasi kode, memastikan konsistensi UI, dan mempermudah maintenance.',
  },
  // API Integration (2 soal)
  {
    role: 'Frontend Developer', skillName: 'API Integration', difficulty: 'intermediate',
    question: 'Masalah keamanan apa yang muncul jika aplikasi frontend menyimpan JWT (JSON Web Token) yang sensitif di dalam localStorage browser?',
    options: ['A. Token akan otomatis terhapus saat user menutup tab browser', 'B. Rentan terhadap pencurian token melalui serangan Cross-Site Scripting (XSS)', 'C. Mengakibatkan request API ke backend selalu berstatus error 500', 'D. Membikin payload token bertambah besar ukurannya'],
    correctAnswer: 1,
    explanation: 'localStorage dapat diakses oleh JavaScript, sehingga jika terjadi serangan XSS, token bisa dicuri. HttpOnly cookie lebih aman.',
  },
  {
    role: 'Frontend Developer', skillName: 'API Integration', difficulty: 'intermediate',
    question: 'Apa fungsi utama dari penerapan mekanisme Debounce saat mengimplementasikan fitur "Live Search" yang memanggil API eksternal?',
    options: ['A. Mengenkripsi kata kunci pencarian sebelum dikirim ke server', 'B. Menunda pengiriman request API sampai user selesai mengetik dalam rentang waktu tertentu guna menghemat rate-limit server', 'C. Mengubah otomatis huruf kecil menjadi huruf besar di input field', 'D. Menampilkan cache pencarian sebelumnya jika koneksi internet terputus'],
    correctAnswer: 1,
    explanation: 'Debounce mencegah pengiriman request API pada setiap ketukan tombol, menunggu jeda tertentu setelah user berhenti mengetik.',
  },

  // ===== Backend Engineer =====
  // API Design (3 soal)
  {
    role: 'Backend Engineer', skillName: 'API Design', difficulty: 'intermediate',
    question: 'Manakah HTTP Method berikut yang secara standar industri bersifat Idempotent (eksekusi berulang kali memberikan hasil/state server yang sama)?',
    options: ['A. POST dan PATCH', 'B. GET, PUT, dan DELETE', 'C. POST dan OPTIONS', 'D. PUT dan POST'],
    correctAnswer: 1,
    explanation: 'GET, PUT, dan DELETE bersifat idempotent karena eksekusi berulang menghasilkan state server yang sama. POST dan PATCH tidak idempotent.',
  },
  {
    role: 'Backend Engineer', skillName: 'API Design', difficulty: 'intermediate',
    question: 'Jika Anda merancang REST API untuk sistem e-commerce dan ingin mengembalikan response status bahwa resource baru berhasil dibuat di database, HTTP Status Code manakah yang paling tepat?',
    options: ['A. 200 OK', 'B. 201 Created', 'C. 204 No Content', 'D. 400 Bad Request'],
    correctAnswer: 1,
    explanation: '201 Created adalah status code standar untuk operasi POST yang berhasil membuat resource baru.',
  },
  {
    role: 'Backend Engineer', skillName: 'API Design', difficulty: 'intermediate',
    question: 'Apa pendekatan terbaik untuk menangani API Versioning pada arsitektur microservices skala besar tanpa merusak kompatibilitas aplikasi client lama?',
    options: ['A. Mengganti seluruh fungsi internal backend tanpa mengubah URL', 'B. Menyertakan versi pada URL path (contoh: /api/v1/users) atau via Custom HTTP Header', 'C. Mematikan service lama setiap kali ada update fungsi baru', 'D. Memaksa client memperbarui struktur database lokal mereka'],
    correctAnswer: 1,
    explanation: 'API versioning via URL path atau HTTP header memungkinkan client lama tetap berfungsi sambil client baru menggunakan versi terbaru.',
  },
  // Database Optimization (2 soal)
  {
    role: 'Backend Engineer', skillName: 'Database Optimization', difficulty: 'advanced',
    question: 'Bagaimana cara paling efektif untuk mengatasi masalah N+1 Query saat mengambil data relasional menggunakan ORM?',
    options: ['A. Membuat index baru pada semua kolom tabel database', 'B. Menggunakan metode Eager Loading atau Joins saat query', 'C. Memisahkan database menjadi arsitektur Microservices', 'D. Mengubah tipe data primary key menjadi UUID'],
    correctAnswer: 1,
    explanation: 'Eager loading menggabungkan query relasional dalam satu statement SQL menggunakan JOIN, menghindari multiple query terpisah.',
  },
  {
    role: 'Backend Engineer', skillName: 'Database Optimization', difficulty: 'advanced',
    question: 'Kapan penggunaan teknik Database Sharding (horizontal partitioning) lebih direkomendasikan dibandingkan vertikal partitioning?',
    options: ['A. Saat ukuran data satu tabel sudah terlalu raksasa dan melebihi kapasitas throughput performa dari satu core server database tunggal', 'B. Ketika ingin menambahkan kolom baru berjenis enkripsi teks', 'C. Jika hanya ingin memisahkan hak akses user berdasarkan role admin dan member', 'D. Saat ingin mengubah database PostgreSQL menjadi NoSQL Redis'],
    correctAnswer: 0,
    explanation: 'Sharding mendistribusikan data ke beberapa server untuk mengatasi keterbatasan skalar vertikal pada satu server database.',
  },
  // System Architecture (3 soal)
  {
    role: 'Backend Engineer', skillName: 'System Architecture', difficulty: 'advanced',
    question: 'Kapan sebuah sistem backend lebih tepat menggunakan Message Broker (seperti RabbitMQ atau Apache Kafka) dibandingkan komunikasi synchronous HTTP?',
    options: ['A. Saat response data harus langsung dikembalikan ke user saat itu juga', 'B. Untuk memproses tugas berat di latar belakang (asynchronous background job) secara terdistribusi tanpa memblokir performa request utama', 'C. Ketika ingin menghemat biaya sewa server hosting bulanan', 'D. Jika arsitektur database yang digunakan berupa monolithic SQL'],
    correctAnswer: 1,
    explanation: 'Message broker memungkinkan pemrosesan asynchronous dan decoupling antar service, ideal untuk background job dan event-driven architecture.',
  },
  {
    role: 'Backend Engineer', skillName: 'System Architecture', difficulty: 'advanced',
    question: 'Apa kegunaan utama dari implementasi Reverse Proxy (seperti Nginx) di depan application server backend?',
    options: ['A. Berfungsi sebagai compiler bahasa pemrograman otomatis', 'B. Menangani SSL termination, load balancing, dan menyembunyikan IP asli application server demi keamanan', 'C. Mempercepat penulisan sintaks query database relasional', 'D. Mengganti peran framework backend seperti Express atau Laravel'],
    correctAnswer: 1,
    explanation: 'Reverse proxy meningkatkan keamanan dan performa dengan menangani SSL, mendistribusikan traffic, dan menyembunyikan infrastruktur internal.',
  },
  {
    role: 'Backend Engineer', skillName: 'System Architecture', difficulty: 'advanced',
    question: 'Dalam arsitektur Microservices, apa fungsi utama dari komponen API Gateway?',
    options: ['A. Menyimpan file media gambar cadangan user', 'B. Menjadi pintu gerbang tunggal masuknya seluruh request client, mengurus routing internal, autentikasi, serta rate limiting', 'C. Melakukan kompilasi code dari bahasa Go ke JavaScript', 'D. Melakukan backup otomatis seluruh baris isi database secara berkala'],
    correctAnswer: 1,
    explanation: 'API Gateway menyederhanakan komunikasi client dengan menyediakan satu entry point untuk routing, autentikasi, dan rate limiting ke berbagai microservices.',
  },
  // Authentication & Security (2 soal)
  {
    role: 'Backend Engineer', skillName: 'Authentication & Security', difficulty: 'advanced',
    question: 'Mekanisme penyimpanan password manakah di database yang paling aman dari metode serangan brute force menggunakan rainbow tables?',
    options: ['A. Enkripsi menggunakan algoritma MD5', 'B. Enkripsi menggunakan SHA-256 tanpa tambahan string variabel', 'C. Hashing menggunakan algoritma bcrypt atau Argon2 yang dikombinasikan dengan Salt unik', 'D. Menyimpan password dalam format teks asli (Plaintext) di dalam tabel terenkripsi'],
    correctAnswer: 2,
    explanation: 'bcrypt dan Argon2 adalah algoritma hashing yang dirancang khusus untuk password, dengan salt unik yang membuat rainbow tables tidak efektif.',
  },
  {
    role: 'Backend Engineer', skillName: 'Authentication & Security', difficulty: 'advanced',
    question: 'Bagaimana cara kerja token otentikasi berbasis Refresh Token untuk meningkatkan keamanan sesi login pengguna?',
    options: ['A. Refresh token dikirimkan pada setiap request API bersama dengan Access Token', 'B. Access Token dibuat berumur sangat pendek (menit), dan Refresh Token disimpan secara aman (HttpOnly cookie) untuk memperbarui Access Token tanpa memaksa user login ulang', 'C. Refresh token digunakan untuk mengenkripsi password user di sisi server database', 'D. Menghapus otomatis riwayat log aktivitas user dari server backend'],
    correctAnswer: 1,
    explanation: 'Access Token berumur pendek meminimalkan risiko jika bocor, sementara Refresh Token yang aman memungkinkan perpanjangan sesi tanpa login ulang.',
  },

  // ===== Mobile Developer =====
  // UI Declarative Frameworks (3 soal)
  {
    role: 'Mobile Developer', skillName: 'UI Declarative Frameworks', difficulty: 'intermediate',
    question: 'Apa prinsip kerja utama dari proses Recomposition pada deklaratif UI seperti Jetpack Compose atau SwiftUI?',
    options: ['A. Menggambar ulang seluruh komponen screen dari awal setiap ada perubahan data', 'B. Mengupdate hanya komponen UI yang mengalami perubahan state data terkait', 'C. Mengubah kode UI menjadi file XML secara otomatis di latar belakang', 'D. Menghapus cache memory aplikasi secara berkala'],
    correctAnswer: 1,
    explanation: 'Recomposition hanya merender ulang komponen yang state-nya berubah, bukan seluruh layout, sehingga efisien dalam penggunaan resource.',
  },
  {
    role: 'Mobile Developer', skillName: 'UI Declarative Frameworks', difficulty: 'intermediate',
    question: 'Mengapa penggunaan komponen daftar malas seperti LazyColumn (Android) atau List (iOS) wajib dipakai untuk merender data berjumlah ratusan dibandingkan komponen Column biasa?',
    options: ['A. Karena komponen tersebut otomatis mengunduh data dari internet secara berkala', 'B. Hanya merender elemen yang sedang terlihat di layar gawai pengguna sehingga menghemat RAM secara signifikan', 'C. Otomatis mengubah ukuran teks agar sesuai layar device tablet', 'D. Mengaktifkan fungsi keamanan enkripsi data UI secara native'],
    correctAnswer: 1,
    explanation: 'LazyColumn/List hanya merender item yang terlihat di layar, mendaur ulang view untuk item yang tidak terlihat, menghemat memori secara drastis.',
  },
  {
    role: 'Mobile Developer', skillName: 'UI Declarative Frameworks', difficulty: 'intermediate',
    question: 'Apa fungsi dari fungsionalitas Modifier pada pemrograman Jetpack Compose?',
    options: ['A. Untuk mengatur koneksi database lokal SQLite', 'B. Mendekorasi atau mengubah tampilan komponen, tata letak, serta menangani aksi interaksi masukan user', 'C. Mengatur routing halaman internal aplikasi berbasis fragment', 'D. Melakukan logging error pelacakan crash aplikasi ke server Firebase'],
    correctAnswer: 1,
    explanation: 'Modifier di Compose memberikan dekorasi dan perilaku ke komponen, seperti padding, klik, ukuran, dan animasi secara berantai (chained).',
  },
  // Lifecycle & Memory Management (2 soal)
  {
    role: 'Mobile Developer', skillName: 'Lifecycle & Memory Management', difficulty: 'intermediate',
    question: 'Pada pengembangan Android (Kotlin), tindakan mana yang paling berpotensi menyebabkan memory leak (kebocoran memori)?',
    options: ['A. Menggunakan ViewModel untuk menyimpan state UI', 'B. Menyimpan referensi Activity Context di dalam kelas Static atau Singleton', 'C. Menggunakan Coroutines dengan Dispatchers.IO', 'D. Mengimplementasikan DiffUtil pada RecyclerView'],
    correctAnswer: 1,
    explanation: 'Static reference ke Activity Context mencegah Activity di-GC meskipun sudah di-destroy, menyebabkan memory leak.',
  },
  {
    role: 'Mobile Developer', skillName: 'Lifecycle & Memory Management', difficulty: 'intermediate',
    question: 'Apa yang terjadi jika aplikasi mobile melakukan tugas berat (seperti memproses file gambar besar atau sinkronisasi database) langsung di dalam Main Thread UI?',
    options: ['A. Aplikasi akan langsung menutup sesi koneksi internet secara sepihak', 'B. Tampilan aplikasi membeku (freeze) dan memicu terjadinya error Application Not Responding (ANR)', 'C. Ukuran storage internal aplikasi langsung membengkak dua kali lipat', 'D. Server backend akan menolak seluruh request data berikutnya dari device tersebut'],
    correctAnswer: 1,
    explanation: 'Operasi berat di Main Thread memblokir rendering UI, menyebabkan aplikasi terlihat freeze dan OS Android memunculkan dialog ANR.',
  },
  // Local Storage (3 soal)
  {
    role: 'Mobile Developer', skillName: 'Local Storage', difficulty: 'intermediate',
    question: 'Kapan waktu paling tepat bagi mobile app untuk menggunakan database lokal (seperti Room atau Realm) dibandingkan menyimpan data di SharedPreferences/UserDefaults?',
    options: ['A. Saat hanya ingin menyimpan konfigurasi tema gelap (dark mode) aplikasi', 'B. Ketika perlu mengelola data kompleks, berelasi, berukuran besar, dan membutuhkan fungsionalitas query terstruktur secara offline', 'C. Jika ingin mengirimkan token otentikasi user langsung ke server eksternal', 'D. Saat ingin mempercepat proses download gambar aset dari CDN'],
    correctAnswer: 1,
    explanation: 'Room/Realm cocok untuk data relasional kompleks dengan kebutuhan query, sementara SharedPreferences untuk key-value sederhana.',
  },
  {
    role: 'Mobile Developer', skillName: 'Local Storage', difficulty: 'intermediate',
    question: 'Apa fungsi utama dari enkripsi basis data lokal (seperti SQLCipher) pada aplikasi perbankan mobile?',
    options: ['A. Mempercepat waktu eksekusi penulisan query tabel lokal', 'B. Melindungi data offline dari upaya pencurian data jika handphone user di-root atau diekstrak secara ilegal', 'C. Menghubungkan database lokal dengan server Firebase secara otomatis', 'D. Menghapus cache sampah aplikasi secara otomatis'],
    correctAnswer: 1,
    explanation: 'Enkripsi database lokal melindungi data sensitif pengguna meskipun perangkat di-root atau storage-nya diakses secara ilegal.',
  },
  {
    role: 'Mobile Developer', skillName: 'Local Storage', difficulty: 'intermediate',
    question: 'Mengapa penyimpanan data sensitif pengguna (seperti PIN atau bio-token) tidak boleh ditaruh di dalam berkas teks biasa di lokal internal storage?',
    options: ['A. Karena file tersebut akan hilang setiap kali pengguna me-restart hp mereka', 'B. Berkas teks biasa sangat mudah dibaca oleh aplikasi lain yang memiliki izin root akses storage', 'C. Mengakibatkan performa baterai handphone menjadi boros', 'D. Menyebabkan aplikasi gagal didaftarkan ke Google Play Store atau App Store'],
    correctAnswer: 1,
    explanation: 'File teks biasa di internal storage dapat dibaca oleh aplikasi lain dengan akses root, sehingga data sensitif harus disimpan di secure storage seperti Keychain/Keystore.',
  },
  // App Architecture (2 soal)
  {
    role: 'Mobile Developer', skillName: 'App Architecture', difficulty: 'advanced',
    question: 'Apa fungsi utama dari layer Domain / UseCase pada penerapan arsitektur Clean Architecture di project mobile?',
    options: ['A. Mengurus fungsionalitas visual animasi komponen UI di layer terdepan', 'B. Menyimpan logika bisnis inti produk (Core Business Logic) yang bersifat independen dari framework UI maupun database', 'C. Mengatur konfigurasi build.gradle dan library eksternal', 'D. Mengambil data mentah dalam format JSON langsung dari internet'],
    correctAnswer: 1,
    explanation: 'Domain/UseCase layer berisi business logic murni tanpa ketergantungan pada framework, memudahkan testing dan perubahan implementasi.',
  },
  {
    role: 'Mobile Developer', skillName: 'App Architecture', difficulty: 'advanced',
    question: 'Mengapa pola arsitektur MVVM (Model-View-ViewModel) sangat populer dan diadopsi secara resmi dalam pengembangan aplikasi modern?',
    options: ['A. Karena memisahkan logika pengaturan UI dari logika bisnis data, membuat code mudah di-test melalui Unit Testing', 'B. Menghilangkan kebutuhan penulisan bahasa pemrograman Kotlin atau Swift', 'C. Membuat ukuran file instalasi (.apk atau .ipa) menjadi sangat kecil', 'D. Mengotomatisasi proses desain tampilan aplikasi tanpa perlu UI designer'],
    correctAnswer: 0,
    explanation: 'MVVM memisahkan concern antara UI (View) dan business logic (ViewModel), memungkinkan unit testing dan maintainability yang lebih baik.',
  },

  // ===== Data Analyst / Business Intelligence =====
  // Advanced SQL (3 soal)
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Advanced SQL', difficulty: 'advanced',
    question: 'Apa perbedaan mendasar antara fungsi ROW_NUMBER() dan DENSE_RANK() saat menangani nilai yang sama (tie) pada Window Function SQL?',
    options: ['A. ROW_NUMBER() memberikan nilai acak, DENSE_RANK() memberikan nilai berurutan', 'B. ROW_NUMBER() memberikan nomor unik berurutan, sedangkan DENSE_RANK() memberikan peringkat yang sama tanpa melompati nomor berikutnya', 'C. DENSE_RANK() akan melompati nomor peringkat jika ada nilai yang kembar', 'D. Kedua fungsi tersebut menghasilkan output yang sama persis dalam semua kondisi'],
    correctAnswer: 1,
    explanation: 'ROW_NUMBER() memberi nomor unik untuk setiap baris (tak ada nilai sama). DENSE_RANK() memberi peringkat sama untuk nilai tie tanpa melompati nomor berikutnya.',
  },
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Advanced SQL', difficulty: 'advanced',
    question: 'Kapan waktu yang paling tepat menggunakan LEFT JOIN dibandingkan INNER JOIN dalam sebuah analisis tren data transaksi bulanan?',
    options: ['A. Saat kita hanya ingin mengambil data pengguna yang melakukan transaksi saja', 'B. Ketika kita ingin mempertahankan semua data user di tabel induk, termasuk user yang belum memiliki riwayat transaksi bulan ini', 'C. Jika kita ingin mempercepat performa query database relasional hingga dua kali lipat', 'D. Saat tipe data primary key pada kedua tabel yang dihubungkan berbentuk UUID'],
    correctAnswer: 1,
    explanation: 'LEFT JOIN mempertahankan semua baris tabel kiri (induk) meskipun tidak ada kecocokan di tabel kanan, berguna untuk analisis retain semua user.',
  },
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Advanced SQL', difficulty: 'advanced',
    question: 'Mengapa penggunaan klausa WHERE tidak dapat digunakan secara langsung untuk memfilter hasil fungsi agregat seperti SUM() atau AVG(), sehingga memerlukan klausa HAVING?',
    options: ['A. Karena WHERE hanya bisa membaca tipe data teks, bukan angka matematika', 'B. Klausa WHERE memfilter baris data sebelum agregasi dilakukan, sedangkan HAVING memfilter setelah data dikelompokkan oleh GROUP BY', 'C. HAVING merupakan sintaks standar yang wajib ada di setiap framework ORM backend terbaru', 'D. Klausa WHERE otomatis mengunci tabel secara penuh di database server'],
    correctAnswer: 1,
    explanation: 'WHERE memfilter baris sebelum agregasi (GROUP BY), HAVING memfilter hasil agregasi setelah pengelompokan. Keduanya memiliki urutan eksekusi berbeda.',
  },
  // Data Modeling & ETL (2 soal)
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Data Modeling & ETL', difficulty: 'intermediate',
    question: 'Mengapa arsitektur Star Schema sangat populer digunakan dalam pembuatan Data Warehouse untuk keperluan Business Intelligence?',
    options: ['A. Karena menghemat ruang penyimpanan harddisk secara ekstrem melalui normalisasi tinggi', 'B. Mempercepat performa query read-heavy melalui struktur tabel fakta yang terpusat dan tabel dimensi yang ter-denormalisasi', 'C. Karena mendukung tipe data unstructured seperti file video dan audio secara native', 'D. Menghilangkan kebutuhan proses ETL sebelum data visualisasi dilakukan'],
    correctAnswer: 1,
    explanation: 'Star Schema mengoptimalkan query read-heavy dengan tabel fakta terpusat dan dimensi denormalized, mengurangi jumlah JOIN yang kompleks.',
  },
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Data Modeling & ETL', difficulty: 'intermediate',
    question: 'Di dalam siklus ETL (Extract, Transform, Load), pada tahapan manakah pembersihan data duplikat dan penyesuaian format zona waktu (timezone handling) idealnya dieksekusi?',
    options: ['A. Extract', 'B. Transform', 'C. Load', 'D. Data Visualizing'],
    correctAnswer: 1,
    explanation: 'Transform adalah tahapan pembersihan, validasi, dan konversi data sebelum dimuat ke target. Pembersihan duplikat dan timezone handling dilakukan di tahap ini.',
  },
  // Data Visualization (3 soal)
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Data Visualization', difficulty: 'basic',
    question: 'Jika Anda diminta menyajikan dashboard eksekutif untuk membandingkan kontribusi pendapatan dari 5 lini produk yang berbeda terhadap total revenue perusahaan, jenis visualisasi mana yang paling hindari karena bias distorsinya tinggi?',
    options: ['A. Bar Chart', 'B. Pie Chart berdimensi 3D (3D Pie Chart)', 'C. Line Chart', 'D. Stacked Column Chart'],
    correctAnswer: 1,
    explanation: '3D Pie Chart mendistorsi persepsi proporsi karena efek perspektif 3D, membuat perbandingan antar segmen menjadi tidak akurat.',
  },
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Data Visualization', difficulty: 'basic',
    question: 'Apa fungsi utama dari pembuatan fitur Drill-Down pada pelaporan dashboard BI interaktif seperti Tableau atau Power BI?',
    options: ['A. Mengubah skema database backend secara real-time', 'B. Memungkinkan pengguna melihat data dari level ringkasan umum ke level detail yang lebih dalam secara hierarkis', 'C. Mengompresi ukuran file dashboard agar lebih ringan saat diunduh', 'D. Mengamankan dashboard dari serangan SQL Injection pihak luar'],
    correctAnswer: 1,
    explanation: 'Drill-Down memungkinkan eksplorasi data hierarkis, dari ringkasan agregat ke detail transaksional tanpa berpindah dashboard.',
  },
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Data Visualization', difficulty: 'basic',
    question: 'Apa yang dimaksud dengan istilah "Data Ink Ratio" menurut Edward Tufte dalam prinsip desain visualisasi data?',
    options: ['A. Jumlah tinta printer yang dihabiskan untuk mencetak dokumen laporan bulanan', 'B. Proporsi elemen visual yang memberikan informasi riil dibandingkan dengan elemen dekoratif non-informasi yang mengganggu', 'C. Kecepatan loading server BI dalam memproses grafik chart interaktif', 'D. Skala akurasi warna chart saat diproyeksikan ke layar monitor korporat'],
    correctAnswer: 1,
    explanation: 'Data Ink Ratio memaksimalkan proporsi tinta yang menyampaikan informasi dan meminimalkan elemen dekoratif yang tidak perlu (chartjunk).',
  },
  // Statistical Analysis (2 soal)
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Statistical Analysis', difficulty: 'intermediate',
    question: 'Jika nilai p-value yang dihasilkan dari pengujian A/B Testing fitur checkout baru bernilai 0.02 (menggunakan batas signifikansi α = 0.05), apa kesimpulan bisnis yang diambil?',
    options: ['A. Fitur baru gagal dan merugikan bisnis sehingga harus di-revert', 'B. Menolak Null Hypothesis, artinya perubahan fitur baru memberikan dampak perbedaan yang signifikan secara statistik', 'C. Pengujian tidak valid karena data mengalami ketidakseimbangan (imbalance)', 'D. Diperlukan waktu pengujian ulang dari awal selama minimal 6 bulan lagi'],
    correctAnswer: 1,
    explanation: 'p-value (0.02) < α (0.05), maka tolak H0. Artinya perubahan fitur memberikan dampak signifikan secara statistik pada tingkat kepercayaan 95%.',
  },
  {
    role: 'Data Analyst / Business Intelligence', skillName: 'Statistical Analysis', difficulty: 'intermediate',
    question: 'Kapan nilai Median lebih tepat digunakan sebagai representasi nilai tengah (Central Tendency) data performa penjualan sales dibandingkan nilai Rata-rata (Mean)?',
    options: ['A. Ketika data penjualan terdistribusi secara normal sempurna', 'B. Saat dataset memiliki nilai pencilan (outliers) ekstrem yang dapat mendistorsi rata-rata secara signifikan', 'C. Jika jumlah sampel data kurang dari 10 baris di database', 'D. Ketika seluruh data bertipe kualitatif nominal'],
    correctAnswer: 1,
    explanation: 'Median robust terhadap outliers karena hanya melihat nilai tengah, tidak terpengaruh nilai ekstrem seperti Mean.',
  },

  // ===== DevOps Engineer =====
  // CI/CD Pipelines (3 soal)
  {
    role: 'DevOps Engineer', skillName: 'CI/CD Pipelines', difficulty: 'advanced',
    question: 'Apa keuntungan utama menerapkan strategi deployment berjenis Blue-Green Deployment pada aplikasi produksi skala besar?',
    options: ['A. Memperkecil konsumsi resource server cloud hingga setengahnya', 'B. Meminimalkan waktu downtime hingga mendekati nol dan mempermudah proses rollback instan jika terjadi error', 'C. Mengotomatisasi penulisan kode dokumentasi API backend', 'D. Menghilangkan kebutuhan enkripsi SSL pada jaringan internal'],
    correctAnswer: 1,
    explanation: 'Blue-Green memiliki dua environment identik. Traffic dialihkan instan dari Blue ke Green, dan rollback cukup dengan mengalihkan traffic kembali.',
  },
  {
    role: 'DevOps Engineer', skillName: 'CI/CD Pipelines', difficulty: 'advanced',
    question: 'Di dalam konfigurasi pipeline Jenkins atau GitHub Actions, apa fungsi utama dari tahapan Artifact Caching?',
    options: ['A. Mengamankan kode program dari kebocoran data pihak luar', 'B. Menyimpan dependensi (misal folder node_modules) agar build pipeline berikutnya berjalan jauh lebih cepat', 'C. Menghapus database testing secara otomatis setelah pengujian selesai', 'D. Mengubah file konfigurasi YAML menjadi format JSON'],
    correctAnswer: 1,
    explanation: 'Artifact caching menyimpan dependensi build yang jarang berubah, mempercepat pipeline berikutnya dengan menghindari download ulang.',
  },
  {
    role: 'DevOps Engineer', skillName: 'CI/CD Pipelines', difficulty: 'advanced',
    question: 'Apa perbedaan mendasar antara praktik Continuous Delivery dan Continuous Deployment dalam siklus DevOps?',
    options: ['A. Continuous Delivery membutuhkan persetujuan manual (manual approval) untuk rilis ke production, sedangkan Continuous Deployment otomatis tanpa intervensi', 'B. Continuous Delivery hanya mendeteksi bug sintaks, sedangkan Continuous Deployment membetulkan bug secara otomatis', 'C. Continuous Deployment dikhususkan untuk server lokal on-premise saja', 'D. Tidak ada perbedaan, keduanya merujuk pada script otomasi shell yang sama'],
    correctAnswer: 0,
    explanation: 'Continuous Delivery siap rilis kapan saja dengan approval manual. Continuous Deployment langsung mengirim ke production secara otomatis setelah pipeline sukses.',
  },
  // Containerization & Orchestration (2 soal)
  {
    role: 'DevOps Engineer', skillName: 'Containerization & Orchestration', difficulty: 'intermediate',
    question: 'Di ekosistem Kubernetes, komponen apa yang bertanggung jawab untuk memastikan jumlah replika Pod berjalan sesuai dengan konfigurasi yang diinginkan?',
    options: ['A. Kube-apiserver', 'B. Kubelet', 'C. ReplicaSet / Deployment Controller', 'D. Etcd'],
    correctAnswer: 2,
    explanation: 'ReplicaSet/Deployment Controller memonitor dan menjaga jumlah Pod sesuai spec.replicas, membuat atau menghapus Pod jika ada penyimpangan.',
  },
  {
    role: 'DevOps Engineer', skillName: 'Containerization & Orchestration', difficulty: 'intermediate',
    question: 'Apa fungsi utama dari instruksi EXPOSE di dalam berkas konfigurasi sebuah Dockerfile?',
    options: ['A. Membuka akses port container secara otomatis ke jaringan publik internet luar', 'B. Berfungsi sebagai dokumentasi internal yang menginformasikan port mana yang akan digunakan container saat dijalankan', 'C. Menyalin file source code lokal ke dalam sistem internal Docker image', 'D. Mengurangi ukuran kompresi final image Docker agar lebih ringan'],
    correctAnswer: 1,
    explanation: 'EXPOSE bersifat dokumentasi. Port benar-benar dibuka saat runtime dengan flag -p atau docker-compose ports.',
  },
  // Infrastructure as Code (IaC) (3 soal)
  {
    role: 'DevOps Engineer', skillName: 'Infrastructure as Code', difficulty: 'advanced',
    question: 'Apa keuntungan utama menerapkan pendekatan Declarative dibandingkan Imperative pada tools IaC seperti Terraform?',
    options: ['A. Developer harus menulis langkah-langkah detail cara membuat infrastruktur', 'B. Sistem secara otomatis mencari jalan terbaik untuk mencapai target state akhir yang didefinisikan pengguna', 'C. Proses eksekusi kode menjadi jauh lebih lambat tetapi lebih aman', 'D. Menghilangkan ketergantungan pada penyedia layanan cloud (Cloud Provider)'],
    correctAnswer: 1,
    explanation: 'Declarative IaC mendefinisikan "what" (target state), bukan "how". Terraform menghitung langkah untuk mencapai state tersebut secara otomatis.',
  },
  {
    role: 'DevOps Engineer', skillName: 'Infrastructure as Code', difficulty: 'advanced',
    question: 'Apa kegunaan utama dari berkas file .tfstate pada implementasi tool Terraform?',
    options: ['A. Menyimpan riwayat login akun cloud administrator devops', 'B. Menjadi single source of truth yang memetakan resource riil di cloud provider dengan konfigurasi lokal kamu', 'C. Mengonversi script Terraform menjadi bahasa pemrograman Python', 'D. Berfungsi sebagai file penampung sampah cache memori server'],
    correctAnswer: 1,
    explanation: 'tfstate adalah mapping resource nyata di cloud ke konfigurasi, digunakan Terraform untuk mendeteksi perubahan dan merencanakan aksi berikutnya.',
  },
  {
    role: 'DevOps Engineer', skillName: 'Infrastructure as Code', difficulty: 'advanced',
    question: 'Masalah apa yang dihindari dengan menerapkan konsep Immutable Infrastructure pada pengelolaan server cloud?',
    options: ['A. Pembengkakan biaya tagihan bandwidth bulanan cloud', 'B. Masalah Configuration Drift di mana kondisi server antar lingkungan (dev, staging, prod) menjadi tidak sinkron akibat konfigurasi manual', 'C. Penurunan kecepatan akses jaringan ke core database server', 'D. Ketergantungan sistem pada container runtime seperti Docker'],
    correctAnswer: 1,
    explanation: 'Immutable Infrastructure mengganti server entirely daripada memodifikasi server existing, mencegah configuration drift dan memastikan konsistensi lingkungan.',
  },
  // Monitoring & Logging (2 soal)
  {
    role: 'DevOps Engineer', skillName: 'Monitoring & Logging', difficulty: 'intermediate',
    question: 'Apa perbedaan fungsi utama antara Prometheus dan Grafana dalam ekosistem monitoring infrastruktur IT?',
    options: ['A. Prometheus mengurus bagian visual grafik, Grafana mengurus bagian database logs', 'B. Prometheus bertindak sebagai sistem time-series data collection & alerting, sedangkan Grafana sebagai visualisasi metriknya', 'C. Prometheus khusus server Linux, Grafana khusus server Windows', 'D. Keduanya memiliki fungsi yang sama persis dan tidak bisa dipisahkan satu sama lain'],
    correctAnswer: 1,
    explanation: 'Prometheus mengumpulkan metrik time-series dan memicu alert, Grafana memvisualisasikan data dari Prometheus (dan sumber lain) dalam bentuk dashboard.',
  },
  {
    role: 'DevOps Engineer', skillName: 'Monitoring & Logging', difficulty: 'intermediate',
    question: 'Dalam log manajemen terpusat (seperti ELK Stack), apa fungsi spesifik dari komponen Logstash?',
    options: ['A. Menampilkan visualisasi dashboard log ke hadapan tim infra', 'B. Melakukan ingesti, transformasi, dan pembersihan data log dari berbagai sumber sebelum disimpan ke Elasticsearch', 'C. Menyimpan arsip data log dalam bentuk format kompresi .zip', 'D. Mengirimkan notifikasi peringatan error server langsung ke aplikasi Slack'],
    correctAnswer: 1,
    explanation: 'Logstash bertugas memproses pipeline data log: input dari berbagai sumber, filter/transformasi, lalu output ke Elasticsearch untuk indexing.',
  },

  // ===== Cybersecurity Specialist =====
  // Application Security (OWASP) (3 soal)
  {
    role: 'Cybersecurity Specialist', skillName: 'Application Security', difficulty: 'advanced',
    question: 'Serangan jenis apa yang terjadi ketika penyerang memanipulasi parameter ID pada URL (misal: /api/user/100 diubah ke /api/user/101) untuk melihat data user lain tanpa hak akses yang sah?',
    options: ['A. SQL Injection (SQLi)', 'B. Cross-Site Scripting (XSS)', 'C. Broken Object Level Authorization (BOLA / IDOR)', 'D. Denial of Service (DoS)'],
    correctAnswer: 2,
    explanation: 'IDOR/Insecure Direct Object References terjadi saat aplikasi tidak memvalidasi otorisasi user terhadap objek yang diakses via parameter.',
  },
  {
    role: 'Cybersecurity Specialist', skillName: 'Application Security', difficulty: 'advanced',
    question: 'Bagaimana cara memitigasi celah keamanan Stored Cross-Site Scripting (Stored XSS) yang paling efektif pada kolom komentar aplikasi web?',
    options: ['A. Membatasi jumlah karakter input komentar maksimal 50 huruf saja', 'B. Melakukan input sanitization serta mematikan eksekusi script menggunakan HTML Entity Encoding sebelum data dirender browser', 'C. Mengubah database PostgreSQL menjadi database NoSQL MongoDB', 'D. Memasang protokol HTTPS pada domain utama website perusahaan'],
    correctAnswer: 1,
    explanation: 'Sanitasi input dan HTML Entity Encoding mencegah script berbahaya dieksekusi browser, mengubah karakter < > menjadi entity HTML yang aman.',
  },
  {
    role: 'Cybersecurity Specialist', skillName: 'Application Security', difficulty: 'advanced',
    question: 'Manakah dari taktik berikut yang paling ampuh menggagalkan serangan SQL Injection (SQLi) pada fitur form login backend Node.js?',
    options: ['A. Menggunakan regular expression untuk menghapus kata "OR" dan "AND"', 'B. Menggunakan Parameterized Queries atau Prepared Statements via ORM aman', 'C. Mengubah port default database menjadi port acak di atas 5000', 'D. Membikin password user menggunakan kombinasi huruf kapital dan angka'],
    correctAnswer: 1,
    explanation: 'Parameterized queries memisahkan SQL logic dari data input, mencegah input user dieksekusi sebagai statement SQL.',
  },
  // Network & Infrastructure Security (2 soal)
  {
    role: 'Cybersecurity Specialist', skillName: 'Network & Infrastructure Security', difficulty: 'intermediate',
    question: 'Apa prinsip dasar yang wajib dipatuhi dalam menerapkan arsitektur Zero Trust Security?',
    options: ['A. Selalu percaya pada pengguna yang berada di dalam jaringan internal kantor', 'B. Jangan pernah percaya, selalu verifikasi setiap permintaan akses dari mana pun asal perantinya', 'C. Menggunakan satu password yang sama untuk seluruh tools tim dev', 'D. Mematikan fungsi firewall agar koneksi server lebih cepat'],
    correctAnswer: 1,
    explanation: 'Zero Trust: "never trust, always verify". Setiap request diverifikasi terlepas dari asal jaringan, tidak ada trusted zone implicit.',
  },
  {
    role: 'Cybersecurity Specialist', skillName: 'Network & Infrastructure Security', difficulty: 'intermediate',
    question: 'Apa perbedaan mendasar antara alat keamanan berbasis IDS (Intrusion Detection System) dengan IPS (Intrusion Prevention System)?',
    options: ['A. IDS mendeteksi virus lokal, IPS mendeteksi serangan jaringan luar', 'B. IDS hanya memantau dan memberi peringatan deteksi, sedangkan IPS aktif memblokir traffic berbahaya secara otomatis', 'C. IPS membutuhkan hardware terpisah sedangkan IDS berupa software open-source', 'D. IDS bertugas mengenkripsi data, IPS bertugas mendekripsi data jaringan'],
    correctAnswer: 1,
    explanation: 'IDS bersifat pasif (monitoring + alerting), IPS aktif memblokir/mencegah traffic berbahaya secara real-time inline.',
  },
  // Identity & Access Management (IAM) (3 soal)
  {
    role: 'Cybersecurity Specialist', skillName: 'Identity & Access Management', difficulty: 'intermediate',
    question: 'Dalam protokol otentikasi OAuth 2.0, apa kegunaan utama dari Scope?',
    options: ['A. Mengatur masa kedaluwarsa token JWT agar berumur pendek', 'B. Membatasi hak akses aplikasi pihak ketiga terhadap resource akun pengguna tertentu sesuai izin', 'C. Melakukan enkripsi password user sebelum masuk ke database', 'D. Mempercepat proses pertukaran data antar microservices server'],
    correctAnswer: 1,
    explanation: 'Scope mendefinisikan batasan akses apa yang diberikan user ke aplikasi third-party, misal "read:profile" atau "write:posts".',
  },
  {
    role: 'Cybersecurity Specialist', skillName: 'Identity & Access Management', difficulty: 'intermediate',
    question: 'Mengapa implementasi MFA (Multi-Factor Authentication) dinilai sangat krusial di dunia industri modern saat ini?',
    options: ['A. Menghilangkan kebutuhan pengguna untuk menghafal password akun mereka', 'B. Menambahkan lapisan keamanan tambahan, sehingga jika password bocor, peretas tetap butuh faktor kepemilikan/biometrik lain', 'C. Mempercepat loading halaman login website internal perusahaan', 'D. Mengurangi konsumsi memori RAM pada server autentikasi terpusat'],
    correctAnswer: 1,
    explanation: 'MFA menambahkan lapisan keamanan di luar password (something you know), seperti OTP (something you have) atau sidik jari (something you are).',
  },
  {
    role: 'Cybersecurity Specialist', skillName: 'Identity & Access Management', difficulty: 'intermediate',
    question: 'Apa konsekuensi fatal jika tim developer mengimplementasikan penentuan hak akses pengguna berbasis Hardcoded Role langsung di dalam file source code aplikasi?',
    options: ['A. Menyebabkan aplikasi mobile terkena bug freeze saat dibuka', 'B. Sistem menjadi sangat tidak fleksibel dan memicu kerentanan keamanan jika ada perubahan struktur hak akses manajemen di masa depan', 'C. Menurunkan kecepatan transfer data JSON pada REST API backend', 'D. Mengakibatkan file build production menjadi corrupt tidak terbaca'],
    correctAnswer: 1,
    explanation: 'Hardcoded role menyulitkan perubahan kebijakan akses dan meningkatkan risiko keamanan karena setiap perubahan butuh deploy ulang aplikasi.',
  },
  // Incident Response (2 soal)
  {
    role: 'Cybersecurity Specialist', skillName: 'Incident Response', difficulty: 'advanced',
    question: 'Apa tindakan isolasi darurat pertama yang paling tepat dilakukan oleh tim Incident Response jika sebuah server production terkonfirmasi sedang aktif terkena serangan Ransomware?',
    options: ['A. Mematikan listrik data center secara mendadak tanpa prosedur shut down', 'B. Memutus koneksi jaringan network server tersebut dari jaringan internal dan internet guna menghentikan penyebaran lateral', 'C. Melakukan instalasi ulang sistem operasi server saat itu juga', 'D. Menghubungi peretas via email untuk menegosiasikan harga tebusan enkripsi'],
    correctAnswer: 1,
    explanation: 'Isolasi jaringan adalah langkah pertama untuk menghentikan penyebaran ransomware ke server lain (lateral movement) sebelum investigasi forensik.',
  },
  {
    role: 'Cybersecurity Specialist', skillName: 'Incident Response', difficulty: 'advanced',
    question: 'Mengapa proses pengumpulan bukti digital (Digital Forensics) wajib mempertahankan integritas data menggunakan fungsi nilai hash (Hashing Check)?',
    options: ['A. Agar ukuran file bukti menjadi lebih kecil saat dibawa ke persidangan hukum', 'B. Membuktikan secara hukum bahwa data bukti digital tersebut orisinil dan tidak mengalami modifikasi sekecil apa pun selama investigasi', 'C. Membantu mempercepat pencarian string teks kata kunci di dalam harddisk', 'D. Mengubah otomatis ekstensi file berbahaya menjadi file teks biasa yang aman'],
    correctAnswer: 1,
    explanation: 'Hash value (SHA-256) bertindak sebagai digital fingerprint. Perubahan sekecil apapun pada file akan menghasilkan hash berbeda, menjaga chain of custody.',
  },

  // ===== IT Auditor & Governance Specialist =====
  // IT Governance Frameworks (3 soal)
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'IT Governance Frameworks', difficulty: 'advanced',
    question: 'Berdasarkan framework COBIT 2019, apa perbedaan mendasar antara area Governance (Tata Kelola) dan Management (Manajemen)?',
    options: ['A. Governance berfokus pada eksekusi taktis, Management berfokus pada regulasi hukum', 'B. Governance bertugas mengarahkan (Direct), mengevaluasi (Evaluate), dan memantau (Monitor), sedangkan Management bertugas merencanakan (Plan), membangun (Build), menjalankan (Run), dan memantau aktivitas (Monitor)', 'C. Governance hanya berlaku untuk level staf, sedangkan Management untuk direksi', 'D. Tidak ada perbedaan, keduanya mengacu pada struktur organisasi yang sama'],
    correctAnswer: 1,
    explanation: 'Governance (EDM): Evaluate, Direct, Monitor. Management (PBRM): Plan, Build, Run, Monitor. Governance menetapkan arah, Management mengeksekusi.',
  },
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'IT Governance Frameworks', difficulty: 'advanced',
    question: 'Di dalam COBIT 2019, apa fungsi utama dari penentuan Design Factors saat sebuah organisasi merancang sistem tata kelola IT mereka?',
    options: ['A. Memilih vendor hardware server termurah yang ada di pasar global', 'B. Menyesuaikan panduan tata kelola generik COBIT agar sesuai dengan strategi unik, profil risiko, dan kebutuhan spesifik organisasi', 'C. Mengganti fungsi kerangka kerja ISO 27001 secara otomatis di perusahaan', 'D. Menentukan layout desain UI/UX aplikasi internal korporasi'],
    correctAnswer: 1,
    explanation: 'Design Factors memungkinkan kustomisasi COBIT sesuai konteks organisasi: strategi, profil risiko, teknologi, dan regulasi yang berlaku.',
  },
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'IT Governance Frameworks', difficulty: 'advanced',
    question: 'Apa arti dari tingkat pencapaian Capability Level 3 (Defined) pada pengukuran maturitas proses teknologi informasi korporasi?',
    options: ['A. Proses dilakukan secara acak, tidak teratur, dan tidak ada dokumentasi resmi', 'B. Proses telah terstruktur, didokumentasikan secara resmi, dan dikomunikasikan ke seluruh level organisasi standar perusahaan', 'C. Proses terus dioptimalkan secara otomatis menggunakan teknologi kecerdasan buatan (AI)', 'D. Proses berhasil dijalankan tanpa membutuhkan anggaran biaya operasional sama sekali'],
    correctAnswer: 1,
    explanation: 'Level 3 (Defined) berarti proses terstandarisasi, terdokumentasi, dan terkomunikasi. Level sebelumnya: Performed (L1), Managed (L2). Level di atas: Quantitative (L4), Optimizing (L5).',
  },
  // Information Security Standards (2 soal)
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'Information Security Standards', difficulty: 'advanced',
    question: 'Dokumen apa yang wajib disusun dalam audit ISO/IEC 27001 untuk menyatakan kontrol keamanan mana saja yang diterapkan atau tidak diterapkan beserta alasannya?',
    options: ['A. Business Impact Analysis (BIA)', 'B. Statement of Applicability (SoA)', 'C. Service Level Agreement (SLA)', 'D. Disaster Recovery Plan (DRP)'],
    correctAnswer: 1,
    explanation: 'SoA mendokumentasikan kontrol dari Annex A yang relevan, status implementasi, dan justifikasi untuk setiap kontrol yang dikecualikan.',
  },
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'Information Security Standards', difficulty: 'advanced',
    question: 'Menurut standar ISO/IEC 27001:2022, manakah kontrol di bawah ini yang dikategorikan ke dalam aspek Organizational Controls?',
    options: ['A. Instalasi endpoint security pada laptop karyawan perusahaan', 'B. Kebijakan klasifikasi informasi (Information Classification Policy) dan manajemen hak akses formal', 'C. Pemasangan kamera pengawas CCTV di area pintu masuk ruangan server data center', 'D. Konfigurasi web application firewall di server cloud production'],
    correctAnswer: 1,
    explanation: 'Organizational Controls bersifat kebijakan dan prosedural, seperti kebijakan keamanan informasi dan manajemen akses. Opsi lain termasuk technological/physical controls.',
  },
  // IT Risk Management (3 soal)
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'IT Risk Management', difficulty: 'intermediate',
    question: 'Apa perbedaan mendasar antara nilai Inherent Risk (Risiko Bawaan) dengan Residual Risk (Risiko Sisa) dalam penilaian manajemen risiko IT?',
    options: ['A. Inherent Risk dihitung setelah mitigasi, Residual Risk dihitung sebelum ada kontrol keamanan', 'B. Inherent Risk adalah tingkat risiko asli sebelum diterapkan kontrol keamanan, sedangkan Residual Risk adalah sisa risiko setelah kontrol diterapkan', 'C. Residual Risk selalu bernilai nol jika kontrol keamanan yang dibeli berharga mahal', 'D. Inherent Risk khusus untuk kegagalan hardware, Residual Risk khusus kegagalan software'],
    correctAnswer: 1,
    explanation: 'Inherent Risk = risiko sebelum kontrol. Residual Risk = risiko yang tersisa setelah kontrol diimplementasikan.',
  },
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'IT Risk Management', difficulty: 'intermediate',
    question: 'Jika sebuah perusahaan finansial memilih opsi Risk Acceptance terhadap celah kerentanan sistem kategori low-risk, apa artinya tindakan tersebut?',
    options: ['A. Perusahaan membeli polis asuransi siber untuk menanggung kerugian kerentanan tersebut', 'B. Perusahaan sadar akan keberadaan risiko tersebut, namun memilih hidup berdampingan dengannya tanpa tindakan mitigasi aktif karena biaya kontrol melebihi dampak', 'C. Perusahaan langsung menutup fungsionalitas aplikasi tersebut secara total dari internet', 'D. Perusahaan memecat tim developer yang membangun sistem bermasalah tersebut'],
    correctAnswer: 1,
    explanation: 'Risk Acceptance adalah keputusan formal manajemen untuk menerima risiko karena cost mitigasi > potential impact. Harus didokumentasi dan ditandatangani.',
  },
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'IT Risk Management', difficulty: 'intermediate',
    question: 'Apa output utama yang ingin dicapai dari pelaksanaan proses Business Impact Analysis (BIA) pada manajemen kelangsungan bisnis (BCM)?',
    options: ['A. Menghitung total bonus tahunan karyawan berdasarkan target omset penjualan perusahaan', 'B. Menetapkan nilai batas toleransi kehilangan data (RPO) dan durasi maksimal pemulihan sistem (RTO) saat terjadi insiden bencana', 'C. Mengaudit laporan keuangan milik tim divisi teknologi informasi korporasi', 'D. Menentukan arsitektur framework backend yang paling aman digunakan tim dev'],
    correctAnswer: 1,
    explanation: 'BIA mengidentifikasi proses kritis dan menetapkan Recovery Point Objective (RPO) serta Recovery Time Objective (RTO) sebagai target pemulihan bisnis.',
  },
  // Compliance & Internal Control (2 soal)
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'Compliance & Internal Control', difficulty: 'intermediate',
    question: 'Apa tujuan utama dilaksanakannya prinsip Segregation of Duties (SoD) pada tata kelola operasional tim teknologi informasi?',
    options: ['A. Memastikan satu orang karyawan bisa memegang penuh seluruh akses admin root server', 'B. Mencegah terjadinya kecurangan (fraud) atau kelalaian fatal dengan memisahkan fungsi otorisasi, pelaksanaan, dan pengawasan tugas', 'C. Mempercepat penyelesaian tugas deployment aplikasi ke production server', 'D. Mengurangi jumlah total kebutuhan perekrutan staf karyawan baru di kantor'],
    correctAnswer: 1,
    explanation: 'SoD memisahkan peran: requester, approver, executor. Mencegah satu orang memiliki kontrol penuh atas proses kritis yang berpotensi fraud.',
  },
  {
    role: 'IT Auditor & Governance Specialist', skillName: 'Compliance & Internal Control', difficulty: 'intermediate',
    question: 'Manakah yang dikategorikan sebagai tindakan Detective Control dalam sistem pengendalian internal teknologi informasi perusahaan?',
    options: ['A. Kebijakan kewajiban penggantian password akun berkala setiap 90 hari sekali', 'B. Peninjauan ulang (review) harian terhadap berkas catatan aktivitas log keamanan server (security log review)', 'C. Pemasangan antivirus berlisensi premium pada seluruh gawai inventaris kantor', 'D. Pemblokiran akses situs judi online menggunakan filter dns jaringan kantor'],
    correctAnswer: 1,
    explanation: 'Detective Control mendeteksi insiden setelah terjadi. Security log review adalah detective, password policy adalah preventive, antivirus adalah preventive/corrective.',
  },

  // ===== Cloud Engineer =====
  // Cloud Architecture & Design (3 soal)
  {
    role: 'Cloud Engineer', skillName: 'Cloud Architecture & Design', difficulty: 'advanced',
    question: 'Mengapa arsitektur cloud disarankan mengimplementasikan strategi Multi-Availability Zone (Multi-AZ Deployment) untuk menampung infrastruktur database production?',
    options: ['A. Biar biaya sewa resource cloud menjadi lebih murah dan hemat energi listrik', 'B. Menjamin ketersediaan tinggi (High Availability) dan toleransi kegagalan (Fault Tolerance) jika satu data center fisik mengalami mati total', 'C. Mempercepat proses kompilasi source code aplikasi backend oleh tim developer', 'D. Mengubah otomatis database SQL menjadi database NoSQL horizontal terdistribusi'],
    correctAnswer: 1,
    explanation: 'Multi-AZ mendistribusikan resource ke beberapa Availability Zone terpisah secara fisik, menjaga aplikasi tetap berjalan jika satu AZ down.',
  },
  {
    role: 'Cloud Engineer', skillName: 'Cloud Architecture & Design', difficulty: 'advanced',
    question: 'Apa fungsi utama dari layanan Horizontal Auto-Scaling pada manajemen instans komputasi cloud (seperti AWS EC2 atau Google Compute Engine)?',
    options: ['A. Meningkatkan kapasitas core CPU dan kapasitas RAM pada satu instans server secara vertikal', 'B. Menambah atau mengurangi jumlah unit instans server secara otomatis berdasarkan grafik fluktuasi beban traffic pengguna', 'C. Melakukan backup data server ke harddisk eksternal lokal setiap jam secara mandiri', 'D. Mengubah IP Address server menjadi statis agar mudah dikenali domain luar'],
    correctAnswer: 1,
    explanation: 'Horizontal Auto-Scaling menambah/mengurangi jumlah instans berdasarkan metrik (CPU, memory, request count), mengoptimalkan biaya dan performa.',
  },
  {
    role: 'Cloud Engineer', skillName: 'Cloud Architecture & Design', difficulty: 'advanced',
    question: 'Apa peran utama dari komponen jaringan Content Delivery Network (CDN) pada arsitektur web aplikasi berbasis cloud?',
    options: ['A. Mengamankan database server dari upaya serangan brute force kata sandi', 'B. Menyimpan cache aset statis (gambar, video, css) di lokasi server edge terdekat dengan posisi geografis user guna meminimalkan latensi', 'C. Menyediakan koneksi database internal berkecepatan tinggi antar wilayah regional cloud', 'D. Mengotomatisasi penulisan script konfigurasi server web berbasis Linux Nginx'],
    correctAnswer: 1,
    explanation: 'CDN menyimpan aset statis di edge server global, melayani konten dari lokasi terdekat user, mengurangi latency dan beban origin server.',
  },
  // Cost Optimization (2 soal)
  {
    role: 'Cloud Engineer', skillName: 'Cost Optimization', difficulty: 'intermediate',
    question: 'Jenis skema pembelian komputasi cloud manakah (Cloud Compute Pricing) yang paling hemat biaya untuk menjalankan aplikasi background-job non-urgent yang bisa diinterupsi kapan saja?',
    options: ['A. On-Demand Instances', 'B. Spot Instances / Ephemeral VMs', 'C. Reserved Instances (1-3 Year Commitment)', 'D. Dedicated Host Physical Server'],
    correctAnswer: 1,
    explanation: 'Spot Instances memanfaatkan kapasitas idle cloud dengan diskon besar (hingga 90%), cocok untuk fault-tolerant dan interruptible workloads.',
  },
  {
    role: 'Cloud Engineer', skillName: 'Cost Optimization', difficulty: 'intermediate',
    question: 'Tindakan mana di bawah ini yang secara instan memberikan dampak Cost Optimization yang signifikan pada pengelolaan arsitektur cloud perusahaan?',
    options: ['A. Menghapus akun user milik tim developer yang sedang mengambil cuti kerja harian', 'B. Melakukan audit dan menghapus volume storage (EBS/Disk) yang berstatus unattached serta menonaktifkan instans server yang menganggur (idle)', 'C. Mengubah seluruh protokol transfer data API backend dari format JSON menjadi XML', 'D. Mematikan fitur firewall keamanan cloud di lingkungan staging development'],
    correctAnswer: 1,
    explanation: 'Storage unattached dan idle instances tetap dikenai biaya. Audit rutin dan pembersihan resource tidak terpakai memberikan penghematan instan.',
  },
  // Cloud Security & IAM (3 soal)
  {
    role: 'Cloud Engineer', skillName: 'Cloud Security & IAM', difficulty: 'advanced',
    question: 'Mengapa pemberian kebijakan Wildcard Access (*) pada konfigurasi Cloud IAM (Identity and Access Management) sangat dilarang di industri?',
    options: ['A. Karena akan membuat tagihan biaya cloud membengkak secara instan', 'B. Melanggar Principle of Least Privilege dan membuka celah eksploitasi seluruh aset cloud jika akun tersebut diretas', 'C. Mengakibatkan performa jaringan cloud menjadi lambat (latency tinggi)', 'D. Membuat server cloud tidak bisa diakses oleh tim internal sendiri'],
    correctAnswer: 1,
    explanation: 'Wildcard (*) memberikan akses ke semua resource. Prinsip Least Privilege mengharuskan akses minimal yang diperlukan untuk tugas spesifik.',
  },
  {
    role: 'Cloud Engineer', skillName: 'Cloud Security & IAM', difficulty: 'advanced',
    question: 'Menurut konsep Shared Responsibility Model di penyedia layanan cloud (Cloud Provider), aspek manakah yang mutlak menjadi tanggung jawab pengguna (Customer) pada layanan IaaS?',
    options: ['A. Pemeliharaan fisik hardware server komputer di gedung data center provider', 'B. Manajemen keamanan sistem operasi (OS patching), konfigurasi firewall jaringan instans, dan enkripsi data pengguna', 'C. Pembuangan limbah sisa komponen elektronik server rusak milik data center cloud', 'D. Pembaruan software hypervisor virtualisasi penampung mesin virtual cloud'],
    correctAnswer: 1,
    explanation: 'Cloud provider amankan fisik, network, hypervisor. Customer bertanggung jawab atas OS, aplikasi, firewall, dan data yang berjalan di cloud.',
  },
  {
    role: 'Cloud Engineer', skillName: 'Cloud Security & IAM', difficulty: 'advanced',
    question: 'Apa fungsi utama dari implementasi VPC Bastion Host (Jump Box) pada topologi jaringan cloud korporasi?',
    options: ['A. Menjadi server perantara yang aman untuk mengakses instans server di subnet privat via koneksi SSH/RDP terpantau', 'B. Menyimpan data cache gambar beresolusi tinggi milik website e-commerce', 'C. Mempercepat transmisi pengiriman paket data JSON antar microservices server cloud', 'D. Bertugas membagi rata beban traffic request data dari internet publik luar'],
    correctAnswer: 0,
    explanation: 'Bastion Host menyediakan akses terkontrol ke server privat. Semua sesi SSH/RDP diaudit, mencegah akses langsung dari internet ke subnet internal.',
  },
  // Serverless & Compute (2 soal)
  {
    role: 'Cloud Engineer', skillName: 'Serverless & Compute', difficulty: 'intermediate',
    question: 'Apa yang dimaksud dengan fenomena Cold Start pada layanan komputasi Serverless seperti AWS Lambda atau Google Cloud Functions?',
    options: ['A. Kondisi di mana server cloud mengalami penurunan suhu ekstrem di data center', 'B. Keterlambatan waktu respon (latency tambahan) saat fungsi dijalankan pertama kali setelah sekian lama tidak aktif karena container baru dinyalakan', 'C. Proses enkripsi database yang memakan waktu lama saat server di-boot ulang', 'D. Kegagalan sistem akibat kode aplikasi membeku (freeze)'],
    correctAnswer: 1,
    explanation: 'Cold Start terjadi saat Lambda tidak memiliki container siap pakai. Inisialisasi container + runtime menyebabkan latency tambahan (100ms–1s).',
  },
  {
    role: 'Cloud Engineer', skillName: 'Serverless & Compute', difficulty: 'intermediate',
    question: 'Apa keterbatasan arsitektur utama dari model komputasi Serverless (FaaS) yang wajib dipertimbangkan sebelum melakukan migrasi sistem backend berskala besar?',
    options: ['A. Serverless tidak mendukung penggunaan database berjenis SQL relasional sama sekali', 'B. Bersifat Stateless (tidak menyimpan state sesi) dan memiliki batas durasi maksimal waktu eksekusi fungsi (execution timeout)', 'C. Hanya bisa diprogram menggunakan satu jenis bahasa pemrograman jadul saja', 'D. Memaksa tim developer untuk membeli lisensi sistem operasi Linux server berbiaya mahal'],
    correctAnswer: 1,
    explanation: 'FaaS bersifat stateless dan punya batas timeout (AWS Lambda: 15 menit). Aplikasi stateful atau long-running task tidak cocok tanpa modifikasi.',
  },

  // ===== AI / Machine Learning Engineer =====
  // Data Preprocessing (3 soal)
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Data Preprocessing', difficulty: 'intermediate',
    question: 'Mengapa langkah Feature Scaling (seperti MinMax Standardization atau Normalization) sangat krusial dikerjakan sebelum melatih model berbasis algoritma jarak (seperti KNN atau SVM)?',
    options: ['A. Agar ukuran file dataset csv yang disimpan di server cloud menjadi terkompresi lebih kecil', 'B. Mencegah fitur bermagnitudo nilai besar mendominasi fungsi perhitungan jarak dibandingkan fitur bermagnitudo nilai kecil', 'C. Menghapus baris data duplikat secara otomatis tanpa perlu menulis syntax Python pandas', 'D. Mengubah otomatis tipe data teks kualitatif menjadi tipe data gambar beresolusi tinggi'],
    correctAnswer: 1,
    explanation: 'Algoritma berbasis jarak (Euclidean, Manhattan) sangat sensitif terhadap skala fitur. Fitur skala besar mendominasi jarak, membuat kontribusi fitur lain tidak proporsional.',
  },
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Data Preprocessing', difficulty: 'intermediate',
    question: 'Pendekatan mana di bawah ini yang paling direkomendasikan untuk menangani masalah data hilang (Missing Values) kategori bernilai numerik tanpa mengurangi jumlah baris sampel dataset secara drastis?',
    options: ['A. Mengisi sel data kosong dengan angka nol di seluruh kolom dataset terkait', 'B. Melakukan teknik Imputation dengan mengisi nilai rata-rata (mean), median, atau menggunakan algoritma pemodelan kedekatan (KNN Imputer)', 'C. Menghapus total satu baris data sampel tersebut dari tabel database utama', 'D. Membiarkan sel data kosong apa adanya agar model AI belajar memahami error'],
    correctAnswer: 1,
    explanation: 'Imputation mempertahankan ukuran dataset dengan mengisi missing values menggunakan mean/median/KNN, lebih baik dari menghapus baris yang menghilangkan informasi berharga.',
  },
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Data Preprocessing', difficulty: 'intermediate',
    question: 'Apa fungsi utama dari penerapan teknik One-Hot Encoding pada tahapan persiapan data machine learning?',
    options: ['A. Mengurangi jumlah dimensi fitur (dimensionality reduction) pada dataset teks panjang', 'B. Mengonversi variabel data kategori nominal menjadi format representasi biner angka (0 dan 1) agar bisa diproses oleh fungsi matematika model', 'C. Melakukan enkripsi pada data rahasia pengguna agar aman dari peretasan siber luar', 'D. Menggabungkan dua tabel fakta terpisah di dalam ekosistem sistem data warehouse'],
    correctAnswer: 1,
    explanation: 'One-Hot Encoding mengubah kategori menjadi vektor biner, misal [Merah, Biru, Hijau] → [1,0,0], [0,1,0], [0,0,1] tanpa imply ordinal relationship.',
  },
  // Model Training & Tuning (2 soal)
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Model Training & Tuning', difficulty: 'advanced',
    question: 'Jika sebuah model Machine Learning memiliki performa sangat akurat pada data training tetapi sangat buruk dan tidak akurat pada data testing, kondisi apa yang sedang terjadi?',
    options: ['A. Underfitting', 'B. Overfitting', 'C. Data Imbalance', 'D. Normalization Error'],
    correctAnswer: 1,
    explanation: 'Overfitting: model terlalu kompleks, menghafal noise training data alih-alih pola general. Solusi: regularisasi, lebih banyak data, simplifikasi model.',
  },
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Model Training & Tuning', difficulty: 'advanced',
    question: 'Dalam proses optimasi algoritma Gradient Descent, apa akibat fatal yang ditimbulkan jika parameter Learning Rate diatur dengan nilai yang terlalu besar?',
    options: ['A. Proses pelatihan model AI akan membutuhkan durasi waktu berhari-hari sampai selesai', 'B. Langkah optimasi melompati titik minimum global (overshooting) sehingga performa model gagal berkonvergensi atau justru berdivergensi', 'C. Model AI secara otomatis mengalami fenomena kehilangan seluruh parameter bobot aslinya', 'D. RAM pada kartu grafis GPU server akan mendadak penuh dan memicu error out-of-memory'],
    correctAnswer: 1,
    explanation: 'Learning Rate terlalu besar: gradient descent overshoot minimum, loss fluktuasi atau divergence. LR terlalu kecil: training lambat atau stuck di local minima.',
  },
  // Evaluation Metrics (3 soal)
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Evaluation Metrics', difficulty: 'advanced',
    question: 'Pada kasus pembuatan model klasifikasi AI untuk mendeteksi penyakit kanker langka, metrik evaluasi mana yang paling krusial diprioritaskan demi meminimalkan kesalahan deteksi negatif palsu (False Negatives)?',
    options: ['A. Precision', 'B. Recall / Sensitivity', 'C. Specificity', 'D. Accuracy'],
    correctAnswer: 1,
    explanation: 'Recall = TP/(TP+FN). Prioritaskan Recall untuk skenario berbahaya jika melewatkan positive (false negative), seperti deteksi kanker atau fraud.',
  },
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Evaluation Metrics', difficulty: 'advanced',
    question: 'Mengapa nilai metrik Accuracy sering kali menipu dan tidak valid digunakan untuk mengukur kehebatan model klasifikasi pada skenario Imbalanced Dataset (misal data penipuan kartu kredit hanya 0.1% dari total data)?',
    options: ['A. Karena akurasi tidak bisa menghitung tipe data angka pecahan desimal matematika', 'B. Model bodoh yang hanya menebak kelas mayoritas secara terus-menerus akan tetap mendapatkan score akurasi tinggi padahal gagal mendeteksi kelas minoritas target', 'C. Nilai akurasi otomatis turun drastis jika jumlah baris dataset melebihi satu juta baris', 'D. Metrik akurasi membutuhkan daya komputasi core GPU yang terlampau mahal untuk dihitung'],
    correctAnswer: 1,
    explanation: 'Jika 99.9% data non-fraud, model yang selalu prediksi non-fraud mendapat 99.9% accuracy tetapi 0% recall mendeteksi fraud. Gunakan Precision, Recall, F1-score.',
  },
  {
    role: 'AI / Machine Learning Engineer', skillName: 'Evaluation Metrics', difficulty: 'advanced',
    question: 'Apa makna interpretasi visual dari skor grafik Area Under the ROC Curve (AUC) yang bernilai mendekati angka 0.50 pada model klasifikasi biner?',
    options: ['A. Model memiliki kemampuan performa klasifikasi yang sempurna dan tanpa error celah sedikit pun', 'B. Kemampuan prediksi model sangat buruk, setara dengan tebakan acak/koin untung-untungan saja', 'C. Model mengalami error kompilasi internal akibat nilai fitur input terlampau tinggi', 'D. Dataset yang digunakan kekurangan data sampel berjenis data numerik kontinu'],
    correctAnswer: 1,
    explanation: 'AUC = 0.5 berarti model tidak lebih baik dari random classifier. AUC = 1.0 sempurna, AUC < 0.5 lebih buruk dari random (mungkin label terbalik).',
  },
  // MLOps & Deployment (2 soal)
  {
    role: 'AI / Machine Learning Engineer', skillName: 'MLOps & Deployment', difficulty: 'advanced',
    question: 'Apa fungsi utama dari teknik Retrieval-Augmented Generation (RAG) pada implementasi Large Language Model (LLM) di industri saat ini?',
    options: ['A. Melatih ulang LLM dari awal menggunakan GPU berkapasitas besar', 'B. Menghubungkan LLM dengan sumber basis data eksternal/dokumen perusahaan agar jawaban model lebih akurat, terkini, dan minim halusinasi', 'C. Mengubah teks petunjuk (prompt) menjadi gambar beresolusi tinggi secara otomatis', 'D. Mempercepat proses kompresi ukuran file model AI agar bisa berjalan di handphone'],
    correctAnswer: 1,
    explanation: 'RAG menggabungkan retrieval (ambil konteks dari knowledge base) + generation (LLM jawab berdasarkan konteks), mengurangi halusinasi dan meningkatkan akurasi.',
  },
  {
    role: 'AI / Machine Learning Engineer', skillName: 'MLOps & Deployment', difficulty: 'advanced',
    question: 'Di dalam siklus hidup pengelolaan sistem MLOps, apa yang dimaksud dengan fenomena Data Drift yang mewajibkan model AI untuk dilatih ulang (Retraining)?',
    options: ['A. Rusaknya server data center fisik akibat bencana banjir bandang lokal', 'B. Perubahan sifat karakteristik data masukan riil di lingkungan produksi seiring berjalannya waktu dibandingkan dengan data awal saat model dilatih', 'C. Perubahan nama struktur tabel kolom di dalam database server backend Node.js', 'D. Kebocoran kredensial akses token API rahasia milik akun cloud engineer perusahaan'],
    correctAnswer: 1,
    explanation: 'Data Drift: distribusi data produksi berubah dari data training. Model menjadi tidak akurat karena pola yang dipelajari tidak lagi relevan. Perlu retraining periodik.',
  },
];

const seed = async () => {
  console.log('Seeding roles...');

  await db.insert(roles).values(rolesData).onConflictDoNothing();
  const existingRoles = await db.select().from(roles);
  console.log(`${existingRoles.length} roles tersedia!`);

  const roleMap = existingRoles.reduce((acc, role) => {
    acc[role.name] = role.id;
    return acc;
  }, {} as Record<string, number>);

  const questionsWithRoleId = questionsData.map((q) => ({
    roleId: roleMap[q.role],
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    skillName: q.skillName,
    difficulty: q.difficulty,
    explanation: q.explanation ?? null,
  }));

  const insertedQuestions = await db.insert(quizQuestions).values(questionsWithRoleId).returning();
  console.log(`${insertedQuestions.length} questions berhasil di-seed!`);

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
