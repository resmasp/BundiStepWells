## Telangana groundwater wells — data dictionary

This repository standardizes diverse well inventories (departmental registers, monitoring networks, schemes) into one canonical table.

### Identity & provenance

- **`well_id`**: Canonical stable ID in this repo (string). If the source provides a stable ID, it is preserved in `source_record_id`.
- **`source_name`**: Source system name (e.g., `SGWD_Telangana`, `CGWB_NationalMonitoring`, `NRDWP_JJM`).
- **`source_record_id`**: Record identifier in the source system (string).
- **`source_url`**: URL or file reference that uniquely points to the record/source extract (string; can be blank if internal).
- **`license`**: Data license/terms for this record if known (string).

### Location

- **`state`**: Should be `Telangana`.
- **`district`**, **`mandal`**, **`village`**, **`habitation`**: Administrative fields as available.
- **`latitude`**, **`longitude`**: WGS84 decimal degrees.
- **`location_accuracy_m`**: Optional; approximate positional accuracy in meters.

### Well characteristics

- **`well_type`**: One of `borewell`, `dugwell`, `tubewell`, `piezometer`, `observation_well`, `other`.
- **`status`**: One of `active`, `inactive`, `abandoned`, `unknown`.
- **`owner_type`**: One of `public`, `private`, `community`, `unknown`.
- **`primary_use`**: One of `drinking`, `irrigation`, `industrial`, `monitoring`, `mixed`, `unknown`.
- **`install_year`**: Optional integer year.
- **`depth_m`**: Optional numeric; total depth (meters).
- **`diameter_mm`**: Optional numeric; casing/bore diameter.

### Hydro-observations (optional per well)

- **`last_observed_date`**: ISO date `YYYY-MM-DD` (string).
- **`water_level_m_bgl`**: Optional numeric; depth to water (meters below ground level).
- **`yield_lpm`**: Optional numeric; discharge (liters per minute).

### Water quality (optional per well)

- **`ec_uScm`**: Electrical conductivity (µS/cm).
- **`tds_mgL`**: Total dissolved solids (mg/L).
- **`fluoride_mgL`**, **`nitrate_mgL`**, **`arsenic_mgL`**, **`iron_mgL`**: Common parameters (mg/L).

### Metadata

- **`created_at`**, **`updated_at`**: ISO datetime strings; when this repo generated/updated the record.

### Minimal required fields

For publishable outputs, these must be present:

- `well_id`
- `state`
- `district` (or at least `mandal` + `village` if district unavailable)
- `latitude`
- `longitude`
- `source_name`
