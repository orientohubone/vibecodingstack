import React from "react";
import { motion } from "framer-motion";
import { Globe, Zap, GitBranch, Rocket } from "lucide-react";

const deployPlatforms = [
  {
    name: "Netlify",
    description: "Plataforma de deploy com edge functions e formulários integrados",
    logo: "🌐",
    color: "from-teal-500 to-cyan-500",
    darkColor: "dark:from-teal-600 dark:to-cyan-600",
    features: ["Edge Functions", "Form Handling", "Split Testing"],
    workflow: ["git push", "build", "deploy", "live"]
  },
  {
    name: "Vercel",
    description: "Deploy otimizado para frameworks frontend com performance máxima",
    logo: "▲",
    color: "from-gray-600 to-gray-800",
    darkColor: "dark:from-gray-500 dark:to-gray-700",
    features: ["Zero Config", "Edge Network", "Analytics"],
    workflow: ["git push", "build", "deploy", "live"]
  }
];

export const DeployOptions: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-gray-50 to-white dark:from-dark-100 dark:to-dark-200">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent"
        >
          Opções de Deploy
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {deployPlatforms.map((platform, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-100 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-200"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} ${platform.darkColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{platform.logo}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{platform.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{platform.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recursos principais:</h4>
                  <div className="space-y-2">
                    {platform.features.map((feature, featureIdx) => (
                      <motion.div
                        key={featureIdx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + featureIdx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color} ${platform.darkColor}`}></div>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Fluxo CI/CD
                  </h4>
                  <div className="flex items-center justify-between">
                    {platform.workflow.map((step, stepIdx) => (
                      <React.Fragment key={stepIdx}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 + stepIdx * 0.1 }}
                          className="flex flex-col items-center"
                        >
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${platform.color} ${platform.darkColor} flex items-center justify-center`}>
                            {stepIdx === 0 && <GitBranch className="w-5 h-5 text-white" />}
                            {stepIdx === 1 && <Zap className="w-5 h-5 text-white" />}
                            {stepIdx === 2 && <Rocket className="w-5 h-5 text-white" />}
                            {stepIdx === 3 && <Globe className="w-5 h-5 text-white" />}
                          </div>
                          <span className="text-xs mt-2 text-gray-600 dark:text-gray-300 font-medium">{step}</span>
                        </motion.div>
                        {stepIdx < platform.workflow.length - 1 && (
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 0.6, delay: 0.6 + stepIdx * 0.1 }}
                            className="flex-1 h-0.5 bg-gray-200 dark:bg-dark-200 mx-2"
                          >
                            <div className={`h-full bg-gradient-to-r ${platform.color} ${platform.darkColor} transition-all duration-1000`}></div>
                          </motion.div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-200">
            <span>⚡</span>
            <span>Deploy instantâneo com cada commit</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};