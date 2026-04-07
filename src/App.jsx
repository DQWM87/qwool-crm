import { useState, useEffect } from 'react'

// ─── Demo seed data ───────────────────────────────────────────────────────────
const DEMO_BROKERS = [
  { id: 'b1', name: 'James Hartley', company: 'Elders', type: 'Broker', region: 'South East SA', phone: '0488 111 222', email: 'j.hartley@elders.com.au', notes: '', created_at: '2025-03-01T00:00:00Z' },
  { id: 'b2', name: 'Sue Patten', company: 'Nutrien Ag', type: 'Agent', region: 'South West VIC', phone: '0477 333 444', email: 's.patten@nutrien.com.au', notes: '', created_at: '2025-03-02T00:00:00Z' },
  { id: 'b3', name: 'Troy Noonan', company: 'AWN', type: 'Wool Classer', region: 'Naracoorte', phone: '0455 666 777', email: 'troy@awn.com.au', notes: 'Highly regarded in the district', created_at: '2025-03-05T00:00:00Z' },
]

const DEMO_GROWERS = [
  { id: 'g1', name: 'Henderson, Rob', property: 'Wirrabara Station', location: 'Naracoorte', state: 'SA', phone: '0412 555 100', email: 'rob@wirrabara.com.au', annual_bales: 320, breed: 'Merino', broker_id: 'b1', status: 'Active', notes: 'Long term grower, consistent 19µ clip', created_at: '2025-03-10T00:00:00Z' },
  { id: 'g2', name: 'McAllister, Fiona', property: 'Dundonald Park', location: 'Hamilton', state: 'VIC', phone: '0418 222 300', email: 'fi@dundonald.com.au', annual_bales: 180, breed: 'Corriedale', broker_id: 'b2', status: 'Active', notes: '', created_at: '2025-03-12T00:00:00Z' },
  { id: 'g3', name: 'Tulloch, Brett', property: 'Blue Range', location: 'Casterton', state: 'VIC', phone: '0400 888 200', email: '', annual_bales: 95, breed: 'Merino X', broker_id: 'b1', status: 'Active', notes: 'First season with us', created_at: '2025-03-18T00:00:00Z' },
  { id: 'g4', name: 'Payne, Gary', property: 'Moolort Downs', location: 'Penola', state: 'SA', phone: '0422 100 400', email: 'gary@moolort.com.au', annual_bales: 410, breed: 'Merino', broker_id: 'b3', status: 'Active', notes: 'Top end 17.5µ — priority grower', created_at: '2025-04-01T00:00:00Z' },
  { id: 'g5', name: 'Drummond, Alice', property: 'Esperance Run', location: 'Portland', state: 'VIC', phone: '0411 900 300', email: 'alice@esperancerun.com', annual_bales: 60, breed: 'Polwarth', broker_id: 'b2', status: 'Prospect', notes: 'Met at field day — follow up April', created_at: '2025-04-03T00:00:00Z' },
]

const DEMO_CLIPS = [
  { id: 'c1', grower_id: 'g1', broker_id: 'b1', lot: 'LOT-2025-001', season: '2024–25', bales: 318, micron: 19.2, yield_pct: 71.5, weight_kg: 14200, sale_date: '2025-03-14', status: 'Sold', notes: 'Excellent preparation', created_at: '2025-03-13T00:00:00Z' },
  { id: 'c2', grower_id: 'g2', broker_id: 'b2', lot: 'LOT-2025-002', season: '2024–25', bales: 175, micron: 27.8, yield_pct: 68.0, weight_kg: 7800, sale_date: '2025-03-21', status: 'Sold', notes: '', created_at: '2025-03-20T00:00:00Z' },
  { id: 'c3', grower_id: 'g4', broker_id: 'b3', lot: 'LOT-2025-003', season: '2024–25', bales: 405, micron: 17.5, yield_pct: 74.2, weight_kg: 18900, sale_date: '2025-04-04', status: 'Sold', notes: 'Premium line — strong bidding', created_at: '2025-04-03T00:00:00Z' },
  { id: 'c4', grower_id: 'g3', broker_id: 'b1', lot: 'LOT-2025-004', season: '2024–25', bales: 92, micron: 22.1, yield_pct: 69.5, weight_kg: 4100, sale_date: null, status: 'Pending', notes: 'Awaiting classing', created_at: '2025-04-05T00:00:00Z' },
  { id: 'c5', grower_id: 'g5', broker_id: 'b2', lot: 'LOT-2025-005', season: '2024–25', bales: 58, micron: 24.0, yield_pct: 66.0, weight_kg: 2600, sale_date: null, status: 'Pending', notes: '', created_at: '2025-04-06T00:00:00Z' },
]

