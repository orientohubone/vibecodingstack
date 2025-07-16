import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, Cpu, Zap, Code, Globe, CheckCircle, Activity, BarChart3, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Particles } from "@/components/Particles";
import TextShimmer from "@/components/TextShimmer";

interface AIModel {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: string;
}

interface NotificationProps {
  icon: React.ReactNode;
  message: string;
}

const aiModels: AIModel[] = [
  {
    id: "claude",
    title: "Claude",
    description: "IA da Anthropic com foco em interpretação semântica e fluidez natural.",
    icon: <Brain className="w-5 h-5" />, 
    status: "ativo"
  },
  {
    id: "gpt4",
    title: "GPT-4",
    description: "Modelo da OpenAI com grande precisão e capacidade de contexto.",
    icon: <Cpu className="w-5 h-5" />, 
    status: "ativo"
  },
  {
    id: "cursor",
    title: "Cursor AI",
    description: "Assistente de codificação com integração nativa ao VSCode e GitHub.",
    icon: <Code className="w-5 h-5" />, 
    status: "beta"
  }
];

const notifications: NotificationProps[] = [
  { icon: <Sparkles className="w-4 h-4 text-green-400" />, message: "Claude respondeu 98% das queries com sucesso" },
  { icon: <Sparkles className="w-4 h-4 text-purple-400" />, message: "Cursor AI sugeriu refatorações em tempo real" },
  { icon: <Sparkles className="w-4 h-4 text-blue-400" />, message: "GPT-4 completou código com base em testes unitários" }
];

const Notification = ({ icon, message }: NotificationProps) => (
  <div className="flex items-center gap-2 text-sm text-gray-300">
    {icon}
    <span>{message}</span>
  </div>
);

const AnimatedList = ({ className, children, delay = 1000 }: { className?: string; children: React.ReactNode; delay?: number }) => {
  const [index, setIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
    }, delay);

    return () => clearInterval(interval);
  }, [childrenArray.length, delay]);

  const itemsToShow = useMemo(() => childrenArray.slice(0, index + 1).reverse(), [index, childrenArray]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <motion.div
            key={(item as ReactElement).key}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, originY: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
            layout
            className="mx-auto w-full"
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

  const selectedModelData = aiModels.find(m => m.id === selectedModel) || aiModels[0];

  return (
    <section className="relative bg-gray-950 py-16 px-4 md:px-12 overflow-hidden">
      <Particles className="absolute inset-0" color="#3B82F6" quantity={60} refresh />
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <TextShimmer className="text-5xl md:text-6xl font-bold text-white" duration={3} spread={3}>
            IAs no Vibe Coding
          </TextShimmer>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore todas as inteligências artificiais utilizadas e disponíveis no Vibe Coding para revolucionar seu desenvolvimento
          </motion.p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="models">Modelos IA</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setSelectedModel(model.id)}>
                    <CardHeader className="flex items-center gap-3">
                      {model.icon}
                      <CardTitle>{model.title}</CardTitle>
                      <Badge variant="outline">{model.status}</Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-gray-400">{model.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3 space-y-2">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                  <CardHeader>
                    <CardTitle>{selectedModelData.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{selectedModelData.description}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:w-2/3 space-y-6">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                  <CardHeader>
                    <CardTitle>Desempenho</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">Dados de desempenho serão adicionados futuramente.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] overflow-hidden">
                  <AnimatedList delay={2000}>
                    {notifications.map((notification, idx) => (
                      <Notification {...notification} key={idx} />
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
