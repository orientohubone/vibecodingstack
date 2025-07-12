import React from "react";
import { motion } from "framer-motion";
import { Github, UserPlus, Link, GitBranch, Rocket } from "lucide-react";

const flowSteps = [
  {
    title: "Criar Conta no GitHub",
    description: "Configure sua conta e perfil para começar a versionar seus projetos",
    icon: UserPlus,
    color: "from-purple-500 to-pink-500",
    darkColor: "dark:from-purple-600 dark:to-pink-600",
    step: "01"
  },
  {
    title: "Conectar com Cursor AI",
    description: "Integre o Cursor AI com sua conta GitHub para desenvolvimento assistido",
    icon: Link,
    color: "from-blue-500 to-cyan-500",
    darkColor: "dark:from-blue-600 dark:to-cyan-600",
    step: "02"
  },
  {
    title: "Versionar Código",
    description: "Use git para controlar versões e criar branches para novas features",
    icon: GitBranch,
    color: "from-green-500 to-emerald-500",
    darkColor: "dark:from-green-600 dark:to-emerald-600",
    step: "03"
  },
  {
    title: "Automatizar Deploy",
    description: "Configure GitHub Actions para deploy automático a cada push",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    darkColor: "dark:from-orange-600 dark:to-red-600",
    step: "04"
  }
];

export const GitHubFlow: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-white dark:bg-dark-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-10 h-10 text-gray-800 dark:text-white" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Fluxo com GitHub
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Integre todo seu fluxo de desenvolvimento com GitHub para versionamento e deploy automático
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 dark:from-purple-800 dark:via-blue-800 dark:to-cyan-800 transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {flowSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative z-10 group"
              >
                <div className="bg-white dark:bg-dark-100 rounded-2xl shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 p-6 text-center border border-gray-200 dark:border-dark-200">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} ${step.darkColor} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 dark:bg-dark-50 text-white dark:text-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                    className={`mt-6 h-1 bg-gradient-to-r ${step.color} ${step.darkColor} rounded-full`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-dark-100 rounded-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-200">
            <span>🚀</span>
            <span>git push → GitHub Actions → Deploy Automático</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};