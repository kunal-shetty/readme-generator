"use client";

import { useEffect, useState } from "react";
import Galaxy from "@/components/Galaxy";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, ArrowLeft, Copy , Code} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [username, setUsername] = useState("");
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
  const [step, setStep] = useState<"username" | "repos" | "details" | "readme">(
    "username"
  );

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
    if (!username) return;
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await res.json();
      setRepos(data);
      setStep("repos");
    } catch {
      alert("Failed to fetch repositories.");
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

const getColorForTech = (tech: string) => {
  let hash = 0;
  for (let i = 0; i < tech.length; i++) {
    hash = tech.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
  const generateReadme = () => {
    const selectedRepoObjs = repos.filter(r => selectedRepos.includes(r.name));

    const repoSection = selectedRepoObjs
      .map(
        r =>
          `- **[${r.name}](${r.html_url})** – ${r.description || "No description"}`
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
      .map(
        tech =>
          `![${tech}](https://img.shields.io/badge/${encodeURIComponent(
            tech
          )}-blue?style=for-the-badge&logo=${encodeURIComponent(
            tech
          )}&logoColor=white)`
      )
      .join(" ");

    const content = `
<div align="center">

# Hi, I'm ${username}! 👋  

**Your Title / Role Here**

💡 Brief description about yourself  
🌱 Learning / exploring section  
🚀 Passion / interests  
🎯 Skills / main technologies  

---

## Connect With Me  
${socialBadges}

---

## Tech Stack  
${techBadges}

---

## Featured Projects  
${repoSection}

---

## GitHub Stats  
<img src="https://github-readme-stats.vercel.app/api?username=${username}&theme=dark&hide_border=false&include_all_commits=false&count_private=false" height="160px"/>  
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=dark&hide_border=false&include_all_commits=false&count_private=false&layout=compact" height="160px"/>  

---

<p align="center">
  <a href="https://visitcount.itsvg.in">
    <img src="https://visitcount.itsvg.in/api?id=${username}&icon=0&color=0" />
  </a>
</p>

</div>
    `;
    setReadme(content);
    setStep("readme");
  };

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      {isDark && <Galaxy className="absolute inset-0 -z-10 w-full h-full" />}

      {/* Navbar */}
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
                onClick={() => window.location.href = "/"  }
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
      <div className="flex-1 flex items-center justify-center p-6">
        {/* Username Step */}
        {step === "username" && (
          <Card className="max-w-md w-full bg-dark/300">
            <CardHeader>
              <CardTitle>Enter GitHub Username</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                type="text"
                placeholder="e.g. octocat"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-dark/300"
              />
              <Button
  className={`w-full ${isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-black text-white hover:bg-black/90"}`}
  onClick={fetchRepos}
>
  Fetch Repositories
</Button>
            </CardContent>
          </Card>
        )}

        {/* Repos Step */}
        {/* Repos Step */}
{step === "repos" && (
  <Card className="max-w-md w-full bg-dark/300">
    <CardHeader>
      <CardTitle>Select up to 5 Repositories</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div
        className="max-h-60 overflow-y-auto space-y-2 custom-scroll"
      >
        {repos.map((repo) => (
          <label key={repo.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedRepos.includes(repo.name)}
              onChange={() => toggleRepo(repo.name)}
            />
            <span>{repo.name}</span>
          </label>
        ))}
      </div>
      <Button className="w-full" onClick={() => setStep("details")}>
        Next
      </Button>
    </CardContent>
  </Card>
)}


        {/* Details Step */}
        {step === "details" && (
          <Card className="max-w-md w-full  bg-dark/300">
            <CardHeader>
              <CardTitle>Add Socials & Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                type="url"
                placeholder="GitHub URL"
                value={socials.github}
                onChange={e => setSocials({ ...socials, github: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={socials.linkedin}
                onChange={e =>
                  setSocials({ ...socials, linkedin: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="url"
                placeholder="Instagram URL"
                value={socials.instagram}
                onChange={e =>
                  setSocials({ ...socials, instagram: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Technology"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                />
                <Button onClick={addTech}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
  {techStack.map((tech) => (
    <span
      key={tech}
      className={`px-2 py-1 text-white text-sm rounded ${getColorForTech(tech)}`}
    >
      {tech}
    </span>
  ))}
</div>
              <Button className="w-full" onClick={generateReadme}>
                Generate README
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Readme Step */}
        {step === "readme" && (
          <Card className="max-w-5xl w-full">
            <CardHeader>
              <CardTitle>Your Generated README</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap break-words font-mono text-base bg-gray-100 dark:bg-black/20 p-6 rounded-lg max-w-full overflow-x-auto">
                {readme}
              </pre>
              <Button
                className="mt-4"
                onClick={() => navigator.clipboard.writeText(readme)}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
