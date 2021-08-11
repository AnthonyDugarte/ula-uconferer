alter table "public"."User" alter column "password" drop not null;
alter table "public"."User" add column "password" varchar;
