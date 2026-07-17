# Pixan Evidence Center

Julkinen markkina-, tulli-, verotus- ja todistusaineiston tilannekeskus.

## Julkisen näkymän rajaus

- vain avoimet viranomais- ja instituutiolähteet
- ei luottamuksellista patenttistrategiaa tai sähköpostien sisältöä
- virallinen myynti-/verosarja, tulliproxy ja laskennallinen skenaario erotetaan toisistaan
- puuttuva tieto esitetään puuttuvana, ei nollana

## Datan päivitys

Dashboard-data muodostetaan Pixan-evidenssiprojektin CSV-aineistosta:

```sh
python3 scripts/build_data.py
```

Tämän jälkeen tarkistetaan `data/dashboard.json` ja `data.generated.js`, kopioidaan uusin pankkiliite `assets/`-kansioon ja julkaistaan muutos `main`-haaraan. GitHub Pages julkaisee sivun automaattisesti suoraan `main`-haarasta.

Vuoden 2025 Eurostat Comext DS-045409 -reittimatriisin johdetut CSV:t, hakumanifesti ja raakavastaukset julkaistaan `data/eurostat/`-kansiossa. Jäsenmaan WORLD-tuonti täsmäytetään intra-EU- ja extra-EU-osaan; EU-27:n kokonaisluvussa käytetään vain extra-EU-virtaa.

Japan Customs / Ministry of Finance -viranomaisen vuoden 2025 tarkistettu 9-numeroinen tuontisarja julkaistaan `data/japan/`-kansiossa. Kaksi alkuperäistä e-Stat-CSV:tä säilytetään `data/raw/japan_customs/`-kansiossa. Auditointi täsmäyttää jokaisen valitun nimike–alkuperä-rivin vuosisumman 12 kuukauteen ja säilyttää raakatiedostojen SHA-256-tarkistussummat.

U.S. Census Bureaun vuoden 2025 HTS10-aineiston johdetut summat, alkuperämaat, nimikeluettelo ja auditointimanifesti julkaistaan `data/usa/`-kansiossa. Julkiseen repoon kopioidaan myös kompaktit kiinteälevyiset lähdeotteet; 292 Mt:n alkuperäisarkisto jää paikalliseen datahuoneeseen ja lukitaan manifestissa SHA-256-tunnisteella. Auditointi täsmäyttää 236 valittua detaljiriviä kansallisiin määriin, customs- ja CIF-arvoihin, kulutukseen luovutukseen sekä laskettuun tulliin.

Statistics Canadan vuoden 2025 CIMT-aineiston HS10-tuontisummat, alkuperämaat, tullausmaakunnat, kuukausisarja sekä HS8-vienti-/jälleenvientilaskelma julkaistaan `data/canada/`-kansiossa. Julkiseen repoon kopioidaan kompaktit HS10-, HS6- ja vientilähdeotteet; kolme alkuperäistä ZIP-arkistoa jäävät paikalliseen datahuoneeseen ja niiden SHA-256-tunnisteet julkaistaan manifestissa. Auditointi täsmäyttää 608 valittua HS10-riviä viralliseen HS6-sarjaan 564 tarkastusavaimella ilman eroa.

## Todistustasot

- A: viranomaisen myynti-, vero-, ilmoitus- tai toimitusraportti
- B: virallinen tulli- tai muu rajavirta sekä auditoitu WHO-maaprofiili
- C: täydentävä kaupallinen tai muu lähde

Sivusto ei ole oikeudellinen lausunto eikä tilintarkastettu markkina-arvio.
