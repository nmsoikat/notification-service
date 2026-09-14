# --- STAGE 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package management files
COPY package*.json ./

# Install all dependencies (including devDependencies needed to build)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the NestJS application (outputs to /dist)
RUN npm run build

# Remove development dependencies to keep the image lean
RUN npm prune --production

# --- STAGE 2: Production ---
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# Use the non-root node user for security
USER node

# Expose the default NestJS port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
