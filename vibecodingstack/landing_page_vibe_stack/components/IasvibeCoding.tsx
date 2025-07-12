import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, Cpu, Zap, Code, MessageSquare, Globe, Shield, CheckCircle, AlertCircle, Activity, BarChart3, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000 }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray.length, delay]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray]
    );

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { 
        duration: 0.3, 
        ease: "easeIn"
      }
    },
  };

  return (
    <>
      <div 
        ref={measureRef} 
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      <motion.span 
        className="relative inline-block"
        animate={{ 
          width,
          transition: { 
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

interface AIModel {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  capabilities: string[];
  useCases: string[];
  status: "active" | "beta" | "coming-soon";
  performance: {
    speed: number;
    accuracy: number;
    creativity: number;
    reasoning: number;
  };
}

interface AINotification {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  model: string;
}

const VibeCodingAISection = () => {
  const [selectedModel, setSelectedModel] = useState("claude");
  const [activeTab, setActiveTab] = useState("overview");

  const aiModels: AIModel[] = [
    {
      id: "claude",
      name: "Claude",
      version: "3.5 Sonnet",
      description: "Anthropic's advanced AI assistant with superior reasoning and safety features",
      icon: <Brain className="w-6 h-6" />,
      color: "#8B5CF6",
      capabilities: ["Long context understanding", "Code analysis", "Creative writing", "Safety guardrails"],
      useCases: ["Code review", "Documentation", "Problem solving", "Content creation"],
      status: "active",
      performance: { speed: 88, accuracy: 95, creativity: 92, reasoning: 96 }
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      version: "Turbo & o1",
      description: "OpenAI's flagship model with exceptional reasoning and multimodal capabilities",
      icon: <Sparkles className="w-6 h-6" />,
      color: "#10B981",
      capabilities: ["Multimodal processing", "Complex reasoning", "Code generation", "Mathematical problem solving"],
      useCases: ["Advanced coding", "Data analysis", "Research assistance", "Creative projects"],
      status: "active",
      performance: { speed: 92, accuracy: 94, creativity: 89, reasoning: 97 }
    },
    {
      id: "gemini",
      name: "Gemini",
      version: "Pro & Ultra",
      description: "Google's powerful AI with integrated search and multimodal understanding",
      icon: <Globe className="w-6 h-6" />,
      color: "#3B82F6",
      capabilities: ["Real-time information", "Multimodal analysis", "Integration with Google services", "Fast processing"],
      useCases: ["Research", "Real-time coding help", "Data integration", "Web development"],
      status: "active",
      performance: { speed: 94, accuracy: 91, creativity: 87, reasoning: 93 }
    },
    {
      id: "copilot",
      name: "GitHub Copilot",
      version: "X & Chat",
      description: "AI-powered coding assistant integrated directly into development workflows",
      icon: <Code className="w-6 h-6" />,
      color: "#EC4899",
      capabilities: ["Code completion", "Context-aware suggestions", "Multi-language support", "IDE integration"],
      useCases: ["Code completion", "Bug fixing", "Refactoring", "Learning new languages"],
      status: "active",
      performance: { speed: 96, accuracy: 89, creativity: 85, reasoning: 88 }
    },
    {
      id: "cursor",
      name: "Cursor AI",
      version: "Latest",
      description: "AI-first code editor with advanced code understanding and generation",
      icon: <Cpu className="w-6 h-6" />,
      color: "#F59E0B",
      capabilities: ["Codebase understanding", "Intelligent editing", "Context-aware chat", "File navigation"],
      useCases: ["Full-stack development", "Code exploration", "Rapid prototyping", "Code refactoring"],
      status: "active",
      performance: { speed: 90, accuracy: 92, creativity: 88, reasoning: 91 }
    },
    {
      id: "v0",
      name: "v0 by Vercel",
      version: "Beta",
      description: "AI-powered UI generation tool for React and Next.js applications",
      icon: <Zap className="w-6 h-6" />,
      color: "#06B6D4",
      capabilities: ["UI component generation", "React/Next.js optimization", "Design system integration", "Responsive design"],
      useCases: ["UI prototyping", "Component creation", "Design to code", "Rapid development"],
      status: "beta",
      performance: { speed: 85, accuracy: 87, creativity: 94, reasoning: 82 }
    }
  ];

  const notifications: AINotification[] = [
    {
      name: "Claude 3.5 Sonnet deployed",
      description: "Enhanced reasoning capabilities",
      time: "2m ago",
      icon: "🧠",
      color: "#8B5CF6",
      model: "Claude"
    },
    {
      name: "GPT-4o integration complete",
      description: "Multimodal processing active",
      time: "5m ago",
      icon: "✨",
      color: "#10B981",
      model: "GPT-4"
    },
    {
      name: "Gemini Pro API connected",
      description: "Real-time search enabled",
      time: "8m ago",
      icon: "🌐",
      color: "#3B82F6",
      model: "Gemini"
    },
    {
      name: "Copilot X features enabled",
      description: "Advanced code completion",
      time: "12m ago",
      icon: "💻",
      color: "#EC4899",
      model: "Copilot"
    },
    {
      name: "Cursor AI workspace ready",
      description: "Intelligent code editor active",
      time: "15m ago",
      icon: "⚡",
      color: "#F59E0B",
      model: "Cursor"
    },
    {
      name: "v0 UI generator online",
      description: "Component generation ready",
      time: "18m ago",
      icon: "🎨",
      color: "#06B6D4",
      model: "v0"
    }
  ];

  const Notification = ({ name, description, icon, color, time, model }: AINotification) => {
    return (
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          "bg-card border border-border shadow-sm hover:shadow-md"
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-2xl"
            style={{ backgroundColor: color }}
          >
            <span className="text-lg">{icon}</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium">
              <span className="text-sm sm:text-lg">{name}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-muted-foreground">{time}</span>
            </figcaption>
            <p className="text-sm font-normal text-muted-foreground">
              {description}
            </p>
            <Badge variant="secondary" className="w-fit mt-1 text-xs">
              {model}
            </Badge>
          </div>
        </div>
      </figure>
    );
  };

  const PerformanceChart = ({ model }: { model: AIModel }) => {
    const metrics = [
      { name: "Speed", value: model.performance.speed, color: "#10B981" },
      { name: "Accuracy", value: model.performance.accuracy, color: "#3B82F6" },
      { name: "Creativity", value: model.performance.creativity, color: "#EC4899" },
      { name: "Reasoning", value: model.performance.reasoning, color: "#8B5CF6" }
    ];

    return (
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{metric.name}</span>
              <span className="text-muted-foreground">{metric.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: metric.color }}
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const selectedModelData = aiModels.find(m => m.id === selectedModel) || aiModels[0];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          IAs no{" "}
          <AnimatedTextCycle
            words={["Vibe Coding", "Desenvolvimento", "Futuro", "Código"]}
            interval={3000}
            className="text-primary"
          />
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
            {aiModels.map((model) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedModel(model.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${model.color}20`, color: model.color }}
                        >
                          {model.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{model.name}</CardTitle>
                          <CardDescription>{model.version}</CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={model.status === "active" ? "default" : model.status === "beta" ? "secondary" : "outline"}
                      >
                        {model.status === "active" ? "Ativo" : model.status === "beta" ? "Beta" : "Em Breve"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Principais Recursos:</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.slice(0, 2).map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                        {model.capabilities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{model.capabilities.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Model Selection */}
            <div className="lg:w-1/3 space-y-2">
              <h3 className="font-semibold mb-4">Selecionar Modelo</h3>
              {aiModels.map((model) => (
                <button
                  key={model.id}
                  className={cn(
                    "w-full p-3 rounded-lg text-left transition-all flex items-center gap-3",
                    selectedModel === model.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent text-foreground"
                  )}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div 
                    className="p-1 rounded"
                    style={{ backgroundColor: selectedModel === model.id ? 'rgba(255,255,255,0.2)' : `${model.color}20`, color: selectedModel === model.id ? 'white' : model.color }}
                  >
                    {model.icon}
                  </div>
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className={cn("text-sm", selectedModel === model.id ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {model.version}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Model Details */}
            <div className="lg:w-2/3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${selectedModelData.color}20`, color: selectedModelData.color }}
                    >
                      {selectedModelData.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedModelData.name}</CardTitle>
                      <CardDescription className="text-lg">{selectedModelData.version}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{selectedModelData.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Capacidades
                      </h4>
                      <div className="space-y-2">
                        {selectedModelData.capabilities.map((capability) => (
                          <div key={capability} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-sm">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        Casos de Uso
                      </h4>
                      <div className="space-y-2">
                        {selectedModelData.useCases.map((useCase) => (
                          <div key={useCase} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-sm">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-purple-500" />
                      Performance
                    </h4>
                    <PerformanceChart model={selectedModelData} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Atividade Recente das IAs
              </CardTitle>
              <CardDescription>
                Acompanhe as últimas atualizações e integrações dos modelos de IA no Vibe Coding
              </CardDescription>
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
  );
};

export default VibeCodingAISection;
