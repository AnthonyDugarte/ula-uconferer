alter table public."Session"
    RENAME column date to start_at;

alter table public."Session"
    add column end_at timestamptz;
