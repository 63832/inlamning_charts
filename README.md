## Grafer

\*Vue3 app som visar diagram:\*
-Diagram där du kan mata in dina betyg och se spridningen.
-Diagram som visar dig temperatur i Mariehamn senaste 10 dagarna.

\*Teknik:\*
-Vue.js 3 - JavaScript-ramverk
-Vue3-ApexCharts - Diagrambibliotek
-Open-Meteo API - Väderdata
-Vite - Build-verktyg

\* API-information \*
Applikationen använder Open-Meteo API:

Endpoint: https://api.open-meteo.com/v1/forecast
Position: Mariehamn (60°N, 20°E)
Data: Daglig max/min temperatur för senaste 9 dagarna
Tidszon: Europe/Mariehamn

\*Installation\*
-git clone [ditt-repo-url]
-cd .\[din-mapp]
-npm install --save apexcharts
-npm install --save vue3-apexcharts
-npm run dev
-gå till http://localhost:5173 i din webbläsare
