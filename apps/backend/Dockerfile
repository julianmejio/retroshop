# syntax=docker/dockerfile:1
ARG NODE_VERSION=24
ARG PNPM_VERSION=12.4.2

FROM node:${NODE_VERSION}-alpine AS pruner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY . .
RUN pnpm dlx turbo prune backend --docker

FROM node:${NODE_VERSION}-alpine AS installer
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY --from=installer /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .

RUN pnpm dlx turbo run build --filter=backend

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nestjs

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

USER nestjs
EXPOSE 3001

WORKDIR /app/apps/backend
CMD ["node", "dist/main.js"]