"use client";

import { useEffect, useState } from "react";
import Galaxy from "@/components/Galaxy";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, ArrowLeft, ArrowDown, Copy, Code, RotateCcw } from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
  }

  const [repos, setRepos] = useState<Repo[]>([]);

  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [readme, setReadme] = useState("");
  const [socials, setSocials] = useState({
    github: "",
    linkedin: "",
    instagram: "",
  });
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [step, setStep] = useState<"loading" | "username" | "repos" | "title" | "details" | "readme">(
    "username"
  );
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved === "dark");
  }, []);

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

  const fetchRepos = async () => {
    if (!username) {
      setError("Please enter a username");
      return;
    }
    setError(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);

      if (!res.ok) {
        if (res.status === 404) throw new Error("User not found");
        throw new Error(`GitHub API error: ${res.status}`);
      }

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid response from GitHub");
      setRepos(data);
      setStep("repos");
    } catch (err: any) {
      setError(err.message || "Failed to fetch repositories");
    }
  };


  const toggleRepo = (repoName: string) => {
    if (selectedRepos.includes(repoName)) {
      setSelectedRepos(selectedRepos.filter(r => r !== repoName));
    } else if (selectedRepos.length < 5) {
      setSelectedRepos([...selectedRepos, repoName]);
    } else {
      alert("You can select up to 5 repos.");
    }
  };

  const addTech = () => {
    if (techInput && !techStack.includes(techInput)) {
      setTechStack([...techStack, techInput]);
      setTechInput("");
    }
  };
  // 🚀 README.exe by Kunal - do not remove
  const watermark = "Kunal 2025";
  const loadingMessages = [
    "Compiling code snippets...",
    "Generating badges and stats...",
    "Adding some magic... ✨",
    "Checking GitHub activity...",
    "Almost there...",
    "Polishing README pixels...",
    "Counting commits...",
    "Arranging badges in style...",
    "Formatting your README...",
  ];

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
  ];
  const techColors = {
    // Web / Frontend
    HTML: "#E34F26",
    CSS: "#1572B6",
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    React: "#61DAFB",
    Vue: "#4FC08D",
    Angular: "#DD0031",
    Svelte: "#FF3E00",
    TailwindCSS: "#38B2AC",
    Sass: "#CC6699",
    Bootstrap: "#7952B3",
    jQuery: "#0769AD",

    // Backend / General-purpose
    Python: "#3776AB",
    Django: "#092E20",
    Flask: "#000000",
    Ruby: "#CC342D",
    Rails: "#CC0000",
    Java: "#007396",
    Spring: "#6DB33F",
    Kotlin: "#0095D5",
    Swift: "#FA7343",
    C: "#A8B9CC",
    "C++": "#00599C",
    CSharp: "#239120",
    Go: "#00ADD8",
    PHP: "#777BB4",
    Laravel: "#FF2D20",
    NodeJS: "#339933",
    ExpressJS: "#000000",
    Rust: "#000000",
    Elixir: "#6E4A7E",
    Scala: "#DC322F",
    Perl: "#39457E",
    Haskell: "#5E5086",
    R: "#276DC3",
    Julia: "#9558B2",
    Dart: "#0175C2",
    ObjectiveC: "#438EFF",
    FSharp: "#b845fc",
    Groovy: "#4298B8",
    Shell: "#89E051",
    PowerShell: "#012456",
    Bash: "#4EAA25",
    Solidity: "#AA6746",
    VBA: "#867DB1",
    COBOL: "#005CA9",
    Fortran: "#4D41B1",

    // Databases / Query Languages
    SQL: "#F29111",
    MySQL: "#4479A1",
    PostgreSQL: "#336791",
    MongoDB: "#47A248",
    Redis: "#DC382D",
    SQLite: "#003B57",
    OracleSQL: "#F80000",
    Cassandra: "#1280A1",

    // Data Science / ML
    MATLAB: "#0076A8",
    TensorFlow: "#FF6F00",
    PyTorch: "#EE4C2C",
    Pandas: "#150458",
    NumPy: "#013243",
    RLang: "#276DC3",

    // Mobile
    Android: "#3DDC84",
    iOS: "#000000",
    ReactNative: "#61DAFB",
    Flutter: "#02569B",

    // DevOps / Cloud / Tools
    Docker: "#2496ED",
    Kubernetes: "#326CE5",
    AWS: "#FF9900",
    GitHubActions: "#2088FF",
    Git: "#F05032",
    Jenkins: "#D24939",
    Terraform: "#7B42BC",
    Vercel: "#000000",
    Netlify: "#00C7B7",

    // Misc / Scripting
    HTML5: "#E34F26",
    CSS3: "#1572B6",
    Lua: "#000080",

    // Legacy / Historical
    Pascal: "#E3F171",
    Ada: "#02F88C",
    Smalltalk: "#596706",
    Lisp: "#3FB68B",
    Prolog: "#74283C",
    Logo: "#EFAB29",
    ML: "#1E4099",
    Scheme: "#1e4aec",
    Assembly: "#6E4C13",
    BASIC: "#FF0000",
    VBScript: "#1D3F95",
  };
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        return loadingMessages[(currentIndex + 1) % loadingMessages.length];
      });
    }, 1500); // change message every 1.2s
    return () => clearInterval(interval);
  }, []);

  const getColorForTech = (tech: string) => {
    let hash = 0;
    for (let i = 0; i < tech.length; i++) {
      hash = tech.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };
  const selectRandomDescription = () => {
    const descriptions = [
      "💻 A full-stack developer with a passion for building modern, scalable, and user-friendly applications. ⚡ Enjoys working across both frontend and backend, experimenting with new technologies, and solving complex problems with simple, efficient solutions. 📚 Constantly learning, exploring new frameworks, and aiming to make a real-world impact through work.",

      "☕ A curious mind who loves coding, creativity, and coffee. 🛠️ Spends time experimenting with new tech, creating fun projects, and exploring different ideas that push growth. 💬 Outside of coding, enjoys conversations, brainstorming, and sharing experiences with like-minded people.",

      "🎨 Sees technology as both art and logic — a way to design experiences people enjoy while solving real problems. ✨ Loves building sleek user interfaces, experimenting with AI-powered tools, and working on projects that blend creativity with functionality. 🌱 Views every project as a chance to learn, grow, and create something meaningful.",

      "📖 Learner • 🏗️ Builder • 🤔 Problem Solver 🚀 Believes in continuous growth and exploring new possibilities through technology. 🔧 Whether it’s coding, creating digital tools, or learning something new, enjoys challenging themselves and turning ideas into reality.",

      "🌍 Dreams big but moves step by step every day. 💡 Passionate about coding, problem-solving, and using technology to create solutions that inspire change. 🌱 Believes growth isn’t about being perfect — it’s about learning, experimenting, and becoming better than yesterday ✨.",

      "🤝 A tech enthusiast who thrives on teamwork, collaboration, and sharing knowledge. 💭 Loves brainstorming ideas, building projects with others, and learning from challenges along the way. 🌐 Believes technology isn’t just about code — it’s about connecting with people and creating something valuable together.",

      "👋 A mix of code, coffee, and curiosity ☕💻. 🎯 Enjoys experimenting with tech, building side projects, and exploring creative ideas whenever inspiration strikes. 🔍 Also values learning new perspectives, talking about random ideas, and keeping things fun while chasing growth 🚀."
    ];

    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
  const generateReadme = () => {
    // Optional: briefly clear content for refresh effect
    setReadme(""); // clears current README
    setStep("loading"); // optional: show loading state

    setTimeout(() => {
      const selectedRepoObjs = repos.filter(r => selectedRepos.includes(r.name));

      const repoSection = selectedRepoObjs
        .map(
          r => `- **[${r.name}](${r.html_url})** – ${r.description || "No description"}`
        )
        .join("\n");

      const socialBadges = `
<a href="${socials.instagram}">
  <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white"/>
</a>
<a href="${socials.linkedin}">
  <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="${socials.github}">
  <img src="https://img.shields.io/badge/GitHub-%23181717.svg?style=for-the-badge&logo=github&logoColor=white"/>
</a>
`;

      const techBadges = techStack
        .map((tech) => {
          const color = techColors[tech as keyof typeof techColors] ?? "#808080"; // fallback gray
          const colorWithoutHash = color.startsWith("#") ? color.slice(1) : color;

          return `![${tech}](https://img.shields.io/badge/${encodeURIComponent(
            tech
          )}-${colorWithoutHash}?style=for-the-badge&logo=${encodeURIComponent(
            tech
          )}&logoColor=white)`;
        })
        .join(" ");

      const content = `<!-- Generated with README.exe by Kunal 🚀 -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=${encodeURIComponent(
        username
      )}&fontSize=90" />
</div>

<div align="center">
  <h1>Hi, I'm ${username}! 👋</h1>
  <h3>${title} residing in ${location}</h3>

  <p align="center">
    ${selectRandomDescription()}
  </p>
</div>

---

<div align="center">
  <h2>🚀 Connectivity</h2>
  ${socialBadges}
</div>

---

<div align="center">
  <h2>🛠️ Tech Stack</h2>
  ${techBadges}
</div>

---

<div align="center">
  <h2>🏆 GitHub Trophies</h2>
  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=radical" />
</div>

---

<div align="center">
  <h2>📂 Highlighted Projects</h2>
</div>

${repoSection}

---

<div align="center">
  <h2>📊 GitHub Stats</h2>
  <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
    <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight" height="170" />
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight" height="170" />
  </div>
  <br/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight" />
</div>

<div align="center">
  <br/>
  <sub>Generated with <a href="https://github.com/kunal-shetty/readme-generator"><b>README.exe</b></a> by Kunal</sub>
</div>
`;

      setReadme(content);
      setStep("readme"); // switch back to readme view
    }, 9000);
  };

  const downloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([readme], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `README.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  interface ToastProps {
    message: string;
    duration?: number; // in ms
    onClose: () => void;
  }
  const [toastMessage, setToastMessage] = useState("");
  const Toast: React.FC<ToastProps> = ({ message, duration = 1000, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
      <div className="fixed bottom-5 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50">
        {message}
      </div>
    );
  };
  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      {/* Background */}
      {isDark && <Galaxy className="absolute inset-0 -z-10 w-full h-full" />}
      {!isDark && (
        <div className="absolute inset-0 -z-10 opacity-10">
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
      )}
      {/* Navbar */}
      <nav
        className={`relative z-10 border-b backdrop-blur-sm ${isDark
          ? "bg-black/40 text-white"
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
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => window.location.href = "/"}>
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
                onClick={() => window.location.href = "/"}
                className="font-semibold"
              >
                Home
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main content center */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Username Step */}
          {step === "username" && (
            <motion.div
              key="username"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="max-w-md w-full"
            >
              <Card className="bg-card/50 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle>Enter GitHub Username</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">GitHub Handle</Label>
                    <Input
                      id="username"
                      placeholder="e.g. octocat"
                      value={username}
                      onChange={e => {
                        const value = e.target.value;
                        if (/^[a-zA-Z0-9-]*$/.test(value)) {
                          setUsername(value);
                          setError(null);
                        }
                      }}
                      className={error ? "border-destructive" : ""}
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all"
                    onClick={fetchRepos}
                  >
                    Fetch Repositories
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Loading step */}
          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md w-full"
            >
              <Card className="bg-card/50 backdrop-blur-md border-border">
                <CardContent className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-lg font-semibold text-center">{currentMessage}</span>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Repos Step */}
          {step === "repos" && (
            <motion.div
              key="repos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md w-full"
            >
              <Card className="bg-card/50 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle>Select Featured Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-64 overflow-y-auto space-y-2 custom-scroll pr-2">
                    {repos.map((repo) => (
                      <label key={repo.id} className="flex items-center p-2 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                          checked={selectedRepos.includes(repo.name)}
                          onChange={() => toggleRepo(repo.name)}
                        />
                        <span className="ml-3 font-medium group-hover:text-primary transition-colors">{repo.name}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
                    <span>{selectedRepos.length} / 5 selected</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep("username")}>Back</Button>
                    <Button className="flex-1" onClick={() => setStep("title")}>Next</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Title Step */}
          {step === "title" && (
            <motion.div
              key="title"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md w-full"
            >
              <Card className="bg-card/50 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Role</Label>
                    <Input
                      placeholder="e.g. Full Stack Developer"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="e.g. San Francisco, US"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep("repos")}>Back</Button>
                    <Button className="flex-1" onClick={() => setStep("details")}>Next</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Details Step */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md w-full"
            >
              <Card className="bg-card/50 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle>Socials & Stack</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs">GitHub Profile URL</Label>
                      <Input
                        type="url"
                        placeholder="https://github.com/..."
                        value={socials.github}
                        onChange={e => setSocials({ ...socials, github: e.target.value })}
                        className={!isValidUrl(socials.github) && socials.github ? "border-destructive text-destructive" : ""}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">LinkedIn URL</Label>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        value={socials.linkedin}
                        onChange={e => setSocials({ ...socials, linkedin: e.target.value })}
                        className={!isValidUrl(socials.linkedin) && socials.linkedin ? "border-destructive text-destructive" : ""}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Instagram URL</Label>
                      <Input
                        type="url"
                        placeholder="https://instagram.com/..."
                        value={socials.instagram}
                        onChange={e => setSocials({ ...socials, instagram: e.target.value })}
                        className={!isValidUrl(socials.instagram) && socials.instagram ? "border-destructive text-destructive" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tech Stack</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add Tech (e.g. Next.js)"
                        value={techInput}
                        onChange={e => setTechInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addTech()}
                      />
                      <Button variant="secondary" onClick={addTech}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {techStack.map((tech) => (
                        <motion.span
                          key={tech}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`px-3 py-1 text-white text-xs font-semibold rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer ${getColorForTech(tech)}`}
                          onClick={() => setTechStack(techStack.filter(t => t !== tech))}
                        >
                          {tech} ×
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep("title")}>Back</Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg transition-all"
                      onClick={generateReadme}
                      disabled={!isValidUrl(socials.github) || !isValidUrl(socials.linkedin) || !isValidUrl(socials.instagram)}
                    >
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Readme Step */}
          {step === "readme" && (
            <motion.div
              key="readme"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl w-full"
            >
              <Card className="bg-card/50 backdrop-blur-md border-border shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Professional README</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <pre className="whitespace-pre-wrap break-words font-mono text-sm bg-muted/50 p-6 rounded-xl border border-border shadow-inner max-h-[60vh] overflow-y-auto custom-scroll">
                      {readme}
                    </pre>
                  </motion.div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button
                      className="flex-1 min-w-[160px] hover:scale-[1.02] shadow-md transition-all"
                      onClick={() => {
                        navigator.clipboard.writeText(readme);
                        setToastMessage("Copied to clipboard!");
                      }}
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy Markdown
                    </Button>

                    <Button
                      variant="secondary"
                      className="flex-1 min-w-[160px] hover:scale-[1.02] transition-all"
                      onClick={downloadReadme}
                    >
                      <ArrowDown className="mr-2 h-4 w-4" /> Download .md
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[160px] hover:scale-[1.02] transition-all"
                      onClick={() => setStep("username")}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" /> New Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </div>
    </div>
  );
}
