#!/usr/bin/env python3
"""Build the public dashboard payload from the Pixan evidence workspace."""

from __future__ import annotations

import csv
import json
from datetime import datetime, timezone
from pathlib import Path


DASHBOARD_DIR = Path(__file__).resolve().parents[1]
PROJECT_DIR = DASHBOARD_DIR.parent / "pixan_market_evidence"


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def public_contact(value: str) -> str:
    value = (value or "").strip()
    if value.startswith("http://") or value.startswith("https://"):
        return value
    if "@" in value:
        return value
    return "Viranomaisen julkinen yhteyskanava"


def status_for_country(name: str) -> str:
    if name in {"Canada", "Germany", "Finland"}:
        return "verified"
    if name in {
        "United States", "Japan", "EU-27", "France", "Italy", "Spain",
        "Poland", "Netherlands", "Belgium", "Luxembourg", "Sweden",
        "Denmark", "Austria",
    }:
        return "partial"
    return "missing"


def fi_country(name: str) -> str:
    labels = {
        "United States": "Yhdysvallat",
        "Canada": "Kanada",
        "EU-27": "EU-27",
        "Germany": "Saksa",
        "France": "Ranska",
        "Italy": "Italia",
        "Spain": "Espanja",
        "Poland": "Puola",
        "Netherlands": "Alankomaat",
        "Belgium": "Belgia",
        "Luxembourg": "Luxemburg",
        "Finland": "Suomi",
        "Sweden": "Ruotsi",
        "Denmark": "Tanska",
        "Norway": "Norja",
        "Austria": "Itävalta",
        "Switzerland": "Sveitsi",
        "United Kingdom": "Yhdistynyt kuningaskunta",
        "China": "Kiina",
        "Japan": "Japani",
        "South Korea": "Etelä-Korea",
        "Australia": "Australia",
        "Brazil": "Brasilia",
        "Russia": "Venäjä",
    }
    return labels.get(name, name)


def choose_customs_file() -> Path:
    candidates = list((PROJECT_DIR / "data" / "derived").glob("uncomtrade_hs_vape_bundle_2025_*.csv"))
    if not candidates:
        raise FileNotFoundError("UN Comtrade dashboard input is missing")
    return max(candidates, key=lambda path: (len(read_csv(path)), path.stat().st_mtime))


