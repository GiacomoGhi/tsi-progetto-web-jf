# tsi-progetto-web-jf

## IDE Suggested Extensions for development

In Visual Studio Code click the Extensions button in the Activity Bar and install the following extensions:

- Babel ES6/ES7
- Better Comments
- Debugger for Chrome
- DotENV
- ESLint
- Prettier Code Formatter


## Setup

1. Installare le dipendenze necessarie nei due progetti 'front-end/' e 'back-end/': npm install.

2. Nella root del progetto assicurarsi di avere i file .env

3. Lanciare i servizi docker nella cartella .\back-end\devops\postgresql: build dockerfile e docker compose up.

4. Lanciare l'app backend con il seguente comando dalla root del progetto back-end/: 'npm run start' o 'npm run dev' (watch mode)   

6. Per avviare la web app: lanciare il comando npm run start nella root del progetto front-end/.

7. Popolare db con dati di prova: utilizzando un db manager di propria scelta connettersi al db postgres e lanciare lo script di insert './Documentazione/02_Specifiche/DB/test_insert.sql' - Da notare: il modulo TypeOrm dell'applicativo backend si occuperà in automatico di creare lo schema del db, questo file contiene solamente dei comandi di insert.


## Stack RPNeT
- React (front-end)
- PostgreSQL (database, on a Docker container)
- NestJS (back-end)
- TypeOrm (db manager)
  
