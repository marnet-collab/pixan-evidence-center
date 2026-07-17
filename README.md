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

Italian ADM:n PLI-PAT-palvelun, julkisen kuukausiraportin XLSX-mallipohjan ja vuoden 2025 veropäätösten johdetut aineistot julkaistaan `data/italy/`-kansiossa. Mallipohja sisältää kolme erillistä virtaa: myyntipisteisiin toimitetut tuotteet, verovarastoihin toimitetut tuotteet ja suoraan loppukuluttajille toimitetut tuotteet. Verovarastosiirtoja ei lisätä kulutussummaan. Italian parlamentin vuoden 2026 budjettiselvityksen taulukko 17 julkaistaan vain virallisena ennusteena: 1 107 249 007 ml ja 167 733 820 euroa eivät ole toteutunutta myyntiä tai verokertymää. Toteutuneet 2023-2025 kansalliset aggregaatit ovat edelleen pyynnössä PX-IT-001.

Puolan valtiovarainministeriön ja KAS:n johdetut aineistot julkaistaan `data/poland/`-kansiossa ja tarkat viranomaislähteet `data/raw/poland_mf/`-kansiossa. Vuoden 2023 myöhempi ZEFIR2/IAS Kraków/AIS -sarja antaa 805 441 litraa ilmoitettua laillista e-nesteen valmisteverovirtaa; sen mekaaninen verolaskelma eroaa 443,6 milj. PLN:n virallisesta verotuotosta 0,137 %. Vuoden 2025 e-nesteen verototeuma oli 993,1 milj. PLN, laitteiden 175,3 milj. PLN ja osasarjojen 2,5 milj. PLN. KAS:n 36,007 %:n vuoden 2025 osumaprosentti koskee kohdennettuja tarkastuksia eikä ole laittoman markkinan osuus. Aikaisemman ja myöhemmän vuoden 2023 määrän 8,85 %:n revisio pidetään näkyvissä ja sen syy pyydetään PX-PL-001:llä.

Alankomaiden VWS:n tilaaman Bureau Beken tutkimuksen, CBS StatLinen, Trimbos ScholierenMonitorin ja Eurostat Comextin johdetut aineistot julkaistaan `data/netherlands/`-kansiossa ja säilytetyt viranomaislähteet `data/raw/netherlands_vws/`-kansiossa. Tutkimuksen 281,548 milj. euron vuotuinen kulutusmeno on B-tason malliarvio, ei virallinen myynti-, vero- tai kassarekisterisarja. Auditointi erottaa 443 todellista vape-vastaajaa 501:n painotetusta analyysiluvusta, dokumentoi puuttuvan kyselyvastausnimittäjän ja osoittaa, että raportin 22,8 % vastaa Trimbos-taulukon alempaa 95 % luottamusrajaa eikä 24,6 % piste-estimaattia. Vuoden 2025 kapea Eurostat-kori näyttää 204,763 milj. euroa WORLD-tuontia ja 69,809 milj. euroa vientiä, mutta Rotterdam-reittiä ei muunnettu kotimaiseksi kysynnäksi. PX-NL-001 pyytää tarkat ikäsolut, SPSS-syntaksin, epävarmuusanalyysin ja EU-CEG Article 20(7) -yksiköt, millilitrat ja arvon.

Ruotsin Finansdepartementin, Skatteverketin, Folkhälsomyndighetenin, WHO:n ja Eurostat Comextin johdetut aineistot julkaistaan `data/sweden/`-kansiossa ja alkuperäiset lähdekaappaukset `data/raw/sweden_finance/`-kansiossa. Vuoden 2024 virallinen ankkuri on 26 000 litraa rekisteröityä verollista nikotiinia sisältävää e-nestettä ja 80 milj. SEK:n näytetty verotuotto. Tarkkojen verokantojen mekaaninen tulos on 80,8 milj. SEK; −1,0 %:n ero on yhteensopiva julkaisun määrä- ja tulopyöristyksen kanssa. WHO:n 69 SEK/10 ml -havaintoon perustuva 143,52–215,28 milj. SEK:n vaihteluväli on hintastressi, ei virallinen markkina-arvo. Vuoden 2025 kapean Eurostat-korin rajavirran netto on 48,611 milj. euroa, mutta sitä ei nimetä kuluttajamyynniksi. PX-SE-001 ja PX-SE-002 pyytävät FHM:n kansallisen myyntiaggregaatin sekä Finansdepartementin pyöristämättömät määrä- ja verosolut; viestejä ei ole lähetetty.

## Todistustasot

- A: viranomaisen myynti-, vero-, ilmoitus- tai toimitusraportti
- B: virallinen tulli- tai muu rajavirta sekä auditoitu WHO-maaprofiili
- C: täydentävä kaupallinen tai muu lähde

Sivusto ei ole oikeudellinen lausunto eikä tilintarkastettu markkina-arvio.
