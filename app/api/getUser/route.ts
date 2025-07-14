import gemini from "@/app/utils/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { name, mode } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "No name provided" }, { status: 400 });
    }

    const res = await fetch(`https://api.github.com/users/${name}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    if (!res.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const reposRes = await fetch(`https://api.github.com/users/${name}/repos?per_page=100`);

    if (!reposRes.ok) {
      throw new Error("Could not fetch repos");
    }

    const repos = await reposRes.json();
    const totalStars = repos.reduce((sum: number, repo: { stargazers_count: number}) => sum + repo.stargazers_count, 0);

    const data = await res.json();

    const context = `
      GitHub username: ${data.login}
      Bio: ${data.bio || "No bio"}
      Public Repos: ${data.public_repos}
      Followers: ${data.followers}
      Following: ${data.following}
      Stars: ${totalStars}
    `;

    const prompt = mode === "praise" ? `
      You are a witty senior developer writing:
      1) A short, authentic compliment for a GitHub developer.
      2) A creative, respectful title for them (like "Open Source Guardian", "Bug Slayer", "Code Whisperer" — max 3 words).

      Rules for the compliment:
      - Under 50 words.
      - Specific, warm, and a bit witty.
      - Mention coding or open source if possible.

      Example:
      Compliment: "Your repo garden is thriving — every pull request is another bloom for the dev community."
      Title: "Open Source Gardener"

      Now, write:
      Compliment and title for: ${context}
    ` : `
      You are a witty senior developer writing:
      1) A short, sharp roast for a GitHub developer.
      2) A creative, mocking title for them (like "Bug Breeder", "Merge Menace", "Commit Chaos" — max 3 words).

      Rules for the roast:
      - Under 50 words.
      - Clever, pointed.
      - Mention coding, commits, or open source if possible.

      Example:
      Roast: "Your repo looks like a museum of half-baked experiments — the only thing branching is your excuses."
      Title: "Commit Catastrophe"

      Now, write:
      Roast and title for: ${context}
    `
    const response = await gemini(prompt);

    const [compliment, title] = response!.split("**Title:**");
    const praise = compliment.replace("**Compliment:**", "")

    return NextResponse.json({
      avatar_url: data.avatar_url,
      bio: data.bio,
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      stars: totalStars,
      praise: praise?.trim(),
      title: title?.trim(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
