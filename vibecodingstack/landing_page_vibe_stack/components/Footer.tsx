import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Mail, Github, Twitter, Linkedin, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-dark-50 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">VS</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Vibe Stack
                </h3>
                <p className="text-gray-400 text-sm">Desenvolvimento Moderno</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Stack completo para desenvolvimento moderno com ferramentas integradas, 
              bancos de dados em nuvem e deploy automatizado.
            </p>

            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm">Feito no Brasil por</span>
              <span className="font-semibold text-white">orientohub</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Pompeia, Brasil</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {["Stack Principal", "Databases", "Deploy", "GitHub Flow"].map((link, idx) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                >
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a 
                  href="mailto:contato@orientohub.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  orientohub@gmail.com
                </a>
              </div>

              {/* WhatsApp Community Link */}
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <a 
                  href="https://chat.whatsapp.com/CF2pLdoltqD2smaEYWCk4u" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                >
                  Comunidade Vibe Coding
                </a>
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                {[
                  { icon: Github, href: "#", label: "GitHub", color: "hover:from-gray-600 hover:to-gray-700" },
                  { icon: Twitter, href: "#", label: "Twitter", color: "hover:from-blue-500 hover:to-blue-600" },
                  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:from-blue-600 hover:to-blue-700" },
                  { 
                    icon: MessageCircle, 
                    href: "https://chat.whatsapp.com/sua-comunidade-vibe-coding", 
                    label: "WhatsApp Community",
                    color: "hover:from-green-500 hover:to-green-600",
                    external: true
                  },
                ].map((social, idx) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-8 h-8 bg-gray-800 dark:bg-dark-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r ${social.color || 'hover:from-purple-500 hover:to-cyan-500'} transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-800 dark:border-dark-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} orientohub. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                CNPJ: 48.809.603/0001-65
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
    </footer>
  );
};
