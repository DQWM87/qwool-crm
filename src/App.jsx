import { useState } from 'react'

const AWEX_REGIONS = [
  { code: 'S29', label: 'S29 — Naracoorte' },
  { code: 'S30', label: 'S30 — Mount Gambier' },
  { code: 'S31', label: 'S31 — Hamilton (VIC)' },
  { code: 'S32', label: 'S32 — Ballarat' },
  { code: 'S06', label: 'S06 — Adelaide' },
  { code: 'S03', label: 'S03 — Melbourne' },
  { code: 'S01', label: 'S01 — Sydney' },
  { code: 'S05', label: 'S05 — Fremantle' },
  { code: 'S07', label: 'S07 — Launceston' },
  { code: 'S08', label: 'S08 — Brisbane' },
  { code: 'S22', label: 'S22 — Wagga Wagga' },
  { code: 'S20', label: 'S20 — Dubbo' },
  { code: 'S26', label: 'S26 — Armidale' },
]

const GROWER_STATUSES = ['Client', 'Prospect', 'Contacted', 'Lapsed']

const DEMO_CONTACTS = [
  { id: 'k1', name: 'Troy Noonan', type: 'Wool Classer', company: 'AWN Wool Services', region: 'S29 — Naracoorte', phone: '0455 666 777', email: 'troy@awn.com.au', notes: 'Highly regarded. Classes most clips in the Naracoorte district.', created_at: '2025-03-01T00:00:00Z' },
  { id: 'k2', name: 'Mick Heaney', type: 'Wool Classer', company: 'Independent', region: 'S30 — Mount Gambier', phone: '0411 234 567', email: '', notes: 'Does a lot of work around Penola and surrounds.', created_at: '2025-03-02T00:00:00Z' },
  { id: 'k3', name: 'Brennan Shearing', type: 'Shearing Contractor', company: 'Brennan & Sons', region: 'S29 — Naracoorte', phone: '0488 900 100', email: 'brennans@gmail.com', notes: 'Large team, runs 3 gangs. Good contact for shearing dates across multiple properties.', created_at: '2025-03-05T00:00:00Z' },
  { id: 'k4', name: 'Jake Wilton', type: 'Shearing Contractor', company: 'Wilton Shearing Co.', region: 'S31 — Hamilton (VIC)', phone: '0400 321 654', email: '', notes: 'Covers Hamilton and Casterton area. Usually shears McAllister and Tulloch.', created_at: '2025-03-08T00:00:00Z' },
  { id: 'k5', name: 'No Name Supplied', type: 'Wool Classer', company: 'Unknown', region: 'S30 — Mount Gambier', phone: '', email: '', notes: 'Classer for Drummond — name not yet confirmed. Follow up with Alice.', created_at: '2025-04-03T00:00:00Z' },
]

const DEMO_GROWERS = [
  { id: 'g1', name: 'Henderson, Rob', property: 'Wirrabara Station', location: 'Naracoorte', state: 'SA', awex_region: 'S29', phone: '0412 555 100', email: 'rob@wirrabara.com.au', annual_bales: 320, breed: 'Merino', contact_id: 'k1', status: 'Client', notes: 'Long term client, consistent 19µ clip', created_at: '2025-03-10T00:00:00Z' },
  { id: 'g2', name: 'McAllister, Fiona', property: 'Dundonald Park', location: 'Hamilton', state: 'VIC', awex_region: 'S31', phone: '0418 222 300', email: 'fi@dundonald.com.au', annual_bales: 180, breed: 'Corriedale', contact_id: 'k4', status: 'Client', notes: '', created_at: '2025-03-12T00:00:00Z' },
  { id: 'g3', name: 'Tulloch, Brett', property: 'Blue Range', location: 'Casterton', state: 'VIC', awex_region: 'S31', phone: '0400 888 200', email: '', annual_bales: 95, breed: 'Merino X', contact_id: 'k4', status: 'Client', notes: 'First season with us', created_at: '2025-03-18T00:00:00Z' },
  { id: 'g4', name: 'Payne, Gary', property: 'Moolort Downs', location: 'Penola', state: 'SA', awex_region: 'S29', phone: '0422 100 400', email: 'gary@moolort.com.au', annual_bales: 410, breed: 'Merino', contact_id: 'k1', status: 'Client', notes: 'Top end 17.5µ — priority client', created_at: '2025-04-01T00:00:00Z' },
  { id: 'g5', name: 'Drummond, Alice', property: 'Esperance Run', location: 'Portland', state: 'VIC', awex_region: 'S30', phone: '0411 900 300', email: 'alice@esperancerun.com', annual_bales: 60, breed: 'Polwarth', contact_id: 'k5', status: 'Prospect', notes: 'Met at field day — very interested. Follow up April.', created_at: '2025-04-03T00:00:00Z' },
  { id: 'g6', name: 'Walsh, Simon', property: 'Killara Park', location: 'Naracoorte', state: 'SA', awex_region: 'S29', phone: '0477 500 200', email: 'simon@killarapark.com.au', annual_bales: 240, breed: 'Merino', contact_id: 'k1', status: 'Lapsed', notes: 'Sold through us 2022-23. Moved to different buyer. Worth revisiting.', created_at: '2025-02-10T00:00:00Z' },
  { id: 'g7', name: 'Nguyen, Peter', property: 'Borderlands Station', location: 'Mount Gambier', state: 'SA', awex_region: 'S30', phone: '0499 111 300', email: '', annual_bales: 130, breed: 'Merino X', contact_id: '', status: 'Contacted', notes: 'Cold called March. Was polite, said call back in June before shearing.', created_at: '2025-03-22T00:00:00Z' },
]

const DEMO_CLIPS = [
  { id: 'c1', grower_id: 'g1', contact_id: 'k1', lot: 'LOT-2025-001', season: '2024-25', bales: 318, micron: 19.2, yield_pct: 71.5, weight_kg: 14200, sale_date: '2025-03-14', status: 'Sold', notes: 'Excellent preparation', created_at: '2025-03-13T00:00:00Z' },
  { id: 'c2', grower_id: 'g2', contact_id: 'k4', lot: 'LOT-2025-002', season: '2024-25', bales: 175, micron: 27.8, yield_pct: 68.0, weight_kg: 7800, sale_date: '2025-03-21', status: 'Sold', notes: '', created_at: '2025-03-20T00:00:00Z' },
  { id: 'c3', grower_id: 'g4', contact_id: 'k1', lot: 'LOT-2025-003', season: '2024-25', bales: 405, micron: 17.5, yield_pct: 74.2, weight_kg: 18900, sale_date: '2025-04-04', status: 'Sold', notes: 'Premium line — strong bidding', created_at: '2025-04-03T00:00:00Z' },
  { id: 'c4', grower_id: 'g3', contact_id: 'k4', lot: 'LOT-2025-004', season: '2024-25', bales: 92, micron: 22.1, yield_pct: 69.5, weight_kg: 4100, sale_date: null, status: 'Pending', notes: 'Awaiting classing', created_at: '2025-04-05T00:00:00Z' },
  { id: 'c5', grower_id: 'g5', contact_id: '', lot: 'LOT-2025-005', season: '2024-25', bales: 58, micron: 24.0, yield_pct: 66.0, weight_kg: 2600, sale_date: null, status: 'Pending', notes: '', created_at: '2025-04-06T00:00:00Z' },
]

