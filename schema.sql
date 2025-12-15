-- Master Moderator 101 database schema

-- 1. Groups table
create table if not exists groups (
  group_id text primary key,
  group_title text,
  subject text,
  created_at timestamptz default now()
);

-- 2. Verification rules (dynamic, per group)
create table if not exists verification_rules (
  group_id text primary key references groups(group_id) on delete cascade,
  required_videos int default 5,
  allow_links boolean default true,
  allowed_hosts text[] default array['google','dropbox','mega'],
  max_attempts int default 3,
  timeout_ms int default 300000,
  welcome_message text,
  success_message text,
  failure_message text,
  require_manual_approval boolean default false,
  updated_at timestamptz default now()
);

-- 3. Active verification sessions
create table if not exists verification_sessions (
  group_id text,
  user_id text,
  status text default 'pending',
  attempts_used int default 0,
  videos text[] default '{}',
  link text,
  expires_at timestamptz,
  created_at_ms bigint,
  updated_at_ms bigint,
  primary key (group_id, user_id)
);

-- 4. Immutable verification log
create table if not exists verifications (
  id bigserial primary key,
  group_id text,
  user_id text,
  username text,
  display_name text,
  status text,
  method text,
  attempts_used int,
  videos text[] default '{}',
  link text,
  failure_reason text,
  admin_override text,
  created_at timestamptz default now()
);

-- Prevent reused links per group
create unique index if not exists uniq_group_link
on verifications (group_id, link)
where link is not null;

-- 5. Whitelist
create table if not exists whitelist (
  group_id text,
  user_id text,
  primary key (group_id, user_id)
);

-- 6. Admin audit log
create table if not exists admin_actions (
  id bigserial primary key,
  group_id text,
  admin_id text,
  target_user_id text,
  action text,
  detail text,
  created_at timestamptz default now()
);
