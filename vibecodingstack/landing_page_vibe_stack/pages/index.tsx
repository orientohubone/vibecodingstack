import React from "react";
import { Hero } from "../components/Hero";
import { MainStack } from "../components/MainStack";
import { TechFrameworks } from "../components/TechFrameworks";
import IasvibeCoding from "../components/IasvibeCoding";
import { CloudDatabases } from "../components/CloudDatabases";
import { GitHubFlow } from "../components/GitHubFlow";
import { DeployOptions } from "../components/DeployOptions";
import { IntegrationFlow } from "../components/IntegrationFlow";
import { Footer } from "../components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-cyan-50 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200 transition-colors duration-300">
      <Hero />
      <MainStack />
      <TechFrameworks />
      <IasvibeCoding />
      <CloudDatabases />
      <GitHubFlow />
      <DeployOptions />
      <IntegrationFlow />
      <Footer />
    </main>
  );
}
