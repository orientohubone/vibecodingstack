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
    id: "gpt4",
    name: "GPT-4o",
    icon: Cpu,
    version: "OpenAI",
    status: "online",
    description: "Modelo multimodal com capacidade de raciocínio e código.",
    color: "violet",
    features: ["Contexto longo", "Geração de código", "API robusta"],
    capabilities: ["Chat conversacional", "Explicações técnicas", "Resumos avançados"],
    useCases: ["Assistente de programação", "Chatbots", "Análise de documentos"],
    performance: { velocidade: 94, precisao: 96, contexto: 98 }
  },
  {
    id: "claude",
    name: "Claude 3.5",
    icon: Sparkles,
    version: "Anthropic",
    status: "online",
    description: "Modelo focado em interpretação contextual e criatividade.",
    color: "cyan",
    features: ["Interpretação de prompt", "Raciocínio criativo", "Segurança"],
    capabilities: ["Auxílio criativo", "Code review", "Pesquisa semântica"],
    useCases: ["Storytelling", "Análises contextuais", "Atendimento"],
    performance: { velocidade: 92, precisao: 93, contexto: 95 }
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    icon: Globe,
    version: "Google",
    status: "beta",
    description: "Modelo com foco em pesquisa e conectividade com web.",
    color: "pink",
    features: ["Busca web", "Integração com Google", "Compreensão visual"],
    capabilities: ["Pesquisa em tempo real", "Resumos factuais", "Web agent"],
    useCases: ["Pesquisa assistida", "Painéis informativos", "Geração de insights"],
    performance: { velocidade: 89, precisao: 91, contexto: 90 }
  },
  {
    id: "mistral",
    name: "Mistral",
    icon: Code,
    version: "Open Source",
    status: "offline",
    description: "Modelo open source com foco em aplicações locais.",
    color: "blue",
    features: ["Execução local", "Privacidade", "Customização"],
    capabilities: ["Apps embarcados", "Robôs", "Automação"],
    useCases: ["IoT", "RPA", "Sistemas offline"],
    performance: { velocidade: 80, precisao: 84, contexto: 78 }
  },
  {
    id: "bolt",
    name: "Bolt Mini",
    icon: Zap,
    version: "Vercel AI",
    status: "preview",
    description: "Modelo leve otimizado para velocidade em edge.",
    color: "orange",
    features: ["Execução instantânea", "Deploy edge", "Menor latência"],
    capabilities: ["Chat rápido", "Ações imediatas", "Interface reativa"],
    useCases: ["LPs interativas", "Bots de site", "Consultas curtas"],
    performance: { velocidade: 98, precisao: 82, contexto: 75 }
  },
  {
    id: "llama",
    name: "LLaMA 3",
    icon: BarChart3,
    version: "Meta",
    status: "online",
    description: "Modelo fundacional da Meta com ótimo desempenho geral.",
    color: "green",
    features: ["Multilinguagem", "Eficiência energética", "Compatível com HuggingFace"],
    capabilities: ["Traduções", "Geração de texto", "Análise textual"],
    useCases: ["Assistentes locais", "Educacional", "Pesquisa"],
    performance: { velocidade: 87, precisao: 89, contexto: 88 }
  }
]; // O array permanece como já definido

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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex justify-center space-x-4 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="models">Modelos IA</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiModels.map((m) => (
                <Card key={m.id} className={`border-2 border-${m.color}-500/30 bg-white/5 backdrop-blur-md shadow-md rounded-2xl`}>
                  <CardHeader className="flex-row items-center gap-4">
                    <m.icon className={`text-${m.color}-500 w-8 h-8`} />
                    <div>
                      <CardTitle className="text-white">{m.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-400">{m.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.features.map((feat, i) => (
                        <Badge key={i} variant="outline" className="text-white border-white/20">
                          {feat}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/3 space-y-3">
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
              <div className="w-full lg:w-2/3">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">{model?.name}</CardTitle>
                    <CardDescription className="text-gray-400">{model?.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-1">Capacidades</p>
                        <ul className="list-disc list-inside text-white text-sm">
                          {model?.capabilities.map((cap, i) => <li key={i}>{cap}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-1">Casos de uso</p>
                        <ul className="list-disc list-inside text-white text-sm">
                          {model?.useCases.map((use, i) => <li key={i}>{use}</li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-4">
              {aiModels.map((m, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <m.icon className={`text-${m.color}-500`} />
                  <div>
                    <p className="text-white font-semibold text-sm">{m.name}</p>
                    <p className="text-xs text-gray-400">Última atividade registrada com {m.performance.velocidade}% de velocidade.</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default IasvibeCoding;
