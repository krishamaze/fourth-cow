
/**
 * StoryProgressIndicator renders the Instagram-style horizontal progress bars at the top.
 *
 * @param {Array} screens - The single source of truth for screens
 * @param {number} activeIndex - The currently active screen index
 * @param {number} progress - The current progress percentage (0 to 100) of the active screen
 * @param {function} onIndicatorClick - Optional click handler to navigate to a screen directly
 */
export function StoryProgressIndicator({ screens, activeIndex, progress, onIndicatorClick }) {
  return (
    <div className="absolute top-4 left-0 right-0 z-50 flex gap-1 px-4">
      {screens.map((screen, index) => {
        let width = '0%'
        if (index < activeIndex) {
          width = '100%'
        } else if (index === activeIndex) {
          width = `${progress}%`
        }

        return (
          <button
            key={screen.id}
            id={`story-progress-indicator-${screen.id}`}
            type="button"
            className="h-1 flex-1 bg-ink/10 rounded-full overflow-hidden cursor-pointer focus:outline-none transition-journal"
            onClick={() => onIndicatorClick && onIndicatorClick(index)}
            aria-label={`Go to screen ${index + 1}: ${screen.title || screen.id}`}
          >
            <div
              className="h-full bg-forest rounded-full transition-all duration-75 ease-linear"
              style={{ width }}
            />
          </button>
        )
      })}
    </div>
  )
}
export default StoryProgressIndicator
