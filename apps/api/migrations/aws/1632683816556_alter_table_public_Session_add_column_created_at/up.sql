alter table "public"."Session" add column "created_at" timestamptz
 null default now();
