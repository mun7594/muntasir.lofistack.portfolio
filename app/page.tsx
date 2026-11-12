import Hero from "@/lib/components/Hero";
import ComponentCard from "@/lib/components/ComponentCard";
import AgentCard from "@/lib/components/AgentCard";
import { getLatestComponents, components } from "@/lib/data/components";
import { getLatestAgents } from "@/lib/data/agents";
import Link from "next/link";

export default function Home() {
  const latestComponents = getLatestComponents(4);
  const latestAgents = getLatestAgents(4);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Components Section */}
      <section id="components" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              Components
              <span className="text-sm font-bold bg-gray-900 text-white px-3 py-1 rounded-full align-middle">
                {components.length}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              A collection of {components.length} modern, reusable React
              components built with TypeScript and Tailwind CSS. Each component
              is production-ready and fully responsive.
            </p>
          </div>

          {/* Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {latestComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>

          {/* Show All Button */}
          <div className="flex justify-center">
            <Link
              href="/components"
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold"
            >
              View All Components
            </Link>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              AI Agents
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Intelligent automation solutions powered by AI. Each agent is
              designed to solve real problems and demonstrate the power of
              AI-driven workflows.
            </p>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {latestAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          {/* Show All Button */}
          <div className="flex justify-center">
            <Link
              href="/agents"
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold"
            >
              View All Agents
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
