create extension postgis;
create type locales as enum ('en-US', 'ja-JP');

create table public.user_settings (
    id uuid primary key not null references auth.users on delete cascade,
    locale locales default 'en-US',
    location geography(point),
    longitude double precision generated always as (st_x(location::geometry)) stored,
    latitude double precision generated always as (st_y(location::geometry)) stored,
    updated_at timestamp with time zone not null default current_timestamp
);

create index user_settings_location_index on user_settings
using gist (location);

create or replace function public.update_user_settings_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create or replace trigger update_user_settings_updated_at_trigger
before update on user_settings
for each row
execute function public.update_user_settings_updated_at();

alter table public.user_settings enable row level security;

create policy "Allow authenticated users to select their own records"
on public.user_settings
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Allow authenticated users to insert their own records"
on public.user_settings
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Allow authenticated users to update their own records"
on public.user_settings
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Allow authenticated users to delete their own records"
on public.user_settings
for delete
to authenticated
using ((select auth.uid()) = id);
