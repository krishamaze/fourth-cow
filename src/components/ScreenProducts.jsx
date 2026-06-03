
export function ScreenProducts({ onCtaClick }) {
  // Reusable structured content list with real limits and constraints
  const products = [
    {
      id: 'milk',
      title: 'Fresh Farm Milk',
      limit: '42 liters daily capacity',
      details: [
        'Milked by hand every morning',
        'Glass bottle subscription starting Winter'
      ]
    },
    {
      id: 'mangoes',
      title: 'Mango Harvest 2026',
      limit: '120 trees in orchard',
      details: [
        'Naturally ripened on branches',
        'Direct seasonal release in May'
      ]
    }
  ]

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-journal-lg bg-oat bg-journal-grid">
      
      {/* Header */}
      <header className="w-full flex justify-between font-typewriter text-[11px] tracking-widest text-ink-muted uppercase">
        <span>FOURTH COW</span>
        <span>JOURNAL VOL. I</span>
      </header>

      {/* Main Content Area */}
      <main className="my-auto w-full flex flex-col gap-journal-lg">
        
        {/* Section Heading */}
        <div className="text-left">
          <div className="font-typewriter text-[10px] text-soil tracking-widest uppercase mb-journal-xs">
            [ 03 // THE HARVEST ]
          </div>
          <h2 className="font-journal text-2xl font-medium text-ink tracking-tight max-w-[280px]">
            We only bottle what our farm yields.
          </h2>
        </div>

        {/* Asymmetrical products display (non-grid layout) */}
        <div className="flex flex-col gap-journal-md relative">
          
          {/* Card 1: Milk (asymmetrical left-aligned) */}
          <div className="w-[85%] bg-oat border border-ink/10 p-journal-md shadow-sm transform -rotate-1 self-start transition-journal hover:rotate-0">
            <span className="font-typewriter text-[9px] text-soil font-bold block mb-journal-xs">
              {products[0].limit.toUpperCase()}
            </span>
            <h3 className="font-journal text-xl font-medium text-ink mb-2">
              {products[0].title}
            </h3>
            <ul className="font-journal text-[13px] text-ink-muted leading-relaxed list-disc pl-4">
              {products[0].details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>

          {/* Card 2: Mangoes (asymmetrical right-aligned overlapping slightly) */}
          <div className="w-[85%] bg-paper border border-ink/10 p-journal-md shadow-md transform rotate-1 self-end -mt-journal-xs transition-journal hover:rotate-0">
            <span className="font-typewriter text-[9px] text-soil font-bold block mb-journal-xs">
              {products[1].limit.toUpperCase()}
            </span>
            <h3 className="font-journal text-xl font-medium text-ink mb-2">
              {products[1].title}
            </h3>
            <ul className="font-journal text-[13px] text-ink-muted leading-relaxed list-disc pl-4">
              {products[1].details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>

        </div>
      </main>

      {/* Footer / Nav */}
      <footer className="w-full flex flex-col items-center gap-journal-xs">
        <button
          id="products-booking-cta"
          type="button"
          onClick={onCtaClick}
          className="w-full py-journal-md bg-forest hover:bg-forest-light text-oat font-typewriter text-xs font-bold tracking-widest transition-journal uppercase shadow-md cursor-pointer border-none"
        >
          Check Pre-booking
        </button>
        <span className="font-typewriter text-[9px] text-ink-muted tracking-wider">
          Swipe down to see the practices
        </span>
      </footer>

    </div>
  )
}

export default ScreenProducts
