# 3. Technical stack of the project

Date: 2026-09-18

## Status

Accepted

## Context

We need a standardized core technology stack for developing web applications that ensures fast development speed, strong TypeScript integration, component reusability across the monorepo, and room for future high performance.

## Decision

We adopt the following core technical stack:

- **Backend:** [NestJS](https://nestjs.com/)
- **Frontend:** [Next.js](https://nextjs.org/)
- **UI/Design:** [shadcn/ui](https://ui.shadcn.com/)

## Consequences

- **Positive:** End-to-end TypeScript safety, accelerated UI development, SSR/SEO, and a structured backend architecture.
- **Negative:** Tight coupling to the React/Next ecosystem, and potentially manual maintenance of copied shadcn component code.
- **Mitigation:** Establish shared TypeScript type packages in the monorepo and define strict component custom styling guidelines.
