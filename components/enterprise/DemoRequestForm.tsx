'use client'

import Link from 'next/link'

export default function DemoRequestForm() {
  return (
    <form className="space-y-4 text-left" action="https://submit-form.com/XOtaQHIWt" method="POST">
      <input type="hidden" name="_redirect" value="https://dev.tools/enterprise/success" />

      {/* Honeypot field for spam protection */}
      <input type="text" name="_honeypot" style={{ display: 'none' }} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-slate-300 mb-1.5">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-slate-300 mb-1.5">Work email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm text-slate-300 mb-1.5">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
            placeholder="Company name"
            required
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="team-size" className="block text-sm text-slate-300 mb-1.5">Team size</label>
          <select
            id="team-size"
            name="team-size"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
            required
          >
            <option value="" className="bg-slate-900">Select team size</option>
            <option value="1-10" className="bg-slate-900">1-10</option>
            <option value="11-50" className="bg-slate-900">11-50</option>
            <option value="51-200" className="bg-slate-900">51-200</option>
            <option value="201-500" className="bg-slate-900">201-500</option>
            <option value="500+" className="bg-slate-900">500+</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-slate-300 mb-1.5">What are you looking to solve?</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-slate-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
          placeholder="Tell us about your requirements..."
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-neon px-8 py-3 text-base text-slate-900 font-medium transition hover:bg-[#6fe0ff] shadow-[0_10px_24px_-12px_rgba(88,215,255,0.55)] cursor-pointer"
      >
        Request Demo
      </button>

      <p className="text-xs text-slate-500 text-center">
        By submitting, you agree to our{' '}
        <Link href="/privacy" className="underline decoration-dotted underline-offset-2 hover:text-neon">Privacy Policy</Link>.
      </p>
    </form>
  )
}
