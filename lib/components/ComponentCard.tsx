import Link from "next/link";
import { Component } from "@/lib/data/components";
import ComponentThumbnail from "./ComponentThumbnail";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const formattedDate = new Date(component.createdDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Link href={`/components/${component.slug}`}>
      <div className="group cursor-pointer h-full">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:border-gray-400 hover:shadow-lg hover:scale-105 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative w-full h-48 overflow-hidden">
            <ComponentThumbnail slug={component.slug} />
            <span className="absolute top-3 left-3 z-10 font-mono text-[11px] text-gray-600 bg-white/85 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-sm">
              #{String(component.componentNumber).padStart(2, "0")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded capitalize">
                {component.type}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Week {String(component.week).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors mb-2">
              {component.name}
            </h3>

            <p className="text-sm text-gray-600 mb-4 flex-1">
              {component.description}
            </p>

            <div className="text-xs text-gray-400 pt-3 border-t border-gray-100">
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
