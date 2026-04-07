-- ============================================================
-- WOOL BUYER CRM — Supabase Database Setup
-- Run this entire script in: Supabase → SQL Editor → New Query
-- ============================================================

-- Brokers & Agents
create table brokers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  company text,
  phone text,
  email text,
  region text,
  type text default 'Broker',
  notes text,
  created_at timestamptz default now()
);

-- Wool Growers
create table growers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  property text,
  location text,
  state text,
  phone text,
  email text,
  annual_bales integer,
  breed text,
  broker_id uuid references brokers(id) on delete set null,
  status text default 'Active',
  notes text,
  created_at timestamptz default now()
);

-- Clips & Consignments
create table clips (
  id uuid default gen_random_uuid() primary key,
  grower_id uuid references growers(id) on delete cascade,
  broker_id uuid references brokers(id) on delete set null,
  lot text,
  season text,
  bales integer,
  micron numeric(5,1),
  yield_pct numeric(5,1),
  weight_kg numeric(10,1),
  sale_date date,
  status text default 'Pending',
  notes text,
  created_at timestamptz default now()
);

-- Transactions
create table transactions (
  id uuid default gen_random_uuid() primary key,
  grower_id uuid references growers(id) on delete set null,
  clip_id uuid references clips(id) on delete set null,
  broker_id uuid references brokers(id) on delete set null,
  date date,
  price_per_kg_clean numeric(8,1),
  total_value numeric(12,2),
  payment_status text default 'Pending',
  type text default 'Auction',
  notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- Allow public access (for internal tool use with anon key)
-- ============================================================
alter table brokers enable row level security;
alter table growers enable row level security;
alter table clips enable row level security;
alter table transactions enable row level security;

create policy "Allow all" on brokers for all using (true) with check (true);
create policy "Allow all" on growers for all using (true) with check (true);
create policy "Allow all" on clips for all using (true) with check (true);
create policy "Allow all" on transactions for all using (true) with check (true);
