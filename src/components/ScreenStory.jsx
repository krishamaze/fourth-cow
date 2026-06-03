import milkPouringImg from '../assets/milk_pouring.png'

export function ScreenStory({ onCtaClick }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-journal-lg bg-oat overflow-hidden">
      {/* 
        Background Visual: Close-up pouring.
        Full-bleed with a warm film color filter.
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={milkPouringImg}
          alt="Fresh milk being poured into a clean glass bottle on a wooden table"
          className="w-full h-full object-cover filter sepia-[10%] brightness-[92%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/45" />
      </div>

      {/* Header (Top of story) */}
      <header className="relative z-10 w-full flex justify-between font-typewriter text-[11px] tracking-widest text-oat uppercase">
        <span>FOURTH COW</span>
        <span>JOURNAL VOL. I</span>
      </header>

      {/* Journal Entry Card - Asymmetrical offset matching Screen 1 */}
      <main className="relative z-10 my-auto w-full max-w-[340px] self-center">
        <div className="bg-oat/95 backdrop-blur-sm p-journal-lg border border-ink/5 shadow-xl transform rotate-1 origin-bottom-right transition-journal hover:rotate-0">
          {/* Asymmetrical Ledger Marker */}
          <div className="font-typewriter text-[10px] text-soil tracking-widest uppercase mb-journal-xs">
            [ 02 // THE DAILY RECORD ]
          </div>
          
          <h2 className="font-journal text-2xl font-medium tracking-tight text-ink leading-tight mb-journal-xs">
            Ganga, Yamuna, Saraswati, and Lakshmi.
          </h2>
          
          <p className="font-journal text-base text-ink-muted leading-relaxed">
            They graze on sweet pasture grass. We do not use milking machines. We milk by hand, filter twice, and pour it into glass bottles under the mango trees.
          </p>
        </div>
      </main>

      {/* Navigation Prompter / Call to Action */}
      <footer className="relative z-10 w-full flex flex-col items-center gap-journal-xs">
        <button
          id="story-harvest-cta"
          type="button"
          onClick={onCtaClick}
          className="w-full py-journal-md bg-forest hover:bg-forest-light text-oat font-typewriter text-xs font-bold tracking-widest transition-journal uppercase shadow-md cursor-pointer border-none"
        >
          See the Harvest
        </button>
        <span className="font-typewriter text-[9px] text-oat/80 tracking-wider">
          Scroll down to continue
        </span>
      </footer>
    </div>
  )
}

export default ScreenStory