const DEMO_TRANSACTIONS = [
  { id: 't1', grower_id: 'g1', clip_id: 'c1', date: '2025-03-14', price_per_kg_clean: 1285, total_value: 131420.50, payment_status: 'Paid', type: 'Auction', notes: '', created_at: '2025-03-14T00:00:00Z' },
  { id: 't2', grower_id: 'g2', clip_id: 'c2', date: '2025-03-21', price_per_kg_clean: 890, total_value: 47124.00, payment_status: 'Paid', type: 'Auction', notes: '', created_at: '2025-03-21T00:00:00Z' },
  { id: 't3', grower_id: 'g4', clip_id: 'c3', date: '2025-04-04', price_per_kg_clean: 1640, total_value: 229716.00, payment_status: 'Pending', type: 'Private Treaty', notes: 'Forward contract negotiated direct', created_at: '2025-04-04T00:00:00Z' },
]

const DEMO_VISITS = [
  { id: 'v1', grower_id: 'g1', date: '2025-03-10', type: 'Shearing Visit', notes: 'Visited during shearing. Clip looking good, on track for 318 bales. Rob happy with preparation. No concerns raised.', followup: '2025-06-01', created_at: '2025-03-10T00:00:00Z' },
  { id: 'v2', grower_id: 'g1', date: '2025-01-15', type: 'Phone Call', notes: 'Discussed upcoming season pricing. Rob watching the EMI closely. Expects similar clip to last year.', followup: '', created_at: '2025-01-15T00:00:00Z' },
  { id: 'v3', grower_id: 'g4', date: '2025-04-01', type: 'Cold Call', notes: 'First visit to Moolort Downs. Gary very receptive. Currently with another buyer but open to discussion.', followup: '2025-05-15', created_at: '2025-04-01T00:00:00Z' },
  { id: 'v4', grower_id: 'g5', date: '2025-04-03', type: 'Field Day', notes: 'Met Alice at the Hamilton Field Day. Polwarth operation, 60 bales. Interested in our market report service. Good prospect.', followup: '2025-04-20', created_at: '2025-04-03T00:00:00Z' },
  { id: 'v5', grower_id: 'g6', date: '2025-02-10', type: 'Phone Call', notes: 'Reached out to Simon. Was pleasant but committed elsewhere for now. Said to try again next season.', followup: '2025-08-01', created_at: '2025-02-10T00:00:00Z' },
  { id: 'v6', grower_id: 'g7', date: '2025-03-22', type: 'Cold Call', notes: 'Knocked on door at Borderlands. Peter was polite. Runs 130 bales of Merino X. Asked us to call back in June.', followup: '2025-06-01', created_at: '2025-03-22T00:00:00Z' },
]

const MARKET_DATA = {
  emi: { value: 1786, change: 62, week: 'Sale M40 — 1 & 2 April 2026', southern: 1745, northern: 1848, bales: 36252, clearance: 98.2, note: 'Easter recess this week. Sales resume 13 April.' },
  centres: [
    { centre: 'Sydney (Yennora)', code: 'SYD', bales_offered: 14200, bales_sold: 13980, clearance: 98.5, emi: 1786 },
    { centre: 'Melbourne (Brooklyn)', code: 'MEL', bales_offered: 14800, bales_sold: 14560, clearance: 98.4, emi: 1745 },
    { centre: 'Fremantle (Bibra Lake)', code: 'FRE', bales_offered: 7252, bales_sold: 7110, clearance: 98.0, emi: 1790 },
  ],
  micron_guide: [
    { micron: '18.0', price: 2392, change: 69 }, { micron: '18.5', price: 2320, change: 71 },
    { micron: '19.0', price: 2221, change: 53 }, { micron: '19.5', price: 2155, change: 64 },
    { micron: '20.0', price: 2091, change: 40 }, { micron: '21.0', price: 2068, change: 32 },
    { micron: '25.0', price: 1010, change: null }, { micron: '26.0', price: 840, change: 8 },
    { micron: '28.0', price: 650, change: 8 }, { micron: '30.0', price: 560, change: 5 },
    { micron: '32.0', price: 508, change: 3 },
  ],
  historical: [
    { week: 'M34', emi: 1767 }, { week: 'M35', emi: 1783 }, { week: 'M36', emi: 1751 },
    { week: 'M37', emi: 1724 }, { week: 'M38', emi: 1751 }, { week: 'M39', emi: 1724 },
    { week: 'M40', emi: 1786 },
  ]
}

const LS = {
  get: (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb } catch { return fb } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)
