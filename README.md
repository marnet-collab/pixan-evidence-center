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

Kiinan GACC-reitin julkinen manifesti julkaistaan `data/china/`-kansiossa. Se todentaa maksuttoman virallisen palvelureitin, kansallisen vastaanottajan, 2025 HS8 -nimikkeet 85434000/24041200/24041910/24041990, hakemuksen tarkistussummat ja sen, että numeerista tuotetason tulliaineistoa ei ole vielä saatu. Varsinaista hakemuslomaketta tai yrityksen rekisteritodistusta ei julkaista sivustolla.

Korea Customs Servicen vuoden 2025 julkiset HS6-vuosi-, kuukausi- ja alkuperämaasarjat sekä virallinen HSK10-luokitus julkaistaan `data/korea/`-kansiossa. Auditointi hyväksyy 24 kuukausi- ja alkuperämaatäsmäytystä virallisen taulukon kokonaiskilogramman ja tuhannen USD:n komponenttipyöristyksen rajoissa. HSK10 2404121000 ja 2404199010 ovat virallisesti sähkösavukenesteen nimikkeitä, mutta niiden erillisiä kauppa-arvoja ei johdeta HS6-aggregaateista ilman Itemtrade API- tai viranomaisotetta.

Saksan 17.7.2026 hintaotos julkaistaan `data/germany/`-kansiossa. Se sisältää kymmenen varastossa ollutta 10 ml tuotetta yhdeltä myyjältä, parsitut Product/Offer-lähdeotteet, alkuperäisten sivujen SHA-256-tunnisteet ja kolme mekaanista stressitestiä. Täydet noin 4 Mt:n kauppasivukaappaukset säilyvät paikallisessa datahuoneessa; julkisessa repossa ovat kompaktit lähdeotteet sekä Destatisin ja Saksan verolain lähdekaappaukset. Virallinen 1,5 miljoonan litran vuoden 2025 volyymi ja lakisääteinen verokanta ovat A-tason näyttöä, mutta yhden myyjän hintaotos ja siitä laskettu 1,068–1,7925 mrd euron vaihteluväli ovat C-tason plausibiliteettitesti, eivät markkina-arvo tai ennuste.

## Todistustasot

- A: viranomaisen myynti-, vero-, ilmoitus- tai toimitusraportti
- B: virallinen tulli- tai muu rajavirta sekä auditoitu WHO-maaprofiili
- C: täydentävä kaupallinen tai muu lähde

Sivusto ei ole oikeudellinen lausunto eikä tilintarkastettu markkina-arvio.
