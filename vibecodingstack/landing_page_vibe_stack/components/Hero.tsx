import React, { useState, useEffect } from "react";
import { Code, Database, Cloud, Zap, ChevronDown, Sparkles, Globe, Rocket } from "lucide-react";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack = [
    { 
      icon: Code, 
      label: "Frontend", 
      tech: "React • Next.js • TypeScript",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: Database, 
      label: "Backend", 
      tech: "Node.js • Python • PostgreSQL",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Cloud, 
      label: "Deploy", 
      tech: "AWS • Vercel • Docker",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: Zap, 
      label: "CI/CD", 
      tech: "GitHub Actions • Jenkins",
      color: "from-orange-500 to-red-500"
    },
  ];

  const floatingIcons = [
    { icon: Sparkles, delay: 0, duration: 3 },
    { icon: Globe, delay: 1, duration: 4 },
    { icon: Rocket, delay: 2, duration: 3.5 },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {floatingIcons.map((item, idx) => (
          <div
            key={idx}
            className={`absolute opacity-10 animate-pulse`}
            style={{
              left: `${20 + idx * 25}%`,
              top: `${30 + idx * 15}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`
            }}
          >
            <item.icon className="w-24 h-24 text-white" />
          </div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          
          {/* Main Title */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">Stack Completo de Desenvolvimento</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent inline-block animate-pulse">
                Vibe
              </span>
              <span className="text-white ml-4">Coding</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Plataforma completa para desenvolvimento moderno com ferramentas integradas, 
              <br className="hidden md:block" />
              CI/CD automatizado e deploy simplificado
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Code className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-semibold">Começar a Codar</span>
              </div>
            </button>
            
            <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold">Explorar Stack</span>
              </div>
            </button>
          </div>

          {/* Tech Stack Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {techStack.map((item, idx) => (
              <div
                key={idx}
                className={`group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer ${
                  activeCard === idx ? 'scale-105 bg-white/10' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {item.tech}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm">Explore mais</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};
