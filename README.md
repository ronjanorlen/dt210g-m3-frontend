# DT210G Fördjupad Frontend-utveckling Moment 3
## Skidfabriken - Lagerhantering
Denna applikation är en SPA (Single Page Application) som är byggd med React och TypeScript. Projektet är ett enkelt lagerhanteringssystem där användare kan hantera ett skidlager. På startsidan listas alla skidor som Skidfabriken har och besökare kan klicka in på varje produkt för att läsa mer. 

## Funktionalitet
* Publik del med lista över alla skidor
* Dynamiska routes för att visa enskild skida
* Publik sida för att logga in
* Skyddad sida för inloggade användare för hantering av skidor
* Sökfunktion för att söka efter skidor
* Huvudmeny som ändras baserat på om användaren är inloggad eller inte 
* Responsiv design för små och stora enheter

### För inloggad användare:
* Lägga till nya skidor
* Redigera befintliga skidor
* Radera skidor

## Komponenter
Huvudsakliga komponenter som hanterar innehåll är:
* ProductFrom: Formulär för att lägga till en ny eller redigera en befintlig produkt
* ProductTable: Tabell över samtliga produkter
* ProductSearch: Sökruta för att söka produkt  

Utöver dessa finns även komponenter för header, footer och hantering av den skyddade sidan.

## Sidor
* HomePage: Startsida med text och bild samt listning av samtliga produkter och sökruta (oskyddad)
* ProductInfo: Sida för enskild produkt (oskyddad)
* LoginPage: Sida för att logga in (oskyddad)
* ProductPage: Hantering av samtliga produkter, hämtar in formulär, tabell och sökruta (skyddad)


## Backend
Applikationens backend-sida är byggt med Hapi.js som ansluter till en MongoDB-databas och använder Mongoose-schema för lagring av data. API:et har full CRUD-funktionalitet med autentisering för skyddade routes. 

## Publicering
API:et är publicerat till render och webbplatsen har publicerats till Netlify.

## Skapad:
**Av:** Ronja Norlén  
**Kurs:** Fördjupad frontend-utveckling  
**Program:** Webbutveckling  
**Skola:** Mittuniversitetet 
