import React from "react";
import { motion } from "framer-motion";

interface DatabaseWithRestApiProps {
  title: string;
  circleText: string;
  lightColor: string;
  badgeTexts: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts: {
    first: string;
    second: string;
  };
}

export const DatabaseWithRestApi: React.FC<DatabaseWithRestApiProps> = ({
  title,
  circleText,
  lightColor,
  badgeTexts,
  buttonTexts,
}) => {
  return (
    <section className="py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Central API Circle */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl"
              style={{ backgroundColor: lightColor }}
            >
              {circleText}
            </div>
          </motion.div>

          {/* HTTP Methods Badges */}
          <div className="grid grid-cols-2 gap-4">
            {Object.values(badgeTexts).map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold shadow-md"
              >
                {method}
              </motion.div>
            ))}
          </div>

          {/* Connection Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-0.5 bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 opacity-60"></div>
          </motion.div>

          {/* Database Buttons */}
          <div className="flex flex-col gap-4">
            {Object.values(buttonTexts).map((text, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {text}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Flow Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 max-w-3xl mx-auto">
            Integração completa entre frontend e backend através de APIs REST,
            conectando bancos de dados modernos com interfaces reativas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};