import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/Particles";
import { CheckCircle, Activity, BarChart3, Cpu, Sparkles, Globe, Code, Zap } from "lucide-react";
import AnimatedTextCycle from "@/components/AnimatedTextCycle";

const aiModels = [
  {
    id: "claude",
    name: "Claude",
    version: "3.5 Sonnet",
    status: "Ativo",
    description: "Anthropic's advanced AI assistant with superior reasoning and safety features",
    features: ["Long context understanding", "Code analysis", "+2"],
    capabilities: ["Long context understanding", "Code analysis", "Creative writing", "Safety guardrails"],
    useCases: ["Code review", "Documentation", "Problem solving", "Content creation"],
    performance: { speed: 88, accuracy: 95, creativity: 92, reasoning: 96 },
    color: "purple",
    icon: Cpu
  },
  {
    id: "gpt4",
    name: "GPT-4",
    version: "Turbo & o1",
    status: "Ativo",
    description: "OpenAI's flagship model with exceptional reasoning and multimodal capabilities",
    features: ["Multimodal processing", "Complex reasoning", "+2"],
    capabilities: ["Multimodal processing", "Complex reasoning", "Code explanation", "Conversation memory"],
    useCases: ["Pair programming", "Testing", "Chatbots", "Data analysis"],
    performance: { speed: 85, accuracy: 97, creativity: 90, reasoning: 95 },
    color: "emerald",
    icon: Sparkles
  },
  {
    id: "gemini",
    name: "Gemini",
    version: "Pro & Ultra",
    status: "Ativo",
    description: "Google's powerful AI with integrated search and multimodal understanding",
    features: ["Real-time information", "Multimodal analysis", "+2"],
    capabilities: ["Real-time information", "Multimodal analysis", "Vision models", "Translation"],
    useCases: ["Research", "Web summarization", "Vision tasks", "Assistive search"],
    performance: { speed: 90, accuracy: 93, creativity: 89, reasoning: 92 },
    color: "blue",
    icon: Globe
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    version: "X & Chat",
    status: "Ativo",
    description: "AI-powered coding assistant integrated directly into development workflows",
    features: ["Code completion", "Context-aware suggestions", "+2"],
    capabilities: ["Code completion", "Context-aware suggestions", "Refactorization", "Terminal support"],
    useCases: ["Editor assistance", "Auto imports", "Inline help", "Chat within IDE"],
    performance: { speed: 80, accuracy: 91, creativity: 87, reasoning: 90 },
    color: "pink",
    icon: Code
  },
  {
    id: "cursor",
    name: "Cursor AI",
    version: "Latest",
    status: "Ativo",
    description: "AI-first code editor with advanced code understanding and generation",
    features: ["Codebase understanding", "Intelligent editing", "+2"],
    capabilities: ["Codebase understanding", "Intelligent editing", "Chat embedded", "Auto test generation"],
    useCases: ["Code exploration", "Refactor", "Inline docstrings", "File generation"],
    performance: { speed: 85, accuracy: 94, creativity: 88, reasoning: 93 },
    color: "amber",
    icon: Zap
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    version: "Beta",
    status: "Beta",
    description: "AI-powered UI generation tool for React and Next.js applications",
    features: ["UI component generation", "React/Next.js optimization", "+2"],
    capabilities: ["UI component generation", "React/Next.js optimization", "Export to code", "Semantic HTML"],
    useCases: ["Landing pages", "Dashboards", "Wireframing", "Prototypes"],
    performance: { speed: 87, accuracy: 89, creativity: 91, reasoning: 90 },
    color: "cyan",
    icon: BarChart3
  }
];

const IasvibeCoding = () => {
  const [selectedModel, setSelectedModel] = useState("claude");
  const model = aiModels.find((m) => m.id === selectedModel);

  return (
    <section className="relative bg-gray-950 py-16 px-4 md:px-12 overflow-hidden">
      <Particles className="absolute inset-0 z-0" color="#8B5CF6" quantity={80} refresh />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-4xl mx-auto mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            IAs no <AnimatedTextCycle words={["Vibe Coding", "Desenvolvimento", "Futuro", "Código"]} interval={3000} className="text-cyan-400" />
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore as inteligências artificiais do Vibe Coding e transforme seu fluxo de trabalho.
          </motion.p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-xl mx-auto">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="models">Modelos IA</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6">
              {aiModels.slice(0, 3).map((m) => (
                <Card key={m.id} className={`border-2 border-${m.color}-500/30 bg-gray-900/50 backdrop-blur`}> 
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <m.icon className={`text-${m.color}-500`} />
                      <div>
                        <CardTitle className="text-white text-lg">{m.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">{m.version}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs border-white/10 text-white/80">{m.status}</Badge>
                  </CardHeader>
                  <CardContent className="text-gray-300 text-sm space-y-2">
                    <p>{m.description}</p>
                    <div>
                      <p className="text-xs font-semibold mb-1">Principais Recursos:</p>
                      <div className="flex flex-wrap gap-2">
                        {m.features.map((f, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{f}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default IasvibeCoding;
