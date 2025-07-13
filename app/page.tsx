"use client"

import { Github, SlashSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleKeyPress = useCallback((e: any) => {
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
        return
      }
      if (!name.trim()) {
        setError("please enter a name")
        return
      }
      
      router.push(`/profile/${name}`)
      setError("")
    } catch (error: any) {
      setError(error.error)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 justify-center items-center bg-[#000217]">
        <section className="relative py-16 md:py-24 overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,109,100,0.1)_0,transparent_50%)]"></div>
          </div>
          <div className="absolute inset-0 bg-grid-pattern-overlay"></div>

          <div className="container relative mx-auto px-4 text-center">
            <h1 className="text-7xl font-semibold text-[#c0f7ff] mb-4">GIT PRAISE</h1>
            <p className="text-xl text-[#80b6ef] mb-8">Too much roast, now it's time for some praise</p>
            <div className="mt-8 md:mt-12 flex justify-center">
              <div className="w-full max-w-md px-4">
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="relative group">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Github className="h-5 text-[#628391] group-focus-within:text-[#c0f7ff] transition-colors duration-200" />
                      </div>
                      <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ref={inputRef}
                        className="py-4 pl-12 pr-4 focus:outline-none rounded-xl inset-shadow-sm inset-shadow-[#4484c5]/50 text-[#c0f7ff] focus:ring-2 focus:ring-[#4484c5] w-full disabled:cursor-not-allowed"
                        type="text"
                        placeholder="github username..."
                        disabled={loading}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <SlashSquare className="h-5 text-[#628391] group-focus-within:text-[#c0f7ff] transition-colors duration-200" />
                      </div>
                    </div>
                    {error && (
                      <div className="text-[#df8071] text-sm text-center">{error}</div>
                    )}
                  </div>
                  <button 
                    className="mt-4 bg-gradient-to-r from-[#80b6ef] to-[#1a68ba] p-4 rounded-xl w-full text-xl font-bold cursor-pointer hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading}
                  >
                    {!loading ? "Praise" : "praising..."}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
