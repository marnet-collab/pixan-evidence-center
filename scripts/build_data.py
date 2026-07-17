#!/usr/bin/env python3
"""Build the public dashboard payload from the Pixan evidence workspace."""

from __future__ import annotations

import csv
import json
import shutil
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
    if name in {"Canada", "Germany", "Finland", "Poland", "Sweden", "Denmark"}:
        return "verified"
    if name in {
        "United States", "Japan", "EU-27", "France", "Italy", "Spain",
        "Poland", "Netherlands", "Belgium", "Luxembourg", "Sweden",
        "Denmark", "Austria", "China",
        "South Korea",
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
    japan_total_rows = read_csv(PROJECT_DIR / "data" / "derived" / "japan_customs_vape_totals_2025.csv")
    japan_origin_rows = read_csv(PROJECT_DIR / "data" / "derived" / "japan_customs_vape_origins_2025.csv")
    japan_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "japan_customs_vape_manifest_2025.json").read_text(encoding="utf-8")
    )
    korea_total_rows = read_csv(PROJECT_DIR / "data" / "derived" / "korea_customs_hs6_totals_2025.csv")
    korea_origin_rows = read_csv(PROJECT_DIR / "data" / "derived" / "korea_customs_hs6_import_origins_2025.csv")
    korea_hsk_rows = read_csv(PROJECT_DIR / "data" / "derived" / "korea_customs_hsk10_classification_2025.csv")
    korea_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "korea_customs_hs6_manifest_2025.json").read_text(encoding="utf-8")
    )
    us_total_rows = read_csv(PROJECT_DIR / "data" / "derived" / "us_census_vape_totals_2025.csv")
    us_origin_rows = read_csv(PROJECT_DIR / "data" / "derived" / "us_census_vape_origins_2025.csv")
    us_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "us_census_vape_manifest_2025.json").read_text(encoding="utf-8")
    )
    canada_total_rows = read_csv(PROJECT_DIR / "data" / "derived" / "canada_cimt_vape_import_totals_2025.csv")
    canada_origin_rows = read_csv(PROJECT_DIR / "data" / "derived" / "canada_cimt_vape_import_origins_2025.csv")
    canada_province_rows = read_csv(PROJECT_DIR / "data" / "derived" / "canada_cimt_vape_import_provinces_2025.csv")
    canada_export_rows = read_csv(PROJECT_DIR / "data" / "derived" / "canada_cimt_vape_exports_reexports_2025.csv")
    canada_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "canada_cimt_vape_manifest_2025.json").read_text(encoding="utf-8")
    )
    canada_retail_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "canada_retail_price_observations_2026-07-17.csv"
    )
    canada_retail_summary_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "canada_retail_price_summary_2026-07-17.csv"
    )
    canada_retail_comparison_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "canada_retail_health_comparison_2026-07-17.csv"
    )
    canada_retail_stress_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "canada_retail_stress_test_2026-07-17.csv"
    )
    canada_retail_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "canada_retail_price_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    germany_retail_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "germany_retail_price_observations_2026-07-17.csv"
    )
    germany_retail_summary_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "germany_retail_price_summary_2026-07-17.csv"
    )
    germany_retail_stress_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "germany_retail_stress_test_2026-07-17.csv"
    )
    germany_retail_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "germany_retail_price_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    italy_rate_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "italy_adm_rate_schedule_2025.csv"
    )
    italy_reporting_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "italy_adm_reporting_fields_2026-07-17.csv"
    )
    italy_forecast_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "italy_fiscal_forecast_2026_2028.csv"
    )
    italy_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "italy_adm_access_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    spain_rate_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "spain_aeat_573_rates_2025.csv"
    )
    spain_revenue_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "spain_aeat_net_revenue_monthly_2025.csv"
    )
    spain_sensitivity_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "spain_aeat_liquid_sensitivity_2025.csv"
    )
    spain_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "spain_aeat_access_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    france_customs_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "france_douane_cn8_2025.csv"
    )
    france_monthly_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "france_douane_monthly_2025.csv"
    )
    france_origin_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "france_douane_top_origins_2025.csv"
    )
    france_route_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "france_route_bridge_2025.csv"
    )
    france_registry_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "france_anses_registry_audit_2026-07-01.csv"
    )
    france_product_type_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "france_anses_product_types_2026-07-01.csv"
    )
    france_coverage_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "france_anses_sales_coverage_2016_2017.csv"
    )
    france_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "france_evidence_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    poland_volume_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "poland_mf_e_liquid_volume_2020_2023.csv"
    )
    poland_revenue_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "poland_mf_excise_revenue_2021_2025.csv"
    )
    poland_category_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "poland_mf_excise_categories_2025.csv"
    )
    poland_control_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "poland_kas_controls_2021_2026.csv"
    )
    poland_revision_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "poland_2023_revision_bridge.csv"
    )
    poland_reconciliation_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "poland_excise_volume_reconciliation_2021_2023.csv"
    )
    poland_route_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "poland_eurostat_route_2025.csv"
    )
    poland_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "poland_evidence_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    netherlands_market_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_vws_market_estimate_2026.csv"
    )
    netherlands_method_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_vws_method_audit_2026.csv"
    )
    netherlands_price_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_vws_price_inputs_2026.csv"
    )
    netherlands_stress_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_vws_price_stress_test_2026.csv"
    )
    netherlands_youth_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_vws_youth_prevalence_check_2023.csv"
    )
    netherlands_cbs_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_cbs_esigarette_prevalence_2024.csv"
    )
    netherlands_bridge_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_eurostat_customs_bridge_2025.csv"
    )
    netherlands_route_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_eurostat_route_2025.csv"
    )
    netherlands_partner_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "netherlands_eurostat_top_partners_2025.csv"
    )
    netherlands_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "netherlands_evidence_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    sweden_rate_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_e_liquid_tax_rates_2023_2026.csv"
    )
    sweden_volume_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_e_liquid_volume_revenue_2024_2026.csv"
    )
    sweden_reconciliation_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_e_liquid_tax_reconciliation_2024.csv"
    )
    sweden_price_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_who_price_inputs_2025.csv"
    )
    sweden_stress_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_e_liquid_price_stress_test_2024.csv"
    )
    sweden_route_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_eurostat_route_2025.csv"
    )
    sweden_partner_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_eurostat_scope_partners_2025.csv"
    )
    sweden_method_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "sweden_evidence_method_audit_2026-07-17.csv"
    )
    sweden_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "sweden_evidence_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )
    denmark_rate_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_e_liquid_tax_rates_2025_2027.csv"
    )
    denmark_actual_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_combined_nicotine_revenue_2024_2025.csv"
    )
    denmark_forecast_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_e_liquid_forecast_volume_bounds_2025.csv"
    )
    denmark_price_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_who_price_inputs_2025.csv"
    )
    denmark_stress_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_e_liquid_price_stress_test_2025.csv"
    )
    denmark_bridge_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_forecast_actual_scope_bridge_2025.csv"
    )
    denmark_control_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_enforcement_audit_2020_2025.csv"
    )
    denmark_registry_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_product_registry_summary_2026-07-17.csv"
    )
    denmark_route_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_eurostat_route_2025.csv"
    )
    denmark_partner_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_eurostat_scope_partners_2025.csv"
    )
    denmark_method_rows = read_csv(
        PROJECT_DIR / "data" / "derived" / "denmark_evidence_method_audit_2026-07-17.csv"
    )
    denmark_manifest = json.loads(
        (PROJECT_DIR / "data" / "derived" / "denmark_evidence_manifest_2026-07-17.json").read_text(encoding="utf-8")
    )

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

    japan_names = {
        "Republic of Korea": "Etelä-Korea",
        "People's Republic of China": "Kiina",
        "Viet Nam": "Vietnam",
        "Thailand": "Thaimaa",
        "Malaysia": "Malesia",
        "Philippines": "Filippiinit",
        "Indonesia": "Indonesia",
        "United Kingdom": "Yhdistynyt kuningaskunta",
        "Netherlands": "Alankomaat",
        "France": "Ranska",
        "Germany": "Saksa",
        "Switzerland": "Sveitsi",
        "Spain": "Espanja",
        "Italy": "Italia",
        "Cyprus": "Kypros",
        "United States of America": "Yhdysvallat",
    }
    japan_titles = {
        "854340000": "Sähköiset savukkeet ja vastaavat höyrystinlaitteet",
        "240412000": "Nikotiinia sisältävät inhaloitavat tuotteet",
        "240419100": "Valmistetut tupakankorvikkeet",
        "240419200": "Muut inhaloitavat tuotteet",
    }
    japan_totals = [
        {
            "code": row["hs9_code"],
            "title": japan_titles[row["hs9_code"]],
            "scope": row["scope"],
            "quantity": int(row["quantity"]),
            "unit": row["quantity_unit"],
            "valueJpy": int(row["value_jpy"]),
            "originCount": int(row["origin_count"]),
            "largestOrigin": japan_names.get(row["largest_origin"], row["largest_origin"]),
            "largestOriginShare": float(row["largest_origin_share_pct"]),
            "url": row["source_url"],
        }
        for row in japan_total_rows
    ]
    japan_origins = [
        {
            "code": row["hs9_code"],
            "title": japan_titles[row["hs9_code"]],
            "countryCode": row["country_code"],
            "origin": japan_names.get(row["country_of_origin"], row["country_of_origin"]),
            "quantity": int(row["quantity"]),
            "unit": row["quantity_unit"],
            "valueJpy": int(row["value_jpy"]),
            "valueShare": int(row["value_jpy"]) / next(
                int(total["value_jpy"]) for total in japan_total_rows if total["hs9_code"] == row["hs9_code"]
            ) * 100,
        }
        for row in japan_origin_rows
    ]

    korea_names = {
        "China": "Kiina", "Viet nam": "Vietnam", "Malaysia": "Malesia",
        "Japan": "Japani", "United Kingdom": "Yhdistynyt kuningaskunta",
        "United States": "Yhdysvallat", "Indonesia": "Indonesia",
        "Singapore": "Singapore", "Thailand": "Thaimaa", "Germany": "Saksa",
        "France": "Ranska", "Netherlands": "Alankomaat", "Italy": "Italia",
        "Sweden": "Ruotsi", "Canada": "Kanada", "Australia": "Australia",
        "Hong Kong": "Hongkong", "Taiwan": "Taiwan", "Poland": "Puola",
        "Switzerland": "Sveitsi", "Spain": "Espanja", "Denmark": "Tanska",
        "Finland": "Suomi", "Belgium": "Belgia", "Austria": "Itävalta",
    }
    korea_scope_titles = {
        "core_devices": "Sähkösavukkeet ja vastaavat henkilökohtaiset sähköiset höyrystinlaitteet",
        "broad_nicotine_inhalation_proxy": "Laaja nikotiinia sisältävien inhaloitavien tuotteiden proxy",
        "broad_other_inhalation_proxy": "Laaja muiden inhaloitavien tuotteiden proxy",
    }
    korea_totals = [
        {
            "code": row["hs6_code"],
            "title": korea_scope_titles[row["pixan_scope"]],
            "officialTitle": row["official_english_label"],
            "scope": row["pixan_scope"],
            "importKg": int(row["import_weight_kg"]),
            "importValueUsd": int(row["import_value_thousand_usd"]) * 1000,
            "exportKg": int(row["export_weight_kg"]),
            "exportValueUsd": int(row["export_value_thousand_usd"]) * 1000,
            "url": row["source_url"],
        }
        for row in korea_total_rows
    ]
    korea_origins = [
        {
            "code": row["hs6_code"],
            "origin": korea_names.get(row["country_of_origin"], row["country_of_origin"]),
            "scope": row["pixan_scope"],
            "importKg": int(row["import_weight_kg"]),
            "importValueUsd": int(row["import_value_thousand_usd"]) * 1000,
            "valueShare": float(row["import_value_share_of_annual_code_pct"]),
        }
        for row in korea_origin_rows
    ]
    korea_hsk10 = [
        {
            "code": row["hsk10_code"],
            "parent": row["parent_hs6"],
            "officialKorean": row["official_korean_label"],
            "title": row["working_finnish_translation"],
            "scope": row["pixan_scope"],
            "included": row["pixan_scope"].startswith("core_"),
            "url": row["source_url"],
        }
        for row in korea_hsk_rows
    ]
    korea_device_top3_share = sum(
        row["valueShare"] for row in korea_origins if row["code"] == "854340"
    ) if len([row for row in korea_origins if row["code"] == "854340"]) <= 3 else sum(
        row["valueShare"] for row in sorted(
            (row for row in korea_origins if row["code"] == "854340"),
            key=lambda item: item["importValueUsd"], reverse=True,
        )[:3]
    )
    korea_device_top3_text = f"{korea_device_top3_share:.2f}".replace(".", ",")

    us_titles = {
        "2404120500": "Aromaattinen nikotiiniseos sähkösavukkeeseen",
        "2404121000": "Muu nikotiiniseos sähkösavukkeeseen",
        "2404129000": "Muu nikotiinituote inhalointiin",
        "2404190500": "Aromaattinen muu seos sähkösavukkeeseen",
        "2404191000": "Muu seos sähkösavukkeeseen",
        "2404199000": "Muu inhaloitava tuote",
        "8543400030": "Höyrystinlaite nikotiinia sisältävällä aineella",
        "8543400040": "Muu henkilökohtainen höyrystinlaite",
    }
    us_names = {
        "CHINA": "Kiina", "INDONESIA": "Indonesia", "MALAYSIA": "Malesia",
        "SINGAPORE": "Singapore", "GERMANY": "Saksa", "CANADA": "Kanada",
        "ISRAEL": "Israel", "DOMINICAN REPUBLIC": "Dominikaaninen tasavalta",
        "UNITED ARAB EMIRATES": "Yhdistyneet arabiemiirikunnat", "JAPAN": "Japani",
        "POLAND": "Puola", "HONG KONG": "Hongkong", "ITALY": "Italia",
        "CZECH REPUBLIC": "Tšekki", "NEW CALEDONIA": "Uusi-Kaledonia",
        "UNITED KINGDOM": "Yhdistynyt kuningaskunta", "MEXICO": "Meksiko",
        "SWITZERLAND": "Sveitsi", "TAIWAN": "Taiwan", "VIETNAM": "Vietnam",
        "KOREA, SOUTH": "Etelä-Korea", "FRANCE": "Ranska", "NETHERLANDS": "Alankomaat",
        "SOUTH AFRICA": "Etelä-Afrikka", "INDIA": "Intia", "AUSTRIA": "Itävalta",
        "SPAIN": "Espanja", "SWEDEN": "Ruotsi",
    }
    us_totals = [
        {
            "code": row["hts10_code"],
            "title": us_titles[row["hts10_code"]],
            "scope": row["scope"],
            "quantity": int(row["gen_quantity_1"]),
            "unit": row["quantity_unit_1"],
            "customsValueUsd": int(row["gen_customs_value_usd"]),
            "cifValueUsd": int(row["gen_cif_value_usd"]),
            "consumptionValueUsd": int(row["con_customs_value_usd"]),
            "calculatedDutyUsd": int(row["con_calculated_duty_usd"]),
            "originCount": int(row["origin_count"]),
            "detailRecords": int(row["detail_record_count"]),
            "largestOrigin": us_names.get(row["largest_origin"], row["largest_origin"].title()),
            "largestOriginShare": float(row["largest_origin_share_pct"]),
            "url": row["source_url"],
        }
        for row in us_total_rows
    ]
    us_origins = [
        {
            "code": row["hts10_code"],
            "title": us_titles[row["hts10_code"]],
            "origin": us_names.get(row["country_of_origin"], row["country_of_origin"].title()),
            "quantity": int(row["gen_quantity_1"]),
            "unit": row["quantity_unit_1"],
            "customsValueUsd": int(row["gen_customs_value_usd"]),
            "cifValueUsd": int(row["gen_cif_value_usd"]),
            "valueShare": int(row["gen_customs_value_usd"]) / next(
                int(total["gen_customs_value_usd"])
                for total in us_total_rows if total["hts10_code"] == row["hts10_code"]
            ) * 100,
        }
        for row in us_origin_rows
    ]

    canada_titles = {
        "2404120000": "Nikotiinia sisältävät tuotteet inhalointiin ilman palamista",
        "2404190000": "Tupakka-/nikotiinikorvikkeita sisältävät tuotteet inhalointiin",
        "8543400010": "Sähkösavuke tai höyrystinlaite nikotiinia sisältävällä aineella",
        "8543400090": "Sähkösavuke tai höyrystinlaite ilman nikotiinia",
    }
    canada_names = {
        "China": "Kiina", "United States of America": "Yhdysvallat", "Hong Kong": "Hongkong",
        "Malaysia": "Malesia", "Germany": "Saksa", "Indonesia": "Indonesia",
        "Korea, South": "Etelä-Korea", "France": "Ranska", "Finland": "Suomi",
        "United Kingdom": "Yhdistynyt kuningaskunta", "Poland": "Puola", "Japan": "Japani",
        "Sweden": "Ruotsi", "Italy": "Italia", "Netherlands": "Alankomaat",
        "Morocco": "Marokko", "Colombia": "Kolumbia", "Dominican Republic": "Dominikaaninen tasavalta",
        "Peru": "Peru", "Spain": "Espanja", "Austria": "Itävalta", "Denmark": "Tanska",
    }
    canada_provinces = {
        "Newfoundland and Labrador": "Newfoundland ja Labrador", "Prince Edward Island": "Prinssi Edwardin saari",
        "Nova Scotia": "Nova Scotia", "New Brunswick": "New Brunswick", "Quebec": "Quebec",
        "Ontario": "Ontario", "Manitoba": "Manitoba", "Saskatchewan": "Saskatchewan",
        "Alberta": "Alberta", "British Columbia": "Brittiläinen Kolumbia",
    }
    canada_origin_value_by_code = {
        code: sum(int(row["value_cad"]) for row in canada_origin_rows if row["hs10_code"] == code)
        for code in canada_titles
    }
    canada_largest_by_code = {
        code: max((row for row in canada_origin_rows if row["hs10_code"] == code), key=lambda row: int(row["value_cad"]))
        for code in canada_titles
    }
    canada_totals = [
        {
            "code": row["hs10_code"],
            "title": canada_titles[row["hs10_code"]],
            "scope": row["scope"],
            "quantity": int(row["quantity"]),
            "unit": row["unit"],
            "valueCad": int(row["value_cad"]),
            "sourceRecords": int(row["selected_record_count"]),
            "largestOrigin": canada_names.get(
                canada_largest_by_code[row["hs10_code"]]["country_of_origin"],
                canada_largest_by_code[row["hs10_code"]]["country_of_origin"],
            ),
            "largestOriginShare": 100 * int(canada_largest_by_code[row["hs10_code"]]["value_cad"]) / int(row["value_cad"]),
            "url": row["source_url"],
        }
        for row in canada_total_rows
    ]
    canada_origins = [
        {
            "code": row["hs10_code"],
            "title": canada_titles[row["hs10_code"]],
            "origin": canada_names.get(row["country_of_origin"], row["country_of_origin"]),
            "quantity": int(row["quantity"]),
            "unit": row["unit"],
            "valueCad": int(row["value_cad"]),
            "valueShare": 100 * int(row["value_cad"]) / canada_origin_value_by_code[row["hs10_code"]],
        }
        for row in canada_origin_rows
    ]
    canada_clearance = [
        {
            "code": row["hs10_code"],
            "provinceCode": row["province_code"],
            "province": canada_provinces.get(row["province_of_clearance"], row["province_of_clearance"]),
            "quantity": int(row["quantity"]),
            "unit": row["unit"],
            "valueCad": int(row["value_cad"]),
        }
        for row in canada_province_rows
    ]
    canada_export_codes = {
        "24041200": "Nikotiinia sisältävät inhaloitavat tuotteet",
        "24041900": "Muut inhaloitavat tuotteet",
        "85434000": "Sähkösavukkeet ja vastaavat höyrystinlaitteet",
    }
    canada_exports = []
    for code, title in canada_export_codes.items():
        rows = [row for row in canada_export_rows if row["hs8_code"] == code]
        canada_exports.append(
            {
                "code": code,
                "title": title,
                "unit": next((row["unit"] for row in rows if row["unit"]), "—"),
                "totalValueCad": sum(int(row["total_export_value_cad"]) for row in rows),
                "domesticValueCad": sum(int(row["domestic_export_value_cad"]) for row in rows),
                "reexportValueCad": sum(int(row["derived_reexport_value_cad"]) for row in rows),
                "totalQuantity": sum(int(row["total_export_quantity"]) for row in rows),
                "domesticQuantity": sum(int(row["domestic_export_quantity"]) for row in rows),
                "reexportQuantity": sum(int(row["derived_reexport_quantity"]) for row in rows),
            }
        )

    canada_device_value = canada_manifest["import_selection"]["device_value_cad"]
    canada_device_quantity = canada_manifest["import_selection"]["device_quantity_nmb"]
    canada_broad_value = canada_manifest["import_selection"]["broad_inhalation_product_value_cad"]
    canada_broad_quantity = canada_manifest["import_selection"]["broad_inhalation_product_quantity_kg"]
    canada_combined_value = canada_device_value + canada_broad_value
    canada_reexport_value = sum(row["reexportValueCad"] for row in canada_exports)

    us_device_value = us_manifest["baskets"]["core_devices"]["general_customs_value_usd"]
    us_liquid_value = us_manifest["baskets"]["core_liquids"]["general_customs_value_usd"]
    korea_device = korea_manifest["baskets"]["core_devices"]
    korea_broad = korea_manifest["baskets"]["broad_inhalation_proxies_not_proven_e_liquid"]
    for country in countries:
        if country["sourceName"] != "United States":
            continue
        country["current"] = (
            "U.S. Census 2025 HTS10: 127 747 232 laitetta / 256,840 milj. USD ja "
            "23 279 189 kg nimenomaisia sähkösavukeseoksia / 320,924 milj. USD. "
            "Kaikki kansalliset summat täsmäytyivät alkuperämaariveihin ilman eroa. " + country["current"]
        )
        country["missing"] = (
            "Nykyinen kuluttajamyynti, kotimainen tuotanto, varastomuutos ja laittoman markkinan arvio. "
            + country["missing"]
        )
    for country in countries:
        if country["sourceName"] != "Canada":
            continue
        country["current"] = (
            "Statistics Canada CIMT 2025 HS10: 14 517 957 laitetta / 89,316 milj. CAD ja "
            "5 757 344 kg laajan inhaloitavien tuotteiden korin tuontia / 314,484 milj. CAD. "
            "608 HS10-lähderiviä täsmäytyi viralliseen HS6-sarjaan 564 tarkastusavaimella ilman eroa; "
            "johdettu jälleenvienti oli 1,296 milj. CAD. Health Canada 2024 toimitusmyynti on erillinen 1,161 mrd CAD:n ankkuri."
        )
        country["missing"] = (
            "HS10-ristiintaulukko alkuperämaasta ja suorasta lähetys-/vientimaasta, kotimainen tuotanto, "
            "varastomuutos sekä 2025 Health Canada -myynti."
        )
    for country in countries:
        if country["sourceName"] != "South Korea":
            continue
        country["current"] = (
            "Korea Customs Service 2025 HS6: sähkösavukelaitteet 1 282 856 kg / 148,534 milj. USD; "
            "laajat 240412/240419 inhaloitavien tuotteiden proxyt 2 112 659 kg / 123,731 milj. USD. "
            "Kaikki 24 kuukausi- ja alkuperämaatäsmäytystä mahtuvat virallisen kokonaiskilogramman ja "
            "tuhannen USD:n esitystarkkuuden pyöristysrajaan. Virallinen 2025 HSK10-nimikkeistö erottaa "
            "sähkösavukenesteet koodeihin 2404121000 ja 2404199010, mutta niiden erillisiä arvoja ei ole vielä saatu."
        )
        country["missing"] = (
            "Tarkat HSK10-arvot laitteille ja kahdelle sähkösavukenesteen nimikkeelle, vienti-/jälleenvientisilta, "
            "verotettu nestemäärä ja -tuotto sekä laitteiden ja nesteiden kuluttajamyynti."
        )
    for country in countries:
        if country["sourceName"] != "Italy":
            continue
        country["current"] = (
            "ADM:n PLI-PAT-palvelu ja julkinen kuukausiraportin mallipohja vahvistavat, että viranomainen "
            "kerää tuotekoodin, pakkauskoon, nikotiinipitoisuuden, pakkausmäärän ja kokonaismäärän erikseen "
            "myymälätoimituksista, varastosiirroista ja suorista loppukuluttajatoimituksista. Vuoden 2025 "
            "viralliset kannat olivat tammikuussa 0,143849/0,098896 EUR/ml ja helmikuusta alkaen "
            "0,146966/0,101039 EUR/ml nikotiinillisille ja nikotiinittomille/aromeille. Parlamentin "
            "1 107 249 007 ml:n vuoden 2026 määrä on budjettiennuste, ei toteutunut myynti. "
            + country["current"]
        )
        country["missing"] = (
            "ADM:n toteutuneet kansalliset 2023-2025 kuukausi- ja vuosisummat: pakkaukset, millilitrat, "
            "vero maksettavaksi, vero maksettu ja oikaisut kategorioittain. Varastosiirrot on poistettava "
            "kulutussummasta ja laitemyynti haettava erillisestä lähteestä. "
            + country["missing"]
        )
    for country in countries:
        if country["sourceName"] != "France":
            continue
        country["current"] = (
            "Ranskan Douanen vuoden 2025 neljän CN8-koodin tuonti oli 363 939 981 EUR, vienti "
            "127 863 384 EUR ja rajat ylittävä nettotuonti 236 076 597 EUR. Kapea laite + "
            "nikotiini-inhalaatioproxy tuotti 229 615 309 EUR nettotuonnin. Douanen ja Eurostatin "
            "tuontisummaa erottaa 0,030 % ja vientisummaa 0,449 %. ANSES:n 1.7.2026 rekisterissä "
            "oli 203 181 ilmoitusriviä, mutta ei julkista vuosimyyntikenttää. Historiallisen 2016-2017 "
            "myyntiraportoinnin hit rate oli vain 35,010 %, joten ANSES katsoi volyymit käyttökelvottomiksi. "
            + country["current"]
        )
        country["missing"] = (
            "ANSES:n 2018-2025 kansalliset odotetut, saadut, puuttuvat, korjatut ja hylätyt "
            "myyntiraportit; laitteiden, podien ja täyttöpullojen yksiköt; e-nestemillilitrat, "
            "nikotiinijako ja arvo, jos viranomainen sitä hallussa pitää. Lisäksi tarvitaan kotimainen "
            "tuotanto, varastomuutos ja kuluttajamyynti. "
            + country["missing"]
        )
    for country in countries:
        if country["sourceName"] != "Spain":
            continue
        country["current"] = (
            "AEAT:n tarkka huhti-joulukuun 2025 nettokassasarja täsmää 29 568 000 euroon, joka pyöristyy "
            "vuosiraportin 30 milj. euroon. Modelo 573 kerää L1/L2-e-nesteet millilitroina erillään "
            "L3/L4-tuotteiden grammoista. Julkinen kassasarja yhdistää neljä ryhmää, joten sitä ei nimetä "
            "e-nesteiden myynniksi tai verotetuksi nestemääräksi. "
            + country["current"]
        )
        country["missing"] = (
            "AEAT:n toteutuneet kuukausittaiset L1/L2-millilitrat, L3/L4-grammat, verovelka, vähennykset, "
            "palautukset ja huhtikuun alkuvarastojen oikaisu. Kuluttajamyynti, kotimainen tuotanto ja "
            "varastomuutos ovat edelleen erillisiä puutteita. "
            + country["missing"]
        )
    for country in countries:
        if country["sourceName"] != "Poland":
            continue
        country["current"] = (
            "Puolan valtiovarainministeriön myöhempi vuoden 2023 ZEFIR2/IAS Kraków/AIS -sarja antaa "
            "805 441 litraa ilmoitettua laillista e-nesteen valmisteverovirtaa. Virallinen vuoden 2023 "
            "e-nesteverotuotto oli 443,6 milj. PLN; määrä × 0,55 PLN/ml jää vain 0,137 % sen alle. "
            "Vuoden 2025 toteuma oli e-nesteille 993,1 milj. PLN, höyrystinlaitteille 175,3 milj. PLN "
            "ja osasarjoille 2,5 milj. PLN. KAS:n 422 osumaa 1 172 kohdennetussa vuoden 2025 tarkastuksessa "
            "antaa 36,007 %:n valvonta-hit raten, ei laitonta markkinaosuutta. "
            + country["current"]
        )
        country["missing"] = (
            "Vuoden 2024 e-nesteverotuotto, vuosien 2024-2025 kuukausittaiset ml:t kotimaan myynnille, "
            "EU-hankinnalle ja tuonnille, vuoden 2025 laite-/osasarjakappaleet, Article 20(7) -myynti, "
            "kotimainen tuotanto, varastomuutos ja vähittäismyynti sekä vuoden 2023 revisiosyy. "
            + country["missing"]
        )
    for country in countries:
        if country["sourceName"] != "Netherlands":
            continue
        country["current"] = (
            "VWS:n tilaaman Bureau Beken tutkimuksen mallinnettu vuotuinen vape-kulutusmeno on "
            "281,548 milj. EUR, josta ikäryhmämenetelmä luokittelee 256,865 milj. EUR laittomaksi. "
            "CBS:n vuoden 2024 nykykäytön piste-estimaatti on 3,5 %. Tutkimuksen 5 529 vastaajan "
            "otos, 443 todellista vape-vastaajaa, painotus ja triangulaatio on auditoitu. Eurostatin "
            "vuoden 2025 kapea kori näyttää 204,763 milj. EUR WORLD-tuontia ja 69,809 milj. EUR vientiä. "
            + country["current"]
        )
        country["missing"] = (
            "VWS:n markkinalaskennan ikäsolut, kuukausimenot, laillinen/laiton/keskiryhmän osuudet, "
            "SPSS-syntaksi, vastausdispositio ja design effect; selitys sille, miksi 12-16-vuotiaille "
            "käytettiin Trimbosin 22,8 % alempaa 95 % rajaa 24,6 % piste-estimaatin sijasta; "
            "EU-CEG Article 20(7) -yksiköt, millilitrat ja arvo sekä virallinen laillinen sell-out. "
            + country["missing"]
        )
    for country in countries:
        if country["sourceName"] != "Sweden":
            continue
        country["current"] = (
            "Finansdepartementin taulukko 7.5 vahvistaa vuodelle 2024 yhteensä 26 000 litraa "
            "rekisteröityä verollista nikotiinia sisältävää e-nestettä ja 80 milj. SEK:n näytetyn "
            "verotuoton. Tarkkojen verokantojen mekaaninen tulos on 80,8 milj. SEK; -1,0 %:n ero "
            "mahtuu julkaisun määrä- ja tulopyöristysten päällekkäisiin väleihin. Eurostatin vuoden "
            "2025 kapea laite + nikotiini-inhalaatiokori näyttää 50,028 milj. EUR tuontia, 1,417 milj. "
            "EUR vientiä ja 48,611 milj. EUR:n rajavirran nettoluvun. "
            + country["current"]
        )
        country["missing"] = (
            "Folkhälsomyndighetenin vuosien 2021-2025 kansallinen Article 20(7) -aggregaatti: "
            "laitteet/esitysyksiköt, täyttöpullojen, podien ja kertakäyttötuotteiden millilitrat, "
            "arvo sekä odotettujen ja saatujen vuosiraporttien kattavuus. Finansdepartementilta "
            "puuttuvat taulukko 7.5:n pyöristämättömät määrä- ja verosolut. Laitteiden kuluttajamyynti, "
            "kotimainen tuotanto, varastomuutos ja ilmoittamattomat virrat jäävät avoimiksi. "
            + country["missing"]
        )
    for country in countries:
        if country["sourceName"] != "Denmark":
            continue
        country["current"] = (
            "Skatteministerietin kirjattu yhdistetty nikotiinituotteiden/-pussien ja nikotiininesteiden "
            "verokertymä oli 548,496 milj. DKK vuonna 2024 ja 789,133 milj. DKK vuonna 2025, eli kasvu "
            "43,872 %. E-nesteen erillinen 2025-luku on 90 milj. DKK:n virallinen ennuste, ei toteuma. "
            "Eurostatin vuoden 2025 kapea laite + nikotiini-inhalaatiokori näyttää 14,386 milj. EUR "
            "tuontia, 0,905 milj. EUR vientiä ja 13,481 milj. EUR:n rajavirran nettoluvun. Julkisessa "
            "tuoterekisterissä oli 1 198 riviä ja 545 yksilöllistä ID:tä. "
            + country["current"]
        )
        country["missing"] = (
            "E-nesteen erillinen toteutunut veropohja ja verokertymä, verolliset millilitrat vahvuusryhmittäin, "
            "EU-CEG:n vuosittaiset laiteyksiköt ja nestemillilitrat/arvo sekä odotettujen ja saatujen raporttien "
            "kattavuus. Lisäksi puuttuvat kotimainen tuotanto, varastomuutos ja kuluttajien toteutunut sell-out. "
            "PX-DK-001 ja PX-DK-002 ovat valmiita mutta lähettämättä. "
            + country["missing"]
        )

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

    retail_segment_labels = {
        "prefilled disposable devices": "Täytetyt kertakäyttölaitteet",
        "all liquid-containing products": "Kaikki nestettä sisältävät tuotteet",
        "empty hardware": "Tyhjä laitteisto",
    }
    retail_category_labels = {
        "prefilled pod pack": "Täytetty pod-pakkaus",
        "prefilled disposable device": "Täytetty kertakäyttölaite",
        "refillable device kit": "Täytettävä laitepakkaus",
        "empty refillable pod": "Tyhjä täytettävä pod",
    }
    health_category_labels = {
        "device containing vaping substance": "Nestettä sisältävä laite",
        "part containing vaping substance": "Nestettä sisältävä osa/pod",
        "device or part without vaping substance": "Laite/osa ilman nestettä",
    }
    retail_comparison_labels = {
        "prefilled disposable devices": "Täytetyt kertakäyttölaitteet",
        "Vuse prefilled pods per pod": "Vuse-podit kappalehinnalla",
        "empty pod plus refillable kit": "Tyhjä pod + täytettävä laitepakkaus",
    }
    canada_retail = {
        "observations": [
            {
                "id": row["observation_id"],
                "seller": row["seller"],
                "sellerType": row["seller_type"],
                "product": row["product"],
                "category": retail_category_labels.get(row["category"], row["category"]),
                "liquidIncluded": row["liquid_included"] == "true",
                "packageCount": int(row["package_count"]),
                "liquidMl": number(row["liquid_ml_total"]),
                "emptyCapacityMl": number(row["empty_capacity_ml"]),
                "nicotineMgMl": row["nicotine_mg_ml"],
                "priceCad": float(row["advertised_price_cad"]),
                "pricePerItemCad": float(row["price_per_item_cad"]),
                "pricePerMlCad": number(row["price_per_ml_cad"]),
                "federalDutyCad": number(row["calculated_federal_vaping_duty_cad"]),
                "additionalDutyCad": number(row["calculated_additional_duty_specified_province_cad"]),
                "stock": "Ostokontrolli näkyvissä" if row["stock_observation"] == "purchase control visible" else "Varastossa",
                "priceBasis": (
                    "Valmistajan kertahinta; sovellettavat myyntiverot ja toimitus eivät sisälly Vusen myyntiehtojen mukaan."
                    if row["seller_type"] == "manufacturer storefront"
                    else "Ilmoitettu tuotehinta; GST/HST/PST- ja toimituskäsittelyä ei varmistettu kassalla."
                ),
                "url": row["source_url"],
                "sourceTier": row["source_tier"],
            }
            for row in canada_retail_rows
        ],
        "summary": [
            {
                "segment": retail_segment_labels.get(row["segment"], row["segment"]),
                "count": int(row["observation_count"]),
                "minPriceCad": float(row["minimum_advertised_price_cad"]),
                "medianPriceCad": float(row["median_advertised_price_cad"]),
                "maxPriceCad": float(row["maximum_advertised_price_cad"]),
                "minPerMlCad": number(row["minimum_price_per_ml_cad"]),
                "medianPerMlCad": number(row["median_price_per_ml_cad"]),
                "maxPerMlCad": number(row["maximum_price_per_ml_cad"]),
                "interpretation": (
                    "Kaksi laitelajia; kapasiteetti ei ole myytyä nestettä."
                    if row["segment"] == "empty hardware"
                    else "Päivämääräkohtainen, painottamaton otos; ei markkinakeskihinta."
                ),
            }
            for row in canada_retail_summary_rows
        ],
        "healthComparison": [
            {
                "healthCategory": health_category_labels.get(row["health_canada_category"], row["health_canada_category"]),
                "healthAverageCad": float(row["health_canada_2024_average_cad"]),
                "retailSegment": retail_comparison_labels.get(row["retail_observation_segment"], row["retail_observation_segment"]),
                "count": int(row["retail_observation_count"]),
                "retailMedianCad": float(row["retail_median_cad"]),
                "ratio": float(row["retail_to_shipment_ratio"]),
                "interpretation": "Tuoteotos verrattuna tuoteryhmän toimituskeskiarvoon; ei vähittäiskate tai markup-arvio.",
            }
            for row in canada_retail_comparison_rows
        ],
        "stress": [
            {
                "scenario": row["scenario"],
                "baseCad": float(row["official_base_2024_cad"]),
                "priceChangePct": float(row["aggregate_price_change_pct"]),
                "volumeChangePct": float(row["aggregate_volume_change_pct"]),
                "valueCad": float(row["mechanical_value_cad"]),
                "changePct": float(row["change_vs_2024_pct"]),
                "interpretation": row["interpretation"],
            }
            for row in canada_retail_stress_rows
        ],
        "manifest": canada_retail_manifest,
        "taxSource": "https://www.canada.ca/en/revenue-agency/services/tax/technical-information/excise-duty/rates.html",
        "taxRule": "1,12 CAD / alkava 2 ml ensimmäisestä 10 ml:sta; sen jälkeen 1,12 CAD / alkava 10 ml. Määrätyissä provinsseissa lisävero on samansuuruinen.",
        "scope": "C-tason täydentävä, päivämääräkohtainen julkinen hintaotos; ei myyntipainotettu hintaindeksi, kassakuitti tai katelaskelma.",
    }

    germany_scenario_labels = {
        "low_observed": "Havaitun otoksen alin",
        "median_observed": "Havaitun otoksen mediaani",
        "high_observed": "Havaitun otoksen ylin",
    }
    germany_retail = {
        "observations": [
            {
                "id": row["observation_id"],
                "captureDate": row["capture_date"],
                "seller": row["seller"],
                "product": row["product"],
                "brand": row["brand"],
                "sku": row["sku"],
                "volumeMl": float(row["package_volume_ml"]),
                "priceEur": float(row["advertised_price_eur_including_vat"]),
                "pricePerMlEur": float(row["price_per_ml_eur_including_vat"]),
                "excise2026Per10mlEur": float(row["statutory_excise_2026_eur_per_10ml"]),
                "exciseSharePct": float(row["statutory_excise_share_of_advertised_price_pct"]),
                "availability": "Varastossa" if row["availability"] == "InStock" else row["availability"],
                "priceValidUntil": row["price_valid_until"],
                "priceBasis": "Hinta sisältää Saksan ALV:n; toimituskulut lisätään. Kassalla ei tehty ostoa.",
                "url": row["source_url"],
                "sourceTier": row["source_tier"],
                "rawSha256": row["raw_snapshot_sha256"],
            }
            for row in germany_retail_rows
        ],
        "summary": [
            {
                "segment": "10 ml e-nestepullot",
                "captureDate": row["capture_date"],
                "sellerCount": int(row["seller_count"]),
                "count": int(row["observation_count"]),
                "inStockCount": int(row["in_stock_count"]),
                "minPriceEur": float(row["minimum_price_eur_including_vat"]),
                "medianPriceEur": float(row["median_price_eur_including_vat"]),
                "maxPriceEur": float(row["maximum_price_eur_including_vat"]),
                "excise2025Per10mlEur": float(row["statutory_excise_2025_eur_per_10ml"]),
                "excise2026Per10mlEur": float(row["statutory_excise_2026_eur_per_10ml"]),
                "minExciseSharePct": float(row["minimum_price_2026_excise_share_pct"]),
                "medianExciseSharePct": float(row["median_price_2026_excise_share_pct"]),
                "maxExciseSharePct": float(row["maximum_price_2026_excise_share_pct"]),
            }
            for row in germany_retail_summary_rows
        ],
        "stress": [
            {
                "scenario": row["scenario"],
                "label": germany_scenario_labels[row["scenario"]],
                "officialVolumeLitres": int(row["official_taxed_volume_2025_litres"]),
                "retailPriceEur": float(row["retail_price_eur_per_10ml_including_vat"]),
                "mechanicalValueEur": float(row["mechanical_retail_value_eur"]),
                "mechanicalExciseBaseEur": float(row["mechanical_2025_excise_base_eur"]),
                "interpretation": "Mekaaninen plausibiliteettitesti; ei markkina-arvo, ennuste tai toteutunut verotuotto.",
            }
            for row in germany_retail_stress_rows
        ],
        "manifest": germany_retail_manifest,
        "officialVolumeSource": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html",
        "statutoryRateSource": "https://www.gesetze-im-internet.de/tabstg_2009/__2.html",
        "scope": "A-tason virallinen 2025 volyymi ja verokanta on pidetty erillään C-tason yhden myyjän 17.7.2026 hintaotoksesta. Hinnat sisältävät ALV:n ja toimituskulut lisätään.",
    }

    italy_rate_labels = {
        "e-liquid containing nicotine": "Nikotiinia sisältävä PLI/e-neste",
        "e-liquid without nicotine and flavours": "Nikotiiniton PLI/e-neste ja veronalaiset aromit",
    }
    italy_flow_labels = {
        "retail_points_supplied": "Myyntipisteisiin toimitettu",
        "tax_warehouses_supplied": "Verovarastoihin toimitettu",
        "direct_final_consumers": "Suoraan loppukuluttajille toimitettu",
    }
    italy_flow_notes = {
        "retail_points_supplied": "Tukkutoimitukset tunnistetuille myyntipisteille",
        "tax_warehouses_supplied": "Toimitusketjun sisäinen virta; ei saa lisätä kulutukseen sellaisenaan",
        "direct_final_consumers": "Suorat toimitukset loppukuluttajille",
    }
    italy_forecast_labels = {
        "containing_nicotine": "Nikotiinia sisältävä PLI/e-neste",
        "without_nicotine_and_flavours": "Nikotiiniton PLI/e-neste ja veronalaiset aromit",
    }
    italy_reporting_flows = []
    for flow in italy_flow_labels:
        rows = [row for row in italy_reporting_rows if row["reporting_flow"] == flow]
        italy_reporting_flows.append(
            {
                "flow": flow,
                "label": italy_flow_labels[flow],
                "officialSheet": rows[0]["official_sheet"],
                "fieldCount": len(rows),
                "quantityUnit": next(row["quantity_unit"] for row in rows if row["normalized_field"] == "total_quantity"),
                "fields": [row["official_italian_label"] for row in rows],
                "interpretation": italy_flow_notes[flow],
                "url": rows[0]["source_url"],
            }
        )
    italy_forecast = [
        {
            "year": int(row["forecast_year"]),
            "category": row["product_category"],
            "label": italy_forecast_labels[row["product_category"]],
            "proposedUnitTaxEurPerMl": float(row["proposed_unit_tax_eur_per_ml"]),
            "estimatedQuantityMl": int(row["estimated_annual_quantity_ml"]),
            "estimatedQuantityLitres": float(row["estimated_annual_quantity_litres"]),
            "estimatedTaxRevenueEur": int(row["estimated_annual_tax_revenue_eur"]),
            "estimatedIncrementalRevenueEur": int(row["estimated_incremental_revenue_eur"]),
            "status": row["evidence_status"],
            "limitation": row["limitation"],
            "url": row["source_url"],
        }
        for row in italy_forecast_rows
    ]
    italy_forecast_totals = []
    for year in sorted({row["year"] for row in italy_forecast}):
        rows = [row for row in italy_forecast if row["year"] == year]
        italy_forecast_totals.append(
            {
                "year": year,
                "estimatedQuantityMl": sum(row["estimatedQuantityMl"] for row in rows),
                "estimatedQuantityLitres": sum(row["estimatedQuantityLitres"] for row in rows),
                "estimatedTaxRevenueEur": sum(row["estimatedTaxRevenueEur"] for row in rows),
                "estimatedIncrementalRevenueEur": sum(row["estimatedIncrementalRevenueEur"] for row in rows),
            }
        )
    italy_request = next(row for row in requests if row["request_id"] == "PX-IT-001")
    italy_adm = {
        "rates": [
            {
                "effectiveFrom": row["effective_from"],
                "effectiveTo": row["effective_to"],
                "category": row["product_category"],
                "label": italy_rate_labels[row["product_category"]],
                "rateEurPerMl": float(row["rate_eur_per_ml"]),
                "rateEurPer10Ml": float(row["rate_eur_per_ml"]) * 10,
                "legalScope": row["legal_scope"],
                "url": row["source_url"],
                "tier": row["source_tier"],
            }
            for row in italy_rate_rows
        ],
        "reportingFlows": italy_reporting_flows,
        "forecast": italy_forecast,
        "forecastTotals": italy_forecast_totals,
        "manifest": italy_manifest,
        "actualStatus": italy_manifest["actual_2025_national_aggregate"]["status"],
        "actualNeeded": italy_manifest["actual_2025_national_aggregate"]["needed"],
        "request": {
            "id": italy_request["request_id"],
            "authority": italy_request["authority"],
            "status": italy_request["status"],
            "recipient": italy_request["recipient"],
            "scope": italy_request["scope"],
        },
        "serviceUrl": "https://www.adm.gov.it/portale/-/portale-prodotti-liquidi-da-inalazione-pli-e-prodotti-accessori-dei-tabacchi-pat-1",
        "budgetUrl": italy_forecast_rows[0]["source_url"],
    }

    spain_rate_labels = {
        "L1": "Nikotiiniton tai enintään 15 mg/ml e-neste",
        "L2": "Yli 15 mg/ml e-neste",
        "L3": "Nikotiinipussit",
        "L4": "Muut nikotiinituotteet",
    }
    spain_scenario_labels = {
        "low_e_liquid_allocation": "Matala nestekohdistus",
        "central_e_liquid_allocation": "Keskimmäinen nestekohdistus",
        "full_e_liquid_attribution": "Täysi nestekohdistus",
    }
    spain_request = next(row for row in requests if row["request_id"] == "PX-ES-001")
    spain_aeat = {
        "rates": [
            {
                "epigraph": row["epigraph"],
                "label": spain_rate_labels[row["epigraph"]],
                "baseUnit": row["taxable_base_unit"],
                "rateEurPerUnit": float(row["rate_eur_per_unit"]),
                "effectiveFrom": row["effective_from"],
                "url": row["source_url"],
                "tier": row["source_tier"],
            }
            for row in spain_rate_rows
        ],
        "revenue": [
            {
                "period": row["cash_period"],
                "month": int(row["month"]),
                "netRevenueEur": int(row["net_revenue_eur"]),
                "cumulativeNetRevenueEur": int(row["cumulative_net_revenue_eur"]),
                "derivation": row["derivation"],
                "url": row["source_url"],
                "scope": row["scope"],
            }
            for row in spain_revenue_rows
        ],
        "sensitivity": [
            {
                "scenario": row["scenario"],
                "label": spain_scenario_labels[row["scenario"]],
                "eLiquidRevenueSharePct": int(row["assumed_e_liquid_share_of_combined_revenue_pct"]),
                "l1SharePct": int(row["assumed_L1_share_pct"]),
                "l2SharePct": int(row["assumed_L2_share_pct"]),
                "blendedRateEurPerMl": float(row["blended_rate_eur_per_ml"]),
                "illustrativeVolumeMl": int(row["illustrative_e_liquid_volume_ml"]),
                "illustrativeVolumeLitres": float(row["illustrative_e_liquid_volume_litres"]),
                "status": row["status"],
                "limitation": row["limitation"],
            }
            for row in spain_sensitivity_rows
        ],
        "manifest": spain_manifest,
        "exactNetRevenueEur": spain_manifest["official_results"]["exact_net_cash_revenue_eur"],
        "roundedAnnualRevenueEur": spain_manifest["official_results"]["annual_report_rounded_net_revenue_eur"],
        "roundedGrossRevenueEur": spain_manifest["official_results"]["december_report_rounded_gross_revenue_eur"],
        "conditionalRange": spain_manifest["volume_status"]["conditional_all_e_liquid_range_ml"],
        "actualLiquidVolumeObtained": spain_manifest["volume_status"]["actual_L1_L2_millilitres_publicly_obtained"],
        "request": {
            "id": spain_request["request_id"],
            "authority": spain_request["authority"],
            "status": spain_request["status"],
            "channel": spain_request["recipient"],
            "scope": spain_request["scope"],
            "scopeFi": "Kuukausittaiset L1/L2-millilitrat, L3/L4-grammat, verovelat, vähennykset, palautukset ja huhtikuun alkuvarastojen oikaisu.",
        },
        "annualReportUrl": "https://sede.agenciatributaria.gob.es/Sede/estadisticas/recaudacion-tributaria/informe-anual/ejercicio-2025/5-impuestos-especiales.html",
        "model573Url": "https://www.boe.es/eli/es/o/2025/01/13/hac86",
    }

    france_scope_labels = {
        "core_devices": "Sähkösavukelaitteet",
        "broad_nicotine_inhalation_proxy": "Laaja nikotiinia sisältävä inhalaatioproxy",
        "broad_nicotine_free_tobacco_substitute_inhalation_proxy": "Laaja nikotiiniton tupakankorvikeproxy",
        "broad_other_substitute_inhalation_proxy": "Laaja muu inhalaatioproxy",
    }
    france_request = next(row for row in requests if row["request_id"] == "PX-FR-001")
    france_evidence = {
        "customs": [
            {
                "code": row["cn8"],
                "scope": row["scope"],
                "label": france_scope_labels[row["scope"]],
                "officialLabel": row["official_label_fr"],
                "importEur": int(row["douane_import_eur"]),
                "exportEur": int(row["douane_export_eur"]),
                "borderNetEur": int(row["border_net_import_eur"]),
                "importKg": int(row["douane_import_kg"]),
                "exportKg": int(row["douane_export_kg"]),
                "chinaOriginEur": int(row["china_origin_import_eur"]),
                "chinaSharePct": float(row["china_origin_share_pct"]),
                "eurostatImportEur": int(row["eurostat_world_import_eur"]),
                "eurostatExportEur": int(row["eurostat_world_export_eur"]),
                "importGapPct": float(row["douane_vs_eurostat_import_gap_pct"]),
                "exportGapPct": float(row["douane_vs_eurostat_export_gap_pct"]),
                "supplementaryUnitStatus": row["supplementary_unit_status"],
            }
            for row in france_customs_rows
        ],
        "monthly": [
            {
                "month": int(row["month"]),
                "code": row["cn8"],
                "importEur": int(row["import_eur"]),
                "exportEur": int(row["export_eur"]),
                "borderNetEur": int(row["border_net_import_eur"]),
            }
            for row in france_monthly_rows
        ],
        "topOrigins": [
            {
                "code": row["cn8"],
                "rank": int(row["rank"]),
                "originCode": row["origin_code"],
                "origin": row["origin_name"],
                "importEur": int(row["import_eur"]),
                "importKg": int(row["import_kg"]),
                "sharePct": float(row["share_of_code_import_value_pct"]),
            }
            for row in france_origin_rows
        ],
        "routeBridge": [
            {
                "code": row["cn8"],
                "nationalNonEuOriginEur": int(row["douane_known_non_eu_origin_import_eur"]),
                "indeterminateOriginEur": int(row["douane_indeterminate_origin_import_eur"]),
                "nationalEuOrFranceOriginEur": int(row["douane_eu27_or_fr_origin_import_eur"]),
                "eurostatDirectExtraEur": int(row["eurostat_direct_extra_eu_import_eur"]),
                "eurostatIntraConsignmentEur": int(row["eurostat_intra_eu_consignment_import_eur"]),
                "eurostatWorldEur": int(row["eurostat_world_import_eur"]),
                "partsGapEur": int(row["eurostat_parts_reconciliation_gap_eur"]),
                "classificationGapEur": int(row["origin_vs_direct_extra_classification_gap_eur"]),
            }
            for row in france_route_rows
        ],
        "registryAudit": [
            {
                "metric": row["metric"],
                "value": float(row["value"]),
                "unit": row["unit"],
                "status": row["status"],
                "note": row["note"],
            }
            for row in france_registry_rows
        ],
        "productTypes": [
            {
                "type": row["product_type"],
                "rows": int(row["registry_rows"]),
                "sharePct": float(row["share_of_registry_rows_pct"]),
            }
            for row in france_product_type_rows
        ],
        "salesCoverage": [
            {
                "period": row["sales_year"],
                "expected": int(row["expected_product_presentations"]),
                "transmitted": int(row["sales_data_transmitted"]),
                "missing": int(row["sales_data_missing"]),
                "hitRatePct": float(row["submission_hit_rate_pct"]),
                "conclusion": row["anses_conclusion"],
            }
            for row in france_coverage_rows
        ],
        "manifest": france_manifest,
        "request": {
            "id": france_request["request_id"],
            "authority": france_request["authority"],
            "status": france_request["status"],
            "recipient": france_request["recipient"],
            "scope": france_request["scope"],
        },
        "douaneUrl": "https://www.douane.gouv.fr/la-douane/opendata?f%5B0%5D=categorie_opendata_facet%3A458&title=",
        "eurostatMethodUrl": "https://ec.europa.eu/eurostat/cache/metadata/en/ext_go_detail_sims.htm",
        "ansesRegistryUrl": "https://www.data.gouv.fr/en/datasets/produits-du-tabac-et-produits-connexes-declares-sur-le-marche-francais/",
        "ansesCoverageUrl": "https://www.anses.fr/fr/system/files/CONSO2018SA0189Ra-2.pdf",
    }

    poland_scope_labels = {
        "core_devices": "Sähkösavukelaitteet",
        "broad_nicotine_inhalation_proxy": "Laaja nikotiinia sisältävä inhalaatioproxy",
        "broad_nicotine_free_tobacco_substitute_inhalation_proxy": "Laaja nikotiiniton tupakankorvikeproxy",
        "broad_other_substitute_inhalation_proxy": "Laaja muu inhalaatioproxy",
    }
    poland_category_labels = {
        "e_liquid": "E-savukeneste",
        "vaporisation_devices": "Höyrystinlaitteet",
        "vaporisation_device_part_kits": "Laitteiden osasarjat",
    }
    poland_request = next(row for row in requests if row["request_id"] == "PX-PL-001")
    poland_evidence = {
        "volume": [
            {
                "year": int(row["year"]),
                "litres": int(row["official_e_liquid_litres"]),
                "ml": int(row["official_e_liquid_ml"]),
                "measure": row["measure"],
                "sourceSystems": row["source_systems"],
                "status": row["evidence_status"],
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in poland_volume_rows
        ],
        "revenue": [
            {
                "year": int(row["year"]),
                "revenuePln": int(row["official_e_liquid_excise_revenue_pln"]) if row["official_e_liquid_excise_revenue_pln"] else None,
                "status": row["status"],
                "preliminary": row["preliminary"] == "true",
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in poland_revenue_rows
        ],
        "categories2025": [
            {
                "category": row["category"],
                "label": poland_category_labels[row["category"]],
                "planMillionPln": number(row["budget_plan_million_pln"]),
                "actualMillionPln": float(row["actual_million_pln"]),
                "varianceMillionPln": number(row["variance_million_pln"]),
                "executionRatePct": number(row["execution_rate_pct"]),
                "taxStart": row["tax_start"],
                "url": row["source_url"],
            }
            for row in poland_category_rows
        ],
        "controls": [
            {
                "period": row["period"],
                "controls": int(row["controls_total"]) if row["controls_total"] else None,
                "findingsOrSuccessful": int(row["controls_with_irregularities_or_successful"]),
                "hitRatePct": number(row["recomputed_hit_rate_pct"]),
                "liquidMl": int(row["seized_or_revealed_e_liquid_ml"]) if row["seized_or_revealed_e_liquid_ml"] else None,
                "disposableDevices": int(row["seized_disposable_devices"]) if row["seized_disposable_devices"] else None,
                "url": row["source_url"],
                "boundary": row["sampling_boundary"],
            }
            for row in poland_control_rows
        ],
        "revision": [
            {
                "releaseDate": row["release_date"],
                "ml": float(row["official_e_liquid_ml"]),
                "litres": float(row["official_e_liquid_litres"]),
                "url": row["source_url"],
                "sourceDetail": row["source_system_detail"],
                "maturity": row["maturity"],
            }
            for row in poland_revision_rows
        ],
        "reconciliation": [
            {
                "year": int(row["year"]),
                "officialMl": int(row["official_later_release_ml"]),
                "ratePlnPerMl": float(row["statutory_rate_pln_per_ml"]),
                "mechanicalExcisePln": float(row["mechanical_excise_pln"]),
                "officialRevenuePln": int(row["official_excise_revenue_pln"]),
                "gapPln": float(row["official_minus_mechanical_pln"]),
                "gapPct": float(row["gap_pct_of_official_revenue"]),
            }
            for row in poland_reconciliation_rows
        ],
        "route": [
            {
                "code": row["cn8"],
                "scope": row["scope"],
                "label": poland_scope_labels[row["scope"]],
                "worldImportEur": int(row["world_import_eur"]) if row["world_import_eur"] else None,
                "intraImportEur": int(row["intra_eu_import_eur"]) if row["intra_eu_import_eur"] else None,
                "extraImportEur": int(row["extra_eu_import_eur"]) if row["extra_eu_import_eur"] else None,
                "extraSharePct": number(row["extra_eu_share_pct"]),
                "worldExportEur": int(row["world_export_eur"]) if row["world_export_eur"] else None,
                "publicationStatus": row["import_publication_status"],
                "url": row["source_url"],
            }
            for row in poland_route_rows
        ],
        "manifest": poland_manifest,
        "request": {
            "id": poland_request["request_id"],
            "authority": poland_request["authority"],
            "status": poland_request["status"],
            "recipient": poland_request["recipient"],
            "scope": poland_request["scope"],
        },
        "volumeUrl": poland_manifest["urls"]["volume"],
        "revenueUrl": poland_manifest["urls"]["revenue"],
        "executionUrl": poland_manifest["urls"]["execution"],
        "kasUrl": poland_manifest["urls"]["kas"],
        "ratesUrl": poland_manifest["urls"]["rates"],
        "devicesUrl": poland_manifest["urls"]["devices"],
        "formsUrl": poland_manifest["urls"]["akc4m"],
        "publicInformationUrl": "https://www.gov.pl/web/finanse/uzyskaj-informacje-publiczna",
    }

    netherlands_metric_labels = {
        "reported_total_consumer_spend": "Mallinnettu kulutusmeno yhteensä",
        "reported_illegal_consumer_spend_age_specific": "Mallinnettu laiton kulutusmeno, ikäryhmämenetelmä",
        "derived_legal_consumer_spend_residual": "Johdettu laillinen jäännös",
        "reported_direct_illegal_87pct_method": "Raportin suora 87 % -menetelmä",
        "derived_direct_legal_residual": "Johdettu laillinen jäännös, suora menetelmä",
        "derived_age_specific_vs_direct_illegal_delta": "Ikä- ja suoran menetelmän ero",
        "reported_uncorrected_ipsos_extrapolation": "Hylätty korjaamaton Ipsos-ekstrapolaatio",
    }
    netherlands_price_labels = {
        "disposable_vape": "Kertakäyttöinen vape",
        "refillable_or_smart_vape": "Täytettävä / smart-vape",
        "refill_liquid": "Täyttöneste",
        "other_including_cannabis_vapes": "Muu, sisältää kannabisvapeja",
    }
    netherlands_youth_labels = {
        "report_input_and_official_lower_95pct_bound": "Raportin 22,8 % / alempi 95 % raja",
        "official_point_estimate": "Virallinen piste-estimaatti",
        "official_upper_95pct_bound": "Virallinen ylempi 95 % raja",
    }
    netherlands_basket_labels = {
        "narrow_devices_plus_nicotine_proxy": "Kapea: 85434000 + 24041200",
        "broad_four_code_context": "Laaja neljän koodin konteksti",
    }
    netherlands_request = next(row for row in requests if row["request_id"] == "PX-NL-001")
    netherlands_evidence = {
        "market": [
            {
                "metric": row["metric"],
                "label": netherlands_metric_labels[row["metric"]],
                "valueEur": float(row["value_eur"]),
                "sharePct": float(row["share_of_total_pct"]),
                "calculation": row["calculation"],
                "status": row["evidence_status"],
                "sourcePage": row["source_page"],
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in netherlands_market_rows
        ],
        "method": [
            {
                "item": row["audit_item"],
                "observed": row["observed_value"],
                "result": row["audit_result"],
                "bankUse": row["bank_use"],
                "sourcePage": row["source_page"],
                "url": row["source_url"],
            }
            for row in netherlands_method_rows
        ],
        "prices": [
            {
                "product": row["product_type"],
                "label": netherlands_price_labels[row["product_type"]],
                "averagePriceEur": float(row["average_price_eur"]),
                "reportedN": int(row["reported_n"]),
                "purchaseFrequency": row["purchase_frequency"],
                "sourcePage": row["source_page"],
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in netherlands_price_rows
        ],
        "stress": [
            {
                "scenario": row["scenario"],
                "multiplier": float(row["price_spend_multiplier"]),
                "totalSpendEur": float(row["total_consumer_spend_eur"]),
                "illegalSpendEur": float(row["illegal_consumer_spend_eur"]),
                "legalResidualEur": float(row["legal_residual_eur"]),
                "illegalSharePct": float(row["illegal_share_held_constant_pct"]),
                "interpretation": row["interpretation"],
                "boundary": row["boundary"],
            }
            for row in netherlands_stress_rows
        ],
        "youth": [
            {
                "scenario": row["scenario"],
                "label": netherlands_youth_labels[row["scenario"]],
                "population": int(row["population_age_12_16"]),
                "prevalencePct": float(row["ever_vaped_prevalence_pct"]),
                "impliedPeople": int(row["implied_people"]),
                "differencePeople": int(row["difference_vs_report_people"]),
                "status": row["status"],
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in netherlands_youth_rows
        ],
        "cbs": [
            {
                "year": int(row["year"]),
                "category": row["person_category"],
                "ageGroup": row["age_group"],
                "pointPct": float(row["point_estimate_pct"]),
                "lowerPct": float(row["lower_95pct_bound"]),
                "upperPct": float(row["upper_95pct_bound"]),
                "measure": row["measure"],
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in netherlands_cbs_rows
        ],
        "bridge": [
            {
                "year": int(row["year"]),
                "basket": row["basket"],
                "label": netherlands_basket_labels[row["basket"]],
                "products": row["products"],
                "worldImportEur": int(row["world_import_eur"]),
                "worldExportEur": int(row["world_export_eur"]),
                "borderNetEur": int(row["border_net_import_minus_export_eur"]),
                "intraImportEur": int(row["intra_EU_import_eur"]),
                "extraImportEur": int(row["extra_EU_import_eur"]),
                "intraExportEur": int(row["intra_EU_export_eur"]),
                "extraExportEur": int(row["extra_EU_export_eur"]),
                "importGapEur": int(row["import_world_reconciliation_gap_eur"]),
                "exportGapEur": int(row["export_world_reconciliation_gap_eur"]),
                "extraImportSharePct": float(row["extra_EU_import_share_pct"]),
                "exportImportRatioPct": float(row["export_to_import_ratio_pct"]),
                "reportedConsumerSpendEur": int(row["reported_consumer_spend_eur"]),
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in netherlands_bridge_rows
        ],
        "route": [
            {
                "year": int(row["year"]),
                "product": row["product"],
                "productLabel": row["product_label"],
                "scope": row["scope"],
                "flow": row["flow"],
                "partnerScope": row["partner_scope"],
                "valueEur": int(row["value_eur"]) if row["value_eur"] else None,
                "quantityKg": number(row["quantity_kg"]),
                "supplementaryQuantity": number(row["supplementary_quantity"]),
                "gapEur": int(row["world_minus_intra_minus_extra_eur"]) if row["world_minus_intra_minus_extra_eur"] else None,
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in netherlands_route_rows
        ],
        "partners": [
            {
                "year": int(row["year"]),
                "product": row["product"],
                "scope": row["scope"],
                "flow": row["flow"],
                "partner": row["partner"],
                "partnerLabel": row["partner_label"],
                "partnerRole": row["partner_role"],
                "valueEur": int(row["value_eur"]),
                "rank": int(row["rank"]),
                "sharePct": float(row["share_of_country_partner_rows_pct"]),
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in netherlands_partner_rows
        ],
        "manifest": netherlands_manifest,
        "request": {
            "id": netherlands_request["request_id"],
            "authority": netherlands_request["authority"],
            "status": netherlands_request["status"],
            "recipient": netherlands_request["recipient"],
            "scope": netherlands_request["scope"],
        },
        "urls": netherlands_manifest["source_urls"],
    }

    sweden_category_labels = {
        "regular_e_liquid": "Muu verollinen e-neste",
        "high_concentration_e_liquid": "Vahva e-neste, 15–20 mg/ml",
        "total_e_liquid": "E-nesteet yhteensä",
    }
    sweden_format_labels = {
        "closed_system_e_liquid": "Suljettu järjestelmä, 1 ml",
        "closed_system_disposable": "Kertakäyttöinen, 1 ml",
        "open_system_e_liquid": "Avoin järjestelmä, 10 ml",
    }
    sweden_scope_labels = {
        "core_devices": "Laitteet 85434000",
        "nicotine_inhalation_products": "Nikotiini-inhalaatiotuotteet 24041200",
        "nicotine_free_tobacco_substitute_inhalation_proxy": "Nikotiiniton tupakankorvikeproxy 24041910",
        "other_substitute_inhalation_proxy": "Muu inhalaatioproxy 24041990",
        "narrow patent scope proxy": "Kapea kori 85434000 + 24041200",
        "broad inhalation proxy": "Laaja neljän koodin konteksti",
    }
    sweden_scenario_labels = {
        "downside_minus_20_pct": "Alas −20 %",
        "baseline_who_open_system": "WHO-lähtötaso",
        "upside_plus_20_pct": "Ylös +20 %",
    }
    sweden_requests = {
        row["request_id"]: row for row in requests if row["request_id"] in {"PX-SE-001", "PX-SE-002"}
    }
    sweden_evidence = {
        "rates": [
            {
                "year": int(row["year"]),
                "category": row["category"],
                "label": sweden_category_labels[row["category"]],
                "rateSekPerLitre": float(row["rate_sek_per_litre"]),
                "rateSekPerMl": float(row["rate_sek_per_ml"]),
                "definition": row["definition"],
                "status": row["status"],
                "url": row["source_url"],
            }
            for row in sweden_rate_rows
        ],
        "volume": [
            {
                "year": int(row["year"]),
                "category": row["category"],
                "label": sweden_category_labels[row["category"]],
                "litres": int(float(row["registered_quantity_litres"])),
                "ml": int(float(row["registered_quantity_ml"])),
                "revenueSek": int(float(row["tax_revenue_sek"])),
                "status": row["status"],
                "quantityGranularityLitres": int(float(row["display_granularity_quantity_litres"])),
                "revenueGranularitySek": int(float(row["display_granularity_revenue_sek"])),
                "sourceTable": row["source_table"],
                "url": row["source_url"],
                "boundary": row["boundary"],
            }
            for row in sweden_volume_rows
        ],
        "reconciliation": [
            {
                "category": row["category"],
                "label": sweden_category_labels[row["category"]],
                "litres": int(float(row["displayed_quantity_litres"])),
                "rateSekPerLitre": (
                    float(row["official_2024_rate_sek_per_litre"])
                    if row["official_2024_rate_sek_per_litre"] not in {"", "weighted_by_category"}
                    else None
                ),
                "mechanicalTaxSek": int(float(row["mechanical_tax_sek"])),
                "displayedRevenueSek": int(float(row["displayed_revenue_sek"])),
                "gapSek": int(float(row["reported_minus_mechanical_sek"])),
                "gapPct": float(row["reported_minus_mechanical_pct_of_reported"]),
                "roundingOverlap": row["rounding_intervals_overlap"].lower() == "true",
                "interpretation": row["interpretation"],
                "url": row["source_url"],
            }
            for row in sweden_reconciliation_rows
        ],
        "prices": [
            {
                "format": row["format"],
                "label": sweden_format_labels[row["format"]],
                "packageMl": float(row["package_ml"]),
                "priceSek": float(row["price_sek"]),
                "priceSekPerMl": float(row["price_sek_per_ml"]),
                "exciseSharePct": float(row["specific_excise_share_pct"]),
                "observation": row["observation"],
                "tier": row["source_tier"],
                "sourcePage": int(row["source_page"]),
                "url": row["source_url"],
            }
            for row in sweden_price_rows
        ],
        "stress": [
            {
                "scenario": row["scenario"],
                "label": sweden_scenario_labels[row["scenario"]],
                "priceFactor": float(row["price_factor"]),
                "priceSekPer10Ml": float(row["price_sek_per_10ml"]),
                "officialVolumeLitres": int(float(row["official_2024_taxed_volume_litres"])),
                "tenMlEquivalents": int(float(row["ten_ml_equivalents"])),
                "mechanicalValueSek": int(float(row["mechanical_gross_retail_value_sek"])),
                "officialDisplayedTaxRevenueSek": int(float(row["official_displayed_tax_revenue_sek"])),
                "taxSharePct": float(row["tax_revenue_share_of_mechanical_value_pct"]),
                "tier": row["source_tier"],
                "boundary": row["boundary"],
                "url": row["source_url"],
            }
            for row in sweden_stress_rows
        ],
        "route": [
            {
                "year": int(row["period"]),
                "scope": row["scope"],
                "label": sweden_scope_labels[row["scope_label"]],
                "products": row["products"],
                "worldImportEur": int(float(row["world_import_value_eur"])),
                "worldExportEur": int(float(row["world_export_value_eur"])),
                "borderNetEur": int(float(row["border_net_import_value_eur"])),
                "intraImportEur": int(float(row["intra_eu_import_value_eur"])),
                "extraImportEur": int(float(row["extra_eu_import_value_eur"])),
                "extraImportSharePct": float(row["extra_eu_import_share_pct"]),
                "importGapEur": int(float(row["import_route_gap_eur"])),
                "exportGapEur": int(float(row["export_route_gap_eur"])),
                "status": row["evidence_status"],
                "interpretation": row["interpretation"],
                "url": row["source_url"],
                "methodUrl": row["method_url"],
            }
            for row in sweden_route_rows
        ],
        "partners": [
            {
                "year": int(row["period"]),
                "scope": row["scope"],
                "flow": row["flow"],
                "rank": int(row["rank"]),
                "partner": row["partner"],
                "partnerLabel": row["partner_label"],
                "partnerBasis": row["partner_basis"],
                "valueEur": int(float(row["value_eur"])),
                "sharePct": float(row["share_of_country_partner_rows_pct"]),
                "url": row["source_url"],
            }
            for row in sweden_partner_rows
            if row["scope"] == "narrow_patent_scope_proxy" and int(row["rank"]) <= 5
        ],
        "method": [
            {
                "id": row["evidence_id"],
                "topic": row["topic"],
                "tier": row["source_tier"],
                "source": row["source"],
                "measure": row["original_measure"],
                "transformation": row["transformation"],
                "result": row["audit_result"],
                "limitation": row["limitation"],
                "url": row["source_url"],
            }
            for row in sweden_method_rows
        ],
        "manifest": sweden_manifest,
        "requests": [
            {
                "id": request_id,
                "authority": sweden_requests[request_id]["authority"],
                "status": sweden_requests[request_id]["status"],
                "recipient": sweden_requests[request_id]["recipient"],
                "scope": sweden_requests[request_id]["scope"],
            }
            for request_id in ("PX-SE-001", "PX-SE-002")
        ],
        "urls": sweden_manifest["urls"],
    }

    denmark_scope_labels = {
        "core_devices": "Laitteet 85434000",
        "nicotine_inhalation_products": "Nikotiini-inhalaatiotuotteet 24041200",
        "nicotine_free_tobacco_substitute_inhalation_proxy": "Nikotiiniton tupakankorvikeproxy 24041910",
        "other_substitute_inhalation_proxy": "Muu inhalaatioproxy 24041990",
        "narrow patent scope proxy": "Kapea kori 85434000 + 24041200",
        "broad inhalation proxy": "Laaja neljän koodin konteksti",
    }
    denmark_scenario_labels = {
        "downside_high_rate_low_rounding_minus_20pct": "Alas: korkea kanta, alaraja, hinta -20 %",
        "central_equal_volume_mix_who_price": "Keskus: 50/50 volyymimix ja WHO-hinta",
        "upside_low_rate_high_rounding_plus_20pct": "Ylös: matala kanta, yläraja, hinta +20 %",
    }
    denmark_format_labels = {
        "closed_system_e_liquid": "Suljetun järjestelmän e-neste",
        "closed_system_disposable": "Kertakäyttöinen",
        "open_system_e_liquid": "Avoimen järjestelmän e-neste",
    }
    denmark_registry_labels = {
        "Refill container/cartridge containing e-liquid.": "E-nestettä sisältävä täyttösäiliö/patruuna",
        "Other": "Muu",
        "Kit – Pack containing more than one different e-cigarette device and/or more than one different refill container/cartridge.": "Kitti/pakkaus",
        "Individual part of electronic cigarette capable of containing e-liquid.": "E-nestettä sisältävä laitteen osa",
        "Electronic cigarette – Disposable.": "Kertakäyttöinen e-savuke",
        "Electronic cigarette – Refillable, device only.": "Täytettävä laite",
        "Electronic cigarette – Rechargeable, device only Any rechargeable which can also be used as a refillable should be reported under the refillable category.": "Ladattava laite",
        "Electronic cigarette – Rechargeable, placed on the market with one type of e-liquid (fixed combination). Any rechargeable which can also be used as a refillable should be reported under the refillable categ": "Ladattava kiinteä neste-yhdistelmä",
    }
    denmark_partner_names = {
        "CN": "Kiina", "HR": "Kroatia", "PL": "Puola", "DE": "Saksa", "FR": "Ranska",
        "NO": "Norja", "US": "Yhdysvallat", "MX": "Meksiko", "FI": "Suomi",
    }
    denmark_requests = {
        row["request_id"]: row for row in requests if row["request_id"] in {"PX-DK-001", "PX-DK-002"}
    }
    denmark_evidence = {
        "rates": [
            {
                "year": int(row["year"]), "category": row["category"],
                "label": "Enintään 12 mg/ml" if "up_to" in row["category"] else "Yli 12 mg/ml",
                "rateDkkPerMl": float(row["rate_dkk_per_ml"]),
                "rateDkkPerLitre": float(row["rate_dkk_per_litre"]),
                "definition": row["definition"], "status": row["status"], "url": row["source_url"],
            }
            for row in denmark_rate_rows
        ],
        "actuals": [
            {
                "year": int(row["year"]),
                "bookedRevenueDkk": float(row["booked_combined_revenue_dkk"]),
                "bookedRevenueMillionDkk": float(row["booked_combined_revenue_million_dkk"]),
                "growthPct": number(row["year_on_year_growth_pct"]),
                "status": row["status"], "scope": row["scope"],
                "separableELiquidActual": row["separable_e_liquid_actual"] == "yes",
                "boundary": row["boundary"], "sourceCell": row["source_cell"], "url": row["source_url"],
            }
            for row in denmark_actual_rows
        ],
        "forecast": [
            {
                "year": int(row["forecast_year"]), "case": row["rate_case"],
                "label": "Kaikki yli 12 mg/ml" if "above" in row["rate_case"] else "Kaikki enintään 12 mg/ml",
                "rateDkkPerMl": float(row["rate_dkk_per_ml"]),
                "officialForecastDkk": float(row["official_displayed_forecast_dkk"]),
                "displayGranularityDkk": float(row["forecast_display_granularity_dkk"]),
                "roundingLowDkk": float(row["rounding_revenue_low_dkk"]),
                "roundingHighDkk": float(row["rounding_revenue_high_dkk"]),
                "volumeLowLitres": float(row["implied_volume_low_litres"]),
                "volumePointLitres": float(row["implied_volume_point_litres"]),
                "volumeHighLitres": float(row["implied_volume_high_litres"]),
                "status": row["status"], "boundary": row["boundary"], "url": row["source_url"],
            }
            for row in denmark_forecast_rows
        ],
        "prices": [
            {
                "format": row["format"], "label": denmark_format_labels[row["format"]],
                "packageMl": float(row["package_ml"]), "priceDkk": float(row["price_dkk"]),
                "priceDkkPerMl": float(row["price_dkk_per_ml"]),
                "exciseSharePct": float(row["specific_excise_share_pct"]),
                "observation": row["observation"], "tier": row["source_tier"],
                "sourcePage": int(row["source_page"]), "url": row["source_url"],
            }
            for row in denmark_price_rows
        ],
        "stress": [
            {
                "scenario": row["scenario"], "label": denmark_scenario_labels[row["scenario"]],
                "forecastAnchorDkk": float(row["forecast_revenue_anchor_dkk"]),
                "effectiveRateDkkPerMl": float(row["effective_rate_dkk_per_ml"]),
                "impliedVolumeLitres": float(row["implied_volume_litres"]),
                "priceFactor": float(row["price_factor"]), "priceDkkPer10Ml": float(row["price_dkk_per_10ml"]),
                "mechanicalValueDkk": float(row["mechanical_gross_retail_value_dkk"]),
                "taxSharePct": float(row["forecast_tax_share_of_mechanical_value_pct"]),
                "assumption": row["mix_and_rounding_assumption"], "tier": row["source_tier"],
                "boundary": row["boundary"], "url": row["source_url"],
            }
            for row in denmark_stress_rows
        ],
        "bridge": [
            {
                "metric": row["metric"], "valueDkk": float(row["value_dkk"]),
                "comparisonDkk": float(row["comparison_value_dkk"]), "ratioPct": float(row["ratio_pct"]),
                "interpretation": row["interpretation"], "status": row["status"], "url": row["source_url"],
            }
            for row in denmark_bridge_rows
        ],
        "controls": [
            {
                "period": int(row["period"]), "type": row["evidence_type"],
                "tobacco": int(row["tobacco_controls"]) if row["tobacco_controls"] else None,
                "nicotine": int(row["nicotine_controls"]) if row["nicotine_controls"] else None,
                "total": int(row["total_displayed_controls"]) if row["total_displayed_controls"] else None,
                "hitRatePct": number(row["hit_rate_pct"]), "hitRateScope": row["hit_rate_scope"],
                "derivedMetric": row["derived_metric"], "derivedValue": number(row["derived_value"]),
                "boundary": row["boundary"], "url": row["source_url"],
            }
            for row in denmark_control_rows
        ],
        "registry": [
            {
                "date": row["snapshot_date"], "type": row["product_type"],
                "label": denmark_registry_labels.get(row["product_type"], row["product_type"]),
                "rows": int(row["registry_rows"]), "uniqueIds": int(row["unique_product_ids_within_type"]),
                "sharePct": float(row["share_of_registry_rows_pct"]),
                "totalRows": int(row["total_registry_rows"]), "totalUniqueIds": int(row["total_unique_product_ids"]),
                "reportingEntities": int(row["total_reporting_entities"]), "status": row["status"], "url": row["source_url"],
            }
            for row in denmark_registry_rows
        ],
        "route": [
            {
                "year": int(row["period"]), "scope": row["scope"], "label": denmark_scope_labels[row["scope_label"]],
                "products": row["products"], "worldImportEur": int(float(row["world_import_value_eur"])),
                "worldExportEur": int(float(row["world_export_value_eur"])),
                "borderNetEur": int(float(row["border_net_import_value_eur"])),
                "intraImportEur": int(float(row["intra_eu_import_value_eur"])),
                "extraImportEur": int(float(row["extra_eu_import_value_eur"])),
                "extraImportSharePct": float(row["extra_eu_import_share_pct"]),
                "importGapEur": int(float(row["import_route_gap_eur"])), "exportGapEur": int(float(row["export_route_gap_eur"])),
                "status": row["evidence_status"], "interpretation": row["interpretation"],
                "url": row["source_url"], "methodUrl": row["method_url"],
            }
            for row in denmark_route_rows
        ],
        "partners": [
            {
                "year": int(row["period"]), "scope": row["scope"], "flow": row["flow"],
                "rank": int(row["rank"]), "partner": row["partner"],
                "partnerLabel": denmark_partner_names.get(row["partner"], row["partner_label"].split(" (incl.")[0]),
                "partnerBasis": row["partner_basis"], "valueEur": int(float(row["value_eur"])),
                "sharePct": float(row["share_of_country_partner_rows_pct"]), "url": row["source_url"],
            }
            for row in denmark_partner_rows
            if row["scope"] == "narrow_patent_scope_proxy" and int(row["rank"]) <= 5
        ],
        "method": [
            {
                "id": row["evidence_id"], "topic": row["topic"], "tier": row["source_tier"],
                "source": row["source"], "measure": row["original_measure"],
                "transformation": row["transformation"], "result": row["audit_result"],
                "limitation": row["limitation"], "url": row["source_url"],
            }
            for row in denmark_method_rows
        ],
        "manifest": denmark_manifest,
        "requests": [
            {
                "id": request_id, "authority": denmark_requests[request_id]["authority"],
                "status": denmark_requests[request_id]["status"],
                "recipient": denmark_requests[request_id]["recipient"], "scope": denmark_requests[request_id]["scope"],
            }
            for request_id in ("PX-DK-001", "PX-DK-002")
        ],
        "urls": denmark_manifest["urls"],
    }

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
            {"label": "Kanada tulli 2025", "value": f"{canada_combined_value / 1e6:.1f} milj. CAD".replace(".", ","), "detail": "CIMT HS10 · laitteet + laaja inhaloitavien kori", "tone": "blue"},
            {"label": "USA 2025", "value": f"{(us_device_value + us_liquid_value) / 1e6:.1f} milj. USD".replace(".", ","), "detail": "Census HTS10 · laitteet + täsmälliset nesteseokset", "tone": "blue"},
            {"label": "Etelä-Korea 2025", "value": f"{korea_device['import_value_thousand_usd'] / 1000:.3f}".replace(".", ",") + " milj. USD", "detail": "KCS HS6 · täsmällinen laiteluokka", "tone": "blue"},
            {"label": "Suomi 2025", "value": "3,547 milj. €", "detail": "E-nesteiden nettovero · 11 823,5 l", "tone": "gold"},
            {"label": "Saksa 2025", "value": "1,5 milj. l", "detail": "Verotetut tupakan korvikkeet, +18,2 %", "tone": "blue"},
            {"label": "Espanja 2025", "value": "29,568 milj. €", "detail": "AEAT:n tarkka L1-L4-nettokertymä", "tone": "gold"},
            {"label": "Puola 2025", "value": "993,1 milj. PLN", "detail": "Virallinen e-nesteen valmisteverototeuma", "tone": "gold"},
            {"label": "Ruotsi 2024", "value": "26 000 l · 80 milj. SEK", "detail": "Virallinen rekisteröity e-nestemäärä ja näytetty verotuotto", "tone": "gold"},
            {"label": "Tanska 2025", "value": "789,133 milj. DKK", "detail": "Virallinen yhdistetty nikotiinituotteiden ja -nesteiden verototeuma · ei e-neste yksin", "tone": "gold"},
            {"label": "Alankomaat", "value": "281,548 milj. €", "detail": "VWS:n tilaama mallinnettu kulutusmeno · ei virallinen sell-out", "tone": "blue"},
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
                "grade": "B",
                "market": "Kanada",
                "title": "Virallinen HS10-tuonti ja HS8-jälleenvientikorjaus",
                "value": "403,800 milj. CAD · 14 517 957 laitetta",
                "detail": "Statistics Canadan vuoden 2025 tullituonti: laitteet 89,316 milj. CAD ja laaja inhaloitavien tuotteiden kori 314,484 milj. CAD. Johdettu jälleenvienti oli 1,296 milj. CAD.",
                "limit": "Tulliarvo on eri vuoden ja eri arvostustason mittari kuin Health Canadan toimitusmyynti. 2404-kilogrammoja ei nimetä kokonaan valmiiksi e-nesteeksi eikä muunnettu litroiksi.",
                "source": "Statistics Canada · CIMT annual bulk files",
                "url": "https://www150.statcan.gc.ca/n1/en/catalogue/71-607-X2021004",
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
                "market": "Yhdysvallat",
                "title": "Virallinen HTS10-tuonti alkuperämaittain",
                "value": "577,764 milj. USD · 127 747 232 laitetta",
                "detail": "Censusin vuoden 2025 general imports: laitteet 256,840 milj. USD ja 127,747 milj. kappaletta; nimenomaiset sähkösavukeseokset 320,924 milj. USD ja 23,279 milj. kg. Kulutukseen luovutettujen ydinkoodien laskettu tulli oli 143,132 milj. USD.",
                "limit": "Tulliarvo ei ole vähittäismyyntiä eikä kata Yhdysvalloissa valmistettuja tuotteita, vähittäis-/tukkukatetta, varastoja tai laitonta kauppaa.",
                "source": "U.S. Census Bureau · Merchandise Trade Imports",
                "url": "https://www.census.gov/foreign-trade/data/IMDB.html",
            },
            {
                "grade": "A",
                "market": "Espanja",
                "title": "Toteutunut nettokassakertymä ja Modelo 573",
                "value": "29 568 000 EUR",
                "detail": "AEAT:n huhti-joulukuun 2025 kuukausirivit täsmäävät tarkkaan vuosisummaan. Modelo 573 erottaa L1/L2-nesteiden millilitrat L3/L4-tuotteiden grammoista.",
                "limit": "Kassakertymä kattaa kaikki neljä epigrafia. Se ei ole pelkkä e-nestevero, nestemäärä, vähittäismyynti tai markkina-arvo. L1/L2-veropohjat on pyydettävä erikseen.",
                "source": "AEAT / BOE · vuoden 2025 veroraportit ja Modelo 573",
                "url": "https://sede.agenciatributaria.gob.es/Sede/estadisticas/recaudacion-tributaria/informe-anual/ejercicio-2025/5-impuestos-especiales.html",
            },
            {
                "grade": "A",
                "market": "Puola",
                "title": "Ilmoitettu e-nesteen valmisteverovirta ja verototeuma",
                "value": "805 441 l · 443,6 milj. PLN (2023)",
                "detail": "MF:n myöhempi ZEFIR2/IAS Kraków/AIS -sarja yhdistää kotimaan myynnin, EU-hankinnan ja tuonnin. Vuoden 2023 määrä × 0,55 PLN/ml jää 0,137 % virallisen verotuoton alle. Vuoden 2025 e-nesteverototeuma oli 993,1 milj. PLN.",
                "limit": "Ilmoitettu laillinen valmisteverovirta ja verotuotto eivät ole retail-arvoa tai kuluttajien sell-outia. Vuoden 2023 määrä on 8,85 % alempi kuin aikaisempi julkaisu; revisiosyy odottaa vastausta.",
                "source": "Polish Ministry of Finance · interpellations 7255, 2408 and 17526",
                "url": "https://api.sejm.gov.pl/sejm/term10/interpellations/attachment/ATTDDEJZ5/i07255-o1.pdf",
            },
            {
                "grade": "A",
                "market": "Ruotsi",
                "title": "Rekisteröity e-nesteen verovolyymi ja verotuotto",
                "value": "26 000 l · 80 milj. SEK (2024)",
                "detail": "Finansdepartementin taulukko 7.5 julkaisee 14 000 litraa vahvaa ja 12 000 litraa muuta nikotiinia sisältävää e-nestettä. Tarkkojen verokantojen mekaaninen tulos on 80,8 milj. SEK.",
                "limit": "Luvut kuvaavat rekisteröityä verollista kulutusta ja ovat taulukossa pyöristettyjä. Ne eivät kata laitteita, nikotiinittomia nesteitä, ilmoittamattomia virtoja tai vähittäismyyntiarvoa.",
                "source": "Finansdepartementet · Beräkningskonventioner 2026",
                "url": "https://www.regeringen.se/rapporter/2025/09/berakningskonventioner-2026/",
            },
            {
                "grade": "A",
                "market": "Tanska",
                "title": "Kirjattu yhdistetty nikotiinituotetilin verototeuma",
                "value": "789,133 milj. DKK (2025)",
                "detail": "Skatteministerietin SKR-tulolistan kuukausirivit täsmäävät vuosisoluun. Yhdistelmätili kasvoi 43,872 % vuoden 2024 548,496 milj. DKK:sta.",
                "limit": "Tili yhdistää nikotiinituotteet/-pussit ja nikotiinia sisältävät nesteet. Se ei ole e-nesteen erillinen verotulo, myynti tai markkina-arvo. 90 milj. DKK:n e-nesteluku on ennuste.",
                "source": "Skatteministeriet · Indtægtsliste 2025",
                "url": "https://skm.dk/tal-og-metode/statistik/indtaegtslister/indtaegtsliste-for-2025",
            },
            {
                "grade": "B",
                "market": "Alankomaat",
                "title": "VWS:n tilaama kulutusmenon markkinatutkimusarvio",
                "value": "281,548 milj. EUR · 256,865 milj. EUR laiton arvio",
                "detail": "Bureau Beken 5 529 vastaajan tutkimus korjasi Ipsos-otoksen 9,1 % prevalenssia CBS:n 3,5 % virallisilla ikäryhmäluvuilla. Otos, painotus, hinnat, triangulaatio ja lähdeviitteet on auditoitu.",
                "limit": "Valtion tilaama malli, ei vero-, tullaus-, kassarekisteri- tai auditoitu retail-sarja. Tarkat ikäsolut ja SPSS-syntaksi puuttuvat; 22,8 % on Trimbos-taulukon alempi 95 % raja, ei 24,6 % piste-estimaatti.",
                "source": "Tweede Kamer / VWS · Donkere wolken 2026D17119",
                "url": "https://www.tweedekamer.nl/downloads/document?id=2026D17119",
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
            {
                "grade": "B",
                "market": "Japani",
                "title": "Virallinen 9-numeroinen kansallinen tullisarja",
                "value": "84,361 mrd JPY · 20 529 032 laitetta",
                "detail": "Vuoden 2025 tarkistettu tuonti nimikkeellä 854340000. Lisäksi 240419200 kirjasi 805 316 kg / 6,997 mrd JPY muita inhaloitavia tuotteita.",
                "limit": "CIF-tuontiarvo, ei kuluttajamyyntiä. 240419200 on laaja nimike eikä todista yksin, että koko määrä on nikotiinitonta e-nestettä.",
                "source": "Japan Customs / MOF · e-Stat 2025 revised",
                "url": "https://www.e-stat.go.jp/en/stat-search/files?bunya_l=16&cycle=1&layout=dataset&page=1&second=1&tclass1=000001013180&tclass2=000001013182&tclass3val=0&toukei=00350300&tstat=000001013141",
            },
            {
                "grade": "B",
                "market": "Etelä-Korea",
                "title": "Virallinen HS6-tullisarja ja 2025 HSK10-luokitus",
                "value": "148,534 milj. USD · 1 282 856 kg laitteita",
                "detail": (
                    "Korea Customs Servicen vuoden 2025 laitetuonti HS 854340. Laajojen HS 240412/240419 "
                    "inhaloitavien tuotteiden tuonti oli lisäksi 123,731 milj. USD / 2 112 659 kg. "
                    f"Laitteiden kolmen suurimman alkuperämaan osuus oli {korea_device_top3_text} %."
                ),
                "limit": "Tulliarvo ei ole kuluttajamyyntiä. HS6 240412/240419 ei todista koko määrää e-nesteeksi; tarkat HSK10-nesteiden arvot odottavat virallista API- tai tulliviranomaisotetta.",
                "source": "Korea Customs Service · Trade Statistics / UNI-PASS",
                "url": "https://tradedata.go.kr/cts/index_eng.do",
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
        "canadaCustoms": {
            "totals": canada_totals,
            "origins": canada_origins,
            "clearance": canada_clearance,
            "exports": canada_exports,
            "audit": canada_manifest["import_audit"],
            "reexportAudit": canada_manifest["reexport_derivation"],
            "archives": canada_manifest["archives"],
            "comparison": {
                "healthCanadaShipmentSales2024Cad": 1_160_753_796.78,
                "customsImportBasket2025Cad": canada_combined_value,
                "customsToPriorYearShipmentSalesPct": 100 * canada_combined_value / 1_160_753_796.78,
                "deviceValueCad": canada_device_value,
                "deviceQuantity": canada_device_quantity,
                "broadInhalationValueCad": canada_broad_value,
                "broadInhalationQuantityKg": canada_broad_quantity,
                "derivedReexportValueCad": canada_reexport_value,
                "derivedReexportSharePct": 100 * canada_reexport_value / canada_combined_value,
            },
            "limits": canada_manifest["definitions_and_limits"],
        },
        "canadaRetail": canada_retail,
        "germanyRetail": germany_retail,
        "italyAdm": italy_adm,
        "spainAeat": spain_aeat,
        "franceEvidence": france_evidence,
        "polandEvidence": poland_evidence,
        "netherlandsEvidence": netherlands_evidence,
        "swedenEvidence": sweden_evidence,
        "denmarkEvidence": denmark_evidence,
        "eurostatRoutes": eurostat_routes,
        "eurostatOrigins": eurostat_origins,
        "usCustoms": {
            "totals": us_totals,
            "origins": us_origins,
            "audit": us_manifest["audit"],
            "baskets": us_manifest["baskets"],
            "method": us_manifest["method"],
            "boundary": us_manifest["boundary"],
            "archiveSha256": us_manifest["source_archive"]["sha256"],
        },
        "japanCustoms": {
            "version": japan_manifest["version"],
            "totals": japan_totals,
            "origins": japan_origins,
            "audit": japan_manifest["audit"],
            "baskets": japan_manifest["baskets"],
            "method": japan_manifest["method"],
            "limit": japan_manifest["interpretation_limit"],
        },
        "koreaCustoms": {
            "version": korea_manifest["version"],
            "totals": korea_totals,
            "origins": korea_origins,
            "hsk10": korea_hsk10,
            "audit": korea_manifest["audit"],
            "baskets": korea_manifest["baskets"],
            "method": korea_manifest["method"],
            "hsk10ValueStatus": korea_manifest["hsk10_trade_value_status"],
            "limit": korea_manifest["interpretation_limit"],
        },
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
                "note": "Laskenta: virallinen vuoden 2024 arvo × hinnan muutos × volyymin muutos. Dokumentoitu 10 tuotteen julkinen hintaotos tarkistaa vain hintojen suuruusluokan, ei skenaarion todennäköisyyttä.",
            },
            {
                "market": "Saksa",
                "basis": "2025 virallinen verotettu määrä 1,5 milj. litraa",
                "scenarios": [
                    {
                        "name": row["label"],
                        "price": f"{row['retailPriceEur']:.2f} €/10 ml".replace(".", ","),
                        "volume": "1,5 milj. l",
                        "value": f"{row['mechanicalValueEur'] / 1e9:.4f} mrd €".rstrip("0").rstrip(",").replace(".", ","),
                    }
                    for row in germany_retail["stress"]
                ],
                "note": "Hinnat ovat kymmenen varastossa olleen 10 ml tuotteen yhden myyjän päivätty alin/mediaani/ylin. Vuoden 2025 pyöristetyn virallisen volyymin ja vuoden 2026 hintaotoksen kertolasku on plausibiliteettialue, ei markkina-arvo tai ennuste.",
            },
            {
                "market": "Ruotsi",
                "basis": "2024 virallinen verotettu e-nestemäärä 26 000 litraa",
                "scenarios": [
                    {
                        "name": row["label"],
                        "price": f"{row['priceSekPer10Ml']:.2f} SEK/10 ml".replace(".", ","),
                        "volume": "2,6 milj. × 10 ml",
                        "value": f"{row['mechanicalValueSek'] / 1e6:.2f} milj. SEK".replace(".", ","),
                    }
                    for row in sweden_evidence["stress"]
                ],
                "note": "WHO:n 69 SEK/10 ml halvinta tuotemerkkiä käytetään ±20 % hintastressissä. Tulokset eivät ole virallinen markkina-arvo tai myyntipainotettu hintaindeksi.",
            },
            {
                "market": "Alankomaat",
                "basis": "VWS:n tilaama 281,548 milj. EUR:n kulutusmenomalli",
                "scenarios": [
                    {
                        "name": {"lower_price_20pct": "−20 % hintastressi", "reported_reference": "Raportoitu", "upper_price_20pct": "+20 % hintastressi"}[row["scenario"]],
                        "price": f"{row['multiplier']:.2f}×".replace(".", ","),
                        "volume": "Kulutusrakenne vakio",
                        "value": f"{row['totalSpendEur'] / 1e6:.3f} milj. €".replace(".", ","),
                    }
                    for row in netherlands_evidence["stress"]
                ],
                "note": "Mekaaninen ±20 % hinta-/menostressi pitää 91,233 %:n johdetun laittoman meno-osuuden vakiona. Se ei ole luottamusväli tai empiirinen ala-/yläraja.",
            },
        ],
        "evidence": [
            {"grade": "A", "title": "Health Canada · Vaping sales", "coverage": "Kanada 2023–2024: arvo, yksiköt, litrat ja tuoteryhmät", "use": "Nykyinen virallinen markkina-ankkuri", "url": "https://health-infobase.canada.ca/substance-use/vaping/sales/"},
            {"grade": "B", "title": "Statistics Canada · CIMT 2025", "coverage": "Kanadan HS10-tuonti alkuperämaittain sekä HS8-kokonais-, kotimainen ja johdettu jälleenvienti", "use": "Kansallinen laite- ja inhalointituotteiden reittiankkuri; HS10 täsmää HS6:een nollaerolla", "url": "https://www150.statcan.gc.ca/n1/en/catalogue/71-607-X2021004"},
            {"grade": "A", "title": "Destatis · tabakverotilasto", "coverage": "Saksa 2025: verotettu tupakan korvike-/e-nestemäärä", "use": "Nykyinen virallinen volyymiankkuri", "url": "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_026_73.html"},
            {"grade": "A", "title": "Verohallinto · valmisteverotilasto", "coverage": "Suomi 2023–2026: e-nesteiden kuukausittainen nettovolyymi ja nettovero", "use": "Nykyinen virallinen vero- ja volyymiankkuri", "url": "https://vero2.stat.fi/PXWeb/pxweb/en/Vero/Vero__Valmistevero/vvt_010.px/"},
            {"grade": "A", "title": "Saksan tupakkaverolaki §2", "coverage": "Verokanta 0,26 €/ml vuonna 2025 ja 0,32 €/ml vuodesta 2026", "use": "Veropohjan auditointilaskelma", "url": "https://www.gesetze-im-internet.de/tabstg_2009/__2.html"},
            {"grade": "A", "title": "EU Tobacco Products Directive 20(7)", "coverage": "Vuosittaiset myyntimäärät tuotemerkki- ja tyyppitasolla kansallisille viranomaisille", "use": "Oikeusperusta aggregoitujen tietopyyntöjen kohdentamiseen", "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0040"},
            {"grade": "B", "title": "UN Comtrade", "coverage": "USA, Kanada ja Japani 2025: HS 854340, 240412 ja 240419", "use": "Rajakaupan suuruusluokka ja ristiintarkastus", "url": "https://comtradeplus.un.org/"},
            {"grade": "B", "title": "U.S. Census · Merchandise Trade Imports 2025", "coverage": "Yhdysvaltain HTS10 general imports, imports for consumption, CIF, määrä, laskettu tulli ja 42 nimike–alkuperämaariviä", "use": "Kansallinen laite- ja nestetuonnin reittiankkuri; detaljisummat täsmäävät kansallisiin lukuihin", "url": "https://www.census.gov/foreign-trade/data/IMDB.html"},
            {"grade": "B", "title": "Eurostat Comext DS-045409", "coverage": "EU:n extra- ja intra-EU CN8-kauppa alkuperä- ja lähetysmaittain", "use": "EU:n reitti- ja hubikorjaus", "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"},
            {"grade": "B", "title": "Japan Customs / MOF · 2025 revised", "coverage": "Japanin 9-numeroinen tuonti 854340000, 240412000, 240419100 ja 240419200 alkuperämaittain", "use": "Kansallinen laite- ja inhalointituotteiden tullisarja; 28 alkuperäriviä ja kuukausitäsmäytys", "url": "https://www.e-stat.go.jp/en/stat-search/files?bunya_l=16&cycle=1&layout=dataset&page=1&second=1&tclass1=000001013180&tclass2=000001013182&tclass3val=0&toukei=00350300&tstat=000001013141"},
            {"grade": "B", "title": "Korea Customs Service · 2025 HS6 / HSK10", "coverage": "Etelä-Korean HS6 vuosi- ja kuukausisarja, 53 alkuperämaariviä sekä virallinen seitsemän HSK10-rivin luokitus", "use": "Laitetuonnin kansallinen arvo-/painoankkuri ja tarkkojen nestekoodien luokitusperusta; 24 täsmäytystä hyväksytty pyöristysrajassa", "url": "https://tradedata.go.kr/cts/index_eng.do"},
            {"grade": "A", "title": "FTC E-Cigarette Report 2021", "coverage": "Yhdeksän valmistajan cartridge/disposable-myynti 2,763 mrd USD", "use": "Historiallinen USA-vertailu, ei nykyinen kokonaismarkkina", "url": "https://www.ftc.gov/reports/e-cigarette-report-2021"},
            {"grade": "B", "title": "Japan Customs methodology", "coverage": "Tulliselvitykset, JPY 1 000, CIF-tuonti, alkuperämaa ja 9-numeroinen kansallinen nimike", "use": "Japanin sarjan arvostus- ja luokitteluperusta", "url": "https://www.customs.go.jp/toukei/sankou/howto/gaiyou_e.htm"},
            {"grade": "B", "title": "China Customs · virallinen tilastopalvelu", "coverage": "Maksuton kansallinen hakemusreitti, 2025 HS8 -nimikkeet ja enintään viiden ryhmittelyn taulukkorakenne", "use": "Kiinan alkuperä-/kohdemaan, lähetys-/saapumismaan, tullimenettelyn ja kotimaisen reitin hankintaperusta; ei vielä markkina-arvoluku", "url": "https://online.customs.gov.cn/static/pages/guides/002029004002/002029004002.html"},
            {"grade": "A", "title": "Italia ADM · PLI-PAT ja kuukausiraportin mallipohja", "coverage": "Puolikuukausi- ja kuukausiraportointi: tuotekoodi, pakkauskoko, nikotiinipitoisuus, pakkausmäärä ja kokonaismäärä kolmessa toimitusvirrassa", "use": "Todistaa viranomaisen keräämän datan rakenteen ja täsmällisen aggregaattipyynnön toteutettavuuden; ei vielä kansallinen myyntisumma", "url": "https://www.adm.gov.it/portale/-/portale-prodotti-liquidi-da-inalazione-pli-e-prodotti-accessori-dei-tabacchi-pat-1"},
            {"grade": "A", "title": "Italia ADM · vuoden 2025 PLI-verokannat", "coverage": "Nikotiinillinen 0,143849 EUR/ml tammikuussa ja 0,146966 EUR/ml helmikuusta; nikotiiniton/aromit 0,098896 ja 0,101039 EUR/ml", "use": "Lakisääteinen verokanta kuukausikohtaiseen toteumalaskentaan, kun toteutuneet kategoriavolyymit saadaan", "url": "https://www.adm.gov.it/portale/documents/20182/208222724/DET+PRE+PUBB+71960.27-01-2025-U.pdf/f08b0d67-49a2-c5ca-074b-2111240054ad?t=1738229866530"},
            {"grade": "B", "title": "Italian parlamentti · budjettiselvityksen taulukko 17", "coverage": "Vuoden 2026 virallinen tekninen ennuste 1 107 249 007 ml ja 167 733 820 EUR verotuottoa", "use": "Viranomaisennuste markkinan suuruusluokan vertailuun; pidetään erillään toteutuneesta myynnistä ja verokertymästä", "url": "https://documenti.camera.it/leg19/dossier/pdf/VQ2750_1.pdf"},
            {"grade": "A", "title": "Espanja AEAT · vuoden 2025 toteutunut verokertymä", "coverage": "Huhti-joulukuun tarkka nettokassasarja 29 568 000 EUR; kuukausisumma täsmää joulukuun kumulatiiviseen taulukkoon", "use": "Toteutunut kansallinen verotuottoankkuri yhdistetylle L1-L4-verolle; ei nimetä e-nesteiden myynniksi", "url": "https://sede.agenciatributaria.gob.es/static_files/AEAT/Estudios/Estadisticas/Informes_Estadisticos/Informes_mensuales_recaudacion_tributaria/2025/IMR_25_12_es_es.pdf"},
            {"grade": "A", "title": "Espanja BOE · Modelo 573", "coverage": "Kuukausittaiset L1/L2-millilitrat sekä L3/L4-grammat, verokanta, bruttovelka, vähennykset ja nettovelka", "use": "Todistaa täsmällisen nestemäärän keruun ja rajaa PX-ES-001-aggregointipyynnön", "url": "https://www.boe.es/eli/es/o/2025/01/13/hac86"},
            {"grade": "A", "title": "Ranska Douane · National 2025 import/export", "coverage": "Neljä CN8-nimikettä, 48 kuukausiriviä, 363,940 milj. EUR tuontia ja 127,863 milj. EUR vientiä", "use": "Kansallinen rajakaupan ankkuri; Douane ja Eurostat täsmäävät alle 0,5 %:n erolla", "url": "https://www.douane.gouv.fr/la-douane/opendata?f%5B0%5D=categorie_opendata_facet%3A458&title="},
            {"grade": "A", "title": "ANSES · vaping-ilmoitusrekisteri", "coverage": "1.7.2026: 203 181 ilmoitusriviä ja 111 556 yksilöllistä tuotenumeroa; julkisessa aineistossa ei vuosimyyntikenttää", "use": "Tuoterakenteen näyttö, ei myynnin, aktiivisten SKU-tuotteiden tai yritysmäärän näyttö", "url": "https://www.data.gouv.fr/en/datasets/produits-du-tabac-et-produits-connexes-declares-sur-le-marche-francais/"},
            {"grade": "A", "title": "ANSES · myyntiraportoinnin kattavuusauditointi", "coverage": "2016-2017: 23 036 myyntitietoa / 65 799 odotettua esitystä, hit rate 35,010 %", "use": "Viranomaisen oma kattavuusmittaus; ANSES katsoi volyymit puutteiden vuoksi käyttökelvottomiksi", "url": "https://www.anses.fr/fr/system/files/CONSO2018SA0189Ra-2.pdf"},
            {"grade": "A", "title": "Puolan MF · ZEFIR2/AIS-valmisteverovirta", "coverage": "2020-2023 e-nesteen kotimaan myynti + EU-hankinta + tuonti; 2023 myöhempi julkaisu 805 441 litraa", "use": "Kansallinen ilmoitetun laillisen e-nestevirran volyymiankkuri; 2023 määrä täsmää verotuottoon 0,137 %:n sisällä", "url": "https://api.sejm.gov.pl/sejm/term10/interpellations/attachment/ATTDDEJZ5/i07255-o1.pdf"},
            {"grade": "A", "title": "Puolan MF · vuoden 2025 valmisteverototeuma", "coverage": "E-neste 993,1 milj. PLN, höyrystinlaitteet 175,3 milj. PLN ja osasarjat 2,5 milj. PLN", "use": "Toteutuneet tuoteryhmäkohtaiset valmisteverotulot; ei retail-myyntiarvo tai suora yksikkömäärä", "url": "https://api.sejm.gov.pl/sejm/term10/interpellations/attachment/ATTDVKHSJ/i17526-o1.pdf"},
            {"grade": "A", "title": "Puolan KAS · kohdennettu valvonta 2025", "coverage": "1 172 tarkastusta, 422 valmisteverorikkomusta, 3,2 milj. ml nestettä ja 49 000 kertakäyttölaitetta", "use": "Valvontamenetelmän ja rajat ylittävien riskireittien näyttö; 36,007 % on kohdennettu hit rate, ei laiton markkinaosuus", "url": "https://www.gov.pl/web/kas/kas-zwalcza-oszustwa-zwiazane-z-rynkiem-e-papierosow"},
            {"grade": "A", "title": "Ruotsin Finansdepartement · Beräkningskonventioner 2026", "coverage": "Vuosi 2024: 26 000 litraa rekisteröityä nikotiinia sisältävää e-nestettä ja 80 milj. SEK näytettyä verotuottoa", "use": "Kansallinen verollisen e-nestevirran määrä- ja veroankkuri; pyöristysvälit ja tarkat verokannat auditoitu", "url": "https://www.regeringen.se/rapporter/2025/09/berakningskonventioner-2026/"},
            {"grade": "A", "title": "Ruotsin Skatteverket · Nikotinskatt", "coverage": "Vuosien 2023–2026 e-nesteverokannat: vuoden 2026 muut nesteet 2,087 SEK/ml ja 15–20 mg/ml 4,174 SEK/ml", "use": "Lakisääteinen kanta ja vuoden 2024 määrä × kanta -täsmäytys", "url": "https://www.skatteverket.se/foretagochorganisationer/skatter/punktskatter/nikotinskatt.4.41f1c61d16193087d7fc7fe.html"},
            {"grade": "A", "title": "Ruotsin FHM · vuotuinen EU-CEG-myyntiraportointi", "coverage": "Valmistajien ja maahantuojien velvollisuus toimittaa vuosittainen Ruotsin myyntivolyymi tuotemerkin ja tuotetyypin mukaan", "use": "Todistaa keräysvelvollisuuden ja kohdentaa PX-SE-001:n kansalliseen myyntiaggregaattiin; julkista kokonaislukua ei vielä saatu", "url": "https://www.folkhalsomyndigheten.se/anmal-och-rapportera/anmala-ansoka-rapportera-och-registrera-tobaks-och-nikotinprodukter/anmala-ingredienser-i-e-cigaretter-och-pafyllningsbehallare/"},
            {"grade": "B", "title": "Eurostat Comext · Ruotsi 2025", "coverage": "Kapea CN8-kori: 50,028 milj. EUR tuontia, 1,417 milj. EUR vientiä ja 48,611 milj. EUR rajavirran netto", "use": "WORLD-, intra-EU- ja extra-EU-reittitäsmäytys sekä alkuperä-/lähetysmaakorjaus; ei kuluttajamyynti", "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"},
            {"grade": "A", "title": "Tanskan Skatteministeriet · Indtægtsliste 2025", "coverage": "2024-2025 kuukausittainen ja vuosittainen kirjattu yhdistelmäkertymä: 548,496 ja 789,133 milj. DKK", "use": "Virallinen nikotiinituotteiden/-pussien ja nikotiininesteiden yhdistetty toteuma; e-nesteosuus ei julkisesti erotu", "url": "https://skm.dk/tal-og-metode/statistik/indtaegtslister/indtaegtsliste-for-2025"},
            {"grade": "A", "title": "Tanskan EU-CEG-vuosiraportointi ja tuoterekisteri", "coverage": "Vuosittainen Tanskan myyntivolyymi tuotemerkin ja tuotetyypin mukaan; 17.7.2026 rekisterissä 1 198 riviä ja 545 ID:tä", "use": "Todistaa tietojen keräysvelvollisuuden ja tuoteuniversumin; rekisteri ei ole myynti tai kattavuusprosentti", "url": "https://www.sik.dk/en/node/355"},
            {"grade": "A", "title": "Tanskan Skattestyrelsen · riskiperusteiset valvonnat", "coverage": "2020-2024 yhteensä 3 326 valvontaa ja 70 % keskimääräinen hit rate; 2025 yksittäinen puff bar -tapaus", "use": "Valvontamenetelmän näyttö; 70 % ei ole laittoman markkinan tai väestön osuus", "url": "https://www.ft.dk/samling/20241/almdel/SAU/bilag/220/3018939.pdf"},
            {"grade": "B", "title": "Eurostat Comext · Tanska 2025", "coverage": "Kapea CN8-kori: 14,386 milj. EUR tuontia, 0,905 milj. EUR vientiä ja 13,481 milj. EUR rajavirran netto", "use": "WORLD-, intra-EU- ja extra-EU-reittitäsmäytys; Kiina alkuperänä ja EU-maat lähetysmaina; ei kuluttajamyynti", "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"},
            {"grade": "B", "title": "VWS / Bureau Beke · Donkere wolken", "coverage": "Alankomaiden vuotuinen mallinnettu vape-kulutusmeno 281,548 milj. EUR ja laiton meno 256,865 milj. EUR", "use": "Valtion tilaama markkinatutkimusarvio; ei virallinen myynti-, vero- tai kassarekisterisarja", "url": "https://www.tweedekamer.nl/downloads/document?id=2026D17119"},
            {"grade": "A", "title": "CBS StatLine · sähkösavukkeen käyttö 2024", "coverage": "3,5 % vähintään 12-vuotiaista; ikäryhmäkohtaiset piste-estimaatit ja 95 % välit toistettu virallisesta API:sta", "use": "Tutkimuksen prevalenssikorjauksen riippumaton virallinen lähde; käyttöä, ei myyntiä", "url": "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/85457NED/table"},
            {"grade": "A", "title": "Trimbos ScholierenMonitor · 12-16-vuotiaat", "coverage": "Joskus vapettanut: piste-estimaatti 24,6 %, 95 % väli 22,8-26,4 %", "use": "Lähdeauditointi osoittaa, että tutkimuksen 22,8 % vastaa alempaa luottamusrajaa eikä piste-estimaattia", "url": "https://cijfers.trimbos.nl/scholierenmonitor/vape-snus-en-waterpijp/cijfers-2023-12-16-jaar-vape-snus-waterpijp/"},
            {"grade": "A", "title": "Eurostat Comext · Alankomaat 2025", "coverage": "Kapea kori: 204,763 milj. EUR WORLD-tuontia, 69,809 milj. EUR vientiä ja 85,972 % extra-EU-tuontiosuus", "use": "Rotterdam-hubin virallinen rajakaupan ja partnerireittien ankkuri; ei kotimainen kysyntä", "url": "https://ec.europa.eu/eurostat/web/international-trade-in-goods/database"},
            {"grade": "C", "title": "Kanadan dokumentoitu vähittäishintaotos", "coverage": "10 julkista havaintoa 17.7.2026: 8 nestettä sisältävää tuotetta ja 2 tyhjää laitetta/osaa", "use": "Health Canadan toimitushintojen suuruusluokan tarkistus; ei keskihinta-, kate- tai myyntiväite", "url": "data/canada/canada_retail_price_observations_2026-07-17.csv"},
            {"grade": "C", "title": "Saksan dokumentoitu 10 ml vähittäishintaotos", "coverage": "10 varastossa ollutta tuotetta yhdeltä myyjältä 17.7.2026; hinta sisältää ALV:n ja toimitus on lisäkulu", "use": "Destatisin pyöristetyn volyymin plausibiliteettialue; ei tilastollinen keskihinta, myynti tai markkina-arvo", "url": "data/germany/germany_retail_price_observations_2026-07-17.csv"},
        ],
        "contacts": contacts,
        "tasks": [
            {"priority": "high", "title": "EU-27 CN8-reittimatriisi", "detail": "Valmis 2025: EU-ulkoraja 2,240 mrd EUR ja 12 jäsenmaan WORLD/intra/extra-jako, CN8 85434000 + 24041200. Kaikki ryhmärivit täsmäytyivät 0 EUR erolla.", "status": "done"},
            {"priority": "high", "title": "EU-CEG aggregoidut myyntipyynnöt", "detail": "Lähetä Article 20(7) -pyynnöt kansallisille toimivaltaisille viranomaisille, ilman yritystason luottamuksellisia tietoja.", "status": "queued"},
            {"priority": "high", "title": "USA HTS10 kulutukseen luovutettu tuonti", "detail": "Valmis 2025: kahdeksan HTS10-riviä, general imports ja imports for consumption, 127,747 milj. laitetta, 23,279 milj. kg täsmällisiä nesteseoksia, CIF ja 143,132 milj. USD laskettua tullia. 236 detaljiriviä täsmäytyivät ilman eroa.", "status": "done"},
            {"priority": "high", "title": "Kanadan 2025 reittitäsmäytys", "detail": "Valmis: CIMT HS10-tuonti alkuperämaittain sekä HS8 total/domestic/re-export, 608 lähderiviä ja 564 HS6-tarkastusavainta nollaerolla. Avoinna vain alkuperämaa × suora lähetysmaa -ristiintaulukko ja 2025 Health Canada -myynti.", "status": "done"},
            {"priority": "medium", "title": "Japani 9-numeroinen tuonti", "detail": "Valmis: vuoden 2025 tarkistettu sarja, neljä kansallista nimikettä, 28 alkuperämaariviä ja 12 kuukauden täsmäytys ilman eroa. Seuraava kiinteä 2025-versio marraskuussa 2026.", "status": "done"},
            {"priority": "high", "title": "Etelä-Korea HSK10-nestearvot", "detail": "HS6-vaihe valmis: 2025 laitteet 148,534 milj. USD ja laajat 2404-proxyt 123,731 milj. USD; 36 kuukausiriviä, 53 alkuperämaariviä ja 2025 HSK10-luokitus auditoitu. Jonossa virallinen Itemtrade API-/tulliote, joka erottaa 2404121000 ja 2404199010 nestearvot ilman oletusjakoa.", "status": "active"},
            {"priority": "medium", "title": "Kanadan vähittäishintaotos", "detail": "Valmis: 10 hash-lukittua julkista havaintoa, pakkauskoot, hinnat, nestemäärät ja CRA:n veroporrastuksen laskentatarkistus. Otos on C-tason järkevyystarkistus, ei markkinakeskihinta.", "status": "done"},
            {"priority": "high", "title": "Kiina GACC tullimenettelyineen", "detail": "Virallinen maksuton reitti, kansallinen vastaanottaja ja 2025 HS8 85434000/24041200/24041910/24041990 on varmistettu. Kiinankielinen hakemus pyytää neljä taulukkoa: kohde vs. läpikulkumaa + tullimenettely, tullipaikka + kotimainen alue, rekisteröintialue + omistus sekä kuljetustapa. PRH:n 17.7.2026 yritystodiste on tarkastettu ja yksityinen lähetyspaketti odottaa lähetysvahvistusta.", "status": "active"},
            {"priority": "medium", "title": "Saksan vähittäishintaotos", "detail": "Valmis: 10 varastossa ollutta 10 ml tuotetta, yhden myyjän 17.7.2026 hinnat 7,12/9,49/11,95 €, ALV mukana ja toimitus erikseen. Mekaaninen 1,068/1,4235/1,7925 mrd € vaihteluväli on merkitty plausibiliteettitestiksi, ei markkina-arvoksi.", "status": "done"},
            {"priority": "high", "title": "Italian ADM:n toteutuneet PLI-aggregaatit", "detail": "Raportointirakenne, 21 kenttää, vuoden 2025 lakisääteiset verokannat ja parlamentin 2026-2028 budjettiennuste on auditoitu. PX-IT-001 pyytää toteutuneet 2023-2025 kuukausi- ja vuosisummat kategorioittain sekä veron maksettuna; varastosiirrot poistetaan kulutussummasta. Viesti odottaa nimenomaista lähetysvahvistusta.", "status": "active"},
            {"priority": "high", "title": "Espanjan AEAT L1/L2-veropohjat", "detail": "Tarkka 2025 nettokassasarja 29,568 milj. EUR, neljä verokantaa ja Modelo 573:n kentät on auditoitu. PX-ES-001 pyytää L1/L2-millilitrat, L3/L4-grammat, vähennykset, palautukset ja huhtikuun alkuvarastot; virallinen portaali vaatii hyväksytyn sähköisen tunnistautumisen.", "status": "active"},
            {"priority": "high", "title": "Ranskan ANSES 2018-2025 myyntiaggregaatit", "detail": "Douanen vuoden 2025 neljä CN8-koodia ja Eurostat-reittitäsmäytys ovat valmiit. ANSES-rekisterin 203 181 riviä on auditoitu, ja 2016-2017 raportoinnin hit rate oli 35,010 %. PX-FR-001 pyytää uudemmat kattavuusluvut, yksiköt, millilitrat ja arvon; viesti odottaa nimenomaista lähetysvahvistusta.", "status": "active"},
            {"priority": "high", "title": "Puolan 2024-2025 veroaggregaatit ja revisioseloste", "detail": "MF:n 2020-2023 volyymi, 2021-2023/2025 verotulot, KAS-hit rate ja Eurostat-reitti on auditoitu. PX-PL-001 pyytää vuoden 2024 tuoton, 2024-2025 kuukausittaiset millilitrat, viralliset laite-/osasarjakappaleet ja 2023 revisiosyyn; viesti odottaa nimenomaista lähetysvahvistusta. Interpellaatio 18182 on seurannassa.", "status": "active"},
            {"priority": "high", "title": "Alankomaiden mallisolut ja EU-CEG-sell-out", "detail": "VWS:n tilaama 281,548 milj. EUR:n arvio, 5 529 vastaajan menetelmä, Trimbos/CBS-prevalenssit, kuluttajahinnat ja vuoden 2025 Eurostat-reitti on auditoitu. PX-NL-001 pyytää ikäsolut, SPSS-syntaksin, vastausdisposition, 22,8 % -selityksen sekä Article 20(7) -yksiköt/ml/arvon; viesti odottaa nimenomaista lähetysvahvistusta.", "status": "active"},
            {"priority": "high", "title": "Ruotsin FHM-myyntiaggregaatti", "detail": "Vuoden 2024 virallinen 26 000 litran verovolyymi, 80 milj. SEK:n verotulo, pyöristysauditointi, WHO-hintastressi ja vuoden 2025 Eurostat-reitti ovat valmiit. PX-SE-001 pyytää vuosien 2021-2025 laite-/esitysyksiköt, täyttöpullojen, podien ja kertakäyttötuotteiden millilitrat, arvon sekä raportointikattavuuden; viesti odottaa nimenomaista lähetysvahvistusta.", "status": "active"},
            {"priority": "high", "title": "Ruotsin pyöristämättömät verosolut", "detail": "PX-SE-002 pyytää Finansdepartementilta taulukko 7.5:n pyöristämättömät litrat/millilitrat, verot, palautukset ja oikaisut sekä actual/forecast-luokituksen ja laskentatiedoston. Nykyinen -1,0 %:n piste-ero on yhteensopiva julkaisun näyttötarkkuuden kanssa; viestiä ei ole lähetetty.", "status": "active"},
            {"priority": "high", "title": "Tanskan EU-CEG-myynti ja kattavuus", "detail": "Virallinen vuosiraportointivelvollisuus ja 1 198 rekisteririvin tuoteuniversumi on auditoitu. PX-DK-001 pyytää vuosien 2021-2025 laiteyksiköt, refill-/pod-/kertakäyttömillilitrat, arvon jos kerätty sekä odotetut, saadut, puuttuvat ja korjatut ilmoitukset. Viesti odottaa nimenomaista lähetysvahvistusta.", "status": "active"},
            {"priority": "high", "title": "Tanskan e-nesteen erillinen verototeuma", "detail": "Vuoden 2025 yhdistetty nikotiinituotetili 789,133 milj. DKK, 90 milj. DKK:n e-neste-ennuste, WHO-hintastressi ja 13,481 milj. EUR:n tullireitti on auditoitu. PX-DK-002 pyytää verolliset millilitrat vahvuusryhmittäin sekä brutto-, palautus- ja nettoluvut. Viesti odottaa nimenomaista lähetysvahvistusta.", "status": "active"},
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


def publish_us_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "us_census"
    public_data = DASHBOARD_DIR / "data" / "usa"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "us_census"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "us_census_vape_totals_2025.csv",
        "us_census_vape_origins_2025.csv",
        "us_census_vape_concordance_2025.csv",
        "us_census_vape_manifest_2025.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "CONCORD_2025_vape_selected_fixed_width.txt",
        "IMP_COMM_2025_vape_selected_fixed_width.txt",
        "IMP_DETL_2025_vape_selected_fixed_width.txt",
    ):
        shutil.copy2(raw / name, public_raw / name)


def publish_canada_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "canada_cimt"
    retail_raw = PROJECT_DIR / "data" / "raw" / "canada_retail"
    public_data = DASHBOARD_DIR / "data" / "canada"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "canada_cimt"
    public_retail_raw = DASHBOARD_DIR / "data" / "raw" / "canada_retail"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    public_retail_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "canada_cimt_vape_import_totals_2025.csv",
        "canada_cimt_vape_import_origins_2025.csv",
        "canada_cimt_vape_import_provinces_2025.csv",
        "canada_cimt_vape_import_monthly_2025.csv",
        "canada_cimt_vape_exports_reexports_2025.csv",
        "canada_cimt_vape_manifest_2025.json",
        "canada_retail_price_observations_2026-07-17.csv",
        "canada_retail_price_summary_2026-07-17.csv",
        "canada_retail_health_comparison_2026-07-17.csv",
        "canada_retail_stress_test_2026-07-17.csv",
        "canada_retail_price_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "CIMT_import_HS10_vape_selected_2025.csv",
        "CIMT_import_HS6_vape_selected_2025.csv",
        "CIMT_total_exports_HS8_vape_selected_2025.csv",
        "CIMT_domestic_exports_HS8_vape_selected_2025.csv",
    ):
        shutil.copy2(raw / name, public_raw / name)
    shutil.copy2(
        retail_raw / "canada_retail_capture_manifest_2026-07-17.json",
        public_retail_raw / "canada_retail_capture_manifest_2026-07-17.json",
    )


def publish_china_access_evidence() -> None:
    public_data = DASHBOARD_DIR / "data" / "china"
    public_data.mkdir(parents=True, exist_ok=True)
    shutil.copy2(
        PROJECT_DIR / "data" / "derived" / "china_gacc_access_manifest_2026-07-17.json",
        public_data / "china_gacc_access_manifest_2026-07-17.json",
    )


def publish_korea_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "korea_customs"
    public_data = DASHBOARD_DIR / "data" / "korea"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "korea_customs"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "korea_customs_hs6_totals_2025.csv",
        "korea_customs_hs6_monthly_2025.csv",
        "korea_customs_hs6_import_origins_2025.csv",
        "korea_customs_hsk10_classification_2025.csv",
        "korea_customs_hs6_manifest_2025.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "kcs_hs6_annual_2025.json",
        "kcs_hs6_monthly_2025.json",
        "kcs_hs6_country_2025_page1.json",
        "korea_hsk_tariff_2025.html.gz",
    ):
        shutil.copy2(raw / name, public_raw / name)


def publish_germany_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "germany_official"
    public_data = DASHBOARD_DIR / "data" / "germany"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "germany_official"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "germany_retail_price_observations_2026-07-17.csv",
        "germany_retail_price_summary_2026-07-17.csv",
        "germany_retail_stress_test_2026-07-17.csv",
        "germany_retail_source_excerpts_2026-07-17.json",
        "germany_retail_price_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "destatis_2025_taxed_substitutes.html",
        "tobacco_tax_act_section_2.html",
    ):
        shutil.copy2(raw / name, public_raw / name)


def publish_italy_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "italy_adm"
    public_data = DASHBOARD_DIR / "data" / "italy"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "italy_adm"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "italy_adm_rate_schedule_2025.csv",
        "italy_adm_reporting_fields_2026-07-17.csv",
        "italy_fiscal_forecast_2026_2028.csv",
        "italy_adm_request_scope_2026-07-17.csv",
        "italy_adm_access_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "adm_pli_reporting_service_2026-07-17.html",
        "adm_pli_monthly_reporting_template.xlsx",
        "adm_pli_rate_2025-01.pdf",
        "adm_pli_rate_2025-02.pdf",
        "italy_budget_2026_table17_page.pdf",
    ):
        shutil.copy2(raw / name, public_raw / name)


def publish_spain_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "spain_aeat"
    public_data = DASHBOARD_DIR / "data" / "spain"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "spain_aeat"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "spain_aeat_net_revenue_monthly_2025.csv",
        "spain_aeat_573_rates_2025.csv",
        "spain_aeat_liquid_sensitivity_2025.csv",
        "spain_aeat_request_scope_2026-07-17.csv",
        "spain_aeat_access_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "aeat_special_excise_report_2025.pdf",
        "aeat_monthly_revenue_2025-12.pdf",
        "boe_order_hac_86_2025_model_573.pdf",
    ):
        shutil.copy2(raw / name, public_raw / name)


def publish_france_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    douane_raw = PROJECT_DIR / "data" / "raw" / "france_douane"
    anses_raw = PROJECT_DIR / "data" / "raw" / "france_anses"
    public_data = DASHBOARD_DIR / "data" / "france"
    public_douane_raw = DASHBOARD_DIR / "data" / "raw" / "france_douane"
    public_anses_raw = DASHBOARD_DIR / "data" / "raw" / "france_anses"
    public_data.mkdir(parents=True, exist_ok=True)
    public_douane_raw.mkdir(parents=True, exist_ok=True)
    public_anses_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "france_douane_cn8_2025.csv",
        "france_douane_monthly_2025.csv",
        "france_douane_top_origins_2025.csv",
        "france_route_bridge_2025.csv",
        "france_anses_registry_audit_2026-07-01.csv",
        "france_anses_product_types_2026-07-01.csv",
        "france_anses_sales_coverage_2016_2017.csv",
        "france_evidence_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "Description-des-jeux-de-donnees-derniere-publication_EMEBI.pdf",
        "eurostat_france_cn8_2025.json",
    ):
        shutil.copy2(douane_raw / name, public_douane_raw / name)
    for name in (
        "anses_vaping_declarations_report_2016_2020.pdf",
        "data_gouv_dataset_metadata_2026-07-17.json",
        "notice-utilisateurs-donnees-anses-tabac.pdf",
    ):
        shutil.copy2(anses_raw / name, public_anses_raw / name)
    workbook = (
        DASHBOARD_DIR.parent
        / "outputs"
        / "019f6bea-c7f5-74c0-9534-66324a4b97ae"
        / "pixan_france_official_evidence_2025.xlsx"
    )
    (DASHBOARD_DIR / "assets").mkdir(exist_ok=True)
    shutil.copy2(workbook, DASHBOARD_DIR / "assets" / workbook.name)


def publish_poland_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "poland_mf"
    public_data = DASHBOARD_DIR / "data" / "poland"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "poland_mf"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "poland_mf_e_liquid_volume_2020_2023.csv",
        "poland_mf_excise_revenue_2021_2025.csv",
        "poland_mf_excise_categories_2025.csv",
        "poland_kas_controls_2021_2026.csv",
        "poland_2023_revision_bridge.csv",
        "poland_excise_volume_reconciliation_2021_2023.csv",
        "poland_eurostat_route_2025.csv",
        "poland_evidence_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "mf_interpellation_7255_volume_2020_2023.pdf",
        "mf_interpellation_2408_revenue_controls_2021_2023.pdf",
        "mf_interpellation_17526_excise_execution_2025.pdf",
        "kas_e_cigarette_enforcement_2025.html",
        "e_liquid_rates_2025_2026_law.pdf",
        "excise_devices_2025_law.pdf",
        "akc_4_m_3_current.pdf",
        "akc_ua_2025_form_law.pdf",
        "eurostat_poland_cn8_2025.json",
        "sejm_interpellations_metadata_2026-07-17.json",
    ):
        shutil.copy2(raw / name, public_raw / name)
    workbook = (
        DASHBOARD_DIR.parent
        / "outputs"
        / "019f6bea-c7f5-74c0-9534-66324a4b97ae"
        / "pixan_poland_official_evidence_2020_2026.xlsx"
    )
    (DASHBOARD_DIR / "assets").mkdir(exist_ok=True)
    shutil.copy2(workbook, DASHBOARD_DIR / "assets" / workbook.name)


def publish_netherlands_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "netherlands_vws"
    public_data = DASHBOARD_DIR / "data" / "netherlands"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "netherlands_vws"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "netherlands_vws_market_estimate_2026.csv",
        "netherlands_vws_method_audit_2026.csv",
        "netherlands_vws_price_inputs_2026.csv",
        "netherlands_vws_price_stress_test_2026.csv",
        "netherlands_vws_youth_prevalence_check_2023.csv",
        "netherlands_cbs_esigarette_prevalence_2024.csv",
        "netherlands_eurostat_customs_bridge_2025.csv",
        "netherlands_eurostat_route_2025.csv",
        "netherlands_eurostat_top_partners_2025.csv",
        "netherlands_evidence_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "cbs_lifestyle_data_properties.json",
        "cbs_lifestyle_esigarette_2024.json",
        "cbs_lifestyle_margin_categories.json",
        "cbs_lifestyle_period_categories.json",
        "cbs_lifestyle_person_categories.json",
        "cbs_lifestyle_table_info.json",
        "donkere_wolken_full_2026.pdf",
        "donkere_wolken_summary_2026.pdf",
        "eurostat_netherlands_cn8_partners_2025.json",
        "eurostat_netherlands_cn8_route_2025.json",
        "trimbos_scholierenmonitor_2023.html",
        "trimbos_scholierenmonitor_ever_vaped_table_2023.js",
        "vws_minister_letter_2026.html",
    ):
        shutil.copy2(raw / name, public_raw / name)
    workbook = (
        DASHBOARD_DIR.parent
        / "outputs"
        / "019f6bea-c7f5-74c0-9534-66324a4b97ae"
        / "pixan_netherlands_market_evidence_2023_2026.xlsx"
    )
    (DASHBOARD_DIR / "assets").mkdir(exist_ok=True)
    shutil.copy2(workbook, DASHBOARD_DIR / "assets" / workbook.name)


