import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Cloud, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 md:px-12 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white dark:text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 dark:from-purple-300 dark:via-pink-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Vibe Coding
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-200 max-w-3xl mx-auto">
            Stack completo para desenvolvimento moderno com ferramentas integradas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Code className="w-5 h-5" />
            Começar a Codar
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Database className="w-5 h-5" />
            Explorar Stack
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { icon: Code, label: "Frontend" },
            { icon: Database, label: "Backend" },
            { icon: Cloud, label: "Deploy" },
            { icon: Zap, label: "CI/CD" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/5"
            >
              <item.icon className="w-8 h-8 text-cyan-400 dark:text-cyan-300" />
              <span className="text-sm text-gray-300 dark:text-gray-200">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};