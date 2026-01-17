# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build static Next.js site
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Runner - Serve with Caddy (301-friendly redirects)
FROM caddy:2-alpine

# Copy built static site and Caddyfile
COPY --from=builder /app/out /srv/http
COPY Caddyfile /etc/caddy/Caddyfile

# Default Caddy port (matches Fly internal_port)
EXPOSE 8043
