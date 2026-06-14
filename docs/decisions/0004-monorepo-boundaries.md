# ADR 0004 - Repository Boundary Consolidation

Current State

packages/simulations currently imports repository implementations
from apps/web/src/lib/repositories.

Reason

This approach accelerated prototyping during the hackathon.

Future Direction

Move shared persistence logic into:

packages/core

Benefits

- Cleaner dependency graph
- Better workspace isolation
- Improved testability
- Easier service extraction