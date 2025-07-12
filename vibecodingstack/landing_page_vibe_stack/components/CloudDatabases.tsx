import React from "react";
import { motion } from "framer-motion";
import { Database, Server, Cloud } from "lucide-react";

const databases = [
  {
    name: "Neon PostgreSQL",
    type: "SQL",
    description: "Banco PostgreSQL serverless com branching automático e alta performance",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    darkColor: "dark:from-green-600 dark:to-emerald-600",
    logo: "🐘",
    features: ["Serverless", "Auto-scaling", "Branching"]
  },
  {
    name: "Supabase",
    type: "SQL",
    description: "Plataforma completa com PostgreSQL, autenticação e APIs em tempo real",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    darkColor: "dark:from-emerald-600 dark:to-teal-600",
    logo: "⚡",
    features: ["PostgreSQL", "Auth", "Real-time"]
  },
  {
    name: "Firebase Realtime / Firestore",
    type: "NoSQL",
    description: "Banco de dados NoSQL em tempo real com sincronização automática",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    darkColor: "dark:from-orange-600 dark:to-red-600",
    logo: "🔥",
    features: ["Real-time", "Offline", "Scalable"]
  }
];

export const CloudDatabases: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Cloud Databases
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bancos de dados modernos em nuvem para aplicações escaláveis e performáticas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {databases.map((db, index) => (
            <motion.div
              key={db.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="h-full p-6 bg-white dark:bg-dark-50 rounded-2xl shadow-lg dark:shadow-xl border border-gray-200 dark:border-dark-200 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${db.color} ${db.darkColor} text-white`}>
                      <db.icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl">{db.logo}</div>
                  </div>
                  
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    db.type === 'SQL' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                  }`}>
                    {db.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {db.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {db.description}
                </p>
                
                <div className="space-y-2">
                  {db.features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${db.color} ${db.darkColor}`}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`mt-4 h-1 bg-gradient-to-r ${db.color} ${db.darkColor} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};