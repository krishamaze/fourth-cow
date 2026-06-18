import { useState } from 'react'

export function ScreenEarlyAccess() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [ledgerEntry, setLedgerEntry] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic Validation
    if (!name.trim()) {
      setError('Please write your name')
      return
    }
    const digits = phone.replace(/\D/g, '')
    if (!digits || digits.length !== 10 || !/^[6-9]/.test(digits)) {
      setError('Please enter a valid 10-digit Indian mobile number')
      return
    }

    setError('')

    // Create registration payload
    const entryId = Math.floor(100 + Math.random() * 900)
    const newEntry = {
      id: `FC-${entryId}`,
      name: name.trim(),
      phone: phone.trim(),
      timestamp: new Date().toLocaleString(),
    }

    // Save to LocalStorage for mock pre-booking tracking
    try {
      const existing = JSON.parse(localStorage.getItem('fc_registrations') || '[]')
      existing.push(newEntry)
      localStorage.setItem('fc_registrations', JSON.stringify(existing))
    } catch (err) {
      console.warn('LocalStorage not accessible', err)
    }

    setLedgerEntry(newEntry)
    setSubmitted(true)
    setName('')
    setPhone('')
  }

  return (
    <div className="relative w-full flex-1 min-h-0 flex flex-col justify-between p-journal-lg bg-oat bg-journal-grid">
      {/* Header */}
      <header className="w-full flex justify-between font-typewriter text-[11px] tracking-widest text-ink-muted uppercase">
        <span>FOURTH COW</span>
        <span>JOURNAL VOL. I</span>
      </header>

      {/* Main Form Area */}
      <main className="my-auto w-full max-w-[340px] self-center">
        {/* Lined notebook/ledger layout container */}
        <div className="bg-oat border border-ink/10 p-journal-lg shadow-sm transform -rotate-1 transition-journal hover:rotate-0 text-left">
          <div className="font-typewriter text-[10px] text-soil tracking-widest uppercase mb-journal-xs">
            [ 05 // THE LEDGER ]
          </div>

          <h2 className="font-journal text-2xl font-medium text-ink mb-journal-xs">
            Join Early Access
          </h2>

          <p className="font-journal text-[13px] text-ink-muted leading-relaxed mb-journal-md">
            We only send text alerts when a new harvest is ready or fresh milk subscriptions open.
            No marketing emails, no spam.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-journal-md">
              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="ledger-name"
                  className="font-typewriter text-[10px] text-soil uppercase tracking-widest font-bold"
                >
                  Your Name
                </label>
                <input
                  id="ledger-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (error) setError('')
                  }}
                  autoComplete="name"
                  placeholder="e.g. Samuel Parker"
                  className={`font-journal text-base bg-paper/30 border ${
                    error === 'Please write your name'
                      ? 'border-rust focus:border-rust focus:ring-rust'
                      : 'border-ink/35 focus:border-soil focus:ring-soil'
                  } rounded px-3 py-2 focus:ring-1 focus:outline-none text-ink placeholder-ink-muted transition-all duration-200`}
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="ledger-phone"
                  className="font-typewriter text-[10px] text-soil uppercase tracking-widest font-bold"
                >
                  Phone Number
                </label>
                <input
                  id="ledger-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (error) setError('')
                  }}
                  autoComplete="tel"
                  placeholder="e.g. 98765 43210"
                  className={`font-typewriter text-sm bg-paper/30 border ${
                    error === 'Please enter a valid 10-digit Indian mobile number'
                      ? 'border-rust focus:border-rust focus:ring-rust'
                      : 'border-ink/35 focus:border-soil focus:ring-soil'
                  } rounded px-3 py-2 focus:ring-1 focus:outline-none text-ink placeholder-ink-muted transition-all duration-200`}
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="font-typewriter text-[11px] text-rust leading-tight">* {error}</div>
              )}

              {/* Submit Button */}
              <button
                id="ledger-submit-btn"
                type="submit"
                className="mt-journal-xs w-full py-journal-md bg-forest hover:bg-forest-light text-oat font-typewriter text-xs font-bold tracking-widest uppercase cursor-pointer transition-journal border-none shadow-xs"
              >
                Notify Me
              </button>
            </form>
          ) : (
            /* Success confirmation card mimicking a ledger stamp receipt */
            <div className="border border-dashed border-forest/40 bg-forest/5 p-journal-md flex flex-col gap-2 animate-fade-in">
              <span className="font-typewriter text-[10px] text-forest font-bold tracking-wider uppercase">
                * ENTRY RECORDED *
              </span>
              <p className="font-journal text-sm text-ink leading-relaxed">
                Thank you, <strong className="font-medium text-forest">{ledgerEntry?.name}</strong>.
                Your phone has been written in our diary. We will text you at {ledgerEntry?.phone}.
              </p>
              <div className="font-typewriter text-[9px] text-ink-muted border-t border-ink/10 pt-2 mt-1">
                Ref: {ledgerEntry?.id} | {ledgerEntry?.timestamp}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Area (Screen 6 integrated at the bottom of Screen 5) */}
      <footer className="w-full border-t border-ink/5 pt-journal-md mt-journal-xs flex flex-col items-center">
        <h3 className="font-journal text-lg font-medium text-ink tracking-wide">Fourth Cow</h3>
        <p className="font-typewriter text-[10px] text-ink-muted tracking-widest uppercase mt-0.5">
          Real food. Real farm.
        </p>
      </footer>
    </div>
  )
}

export default ScreenEarlyAccess
