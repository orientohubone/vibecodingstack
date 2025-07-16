import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Activity, Cpu, Brain, Zap, MessageSquare, Globe, Shield, BarChart3, Sparkles } from "lucide-react";
import { Particles } from "@/components/Particles";
import AnimatedTextCycle from "@/components/AnimatedTextCycle";

const aiModels = [
  {
    id: "claude",
    name: "Claude",
    version: "3.5 Sonnet",
    status: "Ativo",
    description: "Anthropic's advanced AI assistant with superior reasoning and safety features",
    color: "indigo",
    features: ["Long context understanding", "Code analysis", "+2"],
  },
  {
    id: "gpt4",
    name: "GPT-4",
    version: "Turbo & o1",
    status: "Ativo",
    description: "OpenAI's flagship model with exceptional reasoning and multimodal capabilities",
    color: "emerald",
    features: ["Multimodal processing", "Complex reasoning", "+2"],
  },
  {
    id: "gemini",
    name: "Gemini",
    version: "Pro & Ultra",
    status: "Ativo",
    description: "Google's powerful AI with integrated search and multimodal understanding",
    color: "blue",
    features: ["Real-time information", "Multimodal analysis", "+2"],
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    version: "X & Chat",
    status: "Ativo",
    description: "AI-powered coding assistant integrated directly into development workflows",
    color: "fuchsia",
    features: ["Code completion", "Context-aware suggestions", "+2"],
  },
  {
    id: "cursor",
    name: "Cursor AI",
    version: "Latest",
    status: "Ativo",
    description: "AI-first code editor with advanced code understanding and generation",
    color: "amber",
    features: ["Codebase understanding", "Intelligent editing", "+2"],
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    version: "Beta",
    status: "Beta",
    description: "AI-powered UI generation tool for React and Next.js applications",
    color: "cyan",
    features: ["UI component generation", "React/Next.js optimization", "+2"],
  },
];

const notifications = [
  {
    title: "Gemini Pro API connected",
    time: "8m ago",
    message: "Real-time search enabled",
    icon: Globe,
    label: "Gemini",
    color: "blue",
  },
  {
    title: "GPT-4o integration complete",
    time: "5m ago",
    message: "Multimodal processing active",
    icon: Sparkles,
    label: "GPT-4",
    color: "emerald",
  },
  {
    title: "Claude 3.5 Sonnet deployed",
    time: "2m ago",
    message: "Enhanced reasoning capabilities",
    icon: Brain,
    label: "Claude",
    color: "fuchsia",
  },
];

const IasvibeCoding = () => {
  const [selectedModel, setSelectedModel] = useState("claude");

  const model = aiModels.find((m) => m.id === selectedModel);

  return (
    <section className="relative bg-gray-950 py-16 px-4 md:px-12 overflow-hidden">
      <Particles className="absolute inset-0 z-0" color="#8B5CF6" quantity={80} refresh />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            IAs no <AnimatedTextCycle words={["Vibe Coding", "Desenvolvimento", "Futuro", "Código"]} className="text-cyan-400" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore todas as inteligências artificiais utilizadas no ecossistema Vibe Coding
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 bg-gray-800/30 border border-white/10">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="models">Modelos IA</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {aiModels.map(({ id, name, version, status, description, color, features }) => (
              <Card
                key={id}
                className={`group relative bg-white/5 backdrop-blur shadow-md cursor-pointer overflow-hidden border border-white/10 before:absolute before:inset-0 before:rounded-2xl before:border before:border-${color}-500/20 before:blur-[2px] before:opacity-70 before:pointer-events-none`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CheckCircle className={`text-${color}-500`} size={18} />
                    {name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-400">{version}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-300 text-sm">{description}</p>
                  <p className="text-gray-400 text-sm font-semibold">Principais Recursos:</p>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feat, i) => (
                      <Badge key={i} variant="outline" className="text-white border-white/20">
                        {feat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="models" className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="space-y-4">
              {aiModels.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-colors hover:bg-white/5 ${selectedModel === m.id ? "bg-white/5" : ""}`}
                >
                  <m.icon className={`text-${m.color}-500`} />
                  <div>
                    <p className="text-white font-semibold text-sm">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.version}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-3 bg-white/5 rounded-2xl p-6 space-y-4">
              <h2 className="text-2xl text-white font-bold">{model?.name}</h2>
              <p className="text-sm text-gray-300">{model?.description}</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Capacidades</h3>
                  <ul className="list-disc pl-5 text-green-400 text-sm">
                    <li>Long context understanding</li>
                    <li>Code analysis</li>
                    <li>Creative writing</li>
                    <li>Safety guardrails</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Casos de Uso</h3>
                  <ul className="list-disc pl-5 text-blue-400 text-sm">
                    <li>Code review</li>
                    <li>Documentation</li>
                    <li>Problem solving</li>
                    <li>Content creation</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Performance</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Speed</div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "88%" }} />
                  </div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "95%" }} />
                  </div>
                  <div className="text-sm text-gray-400">Creativity</div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: "92%" }} />
                  </div>
                  <div className="text-sm text-gray-400">Reasoning</div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-8">
            <Card className="bg-white/5 border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity size={20} className="text-violet-500" />
                  Atividade Recente das IAs
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Acompanhe as últimas atualizações e integrações dos modelos de IA no Vibe Coding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="bg-black/20 rounded-xl px-6 py-4 border border-white/10 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <n.icon className={`text-${n.color}-400`} size={28} />
                      <div>
                        <p className="text-white font-medium">{n.title}</p>
                        <p className="text-gray-400 text-sm">{n.message}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{n.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default IasvibeCoding;
