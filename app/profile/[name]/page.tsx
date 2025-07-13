import Image from "next/image";
import { Folder, Github, Quote, Star, User, Users } from "lucide-react";
import Link from "next/link";
import Markdown from 'react-markdown'

function Card({ icon, title, number }: { icon: React.ReactNode; title: string; number: number }) {
  return (
    <div className="border border-blue-500 bg-blue-600/20 rounded-xl p-4 font-semibold flex items-center gap-3 w-full">
      <div className="text-blue-300">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm">{title}</span>
        <span className="font-extrabold text-lg">{number}</span>
      </div>
    </div>
  );
}

export default async function Profile({ params }: { params: { name: string }}) {
    const name = params.name

    const res = await fetch(process.env.API_URL!, {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    const data = await res.json()

    return (
        <div className="min-h-screen">
            <main className="flex-1 justify-center items-center bg-[#000217]">
                <section className="relative py-16 md:py-24 overflow-hidden min-h-screen flex items-start">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,109,100,0.1)_0,transparent_50%)]"></div>
                    </div>
                    <div className="absolute inset-0 bg-grid-pattern-overlay"></div>

                    <div className="container relative mx-auto px-4 flex flex-col items-center justify-center">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-12 w-full max-w-5xl">
                            <div className="flex-shrink-0 mb-6 md:mb-0">
                                <Image
                                    className="rounded-xl border border-blue-200 object-cover"
                                    src={data.avatar_url || "/ciptl.jpg"}
                                    width={200}
                                    height={200}
                                    alt="such a professional avatar"
                                />
                            </div>

                            <div className="flex flex-col gap-2 text-blue-200">
                                <span className="text-lg font-semibold">
                                    Username:{" "}
                                    <span className="font-extrabold text-xl">{name}</span>
                                </span>
                                <span className="text-lg font-semibold">
                                    Bio: <span className="italic">{data.bio ? data.bio : "no bio😟"}</span>
                                </span>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
                                    <Card icon={<Folder size={20} />} title="Repositories" number={data.repos} />
                                    <Card icon={<Users size={20} />} title="Followers" number={data.followers} />
                                    <Card icon={<User size={20} />} title="Following" number={data.following} />
                                    <Card icon={<Star size={20} />} title="Stars" number={data.stars} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 max-w-3xl text-center px-4">
                            <div className="text-blue-200 text-2xl leading-relaxed flex gap-2">
                                <Quote size={48} />
                                <div className="flex flex-col space-y-2">
                                    <Markdown>
                                        {`***${data.title}***`}
                                    </Markdown>
                                    <Markdown>
                                        {data.praise || "*Praising...*"}
                                    </Markdown>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={`https://github.com/${name}`}
                            className="flex items-center gap-2 mt-4 bg-gradient-to-r from-[#80b6ef] to-[#1a68ba] p-4 rounded-xl text-xl font-bold cursor-pointer hover:scale-105 transition-all"
                        >
                            Get back to work    
                            <Github />                                    
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    )
}