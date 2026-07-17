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

## Todistustasot

- A: viranomaisen myynti-, vero-, ilmoitus- tai toimitusraportti
- B: virallinen tulli- tai muu rajavirta sekä auditoitu WHO-maaprofiili
- C: täydentävä kaupallinen tai muu lähde

Sivusto ei ole oikeudellinen lausunto eikä tilintarkastettu markkina-arvio.