def build_payload() -> dict:
    matrix = read_csv(PROJECT_DIR / "country_data_acquisition_matrix.csv")
    tax_rows = read_csv(PROJECT_DIR / "country_tax_evidence.csv")
    national_tax_rows = read_csv(PROJECT_DIR / "current_national_tax_verification.csv")
    requests = read_csv(PROJECT_DIR / "requests.csv")
    customs_rows = read_csv(choose_customs_file())
    eurostat_route_rows = read_csv(PROJECT_DIR / "data" / "derived" / "eurostat_comext_cn8_route_shares_2025.csv")
    eurostat_top_rows = read_csv(PROJECT_DIR / "data" / "derived" / "eurostat_comext_cn8_top_partners_2025.csv")

    national_tax_by_country = {row["country_or_region"]: row for row in national_tax_rows}

    def number(value: str) -> float | None:
        value = (value or "").strip()
        return float(value) if value else None

    taxes = []
    for row in tax_rows:
        national = national_tax_by_country.get(row["country_or_region"])
        taxes.append(
            {
                "name": fi_country(row["country_or_region"]),
                "sourceName": row["country_or_region"],
                "status": row["profile_status"],
                "currency": row["currency"],
                "prices": {
                    "closed1ml": number(row["closed_price_1ml"]),
                    "disposable1ml": number(row["disposable_price_1ml"]),
                    "open10ml": number(row["open_price_10ml"]),
                },
                "totalPct": {
                    "closed": number(row["total_tax_pct_closed"]),
                    "disposable": number(row["total_tax_pct_disposable"]),
                    "open": number(row["total_tax_pct_open"]),
                },
                "excisePct": {
                    "closed": number(row["specific_excise_pct_closed"]),
                    "disposable": number(row["specific_excise_pct_disposable"]),
                    "open": number(row["specific_excise_pct_open"]),
                },
                "derivedRate": number(row["derived_specific_excise_per_ml"]),
                "derivedBasis": row["derived_rate_basis"],
                "taxedVolume": row["official_taxed_volume"],
                "taxRevenue": row["official_tax_revenue"],
                "verification": row["current_national_verification"],
                "url": row["source_url"],
                "tier": row["source_tier"],
                "period": row["period_note"],
                "national": None if not national else {
                    "asOf": national["as_of"],
                    "status": national["status"],
                    "rate": national["current_rate_text"],
                    "taxedVolume": national["official_taxed_volume"],
                    "actualRevenue": national["actual_tax_revenue"],
                    "revenuePeriod": national["revenue_period"],
                    "forecast": national["official_revenue_forecast"],
                    "scope": national["evidence_scope"],
                    "caveat": national["caveat"],
                    "rateUrl": national["rate_source_url"],
                    "volumeUrl": national["volume_source_url"],
                    "revenueUrl": national["revenue_source_url"],
                },
            }
        )

    tax_by_country = {row["sourceName"]: row for row in taxes}

    countries = []
    for row in matrix:
        name = row["country_or_region"]
        country_status = status_for_country(name)
        if country_status == "missing" and name in national_tax_by_country:
            country_status = "partial"
        countries.append(
            {
                "name": fi_country(name),
                "sourceName": name,
                "status": country_status,
                "customs": row["customs_detail_needed"],
                "route": row["route_correction"],
                "salesSource": row["official_sales_or_market_source"],
                "current": row["current_status_2026_07_17"],
                "missing": row["missing_evidence"],
                "how": row["how_to_obtain"],
                "tax": tax_by_country.get(name),
            }
        )

    customs = []
    for row in customs_rows:
        customs.append(
            {
                "market": fi_country(row["market"]),
                "sourceMarket": row["market"],
                "period": int(row["period"]),
                "code": row["hs_code"],
                "valueUsd": float(row["primary_value_usd"] or 0),
                "quantity": float(row["quantity"] or 0),
                "netKg": float(row["net_weight_kg"] or 0),
                "reported": row["is_reported"].lower() == "true",
                "aggregate": row["is_aggregate"].lower() == "true",
                "url": row["source_url"],
            }
        )

    eurostat_names = {
        "EU27_2020": "EU-27", "AT": "Itävalta", "BE": "Belgia",
        "DE": "Saksa", "DK": "Tanska", "ES": "Espanja", "FI": "Suomi",
        "FR": "Ranska", "IT": "Italia", "LU": "Luxemburg",
        "NL": "Alankomaat", "PL": "Puola", "SE": "Ruotsi",
    }
    partner_names = {
        "CN": "Kiina", "MY": "Malesia", "ID": "Indonesia", "US": "Yhdysvallat",
        "HK": "Hongkong", "GB": "Iso-Britannia", "LA": "Laos", "NL": "Alankomaat",
        "HR": "Kroatia", "DE": "Saksa", "FR": "Ranska", "BE": "Belgia",
        "PL": "Puola", "IT": "Italia", "LV": "Latvia",
    }
    eurostat_sums: dict[str, dict[str, float]] = {}
    eurostat_source_url = "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"
    for row in eurostat_route_rows:
        if row["cn8_code"] not in {"85434000", "24041200"}:
            continue
        bucket = eurostat_sums.setdefault(row["reporter"], {"world": 0.0, "intra": 0.0, "extra": 0.0})
        bucket["world"] += float(row["world_import_value_eur"] or 0)
        bucket["intra"] += float(row["intra_eu_import_value_eur"] or 0)
        bucket["extra"] += float(row["extra_eu_import_value_eur"] or 0)
        eurostat_source_url = row["source_url"]

    eurostat_routes = []
    for reporter, values in eurostat_sums.items():
        is_eu = reporter == "EU27_2020"
        denominator = values["world"] if values["world"] else values["extra"]
        eurostat_routes.append(
            {
                "reporter": reporter,
                "market": eurostat_names[reporter],
                "worldEur": None if is_eu else values["world"],
                "intraEur": None if is_eu else values["intra"],
                "extraEur": values["extra"],
                "extraShare": 100 * values["extra"] / denominator if denominator else None,
                "basis": "EU:n ulkoraja; vain extra-EU-tuonti" if is_eu else "Jäsenmaan WORLD = intra-EU saapumiset + extra-EU tuonti",
                "url": eurostat_source_url,
            }
        )
    eurostat_routes.sort(key=lambda row: (row["reporter"] != "EU27_2020", -(row["worldEur"] or row["extraEur"])))

    eurostat_by_market = {row["market"]: row for row in eurostat_routes}
    for country in countries:
        route = eurostat_by_market.get(country["name"])
        if not route:
            continue
        if route["reporter"] == "EU27_2020":
            extra_bn = f"{route['extraEur'] / 1e9:.3f}".replace(".", ",")
            route_text = f"Eurostat 2025 kapea CN8-kori: extra-EU-tuonti {extra_bn} mrd EUR."
        else:
            world_m = f"{route['worldEur'] / 1e6:.1f}".replace(".", ",")
            intra_m = f"{route['intraEur'] / 1e6:.1f}".replace(".", ",")
            extra_m = f"{route['extraEur'] / 1e6:.1f}".replace(".", ",")
            route_text = (
                f"Eurostat 2025 kapea CN8-kori: WORLD-tuonti {world_m} milj. EUR; "
                f"intra-EU {intra_m} milj. EUR ja extra-EU {extra_m} milj. EUR."
            )
        country["current"] = route_text + " " + country["current"]
        country["missing"] = "Kuluttajamyynti, kotimainen tuotanto ja tullivirran täsmäytys vero-/EU-CEG-sarjaan. " + country["missing"]

    eurostat_origins = []
    for row in eurostat_top_rows:
        if row["reporter"] != "EU27_2020" or row["cn8_code"] not in {"85434000", "24041200"}:
            continue
        eurostat_origins.append(
            {
                "code": row["cn8_code"],
                "partner": partner_names.get(row["partner"], row["partner_label"].split(" (incl.")[0]),
                "valueEur": float(row["value_eur"] or 0),
                "sharePct": float(row["share_of_country_partner_rows_pct"] or 0),
                "basis": "Alkuperämaa EU:n ulkopuolella",
                "rank": int(row["rank"]),
            }
        )
    eurostat_origins.sort(key=lambda row: (row["code"], row["rank"]))

    contacts = []
    for row in requests:
        contacts.append(
            {
                "id": row["request_id"],
                "market": fi_country(row["market"]),
                "authority": row["authority"],
                "channel": public_contact(row["recipient"]),
                "scope": row["scope"],
                "status": row["status"],
                "sent": row["sent_at"] or "—",
                "followUp": row["follow_up_1"].strip() or "—",
            }
        )

    narrow = {}
    for row in customs:
        if row["code"] not in {"854340", "240412"}:
            continue
        narrow[row["market"]] = narrow.get(row["market"], 0) + row["valueUsd"]

    data = {
        "meta": {
            "title": "Pixan markkina- ja evidenssikeskus",
            "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            "dataDate": "2026-07-17",
            "repo": "https://github.com/marnet-collab/pixan-evidence-center",
            "disclaimer": "Ei oikeudellinen lausunto eikä tilintarkastettu markkina-arvio.",
        },
        "metrics": [
            {"label": "Kanada 2024", "value": "1,161 mrd CAD", "detail": "Viranomaiselle raportoitu toimitusmyynti", "tone": ""},
            {"label": "Suomi 2025", "value": "3,547 milj. €", "detail": "E-nesteiden nettovero · 11 823,5 l", "tone": "gold"},
            {"label": "Saksa 2025", "value": "1,5 milj. l", "detail": "Verotetut tupakan korvikkeet, +18,2 %", "tone": "blue"},
            {"label": "EU-ulkoraja 2025", "value": f"{eurostat_sums['EU27_2020']['extra'] / 1e9:.3f} mrd €".replace(".", ","), "detail": "CN8 85434000 + 24041200 · extra-EU", "tone": "red"},
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
                "url": "https://health-infobase.canada.ca/substance-use/vaping/sales/",
            },
            {
                "grade": "A",
                "market": "Saksa",
                "title": "Verotetut tupakan korvikkeet / e-nesteet",
                "value": "1,5 miljoonaa litraa",
                "detail": "Destatisin mukaan verotettu määrä kasvoi 18,2 % vuonna 2025. Vuoden verokannalla 0,26 €/ml laskennallinen valmisteveropohja on noin 390 milj. €.",
                "limit": "Litramäärä ei sisällä erillisten laitteiden myyntiarvoa. 390 milj. € on verolaskelma, ei vähittäismyynti.",
                "source": "Destatis · tiedote 026/2026",
                "url": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html",
            },
            {
                "grade": "A",
                "market": "Suomi",
                "title": "E-nesteiden nettovero ja verotettu nettovolyymi",
                "value": "3 547 047 € · 11 823,492 l",
                "detail": "Verohallinnon vuoden 2025 täysi sarja: nikotiinilliset 11 802,602 litraa / 3 540 780 € ja nikotiinittomat 20,890 litraa / 6 267 €.",
                "limit": "Veroankkuri kattaa e-nesteet, ei erillisiä laitteita. PXWebin 2026 tieto on vielä osavuosi tammi–huhtikuu.",
                "source": "Verohallinto · valmisteverotilasto",
                "url": "https://vero2.stat.fi/PXWeb/pxweb/en/Vero/Vero__Valmistevero/vvt_010.px/",
            },
            {
                "grade": "B",
                "market": "EU-27",
                "title": "Virallinen extra-EU-tullivirta",
                "value": f"{eurostat_sums['EU27_2020']['extra'] / 1e9:.3f} mrd EUR".replace(".", ","),
                "detail": "Vuoden 2025 CN8 85434000 + 24041200 -tuonti EU:n ulkorajan yli. Jäsenmaiden sisäisiä saapumisia ei lisätä summaan.",
                "limit": "CIF-tulliarvo, ei kuluttajamyyntiä; ei kata EU:n kotimaista tuotantoa eikä vähittäiskaupan katetta.",
                "source": "Eurostat Comext · DS-045409",
                "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database",
            },
        ],
        "report": [
            {"label": "GVR maailmanmarkkina 2025", "value": "45,7 mrd USD", "meaning": "Kaupallinen ennuste"},
            {"label": "GVR maailmanmarkkina 2026", "value": "59,2 mrd USD", "meaning": "+29,5 % vuodessa"},
            {"label": "GVR maailmanmarkkina 2033", "value": "462,1 mrd USD", "meaning": "Pitkän aikavälin ennuste"},
            {"label": "Kanada 2024, muunnettu", "value": "≈ 0,847 mrd USD", "meaning": "Noin 1,85 % GVR 2025 -luvusta"},
            {"label": "Kanada +29,5 % herkkyys", "value": "1,503 mrd CAD", "meaning": "Mekaaninen testi, ei ennuste"},
        ],
        "countries": countries,
        "taxes": taxes,
        "taxAudit": {
            "profileCount": 23,
            "numericCount": sum(row["status"] == "numeric_data" for row in taxes),
            "specificExciseCount": sum((row["excisePct"]["open"] or 0) > 0 for row in taxes),
            "banCount": sum(row["status"] == "sale_banned" for row in taxes),
            "nationalVerifiedCount": sum(
                row["national"] is not None and row["national"].get("status") == "verified"
                for row in taxes
            ),
            "officialVolumeCount": sum(row["national"] is not None and row["national"]["taxedVolume"] != "not_obtained" for row in taxes),
            "officialRevenueCount": sum(row["national"] is not None and row["national"]["actualRevenue"] != "not_obtained" for row in taxes),
            "method": "WHO:n vuoden 2025 maaprofiilien sivu 9 raportoi halvimpien closed-, disposable- ja open-system e-nesteiden hinnan sekä kokonaisveron, valmisteveron, ALV:n, tullin ja muut verot prosenttina vähittäishinnasta. Pixan-auditointi säilyttää puuttuvat solut puuttuvina ja johtaa €/ml- tai paikallisvaluutta/ml-luvun vain hinnan ja WHO:n specific excise -osuuden tulona. Johdettu kanta merkitään B-tason tarkistusluvuksi, ei nykyiseksi lakikannaksi.",
        },
        "customs": customs,
        "eurostatRoutes": eurostat_routes,
        "eurostatOrigins": eurostat_origins,
        "narrowCustoms": [{"market": market, "valueUsd": value} for market, value in sorted(narrow.items(), key=lambda item: item[1], reverse=True)],
        "codes": [
            {"code": "8543.40", "title": "Sähköiset höyrystinlaitteet", "detail": "Personal electric vaporising devices. Kansallinen 8–10-numeroinen alanimike tarvitaan osien ja laitteiden erotteluun.", "include": "Laitteet ja mahdolliset laiteosat nimikerajauksen mukaan."},
            {"code": "2404.12", "title": "Nikotiinia sisältävät inhaloitavat tuotteet", "detail": "Sisältää nikotiinia sisältäviä tuotteita ilman palamista. Voi kattaa e-nesteitä ja kertakäyttötuotteita.", "include": "Kapean tullikorin neste-/disposable-proxy."},
            {"code": "2404.19", "title": "Muut inhaloitavat tuotteet", "detail": "Muu kuin nikotiinia sisältävä ryhmä on laaja. Sitä ei kutsuta e-nesteeksi ilman kansallista tarkennetta.", "include": "Näytetään erikseen, ei kapeassa summassa."},
        ],
        "stress": [
            {
                "market": "Kanada",
                "basis": "2024 virallinen toimitusmyynti 1 160,8 milj. CAD",
                "scenarios": [
                    {"name": "Kova stressi", "price": "−20 %", "volume": "−30 %", "value": "650 milj. CAD"},
                    {"name": "Maltillinen", "price": "−5 %", "volume": "−10 %", "value": "992 milj. CAD"},
                    {"name": "Hintaherkkyys", "price": "+5 %", "volume": "0 %", "value": "1 219 milj. CAD"},
                ],
                "note": "Laskenta: virallinen vuoden 2024 arvo × hinnan muutos × volyymin muutos.",
            },
            {
                "market": "Saksa",
                "basis": "2025 virallinen verotettu määrä 1,5 milj. litraa",
                "scenarios": [
                    {"name": "Alhainen hinta", "price": "5 €/10 ml", "volume": "1,5 milj. l", "value": "750 milj. €"},
                    {"name": "Keskihinta", "price": "7,5 €/10 ml", "volume": "1,5 milj. l", "value": "1 125 milj. €"},
                    {"name": "Korkea hinta", "price": "10 €/10 ml", "volume": "1,5 milj. l", "value": "1 500 milj. €"},
                ],
                "note": "Hinnat ovat havainnollistavia. Ennen pankkikäyttöä ne täsmäytetään dokumentoituun vähittäishintaotokseen.",
            },
        ],
        "evidence": [
            {"grade": "A", "title": "Health Canada · Vaping sales", "coverage": "Kanada 2023–2024: arvo, yksiköt, litrat ja tuoteryhmät", "use": "Nykyinen virallinen markkina-ankkuri", "url": "https://health-infobase.canada.ca/substance-use/vaping/sales/"},
            {"grade": "A", "title": "Destatis · tabakverotilasto", "coverage": "Saksa 2025: verotettu tupakan korvike-/e-nestemäärä", "use": "Nykyinen virallinen volyymiankkuri", "url": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html"},
            {"grade": "A", "title": "Verohallinto · valmisteverotilasto", "coverage": "Suomi 2023–2026: e-nesteiden kuukausittainen nettovolyymi ja nettovero", "use": "Nykyinen virallinen vero- ja volyymiankkuri", "url": "https://vero2.stat.fi/PXWeb/pxweb/en/Vero/Vero__Valmistevero/vvt_010.px/"},
            {"grade": "A", "title": "Saksan tupakkaverolaki §2", "coverage": "Verokanta 0,26 €/ml vuonna 2025 ja 0,32 €/ml vuodesta 2026", "use": "Veropohjan auditointilaskelma", "url": "https://www.gesetze-im-internet.de/tabstg_2009/__2.html"},
            {"grade": "A", "title": "EU Tobacco Products Directive 20(7)", "coverage": "Vuosittaiset myyntimäärät tuotemerkki- ja tyyppitasolla kansallisille viranomaisille", "use": "Oikeusperusta aggregoitujen tietopyyntöjen kohdentamiseen", "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0040"},
            {"grade": "B", "title": "UN Comtrade", "coverage": "USA, Kanada ja Japani 2025: HS 854340, 240412 ja 240419", "use": "Rajakaupan suuruusluokka ja ristiintarkastus", "url": "https://comtradeplus.un.org/"},
            {"grade": "B", "title": "Eurostat Comext DS-045409", "coverage": "EU:n extra- ja intra-EU CN8-kauppa alkuperä- ja lähetysmaittain", "use": "EU:n reitti- ja hubikorjaus", "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"},
            {"grade": "A", "title": "FTC E-Cigarette Report 2021", "coverage": "Yhdeksän valmistajan cartridge/disposable-myynti 2,763 mrd USD", "use": "Historiallinen USA-vertailu, ei nykyinen kokonaismarkkina", "url": "https://www.ftc.gov/reports/e-cigarette-report-2021"},
            {"grade": "B", "title": "Japan Customs methodology", "coverage": "CIF-tuonti, alkuperämaa ja 9-numeroinen kansallinen nimike", "use": "Japanin kansallisen tullisarjan määrittely", "url": "https://www.customs.go.jp/toukei/sankou/howto/gaiyou_e.htm"},
        ],
        "contacts": contacts,
        "tasks": [
            {"priority": "high", "title": "EU-27 CN8-reittimatriisi", "detail": "Valmis 2025: EU-ulkoraja 2,240 mrd EUR ja 12 jäsenmaan WORLD/intra/extra-jako, CN8 85434000 + 24041200. Kaikki ryhmärivit täsmäytyivät 0 EUR erolla.", "status": "done"},
            {"priority": "high", "title": "EU-CEG aggregoidut myyntipyynnöt", "detail": "Lähetä Article 20(7) -pyynnöt kansallisille toimivaltaisille viranomaisille, ilman yritystason luottamuksellisia tietoja.", "status": "queued"},
            {"priority": "high", "title": "USA HTS10 kulutukseen luovutettu tuonti", "detail": "Hanki Census-avain tai dataote; erota general imports, imports for consumption ja re-exports.", "status": "requested"},
            {"priority": "high", "title": "Kanadan 2025 reittitäsmäytys", "detail": "CIMT 10-digit + origin/export country + foreign-origin re-exports, täsmäytys Health Canadan toimitusmyyntiin.", "status": "requested"},
            {"priority": "medium", "title": "Japani 9-numeroinen nimike", "detail": "Hae Japan Customs -sarja alkuperämaittain ja erota laitteet, nikotiinituotteet ja muut inhaloitavat tuotteet.", "status": "queued"},
            {"priority": "medium", "title": "Kiina GACC tullimenettelyineen", "detail": "Hae alkuperä, lähetysmaa, tullimenettely ja maahantuojan sijainti; erottele vientihubi ja kotimarkkina.", "status": "queued"},
            {"priority": "medium", "title": "Saksan vähittäishintaotos", "detail": "Dokumentoi 10 ml -vertailuhinnat veroineen ja ilman veroa; korvaa havainnollistavat hintastressit todistetulla otoksella.", "status": "active"},
            {"priority": "high", "title": "Kaikkien maiden verovarmennus", "detail": "WHO 2025 -vertailu on tehty 23 maalle. Varmista seuraavaksi kansallinen nykykanta, verotettu volyymi ja e-nesteisiin kohdistettu verotuotto erillisinä kenttinä.", "status": "active"},
            {"priority": "low", "title": "Patenttistatuksen erillinen varmennus", "detail": "Tarkista oikeudellinen voimassaolo ja maksut maa kerrallaan virallisista rekistereistä. Ei sekoiteta markkinakoon näyttöön.", "status": "queued"},
        ],
        "method": [
            {"step": "01", "title": "Määritä tuote", "detail": "Laitteet, podit/osat, nikotiininesteet ja muut nesteet erotetaan kansalliseen nimiketasoon asti."},
            {"step": "02", "title": "Hae virallinen virta", "detail": "Tulli-, vero- ja pakollinen valmistajaraportointi tallennetaan alkuperäisine lähdelinkkeineen ja hakupäivineen."},
            {"step": "03", "title": "Korjaa reitti", "detail": "Alkuperämaa, lähetysmaa, varasto, re-export ja kulutukseen luovutus käsitellään erillisinä kenttinä."},
            {"step": "04", "title": "Täsmäytä myyntiin", "detail": "Tullivirtaa verrataan vero-, EU-CEG-, valmistaja- tai lisensoituun kassamyyntisarjaan. Erot selitetään."},
        ],
    }
    return data


def main() -> None:
    data = build_payload()
    (DASHBOARD_DIR / "data").mkdir(exist_ok=True)
    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    (DASHBOARD_DIR / "data" / "dashboard.json").write_text(json_text + "\n", encoding="utf-8")
    (DASHBOARD_DIR / "data.generated.js").write_text("window.PIXAN_DATA = " + json_text + ";\n", encoding="utf-8")
    print(f"Dashboard data built: {len(data['countries'])} countries/regions, {len(data['customs'])} customs rows, {len(data['contacts'])} contacts")


if __name__ == "__main__":
    main()
