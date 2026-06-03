// Excalidraw in eine normale Quarto-Seite einbetten.
//
// "react" und "react-dom" kommen ueber die Import-Map in header.html.
// Excalidraw selbst laden wir direkt von esm.sh, mit ?external=react,react-dom,
// damit es NICHT sein eigenes React mitbringt, sondern das aus der Import-Map nutzt.

import React from "react";
import { createRoot } from "react-dom/client";
import * as ExcalidrawLib from "https://esm.sh/@excalidraw/excalidraw@0.18.1?external=react,react-dom";

// Excalidraw laedt Schriften und Uebersetzungen zur Laufzeit nach.
// Dieser Pfad sagt ihm, woher. Bei Problemen mit fehlenden Schriften ist
// das die erste Stelle zum Anpassen.
window.EXCALIDRAW_ASSET_PATH =
  "https://esm.sh/@excalidraw/excalidraw@0.18.1/dist/prod/";

const host = document.getElementById("econ-canvas");

if (host) {
  const root = createRoot(host);
  root.render(
    React.createElement(ExcalidrawLib.Excalidraw, {
      // Deutsche Oberflaeche. Faellt automatisch auf Englisch zurueck,
      // falls die Sprachdatei nicht laedt.
      langCode: "de-DE",
      // initialData bleibt vorerst leer -> leere Zeichenflaeche.
      // Hier kommt spaeter das Angebot/Nachfrage-Template rein
      // (ueber ExcalidrawLib.convertToExcalidrawElements([...])).
    })
  );
}
