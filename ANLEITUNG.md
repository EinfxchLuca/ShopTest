# TORNADO INTERCEPTORS - Anleitung

## 🎯 Übersicht

Dies ist ein vollständiger, produktionsreifer Online-Shop als **reine Static Site**. Keine Datenbank, kein Backend – alles läuft komplett im Browser mit Vanilla JavaScript.

---

## 📁 Dateistruktur

```
ShopTest/
├── index.html              # Hauptseite
├── render.yaml             # Render-Konfiguration
├── .nojekyll               # GitHub Pages / Render Marker
├── css/
│   └── style.css           # Alle Styles (Storm-Theme)
├── js/
│   ├── config.js           # Shop-Konfiguration (Shop-Name, etc.)
│   └── app.js              # Hauptlogik (Warenkorb, Produkte)
├── data/
│   └── products.json       # Produktdatenspeicher (HIER PRODUKTE HINZUFÜGEN)
└── assets/                 # Platz für lokale Bilder (optional)
```

---

## 🛒 Kernfunktionen

✅ **Warenkorb mit localStorage** – Bleibt nach Reload erhalten
✅ **Produkt-Verwaltung über JSON** – Einfach zu bearbeiten
✅ **Responsive Design** – Funktioniert auf Handy, Tablet, Desktop
✅ **Storm/Tornado-Theme** – Modernes, dunkles Design
✅ **Keine Abhängigkeiten** – Nur HTML, CSS, JavaScript
✅ **Production-Ready** – Sofort einsatzbereit

---

## 🔧 Konfiguration

### 1️⃣ Shop-Namen ändern

**Datei:** `js/config.js`

```javascript
const CONFIG = {
  SHOP_NAME: "TORNADO INTERCEPTORS",           // ← Shop-Name
  SHOP_CLAIM: "Premium 3D-gedruckte Extreme-Weather-Modelle",  // ← Slogan
  CURRENCY: "EUR",                              // ← Währung
  CURRENCY_SYMBOL: "€",                         // ← Symbol
  TAX_RATE: 0.19,                               // ← MwSt.
};
```

**Sofort wirksam!** Keine Build-Schritte nötig.

---

### 2️⃣ Produkte hinzufügen / ändern

**Datei:** `data/products.json`

Beispiel eines Produkts:

```json
{
  "id": 1,
  "name": "Tornado Interceptor Pro",
  "price": 49.99,
  "description": "Hochdetailliertes 3D-gedrucktes Tornado-Modell...",
  "image": "https://images.unsplash.com/...",
  "category": "Premium"
}
```

**Felder:**
- `id` – Eindeutige Nummer (nicht doppeln!)
- `name` – Produktname
- `price` – Preis (in EUR oder konfigurierter Währung)
- `description` – Produktbeschreibung
- `image` – Bild-URL oder lokaler Pfad
- `category` – Badge-Text (z.B. "Premium", "Starter", "Zubehör")

**Lokal verfügbare Bilder:**
1. Bilder in den `assets/` Ordner legen
2. In `products.json` Pfad ändern: `"image": "./assets/tornado-pro.jpg"`

**Beispiel – Neues Produkt hinzufügen:**

```json
{
  "id": 7,
  "name": "Mein Neues Produkt",
  "price": 99.99,
  "description": "Eine großartige Beschreibung",
  "image": "./assets/mein-bild.jpg",
  "category": "Neu"
}
```

---

## 🚀 Deployment auf Render.com

### Schritt 1: Repository vorbereiten

```bash
# Im ShopTest-Ordner
git init
git add .
git commit -m "Initial commit - Tornado Interceptors Shop"
git remote add origin https://github.com/DEIN_USERNAME/tornado-shop.git
git push -u origin main
```

### Schritt 2: Auf Render deployen

