import Image from "next/image";
import { Folder, Github, Quote, Star, User, Users } from "lucide-react";
import Link from "next/link";
import Markdown from 'react-markdown';

export default async function Profile({
  params,
}: {
  params: Promise<{ name: string[] }>
}) {
    const param = await params
    const name = param.name[0]
    const mode = param.name[1]
    
    const res = await fetch("http://localhost:3000/api/getUser", {
        method: "POST",
        body: JSON.stringify({ name, mode }),
    });

    const data = await res.json()

    return (
        <div className="min-h-screen">
            <main className={`flex-1 justify-center items-center ${mode === "praise" ? "bg-[#000217]" : "bg-[#170000]"}`}>
                <section className={`relative py-16 md:py-24 overflow-hidden min-h-screen flex items-start`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${mode === "praise" ? "from-blue-500/5 to-blue-500/10" : "from-red-500/5 to-red-500/10"}`}>
                        {mode === "praise" ? (<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,109,100,0.1)_0,transparent_50%)]"></div>) : (<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,109,100,0.1)_0,transparent_50%)]"></div>)}
                    </div>
                    {mode === "praise" ? (<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(9,9,11,0)_0%,_rgb(9,9,11)_80%)]" />) : (<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(11,9,0,0)_0%,_rgb(11,9,5)_80%)]" />)}

                    <div className="container relative mx-auto px-4 flex flex-col items-center justify-center">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-12 w-full max-w-5xl">
                            <div className="flex-shrink-0 mb-6 md:mb-0">
                                <Image
                                    className={`rounded-xl border ${mode === "praise" ? "border-blue-200" : "border-red-200"} object-cover`}
                                    src={data.avatar_url || "/ciptl.jpg"}
                                    width={200}
                                    height={200}
                                    alt="such a professional avatar"
                                />
                            </div>

                            <div className={`flex flex-col gap-2 ${mode === "praise" ? "text-blue-200" : "text-red-200"}`}>
                                <span className="text-lg font-semibold">
                                    Username:{" "}
                                    <span className="font-extrabold text-xl">{name}</span>
                                </span>
                                <span className="text-lg font-semibold">
                                    Bio: <span className="italic">{data.bio ? data.bio : "no bio😟"}</span>
                                </span>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
                                    <Card mode={mode} icon={<Folder size={20} />} title="Repositories" number={data.repos} />
                                    <Card mode={mode} icon={<Users size={20} />} title="Followers" number={data.followers} />
                                    <Card mode={mode} icon={<User size={20} />} title="Following" number={data.following} />
                                    <Card mode={mode} icon={<Star size={20} />} title="Stars" number={data.stars} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 max-w-3xl text-center px-4">
                            <div className={`${mode === "praise" ? "text-blue-200" : "text-red-200"} text-2xl leading-relaxed flex gap-2`}>
                                <Quote size={48} />
                                <div className="flex flex-col space-y-2">
                                    <div className="flex justify-center items-center gap-4">
                                        <Markdown>
                                            {`***${data.title}***`}
                                        </Markdown>
                                        {/* <TwitterShareButton
                                            url={'https://twitter.com/intent/tweet?text="YOUR_TEXT"&url="http://localhost:3000/profile/IRjSI"'}
                                            title={'next-share is a social share buttons for your next React apps.'}
                                        >
                                            <TwitterIcon size={32} />
                                        </TwitterShareButton> */}
                                        
                                            {/* <svg width={24} fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>share on X</title> <path d="M0 25.472q0 2.368 1.664 4.032t4.032 1.664h18.944q2.336 0 4-1.664t1.664-4.032v-8.192l-3.776 3.168v5.024q0 0.8-0.544 1.344t-1.344 0.576h-18.944q-0.8 0-1.344-0.576t-0.544-1.344v-18.944q0-0.768 0.544-1.344t1.344-0.544h9.472v-3.776h-9.472q-2.368 0-4.032 1.664t-1.664 4v18.944zM5.696 19.808q0 2.752 1.088 5.28 0.512-2.944 2.24-5.344t4.288-3.872 5.632-1.664v5.6l11.36-9.472-11.36-9.472v5.664q-2.688 0-5.152 1.056t-4.224 2.848-2.848 4.224-1.024 5.152zM32 22.080v0 0 0z"></path> </g></svg> */}
                                    </div>
                                    <Markdown>
                                        {data.praise || "*Praising...*"}
                                    </Markdown>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={`https://github.com/${name}`}
                            className={`flex items-center gap-2 mt-4 bg-gradient-to-r ${mode === "praise" ? "from-[#80b6ef] to-[#1a68ba]" : "from-[#ef8080] to-[#ba1a1a]" } p-4 rounded-xl text-xl font-bold cursor-pointer hover:scale-105 transition-all`}
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

function Card({ icon, title, number, mode }: { icon: React.ReactNode; title: string; number: number; mode: string }) {
  return (
    <div className={`border ${mode === "praise" ? "border-blue-500 bg-blue-600/20" : "border-red-500 bg-red-600/20"} rounded-xl p-4 font-semibold flex items-center gap-3 w-full`}>
      <div className={`${mode === "praise" ? "text-blue-300" : "text-red-300"}`}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm">{title}</span>
        <span className="font-extrabold text-lg">{number}</span>
      </div>
    </div>
  )
}