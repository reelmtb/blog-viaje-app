This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## SETUP

1. install vscode
2. install node
3. install psql
4. run npm install
5. create db viaje
6. set .env connection string
7. run npx prisma migrate dev --name init
8. run npx prisma studio to view db in gui
9. create user with id '11111111-1111-1111-1111-111111111111' using gui
10. run npm run dev to run app


## BRANCHING STRATEGY

Create branches following the convention feature/'feature-name' from main. 
Once live, we will create a develop branch and use feature, release, and hotfix branches.

## AIRBNB APIS
https://www.searchapi.io/airbnb-api
https://apify.com/ecomscrape/airbnb-search-scraper/api
https://rapidapi.com/mahmudulhasandev/api/airbnb-api5

## Expedia
We need to apply to become a partner. They have a travel api, we can start a travel search in our own site and complete it in Expedia.  They have both the api and a java sdk
https://developers.expediagroup.com/travel-redirect-api/api/resources/api-explorer
https://developers.expediagroup.com/travel-redirect-api/sdk
Once a partner, here are the options:
Decide between Hosted white‑label ( they build the site with our look and feel and Expedia hosts booking flow), Widgets/Embeds (Expedia supplies JS/iframe snippets), or Full API integration (you build UI using Expedia APIs).
