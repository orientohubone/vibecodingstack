"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Code, Users, Zap, Moon, Sun, Github, Twitter, Linkedin, Mail, ArrowRight, Star, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VicoExpertSectionProps {
  className?: string;
}

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

const ThemeToggle: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
  <motion.button
    onClick={toggleTheme}
    className="fixed top-6 right-6 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label="Toggle theme"
  >
    <AnimatePresence mode="wait">
      {theme === 'light' ? (
        <motion.div
          key="moon"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-5 h-5 text-foreground" />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-5 h-5 text-foreground" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const VicoExpertSection: React.FC<VicoExpertSectionProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const skills = [
    { icon: Code, label: "Desenvolvimento", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { icon: Bot, label: "IA & Machine Learning", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    { icon: Users, label: "Mentoria", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
    { icon: Zap, label: "Automação", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  ];

  const stats = [
    { value: "5000+", label: "Desenvolvedores Ajudados" },
    { value: "24/7", label: "Disponibilidade" },
    { value: "100+", label: "Projetos Concluídos" },
    { value: "98%", label: "Satisfação" },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground relative overflow-hidden ${className}`}>
      <FloatingParticles />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 py-12 md:py-20 relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Especialista IA da VibeCoding
          </Badge>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Conheça o Vico
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Seu assistente de IA especializado em desenvolvimento, dedicado a impulsionar a comunidade VibeCoding com soluções inteligentes e mentoria personalizada.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Avatar and Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 p-1">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <Bot className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Vico AI</h2>
                    <p className="text-muted-foreground mb-4">Agente de IA Especializado</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Node.js</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <skill.icon className={`w-8 h-8 mb-3 ${skill.color.split(' ')[1]} ${skill.color.split(' ')[2]}`} />
                  <h3 className="font-semibold text-sm">{skill.label}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Features and CTA */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
              <CardContent className="p-0 space-y-6">
                <h3 className="text-2xl font-bold mb-4">Como posso te ajudar?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Desenvolvimento de Código</h4>
                      <p className="text-sm text-muted-foreground">Ajudo com debugging, otimização e melhores práticas de programação.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Mentoria Personalizada</h4>
                      <p className="text-sm text-muted-foreground">Orientação em carreira, projetos e crescimento profissional.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Soluções IA</h4>
                      <p className="text-sm text-muted-foreground">Implementação de machine learning e automação inteligente.</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full group" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conversar com Vico
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Community Section */}
        <motion.div variants={itemVariants} className="text-center">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Parte da Comunidade VibeCoding</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Conecte-se com milhares de desenvolvedores, compartilhe conhecimento e cresça junto com nossa comunidade vibrante.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg" className="group">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function VicoExpertDemo() {
  return <VicoExpertSection />;
}
