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
    logo: "🐘",
    features: ["Serverless", "Auto-scaling", "Branching"]
  },
  {
    name: "Supabase",
    type: "SQL",
    description: "Plataforma completa com PostgreSQL, autenticação e APIs em tempo real",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    logo: "⚡",
    features: ["PostgreSQL", "Auth", "Real-time"]
  },
  {
    name: "Firebase Realtime / Firestore",
    type: "NoSQL",
    description: "Banco de dados NoSQL em tempo real com sincronização automática",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    logo: "🔥",
    features: ["Real-time", "Offline", "Scalable"]
  }
];

export const CloudDatabases: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"
        >
          Bancos de Dados em Nuvem
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {databases.map((db, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${db.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{db.logo}</div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      db.type === 'SQL' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {db.type}
                    </span>
                    <db.icon className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">{db.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{db.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Recursos principais:</h4>
                  {db.features.map((feature, featureIdx) => (
                    <motion.div
                      key={featureIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + featureIdx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${db.color}`}></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};