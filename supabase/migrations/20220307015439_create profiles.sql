-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  created_at timestamp with time zone default NOW(),
  updated_at timestamp with time zone default NOW(),
  email text unique not null,
  first_name text,
  last_name text,

  primary key (id),
  unique(email)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;

-- inserts a row into public.users
create function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- trigger for automatic change on update_at
-- activate moddatetime in extensions before run this migration
create trigger handle_updated_at before update on profiles 
  for each row execute procedure moddatetime (updated_at);