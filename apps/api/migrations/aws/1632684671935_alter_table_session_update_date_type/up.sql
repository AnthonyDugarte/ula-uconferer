alter table public."Session"
   alter column date type timestamptz using (date + time)::timestamptz;
