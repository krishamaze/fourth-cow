import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Reusable hook for Instagram Story-style navigation and progress tracking.
 * Establishes separation between visual rendering and timer/navigation logic.
 *
 * @param {Array} screens - Array of screen configurations with duration
 * @param {Object} options - Configuration options (autoplay, defaultDuration)
 */
export function useStoryNavigation(screens, { autoplay = true, defaultDuration = 5000 } = {}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Use refs to avoid re-triggering effects when states change
  const activeIndexRef = useRef(activeIndex)
  const isPausedRef = useRef(isPaused)
  const progressRef = useRef(progress)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  const startTimeRef = useRef(null)
  const pausedTimeRef = useRef(null)
  const holdStartTimeRef = useRef(0)

  const goToIndex = useCallback((index) => {
    if (index < 0 || index >= screens.length) return
    setActiveIndex(index)
    setProgress(0)
    startTimeRef.current = null
    pausedTimeRef.current = null
  }, [screens.length])

  const goToNext = useCallback(() => {
    if (activeIndexRef.current < screens.length - 1) {
      goToIndex(activeIndexRef.current + 1)
    } else {
      // End of story: hold at 100% progress
      setProgress(100)
    }
  }, [screens.length, goToIndex])

  const goToPrev = useCallback(() => {
    if (activeIndexRef.current > 0) {
      goToIndex(activeIndexRef.current - 1)
    }
  }, [goToIndex])

  const pause = useCallback(() => {
    if (!isPausedRef.current) {
      setIsPaused(true)
      pausedTimeRef.current = Date.now()
    }
  }, [])

  const resume = useCallback(() => {
    if (isPausedRef.current) {
      setIsPaused(false)
      if (startTimeRef.current && pausedTimeRef.current) {
        // Adjust start time to account for duration spent paused
        startTimeRef.current += Date.now() - pausedTimeRef.current
      }
      pausedTimeRef.current = null
    }
  }, [])

  // Smooth progress bar update loop
  useEffect(() => {
    if (!autoplay) return

    let animFrameId
    const duration = screens[activeIndex]?.duration || defaultDuration

    const tick = () => {
      if (isPausedRef.current) {
        animFrameId = requestAnimationFrame(tick)
        return
      }

      if (!startTimeRef.current) {
        startTimeRef.current = Date.now()
      }

      const elapsed = Date.now() - startTimeRef.current
      const currentProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(currentProgress)

      if (currentProgress >= 100) {
        goToNext()
      } else {
        animFrameId = requestAnimationFrame(tick)
      }
    }

    animFrameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animFrameId)
    }
  }, [activeIndex, autoplay, screens, defaultDuration, goToNext])

  return {
    activeIndex,
    progress,
    isPaused,
    goToNext,
    goToPrev,
    goToIndex,
    pause,
    resume,
    holdStartTimeRef
  }
}
