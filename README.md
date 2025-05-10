# NEW TEMPLATE PROJECT #

This repository is a reusable template for creating Next.js sites with Supabase, configured via JSON in a Supabase `site_configs` table.

## Initial Setup
1. 
  
  (1.1) Create New Repository in Git
        [x] New Project name -> Public -> Init w/ README.md & .gitignore (node)

  (1.2) Copy project to new local directory && Open Cursor in new directory
        [ ] (In Template Terminal) Run: cp -r . /c/Users/J/OneDrive/Desktop/Sites/[NEW-SITE-PROJECT-DIRECTORY]
        [ ] Right Click Directory -> More Options -> |OPEN WITH CURSOR|

  (1.3) Edit package.json file  name/description
        [ ] Change the name:        "name": "templatesoite",
        [ ] Change the description: "description": "AutoSite Template Site",
        [ ] IN TERMINAL, Run: rm -rf node_modules package-lock.json
        [ ] ->                npm install
        [ ] ->                npm run dev
        [ ] *GO TO: localhost:3000 to test running*
        [ ] *In terminal, Ctrl+C to kill the terminal*

  (1.4) Initialize Git 
        [ ] IN TERMINAL RUN: git remote set-url origin https://github.com/savannah-io/[NEW-SITE-PROJECT-DIRECTORY]
        [ ] ->             : git remote -v (to check status) 
        [ ] GITHUB DT      : Commit Changes to main Branch ( Push Changes )
        [ ] *Check Github to make sure changes were pushed*





## Supabase Configuration
2. Create Supabase Project:

  (2.1) Enter Supabase Credentials Into .env & .env.local
        [ ] NEXT_PUBLIC_SUPABASE_URL=https://[NEW-SUPABASE-URL].supabase.co
        [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY=[NEW-ANON-KEY]

  (2.2) Update the SITE ID /src/app/config/page.js
        [ ] const SITE_ID = '[templatesoite]';

  (2.3) Run Supabase SQL
        [ ] *RUN THE BELOW SQL IN THE SQL EDITOR*

    create table public.site_configs (
  id uuid not null default gen_random_uuid (),
  site_key text not null,
  config jsonb not null,
  constraint site_configs_pkey primary key (id),
  constraint site_configs_site_key_key unique (site_key)
) TABLESPACE pg_default;    

        [ ] **RUN THE ABOVE SQL IN THE SQL EDITOR**

  (2.4) Run Supabase SQL
        [ ] *RUN THE BELOW SQL IN THE SQL EDITOR*

    insert into site_configs (site_key, config) values (
  '[NEW-PROJECT-NAME]',
  '{
    "siteTitle": "My Site",
    "description": "A description",
    "logo": "",
    "address": "",
    "phone": "",
    "email": "",
    "navLinks": [],
    "footerLinks": [],
    "socialLinks": { "instagram": "", "facebook": "", "linkedin": "", "twitter": "" },
    "theme": { "primary600": "", "primary700": "" },
    "schedulingButtonText": "",
    "pages": {
      "Home": { "title": "", "heroImage": "", "content": "" },
      "Services": { "title": "", "heroImage": "", "content": "", "services": [] },
      "Reviews": { "title": "", "heroImage": "", "content": "" },
      "Contact": { "title": "", "heroImage": "", "content": "" }
    },
    "policies": { "privacy": "", "terms": "" }
  }'::jsonb
);   

        [ ] *RUN THE ABOVE SQL IN THE SQL EDITOR*

  (2.5) Insert
        [ ] Change the name:        "name": "templatesoite",
        [ ] Change the description: "description": "AutoSite Template Site",
        [ ] IN TERMINAL, Run: rm -rf node_modules package-lock.json
        [ ] ->                npm install
        [ ] ->                npm run dev
        [ ] *GO TO: localhost:3000 to test running*
        
        