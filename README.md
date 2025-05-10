# Blog Front-end

Frontend React per un'applicazione blog moderna e responsive.

**Puoi vedere il sito live [Qui](https://6-node-express-mongo-db-ch-1-front-end.vercel.app/) 🌐**.

![Cover del progetto](src/assets/cover.jpg)

## 🚀 Caratteristiche

- Interfaccia utente moderna e reattiva
- Sistema di autenticazione utenti
  - Login sicuro con JWT
  - Autenticazione con Google
  - Registrazione nuovo utente (locale e Google)
  - Protezione delle funzionalità sensibili
- Sistema completo di gestione articoli
  - Visualizzazione di tutti i post
  - Ricerca dei post per titolo
  - Filtro dei post per autore
  - Creazione di nuovi post con editor ricco
  - Upload immagini integrato
  - Modifica e eliminazione dei post esistenti
  - Sistema di commenti interattivo
    - Aggiunta di nuovi commenti
    - Visualizzazione commenti per post
    - Modifica e eliminazione dei propri commenti
    - Interfaccia utente intuitiva per la gestione dei commenti
- Gestione post personalizzata
    - Interfaccia dedicata per modifica/eliminazione dei propri post
    - Controlli di autorizzazione visivi
    - Conferma prima dell'eliminazione dei post
- Sistema di autori
  - Visualizzazione profilo autore
  - Upload e gestione avatar
  - Lista dei post per autore
  - Avatar personalizzati
- Design completamente responsive
- Sistema di ricerca avanzato
  - Ricerca per titolo
  - Ricerca per autore
  - Risultati in tempo reale

## 🛠 Tecnologie

- React 18
- React Bootstrap
- React Router DOM
- Draft.js per l'editor di testo ricco
- React Icons
- Cloudinary per gestione immagini

## 🖼️ Mockup

![Screenshot dell'applicazione](src/assets/ss_main.png)

## 📦 Installazione

```bash
npm install
```

## ⚙️ Configurazione

Crea un file `.env` nella root del progetto:

```
REACT_APP_API_URL= # URL del backend server
SENDGRID_API_KEY= # Chiave API di SendGrid
ADMIN_EMAIL= # Email per notifiche dei nuovi post
FRONTEND_URL= # URL del frontend
GOOGLE_CLIENT_ID= # ID del client Google per OAuth 2.0
GOOGLE_CLIENT_SECRET= # Segreto del client Google per OAuth 2.0
```

## 🚀 Avvio

```bash
npm start
```

L'applicazione sarà disponibile su http://0.0.0.0:3000

## 👤 Autore
Progetto creato da [Henry](https://github.com/henry8913) per scopi didattici.

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file LICENSE per i dettagli.