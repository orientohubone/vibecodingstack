import React, { ReactElement, useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
// Utility function to merge class names
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};
import { 
  Brain, Cpu, Zap, Code, MessageSquare, Globe, Shield, CheckCircle, 
  AlertCircle, Activity, BarChart3, Sparkles, ChevronDown, Play, 
  Pause, RotateCcw, Settings, Eye, TrendingUp, Star, Layers,
  Network, Database, Cloud, Lock, Workflow, Rocket, Monitor
} from "lucide-react";
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
    const [isPlaying, setIsPlaying] = useState(true);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      if (!isPlaying) return;
      
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray.length, delay, isPlaying]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray]
    );

    return (
      <div className={`relative flex flex-col items-center gap-4 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "Pausar" : "Reproduzir"}
          </button>
          <button
            onClick={() => setIndex(0)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-card border rounded-lg hover:bg-accent transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>
        
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
    initial: { scale: 0, opacity: 0, rotateX: -15 },
    animate: { scale: 1, opacity: 1, rotateX: 0, originY: 0 },
    exit: { scale: 0, opacity: 0, rotateX: 15 },
    transition: { type: "spring", stiffness: 350, damping: 25 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full perspective-1000">
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
      filter: "blur(8px)",
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.9,
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
            stiffness: 120,
            damping: 20,
            mass: 1,
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className} relative`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

// Novo componente: Cursor 3D seguidor
function CursorFollower() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 100, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

// Novo componente: Partículas flutuantes
function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 2 + 1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Novo componente: Métricas em tempo real
function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    activeModels: 6,
    totalRequests: 15420,
    responseTime: 245,
    uptime: 99.9,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeModels: prev.activeModels,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        responseTime: Math.floor(Math.random() * 100) + 200,
        uptime: 99.9,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Modelos Ativos</p>
            <motion.p 
              className="text-2xl font-bold text-blue-700 dark:text-blue-300"
              key={metrics.activeModels}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {metrics.activeModels}
            </motion.p>
          </div>
          <Network className="w-8 h-8 text-blue-500" />
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">Requisições</p>
            <motion.p 
              className="text-2xl font-bold text-green-700 dark:text-green-300"
              key={metrics.totalRequests}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {metrics.totalRequests.toLocaleString()}
            </motion.p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Tempo Resposta</p>
            <motion.p 
              className="text-2xl font-bold text-purple-700 dark:text-purple-300"
              key={metrics.responseTime}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {metrics.responseTime}ms
            </motion.p>
          </div>
          <Zap className="w-8 h-8 text-purple-500" />
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Uptime</p>
            <motion.p 
              className="text-2xl font-bold text-emerald-700 dark:text-emerald-300"
              key={metrics.uptime}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {metrics.uptime}%
            </motion.p>
          </div>
          <Shield className="w-8 h-8 text-emerald-500" />
        </div>
      </Card>
    </div>
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
  tier: "free" | "pro" | "enterprise";
  lastUpdated: string;
  popularity: number;
}

interface AINotification {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  model: string;
  priority: "high" | "medium" | "low";
}

const IasvibeCoding = () => {
  const [selectedModel, setSelectedModel] = useState("claude");
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterTier, setFilterTier] = useState<"all" | "free" | "pro" | "enterprise">("all");

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
      performance: { speed: 88, accuracy: 95, creativity: 92, reasoning: 96 },
      tier: "pro",
      lastUpdated: "2024-01-15",
      popularity: 96
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
      performance: { speed: 92, accuracy: 94, creativity: 89, reasoning: 97 },
      tier: "enterprise",
      lastUpdated: "2024-01-10",
      popularity: 98
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
      performance: { speed: 94, accuracy: 91, creativity: 87, reasoning: 93 },
      tier: "pro",
      lastUpdated: "2024-01-12",
      popularity: 92
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
      performance: { speed: 96, accuracy: 89, creativity: 85, reasoning: 88 },
      tier: "pro",
      lastUpdated: "2024-01-08",
      popularity: 89
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
      performance: { speed: 90, accuracy: 92, creativity: 88, reasoning: 91 },
      tier: "free",
      lastUpdated: "2024-01-14",
      popularity: 85
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
      performance: { speed: 85, accuracy: 87, creativity: 94, reasoning: 82 },
      tier: "free",
      lastUpdated: "2024-01-11",
      popularity: 78
    }
  ];

  const notifications: AINotification[] = [
    {
      name: "Claude 3.5 Sonnet deployed",
      description: "Enhanced reasoning capabilities",
      time: "2m ago",
      icon: "🧠",
      color: "#8B5CF6",
      model: "Claude",
      priority: "high"
    },
    {
      name: "GPT-4o integration complete",
      description: "Multimodal processing active",
      time: "5m ago",
      icon: "✨",
      color: "#10B981",
      model: "GPT-4",
      priority: "high"
    },
    {
      name: "Gemini Pro API connected",
      description: "Real-time search enabled",
      time: "8m ago",
      icon: "🌐",
      color: "#3B82F6",
      model: "Gemini",
      priority: "medium"
    },
    {
      name: "Copilot X features enabled",
      description: "Advanced code completion",
      time: "12m ago",
      icon: "💻",
      color: "#EC4899",
      model: "Copilot",
      priority: "medium"
    },
    {
      name: "Cursor AI workspace ready",
      description: "Intelligent code editor active",
      time: "15m ago",
      icon: "⚡",
      color: "#F59E0B",
      model: "Cursor",
      priority: "low"
    },
    {
      name: "v0 UI generator online",
      description: "Component generation ready",
      time: "18m ago",
      icon: "🎨",
      color: "#06B6D4",
      model: "v0",
      priority: "low"
    }
  ];

  const filteredModels = aiModels.filter(model => 
    filterTier === "all" || model.tier === filterTier
  );

  const Notification = ({ name, description, icon, color, time, model, priority }: AINotification) => {
    const priorityColors = {
      high: "border-red-200 bg-red-50 dark:bg-red-900/20",
      medium: "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20",
      low: "border-gray-200 bg-gray-50 dark:bg-gray-900/20"
    };

    return (
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          "transition-all duration-300 ease-in-out hover:scale-[103%] hover:shadow-lg",
          "bg-card border shadow-sm backdrop-blur-sm",
          priorityColors[priority]
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <motion.div
            className="flex size-10 items-center justify-center rounded-2xl"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-lg">{icon}</span>
          </motion.div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium">
              <span className="text-sm sm:text-lg">{name}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-muted-foreground">{time}</span>
            </figcaption>
            <p className="text-sm font-normal text-muted-foreground">
              {description}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {model}
              </Badge>
              <Badge 
                variant={priority === "high" ? "destructive" : priority === "medium" ? "default" : "outline"}
                className="text-xs"
              >
                {priority}
              </Badge>
            </div>
          </div>
        </div>
      </figure>
    );
  };

  const PerformanceChart = ({ model }: { model: AIModel }) => {
    const metrics = [
      { name: "Speed", value: model.performance.speed, color: "#10B981", icon: <Zap className="w-4 h-4" /> },
      { name: "Accuracy", value: model.performance.accuracy, color: "#3B82F6", icon: <CheckCircle className="w-4 h-4" /> },
      { name: "Creativity", value: model.performance.creativity, color: "#EC4899", icon: <Sparkles className="w-4 h-4" /> },
      { name: "Reasoning", value: model.performance.reasoning, color: "#8B5CF6", icon: <Brain className="w-4 h-4" /> }
    ];

    return (
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium flex items-center gap-2">
                {metric.icon}
                {metric.name}
              </span>
              <span className="text-muted-foreground">{metric.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-3 rounded-full relative"
                style={{ backgroundColor: metric.color }}
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ModelCard = ({ model, isSelected, onClick }: { model: AIModel; isSelected: boolean; onClick: () => void }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("relative overflow-hidden", isSelected && "ring-2 ring-primary")}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm" onClick={onClick}>
        <CardHeader className="relative">
          <div className="absolute top-2 right-2 flex gap-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-medium">{model.popularity}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${model.color}20`, color: model.color }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {model.icon}
              </motion.div>
              <div>
                <CardTitle className="text-lg">{model.name}</CardTitle>
                <CardDescription>{model.version}</CardDescription>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant={model.status === "active" ? "default" : model.status === "beta" ? "secondary" : "outline"}
              className="text-xs"
            >
              {model.status === "active" ? "Ativo" : model.status === "beta" ? "Beta" : "Em Breve"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {model.tier}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Atualizado: {new Date(model.lastUpdated).toLocaleDateString('pt-BR')}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Principais Recursos:
            </h4>
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
  );

  const selectedModelData = aiModels.find(m => m.id === selectedModel) || aiModels[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <FloatingParticles />
      <CursorFollower />
      
      <div className="w-full max-w-7xl mx-auto space-y-8 p-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              IAs no{" "}
              <AnimatedTextCycle
                words={["Vibe Coding", "Desenvolvimento", "Futuro", "Código"]}
                interval={3000}
                className="text-primary"
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore todas as inteligências artificiais utilizadas e disponíveis no Vibe Coding para revolucionar seu desenvolvimento
            </p>
          </motion.div>
          
          <LiveMetrics />
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="models">Modelos IA</TabsTrigger>
            <TabsTrigger value="notifications">Atividades</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Model Overview */}
              <Card className="p-6 bg-gradient-to-br from-card to-muted/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Modelo em Destaque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${selectedModelData.color}20`, color: selectedModelData.color }}
                      >
                        {selectedModelData.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{selectedModelData.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedModelData.version}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedModelData.description}</p>
                    <PerformanceChart model={selectedModelData} />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 bg-gradient-to-br from-card to-muted/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Modelos Ativos</span>
                      <Badge variant="default">{aiModels.filter(m => m.status === "active").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Em Beta</span>
                      <Badge variant="secondary">{aiModels.filter(m => m.status === "beta").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tier Gratuito</span>
                      <Badge variant="outline">{aiModels.filter(m => m.tier === "free").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Popularidade Média</span>
                      <Badge variant="default">
                        {Math.round(aiModels.reduce((acc, m) => acc + m.popularity, 0) / aiModels.length)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-background/50">
                      <div className="flex-shrink-0">
                        <span className="text-lg">{notification.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{notification.name}</p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-xs text-muted-foreground">
                        {notification.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            {/* Filters */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-lg border transition-colors",
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                  )}
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-lg border transition-colors",
                    viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                  )}
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Filtrar por tier:</span>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value as any)}
                  className="px-3 py-1 rounded-lg border bg-background text-sm"
                >
                  <option value="all">Todos</option>
                  <option value="free">Gratuito</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>

            {/* Models Grid/List */}
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {filteredModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isSelected={selectedModel === model.id}
                  onClick={() => setSelectedModel(model.id)}
                />
              ))}
            </div>

            {/* Selected Model Details */}
            {selectedModel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-br from-card to-muted/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${selectedModelData.color}20`, color: selectedModelData.color }}
                      >
                        {selectedModelData.icon}
                      </div>
                      <div>
                        <span>{selectedModelData.name}</span>
                        <div className="text-sm text-muted-foreground font-normal">
                          {selectedModelData.version}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Capacidades
                          </h4>
                          <div className="space-y-2">
                            {selectedModelData.capabilities.map((capability, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm">{capability}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Rocket className="w-4 h-4" />
                            Casos de Uso
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedModelData.useCases.map((useCase, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {useCase}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Performance
                        </h4>
                        <PerformanceChart model={selectedModelData} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Atividades Recentes</h2>
              <p className="text-muted-foreground">Acompanhe as atualizações e deployments dos modelos IA</p>
            </div>

            <AnimatedList className="w-full max-w-4xl mx-auto">
              {notifications.map((notification, index) => (
                <Notification key={index} {...notification} />
              ))}
            </AnimatedList>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Analytics & Insights</h2>
              <p className="text-muted-foreground">Métricas detalhadas e análises dos modelos IA</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Comparison */}
              <Card className="p-6 bg-gradient-to-br from-card to-muted/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Comparação de Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiModels.slice(0, 4).map((model) => (
                      <div key={model.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: model.color }}
                            />
                            {model.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((model.performance.speed + model.performance.accuracy + model.performance.creativity + model.performance.reasoning) / 4)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="h-2 rounded-full"
                            style={{ backgroundColor: model.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round((model.performance.speed + model.performance.accuracy + model.performance.creativity + model.performance.reasoning) / 4)}%` }}
                            transition={{ duration: 1, delay: 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Usage Statistics */}
              <Card className="p-6 bg-gradient-to-br from-card to-muted/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Estatísticas de Uso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiModels.map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${model.color}20`, color: model.color }}
                          >
                            {model.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{model.name}</p>
                            <p className="text-xs text-muted-foreground">{model.tier}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-sm font-medium">{model.popularity}%</span>
                          </div>
                          <Badge 
                            variant={model.status === "active" ? "default" : model.status === "beta" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {model.status === "active" ? "Ativo" : model.status === "beta" ? "Beta" : "Em Breve"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Análise Detalhada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {aiModels.filter(m => m.status === "active").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Modelos Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round(aiModels.reduce((acc, m) => acc + m.popularity, 0) / aiModels.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Popularidade Média</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {aiModels.filter(m => m.tier === "free").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Modelos Gratuitos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IasvibeCoding;
