import cowsOrchardImg from '../assets/cows_orchard.png'

export function ScreenHero({ onCtaClick }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-journal-lg bg-oat overflow-hidden">
      {/* 
        Background Visual: Orchard and Cows.
        Full-bleed with a soft overlay to create depth.
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={cowsOrchardImg}
          alt="Cows grazing in a mango orchard under warm sunlight"
          className="w-full h-full object-cover filter sepia-[15%] brightness-[95%]"
        />
        {/* Soft radial vignette to focus the center journal card */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/20" />
      </div>

      {/* Header (Top of story) */}
      <header className="relative z-10 w-full flex justify-between font-typewriter text-[11px] tracking-widest text-oat uppercase">
        <span>FOURTH COW</span>
        <span>JOURNAL VOL. I</span>
      </header>

      {/* Journal Entry Card - Asymmetrical scrapbook design */}
      <main className="relative z-10 my-auto w-full max-w-[340px] self-center">
        <div className="bg-oat/95 backdrop-blur-sm p-journal-lg border border-ink/5 shadow-xl transform -rotate-1 origin-bottom-left transition-journal hover:rotate-0">
          {/* Asymmetrical Ledger Marker */}
          <div className="font-typewriter text-[10px] text-soil tracking-widest uppercase mb-journal-xs">
            [ 01 // ORIGIN ]
          </div>
          
          <h1 className="font-journal text-3xl font-medium tracking-tight text-ink leading-tight mb-journal-sm">
            We have four cows.
          </h1>
          
          <p className="font-journal text-base text-ink-muted leading-relaxed">
            And a small family mango orchard. We bottle what they give us each morning, direct from our pasture.
          </p>
        </div>
      </main>

      {/* Navigation Prompter / Call to Action */}
      <footer className="relative z-10 w-full flex flex-col items-center gap-journal-xs">
        <button
          id="hero-join-cta"
          type="button"
          onClick={onCtaClick}
          className="w-full py-journal-md bg-forest hover:bg-forest-light text-oat font-typewriter text-xs font-bold tracking-widest transition-journal uppercase shadow-md cursor-pointer border-none"
        >
          Join Early Access
        </button>
        <span className="font-typewriter text-[9px] text-oat/80 tracking-wider">
          Swipe down to read our record
        </span>
      </footer>
    </div>
  )
}

export default ScreenHero
