import lakshmiImg from '../assets/lakshmi_close.png'
import orchardImg from '../assets/cows_orchard.png'
import practicesImg from '../assets/cows_sunset.png'

export function ScreenTransparency({ onCtaClick }) {
  const transparencyCards = [
    {
      id: 'cows',
      title: 'Our Cows',
      desc: 'Milked by hand. No machines, no push. Just Lakshmi, Ganga, Yamuna, and Saraswati.',
      img: lakshmiImg,
      align: 'self-start',
      rotate: '-rotate-1'
    },
    {
      id: 'orchard',
      title: 'Our Orchard',
      desc: '120 Alphonso and Kent mango trees. Ripened naturally on branches, not in warehouse boxes.',
      img: orchardImg,
      align: 'self-end',
      rotate: 'rotate-1'
    },
    {
      id: 'practices',
      title: 'Our Practices',
      desc: 'Composting using dry orchard leaves and cow manure. No tractors, no chemical fertilizers.',
      img: practicesImg,
      align: 'self-start',
      rotate: '-rotate-1'
    }
  ]

  return (
    <div className="relative w-full flex-1 min-h-0 flex flex-col justify-between p-journal-lg bg-oat bg-notebook-dot">
      
      {/* Header */}
      <header className="w-full flex justify-between font-typewriter text-[11px] tracking-widest text-ink-muted uppercase">
        <span>FOURTH COW</span>
        <span>JOURNAL VOL. I</span>
      </header>

      {/* Main content: Polaroid log */}
      <main className="my-auto w-full flex flex-col gap-journal-md">
        
        {/* Section Title */}
        <div className="text-left">
          <div className="font-typewriter text-[10px] text-soil tracking-widest uppercase mb-journal-xs">
            [ 04 // TRANSPARENCY ]
          </div>
          <h2 className="font-journal text-2xl font-medium text-ink tracking-tight">
            Nothing hidden.
          </h2>
        </div>

        {/* Stacked Asymmetric Polaroids */}
        <div className="flex flex-col gap-journal-sm">
          {transparencyCards.map((card) => (
            <div
              key={card.id}
              className={`flex items-center gap-journal-sm bg-paper border border-ink/5 p-2 shadow-sm w-[92%] transition-journal hover:rotate-0 ${card.align} ${card.rotate}`}
            >
              {/* Polaroid Photo Frame */}
              <div className="w-16 h-16 min-w-16 bg-white p-1 border border-ink/10 shadow-xs relative">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover grayscale-[10%] contrast-[105%]"
                />
              </div>

              {/* Journal Notes */}
              <div className="text-left">
                <h3 className="font-journal text-[15px] font-bold text-ink leading-tight">
                  {card.title}
                </h3>
                <p className="font-journal text-[12px] text-ink-muted leading-tight mt-0.5 max-w-[200px]">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer / Nav */}
      <footer className="w-full flex flex-col items-center gap-journal-xs">
        <button
          id="transparency-join-cta"
          type="button"
          onClick={onCtaClick}
          className="w-full py-journal-md bg-forest hover:bg-forest-light text-oat font-typewriter text-xs font-bold tracking-widest transition-journal uppercase shadow-md cursor-pointer border-none"
        >
          Join Early Access
        </button>
        <span className="font-typewriter text-[9px] text-ink-muted tracking-wider">
          Scroll down to sign our ledger
        </span>
      </footer>

    </div>
  )
}

export default ScreenTransparency
