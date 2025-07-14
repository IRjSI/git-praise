"use client"

import { Github, SlashSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Switcher from "./components/Switch";

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [mode, setMode] = useState("praise")

  const router = useRouter()

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }, [])

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      if (name && !name.trim()) {
        setError("empty space won't help")
        setLoading(false)
        return
      }
      if (!name.trim()) {
        setError("please enter a name")
        setLoading(false)
        return
      }
      
      router.push(`/profile/${name}/${mode}`)
      setError("")
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Something went wrong")
      }
    }
  }

  useEffect(() => {
    isChecked ? setMode("praise") : setMode("roast")
  }, [isChecked])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress]);

  const isPraise = mode === "praise";

  return (
    <div className="flex min-h-screen flex-col">
      <main className={`flex-1 justify-center items-center ${isPraise ? "bg-[#000217]" : "bg-[#170000]"}`}>
        <section className="relative py-16 md:py-24 overflow-hidden min-h-screen flex items-center">
          <div className={`absolute inset-0 bg-gradient-to-r ${isPraise ? "from-blue-500/5 to-blue-500/10" : "from-red-500/5 to-red-500/10"}`}>
            <div className={`absolute inset-0 ${isPraise 
              ? "bg-[radial-gradient(circle_at_center,rgba(0,109,100,0.1)_0,transparent_50%)]" 
              : "bg-[radial-gradient(circle_at_center,rgba(224,109,100,0.1)_0,transparent_50%)]" }`}></div>
          </div>
          <div className={`absolute inset-0 ${isPraise 
            ? "bg-[radial-gradient(circle_at_center,_rgba(9,9,11,0)_0%,_rgb(9,9,11)_80%)]"
            : "bg-[radial-gradient(circle_at_center,_rgba(11,9,0,0)_0%,_rgb(11,9,5)_80%)]"
          }`} />

          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-4 p-2 shadow-sm">
              {/* <span className="text-sm text-zinc-400">mode: </span> */}
              <Switcher isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>

          </div>

          <div className="container relative mx-auto px-4 text-center">
            <h1 className={`md:text-7xl text-5xl font-semibold mb-4 ${isPraise ? "text-[#c0f7ff]" : "text-[#ffd7d6]"}`}>
              {isPraise ? "GIT PRAISE" : "GIT ROAST"}
            </h1>
            <p className={`md:text-xl text-lg mb-8 ${isPraise ? "text-[#80b6ef]" : "text-[#ea9797]"}`}>
              {isPraise ? "Too much roast, now it's time for some praise" : "you asked for it"}
            </p>
            <div className="mt-8 md:mt-12 flex justify-center">
              <div className="w-full max-w-md px-4">
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="relative group">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Github className={`h-5 transition-colors duration-200 ${isPraise ? "text-[#628391] group-focus-within:text-[#c0f7ff]" : "text-[#947070] group-focus-within:text-[#ffd7d6]"}`} />
                      </div>
                      <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ref={inputRef}
                        className={`py-4 pl-12 pr-4 focus:outline-none rounded-xl inset-shadow-sm w-full disabled:cursor-not-allowed ${isPraise 
                          ? "inset-shadow-[#4484c5]/50 text-[#c0f7ff] focus:ring-2 focus:ring-[#4484c5]" 
                          : "inset-shadow-[#c54444]/50 text-[#ffd7d6] focus:ring-2 focus:ring-[#c54444]"}`}
                        type="text"
                        placeholder="github username..."
                        disabled={loading}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <SlashSquare className={`h-5 transition-colors duration-200 ${isPraise ? "text-[#628391] group-focus-within:text-[#c0f7ff]" : "text-[#947070] group-focus-within:text-[#ffd7d6]"}`} />
                      </div>
                    </div>
                    {error && (
                      <div className="text-[#df8071] text-sm text-center">{error}</div>
                    )}
                  </div>
                  <button 
                    className={`mt-4 bg-gradient-to-r p-4 rounded-xl w-full text-xl font-bold cursor-pointer hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-60 ${isPraise 
                      ? "from-[#80b6ef] to-[#1a68ba]" 
                      : "from-[#df8071] to-[#c54444]"}`}
                    disabled={loading}
                  >
                    {!loading ? (isPraise ? "Praise" : "Roast") : (isPraise ? "praising..." : "roasting...")}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}
