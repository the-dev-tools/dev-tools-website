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

# Stage 3: Runner - Serve with gostatic
FROM pierrezemb/gostatic

# Copy built static site into the container
COPY --from=builder /app/out /srv/http

# Default gostatic port
EXPOSE 8043

# Run the server
CMD ["-port", "8043", "-path", "/srv/http"]
