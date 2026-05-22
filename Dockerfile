FROM node:18-alpine

WORKDIR /app

# Copy file package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install semua dependencies (termasuk typescript untuk build)
RUN npm install

# Copy seluruh source code proyek ke dalam docker
COPY . .

# Jalankan perintah compile TypeScript ke JavaScript (menghasilkan folder dist)
RUN npm run build

# Informasikan port yang digunakan (Railway akan override ini secara dinamis, tapi ini baik untuk dokumentasi)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi setelah berhasil di-build
CMD ["node", "dist/app.js"]