import { useStoryNavigation } from './hooks/useStoryNavigation'
import { StoryProgressIndicator } from './components/StoryProgressIndicator'
import { StoryViewport } from './components/StoryViewport'
import { ScreenHero } from './components/ScreenHero'
import { ScreenStory } from './components/ScreenStory'
import { ScreenProducts } from './components/ScreenProducts'
import { ScreenTransparency } from './components/ScreenTransparency'
import { ScreenEarlyAccess } from './components/ScreenEarlyAccess'

// Single Source of Truth for Screen Configurations & Metadata
const STORY_SCREENS = [
  { id: 'hero', title: 'Origin', duration: 6000, number: '01' },
  { id: 'story', title: 'Why Us', duration: 6000, number: '02' },
  { id: 'products', title: 'Harvest', duration: 6000, number: '03' },
  { id: 'transparency', title: 'Honesty', duration: 6000, number: '04' },
  { id: 'early_access', title: 'Ledger', duration: 8000, number: '05' }
]

function App() {
  const {
    activeIndex,
    progress,
    goToNext,
    goToPrev,
    goToIndex,
    pause,
    resume,
    holdStartTimeRef
  } = useStoryNavigation(STORY_SCREENS)

  return (
    <div className="desktop-container">
      {/* 
        Scroll-snap viewport wrapping the screens.
        Delegates scrolling and pointer interaction responsibilities.
      */}
      <StoryViewport
        activeIndex={activeIndex}
        goToIndex={goToIndex}
        goToNext={goToNext}
        goToPrev={goToPrev}
        pause={pause}
        resume={resume}
        holdStartTimeRef={holdStartTimeRef}
      >
        {/* Progress bar indicators at the top */}
        <StoryProgressIndicator
          screens={STORY_SCREENS}
          activeIndex={activeIndex}
          progress={progress}
          onIndicatorClick={goToIndex}
        />

        {/* Dynamic Story Screens mapped from Single Source of Truth */}
        {STORY_SCREENS.map((screen, index) => {
          let screenContent = null
          
          if (screen.id === 'hero') {
            screenContent = <ScreenHero onCtaClick={goToNext} />
          } else if (screen.id === 'story') {
            screenContent = <ScreenStory onCtaClick={goToNext} />
          } else if (screen.id === 'products') {
            screenContent = <ScreenProducts onCtaClick={goToNext} />
          } else if (screen.id === 'transparency') {
            screenContent = <ScreenTransparency onCtaClick={goToNext} />
          } else if (screen.id === 'early_access') {
            screenContent = <ScreenEarlyAccess />
          }

          return (
            <section
              key={screen.id}
              data-screen-section
              data-index={index}
              className="story-screen p-0! h-full w-full"
            >
              {screenContent}
            </section>
          )
        })}
      </StoryViewport>
    </div>
  )
}

export default App
