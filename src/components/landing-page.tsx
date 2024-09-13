import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles, Zap, Mouse, Link as LinkIcon } from "lucide-react"
import Link from 'next/link'

export default function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <a className="flex items-center justify-center" href="#">
          <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <span className="ml-2 text-2xl font-bold text-purple-600 dark:text-purple-400">Blink-easy</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#how-it-works">
            How It Works
          </a>
          <a className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#get-started">
            Get Started
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Figma to Solana Blinks in One Click!
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                  🎨✨ BlinkeasyTool: Instant Figma to Solana magic! ✨🚀
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="#get-started">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  No complex steps, just pure design-to-blockchain magic! 🧙‍♂️
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Magical Features ✨
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 transform hover:scale-105 transition-transform duration-300">
                <Zap className="h-12 w-12 mb-2 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold">One-Click Conversion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  From Figma to Solana Blinks faster than you can say "abracadabra"! 🎩✨
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-pink-100 dark:bg-pink-900/30 transform hover:scale-105 transition-transform duration-300">
                <Mouse className="h-12 w-12 mb-2 text-pink-600 dark:text-pink-400" />
                <h3 className="text-xl font-bold">Figma Plugin Integration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Deploy directly from your Figma workspace. No extra steps needed! 🖱️💨
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 transform hover:scale-105 transition-transform duration-300">
                <LinkIcon className="h-12 w-12 mb-2 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold">Instant Blink Link</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Get your Solana Blink link immediately. Share and deploy with ease! 🔗✨
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              How the Magic Happens 🪄
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <div className="flex flex-col items-center space-y-2">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 font-bold text-2xl">1</span>
                <h3 className="text-xl font-bold">Design in Figma</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Create your masterpiece in Figma as usual. 🎨
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-200 dark:bg-pink-800 text-pink-700 dark:text-pink-300 font-bold text-2xl">2</span>
                <h3 className="text-xl font-bold">Click 'Deploy' in Plugin</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Hit the magic 'Deploy' button in our Figma plugin. 🚀
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-bold text-2xl">3</span>
                <h3 className="text-xl font-bold">Get Your Blink Link</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Voila! Receive your Solana Blink link instantly. ✨
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Ready to Sprinkle Some Blockchain Magic? ✨
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Join the wizards who are already using BlinkeasyTool to turn Figma dreams into Solana reality! 🧙‍♂️🌟
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-purple-50 dark:bg-purple-900/30" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    Get the Plugin
                  </Button>
                </form>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Get early access to our Figma plugin and start the magic! 🎩✨
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <p className="text-xs text-gray-700 dark:text-gray-300">© 2023 BlinkeasyTool. All rights reserved. Powered by unicorn dust and developer dreams. 🦄💻</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4 text-purple-600 dark:text-purple-400" href="#">
            Terms of Magic
          </a>
          <a className="text-xs hover:underline underline-offset-4 text-purple-600 dark:text-purple-400" href="#">
            Privacy Spell
          </a>
        </nav>
      </footer>
    </div>
  )
}