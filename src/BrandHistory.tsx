import './BrandHistory.css'

export default function BrandHistory() {
  return (
    <main className="history-page">
      <header className="history-header">
        <a className="history-mark" href="/">ZYROV</a>
      </header>

      <section className="history-hero">
        <img src="/brand-history-2560.jpg?v=20260905" width="2560" height="1097" fetchPriority="high" decoding="async" alt="ZYROV brand history" />
        <div className="history-hero-copy">
          <h1>Born from a belief.<br />Built for a lifestyle.</h1>
        </div>
      </section>

      <article className="history-story">
        <p className="history-lead"><strong>ZYROV was born from a simple belief, you should never have to choose between comfort, quality, and style.</strong></p>

        <div className="history-prose history-prose-right">
          <p>What began with a vision to create better everyday footwear grew into something much bigger: <strong>a lifestyle designed around the way modern people live.</strong></p>
          <p>From <strong>shoes that move with you</strong>, to <strong>T shirts that feel as good as they look</strong>, to <strong>caps that complete your expression</strong>, and <strong>premium bags made to carry your world</strong>, every ZYROV creation is built around the same philosophy.</p>
        </div>

        <p className="history-mantra">Feel better.<br />Look better.<br />Live better.</p>

        <div className="history-prose">
          <p>We believe luxury isn&apos;t only about what carries the highest price tag.</p>
          <p><strong>True luxury is how something feels, how effortlessly it fits into your life, and how confidently you carry it.</strong></p>
          <p>That belief shapes everything we create.</p>
          <p>ZYROV brings together <strong>comfort, quality, craftsmanship, and contemporary style</strong> to create products that belong in everyday life, yet never feel ordinary.</p>
        </div>
      </article>

      <section className="history-vision">
        <p className="history-vision-intro">Our journey is about creating more than products.</p>
        <p>It is about creating a <strong>way of living</strong>.</p>
        <div className="history-rhythm" aria-label="A way to move, dress, carry, and express who you are">
          <span>A way to move.</span>
          <span>A way to dress.</span>
          <span>A way to carry.</span>
          <span>A way to express who you are.</span>
        </div>
        <p>And as we continue to grow, our vision remains unchanged:</p>
        <h2>To build a lifestyle brand where comfort meets premium design, and everyday essentials become something you want to be seen in.</h2>
      </section>

      <section className="history-close">
        <p>This is ZYROV.</p>
        <h2>Not just what you wear.<br />Not just what you carry.<br />It&apos;s how you live.</h2>
        <a href="/">Discover ZYROV</a>
      </section>
    </main>
  )
}