const fmt = (n) => n == null ? '-' : Number(n).toLocaleString('en-AU')
const fmtAud = (n) => n == null ? '-' : '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --maroon: #7a1040; --maroon-d: #5a0c30; --maroon-l: #9b1a52;
    --pink: #d4187a; --pink-l: #e8409a;
    --dark: #1a1a1a; --mid: #2d2d2d; --grey: #6b6b6b;
    --lg: #e4e4e4; --off: #f6f6f6; --white: #ffffff;
    --green: #166534; --gbg: #dcfce7;
    --amber: #92400e; --abg: #fef3c7;
    --red: #991b1b; --rbg: #fee2e2;
    --blue: #1e40af; --bbg: #dbeafe;
    --purple: #6b21a8; --pbg: #f3e8ff;
  }
  body { background: var(--off); color: var(--dark); font-family: 'Barlow', sans-serif; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  .hdr { background: var(--dark); height: 58px; padding: 0 26px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid var(--maroon); }
  .hdr-logo { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; color: #fff; letter-spacing: 0.05em; }
  .hdr-logo span { color: var(--pink-l); }
  .hdr-sub { font-size: 10px; color: var(--grey); letter-spacing: 0.12em; text-transform: uppercase; }
  .hdr-badge { background: var(--maroon); color: var(--pink-l); font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 3px; letter-spacing: 0.1em; text-transform: uppercase; }

  .demo-bar { background: var(--maroon-d); color: #e8a0c0; text-align: center; padding: 5px; font-size: 11px; letter-spacing: 0.1em; font-weight: 600; text-transform: uppercase; }

  .gsearch-bar { background: var(--mid); padding: 9px 26px; display: flex; align-items: center; gap: 12px; }
  .gsearch-wrap { position: relative; flex: 1; max-width: 420px; }
  .gsearch { width: 100%; background: var(--dark); border: 1.5px solid #3d3d3d; color: #fff; font-family: 'Barlow', sans-serif; font-size: 13px; padding: 8px 12px 8px 34px; border-radius: 4px; outline: none; }
  .gsearch:focus { border-color: var(--pink); }
  .gsearch::placeholder { color: #555; }
  .gsearch-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #555; font-size: 14px; pointer-events: none; }
  .gsearch-meta { font-size: 11px; color: #888; letter-spacing: 0.06em; text-transform: uppercase; }
  .gclear { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; background: none; border: 1.5px solid #3d3d3d; color: #888; padding: 5px 12px; border-radius: 3px; cursor: pointer; }
  .gclear:hover { border-color: var(--pink); color: var(--pink-l); }

  .gresults { background: var(--white); border-bottom: 2px solid var(--lg); }
  .gresult-item { display: flex; align-items: center; gap: 12px; padding: 10px 26px; border-bottom: 1px solid var(--lg); font-size: 13px; }
  .gresult-item:last-child { border-bottom: none; }
  .gdot { width: 7px; height: 7px; border-radius: 50%; background: var(--pink); flex-shrink: 0; }
  .gno-results { padding: 14px 26px; color: #bbb; font-size: 13px; }

  .nav { background: var(--maroon-d); display: flex; padding: 0 18px; overflow-x: auto; border-bottom: 2px solid var(--maroon); }
  .nav-btn { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.55); background: none; border: none; border-bottom: 3px solid transparent; padding: 12px 16px; cursor: pointer; white-space: nowrap; transition: all 0.15s; margin-bottom: -2px; }
  .nav-btn:hover { color: #fff; }
  .nav-btn.active { color: var(--pink-l); border-bottom-color: var(--pink); }

  .main { flex: 1; padding: 22px 26px; max-width: 1400px; width: 100%; margin: 0 auto; }

  .sec-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .sec-title { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 700; color: var(--dark); }
  .sec-sub { font-size: 12px; color: var(--grey); margin-top: 2px; }
  .sec-meta { font-size: 12px; color: var(--grey); }

  /* Pipeline summary bar */
  .pipeline { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .pip-item { background: var(--white); border: 1.5px solid var(--lg); border-radius: 5px; padding: 12px 18px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.15s; flex: 1; min-width: 130px; }
  .pip-item:hover { border-color: var(--maroon); }
  .pip-item.active-filter { border-color: var(--maroon); background: #fdf4f8; }
  .pip-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .pip-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey); }
  .pip-count { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 700; color: var(--dark); line-height: 1; }
  .pip-bales { font-size: 11px; color: var(--grey); margin-top: 2px; }

  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(175px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .card { background: var(--white); border: 1.5px solid var(--lg); border-radius: 5px; padding: 16px 18px; position: relative; }
  .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--maroon); border-radius: 5px 5px 0 0; }
  .card.c-pink::before { background: var(--pink); }
  .c-label { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey); margin-bottom: 7px; }
  .c-val { font-family: 'Barlow Condensed', sans-serif; font-size: 34px; font-weight: 700; color: var(--maroon); line-height: 1; }
  .c-val.pink { color: var(--pink); font-size: 22px; }
  .c-sub { font-size: 11px; color: var(--grey); margin-top: 4px; }
  .c-up { font-size: 12px; font-weight: 600; color: var(--green); margin-top: 3px; }

  .tw { background: var(--white); border: 1.5px solid var(--lg); border-radius: 5px; overflow: hidden; margin-bottom: 18px; }
  .ttb { padding: 11px 16px; background: var(--off); border-bottom: 1.5px solid var(--lg); display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
  .si { font-family: 'Barlow', sans-serif; font-size: 13px; border: 1.5px solid var(--lg); background: var(--white); color: var(--dark); padding: 7px 11px; border-radius: 4px; width: 200px; outline: none; }
  .si:focus { border-color: var(--maroon); }
  .si::placeholder { color: #bbb; }
  table { width: 100%; border-collapse: collapse; }
  th { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey); background: var(--off); padding: 9px 13px; text-align: left; border-bottom: 1.5px solid var(--lg); }
  td { font-size: 13px; color: var(--dark); padding: 10px 13px; border-bottom: 1px solid var(--lg); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #fdf4f8; }
  .mono { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 600; }

  .tag { display: inline-block; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 3px; text-transform: uppercase; }
  .tg { background: var(--gbg); color: var(--green); }
  .ta { background: var(--abg); color: var(--amber); }
  .tgr { background: var(--lg); color: var(--grey); }
  .tr { background: var(--rbg); color: var(--red); }
  .tm { background: var(--maroon); color: #fff; }
  .tp { background: #fce4f0; color: var(--maroon-d); }
  .tb { background: var(--bbg); color: var(--blue); }
  .tpu { background: var(--pbg); color: var(--purple); }

  .btn { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 9px 18px; border-radius: 4px; cursor: pointer; border: none; transition: all 0.15s; }
  .bp { background: var(--maroon); color: #fff; }
  .bp:hover { background: var(--maroon-l); }
  .bg { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; background: none; border: 1.5px solid var(--lg); color: var(--grey); padding: 7px 14px; border-radius: 4px; cursor: pointer; transition: all 0.15s; }
  .bg:hover { border-color: var(--maroon); color: var(--maroon); }
  .bsm { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 9px; border-radius: 3px; cursor: pointer; border: none; transition: all 0.15s; }
  .be { background: none; border: 1.5px solid var(--lg); color: var(--grey); }
  .be:hover { border-color: var(--maroon); color: var(--maroon); }
  .bd { background: none; border: 1.5px solid #f0c0c0; color: var(--red); }
  .bd:hover { background: var(--red); color: #fff; }
  .bn { background: none; border: 1.5px solid #e0c0d0; color: var(--maroon); }
  .bn:hover { background: var(--maroon); color: #fff; }
  .ra { display: flex; gap: 5px; }

  .mb { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
  .mo { background: var(--white); border-radius: 6px; border-top: 4px solid var(--maroon); width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; padding: 26px 28px; }
  .mo-lg { max-width: 760px; }
  .mo-title { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
  .mo-sub { font-size: 13px; color: var(--grey); margin-bottom: 22px; }
  .fg { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
  .fi { display: flex; flex-direction: column; gap: 5px; }
  .fi.s2 { grid-column: span 2; }
  label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey); }
  input, select, textarea { font-family: 'Barlow', sans-serif; font-size: 14px; color: var(--dark); background: var(--off); border: 1.5px solid var(--lg); border-radius: 4px; padding: 8px 10px; outline: none; width: 100%; transition: border-color 0.15s; }
  input:focus, select:focus, textarea:focus { border-color: var(--maroon); background: var(--white); }
  textarea { resize: vertical; min-height: 80px; }
  .ma { display: flex; gap: 10px; justify-content: flex-end; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--lg); }

  .vi { background: var(--off); border: 1.5px solid var(--lg); border-radius: 5px; padding: 14px 16px; margin-bottom: 10px; }
  .vh { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .vd { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; color: var(--maroon); }
  .vn { font-size: 13px; line-height: 1.6; color: var(--dark); }
  .vf { font-size: 12px; font-weight: 600; color: var(--pink); margin-top: 8px; }
  .vact { display: flex; justify-content: flex-end; margin-top: 8px; }
  .vadd-box { background: var(--off); border: 1.5px solid var(--lg); border-radius: 5px; padding: 16px; margin-bottom: 20px; }
  .vadd-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--maroon); margin-bottom: 14px; }
  .vadd-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }

  .mp { background: var(--white); border: 1.5px solid var(--lg); border-radius: 5px; overflow: hidden; margin-bottom: 18px; }
  .mph { background: var(--maroon); color: #fff; padding: 12px 18px; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .mpb { padding: 16px 18px; }
  .emi-big { font-family: 'Barlow Condensed', sans-serif; font-size: 54px; font-weight: 700; color: var(--maroon); line-height: 1; }
  .emi-u { font-size: 16px; color: var(--grey); }
  .emi-ch { font-size: 15px; font-weight: 700; color: var(--green); margin-top: 4px; }
  .mrow { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--lg); font-size: 13px; }
  .mrow:last-child { border-bottom: none; }
  .mlbl { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; color: var(--grey); }
  .mval { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; color: var(--maroon); }
  .mgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
  .bchart { display: flex; flex-direction: column; gap: 7px; margin-top: 14px; }
  .brow { display: flex; align-items: center; gap: 8px; }
  .blbl { font-size: 11px; color: var(--grey); width: 38px; text-align: right; flex-shrink: 0; }
  .bwrap { flex: 1; background: var(--lg); border-radius: 2px; height: 19px; overflow: hidden; }
  .bfill { height: 100%; background: var(--maroon); display: flex; align-items: center; justify-content: flex-end; padding-right: 5px; }
  .bval { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; color: #fff; }
  .hr { border: none; border-top: 1px solid var(--lg); margin: 14px 0; }

  .ai { display: flex; align-items: center; gap: 12px; padding: 11px 16px; border-bottom: 1px solid var(--lg); font-size: 13px; }
  .ai:last-child { border-bottom: none; }
  .adot { width: 7px; height: 7px; border-radius: 50%; background: var(--pink); flex-shrink: 0; }
  .at { flex: 1; }
  .atm { font-size: 11px; color: var(--grey); }

  .empty { text-align: center; padding: 38px 20px; color: #bbb; font-size: 13px; }

  /* Contact card style for contacts tab */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
  .contact-card { background: var(--white); border: 1.5px solid var(--lg); border-radius: 5px; padding: 16px 18px; position: relative; }
  .contact-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 5px 5px 0 0; }
  .contact-card.classer::before { background: var(--blue); }
  .contact-card.contractor::before { background: var(--green); }
  .contact-card.other::before { background: var(--grey); }
  .cc-name { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
  .cc-company { font-size: 12px; color: var(--grey); margin-bottom: 10px; }
  .cc-detail { font-size: 12px; color: var(--dark); margin-bottom: 4px; display: flex; gap: 6px; }
  .cc-detail-label { color: var(--grey); min-width: 50px; }
  .cc-notes { font-size: 12px; color: var(--grey); margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--lg); line-height: 1.5; }
  .cc-actions { display: flex; gap: 5px; margin-top: 12px; justify-content: flex-end; }

  @media (max-width: 680px) {
    .main { padding: 14px 14px; }
    .fg { grid-template-columns: 1fr; }
    .fi.s2 { grid-column: span 1; }
    .cards { grid-template-columns: 1fr 1fr; }
    .mgrid { grid-template-columns: 1fr; }
    .pipeline { flex-direction: column; }
    .contact-grid { grid-template-columns: 1fr; }
  }
`

// Status colour config
const STATUS_CONFIG = {
  Client:    { dot: '#166534', tag: 'tg' },
  Prospect:  { dot: '#d97706', tag: 'ta' },
  Contacted: { dot: '#1e40af', tag: 'tb' },
  Lapsed:    { dot: '#6b7280', tag: 'tgr' },
}

function Tag({ val }) {
  const tagMap = {
    Client: 'tg', Prospect: 'ta', Contacted: 'tb', Lapsed: 'tgr',
    Sold: 'tg', Paid: 'tg', Pending: 'ta', Partial: 'ta',
    'Passed In': 'tr', 'Private Sale': 'tgr',
    'Wool Classer': 'tb', 'Shearing Contractor': 'tg', Transport: 'tgr', Other: 'tgr',
    Auction: 'tgr', 'Private Treaty': 'tm', 'Forward Contract': 'ta',
    'Shearing Visit': 'tg', 'Cold Call': 'ta', 'Phone Call': 'tgr', 'Field Day': 'tp', Email: 'tgr',
    Grower: 'tm', Clip: 'tp', Contact: 'tb', Tx: 'tgr', Visit: 'tg',
  }
  return <span className={`tag ${tagMap[val] || 'tgr'}`}>{val}</span>
}

function Modal({ title, sub, onClose, onSave, saveLabel = 'Save Record', large, children }) {
  return (
    <div className="mb" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`mo${large ? ' mo-lg' : ''}`}>
        <div className="mo-title">{title}</div>
        {sub && <div className="mo-sub">{sub}</div>}
        {children}
        <div className="ma">
          <button className="bg" onClick={onClose}>Cancel</button>
          {onSave && <button className="btn bp" onClick={onSave}>{saveLabel}</button>}
        </div>
      </div>
    </div>
  )
}

function GrowerForm({ d, set, contacts }) {
  return (
    <div className="fg">
      <div className="fi"><label>Grower Name *</label><input value={d.name || ''} onChange={e => set('name', e.target.value)} placeholder="Smith, John" /></div>
      <div className="fi"><label>Property / Station</label><input value={d.property || ''} onChange={e => set('property', e.target.value)} /></div>
      <div className="fi"><label>Location / Town</label><input value={d.location || ''} onChange={e => set('location', e.target.value)} /></div>
      <div className="fi"><label>State</label>
        <select value={d.state || ''} onChange={e => set('state', e.target.value)}>
          <option value="">Select</option>
          {['SA','VIC','NSW','QLD','WA','TAS','NT','ACT'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="fi"><label>AWEX Region</label>
        <select value={d.awex_region || ''} onChange={e => set('awex_region', e.target.value)}>
          <option value="">Select Region</option>
          {AWEX_REGIONS.map(r => <option key={r.code} value={r.code}>{r.label}</option>)}
        </select>
      </div>
      <div className="fi"><label>Status</label>
        <select value={d.status || 'Prospect'} onChange={e => set('status', e.target.value)}>
          {GROWER_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="fi"><label>Phone</label><input value={d.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
      <div className="fi"><label>Email</label><input value={d.email || ''} onChange={e => set('email', e.target.value)} /></div>
      <div className="fi"><label>Annual Bales (est.)</label><input type="number" value={d.annual_bales || ''} onChange={e => set('annual_bales', e.target.value)} /></div>
      <div className="fi"><label>Breed</label><input value={d.breed || ''} onChange={e => set('breed', e.target.value)} placeholder="Merino, Corriedale..." /></div>
      <div className="fi s2"><label>Wool Classer / Shearing Contractor</label>
        <select value={d.contact_id || ''} onChange={e => set('contact_id', e.target.value)}>
          <option value="">None / Unknown</option>
          {contacts.map(c => <option key={c.id} value={c.id}>{c.name} ({c.type})</option>)}
        </select>
      </div>
      <div className="fi s2"><label>Notes</label><textarea value={d.notes || ''} onChange={e => set('notes', e.target.value)} /></div>
    </div>
  )
}

function ClipForm({ d, set, growers, contacts }) {
  return (
    <div className="fg">
      <div className="fi"><label>Grower *</label>
        <select value={d.grower_id || ''} onChange={e => set('grower_id', e.target.value)}>
          <option value="">Select Grower</option>
          {growers.map(g => <option key={g.id} value={g.id}>{g.name} - {g.property || g.location}</option>)}
        </select>
      </div>
      <div className="fi"><label>Lot / Ref No.</label><input value={d.lot || ''} onChange={e => set('lot', e.target.value)} placeholder="LOT-2025-001" /></div>
      <div className="fi"><label>Season</label><input value={d.season || ''} onChange={e => set('season', e.target.value)} placeholder="2024-25" /></div>
      <div className="fi"><label>Bales</label><input type="number" value={d.bales || ''} onChange={e => set('bales', e.target.value)} /></div>
      <div className="fi"><label>Micron</label><input type="number" step="0.1" value={d.micron || ''} onChange={e => set('micron', e.target.value)} placeholder="19.5" /></div>
      <div className="fi"><label>Yield (%)</label><input type="number" step="0.1" value={d.yield_pct || ''} onChange={e => set('yield_pct', e.target.value)} /></div>
      <div className="fi"><label>Weight (kg greasy)</label><input type="number" value={d.weight_kg || ''} onChange={e => set('weight_kg', e.target.value)} /></div>
      <div className="fi"><label>Sale Date</label><input type="date" value={d.sale_date || ''} onChange={e => set('sale_date', e.target.value)} /></div>
      <div className="fi"><label>Wool Classer</label>
        <select value={d.contact_id || ''} onChange={e => set('contact_id', e.target.value)}>
          <option value="">None / Unknown</option>
          {contacts.filter(c => c.type === 'Wool Classer').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="fi"><label>Status</label>
        <select value={d.status || 'Pending'} onChange={e => set('status', e.target.value)}>
          <option>Pending</option><option>Sold</option><option>Passed In</option><option>Private Sale</option>
        </select>
      </div>
      <div className="fi s2"><label>Notes</label><textarea value={d.notes || ''} onChange={e => set('notes', e.target.value)} /></div>
    </div>
  )
}

function ContactForm({ d, set }) {
  return (
    <div className="fg">
      <div className="fi"><label>Name *</label><input value={d.name || ''} onChange={e => set('name', e.target.value)} placeholder="e.g. Troy Noonan (or No Name Supplied)" /></div>
      <div className="fi"><label>Type *</label>
        <select value={d.type || 'Wool Classer'} onChange={e => set('type', e.target.value)}>
          <option>Wool Classer</option>
          <option>Shearing Contractor</option>
          <option>Transport</option>
          <option>Other</option>
        </select>
      </div>
      <div className="fi"><label>Company / Team</label><input value={d.company || ''} onChange={e => set('company', e.target.value)} placeholder="Independent, AWN, Brennan & Sons..." /></div>
      <div className="fi"><label>AWEX Region</label>
        <select value={d.region || ''} onChange={e => set('region', e.target.value)}>
          <option value="">Select Region</option>
          {AWEX_REGIONS.map(r => <option key={r.code} value={r.code}>{r.label}</option>)}
        </select>
      </div>
      <div className="fi"><label>Phone</label><input value={d.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
      <div className="fi"><label>Email</label><input value={d.email || ''} onChange={e => set('email', e.target.value)} /></div>
      <div className="fi s2"><label>Notes</label><textarea value={d.notes || ''} onChange={e => set('notes', e.target.value)} placeholder="Growers they work with, areas covered, any relevant notes..." /></div>
    </div>
  )
}

function TxForm({ d, set, growers, clips }) {
  const fc = d.grower_id ? clips.filter(c => c.grower_id === d.grower_id) : clips
  return (
    <div className="fg">
      <div className="fi"><label>Grower</label>
        <select value={d.grower_id || ''} onChange={e => { set('grower_id', e.target.value); set('clip_id', '') }}>
          <option value="">Select</option>
          {growers.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      <div className="fi"><label>Clip</label>
        <select value={d.clip_id || ''} onChange={e => set('clip_id', e.target.value)}>
          <option value="">Select</option>
          {fc.map(c => <option key={c.id} value={c.id}>{c.lot} - {c.bales} bales</option>)}
        </select>
      </div>
      <div className="fi"><label>Date</label><input type="date" value={d.date || ''} onChange={e => set('date', e.target.value)} /></div>
      <div className="fi"><label>Sale Type</label>
        <select value={d.type || 'Auction'} onChange={e => set('type', e.target.value)}>
          <option>Auction</option><option>Private Treaty</option><option>Forward Contract</option>
        </select>
      </div>
      <div className="fi"><label>Price (c/kg clean)</label><input type="number" step="0.1" value={d.price_per_kg_clean || ''} onChange={e => set('price_per_kg_clean', e.target.value)} /></div>
      <div className="fi"><label>Total Value ($AUD)</label><input type="number" step="0.01" value={d.total_value || ''} onChange={e => set('total_value', e.target.value)} /></div>
      <div className="fi"><label>Payment Status</label>
        <select value={d.payment_status || 'Pending'} onChange={e => set('payment_status', e.target.value)}>
          <option>Pending</option><option>Paid</option><option>Partial</option>
        </select>
      </div>
      <div className="fi s2"><label>Notes</label><textarea value={d.notes || ''} onChange={e => set('notes', e.target.value)} /></div>
    </div>
  )
}

function VisitForm({ d, set }) {
  return (
    <div className="fg">
      <div className="fi"><label>Date *</label><input type="date" value={d.date || ''} onChange={e => set('date', e.target.value)} /></div>
      <div className="fi"><label>Type</label>
        <select value={d.type || 'Phone Call'} onChange={e => set('type', e.target.value)}>
          <option>Phone Call</option><option>Shearing Visit</option><option>Cold Call</option><option>Field Day</option><option>Email</option><option>Other</option>
        </select>
      </div>
      <div className="fi s2"><label>Notes *</label><textarea value={d.notes || ''} onChange={e => set('notes', e.target.value)} placeholder="What was discussed, how it went, key outcomes..." style={{ minHeight: 110 }} /></div>
      <div className="fi s2"><label>Follow-up Date</label><input type="date" value={d.followup || ''} onChange={e => set('followup', e.target.value)} /></div>
    </div>
  )
}

function MarketTab() {
  const maxE = Math.max(...MARKET_DATA.historical.map(h => h.emi))
  return (
    <>
      <div className="sec-head">
        <div>
          <div className="sec-title">Market Report</div>
          <div className="sec-sub">Source: Quality Wool / AWEX — {MARKET_DATA.emi.week}</div>
        </div>
      </div>
      {MARKET_DATA.emi.note && (
        <div style={{ background: '#fef3c7', border: '1.5px solid #f59e0b', borderRadius: 5, padding: '10px 16px', marginBottom: 18, fontSize: 13, color: '#92400e', fontWeight: 500 }}>
          📅 {MARKET_DATA.emi.note}
        </div>
      )}
      <div className="mgrid">
        <div className="mp">
          <div className="mph">Eastern Market Indicator (EMI)</div>
          <div className="mpb">
            <div className="emi-big">{MARKET_DATA.emi.value}<span className="emi-u"> c/kg</span></div>
            <div className="emi-ch">+{MARKET_DATA.emi.change}c on last week</div>
            <div style={{ display: 'flex', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
              {[
                { label: 'Southern', val: `${MARKET_DATA.emi.southern}c` },
                { label: 'Northern', val: `${MARKET_DATA.emi.northern}c` },
                { label: 'Bales', val: fmt(MARKET_DATA.emi.bales) },
                { label: 'Clearance', val: `${MARKET_DATA.emi.clearance}%`, green: true },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: 20, fontWeight: 700, color: s.green ? 'var(--green)' : 'var(--maroon)' }}>{s.val}</div>
                </div>
              ))}
            </div>
            <hr className="hr" />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 8 }}>Recent Trend (M34–M40)</div>
            <div className="bchart">
              {MARKET_DATA.historical.map(h => (
                <div key={h.week} className="brow">
                  <div className="blbl">{h.week}</div>
                  <div className="bwrap">
                    <div className="bfill" style={{ width: `${(h.emi / maxE) * 100}%` }}>
                      <span className="bval">{h.emi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mp">
          <div className="mph">Micron Price Guide — 2 April 2026 (c/kg clean)</div>
          <div className="mpb">
            {MARKET_DATA.micron_guide.map(m => (
              <div key={m.micron} className="mrow">
                <span className="mlbl">{m.micron}µ</span>
                <span className="mval">{m.price}c</span>
                {m.change != null && <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>+{m.change}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mp">
        <div className="mph">Sale Centre Results — {MARKET_DATA.emi.week}</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead><tr><th>Centre</th><th>Code</th><th>Bales Offered</th><th>Bales Sold</th><th>Clearance</th><th>Centre EMI</th></tr></thead>
            <tbody>
              {MARKET_DATA.centres.map(c => (
                <tr key={c.code}>
                  <td><strong>{c.centre}</strong></td>
                  <td className="mono">{c.code}</td>
                  <td className="mono">{fmt(c.bales_offered)}</td>
                  <td className="mono">{fmt(c.bales_sold)}</td>
                  <td><span className={`tag ${c.clearance >= 95 ? 'tg' : 'ta'}`}>{c.clearance}%</span></td>
                  <td className="mono" style={{ color: 'var(--maroon)', fontWeight: 700 }}>{c.emi}c</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [growers, setGrowers] = useState(() => LS.get('qwv3_g', DEMO_GROWERS))
  const [clips, setClips] = useState(() => LS.get('qwv3_c', DEMO_CLIPS))
  const [contacts, setContacts] = useState(() => LS.get('qwv3_k', DEMO_CONTACTS))
  const [txs, setTxs] = useState(() => LS.get('qwv3_t', DEMO_TRANSACTIONS))
  const [visits, setVisits] = useState(() => LS.get('qwv3_v', DEMO_VISITS))
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})
  const [editId, setEditId] = useState(null)
  const [vGrower, setVGrower] = useState(null)
  const [gSearch, setGSearch] = useState('')
  const [tSearch, setTSearch] = useState('')
  const [statusF, setStatusF] = useState('')
  const [regionF, setRegionF] = useState('')

  const ps = (key, setter, data) => { setter(data); LS.set(key, data) }
  const openAdd = (t) => { setModal(t); setForm({}); setEditId(null) }
  const openEdit = (t, item) => { setModal(t); setForm({ ...item }); setEditId(item.id) }
  const closeModal = () => { setModal(null); setForm({}); setEditId(null) }
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const openVisits = (g) => { setVGrower(g); setModal('visits'); setForm({}); setEditId(null) }

  const handleSave = () => {
    const now = new Date().toISOString()
    if (modal === 'grower') {
      if (!form.name) return alert('Name required')
      ps('qwv3_g', setGrowers, editId ? growers.map(g => g.id === editId ? { ...form } : g) : [...growers, { ...form, id: uid(), created_at: now }])
    } else if (modal === 'clip') {
      if (!form.grower_id) return alert('Select a grower')
      ps('qwv3_c', setClips, editId ? clips.map(c => c.id === editId ? { ...form } : c) : [...clips, { ...form, id: uid(), created_at: now }])
    } else if (modal === 'contact') {
      if (!form.name) return alert('Name required')
      ps('qwv3_k', setContacts, editId ? contacts.map(c => c.id === editId ? { ...form } : c) : [...contacts, { ...form, id: uid(), created_at: now }])
    } else if (modal === 'transaction') {
      ps('qwv3_t', setTxs, editId ? txs.map(t => t.id === editId ? { ...form } : t) : [...txs, { ...form, id: uid(), created_at: now }])
    } else if (modal === 'visit') {
      if (!form.date || !form.notes) return alert('Date and notes required')
      ps('qwv3_v', setVisits, editId ? visits.map(v => v.id === editId ? { ...form } : v) : [...visits, { ...form, grower_id: vGrower.id, id: uid(), created_at: now }])
      setForm({}); setEditId(null); return
    }
    if (modal !== 'visits') closeModal()
  }

  const del = (type, id) => {
    if (!window.confirm('Delete this record?')) return
    if (type === 'g') ps('qwv3_g', setGrowers, growers.filter(x => x.id !== id))
    else if (type === 'c') ps('qwv3_c', setClips, clips.filter(x => x.id !== id))
    else if (type === 'k') ps('qwv3_k', setContacts, contacts.filter(x => x.id !== id))
    else if (type === 't') ps('qwv3_t', setTxs, txs.filter(x => x.id !== id))
    else if (type === 'v') ps('qwv3_v', setVisits, visits.filter(x => x.id !== id))
  }

  const gn = id => { const g = growers.find(x => x.id === id); return g ? g.name : '-' }
  const cn = id => { const c = clips.find(x => x.id === id); return c ? (c.lot || c.id.slice(-6)) : '-' }
  const kn = id => { const k = contacts.find(x => x.id === id); return k ? k.name : '-' }
  const gv = id => visits.filter(v => v.grower_id === id).sort((a, b) => new Date(b.date) - new Date(a.date))

  // Global search
  const gq = gSearch.toLowerCase()
  const globalR = !gq ? [] : [
    ...growers.filter(g => [g.name, g.property, g.location, g.phone, g.breed].join(' ').toLowerCase().includes(gq)).map(g => ({ ...g, _t: 'Grower' })),
    ...clips.filter(c => [c.lot, gn(c.grower_id), c.season].join(' ').toLowerCase().includes(gq)).map(c => ({ ...c, _t: 'Clip' })),
    ...contacts.filter(k => [k.name, k.company, k.region, k.type].join(' ').toLowerCase().includes(gq)).map(k => ({ ...k, _t: 'Contact' })),
  ]

  const tq = tSearch.toLowerCase()
  const fG = growers.filter(g => {
    const ms = !tq || [g.name, g.property, g.location, g.state, g.phone, g.breed].join(' ').toLowerCase().includes(tq)
    const mst = !statusF || g.status === statusF
    const mr = !regionF || g.awex_region === regionF
    return ms && mst && mr
  })
  const fC = clips.filter(c => !tq || [c.lot, gn(c.grower_id), c.season, String(c.micron)].join(' ').toLowerCase().includes(tq))
  const fK = contacts.filter(k => !tq || [k.name, k.company, k.region, k.type].join(' ').toLowerCase().includes(tq))
  const fT = txs.filter(t => !tq || [gn(t.grower_id), cn(t.clip_id), t.type, t.date].join(' ').toLowerCase().includes(tq))

  const totalBales = clips.reduce((s, c) => s + (Number(c.bales) || 0), 0)
  const totalVal = txs.reduce((s, t) => s + (Number(t.total_value) || 0), 0)
  const pendingBales = clips.filter(c => c.status === 'Pending').reduce((s, c) => s + (Number(c.bales) || 0), 0)

  // Pipeline counts
  const pipeline = GROWER_STATUSES.map(s => ({
    status: s,
    count: growers.filter(g => g.status === s).length,
    bales: growers.filter(g => g.status === s).reduce((sum, g) => sum + (Number(g.annual_bales) || 0), 0),
    ...STATUS_CONFIG[s]
  }))

  const TABS = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'growers', label: `Growers (${growers.length})` },
    { id: 'clips', label: `Clips (${clips.length})` },
    { id: 'contacts', label: `Contacts (${contacts.length})` },
    { id: 'transactions', label: `Transactions (${txs.length})` },
    { id: 'market', label: 'Market Report' },
  ]

  const recent = [
    ...growers.slice(0, 2).map(g => ({ txt: `${g.status}: ${g.name} — ${g.property || g.location}`, t: g.created_at, type: 'Grower' })),
    ...clips.slice(0, 2).map(c => ({ txt: `Clip: ${c.lot} — ${gn(c.grower_id)} (${c.bales} bales, ${c.micron}µ)`, t: c.created_at, type: 'Clip' })),
    ...txs.slice(0, 1).map(t => ({ txt: `Transaction: ${gn(t.grower_id)} — ${fmtAud(t.total_value)}`, t: t.created_at, type: 'Tx' })),
    ...visits.slice(0, 2).map(v => ({ txt: `Visit: ${gn(v.grower_id)} — ${v.type}`, t: v.created_at, type: 'Visit' })),
  ].sort((a, b) => new Date(b.t) - new Date(a.t)).slice(0, 8)

  const vModal = vGrower ? gv(vGrower.id) : []

  const contactCardClass = (type) => {
    if (type === 'Wool Classer') return 'contact-card classer'
    if (type === 'Shearing Contractor') return 'contact-card contractor'
    return 'contact-card other'
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">

        <header className="hdr">
          <div>
            <div className="hdr-logo">QUALITY <span>WOOL</span></div>
            <div className="hdr-sub">Buyer CRM — Internal Staff Portal</div>
          </div>
          <div className="hdr-badge">Demo Mode</div>
        </header>

        <div className="demo-bar">Sample data loaded — All changes save locally in your browser</div>

        <div className="gsearch-bar">
          <div className="gsearch-wrap">
            <span className="gsearch-icon">🔍</span>
            <input className="gsearch" placeholder="Search all growers, clips, contacts..." value={gSearch} onChange={e => setGSearch(e.target.value)} />
          </div>
          {gSearch && <span className="gsearch-meta">{globalR.length} result{globalR.length !== 1 ? 's' : ''}</span>}
          {gSearch && <button className="gclear" onClick={() => setGSearch('')}>Clear</button>}
        </div>

        {gSearch && (
          <div className="gresults">
            {globalR.length === 0
              ? <div className="gno-results">No results for "{gSearch}"</div>
              : globalR.map((r, i) => (
                <div key={i} className="gresult-item">
                  <div className="gdot" />
                  <div style={{ flex: 1 }}>
                    <strong>{r.name}</strong>
                    {r.property ? ` — ${r.property}` : ''}
                    {r.lot ? ` — ${r.lot}` : ''}
                    {r.company ? ` — ${r.company}` : ''}
                    {r.location ? ` (${r.location}${r.state ? ', ' + r.state : ''})` : ''}
                  </div>
                  <Tag val={r._t} />
                  {r._t === 'Grower' && r.status && <span style={{ marginLeft: 4 }}><Tag val={r.status} /></span>}
                  {r._t === 'Grower' && r.awex_region && <span className="tag tm" style={{ marginLeft: 4 }}>{r.awex_region}</span>}
                </div>
              ))
            }
          </div>
        )}

        <nav className="nav">
          {TABS.map(t => (
            <button key={t.id} className={`nav-btn${tab === t.id ? ' active' : ''}`} onClick={() => { setTab(t.id); setTSearch(''); setStatusF(''); setRegionF('') }}>{t.label}</button>
          ))}
        </nav>

        <main className="main">

          {/* DASHBOARD */}
          {tab === 'dashboard' && (
            <>
              <div className="sec-head"><div className="sec-title">Overview</div><div className="sec-meta">2024-25 season</div></div>

              {/* Pipeline bar */}
              <div className="pipeline">
                {pipeline.map(p => (
                  <div key={p.status} className={`pip-item${statusF === p.status && tab === 'growers' ? ' active-filter' : ''}`} onClick={() => { setTab('growers'); setStatusF(p.status) }}>
                    <div className="pip-dot" style={{ background: p.dot }} />
                    <div>
                      <div className="pip-label">{p.status}s</div>
                      <div className="pip-count">{p.count}</div>
                      <div className="pip-bales">{fmt(p.bales)} bales</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cards">
                <div className="card"><div className="c-label">Total Bales</div><div className="c-val">{fmt(totalBales)}</div><div className="c-sub">{fmt(pendingBales)} pending sale</div></div>
                <div className="card"><div className="c-label">Clips on Record</div><div className="c-val">{clips.length}</div><div className="c-sub">{clips.filter(c => c.status === 'Sold').length} sold</div></div>
                <div className="card c-pink"><div className="c-label">Transaction Value</div><div className="c-val pink">{fmtAud(totalVal)}</div><div className="c-sub">{txs.length} transactions</div></div>
                <div className="card"><div className="c-label">Market EMI</div><div className="c-val">{MARKET_DATA.emi.value}c</div><div className="c-up">+{MARKET_DATA.emi.change}c this week</div></div>
              </div>

              <div className="sec-head"><div className="sec-title" style={{ fontSize: 20 }}>Recent Activity</div></div>
              <div className="tw">
                {recent.map((r, i) => (
                  <div key={i} className="ai">
                    <div className="adot" />
                    <div className="at">{r.txt}</div>
                    <Tag val={r.type} />
                    <div className="atm">{r.t ? new Date(r.t).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }) : ''}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* GROWERS */}
          {tab === 'growers' && (
            <>
              <div className="sec-head">
                <div>
                  <div className="sec-title">Growers</div>
                  <div className="sec-sub">Clients, prospects and pipeline — filter by status below</div>
                </div>
                <button className="btn bp" onClick={() => openAdd('grower')}>+ Add Grower</button>
              </div>

              {/* Clickable pipeline filter */}
              <div className="pipeline" style={{ marginBottom: 16 }}>
                <div className={`pip-item${!statusF ? ' active-filter' : ''}`} onClick={() => setStatusF('')} style={{ minWidth: 100 }}>
                  <div className="pip-dot" style={{ background: '#374151' }} />
                  <div>
                    <div className="pip-label">All</div>
                    <div className="pip-count">{growers.length}</div>
                  </div>
                </div>
                {pipeline.map(p => (
                  <div key={p.status} className={`pip-item${statusF === p.status ? ' active-filter' : ''}`} onClick={() => setStatusF(statusF === p.status ? '' : p.status)}>
                    <div className="pip-dot" style={{ background: p.dot }} />
                    <div>
                      <div className="pip-label">{p.status}s</div>
                      <div className="pip-count">{p.count}</div>
                      <div className="pip-bales">{fmt(p.bales)} bales</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tw">
                <div className="ttb">
                  <input className="si" placeholder="Search growers..." value={tSearch} onChange={e => setTSearch(e.target.value)} />
                  <select className="si" style={{ width: 190 }} value={regionF} onChange={e => setRegionF(e.target.value)}>
                    <option value="">All AWEX Regions</option>
                    {AWEX_REGIONS.map(r => <option key={r.code} value={r.code}>{r.label}</option>)}
                  </select>
                  <span className="sec-meta">{fG.length} record{fG.length !== 1 ? 's' : ''}{statusF ? ` — ${statusF}s` : ''}</span>
                </div>
                <table>
                  <thead><tr><th>Name</th><th>Property</th><th>Location</th><th>Region</th><th>Bales</th><th>Breed</th><th>Status</th><th>Visits</th><th>Actions</th></tr></thead>
                  <tbody>
                    {fG.length === 0 && <tr><td colSpan={9}><div className="empty">No growers found.</div></td></tr>}
                    {fG.map(g => (
                      <tr key={g.id}>
                        <td><strong>{g.name}</strong>{g.phone && <div style={{ fontSize: 11, color: 'var(--grey)', marginTop: 2 }}>{g.phone}</div>}</td>
                        <td>{g.property || '-'}</td>
                        <td>{[g.location, g.state].filter(Boolean).join(', ') || '-'}</td>
                        <td>{g.awex_region ? <span className="tag tm">{g.awex_region}</span> : '-'}</td>
                        <td className="mono">{fmt(g.annual_bales)}</td>
                        <td>{g.breed || '-'}</td>
                        <td><Tag val={g.status || 'Prospect'} /></td>
                        <td><span style={{ fontSize: 12, color: 'var(--grey)' }}>{gv(g.id).length} log{gv(g.id).length !== 1 ? 's' : ''}</span></td>
                        <td><div className="ra">
                          <button className="bsm bn" onClick={() => openVisits(g)}>Notes</button>
                          <button className="bsm be" onClick={() => openEdit('grower', g)}>Edit</button>
                          <button className="bsm bd" onClick={() => del('g', g.id)}>Del</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* CLIPS */}
          {tab === 'clips' && (
            <>
              <div className="sec-head">
                <div>
                  <div className="sec-title">Clips & Consignments</div>
                  <div className="sec-sub">Individual wool consignments — one grower can have multiple clips across seasons</div>
                </div>
                <button className="btn bp" onClick={() => openAdd('clip')}>+ Add Clip</button>
              </div>
              <div className="tw">
                <div className="ttb">
                  <input className="si" placeholder="Search clips..." value={tSearch} onChange={e => setTSearch(e.target.value)} />
                  <span className="sec-meta">{fC.length} records — {fmt(fC.reduce((s, c) => s + (Number(c.bales) || 0), 0))} bales total</span>
                </div>
                <table>
                  <thead><tr><th>Lot</th><th>Grower</th><th>Season</th><th>Bales</th><th>Micron</th><th>Yield %</th><th>Classer</th><th>Sale Date</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {fC.length === 0 && <tr><td colSpan={10}><div className="empty">No clips found.</div></td></tr>}
                    {fC.map(c => (
                      <tr key={c.id}>
                        <td className="mono">{c.lot || c.id.slice(-6)}</td>
                        <td>{gn(c.grower_id)}</td>
                        <td className="mono">{c.season || '-'}</td>
                        <td className="mono">{fmt(c.bales)}</td>
                        <td className="mono">{c.micron ? `${c.micron}µ` : '-'}</td>
                        <td className="mono">{c.yield_pct ? `${c.yield_pct}%` : '-'}</td>
                        <td style={{ fontSize: 12 }}>{c.contact_id ? kn(c.contact_id) : '-'}</td>
                        <td className="mono">{c.sale_date || '-'}</td>
                        <td><Tag val={c.status || 'Pending'} /></td>
                        <td><div className="ra">
                          <button className="bsm be" onClick={() => openEdit('clip', c)}>Edit</button>
                          <button className="bsm bd" onClick={() => del('c', c.id)}>Del</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* CONTACTS */}
          {tab === 'contacts' && (
            <>
              <div className="sec-head">
                <div>
                  <div className="sec-title">Contacts</div>
                  <div className="sec-sub">Wool classers, shearing contractors and other rural service contacts</div>
                </div>
                <button className="btn bp" onClick={() => openAdd('contact')}>+ Add Contact</button>
              </div>
              <div className="ttb" style={{ background: 'var(--white)', border: '1.5px solid var(--lg)', borderRadius: 5, marginBottom: 16 }}>
                <input className="si" placeholder="Search contacts..." value={tSearch} onChange={e => setTSearch(e.target.value)} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="tag tb">Wool Classers: {contacts.filter(k => k.type === 'Wool Classer').length}</span>
                  <span className="tag tg">Shearing Contractors: {contacts.filter(k => k.type === 'Shearing Contractor').length}</span>
                </div>
                <span className="sec-meta">{fK.length} records</span>
              </div>
              <div className="contact-grid">
                {fK.length === 0 && <div className="empty">No contacts found.</div>}
                {fK.map(k => (
                  <div key={k.id} className={contactCardClass(k.type)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div className="cc-name">{k.name}</div>
                      <Tag val={k.type} />
                    </div>
                    <div className="cc-company">{k.company || 'Independent'}</div>
                    {k.region && <div className="cc-detail"><span className="cc-detail-label">Region:</span><span className="tag tm">{k.region.split(' — ')[0]}</span></div>}
                    {k.phone && <div className="cc-detail"><span className="cc-detail-label">Phone:</span>{k.phone}</div>}
                    {k.email && <div className="cc-detail"><span className="cc-detail-label">Email:</span>{k.email}</div>}
                    {k.notes && <div className="cc-notes">{k.notes}</div>}
                    {/* Show linked growers */}
                    {growers.filter(g => g.contact_id === k.id).length > 0 && (
                      <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--lg)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 5 }}>Linked Growers</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {growers.filter(g => g.contact_id === k.id).map(g => (
                            <span key={g.id} className="tag tgr">{g.name.split(',')[0]}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="cc-actions">
                      <button className="bsm be" onClick={() => openEdit('contact', k)}>Edit</button>
                      <button className="bsm bd" onClick={() => del('k', k.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TRANSACTIONS */}
          {tab === 'transactions' && (
            <>
              <div className="sec-head">
                <div className="sec-title">Transactions</div>
                <button className="btn bp" onClick={() => openAdd('transaction')}>+ Add Transaction</button>
              </div>
              <div className="tw">
                <div className="ttb">
                  <input className="si" placeholder="Search..." value={tSearch} onChange={e => setTSearch(e.target.value)} />
                  <span className="sec-meta">{fT.length} records — {fmtAud(fT.reduce((s, t) => s + (Number(t.total_value) || 0), 0))}</span>
                </div>
                <table>
                  <thead><tr><th>Date</th><th>Grower</th><th>Clip</th><th>Type</th><th>c/kg clean</th><th>Total Value</th><th>Payment</th><th>Actions</th></tr></thead>
                  <tbody>
                    {fT.length === 0 && <tr><td colSpan={8}><div className="empty">No transactions found.</div></td></tr>}
                    {fT.map(t => (
                      <tr key={t.id}>
                        <td className="mono">{t.date || '-'}</td>
                        <td>{gn(t.grower_id)}</td>
                        <td className="mono">{cn(t.clip_id)}</td>
                        <td><Tag val={t.type || 'Auction'} /></td>
                        <td className="mono">{t.price_per_kg_clean ? `${t.price_per_kg_clean}c` : '-'}</td>
                        <td className="mono" style={{ color: 'var(--maroon)', fontWeight: 700 }}>{fmtAud(t.total_value)}</td>
                        <td><Tag val={t.payment_status || 'Pending'} /></td>
                        <td><div className="ra">
                          <button className="bsm be" onClick={() => openEdit('transaction', t)}>Edit</button>
                          <button className="bsm bd" onClick={() => del('t', t.id)}>Del</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'market' && <MarketTab />}

        </main>

        {modal === 'grower' && <Modal title={editId ? 'Edit Grower' : 'Add Grower'} onClose={closeModal} onSave={handleSave}><GrowerForm d={form} set={sf} contacts={contacts} /></Modal>}
        {modal === 'clip' && <Modal title={editId ? 'Edit Clip' : 'Add Clip'} onClose={closeModal} onSave={handleSave}><ClipForm d={form} set={sf} growers={growers} contacts={contacts} /></Modal>}
        {modal === 'contact' && <Modal title={editId ? 'Edit Contact' : 'Add Contact'} onClose={closeModal} onSave={handleSave}><ContactForm d={form} set={sf} /></Modal>}
        {modal === 'transaction' && <Modal title={editId ? 'Edit Transaction' : 'Add Transaction'} onClose={closeModal} onSave={handleSave}><TxForm d={form} set={sf} growers={growers} clips={clips} /></Modal>}

        {modal === 'visits' && vGrower && (
          <Modal title={`Visit Log — ${vGrower.name}`} sub={`${vGrower.property || vGrower.location} · ${vModal.length} visit${vModal.length !== 1 ? 's' : ''} on record`} onClose={closeModal} onSave={null} large>
            <div className="vadd-box">
              <div className="vadd-title">{editId ? 'Edit Visit' : '+ Log New Visit'}</div>
              <VisitForm d={form} set={sf} />
              <div className="vadd-actions">
                {editId && <button className="bg" onClick={() => { setForm({}); setEditId(null) }}>Cancel Edit</button>}
                <button className="btn bp" onClick={handleSave}>{editId ? 'Update Visit' : 'Save Visit'}</button>
              </div>
            </div>
            {vModal.length === 0
              ? <div className="empty">No visits logged yet.</div>
              : vModal.map(v => (
                <div key={v.id} className="vi">
                  <div className="vh">
                    <div className="vd">{new Date(v.date).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <Tag val={v.type} />
                  </div>
                  <div className="vn">{v.notes}</div>
                  {v.followup && <div className="vf">Follow-up: {new Date(v.followup).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>}
                  <div className="vact"><div className="ra">
                    <button className="bsm be" onClick={() => { setForm({ ...v }); setEditId(v.id) }}>Edit</button>
                    <button className="bsm bd" onClick={() => del('v', v.id)}>Delete</button>
                  </div></div>
                </div>
              ))
            }
          </Modal>
        )}

      </div>
    </>
  )
}
