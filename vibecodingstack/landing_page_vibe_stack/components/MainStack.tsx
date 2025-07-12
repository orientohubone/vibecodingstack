import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, Terminal, MousePointer, Database } from "lucide-react";

const stackTools = [
  {
    name: "Lovable",
    description: "Plataforma de desenvolvimento visual para criar aplicações web rapidamente",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    logo: "❤️"
  },
  {
    name: "Bolt",
    description: "Ferramenta de construção ultra-rápida para projetos JavaScript",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    logo: "⚡"
  },
  {
    name: "Replit",
    description: "IDE online colaborativo com ambientes de desenvolvimento prontos",
    icon: Terminal,
    color: "from-green-500 to-emerald-500",
    logo: "🔧"
  },
  {
    name: "Cursor AI",
    description: "Editor de código com inteligência artificial para desenvolvimento assistido",
    icon: MousePointer,
    color: "from-blue-500 to-cyan-500",
    logo: "🎯"
  },
  {
    name: "Firebase Studio",
    description: "Plataforma completa para desenvolvimento de aplicações em tempo real",
    icon: Database,
    color: "from-orange-500 to-red-500",
    logo: "🔥"
  }
];

export const MainStack: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"
        >
          Stack Principal
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stackTools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{tool.logo}</div>
                  <tool.icon className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{tool.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tool.description}</p>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                  className={`mt-6 h-1 bg-gradient-to-r ${tool.color} rounded-full`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};