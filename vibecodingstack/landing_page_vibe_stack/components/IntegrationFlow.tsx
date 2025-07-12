import React from "react";
import { DatabaseWithRestApi } from "./DatabaseWithRestApi";
import { motion } from "framer-motion";

export const IntegrationFlow: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-gray-600 max-w-3xl mx-auto">
            Conecte seu frontend com APIs REST e bancos de dados modernos para criar aplicações completas e escaláveis
          </p>
        </motion.div>

        <DatabaseWithRestApi
          title="Fluxo de Integração REST API"
          circleText="API"
          lightColor="#00A6F5"
          badgeTexts={{
            first: "GET",
            second: "POST",
            third: "PUT",
            fourth: "DELETE",
          }}
          buttonTexts={{
            first: "Firebase",
            second: "v2_updates",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Frontend Request</h3>
            <p className="text-sm text-gray-600">Interface reativa envia requisições para a API</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">API Processing</h3>
            <p className="text-sm text-gray-600">REST API processa e valida os dados</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Database Sync</h3>
            <p className="text-sm text-gray-600">Dados sincronizados com banco em tempo real</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};