# ---- Base Stage ----
FROM node:18-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# ---- Build Stage ----
FROM base AS build
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN npm install -g typescript
RUN tsc

# ---- Production Stage ----
FROM node:18-slim AS production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]
