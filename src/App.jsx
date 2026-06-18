import { ScreenHero } from './components/ScreenHero'
import { ScreenStory } from './components/ScreenStory'
import { ScreenProducts } from './components/ScreenProducts'
import { ScreenTransparency } from './components/ScreenTransparency'
import { ScreenEarlyAccess } from './components/ScreenEarlyAccess'

function App() {
  const scrollToEarlyAccess = () => {
    const target = document.getElementById('early-access-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="desktop-container">
      {/* Center mobile frame viewport rendering all slides natively and continuously */}
      <div className="story-viewport">
        <section className="story-screen p-0! w-full">
          <ScreenHero onCtaClick={scrollToEarlyAccess} />
        </section>

        <section className="story-screen p-0! w-full">
          <ScreenStory onCtaClick={scrollToEarlyAccess} />
        </section>

        <section className="story-screen p-0! w-full">
          <ScreenProducts onCtaClick={scrollToEarlyAccess} />
        </section>

        <section className="story-screen p-0! w-full">
          <ScreenTransparency onCtaClick={scrollToEarlyAccess} />
        </section>

        <section id="early-access-section" className="story-screen p-0! w-full">
          <ScreenEarlyAccess />
        </section>
      </div>
    </div>
  )
}

export default App
