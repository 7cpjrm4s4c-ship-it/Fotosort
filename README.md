# FotoSort

**Ähnliche Bilder erkennen. Das Beste behalten. Den Rest löschen.**

FotoSort ist eine PWA (Progressive Web App) für iOS/Safari, die mit Claude KI ähnliche und doppelte Fotos in deiner Galerie findet.

## Features

- 🤖 Claude KI analysiert Bilder auf Ähnlichkeit
- 📱 iOS/Safari optimiert (PWA, installierbar)
- 🗑 Löschliste für Kurzbefehl-App
- 🔒 Bilder verlassen nie dein Gerät (nur Thumbnails zur Analyse)

## Setup

1. Repository auf GitHub hochladen
2. GitHub Pages aktivieren: **Settings → Pages → Source: main branch**
3. App unter `https://<username>.github.io/<repo>/` öffnen
4. [Anthropic API Key](https://console.anthropic.com/) eingeben und speichern
5. Bilder auswählen → Analyse starten

## Dateien

| Datei | Beschreibung |
|-------|-------------|
| `index.html` | Komplette App (Single-File) |
| `sw.js` | Service Worker für Offline-Support |
| `manifest.json` | PWA-Manifest |
| `icon-192.svg` | App-Icon (192×192) |
| `icon-512.svg` | App-Icon (512×512) |

## Hinweise

- API Key wird lokal im Browser gespeichert (`localStorage`)
- Nur Thumbnails (200×200 JPEG) werden an die Claude API gesendet
- Direktes Löschen ist aus iOS-Sicherheitsgründen nicht möglich → Löschliste für Shortcuts-App
