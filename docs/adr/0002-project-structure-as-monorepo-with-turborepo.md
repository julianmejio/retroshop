# 2. Project structure as monorepo with Turborepo

Date: 2026-09-18

## Status

Accepted

## Context

Managing multiple apps and shared code (UI components, types, configs) across separate repositories creates high maintenance overhead, code duplication, and version mismatch issues during development.

## Decision

We will adopt a **monorepo architecture** using **Turborepo** and package manager workspaces (`apps/` and `packages/`). Turborepo will handle task orchestration and build caching, while internal packages will be linked directly without publishing to a registry.

## Consequences

- **Positive:** Easy code sharing across apps, faster local/CI builds via caching, atomic multi-project commits, and centralized tooling.
- **Negative:** Larger repository size and increased initial setup complexity.
- **Mitigation:** Use strict package boundary rules and contracts.
