import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";
import { DatabaseWithRestApi } from "@/components/DatabaseWithRestApi";
import { GitHubIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-12 px-4 md:px-12 py-8 bg-gradient-to-b from-purple-100 via-blue-50 to-cyan-50">
      <Hero />

      <section>
        <h2 className="text-3xl font-bold mb-6">Stack Principal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Lovable", "Bolt", "Replit", "Cursor AI", "Firebase Studio"].map((tool, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md bg-white text-center"
            >
              <div className="text-2xl font-semibold mb-2">{tool}</div>
              <p className="text-sm text-gray-600">{tool} é uma ferramenta essencial para produtividade e integração no fluxo vibe coding.</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Bancos de Dados em Nuvem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Neon PostgreSQL", type: "SQL" },
            { name: "Supabase", type: "SQL" },
            { name: "Firebase Realtime / Firestore", type: "NoSQL" },
          ].map((db, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl shadow-md bg-white text-center"
            >
              <div className="text-xl font-bold mb-2">{db.name}</div>
              <p className="text-sm text-gray-600">Banco de dados {db.type}, ideal para aplicações web modernas.</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><GitHubIcon className="w-6 h-6" /> Fluxo com GitHub</h2>
        <motion.ol className="space-y-4 pl-4 border-l-4 border-purple-300">
          {["Criar conta no GitHub", "Conectar com Cursor AI", "Versionar e automatizar deploy"].map((step, i) => (
            <motion.li key={i} className="pl-4 relative">
              <span className="absolute left-0 -ml-2 w-3 h-3 bg-purple-400 rounded-full"></span>
              {step}
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Opções de Deploy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Netlify", "Vercel"].map((platform, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl shadow-md bg-white"
            >
              <div className="text-2xl font-semibold mb-2">{platform}</div>
              <p className="text-sm text-gray-600">Deploy contínuo com fluxo CI/CD: <code>git push → build → deploy</code></p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <DatabaseWithRestApi
          title="Fluxo de integração REST API"
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
      </section>
    </main>
  );
}
