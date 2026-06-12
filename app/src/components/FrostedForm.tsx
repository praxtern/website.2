import { useState } from 'react'

export default function FrostedForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/send-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitted(true)
        setStatusMessage('Thank you — your request has been sent.')
        form.reset()
      } else {
        setStatusMessage('Sorry, something went wrong. Please try again.')
      }
    } catch {
      setStatusMessage('Unable to send request right now. Please try later.')
    } finally {
      setLoading(false)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div
      className="w-full rounded-[20px] border border-white/[0.12] p-10 md:p-12"
      style={{
        background: 'rgba(20, 20, 20, 0.5)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <h2 className="font-editorial text-[clamp(22px,2.5vw,32px)] leading-snug text-kimono-white">
        Want to join us, but still have questions?
      </h2>
      <p className="mb-10 mt-2 text-small-caps text-mouse-gray">
        Leave a request
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-mouse-gray">
            Your name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            className="form-input-underline"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-mouse-gray">
            Phone number
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="+7 (999) 000-00-00"
            className="form-input-underline"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-mouse-gray">
            Comment
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Your message..."
            className="form-input-underline resize-none"
          />
        </div>

        {statusMessage ? (
          <div className="text-sm text-mouse-gray">{statusMessage}</div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-kimono-white py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-mist-black transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-sakura-pink disabled:cursor-not-allowed disabled:opacity-60"
          data-cursor-expand
        >
          {loading ? 'Sending...' : submitted ? 'Sent!' : 'Send'}
        </button>
      </form>
    </div>
  )
}
