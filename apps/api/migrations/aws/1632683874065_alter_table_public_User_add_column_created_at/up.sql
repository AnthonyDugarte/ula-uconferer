alter table "public"."User" add column "created_at" Timestamp
 null default now();
