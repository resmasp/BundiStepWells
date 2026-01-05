# Telangana Groundwater Wells — Data Repository

This repository is intended to be a **canonical, reproducible dataset of groundwater wells in Telangana** for analysis and decision support (Ministry/Department workflows, research, and public reporting).

> Note: the current root `index.html`, `css/`, `js/`, and `data/*.js` are **legacy artifacts** from an earlier Leaflet/QGIS export (Bundi stepwells). They are not used by the Telangana well dataset pipeline added in this repo.

## What this repo will contain

- **`data/raw/`**: unmodified source extracts (not committed; can be sensitive/large)
- **`data/processed/`**: publishable outputs built from sources (CSV + GeoJSON)
- **`schemas/`**: machine-readable schema for the canonical well table
- **`docs/`**: sources, licensing notes, and QA rules
- **`scripts/`**: reproducible build + validation tools

## Canonical dataset

- **Main table**: `data/processed/telangana_groundwater_wells.csv`
- **Map layer**: `data/processed/telangana_groundwater_wells.geojson`

Both share the same canonical fields described in `docs/data_dictionary.md` and enforced by `schemas/telangana_groundwater_wells.schema.json`.

## How to build (from raw sources)

1. Put your official/raw extracts under:
   - `data/raw/` (CSV/GeoJSON supported by default)
2. Run:

```bash
python3 scripts/build_dataset.py
```

This will:
- normalize inputs into the canonical schema
- run validation checks
- write outputs into `data/processed/`

## Data sourcing

See `docs/sources.md` for:
- the list of recommended official sources (state + national)
- how to record provenance (`source_name`, `source_record_id`, `source_url`, `license`)

## Licensing

- **Code**: GPL-3.0 (see `LICENSE`)
- **Data**: governed by the **original data provider(s)**. See `docs/data_licensing.md`.