alter table public."Session"
   alter column summarization type varchar(500) using coalesce(summarization[1],'');