const DEMO_TRANSACTIONS = [
  { id: 't1', grower_id: 'g1', clip_id: 'c1', broker_id: 'b1', date: '2025-03-14', price_per_kg_clean: 1285, total_value: 131420.50, payment_status: 'Paid', type: 'Auction', notes: '', created_at: '2025-03-14T00:00:00Z' },
  { id: 't2', grower_id: 'g2', clip_id: 'c2', broker_id: 'b2', date: '2025-03-21', price_per_kg_clean: 890, total_value: 47124.00, payment_status: 'Paid', type: 'Auction', notes: '', created_at: '2025-03-21T00:00:00Z' },
  { id: 't3', grower_id: 'g4', clip_id: 'c3', broker_id: 'b3', date: '2025-04-04', price_per_kg_clean: 1640, total_value: 229716.00, payment_status: 'Pending', type: 'Private Treaty', notes: 'Forward contract negotiated direct', created_at: '2025-04-04T00:00:00Z' },
]

// ─── Storage (localStorage for demo persistence) ───────────────────────────────
const LS = {
  get: (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback } catch { return fallback } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
}

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)
const fmt = (n) => n == null ? '—' : Number(n).toLocaleString('en-AU')
const fmtAud = (n) => n == null ? '—' : '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #1a1208; --parchment: #f5efe2; --warm: #e8dcc8; --tan: #c9b99a;
    --rust: #8b4513; --gold: #c47c20; --cream: #faf7f0; --mid: #7a6a52; --light: #ede4d4;
  }
  body { background: var(--parchment); color: var(--ink); font-family: 'Source Serif 4', Georgia, serif; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  .header { background: var(--ink); padding: 18px 32px; display: flex; align-items: center; gap: 16px; border-bottom: 3px solid var(--gold); }
  .header-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--parchment); }
  .header-sub { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--tan); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }
  .demo-banner { background: var(--gold); color: var(--ink); text-align: center; padding: 7px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.08em; font-weight: 500; }
  .nav { background: var(--warm); border-bottom: 2px solid var(--tan); display: flex; padding: 0 24px; overflow-x: auto; }
  .nav-btn { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--mid); background: none; border: none; border-bottom: 3px solid transparent; padding: 14px 20px; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
  .nav-btn:hover { color: var(--rust); }
  .nav-btn.active { color: var(--rust); border-bottom-color: var(--rust); }
  .main { flex: 1; padding: 28px 32px; max-width: 1300px; width: 100%; margin: 0 auto; }
  .section-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--ink); }
  .section-meta { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--mid); }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .card { background: var(--cream); border: 1.5px solid var(--tan); border-radius: 4px; padding: 20px 22px; position: relative; overflow: hidden; }
  .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gold); }
  .card-label { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mid); margin-bottom: 8px; }
  .card-value { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--rust); }
  .card-sub { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--tan); margin-top: 4px; }
  .table-wrap { background: var(--cream); border: 1.5px solid var(--tan); border-radius: 4px; overflow: hidden; }
  .table-toolbar { padding: 14px 20px; background: var(--light); border-bottom: 1.5px solid var(--tan); display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .search-input { font-family: 'IBM Plex Mono', monospace; font-size: 12px; border: 1.5px solid var(--tan); background: var(--cream); color: var(--ink); padding: 7px 12px; border-radius: 3px; width: 240px; outline: none; }
  .search-input:focus { border-color: var(--rust); }
  .search-input::placeholder { color: var(--tan); }
  table { width: 100%; border-collapse: collapse; }
  th { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mid); background: var(--light); padding: 11px 16px; text-align: left; border-bottom: 1.5px solid var(--tan); }
  td { font-size: 14px; color: var(--ink); padding: 12px 16px; border-bottom: 1px solid var(--warm); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--light); }
  .mono { font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
  .tag { display: inline-block; font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 2px; text-transform: uppercase; }
  .tag-green { background: #dff0d8; color: #3a6a2a; }
  .tag-gold { background: #fdf0cc; color: #8a5a00; }
  .tag-grey { background: var(--warm); color: var(--mid); }
  .tag-rust { background: #f5ddd0; color: var(--rust); }
  .tag-blue { background: #d0e8f5; color: #1a5276; }
  .btn { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 9px 18px; border-radius: 3px; cursor: pointer; border: none; transition: all 0.15s; }
  .btn-primary { background: var(--rust); color: var(--parchment); }
  .btn-primary:hover { background: #6b340e; }
  .btn-ghost { background: none; border: 1.5px solid var(--tan); color: var(--mid); }
  .btn-ghost:hover { border-color: var(--rust); color: var(--rust); }
  .btn-danger { background: none; border: 1.5px solid #c0392b; color: #c0392b; font-size: 11px; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-family: 'IBM Plex Mono', monospace; transition: all 0.15s; }
  .btn-danger:hover { background: #c0392b; color: white; }
  .btn-edit { background: none; border: 1.5px solid var(--tan); color: var(--mid); font-size: 11px; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-family: 'IBM Plex Mono', monospace; transition: all 0.15s; }
  .btn-edit:hover { border-color: var(--gold); color: var(--gold); }
  .modal-bg { position: fixed; inset: 0; background: rgba(26,18,8,0.6); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
  .modal { background: var(--cream); border: 2px solid var(--tan); border-top: 4px solid var(--rust); border-radius: 4px; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; padding: 28px 32px; }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 24px; color: var(--ink); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field { display: flex; flex-direction: column; gap: 5px; }
  .field.span2 { grid-column: span 2; }
  label { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mid); }
  input, select, textarea { font-family: 'Source Serif 4', serif; font-size: 14px; color: var(--ink); background: var(--parchment); border: 1.5px solid var(--tan); border-radius: 3px; padding: 8px 11px; outline: none; width: 100%; transition: border-color 0.15s; }
  input:focus, select:focus, textarea:focus { border-color: var(--rust); }
  textarea { resize: vertical; min-height: 72px; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }
  .empty { text-align: center; padding: 48px 20px; color: var(--tan); font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.08em; }
  .activity-item { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-bottom: 1px solid var(--warm); font-size: 13px; }
  .activity-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .activity-text { flex: 1; }
  .activity-time { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--tan); }
  .row-actions { display: flex; gap: 6px; }
  @media (max-width: 640px) { .main { padding: 16px; } .form-grid { grid-template-columns: 1fr; } .field.span2 { grid-column: span 1; } .cards { grid-template-columns: 1fr 1fr; } }
`

function StatusTag({ val }) {
  const map = { Active: 'tag-green', Sold: 'tag-green', Paid: 'tag-green', Prospect: 'tag-gold', Pending: 'tag-gold', Partial: 'tag-gold', Inactive: 'tag-grey', 'Passed In': 'tag-rust', 'Private Sale': 'tag-grey', Broker: 'tag-blue', Agent: 'tag-blue', 'Wool Classer': 'tag-gold' }
  return <span className={`tag ${map[val] || 'tag-grey'}`}>{val}</span>
}

function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{title}</div>
        {children}
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save Record</button>
        </div>
      </div>
    </div>
  )
}

function GrowerForm({ data, onChange, brokers }) {
  return (
    <div className="form-grid">
      <div className="field"><label>Grower Name *</label><input value={data.name || ''} onChange={e => onChange('name', e.target.value)} /></div>
      <div className="field"><label>Property / Station</label><input value={data.property || ''} onChange={e => onChange('property', e.target.value)} /></div>
      <div className="field"><label>Location</label><input value={data.location || ''} onChange={e => onChange('location', e.target.value)} /></div>
      <div className="field"><label>State</label>
        <select value={data.state || ''} onChange={e => onChange('state', e.target.value)}>
          <option value="">— Select —</option>
          {['SA','VIC','NSW','QLD','WA','TAS','NT','ACT'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field"><label>Phone</label><input value={data.phone || ''} onChange={e => onChange('phone', e.target.value)} /></div>
      <div className="field"><label>Email</label><input value={data.email || ''} onChange={e => onChange('email', e.target.value)} /></div>
      <div className="field"><label>Annual Bales</label><input type="number" value={data.annual_bales || ''} onChange={e => onChange('annual_bales', e.target.value)} /></div>
      <div className="field"><label>Breed</label><input value={data.breed || ''} onChange={e => onChange('breed', e.target.value)} /></div>
      <div className="field"><label>Linked Broker</label>
        <select value={data.broker_id || ''} onChange={e => onChange('broker_id', e.target.value)}>
          <option value="">— None —</option>
          {brokers.map(b => <option key={b.id} value={b.id}>{b.name} — {b.company}</option>)}
        </select>
      </div>
      <div className="field"><label>Status</label>
        <select value={data.status || 'Active'} onChange={e => onChange('status', e.target.value)}>
          <option>Active</option><option>Inactive</option><option>Prospect</option>
        </select>
      </div>
      <div className="field span2"><label>Notes</label><textarea value={data.notes || ''} onChange={e => onChange('notes', e.target.value)} /></div>
    </div>
  )
}

function ClipForm({ data, onChange, growers, brokers }) {
  return (
    <div className="form-grid">
      <div className="field"><label>Grower *</label>
        <select value={data.grower_id || ''} onChange={e => onChange('grower_id', e.target.value)}>
          <option value="">— Select —</option>
          {growers.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      <div className="field"><label>Lot / Ref</label><input value={data.lot || ''} onChange={e => onChange('lot', e.target.value)} /></div>
      <div className="field"><label>Season</label><input value={data.season || ''} onChange={e => onChange('season', e.target.value)} placeholder="2024–25" /></div>
      <div className="field"><label>Bales</label><input type="number" value={data.bales || ''} onChange={e => onChange('bales', e.target.value)} /></div>
      <div className="field"><label>Micron (µ)</label><input type="number" step="0.1" value={data.micron || ''} onChange={e => onChange('micron', e.target.value)} /></div>
      <div className="field"><label>Yield (%)</label><input type="number" step="0.1" value={data.yield_pct || ''} onChange={e => onChange('yield_pct', e.target.value)} /></div>
      <div className="field"><label>Weight (kg greasy)</label><input type="number" value={data.weight_kg || ''} onChange={e => onChange('weight_kg', e.target.value)} /></div>
      <div className="field"><label>Sale Date</label><input type="date" value={data.sale_date || ''} onChange={e => onChange('sale_date', e.target.value)} /></div>
      <div className="field"><label>Broker</label>
        <select value={data.broker_id || ''} onChange={e => onChange('broker_id', e.target.value)}>
          <option value="">— None —</option>
          {brokers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      <div className="field"><label>Status</label>
        <select value={data.status || 'Pending'} onChange={e => onChange('status', e.target.value)}>
          <option>Pending</option><option>Sold</option><option>Passed In</option><option>Private Sale</option>
        </select>
      </div>
      <div className="field span2"><label>Notes</label><textarea value={data.notes || ''} onChange={e => onChange('notes', e.target.value)} /></div>
    </div>
  )
}

function BrokerForm({ data, onChange }) {
  return (
    <div className="form-grid">
      <div className="field"><label>Name *</label><input value={data.name || ''} onChange={e => onChange('name', e.target.value)} /></div>
      <div className="field"><label>Company</label><input value={data.company || ''} onChange={e => onChange('company', e.target.value)} /></div>
      <div className="field"><label>Phone</label><input value={data.phone || ''} onChange={e => onChange('phone', e.target.value)} /></div>
      <div className="field"><label>Email</label><input value={data.email || ''} onChange={e => onChange('email', e.target.value)} /></div>
      <div className="field"><label>Region</label><input value={data.region || ''} onChange={e => onChange('region', e.target.value)} /></div>
      <div className="field"><label>Type</label>
        <select value={data.type || 'Broker'} onChange={e => onChange('type', e.target.value)}>
          <option>Broker</option><option>Agent</option><option>Wool Classer</option><option>Other</option>
        </select>
      </div>
      <div className="field span2"><label>Notes</label><textarea value={data.notes || ''} onChange={e => onChange('notes', e.target.value)} /></div>
    </div>
  )
}

function TxForm({ data, onChange, growers, clips, brokers }) {
  const filteredClips = data.grower_id ? clips.filter(c => c.grower_id === data.grower_id) : clips
  return (
    <div className="form-grid">
      <div className="field"><label>Grower</label>
        <select value={data.grower_id || ''} onChange={e => { onChange('grower_id', e.target.value); onChange('clip_id', '') }}>
          <option value="">— Select —</option>
          {growers.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      <div className="field"><label>Clip</label>
        <select value={data.clip_id || ''} onChange={e => onChange('clip_id', e.target.value)}>
          <option value="">— Select —</option>
          {filteredClips.map(c => <option key={c.id} value={c.id}>{c.lot} — {c.bales} bales</option>)}
        </select>
      </div>
      <div className="field"><label>Date</label><input type="date" value={data.date || ''} onChange={e => onChange('date', e.target.value)} /></div>
      <div className="field"><label>Broker</label>
        <select value={data.broker_id || ''} onChange={e => onChange('broker_id', e.target.value)}>
          <option value="">— None —</option>
          {brokers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      <div className="field"><label>Price (¢/kg clean)</label><input type="number" step="0.1" value={data.price_per_kg_clean || ''} onChange={e => onChange('price_per_kg_clean', e.target.value)} /></div>
      <div className="field"><label>Total Value ($AUD)</label><input type="number" step="0.01" value={data.total_value || ''} onChange={e => onChange('total_value', e.target.value)} /></div>
      <div className="field"><label>Payment Status</label>
        <select value={data.payment_status || 'Pending'} onChange={e => onChange('payment_status', e.target.value)}>
          <option>Pending</option><option>Paid</option><option>Partial</option>
        </select>
      </div>
      <div className="field"><label>Sale Type</label>
        <select value={data.type || 'Auction'} onChange={e => onChange('type', e.target.value)}>
          <option>Auction</option><option>Private Treaty</option><option>Forward Contract</option>
        </select>
      </div>
      <div className="field span2"><label>Notes</label><textarea value={data.notes || ''} onChange={e => onChange('notes', e.target.value)} /></div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [growers, setGrowers] = useState(() => LS.get('demo_growers', DEMO_GROWERS))
  const [clips, setClips] = useState(() => LS.get('demo_clips', DEMO_CLIPS))
  const [brokers, setBrokers] = useState(() => LS.get('demo_brokers', DEMO_BROKERS))
  const [transactions, setTransactions] = useState(() => LS.get('demo_transactions', DEMO_TRANSACTIONS))
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')

  const persist = (key, setter, data) => { setter(data); LS.set(key, data) }

  const openAdd = (type) => { setModal(type); setForm({}); setEditId(null) }
  const openEdit = (type, item) => { setModal(type); setForm({ ...item }); setEditId(item.id) }
  const closeModal = () => { setModal(null); setForm({}); setEditId(null) }
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    const now = new Date().toISOString()
    if (modal === 'grower') {
      if (!form.name) return alert('Name required')
      const updated = editId ? growers.map(g => g.id === editId ? { ...form } : g) : [...growers, { ...form, id: uid(), created_at: now }]
      persist('demo_growers', setGrowers, updated)
    } else if (modal === 'clip') {
      if (!form.grower_id) return alert('Select a grower')
      const updated = editId ? clips.map(c => c.id === editId ? { ...form } : c) : [...clips, { ...form, id: uid(), created_at: now }]
      persist('demo_clips', setClips, updated)
    } else if (modal === 'broker') {
      if (!form.name) return alert('Name required')
      const updated = editId ? brokers.map(b => b.id === editId ? { ...form } : b) : [...brokers, { ...form, id: uid(), created_at: now }]
      persist('demo_brokers', setBrokers, updated)
    } else if (modal === 'transaction') {
      const updated = editId ? transactions.map(t => t.id === editId ? { ...form } : t) : [...transactions, { ...form, id: uid(), created_at: now }]
      persist('demo_transactions', setTransactions, updated)
    }
    closeModal()
  }

  const handleDelete = (type, id) => {
    if (!window.confirm('Delete this record?')) return
    if (type === 'grower') persist('demo_growers', setGrowers, growers.filter(g => g.id !== id))
    else if (type === 'clip') persist('demo_clips', setClips, clips.filter(c => c.id !== id))
    else if (type === 'broker') persist('demo_brokers', setBrokers, brokers.filter(b => b.id !== id))
    else if (type === 'transaction') persist('demo_transactions', setTransactions, transactions.filter(t => t.id !== id))
  }

  const growerName = id => { const g = growers.find(x => x.id === id); return g ? g.name : '—' }
  const brokerLabel = id => { const b = brokers.find(x => x.id === id); return b ? b.name : '—' }
  const clipLabel = id => { const c = clips.find(x => x.id === id); return c ? (c.lot || c.id.slice(-6)) : '—' }

  const totalBales = clips.reduce((s, c) => s + (Number(c.bales) || 0), 0)
  const totalTxValue = transactions.reduce((s, t) => s + (Number(t.total_value) || 0), 0)
  const pendingBales = clips.filter(c => c.status === 'Pending').reduce((s, c) => s + (Number(c.bales) || 0), 0)

  const q = search.toLowerCase()
  const filteredGrowers = growers.filter(g => !q || [g.name, g.property, g.location, g.breed, g.state].join(' ').toLowerCase().includes(q))
  const filteredClips = clips.filter(c => !q || [c.lot, growerName(c.grower_id), c.season, String(c.micron)].join(' ').toLowerCase().includes(q))
  const filteredBrokers = brokers.filter(b => !q || [b.name, b.company, b.region, b.type].join(' ').toLowerCase().includes(q))
  const filteredTx = transactions.filter(t => !q || [growerName(t.grower_id), clipLabel(t.clip_id), t.type, t.date].join(' ').toLowerCase().includes(q))

  const TABS = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'growers', label: `Growers (${growers.length})` },
    { id: 'clips', label: `Clips (${clips.length})` },
    { id: 'brokers', label: `Brokers & Agents (${brokers.length})` },
    { id: 'transactions', label: `Transactions (${transactions.length})` },
  ]

  const recentActivity = [
    ...growers.slice(0, 3).map(g => ({ label: `New grower: ${g.name}${g.property ? ' — ' + g.property : ''}`, time: g.created_at, type: 'Grower' })),
    ...clips.slice(0, 3).map(c => ({ label: `Clip: ${c.lot} — ${growerName(c.grower_id)} (${c.bales} bales)`, time: c.created_at, type: 'Clip' })),
    ...transactions.slice(0, 2).map(t => ({ label: `Transaction: ${growerName(t.grower_id)} — ${fmtAud(t.total_value)}`, time: t.created_at, type: 'Tx' })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8)

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <span style={{ fontSize: 28 }}>🐑</span>
          <div>
            <div className="header-title">Wool Buyer CRM</div>
            <div className="header-sub">Internal Staff Portal</div>
          </div>
        </header>
        <div className="demo-banner">⚡ DEMO MODE — Sample data loaded. All changes save locally in your browser.</div>

        <nav className="nav">
          {TABS.map(t => (
            <button key={t.id} className={`nav-btn${tab === t.id ? ' active' : ''}`} onClick={() => { setTab(t.id); setSearch('') }}>{t.label}</button>
          ))}
        </nav>

        <main className="main">

          {tab === 'dashboard' && (
            <>
              <div className="section-head"><div className="section-title">Overview</div><div className="section-meta">2024–25 season</div></div>
              <div className="cards">
                <div className="card"><div className="card-label">Total Growers</div><div className="card-value">{growers.length}</div><div className="card-sub">{growers.filter(g => g.status === 'Active').length} active</div></div>
                <div className="card"><div className="card-label">Total Bales</div><div className="card-value">{fmt(totalBales)}</div><div className="card-sub">{fmt(pendingBales)} pending sale</div></div>
                <div className="card"><div className="card-label">Clips on Record</div><div className="card-value">{clips.length}</div><div className="card-sub">{clips.filter(c => c.status === 'Sold').length} sold</div></div>
                <div className="card"><div className="card-label">Transaction Value</div><div className="card-value" style={{ fontSize: 22 }}>{fmtAud(totalTxValue)}</div><div className="card-sub">{transactions.length} transactions</div></div>
                <div className="card"><div className="card-label">Brokers & Agents</div><div className="card-value">{brokers.length}</div><div className="card-sub">&nbsp;</div></div>
              </div>
              <div className="section-head"><div className="section-title" style={{ fontSize: 18 }}>Recent Activity</div></div>
              <div className="table-wrap">
                {recentActivity.map((item, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-dot" />
                    <div className="activity-text">{item.label}</div>
                    <span className="tag tag-grey">{item.type}</span>
                    <div className="activity-time">{item.time ? new Date(item.time).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }) : ''}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'growers' && (
            <>
              <div className="section-head"><div className="section-title">Wool Growers</div><button className="btn btn-primary" onClick={() => openAdd('grower')}>+ Add Grower</button></div>
              <div className="table-wrap">
                <div className="table-toolbar">
                  <input className="search-input" placeholder="Search growers…" value={search} onChange={e => setSearch(e.target.value)} />
                  <span className="section-meta">{filteredGrowers.length} records</span>
                </div>
                <table>
                  <thead><tr><th>Name</th><th>Property</th><th>Location</th><th>Annual Bales</th><th>Breed</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredGrowers.length === 0 && <tr><td colSpan={7}><div className="empty">No growers found.</div></td></tr>}
                    {filteredGrowers.map(g => (
                      <tr key={g.id}>
                        <td><strong>{g.name}</strong>{g.phone && <div className="mono" style={{ color: 'var(--mid)', marginTop: 2 }}>{g.phone}</div>}</td>
                        <td>{g.property || '—'}</td>
                        <td>{[g.location, g.state].filter(Boolean).join(', ') || '—'}</td>
                        <td className="mono">{fmt(g.annual_bales)}</td>
                        <td>{g.breed || '—'}</td>
                        <td><StatusTag val={g.status || 'Active'} /></td>
                        <td><div className="row-actions"><button className="btn-edit" onClick={() => openEdit('grower', g)}>Edit</button><button className="btn-danger" onClick={() => handleDelete('grower', g.id)}>Del</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'clips' && (
            <>
              <div className="section-head"><div className="section-title">Clips & Consignments</div><button className="btn btn-primary" onClick={() => openAdd('clip')}>+ Add Clip</button></div>
              <div className="table-wrap">
                <div className="table-toolbar">
                  <input className="search-input" placeholder="Search clips…" value={search} onChange={e => setSearch(e.target.value)} />
                  <span className="section-meta">{filteredClips.length} records</span>
                </div>
                <table>
                  <thead><tr><th>Lot</th><th>Grower</th><th>Season</th><th>Bales</th><th>Micron</th><th>Yield %</th><th>Sale Date</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredClips.length === 0 && <tr><td colSpan={9}><div className="empty">No clips found.</div></td></tr>}
                    {filteredClips.map(c => (
                      <tr key={c.id}>
                        <td className="mono">{c.lot || c.id.slice(-6)}</td>
                        <td>{growerName(c.grower_id)}</td>
                        <td className="mono">{c.season || '—'}</td>
                        <td className="mono">{fmt(c.bales)}</td>
                        <td className="mono">{c.micron ? `${c.micron}µ` : '—'}</td>
                        <td className="mono">{c.yield_pct ? `${c.yield_pct}%` : '—'}</td>
                        <td className="mono">{c.sale_date || '—'}</td>
                        <td><StatusTag val={c.status || 'Pending'} /></td>
                        <td><div className="row-actions"><button className="btn-edit" onClick={() => openEdit('clip', c)}>Edit</button><button className="btn-danger" onClick={() => handleDelete('clip', c.id)}>Del</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'brokers' && (
            <>
              <div className="section-head"><div className="section-title">Brokers & Agents</div><button className="btn btn-primary" onClick={() => openAdd('broker')}>+ Add Broker</button></div>
              <div className="table-wrap">
                <div className="table-toolbar">
                  <input className="search-input" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
                  <span className="section-meta">{filteredBrokers.length} records</span>
                </div>
                <table>
                  <thead><tr><th>Name</th><th>Company</th><th>Type</th><th>Region</th><th>Phone</th><th>Email</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredBrokers.length === 0 && <tr><td colSpan={7}><div className="empty">No brokers found.</div></td></tr>}
                    {filteredBrokers.map(b => (
                      <tr key={b.id}>
                        <td><strong>{b.name}</strong></td>
                        <td>{b.company || '—'}</td>
                        <td><StatusTag val={b.type || 'Broker'} /></td>
                        <td>{b.region || '—'}</td>
                        <td className="mono">{b.phone || '—'}</td>
                        <td className="mono" style={{ fontSize: 12 }}>{b.email || '—'}</td>
                        <td><div className="row-actions"><button className="btn-edit" onClick={() => openEdit('broker', b)}>Edit</button><button className="btn-danger" onClick={() => handleDelete('broker', b.id)}>Del</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'transactions' && (
            <>
              <div className="section-head"><div className="section-title">Transactions</div><button className="btn btn-primary" onClick={() => openAdd('transaction')}>+ Add Transaction</button></div>
              <div className="table-wrap">
                <div className="table-toolbar">
                  <input className="search-input" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
                  <span className="section-meta">{filteredTx.length} records · {fmtAud(filteredTx.reduce((s, t) => s + (Number(t.total_value) || 0), 0))}</span>
                </div>
                <table>
                  <thead><tr><th>Date</th><th>Grower</th><th>Clip</th><th>Type</th><th>¢/kg clean</th><th>Total Value</th><th>Broker</th><th>Payment</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredTx.length === 0 && <tr><td colSpan={9}><div className="empty">No transactions found.</div></td></tr>}
                    {filteredTx.map(t => (
                      <tr key={t.id}>
                        <td className="mono">{t.date || '—'}</td>
                        <td>{growerName(t.grower_id)}</td>
                        <td className="mono">{clipLabel(t.clip_id)}</td>
                        <td>{t.type || '—'}</td>
                        <td className="mono">{t.price_per_kg_clean ? `${t.price_per_kg_clean}¢` : '—'}</td>
                        <td className="mono" style={{ color: 'var(--rust)', fontWeight: 600 }}>{fmtAud(t.total_value)}</td>
                        <td>{brokerLabel(t.broker_id)}</td>
                        <td><StatusTag val={t.payment_status || 'Pending'} /></td>
                        <td><div className="row-actions"><button className="btn-edit" onClick={() => openEdit('transaction', t)}>Edit</button><button className="btn-danger" onClick={() => handleDelete('transaction', t.id)}>Del</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>

        {modal === 'grower' && <Modal title={editId ? 'Edit Grower' : 'Add Grower'} onClose={closeModal} onSave={handleSave}><GrowerForm data={form} onChange={setField} brokers={brokers} /></Modal>}
        {modal === 'clip' && <Modal title={editId ? 'Edit Clip' : 'Add Clip'} onClose={closeModal} onSave={handleSave}><ClipForm data={form} onChange={setField} growers={growers} brokers={brokers} /></Modal>}
        {modal === 'broker' && <Modal title={editId ? 'Edit Broker' : 'Add Broker'} onClose={closeModal} onSave={handleSave}><BrokerForm data={form} onChange={setField} /></Modal>}
        {modal === 'transaction' && <Modal title={editId ? 'Edit Transaction' : 'Add Transaction'} onClose={closeModal} onSave={handleSave}><TxForm data={form} onChange={setField} growers={growers} clips={clips} brokers={brokers} /></Modal>}
      </div>
    </>
  )
}
