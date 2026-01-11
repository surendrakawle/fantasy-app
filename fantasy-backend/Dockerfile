# =========================
# 1️⃣ Build stage
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build TypeScript
RUN npm run build


# =========================
# 2️⃣ Production stage
# =========================
FROM node:18-alpine

WORKDIR /app

# Copy only required files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set production environment
ENV NODE_ENV=production

EXPOSE 4000

# Start production server
CMD ["node", "dist/server.js"]
