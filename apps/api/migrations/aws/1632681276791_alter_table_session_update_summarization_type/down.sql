alter table public."Session"
   alter column summarization type varchar(500)[] using array[summarization];
