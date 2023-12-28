# tsi-progetto-web-jf

## IDE Suggested Extensions

In Visual Studio Code click the Extensions button in the Activity Bar and install the following extensions:

- Babel ES6/ES7
- Better Comments
- Debugger for Chrome
- DotENV
- ESLint
- Prettier Code Formatter


## Dev Setup

1. Install dependencies: npm install.

2. Nella root del progetto assicurarsi di avere i file .env

3. Lanciare i servizi docker specificati nel readme del backend, lanciare anche il servizio api locale del backend e se non è stato compreso nei servizi docker.

4. Per avviare la web app: lanciare il comando npm run start nella root del progetto.


## Stack ARPNeT
- Axios (API) + React (GUI)
- PostgreSQL (on a Docker container)
- NestJS (bak-end and front-end Node)
- TypeScript (instad of JavaScript)


## StartUp

1. **DB** - On Docker Desktop App, Run the Docker container (tsi-progetto-web/tsi-progetto-postgresql)
2. **Application Server** (back-end Node) - On VS Code, Run the back-end DEV Script (*maintain running terminal active for all time long*)
3. **Wsb Server** (front-end Node) - On VS Code, Run the back-end START Script (*maintain running terminal active for all time long*)

