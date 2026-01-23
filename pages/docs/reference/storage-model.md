---
title: Storage model (Studio SQLite, CLI)
description: Where data is stored for the Studio app and the CLI, and how to operate in different modes.
---

# Storage model

Studio
- Stores workspaces locally using SQLite in your user data directory
- No background syncing or cloud dependency
- Files and exports are Git‑friendly (YAML flows, JSON reports)

CLI
- Stateless by default: reads flows from the working directory and writes reports to files/stdout
- Works in CI without any persistent storage
- Use environment variables or CI secrets to supply credentials at run time

Related docs
- Data storage overview: /docs#data-storage
- CLI outputs and reports: /docs/reference/cli#output-formats