1. Gehe zu [render.com](https://render.com)
2. Klicke auf **"New"** → **"Static Site"**
3. Verbinde dein GitHub-Repository
4. Stelle diese Einstellungen ein:
   - **Name:** `tornado-interceptors` (oder gewünscht)
   - **Build Command:** `echo "Static site - no build needed"`
   - **Publish directory:** `./`
5. Klicke **"Create Static Site"**

Render deployt automatisch! Deine Seite ist dann unter `https://tornado-interceptors.onrender.com` erreichbar.

### Schritt 3: Auto-Deploy aktivieren

- Render updated automatisch, wenn du Änderungen pusht
- Produkte: Bearbeite `data/products.json`, commit und push
- Config: Bearbeite `js/config.js`, commit und push

---

## 🎨 Design anpassen

### Farben ändern

**Datei:** `css/style.css`

Oben findet sich eine **Farbvariablen-Section**:

```css
:root {
  --color-primary: #1a1a1a;        /* Dunkles Hintergrund */
  --color-accent: #16a3d6;         /* Akzent-Blau */
  --color-accent-light: #1e90ff;   /* Helles Blau */
  /* ... weitere Farben */
}
```

Einfach ändern und Browser-Reload – alles passt sich an!

### Animationen / Effekte

Die Storm-Effekte (Wind-Linien, Tornado-Rotation) sind in den keyframes definiert:
- `windShift` – Hintergrund-Animation
- `tornadoRotate` – Logo-Rotation
- `stormFlash` – Header-Flash-Effekt

Zum Deaktivieren: `animation: none;` in CSS setzen.

---

## 📊 Warenkorb-Verwaltung

Der Warenkorb nutzt **localStorage** des Browsers:

- **Speicherung:** Automatisch, wenn Produkte hinzugefügt werden
- **Abruf:** Beim Neuladen der Seite wiederhergestellt
- **Daten:** Nur lokal, nicht an Server gesendet
- **Checkout:** Derzeit Platzhalter – kann mit Stripe/PayPal erweitert werden

**localStorage löschen (für Tests):**

```javascript
// In Browser-Konsole eingeben:
localStorage.removeItem('tornado_cart');
location.reload();
```

---

## 🔐 Sicherheit & Best Practices

✅ **Kein Backend = Keine Sicherheitsrisiken** bei Datenspeicherung
⚠️ **Preise sind editierbar** – Das ist bei Static Sites normal! Für echte Shops würde man ein Backend brauchen
✅ **HTTPS auf Render** – Automatisch aktiviert
✅ **Responsive** – Funktioniert auf allen Geräten
✅ **SEO-freundlich** – Proper HTML Structure

---

## 🛠️ Lokal testen

### Mit Python (falls installiert):

```bash
cd ShopTest
python -m http.server 8000
```

Dann öffne: `http://localhost:8000`

### Mit Node.js http-server:

```bash
npm install -g http-server
cd ShopTest
http-server
```

### Mit VS Code Live Server:
1. Installiere Extension **"Live Server"**
2. Rechtsklick auf `index.html` → **"Open with Live Server"**

---

## 📦 Was ist nicht enthalten?

❌ Zahlungssystem (Stripe, PayPal, etc.) – Bitte selbst integrieren
❌ Versandkalkulation
❌ Benutzerkonto-System
❌ Bestellhistorie
❌ Email-Benachrichtigungen

Diese könnten über ein Backend (z.B. mit Node.js, Python Flask) erweitert werden.

---

## 🤔 FAQ

**F: Kann ich Produkte ohne JSON hinzufügen?**
A: Nein, nur über `data/products.json`. Das ist so gewünscht – einfach zu verwalten.

**F: Werden Preise in der JSON-Datei sicher übertragen?**
A: Die Datei wird vom Client heruntergeladen. Für echten E-Commerce mit sensiblen Daten braucht man ein Backend.

**F: Kann ich eigene Bilder hochladen?**
A: Ja! Bilder in `assets/` Ordner legen, Pfad in JSON aktualisieren.

**F: Wie lange hält Render die Seite aktiv?**
A: Die kostenlose Version schläft nach 15 Min Inaktivität. Premium hält sie immer an.

**F: Kann ich eine eigene Domain nutzen?**
A: Ja! Render erlaubt Custom Domains (kostenpflichtig). In den Render-Settings konfigurierbar.

---

## 💡 Nächste Schritte

1. ✅ Shop-Namen in `js/config.js` ändern
2. ✅ Produkte in `data/products.json` anpassen
3. ✅ Farben in `css/style.css` anpassen (optional)
4. ✅ Lokal mit Live Server testen
5. ✅ Auf GitHub pushen
6. ✅ Auf Render deployen
7. ✅ Domain konfigurieren (optional)

---

## 📞 Support

Bei Fragen zum Code oder Fehlern:
1. Browser-Konsole öffnen (F12) – Fehler checken
2. Netzwerk-Tab (F12) – Sicherstellen, dass `products.json` lädt
3. localStorage checken – `localStorage.getItem('tornado_cart')`

---

**Viel Erfolg mit deinem Shop! 🚀⚡**
