# 💬 Ping - Realtime Chat App

Ping è un'applicazione di messaggistica istantanea moderna, fluida e focalizzata sull'esperienza utente in tempo reale. Il progetto adotta un'architettura **Full-Stack JavaScript (MERN + Socket.io)**, organizzando in modo pulito e separato la logica di Backend e di Frontend.

---

## Stack
* **Backend:** Node.js, Express.js, Socket.io (Gestione WebSocket in tempo reale).
* **Database & ORM:** MongoDB (Cloud Cluster) con Mongoose.
* **Frontend:** React, JavaScript (ES6+), Tailwind CSS + daisyUI.
* **Gestione dello Stato & Tools:** Zustand (Stato globale leggero senza la complessità della Context API di React), Axios, Lucide React (Icone), React Hot Toast (Notifiche push UI).

---

## Dettagli
* **Gestione delle Sessioni (JWT):** Al momento del login o della registrazione viene generato un token JWT. Questo viene iniettato nei client tramite **Cookie HttpOnly** con policy `SameSite: strict`, proteggendo l'applicazione da attacchi di tipo XSS e CSRF.
* **Middleware di Protezione (`protectRoute`):** Ogni richiesta successiva sui dati sensibili (come l'aggiornamento del profilo o l'invio di messaggi) è protetta da un middleware centralizzato che decodifica il token, valida l'identità dell'utente su MongoDB e ne nega l'accesso se non autenticato.
* **Sicurezza delle Password:** Le password degli utenti non vengono mai salvate in chiaro. Viene utilizzato il pacchetto `bcryptjs` per applicare processi di **Salting (10 round)** e **Hashing asincrono**.

### 2. Struttura dati (MongoDB & Mongoose)
* **User Model:** Gestisce le informazioni dell'utente (`fullName`, `email` unica, `password` hashata, `profilePic` e i `timestamps` per tracciare la data di iscrizione).
* **Message Model:** Gestisce il flusso dei messaggi legando i campi `senderId` e `receiverId` direttamente al modello User tramite riferimenti nativi `ObjectId` di Mongoose, supportando messaggi di testo e immagini (max 2mb).

### 3. API
* **Sidebar Dinamica (`getUsersForSidebar`):** La query esclude l'utente attualmente loggato (`$ne: loggedUserId`) e fa una proiezione per escludere il campo password (`.select("-password")`), proteggendo i dati sensibili prima di inviarli al frontend.
* **Recupero Chat (`getMessages`):** Sfrutta l'operatore `$or` di Mongoose per estrarre in modo bidirezionale solo ed esclusivamente i messaggi scambiati tra i due utenti specifici nella conversazione corrente, isolando la chat da terzi.

### 4. Cloudinary (Bucket Immagini)
* Il profilo utente supporta il caricamento di immagini. Invece di appesantire il database memorizzando file binari, l'applicazione sfrutta **Cloudinary** come bucket. Il server intercetta il file, lo carica in cloud in modo sicuro e salva nel profilo utente esclusivamente la stringa dell'URL sicuro restituito (`secure_url`).

### 5. Frontend ed Esperienza Utente
* **Routing & Layout:** Organizzato tramite `react-router-dom` con un'interfaccia responsive. Un componente `<Toaster />` globale è posizionato alla radice dell'app per attivare notifiche toast immediate da qualsiasi sotto-componente.
* **CORS Abilitato:** Configurazione del middleware CORS lato backend per consentire lo scambio di credenziali e cookie in ambiente di sviluppo locale ed evitare blocchi del browser.

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
