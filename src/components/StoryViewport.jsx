import { useEffect, useRef } from 'react'

/**
 * StoryViewport manages the scroll-snap viewport container and pointer-based interactions.
 * It separates layout rendering from navigation state.
 */
export function StoryViewport({
  children,
  activeIndex,
  goToIndex,
  goToNext,
  goToPrev,
  pause,
  resume,
  holdStartTimeRef
}) {
  const containerRef = useRef(null)
  const prevActiveIndex = useRef(activeIndex)
  const pointerStartRef = useRef({ x: 0, y: 0 })

  // 1. Programmatic Scrolling: Slide to activeIndex screen when state changes from timer/clicks.
  useEffect(() => {
    if (activeIndex !== prevActiveIndex.current) {
      const container = containerRef.current
      if (container) {
        const activeElement = container.querySelector(`[data-index="${activeIndex}"]`)
        if (activeElement) {
          const rect = activeElement.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          
          // Check if active screen is already in view (i.e. if user swiped to it manually)
          const isVisible = (
            rect.top >= containerRect.top - 10 &&
            rect.bottom <= containerRect.bottom + 10
          )

          if (!isVisible) {
            activeElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
      prevActiveIndex.current = activeIndex
    }
  }, [activeIndex])

  // 2. Manual Scroll Capture: Listen for swipe-snapping and update navigation state.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observerOptions = {
      root: container,
      threshold: 0.6, // fire when screen is 60% visible
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10)
          if (!isNaN(index)) {
            // Only fire update if the index has changed to prevent infinite layout feedback loops.
            if (index !== prevActiveIndex.current) {
              goToIndex(index)
            }
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const screensElements = container.querySelectorAll('[data-screen-section]')
    screensElements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [goToIndex])

  // 3. Accessibility Keyboard Controls: ArrowUp/ArrowLeft to prev, ArrowDown/ArrowRight/PageDown to next.
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not hijack keypresses when typing in form inputs or interactive elements
      const activeEl = document.activeElement
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable)
      ) {
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goToPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goToNext, goToPrev])

  // Helper: check if target is standard form input or button to avoid hijacking click events.
  const isInteractiveElement = (target) => {
    return (
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input')
    )
  }

  // Handle taps (left 30% back, right 70% forward) and long-press (pauses animation)
  const handlePointerDown = (e) => {
    if (isInteractiveElement(e.target)) return
    holdStartTimeRef.current = Date.now()
    pointerStartRef.current = { x: e.clientX, y: e.clientY }
    pause()
  }

  const handlePointerUp = (e) => {
    if (isInteractiveElement(e.target)) return
    resume()
    const holdDuration = Date.now() - holdStartTimeRef.current

    const deltaX = Math.abs(e.clientX - pointerStartRef.current.x)
    const deltaY = Math.abs(e.clientY - pointerStartRef.current.y)

    // Treat as tap if held for less than 250ms and the pointer did not move significantly (less than 10px)
    if (holdDuration < 250 && deltaX < 10 && deltaY < 10) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width

      if (x < width * 0.3) {
        goToPrev()
      } else {
        goToNext()
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="story-viewport no-scrollbar relative"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={resume}
    >
      {children}
    </div>
  )
}

export default StoryViewport
