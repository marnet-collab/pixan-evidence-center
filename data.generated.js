window.PIXAN_DATA = {
  "meta": {
    "title": "Pixan markkina- ja evidenssikeskus",
    "updated": "2026-07-17 07:33 UTC",
    "dataDate": "2026-07-17",
    "repo": "https://github.com/marnet-collab/pixan-evidence-center",
    "disclaimer": "Ei oikeudellinen lausunto eikä tilintarkastettu markkina-arvio."
  },
  "metrics": [
    {
      "label": "Kanada 2024",
      "value": "1,161 mrd CAD",
      "detail": "Viranomaiselle raportoitu toimitusmyynti",
      "tone": ""
    },
    {
      "label": "Suomi 2025",
      "value": "3,547 milj. €",
      "detail": "E-nesteiden nettovero · 11 823,5 l",
      "tone": "gold"
    },
    {
      "label": "Saksa 2025",
      "value": "1,5 milj. l",
      "detail": "Verotetut tupakan korvikkeet, +18,2 %",
      "tone": "blue"
    },
    {
      "label": "EU-ulkoraja 2025",
      "value": "2,240 mrd €",
      "detail": "CN8 85434000 + 24041200 · extra-EU",
      "tone": "red"
    }
  ],
  "anchors": [
    {
      "grade": "A",
      "market": "Kanada",
      "title": "Valmistajien ja maahantuojien toimitusmyynti",
      "value": "1 160 753 797 CAD",
      "detail": "118 901 910 yksikköä ja 1 251 843 litraa vuonna 2024. Sisältää laitteet, osat/podit ja vaping substances -luokan.",
      "limit": "Toimitus tukkuihin ja jälleenmyyjille, ei kassamyynti kuluttajalle. Sarja voi tarkentua.",
      "source": "Health Canada · Vaping sales dashboard",
      "url": "https://health-infobase.canada.ca/substance-use/vaping/sales/"
    },
    {
      "grade": "A",
      "market": "Saksa",
      "title": "Verotetut tupakan korvikkeet / e-nesteet",
      "value": "1,5 miljoonaa litraa",
      "detail": "Destatisin mukaan verotettu määrä kasvoi 18,2 % vuonna 2025. Vuoden verokannalla 0,26 €/ml laskennallinen valmisteveropohja on noin 390 milj. €.",
      "limit": "Litramäärä ei sisällä erillisten laitteiden myyntiarvoa. 390 milj. € on verolaskelma, ei vähittäismyynti.",
      "source": "Destatis · tiedote 026/2026",
      "url": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html"
    },
    {
      "grade": "A",
      "market": "Suomi",
      "title": "E-nesteiden nettovero ja verotettu nettovolyymi",
      "value": "3 547 047 € · 11 823,492 l",
      "detail": "Verohallinnon vuoden 2025 täysi sarja: nikotiinilliset 11 802,602 litraa / 3 540 780 € ja nikotiinittomat 20,890 litraa / 6 267 €.",
      "limit": "Veroankkuri kattaa e-nesteet, ei erillisiä laitteita. PXWebin 2026 tieto on vielä osavuosi tammi–huhtikuu.",
      "source": "Verohallinto · valmisteverotilasto",
      "url": "https://vero2.stat.fi/PXWeb/pxweb/en/Vero/Vero__Valmistevero/vvt_010.px/"
    },
    {
      "grade": "B",
      "market": "EU-27",
      "title": "Virallinen extra-EU-tullivirta",
      "value": "2,240 mrd EUR",
      "detail": "Vuoden 2025 CN8 85434000 + 24041200 -tuonti EU:n ulkorajan yli. Jäsenmaiden sisäisiä saapumisia ei lisätä summaan.",
      "limit": "CIF-tulliarvo, ei kuluttajamyyntiä; ei kata EU:n kotimaista tuotantoa eikä vähittäiskaupan katetta.",
      "source": "Eurostat Comext · DS-045409",
      "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"
    }
  ],
  "report": [
    {
      "label": "GVR maailmanmarkkina 2025",
      "value": "45,7 mrd USD",
      "meaning": "Kaupallinen ennuste"
    },
    {
      "label": "GVR maailmanmarkkina 2026",
      "value": "59,2 mrd USD",
      "meaning": "+29,5 % vuodessa"
    },
    {
      "label": "GVR maailmanmarkkina 2033",
      "value": "462,1 mrd USD",
      "meaning": "Pitkän aikavälin ennuste"
    },
    {
      "label": "Kanada 2024, muunnettu",
      "value": "≈ 0,847 mrd USD",
      "meaning": "Noin 1,85 % GVR 2025 -luvusta"
    },
    {
      "label": "Kanada +29,5 % herkkyys",
      "value": "1,503 mrd CAD",
      "meaning": "Mekaaninen testi, ei ennuste"
    }
  ],
  "countries": [
    {
      "name": "Yhdysvallat",
      "sourceName": "United States",
      "status": "partial",
      "customs": "Census 10-digit HTS imports for consumption and general imports; Schedule B exports; 8543400000 plus all 240412/240419 national suffixes",
      "route": "Use country of origin; separate imports for consumption from bonded/general imports; subtract foreign exports (re-exports); compare origin exports to US imports",
      "salesSource": "FTC compulsory-process e-cigarette reports; current equivalent requires new FTC release or aggregated FDA/state excise/retail evidence",
      "current": "2025 UN Comtrade aggregate and FTC 2021 historical sales obtained; national 2025 10-digit extract not obtained",
      "missing": "Current device/refill sales by type and current 10-digit customs rows",
      "how": "Download monthly 2025 Census Merchandise Trade Imports/Exports data products or use International Trade API with Census key; request FTC aggregated 2022-2025 sales update; request state excise aggregates where vaping tax exists",
      "tax": {
        "name": "Yhdysvallat",
        "sourceName": "United States",
        "status": "no_numeric_data",
        "currency": "",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Federal and state-level current e-cigarette tax treatment must be assembled separately; WHO profile has no numeric e-liquid observation",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-usa.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2024-09-30",
          "status": "partial",
          "rate": "Ei yhtä liittovaltion e-savukeveroa; CDC:n mukaan 33 osavaltiota sekä DC Puerto Rico ja US Virgin Islands olivat säätäneet e-savukeveron",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "Osavaltiotason valmisteverolainsäädäntö",
          "caveat": "CDC-aineisto on tarkistettu viimeksi 2024 ja on päivitettävä osavaltioittain vuodelle 2026",
          "rateUrl": "https://www.cdc.gov/statesystem/factsheets/ecigarette/ECigTax.html",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Kanada",
      "sourceName": "Canada",
      "status": "verified",
      "customs": "Statistics Canada CIMT 10-digit imports and 8-digit exports; 8543400010/0090, 2404120000, 2404190000",
      "route": "Match country of origin against country of export; subtract foreign-origin re-exports using table 12-10-0182; do not treat province of clearance as consumption destination",
      "salesSource": "Health Canada VPRR Vaping sales",
      "current": "National 2023-2024 shipment sales obtained; 2025 detailed route reconciliation not obtained",
      "missing": "2025 10-digit trade, origin/export-country bridge and re-exports by vape code",
      "how": "Use CIMT web application/API at 10-digit level; obtain tables 12-10-0178-01 and 12-10-0182-01; ask Statistics Canada for commodity-level origin/export and re-export cross-tab if public table is too aggregated",
      "tax": {
        "name": "Kanada",
        "sourceName": "Canada",
        "status": "no_numeric_data",
        "currency": "CAD",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Federal/provincial vaping excise rates require current CRA verification; WHO profile has no numeric e-liquid observation",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-can.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "1,12 CAD / alkava 2 ml ensimmäisestä 10 ml:sta; sen jälkeen 1,12 CAD / alkava 10 ml; määrätyissä provinsseissa samansuuruinen lisävero",
          "taxedVolume": "not_obtained",
          "actualRevenue": "130,362 milj. CAD",
          "revenuePeriod": "1.4.2024–31.3.2025",
          "forecast": "not_obtained",
          "scope": "Koordinoitujen verosopimusten provinssien vaping-lisäveron receipts and other credits",
          "caveat": "Ei koko liittovaltion ja provinssien vaping-verotuotto; tilinpäätös on tilintarkastamaton ja luku on tax collection agreements -taulukossa",
          "rateUrl": "https://www.canada.ca/en/revenue-agency/services/tax/technical-information/excise-duty/rates.html",
          "volumeUrl": "",
          "revenueUrl": "https://www.canada.ca/en/department-finance/corporate/transparency/plans-performance/financial-statements/2025.html"
        }
      }
    },
    {
      "name": "EU-27",
      "sourceName": "EU-27",
      "status": "partial",
      "customs": "Eurostat Comext DS-045409 CN8: 85434000, 24041200, 24041910 and 24041990",
      "route": "EU total: use extra-EU imports only; member-state market: WORLD equals extra-EU origin plus intra-EU consignment; never add member-state WORLD flows to the EU total; inspect Netherlands/Belgium/Germany logistics hubs",
      "salesSource": "TPD Article 20(7) annual sales volumes held by each national competent authority through EU-CEG or national channel",
      "current": "Eurostat 2025 kapea CN8-kori: extra-EU-tuonti 2,240 mrd EUR. 2025 CN8 route matrix obtained for EU-27 and 12 member states; narrow extra-EU basket 2.240456135bn EUR; no harmonised public EU sales aggregate",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Member-state sales volumes, refill ml, device units and product type; domestic production and consumer sell-out",
      "how": "Use saved DS-045409 query and raw JSON as official customs evidence; send aggregated disclosure requests to every national EU-CEG authority using the Commission contact list; request non-identifiable annual totals by product type",
      "tax": {
        "name": "EU-27",
        "sourceName": "EU-27",
        "status": "not_applicable",
        "currency": "",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "No harmonised e-liquid excise in the WHO snapshot; use member-state rows and monitor the Commission Tobacco Taxation Directive proposal",
        "url": "https://taxation-customs.ec.europa.eu/taxation/excise-duties/excise-duties-tobacco/revision-tobacco-taxation-directive-proposal_en",
        "tier": "A",
        "period": "EU policy status; member states shown separately",
        "national": null
      }
    },
    {
      "name": "Saksa",
      "sourceName": "Germany",
      "status": "verified",
      "customs": "Eurostat Comext CN8 plus Destatis foreign trade; extra-EU origin and intra-EU consignment",
      "route": "Subtract dispatches and re-exports from hub flows; use taxed domestic volume as market anchor",
      "salesSource": "Destatis tobacco-tax statistics 73411; BVL EU-CEG annual market-share/sales reports",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 980,8 milj. EUR; intra-EU 129,7 milj. EUR ja extra-EU 851,1 milj. EUR. 2025 taxed substitutes obtained: 1.5 million litres, +18.2%; device units and sales value missing",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Device sales units/value, average retail price, EU-CEG brand/type aggregation",
      "how": "Extract GENESIS table 73411; request aggregated Article 20(7) sales from BVL; download CN8 import/export flows from Comext and Destatis; obtain official CPI/price observation for e-liquids if available",
      "tax": {
        "name": "Saksa",
        "sourceName": "Germany",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 1.75,
          "disposable1ml": 3.5,
          "open10ml": 4.95
        },
        "totalPct": {
          "closed": 27.39,
          "disposable": 21.69,
          "open": 56.37
        },
        "excisePct": {
          "closed": 11.43,
          "disposable": 5.72,
          "open": 40.4
        },
        "derivedRate": 0.2,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "1500000 L",
        "taxRevenue": "390000000 EUR calculated tax base at 0.26 EUR/ml",
        "verification": "National law verified: 0.26 EUR/ml in 2025 and 0.32 EUR/ml in 2026",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-deu.pdf",
        "tier": "B",
        "period": "WHO price/tax snapshot; national 2025 volume and rate separately verified",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0.26 EUR/ml vuonna 2025; 0.32 EUR/ml vuonna 2026",
          "taxedVolume": "1500000 L",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "2025",
          "forecast": "not_obtained",
          "scope": "Verotettu tupakan korvike-/e-nestevolyymi",
          "caveat": "390 milj. EUR on läpinäkyvä vuoden 2025 verokanta × volyymi -laskelma eikä toteutunut verokertymä",
          "rateUrl": "https://www.gesetze-im-internet.de/tabstg_2009/__2.html",
          "volumeUrl": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Ranska",
      "sourceName": "France",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and French customs data",
      "route": "Separate country of origin from EU country of consignment; subtract exports/dispatches",
      "salesSource": "Direction Generale de la Sante / EU-CEG Article 20(7)",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 347,1 milj. EUR; intra-EU 134,8 milj. EUR ja extra-EU 212,3 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual device units, refill ml and sales value; detailed route flows",
      "how": "Download France reporter rows from Comext DS-045409; request aggregated annual sales from info-industrie-vapotage@sante.gouv.fr under Article 20(7), excluding company-identifiable detail",
      "tax": {
        "name": "Ranska",
        "sourceName": "France",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 2.17,
          "disposable1ml": 2.37,
          "open10ml": 3.43
        },
        "totalPct": {
          "closed": 16.67,
          "disposable": 16.67,
          "open": 16.67
        },
        "excisePct": {
          "closed": 0.0,
          "disposable": 0.0,
          "open": 0.0
        },
        "derivedRate": 0.0,
        "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current national treatment must be rechecked after the 2025 EU-wide WHO snapshot",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-fra.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0 EUR/ml erillistä e-nestevalmisteveroa vuoden 2026 virallisessa tupakkatuotteiden valmisteveroluettelossa",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "Légifrancen vuoden 2026 tyhjentävä tupakkatuotteiden valmisteverotaulukko ja Douanen veroluokkakuvaus; e-neste ei ole veroluokka",
          "caveat": "Nollakanta on dokumentoitu oikeudellinen luokituspäätelmä virallisesta täydestä tariffiluettelosta, ei viranomaisen erikseen julkaisema nollatodistus; ALV ja mahdolliset tuontimaksut ovat erillisiä; kertakäyttöiset e-savukkeet kiellettiin 26.2.2025",
          "rateUrl": "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000050932002",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Italia",
      "sourceName": "Italy",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and ADM customs/excise data",
      "route": "Separate extra-EU origin, intra-EU consignment and dispatches; flag hub re-exports",
      "salesSource": "Italian Ministry of Health EU-CEG; ADM excise/market monitoring where applicable",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 419,0 milj. EUR; intra-EU 294,7 milj. EUR ja extra-EU 124,3 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual units/ml/value and re-export correction",
      "how": "Download Italy Comext rows; request aggregated Article 20(7) data from the national EU-CEG authority; request ADM public aggregate for e-liquids/devices and tax stamps",
      "tax": {
        "name": "Italia",
        "sourceName": "Italy",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 1.92,
          "disposable1ml": 2.45,
          "open10ml": 4.4
        },
        "totalPct": {
          "closed": 25.02,
          "disposable": 23.5,
          "open": 48.49
        },
        "excisePct": {
          "closed": 6.99,
          "disposable": 5.47,
          "open": 30.45
        },
        "derivedRate": 0.134,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO snapshot shows excise; current national rate requires ADM verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-ita.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0,172623 EUR/ml nikotiinia sisältävälle e-nesteelle; 0,124672 EUR/ml nikotiinittomalle e-nesteelle ja aromeille 1.2.2026 alkaen",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "Palamattomat nestemäiset inhalaatiotuotteet nikotiinilla tai ilman sekä aromit",
          "caveat": "ADM:n johtajapäätös vahvistaa kannan; PLI-järjestelmä kerää kuukausi- ja puolikuukausitietoja mutta julkista kokonaisvolyymiä tai verokertymää ei löytynyt",
          "rateUrl": "https://www.adm.gov.it/portale/documents/20182/242317381/DET+%E2%80%93+74240-2026.pdf/92ecf170-16f0-d012-d0b6-f4630f192dca?t=1769851126925",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Espanja",
      "sourceName": "Spain",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and Spanish customs tax agency data",
      "route": "Origin versus EU consignment; subtract dispatches",
      "salesSource": "Spanish Ministry of Health EU-CEG Article 20(7)",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 143,4 milj. EUR; intra-EU 67,7 milj. EUR ja extra-EU 75,7 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual units/ml/value and detailed CN8 route data",
      "how": "Download Spain Comext rows; request aggregated sales from the EU-CEG contact listed by the European Commission; request customs CN8 import/export by origin and destination",
      "tax": {
        "name": "Espanja",
        "sourceName": "Spain",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 1.97,
          "disposable1ml": 3.5,
          "open10ml": 2.25
        },
        "totalPct": {
          "closed": 17.36,
          "disposable": 17.36,
          "open": 17.36
        },
        "excisePct": {
          "closed": 0.0,
          "disposable": 0.0,
          "open": 0.0
        },
        "derivedRate": 0.0,
        "derivedBasis": "WHO reports VAT only in snapshot; subsequent Spanish excise introduction must be handled separately",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Spanish 2025 law introduced 0.15/0.20 EUR per ml depending on nicotine strength; effective date and 2026 application require AEAT confirmation",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-esp.pdf",
        "tier": "B",
        "period": "WHO Report 2025 snapshot predates national change",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0,15 EUR/ml kun nikotiinia on enintään 15 mg/ml tai ei lainkaan; 0,20 EUR/ml yli 15 mg/ml",
          "taxedVolume": "not_obtained",
          "actualRevenue": "30 milj. EUR",
          "revenuePeriod": "2025",
          "forecast": "not_obtained",
          "scope": "Kansallinen erityinen valmistusvero e-savukenesteille ja muille siihen liittyville nikotiinituotteille",
          "caveat": "Veroraportti kohdistaa 30 milj. EUR uudelle verolle mutta yhteenveto ei julkaise pelkkää e-nesteiden verotettua litramäärää",
          "rateUrl": "https://sede.agenciatributaria.gob.es/Sede/en_gb/impuestos-especiales-medioambientales/impuestos-especiales-fabricacion/liquidos-cigarrillos-electronicos-otros-productos-tabaco/base-imponible-tipo-gravamen.html",
          "volumeUrl": "",
          "revenueUrl": "https://sede.agenciatributaria.gob.es/static_files/AEAT/Estudios/Estadisticas/Informes_Estadisticos/Informes_sobre_Impuestos_Especiales/Contenidos/InformeIIEE.pdf"
        }
      }
    },
    {
      "name": "Puola",
      "sourceName": "Poland",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and Polish customs/excise data",
      "route": "Origin versus consignment; subtract dispatches/re-exports",
      "salesSource": "Inspector for Chemical Substances EU-CEG; Ministry of Finance e-liquid excise",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 210,6 milj. EUR; intra-EU 117,5 milj. EUR ja extra-EU 93,1 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual ml/units/value, excise-released volume and route data",
      "how": "Download Poland Comext rows; request Article 20(7) aggregate from tyton@chemikalia.gov.pl; request Ministry of Finance excise-paid e-liquid volume and revenue",
      "tax": {
        "name": "Puola",
        "sourceName": "Poland",
        "status": "numeric_data",
        "currency": "PLN",
        "prices": {
          "closed1ml": 10.75,
          "disposable1ml": 13.45,
          "open10ml": 14.31
        },
        "totalPct": {
          "closed": 23.82,
          "disposable": 22.79,
          "open": 57.13
        },
        "excisePct": {
          "closed": 5.12,
          "disposable": 4.09,
          "open": 38.43
        },
        "derivedRate": 0.55,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO snapshot shows excise; current national rate requires Ministry of Finance verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-pol.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "1,44 PLN/ml e-savukenesteelle; kertakäyttöisessä e-savukkeessa lisäksi 40 PLN/laitetta; höyrystinlaitteet ja osasarjat 40 PLN/kpl tai sarja",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "E-savukenesteet, kertakäyttölaitteet, uudelleenkäytettävät höyrystimet ja osasarjat",
          "caveat": "Vuoden 2026 virallinen verokantataulukko vahvistaa kannat mutta ei julkaise samalla taulukolla verotettua määrää tai kertymää",
          "rateUrl": "https://www.podatki.gov.pl/akcyza/stawki-podatkowe",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Alankomaat",
      "sourceName": "Netherlands",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and Dutch customs",
      "route": "Treat Netherlands as a logistics hub; country of dispatch is not origin or final consumption; subtract dispatches/re-exports",
      "salesSource": "RIVM EU-CEG Article 20(7)",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 204,8 milj. EUR; intra-EU 28,7 milj. EUR ja extra-EU 176,0 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Domestic sales separated from Rotterdam hub flows",
      "how": "Download Comext origin/consignment/dispatch matrix; request aggregated sales from RIVM; exclude goods placed in transit/customs warehousing from domestic market",
      "tax": {
        "name": "Alankomaat",
        "sourceName": "Netherlands",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 2.32,
          "disposable1ml": 2.98,
          "open10ml": 2.75
        },
        "totalPct": {
          "closed": 17.36,
          "disposable": 17.36,
          "open": 17.36
        },
        "excisePct": {
          "closed": 0.0,
          "disposable": 0.0,
          "open": 0.0
        },
        "derivedRate": 0.0,
        "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current national treatment requires Belastingdienst verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-nld.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0 EUR/ml erillistä e-nestevalmisteveroa vuoden 2026 Wet op de accijns -lain verotuoteluettelossa",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "Vuonna 2026 voimassa oleva Wet op de accijns luettelee valmisteveron kohteiksi alkoholin, mineraaliöljyt ja tupakkatuotteet; e-nesteitä säännellään tupakkaan liittyvinä tuotteina mutta niitä ei lisätä valmisteverotuotteeksi",
          "caveat": "Nollakanta on dokumentoitu oikeudellinen luokituspäätelmä lain tyhjentävästä tuoteluettelosta; ALV ja tuonnin tullit ovat erillisiä; myyntikanavia ja makuja koskee erillinen sääntely",
          "rateUrl": "https://wetten.overheid.nl/jci1.3:c:BWBR0005251&g=2026-04-10&z=2026-04-10",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Belgia",
      "sourceName": "Belgium",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and Belgian customs",
      "route": "Treat Antwerp flows as possible hub/re-export; origin and domestic release required",
      "salesSource": "FPS Health / EU-CEG Article 20(7)",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 127,3 milj. EUR; intra-EU 19,6 milj. EUR ja extra-EU 107,8 milj. EUR. No official sales aggregate obtained; disposable sales prohibition changes comparability",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Domestic sales by product type and legal-regime break",
      "how": "Download Comext rows; request Article 20(7) aggregates from the Commission-listed national authority; split time series before/after disposable ban",
      "tax": {
        "name": "Belgia",
        "sourceName": "Belgium",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 2.38,
          "disposable1ml": 4.25,
          "open10ml": 4.95
        },
        "totalPct": {
          "closed": 23.67,
          "disposable": 20.88,
          "open": 47.66
        },
        "excisePct": {
          "closed": 6.32,
          "disposable": 3.53,
          "open": 30.3
        },
        "derivedRate": 0.15,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO snapshot shows excise; current national rate requires FPS Finance verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-bel.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "partial",
          "rate": "0,1500 EUR/ml erityistä valmisteveroa kulutukseen luovutetuille e-nesteille",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "Kaikki Belgiassa kulutukseen luovutetut e-nesteet",
          "caveat": "Kanta täsmää WHO:n riippumattomaan tarkistukseen ja Belgian säädöksen toisintolähteeseen, mutta FOD Finances ohjaa nykyiset tariffit kirjautumista vaativaan Fisconetplus/TarBel-järjestelmään; suora virallinen tariffirivi on vielä tallentamatta",
          "rateUrl": "https://financien.belgium.be/nl/douane_accijnzen/ondernemingen/accijnzen/algemene_informatie/accijnstarieven",
          "volumeUrl": "",
          "revenueUrl": "https://etaamb.openjustice.be/fr/loiprogramme-du-22-decembre-2023_n2023048600.html"
        }
      }
    },
    {
      "name": "Luxemburg",
      "sourceName": "Luxembourg",
      "status": "partial",
      "customs": "Eurostat Comext CN8",
      "route": "Origin, consignment and dispatch; subtract exports",
      "salesSource": "Ministry of Health EU-CEG Article 20(7)",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 11,0 milj. EUR; intra-EU 11,0 milj. EUR ja extra-EU 0,0 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual units/ml/value",
      "how": "Download Comext rows; request aggregated Article 20(7) data from ministere-sante@ms.etat.lu",
      "tax": {
        "name": "Luxemburg",
        "sourceName": "Luxembourg",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 1.95,
          "disposable1ml": 3.75,
          "open10ml": 4.15
        },
        "totalPct": {
          "closed": 14.53,
          "disposable": 14.53,
          "open": 14.53
        },
        "excisePct": {
          "closed": 0.0,
          "disposable": 0.0,
          "open": 0.0
        },
        "derivedRate": 0.0,
        "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current national treatment requires customs/excise verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-lux.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0 EUR/ml erillistä e-nestevalmisteveroa vuoden 2026 virallisessa valmisteverotuoteluettelossa",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "Guichet.lu ja vuoden 2026 Douanes et Accises -lupahakemus luettelevat valmisteverotuotteiksi alkoholin, energiatuotteet sekä savukkeet, sikarit ja polttotupakan; e-nesteelle ei ole omaa veroluokkaa",
          "caveat": "Nollakanta on dokumentoitu luokituspäätelmä virallisista täydellisiksi ilmoitetuista tavaraluetteloista, ei erillinen viranomaisen nollatodistus; ALV ja tuontitulli ovat erillisiä; vuoden 2025 valvontatiedotteen 12 897 EUR vältetyt valmisteverot koskevat sekoitettua takavarikkoa eikä niitä saa kohdistaa 90 litraan e-nestettä",
          "rateUrl": "https://guichet.public.lu/fr/entreprises/import-export/intra-ue/echanges-intra-ue/commerce-accises.html",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Suomi",
      "sourceName": "Finland",
      "status": "verified",
      "customs": "Eurostat Comext CN8 and Finnish Customs Uljas",
      "route": "Origin versus consignment; subtract exports/re-exports",
      "salesSource": "Valvira EU-CEG; Finnish Tax Administration excise data",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 5,6 milj. EUR; intra-EU 5,1 milj. EUR ja extra-EU 0,5 milj. EUR. No official vape-specific sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual ml/units/value and excise released volume",
      "how": "Download Uljas/Comext CN8 rows; request aggregated EU-CEG sales from Valvira and excise-paid e-liquid volumes/revenue from Finnish Tax Administration",
      "tax": {
        "name": "Suomi",
        "sourceName": "Finland",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": null,
          "disposable1ml": 3.95,
          "open10ml": 5.0
        },
        "totalPct": {
          "closed": null,
          "disposable": 26.95,
          "open": 79.35
        },
        "excisePct": {
          "closed": null,
          "disposable": 7.59,
          "open": 60.0
        },
        "derivedRate": 0.3,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "National tax rate and taxed-volume PXWeb series require direct Vero extraction",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-fin.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0,40 EUR/ml vuonna 2026; sekä nikotiinilliset että käyttötarkoituksen perusteella verolliset nikotiinittomat e-nesteet",
          "taxedVolume": "11823.492 L",
          "actualRevenue": "3 547 047 EUR",
          "revenuePeriod": "2025",
          "forecast": "not_obtained",
          "scope": "Verohallinnon nettovolyymi ja nettoveron määrä tuoteryhmille TBC07 ja TBC7A",
          "caveat": "Vuosi 2025 on täysi 12 kuukauden sarja; vuoden 2026 tieto kattaa tällä hetkellä tammi–huhtikuun",
          "rateUrl": "https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/valmisteverotus/tupakkavero/",
          "volumeUrl": "https://vero2.stat.fi/PXWeb/api/v1/en/Vero/Valmistevero/vvt_010.px",
          "revenueUrl": "https://vero2.stat.fi/PXWeb/api/v1/en/Vero/Valmistevero/vvt_010.px"
        }
      }
    },
    {
      "name": "Ruotsi",
      "sourceName": "Sweden",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and Statistics Sweden",
      "route": "Origin versus consignment; subtract dispatches",
      "salesSource": "Public Health Agency of Sweden EU-CEG",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 50,0 milj. EUR; intra-EU 12,2 milj. EUR ja extra-EU 37,8 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual units/ml/value and excise data",
      "how": "Download Comext/SCB trade rows; request Article 20(7) aggregate from euceg@folkhalsomyndigheten.se",
      "tax": {
        "name": "Ruotsi",
        "sourceName": "Sweden",
        "status": "numeric_data",
        "currency": "SEK",
        "prices": {
          "closed1ml": 41.67,
          "disposable1ml": 34.5,
          "open10ml": 69.0
        },
        "totalPct": {
          "closed": 29.7,
          "disposable": 31.71,
          "open": 49.28
        },
        "excisePct": {
          "closed": 9.7,
          "disposable": 11.71,
          "open": 29.28
        },
        "derivedRate": 2.02,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current national rate requires Skatteverket verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-swe.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "2 087 SEK/litra eli 2,087 SEK/ml; vahva 15–20 mg/ml e-neste 4 174 SEK/litra eli 4,174 SEK/ml",
          "taxedVolume": "26 000 litraa vuonna 2024: 14 000 litraa vahvoja ja 12 000 litraa muita e-nesteitä",
          "actualRevenue": "80 milj. SEK: 60 milj. vahvoista ja 20 milj. muista e-nesteistä",
          "revenuePeriod": "2024",
          "forecast": "not_obtained",
          "scope": "Nikotiinia sisältävät e-nesteet",
          "caveat": "Finansdepartementin Beräkningskonventioner 2026 taulukko 7.5 yhdistää Ekonomistyrningsverketin, Skatteverketin ja ministeriön laskennan. Vuosi 2024 on viimeisin täysi vertailuvuosi, mutta luku ei ole julkaistu raakaverotilin tapahtumaotteena; sarjaa päivitetään ja pyöristetään.",
          "rateUrl": "https://www.skatteverket.se/foretagochorganisationer/skatter/punktskatter/nikotinskatt.4.41f1c61d16193087d7fc7fe.html",
          "volumeUrl": "https://www.regeringen.se/contentassets/1ed01e00001b42e5ad8d47433db63ece/berakningskonventioner_2026.pdf",
          "revenueUrl": "https://www.regeringen.se/contentassets/1ed01e00001b42e5ad8d47433db63ece/berakningskonventioner_2026.pdf"
        }
      }
    },
    {
      "name": "Tanska",
      "sourceName": "Denmark",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and Statistics Denmark",
      "route": "Origin versus consignment; subtract exports",
      "salesSource": "Danish national EU-CEG authority and excise authority",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 14,4 milj. EUR; intra-EU 8,3 milj. EUR ja extra-EU 6,1 milj. EUR. No official sales aggregate obtained",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual units/ml/value and excise-paid volume",
      "how": "Download Comext/Statbank trade data; use Commission EU-CEG contact list for aggregated Article 20(7) request; request e-liquid excise aggregates",
      "tax": {
        "name": "Tanska",
        "sourceName": "Denmark",
        "status": "numeric_data",
        "currency": "DKK",
        "prices": {
          "closed1ml": 16.25,
          "disposable1ml": 27.5,
          "open10ml": 52.0
        },
        "totalPct": {
          "closed": 29.23,
          "disposable": 29.09,
          "open": 48.85
        },
        "excisePct": {
          "closed": 9.23,
          "disposable": 9.09,
          "open": 28.85
        },
        "derivedRate": 1.5,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current national rate requires Skattestyrelsen verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-dnk.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "1,50 DKK/ml kun nikotiinia on enintään 12 mg/ml; 2,50 DKK/ml yli 12 mg/ml",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "90 milj. DKK vuoden 2025 vuotuinen verotuotto voimassa olevilla säännöillä",
          "scope": "Nikotiinia sisältävät nesteet",
          "caveat": "Skatteministerietin vastaus Folketingetille ilmoittaa 2025 vuotuisen tuoton pyöristettynä lähimpään 5 milj. DKK:hon; kyse on arviosta, ei toteutuneesta tilinpäätösluvusta. Nimelliskannoilla 90 milj. DKK vastaa noin 36 000–60 000 litran haarukkaa ennen pyöristyksen ja sekoitetun vahvuusjakauman huomiointia.",
          "rateUrl": "https://skm.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/forbrugsafgiftsloven",
          "volumeUrl": "",
          "revenueUrl": "https://www.ft.dk/samling/20231/almdel/sau/spm/678/svar/2074316/2914215.pdf"
        }
      }
    },
    {
      "name": "Norja",
      "sourceName": "Norway",
      "status": "missing",
      "customs": "Statistics Norway external trade HS8 and Norwegian Customs",
      "route": "Use origin and country of dispatch where available; subtract re-exports",
      "salesSource": "Norwegian Directorate of Health product reporting/market supervision",
      "current": "No official sales aggregate obtained",
      "missing": "Annual units/ml/value and nicotine-product legal scope",
      "how": "Download SSB external trade by HS code and partner; request non-identifiable sales/notification totals from Directorate of Health; document nicotine restrictions by year",
      "tax": {
        "name": "Norja",
        "sourceName": "Norway",
        "status": "sale_banned",
        "currency": "",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO profile reports sale banned for all three e-liquid formats in its observation; current legal route must be checked nationally",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-nor.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": null
      }
    },
    {
      "name": "Itävalta",
      "sourceName": "Austria",
      "status": "partial",
      "customs": "Eurostat Comext CN8 and Statistics Austria",
      "route": "Origin versus consignment; subtract dispatches",
      "salesSource": "National EU-CEG authority; excise authority",
      "current": "Eurostat 2025 kapea CN8-kori: WORLD-tuonti 73,1 milj. EUR; intra-EU 27,5 milj. EUR ja extra-EU 45,6 milj. EUR. No official sales aggregate obtained; disposable prohibition must be time-stamped",
      "missing": "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. Annual units/ml/value and policy-break series",
      "how": "Download Austria Comext rows; request Article 20(7) aggregate from national authority; separate periods around disposable ban",
      "tax": {
        "name": "Itävalta",
        "sourceName": "Austria",
        "status": "numeric_data",
        "currency": "EUR",
        "prices": {
          "closed1ml": 2.48,
          "disposable1ml": 4.0,
          "open10ml": 6.95
        },
        "totalPct": {
          "closed": 16.67,
          "disposable": 16.67,
          "open": 16.67
        },
        "excisePct": {
          "closed": 0.0,
          "disposable": 0.0,
          "open": 0.0
        },
        "derivedRate": 0.0,
        "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current national treatment requires Ministry of Finance verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-aut.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "200 EUR/litra eli 0,20 EUR/ml 1.4.2026–31.1.2027; 230 EUR/litra 1.2.2027 alkaen; 260 EUR/litra 1.2.2028 alkaen",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "55 milj. EUR lisätuloa vuonna 2026 veromuutoksista yhteensä",
          "scope": "E-nesteet niiden nikotiinipitoisuudesta riippumatta",
          "caveat": "55 milj. EUR ei ole e-nesteiden erillinen ennuste vaan sisältää myös nikotiinipussit ja muut tabaksteuermuutokset; toteutunutta e-nestekertymää ei vielä ole",
          "rateUrl": "https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Anlage=&Artikel=&Gesetzesnummer=10004877&Paragraf=4&Uebergangsrecht=",
          "volumeUrl": "",
          "revenueUrl": "https://www.parlament.gv.at/fachinfos/budgetdienst/Betrugsbekaempfungspaket-und-Abgabenaenderungsgesetz-2025"
        }
      }
    },
    {
      "name": "Sveitsi",
      "sourceName": "Switzerland",
      "status": "partial",
      "customs": "Swiss-Impex detailed tariff data",
      "route": "Use origin and dispatch; subtract re-exports and customs-warehouse flows",
      "salesSource": "Federal Office of Public Health tobacco-product reporting",
      "current": "No official sales aggregate obtained",
      "missing": "Annual units/ml/value and detailed tariff mapping",
      "how": "Query Swiss-Impex for national tariff suffixes under 854340/240412/240419; request aggregated product sales/market data from FOPH",
      "tax": {
        "name": "Sveitsi",
        "sourceName": "Switzerland",
        "status": "numeric_data",
        "currency": "CHF",
        "prices": {
          "closed1ml": 3.95,
          "disposable1ml": 2.1,
          "open10ml": 5.9
        },
        "totalPct": {
          "closed": 7.49,
          "disposable": 7.49,
          "open": 7.49
        },
        "excisePct": {
          "closed": 0.0,
          "disposable": 0.0,
          "open": 0.0
        },
        "derivedRate": 0.0,
        "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current national treatment requires Federal Customs/FOCBS verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-che.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "0,20 CHF/ml nikotiinia sisältäville uudelleenkäytettävien e-savukkeiden nesteille; 1,00 CHF/ml kertakäyttöisille e-savukkeille nikotiinista riippumatta",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "Uudelleenkäytettävien laitteiden nikotiininesteet ja kaikki kertakäyttöiset e-savukkeet",
          "caveat": "BAZG:n 2026 vero-ohje vahvistaa kannat ja tullinimikkeet mutta ei erota julkisesti e-savukkeiden verokertymää koko tupakkaverosta",
          "rateUrl": "https://www.bazg.admin.ch/dam/de/sd-web/LOdB10XnvqWr/R-120-3%20Tabaksteuer_01.03.26_Korrektur.pdf",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Yhdistynyt kuningaskunta",
      "sourceName": "United Kingdom",
      "status": "partial",
      "customs": "HMRC UK Trade Info detailed commodity data; origin and dispatch fields",
      "route": "Use country of origin for manufacturing, country of dispatch for routing; subtract re-exports; separate Northern Ireland EU treatment",
      "salesSource": "MHRA Regulation 32 annual reports by brand/variant, units and refill ml",
      "current": "MHRA collects current sales but treats individual reports as confidential; aggregate requested, not obtained",
      "missing": "Aggregated annual GB device units, refill ml and value",
      "how": "Extract UK Trade Info commodity rows; request anonymised Regulation 32 aggregate from MHRA/TPDnotifications; pursue FOI for totals that cannot identify companies",
      "tax": {
        "name": "Yhdistynyt kuningaskunta",
        "sourceName": "United Kingdom",
        "status": "numeric_data",
        "currency": "GBP",
        "prices": {
          "closed1ml": 1.76,
          "disposable1ml": null,
          "open10ml": 3.99
        },
        "totalPct": {
          "closed": 16.67,
          "disposable": null,
          "open": 16.67
        },
        "excisePct": {
          "closed": 0.0,
          "disposable": null,
          "open": 0.0
        },
        "derivedRate": 0.0,
        "derivedBasis": "WHO reports VAT only in available formats",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO snapshot has no specific excise; monitor announced Vaping Products Duty and verify effective date with HMRC",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-gbr.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "2.20 GBP / 10 ml eli 0.22 GBP/ml 1.10.2026 alkaen; kaikki e-nesteet nikotiinista riippumatta",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "135 milj. GBP 2026-27; 400 milj. GBP 2027-28; 465 milj. GBP 2028-29; 530 milj. GBP 2029-30; 565 milj. GBP 2030-31",
          "scope": "Tuleva Vaping Products Duty",
          "caveat": "Ennuste on OBR:n sertifioima julkisen talouden vaikutus eikä toteutunut verotuotto",
          "rateUrl": "https://www.gov.uk/guidance/how-to-pay-vaping-products-duty",
          "volumeUrl": "",
          "revenueUrl": "https://www.gov.uk/government/publications/introduction-of-vaping-products-duty-from-1-october-2026/introduction-of-vaping-products-duty-from-1-october-2026"
        }
      }
    },
    {
      "name": "Kiina",
      "sourceName": "China",
      "status": "partial",
      "customs": "GACC interactive customs tables at national statistical code; imports and exports by commodity, origin/destination, consignment, customs regime and domestic location",
      "route": "Separate ordinary trade, processing trade, bonded zones and Hong Kong re-routing; use final destination for exports; do not infer Chinese consumption from exports",
      "salesSource": "State Tobacco Monopoly Administration licensing/tax/production reports where published",
      "current": "No official domestic vape sales aggregate obtained; customs interactive extract not yet preserved",
      "missing": "2022-2025 exports/imports at detailed code, customs regime, Hong Kong mirror and domestic sales",
      "how": "Query GACC Interactive Tables for 854340/240412/240419 by partner and trade regime; request official extract/yearbook table; reconcile China exports to each target's imports and Hong Kong re-exports; request aggregate domestic production/sales from STMA",
      "tax": {
        "name": "Kiina",
        "sourceName": "China",
        "status": "no_numeric_data",
        "currency": "CNY",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "Current production/import and wholesale consumption-tax treatment requires Ministry of Finance/STA evidence; WHO profile has no numeric retail observation",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-chn.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": {
          "asOf": "2026-07-17",
          "status": "verified",
          "rate": "36 % tuotanto-/tuontivaiheessa ja 11 % tukkumyyntivaiheessa",
          "taxedVolume": "not_obtained",
          "actualRevenue": "not_obtained",
          "revenuePeriod": "",
          "forecast": "not_obtained",
          "scope": "E-savukkeet mukaan lukien patruunat laitteet ja yhdistelmät",
          "caveat": "Tuotekohtaista verotettua volyymia tai verokertymää ei saatu; vientiin sovelletaan veronpalautus-/vapautuspolitiikkaa",
          "rateUrl": "https://jsz.mof.gov.cn/zhengcefagui/202210/t20221028_3848463.htm",
          "volumeUrl": "",
          "revenueUrl": ""
        }
      }
    },
    {
      "name": "Japani",
      "sourceName": "Japan",
      "status": "partial",
      "customs": "MOF/Customs 9-digit trade statistics 854340-000, 240412-000, 240419 national code",
      "route": "Imports use country of origin and CIF; exports final destination and FOB; subtract re-exports if identifiable and compare mirror data",
      "salesSource": "Ministry of Health/PMDA approvals for nicotine liquids; official household/industry data only as secondary cross-check",
      "current": "UN aggregate obtained; national 9-digit extract and consumer sales not preserved",
      "missing": "9-digit import/export by partner; lawful nicotine-liquid supply and retail sales",
      "how": "Use Japan Customs commodity search, December annual cumulative row and country table; download 9-digit data; request sales/approval aggregates from MHLW/PMDA and distinguish liquid e-cigarettes from heated-tobacco products",
      "tax": {
        "name": "Japani",
        "sourceName": "Japan",
        "status": "no_numeric_data",
        "currency": "JPY",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO profile has no numeric retail e-liquid tax observation; verify legal product classification and consumption tax nationally",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-jpn.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": null
      }
    },
    {
      "name": "Etelä-Korea",
      "sourceName": "South Korea",
      "status": "missing",
      "customs": "Korea Customs Service Trade Statistics 10-digit HSK through tradedata.go.kr",
      "route": "Use origin/destination; subtract re-exports; compare China/Hong Kong mirror flows and special express imports",
      "salesSource": "Ministry of Economy and Finance tobacco-market trends; KOSIS/MOHW surveys; liquid-vape tax declarations",
      "current": "No official vape-specific sales value obtained",
      "missing": "10-digit trade, liquid ml/tax volume and device sales",
      "how": "Query tradedata.go.kr for 8543400000 and all 240412/240419 HSK suffixes; request downloadable official extract; request MOEF/KOSIS split between liquid and heated tobacco sales and tax volume",
      "tax": {
        "name": "Etelä-Korea",
        "sourceName": "South Korea",
        "status": "no_numeric_data",
        "currency": "KRW",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO profile has no numeric retail observation; liquid nicotine and synthetic nicotine taxes require Ministry of Economy and Finance/NTS evidence",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-kor.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": null
      }
    },
    {
      "name": "Australia",
      "sourceName": "Australia",
      "status": "missing",
      "customs": "ABS/Home Affairs 10-digit HTISC imports and exports",
      "route": "Use country of origin, port of loading, home-consumption versus bonded-warehouse nature; subtract re-exports; split pre/post July 2024 regulation",
      "salesSource": "TGA sponsor notices and requested sponsor supply records",
      "current": "TGA holds/collects supply records but public aggregate not obtained; TGA says it does not know illicit sales total",
      "missing": "Lawful pharmacy supply units/ml/value, sponsor import/manufacture quantities and detailed HTISC trade",
      "how": "Request ABS customised 10-digit HTISC table with country/origin, nature 10/20/30 and re-exports; request anonymised TGA sponsor supply aggregate and notified-product counts; exclude illicit-market estimates from factual market value",
      "tax": {
        "name": "Australia",
        "sourceName": "Australia",
        "status": "sale_banned",
        "currency": "",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO profile reports retail sale banned for observed formats; lawful pharmacy supply and GST/excise treatment require separate TGA/ATO analysis",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-aus.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": null
      }
    },
    {
      "name": "Brasilia",
      "sourceName": "Brazil",
      "status": "missing",
      "customs": "Comex Stat NCM8 85434000 and relevant 2404 codes",
      "route": "Use origin/acquisition country and port/state; subtract exports; any recorded imports require legality/classification review",
      "salesSource": "ANVISA enforcement and seizure data; lawful commercial sales prohibited",
      "current": "Official prohibition confirmed; no lawful sales market series",
      "missing": "Illicit market evidence, seizures and any exceptional imports",
      "how": "Download Comex Stat NCM8 rows and customs regime; obtain Receita/ANVISA seizure totals; present legal commercial market as prohibited and never convert customs anomalies into lawful sales",
      "tax": {
        "name": "Brasilia",
        "sourceName": "Brazil",
        "status": "sale_banned",
        "currency": "",
        "prices": {
          "closed1ml": null,
          "disposable1ml": null,
          "open10ml": null
        },
        "totalPct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "excisePct": {
          "closed": null,
          "disposable": null,
          "open": null
        },
        "derivedRate": null,
        "derivedBasis": "",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO profile reports sale banned; no lawful retail excise market should be inferred",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-bra.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": null
      }
    },
    {
      "name": "Venäjä",
      "sourceName": "Russia",
      "status": "missing",
      "customs": "Federal Customs/EAEU TN VED 10-digit 8543400000 and 240412/240419 suffixes",
      "route": "Separate Russia from EAEU internal movement; origin/consignment, bonded flows and parallel-import routes; compare partner mirror exports",
      "salesSource": "Rosstat retail/wholesale product data and excise/marking system if vape-specific",
      "current": "Current detailed official customs and vape-specific retail series not obtained",
      "missing": "Post-2022 detailed trade, EAEU internal flows, vape-specific sales and prices",
      "how": "Request Federal Customs/EEC detailed TN VED extract; use EAEU mutual-trade data; reconcile mirror exports from China/Kazakhstan/Armenia/Belarus; search Rosstat product-level retail tables and national digital-marking aggregates; disclose sanctions/data gaps",
      "tax": {
        "name": "Venäjä",
        "sourceName": "Russia",
        "status": "numeric_data",
        "currency": "RUB",
        "prices": {
          "closed1ml": null,
          "disposable1ml": 159.9,
          "open10ml": 600.0
        },
        "totalPct": {
          "closed": null,
          "disposable": 42.93,
          "open": 85.97
        },
        "excisePct": {
          "closed": null,
          "disposable": 26.27,
          "open": 70.0
        },
        "derivedRate": 42.0,
        "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
        "taxedVolume": "not_obtained",
        "taxRevenue": "not_obtained",
        "verification": "WHO snapshot shows excise; current national rate and legal status require official Russian verification",
        "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-rus.pdf",
        "tier": "B",
        "period": "WHO Report 2025 country profile",
        "national": null
      }
    }
  ],
  "taxes": [
    {
      "name": "Yhdysvallat",
      "sourceName": "United States",
      "status": "no_numeric_data",
      "currency": "",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Federal and state-level current e-cigarette tax treatment must be assembled separately; WHO profile has no numeric e-liquid observation",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-usa.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2024-09-30",
        "status": "partial",
        "rate": "Ei yhtä liittovaltion e-savukeveroa; CDC:n mukaan 33 osavaltiota sekä DC Puerto Rico ja US Virgin Islands olivat säätäneet e-savukeveron",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "Osavaltiotason valmisteverolainsäädäntö",
        "caveat": "CDC-aineisto on tarkistettu viimeksi 2024 ja on päivitettävä osavaltioittain vuodelle 2026",
        "rateUrl": "https://www.cdc.gov/statesystem/factsheets/ecigarette/ECigTax.html",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Kanada",
      "sourceName": "Canada",
      "status": "no_numeric_data",
      "currency": "CAD",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Federal/provincial vaping excise rates require current CRA verification; WHO profile has no numeric e-liquid observation",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-can.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "1,12 CAD / alkava 2 ml ensimmäisestä 10 ml:sta; sen jälkeen 1,12 CAD / alkava 10 ml; määrätyissä provinsseissa samansuuruinen lisävero",
        "taxedVolume": "not_obtained",
        "actualRevenue": "130,362 milj. CAD",
        "revenuePeriod": "1.4.2024–31.3.2025",
        "forecast": "not_obtained",
        "scope": "Koordinoitujen verosopimusten provinssien vaping-lisäveron receipts and other credits",
        "caveat": "Ei koko liittovaltion ja provinssien vaping-verotuotto; tilinpäätös on tilintarkastamaton ja luku on tax collection agreements -taulukossa",
        "rateUrl": "https://www.canada.ca/en/revenue-agency/services/tax/technical-information/excise-duty/rates.html",
        "volumeUrl": "",
        "revenueUrl": "https://www.canada.ca/en/department-finance/corporate/transparency/plans-performance/financial-statements/2025.html"
      }
    },
    {
      "name": "EU-27",
      "sourceName": "EU-27",
      "status": "not_applicable",
      "currency": "",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "No harmonised e-liquid excise in the WHO snapshot; use member-state rows and monitor the Commission Tobacco Taxation Directive proposal",
      "url": "https://taxation-customs.ec.europa.eu/taxation/excise-duties/excise-duties-tobacco/revision-tobacco-taxation-directive-proposal_en",
      "tier": "A",
      "period": "EU policy status; member states shown separately",
      "national": null
    },
    {
      "name": "Saksa",
      "sourceName": "Germany",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 1.75,
        "disposable1ml": 3.5,
        "open10ml": 4.95
      },
      "totalPct": {
        "closed": 27.39,
        "disposable": 21.69,
        "open": 56.37
      },
      "excisePct": {
        "closed": 11.43,
        "disposable": 5.72,
        "open": 40.4
      },
      "derivedRate": 0.2,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "1500000 L",
      "taxRevenue": "390000000 EUR calculated tax base at 0.26 EUR/ml",
      "verification": "National law verified: 0.26 EUR/ml in 2025 and 0.32 EUR/ml in 2026",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-deu.pdf",
      "tier": "B",
      "period": "WHO price/tax snapshot; national 2025 volume and rate separately verified",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0.26 EUR/ml vuonna 2025; 0.32 EUR/ml vuonna 2026",
        "taxedVolume": "1500000 L",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "2025",
        "forecast": "not_obtained",
        "scope": "Verotettu tupakan korvike-/e-nestevolyymi",
        "caveat": "390 milj. EUR on läpinäkyvä vuoden 2025 verokanta × volyymi -laskelma eikä toteutunut verokertymä",
        "rateUrl": "https://www.gesetze-im-internet.de/tabstg_2009/__2.html",
        "volumeUrl": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html",
        "revenueUrl": ""
      }
    },
    {
      "name": "Ranska",
      "sourceName": "France",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 2.17,
        "disposable1ml": 2.37,
        "open10ml": 3.43
      },
      "totalPct": {
        "closed": 16.67,
        "disposable": 16.67,
        "open": 16.67
      },
      "excisePct": {
        "closed": 0.0,
        "disposable": 0.0,
        "open": 0.0
      },
      "derivedRate": 0.0,
      "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current national treatment must be rechecked after the 2025 EU-wide WHO snapshot",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-fra.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0 EUR/ml erillistä e-nestevalmisteveroa vuoden 2026 virallisessa tupakkatuotteiden valmisteveroluettelossa",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "Légifrancen vuoden 2026 tyhjentävä tupakkatuotteiden valmisteverotaulukko ja Douanen veroluokkakuvaus; e-neste ei ole veroluokka",
        "caveat": "Nollakanta on dokumentoitu oikeudellinen luokituspäätelmä virallisesta täydestä tariffiluettelosta, ei viranomaisen erikseen julkaisema nollatodistus; ALV ja mahdolliset tuontimaksut ovat erillisiä; kertakäyttöiset e-savukkeet kiellettiin 26.2.2025",
        "rateUrl": "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000050932002",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Italia",
      "sourceName": "Italy",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 1.92,
        "disposable1ml": 2.45,
        "open10ml": 4.4
      },
      "totalPct": {
        "closed": 25.02,
        "disposable": 23.5,
        "open": 48.49
      },
      "excisePct": {
        "closed": 6.99,
        "disposable": 5.47,
        "open": 30.45
      },
      "derivedRate": 0.134,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO snapshot shows excise; current national rate requires ADM verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-ita.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0,172623 EUR/ml nikotiinia sisältävälle e-nesteelle; 0,124672 EUR/ml nikotiinittomalle e-nesteelle ja aromeille 1.2.2026 alkaen",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "Palamattomat nestemäiset inhalaatiotuotteet nikotiinilla tai ilman sekä aromit",
        "caveat": "ADM:n johtajapäätös vahvistaa kannan; PLI-järjestelmä kerää kuukausi- ja puolikuukausitietoja mutta julkista kokonaisvolyymiä tai verokertymää ei löytynyt",
        "rateUrl": "https://www.adm.gov.it/portale/documents/20182/242317381/DET+%E2%80%93+74240-2026.pdf/92ecf170-16f0-d012-d0b6-f4630f192dca?t=1769851126925",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Espanja",
      "sourceName": "Spain",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 1.97,
        "disposable1ml": 3.5,
        "open10ml": 2.25
      },
      "totalPct": {
        "closed": 17.36,
        "disposable": 17.36,
        "open": 17.36
      },
      "excisePct": {
        "closed": 0.0,
        "disposable": 0.0,
        "open": 0.0
      },
      "derivedRate": 0.0,
      "derivedBasis": "WHO reports VAT only in snapshot; subsequent Spanish excise introduction must be handled separately",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Spanish 2025 law introduced 0.15/0.20 EUR per ml depending on nicotine strength; effective date and 2026 application require AEAT confirmation",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-esp.pdf",
      "tier": "B",
      "period": "WHO Report 2025 snapshot predates national change",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0,15 EUR/ml kun nikotiinia on enintään 15 mg/ml tai ei lainkaan; 0,20 EUR/ml yli 15 mg/ml",
        "taxedVolume": "not_obtained",
        "actualRevenue": "30 milj. EUR",
        "revenuePeriod": "2025",
        "forecast": "not_obtained",
        "scope": "Kansallinen erityinen valmistusvero e-savukenesteille ja muille siihen liittyville nikotiinituotteille",
        "caveat": "Veroraportti kohdistaa 30 milj. EUR uudelle verolle mutta yhteenveto ei julkaise pelkkää e-nesteiden verotettua litramäärää",
        "rateUrl": "https://sede.agenciatributaria.gob.es/Sede/en_gb/impuestos-especiales-medioambientales/impuestos-especiales-fabricacion/liquidos-cigarrillos-electronicos-otros-productos-tabaco/base-imponible-tipo-gravamen.html",
        "volumeUrl": "",
        "revenueUrl": "https://sede.agenciatributaria.gob.es/static_files/AEAT/Estudios/Estadisticas/Informes_Estadisticos/Informes_sobre_Impuestos_Especiales/Contenidos/InformeIIEE.pdf"
      }
    },
    {
      "name": "Puola",
      "sourceName": "Poland",
      "status": "numeric_data",
      "currency": "PLN",
      "prices": {
        "closed1ml": 10.75,
        "disposable1ml": 13.45,
        "open10ml": 14.31
      },
      "totalPct": {
        "closed": 23.82,
        "disposable": 22.79,
        "open": 57.13
      },
      "excisePct": {
        "closed": 5.12,
        "disposable": 4.09,
        "open": 38.43
      },
      "derivedRate": 0.55,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO snapshot shows excise; current national rate requires Ministry of Finance verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-pol.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "1,44 PLN/ml e-savukenesteelle; kertakäyttöisessä e-savukkeessa lisäksi 40 PLN/laitetta; höyrystinlaitteet ja osasarjat 40 PLN/kpl tai sarja",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "E-savukenesteet, kertakäyttölaitteet, uudelleenkäytettävät höyrystimet ja osasarjat",
        "caveat": "Vuoden 2026 virallinen verokantataulukko vahvistaa kannat mutta ei julkaise samalla taulukolla verotettua määrää tai kertymää",
        "rateUrl": "https://www.podatki.gov.pl/akcyza/stawki-podatkowe",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Alankomaat",
      "sourceName": "Netherlands",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 2.32,
        "disposable1ml": 2.98,
        "open10ml": 2.75
      },
      "totalPct": {
        "closed": 17.36,
        "disposable": 17.36,
        "open": 17.36
      },
      "excisePct": {
        "closed": 0.0,
        "disposable": 0.0,
        "open": 0.0
      },
      "derivedRate": 0.0,
      "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current national treatment requires Belastingdienst verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-nld.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0 EUR/ml erillistä e-nestevalmisteveroa vuoden 2026 Wet op de accijns -lain verotuoteluettelossa",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "Vuonna 2026 voimassa oleva Wet op de accijns luettelee valmisteveron kohteiksi alkoholin, mineraaliöljyt ja tupakkatuotteet; e-nesteitä säännellään tupakkaan liittyvinä tuotteina mutta niitä ei lisätä valmisteverotuotteeksi",
        "caveat": "Nollakanta on dokumentoitu oikeudellinen luokituspäätelmä lain tyhjentävästä tuoteluettelosta; ALV ja tuonnin tullit ovat erillisiä; myyntikanavia ja makuja koskee erillinen sääntely",
        "rateUrl": "https://wetten.overheid.nl/jci1.3:c:BWBR0005251&g=2026-04-10&z=2026-04-10",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Belgia",
      "sourceName": "Belgium",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 2.38,
        "disposable1ml": 4.25,
        "open10ml": 4.95
      },
      "totalPct": {
        "closed": 23.67,
        "disposable": 20.88,
        "open": 47.66
      },
      "excisePct": {
        "closed": 6.32,
        "disposable": 3.53,
        "open": 30.3
      },
      "derivedRate": 0.15,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO snapshot shows excise; current national rate requires FPS Finance verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-bel.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "partial",
        "rate": "0,1500 EUR/ml erityistä valmisteveroa kulutukseen luovutetuille e-nesteille",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "Kaikki Belgiassa kulutukseen luovutetut e-nesteet",
        "caveat": "Kanta täsmää WHO:n riippumattomaan tarkistukseen ja Belgian säädöksen toisintolähteeseen, mutta FOD Finances ohjaa nykyiset tariffit kirjautumista vaativaan Fisconetplus/TarBel-järjestelmään; suora virallinen tariffirivi on vielä tallentamatta",
        "rateUrl": "https://financien.belgium.be/nl/douane_accijnzen/ondernemingen/accijnzen/algemene_informatie/accijnstarieven",
        "volumeUrl": "",
        "revenueUrl": "https://etaamb.openjustice.be/fr/loiprogramme-du-22-decembre-2023_n2023048600.html"
      }
    },
    {
      "name": "Luxemburg",
      "sourceName": "Luxembourg",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 1.95,
        "disposable1ml": 3.75,
        "open10ml": 4.15
      },
      "totalPct": {
        "closed": 14.53,
        "disposable": 14.53,
        "open": 14.53
      },
      "excisePct": {
        "closed": 0.0,
        "disposable": 0.0,
        "open": 0.0
      },
      "derivedRate": 0.0,
      "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current national treatment requires customs/excise verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-lux.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0 EUR/ml erillistä e-nestevalmisteveroa vuoden 2026 virallisessa valmisteverotuoteluettelossa",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "Guichet.lu ja vuoden 2026 Douanes et Accises -lupahakemus luettelevat valmisteverotuotteiksi alkoholin, energiatuotteet sekä savukkeet, sikarit ja polttotupakan; e-nesteelle ei ole omaa veroluokkaa",
        "caveat": "Nollakanta on dokumentoitu luokituspäätelmä virallisista täydellisiksi ilmoitetuista tavaraluetteloista, ei erillinen viranomaisen nollatodistus; ALV ja tuontitulli ovat erillisiä; vuoden 2025 valvontatiedotteen 12 897 EUR vältetyt valmisteverot koskevat sekoitettua takavarikkoa eikä niitä saa kohdistaa 90 litraan e-nestettä",
        "rateUrl": "https://guichet.public.lu/fr/entreprises/import-export/intra-ue/echanges-intra-ue/commerce-accises.html",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Suomi",
      "sourceName": "Finland",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": null,
        "disposable1ml": 3.95,
        "open10ml": 5.0
      },
      "totalPct": {
        "closed": null,
        "disposable": 26.95,
        "open": 79.35
      },
      "excisePct": {
        "closed": null,
        "disposable": 7.59,
        "open": 60.0
      },
      "derivedRate": 0.3,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "National tax rate and taxed-volume PXWeb series require direct Vero extraction",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-fin.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0,40 EUR/ml vuonna 2026; sekä nikotiinilliset että käyttötarkoituksen perusteella verolliset nikotiinittomat e-nesteet",
        "taxedVolume": "11823.492 L",
        "actualRevenue": "3 547 047 EUR",
        "revenuePeriod": "2025",
        "forecast": "not_obtained",
        "scope": "Verohallinnon nettovolyymi ja nettoveron määrä tuoteryhmille TBC07 ja TBC7A",
        "caveat": "Vuosi 2025 on täysi 12 kuukauden sarja; vuoden 2026 tieto kattaa tällä hetkellä tammi–huhtikuun",
        "rateUrl": "https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/valmisteverotus/tupakkavero/",
        "volumeUrl": "https://vero2.stat.fi/PXWeb/api/v1/en/Vero/Valmistevero/vvt_010.px",
        "revenueUrl": "https://vero2.stat.fi/PXWeb/api/v1/en/Vero/Valmistevero/vvt_010.px"
      }
    },
    {
      "name": "Ruotsi",
      "sourceName": "Sweden",
      "status": "numeric_data",
      "currency": "SEK",
      "prices": {
        "closed1ml": 41.67,
        "disposable1ml": 34.5,
        "open10ml": 69.0
      },
      "totalPct": {
        "closed": 29.7,
        "disposable": 31.71,
        "open": 49.28
      },
      "excisePct": {
        "closed": 9.7,
        "disposable": 11.71,
        "open": 29.28
      },
      "derivedRate": 2.02,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current national rate requires Skatteverket verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-swe.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "2 087 SEK/litra eli 2,087 SEK/ml; vahva 15–20 mg/ml e-neste 4 174 SEK/litra eli 4,174 SEK/ml",
        "taxedVolume": "26 000 litraa vuonna 2024: 14 000 litraa vahvoja ja 12 000 litraa muita e-nesteitä",
        "actualRevenue": "80 milj. SEK: 60 milj. vahvoista ja 20 milj. muista e-nesteistä",
        "revenuePeriod": "2024",
        "forecast": "not_obtained",
        "scope": "Nikotiinia sisältävät e-nesteet",
        "caveat": "Finansdepartementin Beräkningskonventioner 2026 taulukko 7.5 yhdistää Ekonomistyrningsverketin, Skatteverketin ja ministeriön laskennan. Vuosi 2024 on viimeisin täysi vertailuvuosi, mutta luku ei ole julkaistu raakaverotilin tapahtumaotteena; sarjaa päivitetään ja pyöristetään.",
        "rateUrl": "https://www.skatteverket.se/foretagochorganisationer/skatter/punktskatter/nikotinskatt.4.41f1c61d16193087d7fc7fe.html",
        "volumeUrl": "https://www.regeringen.se/contentassets/1ed01e00001b42e5ad8d47433db63ece/berakningskonventioner_2026.pdf",
        "revenueUrl": "https://www.regeringen.se/contentassets/1ed01e00001b42e5ad8d47433db63ece/berakningskonventioner_2026.pdf"
      }
    },
    {
      "name": "Tanska",
      "sourceName": "Denmark",
      "status": "numeric_data",
      "currency": "DKK",
      "prices": {
        "closed1ml": 16.25,
        "disposable1ml": 27.5,
        "open10ml": 52.0
      },
      "totalPct": {
        "closed": 29.23,
        "disposable": 29.09,
        "open": 48.85
      },
      "excisePct": {
        "closed": 9.23,
        "disposable": 9.09,
        "open": 28.85
      },
      "derivedRate": 1.5,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current national rate requires Skattestyrelsen verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-dnk.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "1,50 DKK/ml kun nikotiinia on enintään 12 mg/ml; 2,50 DKK/ml yli 12 mg/ml",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "90 milj. DKK vuoden 2025 vuotuinen verotuotto voimassa olevilla säännöillä",
        "scope": "Nikotiinia sisältävät nesteet",
        "caveat": "Skatteministerietin vastaus Folketingetille ilmoittaa 2025 vuotuisen tuoton pyöristettynä lähimpään 5 milj. DKK:hon; kyse on arviosta, ei toteutuneesta tilinpäätösluvusta. Nimelliskannoilla 90 milj. DKK vastaa noin 36 000–60 000 litran haarukkaa ennen pyöristyksen ja sekoitetun vahvuusjakauman huomiointia.",
        "rateUrl": "https://skm.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/forbrugsafgiftsloven",
        "volumeUrl": "",
        "revenueUrl": "https://www.ft.dk/samling/20231/almdel/sau/spm/678/svar/2074316/2914215.pdf"
      }
    },
    {
      "name": "Norja",
      "sourceName": "Norway",
      "status": "sale_banned",
      "currency": "",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO profile reports sale banned for all three e-liquid formats in its observation; current legal route must be checked nationally",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-nor.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": null
    },
    {
      "name": "Itävalta",
      "sourceName": "Austria",
      "status": "numeric_data",
      "currency": "EUR",
      "prices": {
        "closed1ml": 2.48,
        "disposable1ml": 4.0,
        "open10ml": 6.95
      },
      "totalPct": {
        "closed": 16.67,
        "disposable": 16.67,
        "open": 16.67
      },
      "excisePct": {
        "closed": 0.0,
        "disposable": 0.0,
        "open": 0.0
      },
      "derivedRate": 0.0,
      "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current national treatment requires Ministry of Finance verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-aut.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "200 EUR/litra eli 0,20 EUR/ml 1.4.2026–31.1.2027; 230 EUR/litra 1.2.2027 alkaen; 260 EUR/litra 1.2.2028 alkaen",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "55 milj. EUR lisätuloa vuonna 2026 veromuutoksista yhteensä",
        "scope": "E-nesteet niiden nikotiinipitoisuudesta riippumatta",
        "caveat": "55 milj. EUR ei ole e-nesteiden erillinen ennuste vaan sisältää myös nikotiinipussit ja muut tabaksteuermuutokset; toteutunutta e-nestekertymää ei vielä ole",
        "rateUrl": "https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Anlage=&Artikel=&Gesetzesnummer=10004877&Paragraf=4&Uebergangsrecht=",
        "volumeUrl": "",
        "revenueUrl": "https://www.parlament.gv.at/fachinfos/budgetdienst/Betrugsbekaempfungspaket-und-Abgabenaenderungsgesetz-2025"
      }
    },
    {
      "name": "Sveitsi",
      "sourceName": "Switzerland",
      "status": "numeric_data",
      "currency": "CHF",
      "prices": {
        "closed1ml": 3.95,
        "disposable1ml": 2.1,
        "open10ml": 5.9
      },
      "totalPct": {
        "closed": 7.49,
        "disposable": 7.49,
        "open": 7.49
      },
      "excisePct": {
        "closed": 0.0,
        "disposable": 0.0,
        "open": 0.0
      },
      "derivedRate": 0.0,
      "derivedBasis": "WHO reports VAT only in the observed cheapest-brand prices",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current national treatment requires Federal Customs/FOCBS verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-che.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "0,20 CHF/ml nikotiinia sisältäville uudelleenkäytettävien e-savukkeiden nesteille; 1,00 CHF/ml kertakäyttöisille e-savukkeille nikotiinista riippumatta",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "Uudelleenkäytettävien laitteiden nikotiininesteet ja kaikki kertakäyttöiset e-savukkeet",
        "caveat": "BAZG:n 2026 vero-ohje vahvistaa kannat ja tullinimikkeet mutta ei erota julkisesti e-savukkeiden verokertymää koko tupakkaverosta",
        "rateUrl": "https://www.bazg.admin.ch/dam/de/sd-web/LOdB10XnvqWr/R-120-3%20Tabaksteuer_01.03.26_Korrektur.pdf",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Yhdistynyt kuningaskunta",
      "sourceName": "United Kingdom",
      "status": "numeric_data",
      "currency": "GBP",
      "prices": {
        "closed1ml": 1.76,
        "disposable1ml": null,
        "open10ml": 3.99
      },
      "totalPct": {
        "closed": 16.67,
        "disposable": null,
        "open": 16.67
      },
      "excisePct": {
        "closed": 0.0,
        "disposable": null,
        "open": 0.0
      },
      "derivedRate": 0.0,
      "derivedBasis": "WHO reports VAT only in available formats",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO snapshot has no specific excise; monitor announced Vaping Products Duty and verify effective date with HMRC",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-gbr.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "2.20 GBP / 10 ml eli 0.22 GBP/ml 1.10.2026 alkaen; kaikki e-nesteet nikotiinista riippumatta",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "135 milj. GBP 2026-27; 400 milj. GBP 2027-28; 465 milj. GBP 2028-29; 530 milj. GBP 2029-30; 565 milj. GBP 2030-31",
        "scope": "Tuleva Vaping Products Duty",
        "caveat": "Ennuste on OBR:n sertifioima julkisen talouden vaikutus eikä toteutunut verotuotto",
        "rateUrl": "https://www.gov.uk/guidance/how-to-pay-vaping-products-duty",
        "volumeUrl": "",
        "revenueUrl": "https://www.gov.uk/government/publications/introduction-of-vaping-products-duty-from-1-october-2026/introduction-of-vaping-products-duty-from-1-october-2026"
      }
    },
    {
      "name": "Kiina",
      "sourceName": "China",
      "status": "no_numeric_data",
      "currency": "CNY",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "Current production/import and wholesale consumption-tax treatment requires Ministry of Finance/STA evidence; WHO profile has no numeric retail observation",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-chn.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": {
        "asOf": "2026-07-17",
        "status": "verified",
        "rate": "36 % tuotanto-/tuontivaiheessa ja 11 % tukkumyyntivaiheessa",
        "taxedVolume": "not_obtained",
        "actualRevenue": "not_obtained",
        "revenuePeriod": "",
        "forecast": "not_obtained",
        "scope": "E-savukkeet mukaan lukien patruunat laitteet ja yhdistelmät",
        "caveat": "Tuotekohtaista verotettua volyymia tai verokertymää ei saatu; vientiin sovelletaan veronpalautus-/vapautuspolitiikkaa",
        "rateUrl": "https://jsz.mof.gov.cn/zhengcefagui/202210/t20221028_3848463.htm",
        "volumeUrl": "",
        "revenueUrl": ""
      }
    },
    {
      "name": "Japani",
      "sourceName": "Japan",
      "status": "no_numeric_data",
      "currency": "JPY",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO profile has no numeric retail e-liquid tax observation; verify legal product classification and consumption tax nationally",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-jpn.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": null
    },
    {
      "name": "Etelä-Korea",
      "sourceName": "South Korea",
      "status": "no_numeric_data",
      "currency": "KRW",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO profile has no numeric retail observation; liquid nicotine and synthetic nicotine taxes require Ministry of Economy and Finance/NTS evidence",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-kor.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": null
    },
    {
      "name": "Australia",
      "sourceName": "Australia",
      "status": "sale_banned",
      "currency": "",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO profile reports retail sale banned for observed formats; lawful pharmacy supply and GST/excise treatment require separate TGA/ATO analysis",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-aus.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": null
    },
    {
      "name": "Brasilia",
      "sourceName": "Brazil",
      "status": "sale_banned",
      "currency": "",
      "prices": {
        "closed1ml": null,
        "disposable1ml": null,
        "open10ml": null
      },
      "totalPct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "excisePct": {
        "closed": null,
        "disposable": null,
        "open": null
      },
      "derivedRate": null,
      "derivedBasis": "",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO profile reports sale banned; no lawful retail excise market should be inferred",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-bra.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": null
    },
    {
      "name": "Venäjä",
      "sourceName": "Russia",
      "status": "numeric_data",
      "currency": "RUB",
      "prices": {
        "closed1ml": null,
        "disposable1ml": 159.9,
        "open10ml": 600.0
      },
      "totalPct": {
        "closed": null,
        "disposable": 42.93,
        "open": 85.97
      },
      "excisePct": {
        "closed": null,
        "disposable": 26.27,
        "open": 70.0
      },
      "derivedRate": 42.0,
      "derivedBasis": "WHO open-system price multiplied by specific-excise share and divided by 10 ml",
      "taxedVolume": "not_obtained",
      "taxRevenue": "not_obtained",
      "verification": "WHO snapshot shows excise; current national rate and legal status require official Russian verification",
      "url": "https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/gtrc-2025/tobacco-2025-rus.pdf",
      "tier": "B",
      "period": "WHO Report 2025 country profile",
      "national": null
    }
  ],
  "taxAudit": {
    "profileCount": 23,
    "numericCount": 15,
    "specificExciseCount": 8,
    "banCount": 3,
    "nationalVerifiedCount": 15,
    "officialVolumeCount": 3,
    "officialRevenueCount": 4,
    "method": "WHO:n vuoden 2025 maaprofiilien sivu 9 raportoi halvimpien closed-, disposable- ja open-system e-nesteiden hinnan sekä kokonaisveron, valmisteveron, ALV:n, tullin ja muut verot prosenttina vähittäishinnasta. Pixan-auditointi säilyttää puuttuvat solut puuttuvina ja johtaa €/ml- tai paikallisvaluutta/ml-luvun vain hinnan ja WHO:n specific excise -osuuden tulona. Johdettu kanta merkitään B-tason tarkistusluvuksi, ei nykyiseksi lakikannaksi."
  },
  "customs": [
    {
      "market": "Yhdysvallat",
      "sourceMarket": "United States",
      "period": 2025,
      "code": "854340",
      "valueUsd": 195734104.0,
      "quantity": 146228693.0,
      "netKg": 2052792.203,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=842&flowCode=M&partnerCode=0&cmdCode=854340&maxRecords=500"
    },
    {
      "market": "Yhdysvallat",
      "sourceMarket": "United States",
      "period": 2025,
      "code": "240412",
      "valueUsd": 254069995.0,
      "quantity": 5568038.0,
      "netKg": 5568038.0,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=842&flowCode=M&partnerCode=0&cmdCode=240412&maxRecords=500"
    },
    {
      "market": "Yhdysvallat",
      "sourceMarket": "United States",
      "period": 2025,
      "code": "240419",
      "valueUsd": 4162780.0,
      "quantity": 493628.0,
      "netKg": 493628.0,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=842&flowCode=M&partnerCode=0&cmdCode=240419&maxRecords=500"
    },
    {
      "market": "Kanada",
      "sourceMarket": "Canada",
      "period": 2025,
      "code": "854340",
      "valueUsd": 64710367.759,
      "quantity": 14517955.0,
      "netKg": 678660.16,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=124&flowCode=M&partnerCode=0&cmdCode=854340&maxRecords=500"
    },
    {
      "market": "Kanada",
      "sourceMarket": "Canada",
      "period": 2025,
      "code": "240412",
      "valueUsd": 227580066.62,
      "quantity": 5751393.977,
      "netKg": 5751393.977,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=124&flowCode=M&partnerCode=0&cmdCode=240412&maxRecords=500"
    },
    {
      "market": "Kanada",
      "sourceMarket": "Canada",
      "period": 2025,
      "code": "240419",
      "valueUsd": 265703.773,
      "quantity": 5953.575,
      "netKg": 5953.575,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=124&flowCode=M&partnerCode=0&cmdCode=240419&maxRecords=500"
    },
    {
      "market": "Japani",
      "sourceMarket": "Japan",
      "period": 2025,
      "code": "854340",
      "valueUsd": 564562925.182,
      "quantity": 20519028.0,
      "netKg": 5920942.48,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=392&flowCode=M&partnerCode=0&cmdCode=854340&maxRecords=500"
    },
    {
      "market": "Japani",
      "sourceMarket": "Japan",
      "period": 2025,
      "code": "240412",
      "valueUsd": 27625.702,
      "quantity": 135.0,
      "netKg": 135.0,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=392&flowCode=M&partnerCode=0&cmdCode=240412&maxRecords=500"
    },
    {
      "market": "Japani",
      "sourceMarket": "Japan",
      "period": 2025,
      "code": "240419",
      "valueUsd": 46722811.541,
      "quantity": 805458.0,
      "netKg": 805458.0,
      "reported": false,
      "aggregate": true,
      "url": "https://comtradeapi.un.org/public/v1/preview/C/A/HS?period=2025&reporterCode=392&flowCode=M&partnerCode=0&cmdCode=240419&maxRecords=500"
    }
  ],
  "eurostatRoutes": [
    {
      "reporter": "EU27_2020",
      "market": "EU-27",
      "worldEur": null,
      "intraEur": null,
      "extraEur": 2240456135.0,
      "extraShare": 100.0,
      "basis": "EU:n ulkoraja; vain extra-EU-tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "DE",
      "market": "Saksa",
      "worldEur": 980833215.0,
      "intraEur": 129732288.0,
      "extraEur": 851100927.0,
      "extraShare": 86.7732570618543,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "IT",
      "market": "Italia",
      "worldEur": 419045056.0,
      "intraEur": 294727146.0,
      "extraEur": 124317910.0,
      "extraShare": 29.66695543116013,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "FR",
      "market": "Ranska",
      "worldEur": 347118534.0,
      "intraEur": 134793050.0,
      "extraEur": 212325484.0,
      "extraShare": 61.16800550903456,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "PL",
      "market": "Puola",
      "worldEur": 210579736.0,
      "intraEur": 117476629.0,
      "extraEur": 93103107.0,
      "extraShare": 44.21275701475853,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "NL",
      "market": "Alankomaat",
      "worldEur": 204763244.0,
      "intraEur": 28723436.0,
      "extraEur": 176039808.0,
      "extraShare": 85.97236718910352,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "ES",
      "market": "Espanja",
      "worldEur": 143444826.0,
      "intraEur": 67732962.0,
      "extraEur": 75711864.0,
      "extraShare": 52.781174554180154,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "BE",
      "market": "Belgia",
      "worldEur": 127340939.0,
      "intraEur": 19552292.0,
      "extraEur": 107788647.0,
      "extraShare": 84.64571397577019,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "AT",
      "market": "Itävalta",
      "worldEur": 73124990.0,
      "intraEur": 27534343.0,
      "extraEur": 45590647.0,
      "extraShare": 62.34619245759897,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "SE",
      "market": "Ruotsi",
      "worldEur": 50027654.0,
      "intraEur": 12248870.0,
      "extraEur": 37778784.0,
      "extraShare": 75.51580172038449,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "DK",
      "market": "Tanska",
      "worldEur": 14386010.0,
      "intraEur": 8305811.0,
      "extraEur": 6080199.0,
      "extraShare": 42.26466546318263,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "LU",
      "market": "Luxemburg",
      "worldEur": 11009319.0,
      "intraEur": 10980833.0,
      "extraEur": 28486.0,
      "extraShare": 0.25874443278462544,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    },
    {
      "reporter": "FI",
      "market": "Suomi",
      "worldEur": 5603452.0,
      "intraEur": 5097770.0,
      "extraEur": 505682.0,
      "extraShare": 9.024472771427327,
      "basis": "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
      "url": "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?freq=A&reporter=EU27_2020&reporter=AT&reporter=BE&reporter=DE&reporter=DK&reporter=ES&reporter=FI&reporter=FR&reporter=IT&reporter=LU&reporter=NL&reporter=PL&reporter=SE&partner=WORLD&partner=INT_EU27_2020&partner=EXT_EU27_2020&product=85434000&product=24041200&product=24041910&product=24041990&flow=1&indicators=VALUE_IN_EUROS&indicators=QUANTITY_IN_100KG&indicators=SUPPLEMENTARY_QUANTITY&time=2025&lang=en"
    }
  ],
  "eurostatOrigins": [
    {
      "code": "24041200",
      "partner": "Kiina",
      "valueEur": 1302170486.0,
      "sharePct": 95.67470820602512,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 1
    },
    {
      "code": "24041200",
      "partner": "Iso-Britannia",
      "valueEur": 33100919.0,
      "sharePct": 2.432032364981948,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 2
    },
    {
      "code": "24041200",
      "partner": "Hongkong",
      "valueEur": 9207310.0,
      "sharePct": 0.6764910640221783,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 3
    },
    {
      "code": "24041200",
      "partner": "Laos",
      "valueEur": 7218987.0,
      "sharePct": 0.5304024950601504,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 4
    },
    {
      "code": "24041200",
      "partner": "Indonesia",
      "valueEur": 6797208.0,
      "sharePct": 0.49941301773265623,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 5
    },
    {
      "code": "85434000",
      "partner": "Kiina",
      "valueEur": 724244429.0,
      "sharePct": 82.37261031281237,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 1
    },
    {
      "code": "85434000",
      "partner": "Malesia",
      "valueEur": 123861437.0,
      "sharePct": 14.087495152532211,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 2
    },
    {
      "code": "85434000",
      "partner": "Indonesia",
      "valueEur": 21783126.0,
      "sharePct": 2.4775239926531643,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 3
    },
    {
      "code": "85434000",
      "partner": "Yhdysvallat",
      "valueEur": 2337059.0,
      "sharePct": 0.2658075679654982,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 4
    },
    {
      "code": "85434000",
      "partner": "Hongkong",
      "valueEur": 1707218.0,
      "sharePct": 0.19417201900633316,
      "basis": "Alkuperämaa EU:n ulkopuolella",
      "rank": 5
    }
  ],
  "narrowCustoms": [
    {
      "market": "Japani",
      "valueUsd": 564590550.8840001
    },
    {
      "market": "Yhdysvallat",
      "valueUsd": 449804099.0
    },
    {
      "market": "Kanada",
      "valueUsd": 292290434.379
    }
  ],
  "codes": [
    {
      "code": "8543.40",
      "title": "Sähköiset höyrystinlaitteet",
      "detail": "Personal electric vaporising devices. Kansallinen 8–10-numeroinen alanimike tarvitaan osien ja laitteiden erotteluun.",
      "include": "Laitteet ja mahdolliset laiteosat nimikerajauksen mukaan."
    },
    {
      "code": "2404.12",
      "title": "Nikotiinia sisältävät inhaloitavat tuotteet",
      "detail": "Sisältää nikotiinia sisältäviä tuotteita ilman palamista. Voi kattaa e-nesteitä ja kertakäyttötuotteita.",
      "include": "Kapean tullikorin neste-/disposable-proxy."
    },
    {
      "code": "2404.19",
      "title": "Muut inhaloitavat tuotteet",
      "detail": "Muu kuin nikotiinia sisältävä ryhmä on laaja. Sitä ei kutsuta e-nesteeksi ilman kansallista tarkennetta.",
      "include": "Näytetään erikseen, ei kapeassa summassa."
    }
  ],
  "stress": [
    {
      "market": "Kanada",
      "basis": "2024 virallinen toimitusmyynti 1 160,8 milj. CAD",
      "scenarios": [
        {
          "name": "Kova stressi",
          "price": "−20 %",
          "volume": "−30 %",
          "value": "650 milj. CAD"
        },
        {
          "name": "Maltillinen",
          "price": "−5 %",
          "volume": "−10 %",
          "value": "992 milj. CAD"
        },
        {
          "name": "Hintaherkkyys",
          "price": "+5 %",
          "volume": "0 %",
          "value": "1 219 milj. CAD"
        }
      ],
      "note": "Laskenta: virallinen vuoden 2024 arvo × hinnan muutos × volyymin muutos."
    },
    {
      "market": "Saksa",
      "basis": "2025 virallinen verotettu määrä 1,5 milj. litraa",
      "scenarios": [
        {
          "name": "Alhainen hinta",
          "price": "5 €/10 ml",
          "volume": "1,5 milj. l",
          "value": "750 milj. €"
        },
        {
          "name": "Keskihinta",
          "price": "7,5 €/10 ml",
          "volume": "1,5 milj. l",
          "value": "1 125 milj. €"
        },
        {
          "name": "Korkea hinta",
          "price": "10 €/10 ml",
          "volume": "1,5 milj. l",
          "value": "1 500 milj. €"
        }
      ],
      "note": "Hinnat ovat havainnollistavia. Ennen pankkikäyttöä ne täsmäytetään dokumentoituun vähittäishintaotokseen."
    }
  ],
  "evidence": [
    {
      "grade": "A",
      "title": "Health Canada · Vaping sales",
      "coverage": "Kanada 2023–2024: arvo, yksiköt, litrat ja tuoteryhmät",
      "use": "Nykyinen virallinen markkina-ankkuri",
      "url": "https://health-infobase.canada.ca/substance-use/vaping/sales/"
    },
    {
      "grade": "A",
      "title": "Destatis · tabakverotilasto",
      "coverage": "Saksa 2025: verotettu tupakan korvike-/e-nestemäärä",
      "use": "Nykyinen virallinen volyymiankkuri",
      "url": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html"
    },
    {
      "grade": "A",
      "title": "Verohallinto · valmisteverotilasto",
      "coverage": "Suomi 2023–2026: e-nesteiden kuukausittainen nettovolyymi ja nettovero",
      "use": "Nykyinen virallinen vero- ja volyymiankkuri",
      "url": "https://vero2.stat.fi/PXWeb/pxweb/en/Vero/Vero__Valmistevero/vvt_010.px/"
    },
    {
      "grade": "A",
      "title": "Saksan tupakkaverolaki §2",
      "coverage": "Verokanta 0,26 €/ml vuonna 2025 ja 0,32 €/ml vuodesta 2026",
      "use": "Veropohjan auditointilaskelma",
      "url": "https://www.gesetze-im-internet.de/tabstg_2009/__2.html"
    },
    {
      "grade": "A",
      "title": "EU Tobacco Products Directive 20(7)",
      "coverage": "Vuosittaiset myyntimäärät tuotemerkki- ja tyyppitasolla kansallisille viranomaisille",
      "use": "Oikeusperusta aggregoitujen tietopyyntöjen kohdentamiseen",
      "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0040"
    },
    {
      "grade": "B",
      "title": "UN Comtrade",
      "coverage": "USA, Kanada ja Japani 2025: HS 854340, 240412 ja 240419",
      "use": "Rajakaupan suuruusluokka ja ristiintarkastus",
      "url": "https://comtradeplus.un.org/"
    },
    {
      "grade": "B",
      "title": "Eurostat Comext DS-045409",
      "coverage": "EU:n extra- ja intra-EU CN8-kauppa alkuperä- ja lähetysmaittain",
      "use": "EU:n reitti- ja hubikorjaus",
      "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"
    },
    {
      "grade": "A",
      "title": "FTC E-Cigarette Report 2021",
      "coverage": "Yhdeksän valmistajan cartridge/disposable-myynti 2,763 mrd USD",
      "use": "Historiallinen USA-vertailu, ei nykyinen kokonaismarkkina",
      "url": "https://www.ftc.gov/reports/e-cigarette-report-2021"
    },
    {
      "grade": "B",
      "title": "Japan Customs methodology",
      "coverage": "CIF-tuonti, alkuperämaa ja 9-numeroinen kansallinen nimike",
      "use": "Japanin kansallisen tullisarjan määrittely",
      "url": "https://www.customs.go.jp/toukei/sankou/howto/gaiyou_e.htm"
    }
  ],
  "contacts": [
    {
      "id": "PX-US-001",
      "market": "Yhdysvallat",
      "authority": "U.S. Census Bureau International Trade",
      "channel": "eid.international.trade.data@census.gov",
      "scope": "HS 854340 monthly imports 2022-current including quantity unit and revision policy",
      "status": "sent",
      "sent": "2026-07-16",
      "followUp": "2026-07-23"
    },
    {
      "id": "PX-CA-001",
      "market": "Kanada",
      "authority": "Statistics Canada International Trade Division",
      "channel": "infostats@statcan.gc.ca",
      "scope": "HS 854340 monthly imports 2022-current including quantity unit and revision policy",
      "status": "sent",
      "sent": "2026-07-16",
      "followUp": "2026-07-23"
    },
    {
      "id": "PX-EU-001",
      "market": "European Union",
      "authority": "Eurostat Comext",
      "channel": "https://ec.europa.eu/eurostat/help/support",
      "scope": "EU27 and member-state CN 854340 monthly imports 2022-current",
      "status": "queued",
      "sent": "—",
      "followUp": "—"
    },
    {
      "id": "PX-JP-001",
      "market": "Japani",
      "authority": "Japan Customs",
      "channel": "https://www.customs.go.jp/toukei/info/index_e.htm",
      "scope": "HS 854340 monthly imports 2022-current",
      "status": "queued",
      "sent": "—",
      "followUp": "—"
    },
    {
      "id": "PX-CN-001",
      "market": "Kiina",
      "authority": "General Administration of Customs",
      "channel": "https://english.customs.gov.cn/Statistics/Statistics",
      "scope": "HS 854340 monthly exports and imports 2022-current",
      "status": "queued",
      "sent": "—",
      "followUp": "—"
    },
    {
      "id": "PX-CA-002",
      "market": "Kanada",
      "authority": "Health Canada Tobacco Control",
      "channel": "hc.tcp.questions-plt.sc@canada.ca",
      "scope": "Official Vaping sales dashboard data 2023-current and downloadable methodology",
      "status": "sent",
      "sent": "2026-07-16",
      "followUp": "2026-07-23"
    },
    {
      "id": "PX-UK-001",
      "market": "Great Britain",
      "authority": "MHRA",
      "channel": "info@mhra.gov.uk",
      "scope": "Aggregate annual e-cigarette sales volumes submitted under TRPR Regulation 32 for 2022-current",
      "status": "sent",
      "sent": "2026-07-16",
      "followUp": "2026-07-23"
    },
    {
      "id": "PX-AU-001",
      "market": "Australia",
      "authority": "Department of Health Tobacco Reporting",
      "channel": "tobaccoreporting@health.gov.au",
      "scope": "Published aggregate sales volumes and pricing reports covering vaping products 2024-current",
      "status": "sent",
      "sent": "2026-07-16",
      "followUp": "2026-07-23"
    }
  ],
  "tasks": [
    {
      "priority": "high",
      "title": "EU-27 CN8-reittimatriisi",
      "detail": "Valmis 2025: EU-ulkoraja 2,240 mrd EUR ja 12 jäsenmaan WORLD/intra/extra-jako, CN8 85434000 + 24041200. Kaikki ryhmärivit täsmäytyivät 0 EUR erolla.",
      "status": "done"
    },
    {
      "priority": "high",
      "title": "EU-CEG aggregoidut myyntipyynnöt",
      "detail": "Lähetä Article 20(7) -pyynnöt kansallisille toimivaltaisille viranomaisille, ilman yritystason luottamuksellisia tietoja.",
      "status": "queued"
    },
    {
      "priority": "high",
      "title": "USA HTS10 kulutukseen luovutettu tuonti",
      "detail": "Hanki Census-avain tai dataote; erota general imports, imports for consumption ja re-exports.",
      "status": "requested"
    },
    {
      "priority": "high",
      "title": "Kanadan 2025 reittitäsmäytys",
      "detail": "CIMT 10-digit + origin/export country + foreign-origin re-exports, täsmäytys Health Canadan toimitusmyyntiin.",
      "status": "requested"
    },
    {
      "priority": "medium",
      "title": "Japani 9-numeroinen nimike",
      "detail": "Hae Japan Customs -sarja alkuperämaittain ja erota laitteet, nikotiinituotteet ja muut inhaloitavat tuotteet.",
      "status": "queued"
    },
    {
      "priority": "medium",
      "title": "Kiina GACC tullimenettelyineen",
      "detail": "Hae alkuperä, lähetysmaa, tullimenettely ja maahantuojan sijainti; erottele vientihubi ja kotimarkkina.",
      "status": "queued"
    },
    {
      "priority": "medium",
      "title": "Saksan vähittäishintaotos",
      "detail": "Dokumentoi 10 ml -vertailuhinnat veroineen ja ilman veroa; korvaa havainnollistavat hintastressit todistetulla otoksella.",
      "status": "active"
    },
    {
      "priority": "high",
      "title": "Kaikkien maiden verovarmennus",
      "detail": "WHO 2025 -vertailu on tehty 23 maalle. Varmista seuraavaksi kansallinen nykykanta, verotettu volyymi ja e-nesteisiin kohdistettu verotuotto erillisinä kenttinä.",
      "status": "active"
    },
    {
      "priority": "low",
      "title": "Patenttistatuksen erillinen varmennus",
      "detail": "Tarkista oikeudellinen voimassaolo ja maksut maa kerrallaan virallisista rekistereistä. Ei sekoiteta markkinakoon näyttöön.",
      "status": "queued"
    }
  ],
  "method": [
    {
      "step": "01",
      "title": "Määritä tuote",
      "detail": "Laitteet, podit/osat, nikotiininesteet ja muut nesteet erotetaan kansalliseen nimiketasoon asti."
    },
    {
      "step": "02",
      "title": "Hae virallinen virta",
      "detail": "Tulli-, vero- ja pakollinen valmistajaraportointi tallennetaan alkuperäisine lähdelinkkeineen ja hakupäivineen."
    },
    {
      "step": "03",
      "title": "Korjaa reitti",
      "detail": "Alkuperämaa, lähetysmaa, varasto, re-export ja kulutukseen luovutus käsitellään erillisinä kenttinä."
    },
    {
      "step": "04",
      "title": "Täsmäytä myyntiin",
      "detail": "Tullivirtaa verrataan vero-, EU-CEG-, valmistaja- tai lisensoituun kassamyyntisarjaan. Erot selitetään."
    }
  ]
};
