# Excalidraw in Quarto – Proof of Concept

Eine statische Quarto-Website mit eingebetteter Excalidraw-Zeichenfläche.
Läuft ohne Backend, ohne Login, ohne Datenbank. Hosting via GitHub Pages.

## Was hier drin ist

| Datei | Zweck |
| --- | --- |
| `index.qmd` | Die Seite: Fließtext plus die eingebettete Zeichenfläche |
| `excalidraw-mount.js` | Lädt Excalidraw und rendert es in den Container |
| `header.html` | Import-Map (legt die React-Quelle fest) |
| `styles.css` | Gibt dem Canvas-Container eine feste Höhe |
| `_quarto.yml` | Projektkonfiguration |
| `.github/workflows/publish.yml` | Auto-Deploy auf GitHub Pages |

## Lokal testen (ca. 2 Minuten)

1. Quarto installieren: https://quarto.org/docs/get-started/
2. Im Projektordner:

   ```bash
   quarto preview
   ```

   Es öffnet sich ein Browserfenster. Wenn du im unteren Bereich zeichnen
   kannst, funktioniert die Einbettung.

Du brauchst weder `npm install` noch Node. Excalidraw und React werden zur
Laufzeit von einem CDN (esm.sh) geladen.

## Auf GitHub Pages veröffentlichen

1. Den Ordner als Repository auf GitHub pushen (Branch `main`).
2. In den Repo-Einstellungen unter **Settings → Pages** als Quelle den
   Branch `gh-pages` wählen.
3. Bei jedem Push auf `main` rendert die Action die Seite und schiebt das
   Ergebnis nach `gh-pages`. Pages serviert es dann.

## Ehrlicher Stand der Prüfung

Verifiziert wurde: Die Excalidraw-Version (0.18.1), der CSS-Pfad
(`@excalidraw/excalidraw/index.css`), die Export-Namen (`Excalidraw`,
`convertToExcalidrawElements`) und die React-Peer-Version sind am echten
npm-Paket abgeglichen. Alle Konfigurationsdateien (`_quarto.yml`, der Workflow,
das Front-Matter in `index.qmd`) sind als gültiges YAML geprüft, und der
Raw-HTML-Block mit Container und Mount-Skript ist im Dokument vorhanden.

NICHT verifiziert: dass Quarto das Projekt tatsächlich zu HTML rendert, und
dass die Zeichenfläche im Browser erscheint. Grund: In der Bauumgebung ließ
sich Quarto nicht installieren (die Release-Binaries liegen hinter einem
gesperrten Host), und es stand kein Browser zur Verfügung. Beide Punkte klärt
der lokale Test oben (`quarto preview`) in zwei Minuten. Die verwendeten
Quarto-Mechanismen (Raw-HTML-Block, `include-in-header`, `css`, `resources`)
sind Standard und gut dokumentiert, aber ein echter Render-Lauf bei dir ist
der eigentliche Beweis.

Falls das Laden über das CDN zickt (esm.sh, Schriften, React-Version): Die
Alternative ist, Excalidraw einmal lokal zu bündeln und die fertige Datei
mitzuliefern, statt sie zur Laufzeit vom CDN zu holen. Dann ist die Seite
komplett selbsttragend. Sag Bescheid, dann baue ich diese Variante.
