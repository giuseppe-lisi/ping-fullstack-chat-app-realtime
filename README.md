# 💬 Ping - Realtime Chat App

Ping è un'applicazione di messaggistica istantanea moderna, fluida e focalizzata sull'esperienza utente in tempo reale. [cite_start]Il progetto adotta un'architettura **Full-Stack JavaScript (MERN + Socket.io)**, separando nettamente la logica di Backend da quella di Frontend (`src`)[cite: 37, 38, 41].

👉 **Demo Live:** https://ping-8e9m.onrender.com/login
👉 **Repository Principale:** [giuseppe-lisi/ping-fullstack-chat-app-realtime](https://github.com/giuseppe-lisi/ping-fullstack-chat-app-realtime)

---

## Stack Tecnologico

[cite_start]L'applicazione è stata sviluppata integrando soluzioni moderne per garantire performance, scalabilità e sicurezza[cite: 37]:

* [cite_start]**Backend:** Node.js [cite: 37][cite_start], Express.js [cite: 37][cite_start], Socket.io (Gestione WebSocket in tempo reale)[cite: 37].
* [cite_start]**Database & ORM:** MongoDB (Cloud Cluster) [cite: 61] [cite_start]con Mongoose[cite: 73].
* [cite_start]**Frontend:** React [cite: 37][cite_start], JavaScript (ES6+), Tailwind CSS [cite: 37] + [cite_start]daisyUI (per uno sviluppo rapido ed efficiente dell'interfaccia)[cite: 560].
* [cite_start]**Gestione dello Stato & Tools:** Zustand (Stato globale leggero senza la complessità della Context API di React) [cite: 562][cite_start], Axios, Lucide React (Icone) [cite: 563][cite_start], React Hot Toast (Notifiche push UI)[cite: 562].

---

## 🛠️ Caratteristiche Principali & Dettagli Tecnici

### 1. Architettura di Rete & Autenticazione Sicura
* [cite_start]**Gestione delle Sessioni (JWT):** Al momento del login o della registrazione viene generato un token JWT[cite: 155, 233, 282]. [cite_start]Questo viene iniettato nei client tramite **Cookie HttpOnly** con policy `SameSite: strict` [cite: 316, 318, 319][cite_start], proteggendo l'applicazione da attacchi di tipo XSS e CSRF[cite: 318, 319].
* [cite_start]**Middleware di Protezione (`protectRoute`):** Ogni richiesta successiva sui dati sensibili (come l'aggiornamento del profilo o l'invio di messaggi) è protetta da un middleware centralizzato che decodifica il token, valida l'identità dell'utente su MongoDB e ne nega l'accesso se non autenticato[cite: 306, 308, 310, 326].
* **Sicurezza delle Password:** Le password degli utenti non vengono mai salvate in chiaro. [cite_start]Viene utilizzato il pacchetto `bcryptjs` per applicare processi di **Salting (10 round)** e **Hashing asincrono**[cite: 134, 143, 194, 195].

### 2. Struttura dei Dati (MongoDB & Mongoose Models)
[cite_start]Il database è strutturato su relazioni chiare espresse tramite schemi Mongoose[cite: 73, 92, 411]:
* [cite_start]**User Model:** Gestisce le informazioni dell'utente (`fullName`, `email` unica, `password` hashata, `profilePic` e i `timestamps` per tracciare la data di iscrizione)[cite: 95, 96, 100, 103, 110, 121, 128].
* [cite_start]**Message Model:** Gestisce il flusso dei messaggi legando i campi `senderId` e `receiverId` direttamente al modello User tramite riferimenti nativi `ObjectId` di Mongoose, supportando messaggi di testo e immagini[cite: 419, 420, 422, 427, 429, 431, 437, 443, 450].

### 3. Logica delle API & Query Ottimizzate
* [cite_start]**Sidebar Dinamica (`getUsersForSidebar`):** La query esclude l'utente attualmente loggato (`$ne: loggedUserId`) e fa una proiezione per escludere il campo password (`.select("-password")`), proteggendo i dati sensibili prima di inviarli al frontend[cite: 475, 478, 479, 480].
* [cite_start]**Recupero Chat (`getMessages`):** Sfrutta l'operatore `$or` di Mongoose per estrarre in modo bidirezionale solo ed esclusivamente i messaggi scambiati tra i due utenti specifici nella conversazione corrente, isolando la chat da terzi[cite: 531, 532, 555].

### 4. Integrazione con Cloudinary (Bucket Immagini)
* [cite_start]Il profilo utente supporta il caricamento di immagini[cite: 356]. [cite_start]Invece di appesantire il database memorizzando file binari, l'applicazione sfrutta **Cloudinary** come bucket[cite: 357]. [cite_start]Il server intercetta il file, lo carica in cloud in modo sicuro e salva nel profilo utente esclusivamente la stringa dell'URL sicuro restituito (`secure_url`)[cite: 358, 359, 391, 394].

### 5. Frontend ed Esperienza Utente
* [cite_start]**Routing & Layout:** Organizzato tramite `react-router-dom` con un'interfaccia responsive[cite: 569]. [cite_start]Un componente `<Toaster />` globale è posizionato alla radice dell'app per attivare notifiche toast immediate da qualsiasi sotto-componente[cite: 570].
* [cite_start]**CORS Abilitato:** Configurazione del middleware CORS lato backend per consentire lo scambio di credenziali e cookie in ambiente di sviluppo locale ed evitare blocchi del browser[cite: 564, 566].

---

## 📂 Struttura delle Cartelle

```text
ping/
├── backend/                  # Logica Server Node/Express
│   ├── src/                  # Codice sorgente (Controllers, Models, Middleware)
│   ├── index.js              # Entry point del server
│   ├── package.json
│   └── .env                  # Variabili d'ambiente (Porta, MongoDB URI, JWT Secret)
└── frontend/                 # Interfaccia utente React
    ├── src/
    │   ├── assets/           # Media e stili statici
    │   ├── App.jsx           # Gestione delle rotte e layout base
    │   └── main.jsx          # Entry point di React
    ├── package.json
    └── tailwind.config.js
