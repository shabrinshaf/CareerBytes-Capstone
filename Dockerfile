FROM node:18-alpine

WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install SEMUA dependencies tanpa terkecuali
RUN npm install --include=dev

# Copy seluruh source code proyek
COPY . .

# Jalankan perintah build untuk menghasilkan folder dist/app.js
RUN npm run build

EXPOSE 3000

# Jalankan file dist/app.js (sesuai dengan struktur src/app.ts kamu)
CMD ["node", "dist/app.js"]