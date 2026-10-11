/**
 * Shared section frame: heading rail on the left (sticky on desktop),
 * content on the right. A hairline on top separates sections.
 */
export default function Section({ id, title, lead, children }) {
  return (
    <section id={id} className="border-t border-foam/10">
      <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:gap-8 md:py-36">
        <header className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2 className="h2">{title}</h2>
            {lead && <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-mist">{lead}</p>}
          </div>
        </header>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  )
}
