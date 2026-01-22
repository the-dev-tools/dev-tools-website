import Hero from '@/components/home/Hero'
import Flows from '@/components/home/Flows'
import Scale from '@/components/home/Scale'
import Comparison from '@/components/home/Comparison'

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Flows />
      <Scale />
      <Comparison />
    </main>
  )
}
