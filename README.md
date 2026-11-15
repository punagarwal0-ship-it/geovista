# GEOVISTA Intelligence Platform
## Earth Observation, Biogeochemical Trends & Predictive Modeling

A web-based Earth-observation and predictive geospatial intelligence dashboard inspired by the discoverability and map workflow of **Bhoonidhi Browse & Order** and the visualization/animation concepts of **Bhoonidhi VISTA**. The platform goes beyond image browsing by presenting multi-temporal satellite observations, detected environmental changes, and model-generated forecasts with explicit uncertainty envelopes.

---

### Key Capabilities & Milestones Completed

- **Interactive Map Workspace (`MapCanvas.tsx`)**:
  - OpenLayers 10 mapping engine with Esri World Imagery (Satellite), CartoDB Dark Matter, and OpenStreetMap basemaps.
  - Vector layers for user AOIs, satellite scene footprints, and pseudo-color thematic overlays.
  - Interactive Before/After split-swipe comparison tool directly on the map.
  - HUD controls: extent reset, coordinate tracking (EPSG:4326), zoom buttons, and metric scale.

- **Area of Interest Tools (`AOITools.tsx`)**:
  - OpenStreetMap Nominatim geocoder and direct coordinate jump (e.g. `88.9, 21.8`).
  - Drawing interactions: Point + Buffer (customizable radius 2–50 km), Polygon, and Bounding Box.
  - GeoJSON file drag-and-drop with client-side EPSG:4326 and boundary validation.
  - 5 pre-configured reference test sites (Sundarbans Mangroves, Chilika Lake, Hyderabad Cyberabad, Kuttanad Floodplain, Gangotri Glacier).
  - Surface area calculations (km² and ha) using spherical excess on WGS84 ellipsoid.

- **Phenomenon & Dynamic Controls (`LayerPanel.tsx`)**:
  - 7 phenomena from the project brief:
    1. **Vegetation & Forest** (NDVI, EVI, Canopy Cover)
    2. **Water Bodies & Hydrology** (NDWI, MNDWI, Inundated Area)
    3. **Urbanisation & Built-up** (NDBI, Impervious Surface %)
    4. **Flooding & SAR** (VH Backscatter dB, Inundated Flood Extent)
    5. **Glacier & Cryosphere** (NDSI, Snow Area)
    6. **Coastal Change** (Shoreline dynamics)
    7. **Ground Deformation** (InSAR displacement)
  - Satellite constellations: Sentinel-2 MSI (10m), Landsat 9 OLI-2 (30m), Sentinel-1 C-SAR (10m), and ISRO Resourcesat-2A AWiFS.
  - Temporal aggregations: Daily, 5-Day, Monthly, Seasonal, Annual.
  - Cloud cover tolerance slider (0% to 100%).

- **Satellite Catalog Results (`SceneResults.tsx`)**:
  - Query STAC-compatible satellite granules.
  - Scene cards with cloud cover %, spatial resolution (GSD), sun elevation/azimuth angles, and product IDs.
  - Footprint selection and synchronization with map canvas.

- **Temporal Scrubber & Animation (`TimeSlider.tsx`)**:
  - Play, pause, step-forward, and step-backward animation across discrete satellite acquisitions.
  - Variable playback speed (0.5x, 1x, 2x, 4x).
  - Strict compliance with Brief Section 4.C: Discrete acquisition stamps with cloud quality flags; no misleading continuous interpolation.

- **Historical Time-Series Analytics (`TimeSeriesChart.tsx`)**:
  - Multi-temporal trend line with quality-flagged observations (Valid vs Cloud Masked).
  - Detected change disturbance events and dated anomaly markers.
  - Inspect underlying raw data points table (timestamp, raw value, unit, quality flag, granule ID).
  - One-click CSV export.

- **Predictive Horizon & Scientific Safeguards (`ForecastPanel.tsx`)**:
  - Visually distinct treatment: Dashed amber trend line with shaded 80% and 95% confidence intervals.
  - Full model provenance: Architecture (Seasonal-ARIMA / Spatiotemporal-XGBoost), model version, generation date, and training holdout scores (RMSE, MAE, R²).
  - Explicit scientific guardrails banner: Mathematical extrapolations clearly distinguished from empirical observations.
  - Insufficient-data edge case handling.

- **Asynchronous Jobs & Queue (`JobStatus.tsx` & `apiAdapter.ts`)**:
  - Progress stepper: Queued → Preprocessing & STAC Query → Cloud Masking → Feature Extraction → Predictive Modeling → Ready.
  - Edge case simulations: Normal, Insufficient History (<12 obs), Cloud Contamination Failure (>85%), and Partial Data.
  - Retry action on job failure.

---

### Quick Start & Running the Project

#### 1. Prerequisites
- Node.js (v18+ or v20+ LTS recommended)

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

#### 4. Build for Production
```bash
npm run build
npm run preview
```

---

### Environment Variables (`.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Live backend API URL (leave blank for high-fidelity offline synthetic adapter) | `""` |
| `VITE_ENABLE_MOCK_DATA` | Force synthetic demo fixtures for offline development and testing | `true` |
| `VITE_MAP_DEFAULT_LON` | Initial map center longitude | `85.0` |
| `VITE_MAP_DEFAULT_LAT` | Initial map center latitude | `20.5` |
| `VITE_MAP_DEFAULT_ZOOM` | Initial map zoom level | `5` |
| `VITE_MAX_AOI_SQKM` | Safety limit for uploaded AOI boundary size in square kilometers | `100000` |

---

### API Contract Implementation (Section 8)

The frontend communicates with backend services via `src/services/apiAdapter.ts`:

- `POST /api/analysis/jobs` — Submits AOI geometry, phenomenon, indicator, date range, and temporal aggregation.
- `GET /api/analysis/jobs/{id}` — Polls job status (`queued`, `running`, `completed`, `failed`).
- `GET /api/analysis/jobs/{id}/observations` — Fetches date-indexed historical feature series and quality flags.
- `GET /api/analysis/jobs/{id}/changes` — Fetches detected disturbance events and anomaly markers.
- `GET /api/analysis/jobs/{id}/forecast` — Fetches future projections, confidence interval bounds, model version, and holdout metrics.
- `GET /api/analysis/jobs/{id}/layers` — Fetches raster/vector layers for map display.
- `GET /api/catalog/search` — Fetches intersecting satellite scenes and STAC footprints.

