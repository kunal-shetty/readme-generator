"use client"
import Galaxy from '@/components/Galaxy';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Github, 
  Zap, 
  Code, 
  Star, 
  Download,
  Users,
  Eye,
  GitFork,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Landing() {

  // Theme toggle state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // Default to system preference if no saved theme
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const features = [
    {
      icon: <Github className="h-8 w-8" />,
      title: "GitHub Integration 🚀",
      description: "Automatically fetch your GitHub profile and repository data"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Generation ⚡",
      description: "Generate beautiful README files in seconds with AI-powered analysis"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Modern Themes 🎨",
      description: "Clean, contemporary templates that look great in light or dark mode"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Easy Download 📥",
      description: "Download your README.md file instantly or copy to clipboard"
    }
  ];

  const stats = [
    { icon: <Star className="h-5 w-5" />, label: "GitHub Stats", value: "Real-time" },
    { icon: <Users className="h-5 w-5" />, label: "Language Analysis", value: "Auto-detect" },
    { icon: <GitFork className="h-5 w-5" />, label: "Repository Cards", value: "Top Projects" },
    { icon: <Eye className="h-5 w-5" />, label: "Profile Views", value: "Tracked" },
    { icon: <Download className="h-5 w-5" />, label: "Downloads", value: "Instant" },
    { icon: <Zap className="h-5 w-5" />, label: "Generation Speed", value: "Seconds" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground">
  {isDark && <Galaxy className="absolute inset-0 -z-10 w-full h-full" />}
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(color-mix(in oklch, var(--primary) 30%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklch, var(--primary) 30%, transparent) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Subtle Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, color-mix(in oklch, var(--primary) 40%, transparent) 2px, color-mix(in oklch, var(--primary) 40%, transparent) 4px)",
          }}
        />
      </div>

      {/* Navigation */}
      <nav
    className={`relative z-10 border-b backdrop-blur-sm ${
      isDark
        ? "bg-black/400 text-white"
        : "bg-background/80 border-background/80 text-black"
    }`}
  >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => window.location.href = "/" }>
                <Code className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                README.exe
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 pl-3 text-muted-foreground">
                {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <Switch
                  checked={isDark}
                  onCheckedChange={(val) => setIsDark(Boolean(val))}
                  aria-label="Toggle theme"
                />
              </div>
              <Button
                onClick={() => window.location.href = "/dashboard"  }
                className="font-semibold"
              >
                Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 lg:pt-10 pt-10 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
              style={{
                fontFamily: "Inter, ui-sans-serif, system-ui",
              }}
            >
              <br />
              <span>README Generator ✨</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create a professional and eye-catching GitHub profile README that instantly showcases who you are and what you do. 
              Highlight your skills, programming languages, and key projects in a structured and visually appealing way.            
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={() => window.location.href = "/dashboard"  }
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-6"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Generating
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-amber-400 text-amber-400 hover:bg-amber-400/10 text-lg px-8 py-6"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Eye className="mr-2 h-5 w-5" />
                See Features
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-6 border-y border-amber-400/20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-6 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-lg border border-amber-400/30">
                    <div className="text-amber-400">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Features ✨
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughtful defaults and smart analysis to build a modern profile README.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="bg-card border border-border backdrop-blur-sm h-full hover:border-foreground/30 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <div className="text-foreground">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-24 border-t border-amber-400/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              How It Works 🛠️
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect the dots from idea to polished README in minutes. Clean defaults, smart analysis, and a modern look—no setup required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border border-border h-full">
                <CardHeader>
                  <CardTitle className="text-xl">1. Enter Username ✍️</CardTitle>
                  <CardDescription>
                    Provide your GitHub handle and optional LinkedIn/Instagram links.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  We'll fetch your public profile and non-fork repos in seconds.
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border border-border h-full">
                <CardHeader>
                  <CardTitle className="text-xl">2. Pick Projects ⭐</CardTitle>
                  <CardDescription>
                    Choose up to six repositories to feature prominently.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Your README highlights the work you want people to see first.
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border border-border h-full">
                <CardHeader>
                  <CardTitle className="text-xl">3. Generate & Share 🚀</CardTitle>
                  <CardDescription>
                    Copy or download a polished README with badges, stats, and socials.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Optimized for GitHub dark mode with brand-accurate tech badges.
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 border-t border-amber-400/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Level Up Your Profile 🚀
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Showcase your work with a polished README that's easy to maintain and looks great in light or dark mode.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => window.location.href = "/dashboard" }
                size="lg"
                className="font-semibold text-xl px-12 py-8"
              >
                <Zap className="mr-3 h-6 w-6" />
                Generate Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
  className={`relative z-10 border-t py-8 backdrop-blur-sm ${
    isDark
      ? "bg-black/400 text-white"
      : "border-gray/100 bg-gray-50 text-black"
  }`}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center">
                <Code className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                README.exe
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <span className="text-sm text-muted-foreground">© 2025 Made by Kunal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}