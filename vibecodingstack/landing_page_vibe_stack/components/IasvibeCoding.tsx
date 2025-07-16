import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/Particles";
import { CheckCircle, Activity, BarChart3, Cpu, Sparkles, Globe, Code, Zap } from "lucide-react";
import AnimatedTextCycle from "@/components/AnimatedTextCycle";

const aiModels = [
  // ... mesmo conteúdo de aiModels
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
              {aiModels.map((m) => (
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

          <TabsContent value="models">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 space-y-2">
                {aiModels.map((m) => (
                  <div key={m.id} onClick={() => setSelectedModel(m.id)} className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-colors hover:bg-white/5 ${selectedModel === m.id ? "bg-white/5" : ""}`}>
                    <m.icon className={`text-${m.color}-500`} />
                    <div>
                      <p className="text-white font-semibold text-sm">{m.name}</p>
                      <p className="text-xs text-gray-400">{m.version}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full md:w-2/3">
                <Card className="bg-gray-900/50 backdrop-blur border border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <model.icon className={`text-${model.color}-500`} />
                      <div>
                        <CardTitle className="text-white text-lg">{model.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">{model.version}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <p>{model.description}</p>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold text-sm mb-2">Capacidades</p>
                        <ul className="text-sm space-y-1">
                          {model.capabilities.map((cap, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> {cap}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-2">Casos de Uso</p>
                        <ul className="text-sm space-y-1">
                          {model.useCases.map((uc, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-blue-400"><Activity className="w-4 h-4" /> {uc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-2">Performance</p>
                      <div className="space-y-1">
                        {Object.entries(model.performance).map(([k, v], idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="capitalize text-gray-400">{k}</span>
                            <span className="text-white font-semibold">{v}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="bg-gray-900/50 backdrop-blur border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Atividade Recente das IAs</CardTitle>
                <CardDescription className="text-gray-400 text-sm">Acompanhe as últimas atualizações e integrações dos modelos de IA no Vibe Coding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "gemini", text: "Gemini Pro API connected", sub: "Real-time search enabled", time: "8m ago" },
                  { id: "gpt4", text: "GPT-4o integration complete", sub: "Multimodal processing active", time: "5m ago" },
                  { id: "claude", text: "Claude 3.5 Sonnet deployed", sub: "Enhanced reasoning capabilities", time: "2m ago" },
                ].map((item, idx) => {
                  const m = aiModels.find((a) => a.id === item.id)!;
                  return (
                    <div key={idx} className="bg-black/20 px-4 py-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <m.icon className={`text-${m.color}-500`} />
                        <div>
                          <p className="text-white text-sm font-medium">{item.text} <span className="text-gray-400 text-xs">· {item.time}</span></p>
                          <p className="text-xs text-gray-400">{item.sub}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{m.name}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default IasvibeCoding;
