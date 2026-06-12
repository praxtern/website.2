import { useState } from 'react'

export default function FrostedForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    formData.append('access_key', 'PASTE_YOUR_WEB3FORMS_KEY_HERE')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
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
        <input type="hidden" name="subject" value="New Japan Tours Inquiry" />
        <div>
          <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-widest text-mouse-gray">
            Your name
          </label>
          <input
            type="text"
            name="name"
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
            type="tel"
            name="phone"
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
            rows={4}
            name="message"
            placeholder="Your message..."
            className="form-input-underline resize-none"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-kimono-white py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-mist-black transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-sakura-pink"
          data-cursor-expand
          disabled={status === 'loading' || status === 'success'}
          style={status === 'success' ? { backgroundColor: '#D4F87A', color: 'black' } : {}}
          onClick={() => status === 'error' && setStatus('idle')}
        >
          {status === 'loading' && 'Sending...'}
          {status === 'success' && 'Sent ✓'}
          {status === 'error' && 'Try again'}
          {status === 'idle' && 'Send'}
        </button>
      </form>
    </div>
  )
}
