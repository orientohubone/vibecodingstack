import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, Cpu, Zap, Code, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Particles } from "@/components/Particles";
import AnimatedTextCycle from "@/components/AnimatedTextCycle";

const aiModels = [
  {
    id: "claude",
    title: "Claude",
    description: "IA da Anthropic com foco em interpretação semântica.",
    icon: <Brain className="w-5 h-5" />,
    status: "ativo",
  },
  {
    id: "gpt4",
    title: "GPT-4",
    description: "Modelo da OpenAI com grande precisão e contexto.",
    icon: <Cpu className="w-5 h-5" />,
    status: "ativo",
  },
  {
    id: "cursor",
    title: "Cursor AI",
    description: "Assistente de codificação com GitHub e VSCode.",
    icon: <Code className="w-5 h-5" />,
    status: "beta",
  },
];

const notifications = [
  { icon: <Sparkles className="w-4 h-4 text-green-400" />, message: "Claude respondeu 98% das queries." },
  { icon: <Sparkles className="w-4 h-4 text-purple-400" />, message: "Cursor AI sugeriu refatorações." },
  { icon: <Sparkles className="w-4 h-4 text-blue-400" />, message: "GPT-4 completou código com base em testes." },
];

const Notification = ({ icon, message }: { icon: React.ReactNode; message: string }) => (
  <div className="flex items-center gap-2 text-sm text-gray-300">
    {icon}
    <span>{message}</span>
  </div>
);

const AnimatedList = ({ className, children, delay = 1500 }: { className?: string; children: React.ReactNode; delay?: number }) => {
  const [index, setIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % childrenArray.length);
    }, delay);
    return () => clearInterval(interval);
  }, [childrenArray.length, delay]);

  const itemsToShow = useMemo(() => childrenArray.slice(0, index + 1).reverse(), [index, childrenArray]);

  return (
    <div className={cn("flex flex-col items-start gap-4", className)}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <motion.div
            key={(item as ReactElement).key}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const IasvibeCoding = () => {
  const [selectedModel, setSelectedModel] = useState("claude");
  const [activeTab, setActiveTab] = useState("overview");
  const selectedModelData = aiModels.find((m) => m.id === selectedModel) || aiModels[0];

  return (
    <section className="relative bg-gray-950 py-16 px-4 md:px-12 overflow-hidden">
      <Particles className="absolute inset-0 z-0" color="#8B5CF6" quantity={80} refresh />
      <div className="relative z-10">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            IAs no {" "}
            <AnimatedTextCycle
              words={["Vibe Coding", "Desenvolvimento", "Futuro", "Código"]}
              interval={3000}
              className="text-cyan-400"
            />
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore todas as inteligências artificiais utilizadas e disponíveis no Vibe Coding para revolucionar seu desenvolvimento
          </motion.p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="models">Modelos IA</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiModels.map((model, idx) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card onClick={() => setSelectedModel(model.id)} className="bg-white/5 backdrop-blur border border-white/10 shadow-md cursor-pointer">
                  <CardHeader className="flex items-center gap-2">
                    {model.icon}
                    <CardTitle>{model.title}</CardTitle>
                    <Badge variant="outline">{model.status}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-sm">{model.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="models" className="mt-6 flex flex-col gap-6 lg:flex-row">
            <Card className="lg:w-1/3 bg-white/5 backdrop-blur border border-white/10 shadow-md">
              <CardHeader>
                <CardTitle>{selectedModelData.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{selectedModelData.description}</p>
              </CardContent>
            </Card>
            <Card className="lg:w-2/3 bg-white/5 backdrop-blur border border-white/10 shadow-md">
              <CardHeader>
                <CardTitle>Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">Dados de desempenho serão adicionados futuramente.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="bg-white/5 backdrop-blur border border-white/10 shadow-md">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] overflow-hidden">
                  <AnimatedList delay={2000}>
                    {notifications.map((n, i) => (
                      <Notification key={i} {...n} />
                    ))}
                  </AnimatedList>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default IasvibeCoding;
