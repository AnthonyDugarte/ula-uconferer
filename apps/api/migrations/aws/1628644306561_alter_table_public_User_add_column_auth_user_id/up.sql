alter table "public"."User" add column "auth_user_id" character varying
 not null unique;
