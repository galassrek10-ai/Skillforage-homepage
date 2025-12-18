🚀 SkillForge AI

SkillForge AI è una piattaforma di formazione intelligente che utilizza l’intelligenza artificiale generativa per creare percorsi di apprendimento, simulazioni professionali e test di competenza personalizzati per aziende e individui.

L’unico strumento di formazione che pensa al futuro.

🔗 Homepage Live (Prototipo Pubblico)

Il prototipo della homepage è stato pubblicato per la visualizzazione.

CLICCA QUI PER VEDERE LA HOMEPAGE LIVE

🌍 Cos’è SkillForge AI

SkillForge AI aiuta persone e aziende a:

Colmare il skill gap

Prepararsi alle competenze del futuro

Formare team più velocemente

Migliorare performance reali sul lavoro

La piattaforma genera automaticamente contenuti formativi su misura per ogni ruolo, aggiornati in tempo reale.

✨ Funzionalità principali

🧠 Percorsi di apprendimento generati dall’AI (in 30 secondi)

🎯 Simulazioni realistiche (Sales, Support, Management, Tech)

📊 Test di competenza intelligenti

📈 Dashboard per aziende e manager

🌍 Supporto multilingua (17 lingue)

📱 Disponibile su Web e App Mobile (design fully responsive)

☁️ Deploy su Vercel – scalabile e veloce (obiettivo finale)

👥 Chi aiuta SkillForge

Aziende (PMI e Enterprise)

HR e Team Leader

Dipendenti

Studenti e persone in cerca di lavoro

Professionisti e freelance

🛠️ Stack Tecnologico (Visione Finale)

Nota: L'attuale prototipo front-end è stato realizzato con HTML/CSS/JS e Tailwind per dimostrare il design finale.

Next.js (App Router) - Per un'applicazione full-stack moderna.

React - Libreria UI per la costruzione dei componenti.

TypeScript - Per la robustezza del codice.

Tailwind CSS - Per un design rapido e responsive.

Vercel - Piattaforma di deployment.

API AI (mock / generative) - Motore di generazione dei contenuti e delle simulazioni.

Design system stile Apple / OpenAI - Estetica pulita e moderna.

🧪 Stato del progetto

🚧 Early Version / MVP Online

SkillForge è online e in fase di test con utenti reali.
Nuove funzionalità verranno rilasciate continuamente.

▶️ Come avviare il progetto in locale (per la versione Next.js)

git clone [https://github.com/tuo-username/skillforge-ai.git](https://github.com/tuo-username/skillforge-ai.git)
cd skillforge-ai
npm run dev
 
Esecuzione locale con backend proxy e Tailwind

- Installa dipendenze frontend e server:

```bash
npm install
cd server
npm install
cd ..
```

- Avvia solo frontend:

```bash
npm run dev
```

- Avvia solo backend (proxy Gemini):

```bash
cd server
npm run dev
```

- Avvia entrambi in due terminali (consigliato): frontend `npm run dev` e backend `npm run dev` dentro `server/`.

Environment variables


```bash
export GEMINI_API_KEY="your_api_key_here"
export GEMINI_MODEL="gemini-2.5-flash-preview-09-2025"
```
Windows (PowerShell)

```powershell
# Copy `.env.example` to `.env` and fill the values, or set them in the session:
$env:GEMINI_API_KEY = 'your_api_key_here'
$env:GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025'

# Then install & run:
# npm install
# cd server; npm install; cd ..
# npm run dev:all
```

Quick tip: you can copy `.env.example` to `.env` and edit it manually. The `.env` file is ignored by git.

Development with Docker (hot-reload)

If you prefer to run the app inside containers but keep hot-reload for development, use the provided `docker-compose.dev.yml` which mounts the source and runs Vite in dev mode:

```bash
docker compose -f docker-compose.dev.yml up --build

# frontend is available at http://localhost:5173 and backend at http://localhost:4000
```


Nota: non inserire le chiavi nel repository. Usa variabili d'ambiente o segreti della piattaforma di deploy.


