# GET SOME PRAISE — *Because enough with the roasts!*

A small web app to spread positivity for developers.  
Enter GitHub username and get an AI-generated praise highlighting their skills and contributions.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components, SSR)
- **API:** [GitHub REST API](https://docs.github.com/en/rest) (for user data)
- **AI:** [Gemini API](https://ai.google.dev/) (for generating praise and titles)
- **Hosting:** [Vercel](https://vercel.com/)

---

## How It Works

### Home Page
- User enters a **GitHub username** in the input.
- The app **navigates to `/profile/[username]`** via a dynamic route.
- The username is handled **server-side** for proper **SSR**.

---

### Profile Page
- On load, the profile page **fetches all data server-side**:
  - Calls `getUser` API to get GitHub user details.
  - Passes the data as a prompt to Gemini.
  - Gemini generates:
    - ✅ A short **praise**
    - ✅ A fitting **title** for the developer.
- The user sees:
  - Avatar, bio, repos, followers, following.
  - AI-generated praise & title.

---

## API: `/api/getUser`

1. **Receives** the GitHub username.
2. **Calls** the GitHub API to get:
   - Username
   - Bio
   - Repo count
   - Followers / Following
   - Public stars count
3. **Passes** the context to Gemini with a prompt
4. **Returns** all data back to the profile page.

---

## Why SSR?
- No duplicate fetching on the client.
- Fully SEO-friendly.
- Safe to refresh the page — praise is always there.
- Gemini secrets stay **secure** on the server.