def publish_sweden_evidence() -> None:
    derived = PROJECT_DIR / "data" / "derived"
    raw = PROJECT_DIR / "data" / "raw" / "sweden_finance"
    public_data = DASHBOARD_DIR / "data" / "sweden"
    public_raw = DASHBOARD_DIR / "data" / "raw" / "sweden_finance"
    public_data.mkdir(parents=True, exist_ok=True)
    public_raw.mkdir(parents=True, exist_ok=True)
    for name in (
        "sweden_e_liquid_tax_rates_2023_2026.csv",
        "sweden_e_liquid_volume_revenue_2024_2026.csv",
        "sweden_e_liquid_tax_reconciliation_2024.csv",
        "sweden_who_price_inputs_2025.csv",
        "sweden_e_liquid_price_stress_test_2024.csv",
        "sweden_eurostat_route_2025.csv",
        "sweden_eurostat_scope_partners_2025.csv",
        "sweden_evidence_method_audit_2026-07-17.csv",
        "sweden_evidence_manifest_2026-07-17.json",
    ):
        shutil.copy2(derived / name, public_data / name)
    for name in (
        "berakningskonventioner_2026.pdf",
        "skatteverket_nikotinskatt_2026.html",
        "fhm_eu_ceg_annual_sales_reporting_2025.html",
        "fhm_contacts_2026.html",
        "regeringskansliet_registrars_2026.html",
        "eurostat_sweden_cn8_route_2025.json",
        "eurostat_sweden_cn8_partners_2025.json",
    ):
        shutil.copy2(raw / name, public_raw / name)
    shutil.copy2(
        PROJECT_DIR / "data" / "raw" / "who_2025_tax_profiles" / "swe.pdf",
        public_raw / "who_sweden_2025.pdf",
    )
    workbook = (
        DASHBOARD_DIR.parent
        / "outputs"
        / "019f6bea-c7f5-74c0-9534-66324a4b97ae"
        / "pixan_sweden_official_evidence_2024_2026.xlsx"
    )
    assets = DASHBOARD_DIR / "assets"
    assets.mkdir(exist_ok=True)
    shutil.copy2(workbook, assets / workbook.name)
    shutil.copy2(
        PROJECT_DIR / "output" / "pdf" / "pixan_virallinen_markkinadata_pankkiliite_2026-07-17.pdf",
        assets / "pixan_pankkiliite.pdf",
    )


def main() -> None:
    data = build_payload()
    publish_us_evidence()
    publish_canada_evidence()
    publish_china_access_evidence()
    publish_korea_evidence()
    publish_germany_evidence()
    publish_italy_evidence()
    publish_spain_evidence()
    publish_france_evidence()
    publish_poland_evidence()
    publish_netherlands_evidence()
    publish_sweden_evidence()
    (DASHBOARD_DIR / "data").mkdir(exist_ok=True)
    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    (DASHBOARD_DIR / "data" / "dashboard.json").write_text(json_text + "\n", encoding="utf-8")
    (DASHBOARD_DIR / "data.generated.js").write_text("window.PIXAN_DATA = " + json_text + ";\n", encoding="utf-8")
    print(f"Dashboard data built: {len(data['countries'])} countries/regions, {len(data['customs'])} customs rows, {len(data['contacts'])} contacts")


if __name__ == "__main__":
    main()
