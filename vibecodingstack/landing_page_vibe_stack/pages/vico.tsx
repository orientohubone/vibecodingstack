"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Code, Users, Zap, Moon, Sun, Github, Twitter, Linkedin, Mail, ArrowRight, Star, MessageCircle, Heart, MapPin } from 'lucide-react';

// Hook personalizado para gerenciar tema
const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

// Componente ThemeToggle
const ThemeToggle = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
  <motion.button
    onClick={toggleTheme}
    className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
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
          <Moon className="w-5 h-5 text-gray-700" />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-5 h-5 text-yellow-400" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// Componente FloatingParticles
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-purple-500/20 dark:bg-purple-400/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
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

// Componente Card personalizado
const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Componente Button personalizado
const Button = ({ children, variant = "default", size = "default", className = "", ...props }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
    outline: "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-purple-500",
  };
  
  const sizes = {
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente Badge personalizado
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200",
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Seção Vico Expert
const VicoExpertSection = ({ className = "" }) => {
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
    { icon: Code, label: "Desenvolvimento", color: "text-blue-600 dark:text-blue-400" },
    { icon: Bot, label: "IA & Machine Learning", color: "text-purple-600 dark:text-purple-400" },
    { icon: Users, label: "Mentoria", color: "text-green-600 dark:text-green-400" },
    { icon: Zap, label: "Automação", color: "text-yellow-600 dark:text-yellow-400" },
  ];

  const stats = [
    { value: "5000+", label: "Desenvolvedores Ajudados" },
    { value: "24/7", label: "Disponibilidade" },
    { value: "100+", label: "Projetos Concluídos" },
    { value: "98%", label: "Satisfação" },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden ${className}`}>
      <FloatingParticles />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4 py-12 md:py-20 relative z-10 max-w-7xl"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Especialista IA da VibeCoding
          </Badge>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Conheça o Vico
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Seu assistente de IA especializado em desenvolvimento, dedicado a impulsionar a comunidade VibeCoding com soluções inteligentes e mentoria personalizada.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Avatar and Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                        <Bot className="w-12 h-12 md:w-16 md:h-16 text-purple-600" />
                      </div>
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Vico AI</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Agente de IA Especializado</p>
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
                  className="p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <skill.icon className={`w-8 h-8 mb-3 ${skill.color}`} />
                  <h3 className="font-semibold text-sm">{skill.label}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Features and CTA */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardContent className="p-0 space-y-6">
                <h3 className="text-2xl font-bold mb-4">Como posso te ajudar?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Desenvolvimento de Código</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ajudo com debugging, otimização e melhores práticas de programação.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Mentoria Personalizada</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Orientação em carreira, projetos e crescimento profissional.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Soluções IA</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Implementação de machine learning e automação inteligente.</p>
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
                  className="text-center p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Community Section */}
        <motion.div variants={itemVariants} className="text-center">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border-purple-200 dark:border-purple-800">
            <CardContent className="p-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Parte da Comunidade VibeCoding</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
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

// Componente Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">VS</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Vibe Stack
                </h3>
                <p className="text-gray-400 text-sm">Desenvolvimento Moderno</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Stack completo para desenvolvimento moderno com ferramentas integradas, 
              bancos de dados em nuvem e deploy automatizado.
            </p>

            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm">Feito no Brasil por</span>
              <span className="font-semibold text-white">orientohub</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Pompeia, Brasil</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {["Stack Principal", "Databases", "Deploy", "GitHub Flow"].map((link, idx) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                >
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a 
                  href="mailto:orientohub@gmail.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  orientohub@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social, idx) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-800 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} orientohub. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                CNPJ: 48.809.603/0001-65
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
    </footer>
  );
};

// Componente principal que combina Vico + Footer
export default function VicoPageWithFooter() {
  return (
    <div className="min-h-screen">
      <VicoExpertSection />
      <Footer />
    </div>
  );
}
