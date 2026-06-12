import FrostedForm from '@/components/FrostedForm'

export default function ContactSection() {
  return (
    <section
      id="contacts"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/images/contact-fuji-pagoda.jpg"
          alt="Cherry blossoms framing Mount Fuji and a red pagoda at sunrise"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        {/* Gradient overlay for left-side legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.15) 50%, rgba(10,10,10,0.25) 100%)',
          }}
        />
      </div>

      {/* Frosted Glass Form Panel */}
      <div className="relative z-[2] flex min-h-screen items-center px-6 py-20 md:px-[5%]">
        <div className="w-full max-w-[460px]">
          <FrostedForm />
        </div>
      </div>
    </section>
  )
}
