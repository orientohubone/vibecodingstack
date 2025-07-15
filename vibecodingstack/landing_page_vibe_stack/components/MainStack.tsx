import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, Terminal, MousePointer, Database } from "lucide-react";

const stackTools = [
  {
    name: "Lovable",
    description: "Plataforma de desenvolvimento visual para criar aplicações web rapidamente",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    darkColor: "dark:from-pink-600 dark:to-rose-600"
  },
  {
    name: "Bolt",
    description: "Ferramenta de construção ultra-rápida para projetos JavaScript",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    darkColor: "dark:from-yellow-600 dark:to-orange-600"
  },
  {
    name: "Replit",
    description: "IDE online colaborativo com ambientes de desenvolvimento prontos",
    icon: Terminal,
    color: "from-green-500 to-emerald-500",
    darkColor: "dark:from-green-600 dark:to-emerald-600"
  },
  {
    name: "Cursor AI",
    description: "Editor de código com IA integrada para desenvolvimento assistido",
    icon: MousePointer,
    color: "from-blue-500 to-indigo-500",
    darkColor: "dark:from-blue-600 dark:to-indigo-600"
  },
  {
    name: "Firebase Studio",
    description: "Plataforma completa para desenvolvimento de aplicações em tempo real",
    icon: Database,
    color: "from-orange-500 to-red-500",
    darkColor: "dark:from-orange-600 dark:to-red-600"
  }
];

export const MainStack: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-white to-gray-50 dark:from-dark-50 dark:to-dark-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Main Stack
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ferramentas principais que compõem nosso stack de desenvolvimento moderno
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="h-full p-6 bg-white dark:bg-dark-100 rounded-2xl shadow-md dark:shadow-xl border border-gray-200 dark:border-dark-200 hover:shadow-xl dark:hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} ${tool.darkColor} text-white`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  {/* Logo removido */}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                
                {/* Barra duplicada removida */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-1 bg-gradient-to-r ${tool.color} ${tool.darkColor} rounded-full mt-1`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
