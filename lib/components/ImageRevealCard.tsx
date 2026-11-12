"use client";

interface CardAction {
  label: string;
  onClick?: () => void;
}

interface ImageRevealCardProps {
  image: string;
  title: string;
  description?: string;
  category?: string;
  actions?: CardAction[];
}

export function ImageRevealCard({
  image,
  title,
  description,
  category,
  actions = [],
}: ImageRevealCardProps) {
  return (
    <div
      className="group relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-900"
      tabIndex={0}
      aria-label={`${title} card`}
    >
      {/* Image with zoom effect */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-within:scale-110 group-focus:scale-110"
      />

      {/* Gradient overlay — fades in on hover/focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-focus:opacity-100 transition-opacity duration-500" />

      {/* Category badge — always visible */}
      {category && (
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full">
          {category}
        </span>
      )}

      {/* Content — slides up on hover/focus */}
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 group-focus:translate-y-0 transition-transform duration-500 ease-out">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        {description && (
          <p className="text-sm text-gray-200 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {actions.length > 0 && (
          <div className="flex gap-3">
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-200 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
