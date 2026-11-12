import { getAgentBySlug } from "@/lib/data/agents";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {agent.name}
          </h1>
          <p className="text-lg text-gray-600">{agent.longDescription}</p>
        </div>


        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tech Stack */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {agent.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {agent.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Links</h3>
            <div className="space-y-2">
              <a
                href={agent.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-indigo-600 hover:text-indigo-700 font-medium"
              >
                → View Code
              </a>
              <a
                href={agent.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-indigo-600 hover:text-indigo-700 font-medium"
              >
                → Live Link
              </a>
            </div>
          </div>
        </div>

        {/* Prompt */}
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Agent Prompt
          </h3>
          <div className="bg-gray-50 p-4 rounded border border-gray-300">
            <code className="text-sm text-gray-700">{agent.prompt}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
