"use client";

import { HorizontalScrollGallery } from "./HorizontalScrollGallery";

export default function HorizontalScrollGalleryDemo() {
  return (
    <div className="bg-gray-50 rounded-lg">
      <div className="text-center pt-10 pb-4 px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Horizontal Scroll Gallery
        </h2>
        <p className="text-gray-600">
          Scroll down normally — your vertical scroll drives the gallery
          sideways while the section stays pinned
        </p>
      </div>

      <HorizontalScrollGallery
        items={[
          {
            title: "Roof Renovation",
            subtitle: "Before the transformation",
            image: "/Demo/roof-before.jpg",
          },
          {
            title: "Finished Result",
            subtitle: "After the transformation",
            image: "/Demo/roof-after.jpg",
          },
          {
            title: "Sunset Collection",
            subtitle: "Warm gradient showcase",
            gradient: "from-orange-500 to-pink-600",
          },
          {
            title: "Ocean Depths",
            subtitle: "Cool gradient showcase",
            gradient: "from-blue-600 to-cyan-400",
          },
          {
            title: "Northern Lights",
            subtitle: "Vivid gradient showcase",
            gradient: "from-purple-600 to-emerald-400",
          },
          {
            title: "The End",
            subtitle: "Scroll resumes normally from here",
            gradient: "from-gray-800 to-gray-950",
          },
        ]}
      />

      <div className="text-center py-16 px-8">
        <p className="text-gray-600">
          …and you&apos;re back to normal vertical scrolling 🎉
        </p>
      </div>
    </div>
  );
}
