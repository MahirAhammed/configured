# Configured

A config file generator for common developer stacks. Pick a framework, choose your options, and download ready-to-use configuration files.

**Live Demo:** 

## Supported generators

| Generator | Output files | Status |
|-----------|-------------|--------|
| Spring Boot | `application.properties`, `application.yml` | Live |
| FastAPI | `.env`, `config.py` | Coming soon ... |
| Docker | `docker-compose.yml`, `Dockerfile`, `.dockerignore` | Coming soon ... |
| Express | `.env`, `db.js` | Coming soon... |
| .gitignore | `.gitignore` | Coming soon... |

## Tech stack

- React + Vite
- React Router
- JSZip (client-side file generation)
- Deployed on Vercel

## Running locally

```bash
git clone https://github.com/your-username/configured.git
cd configured
npm install
npm run dev
```