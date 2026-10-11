import Section from "../Section"
import data from "../../data/portfolioData.json"

export default function About() {
  const { statement, about } = data.personal

  return (
    <Section id="about" title="About">
      <p
        className="text-balance font-serif text-foam"
        style={{
          fontSize: "clamp(1.9rem, 3.6vw, 3rem)",
          lineHeight: 1.12,
          letterSpacing: "-0.015em",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {statement}
      </p>

      <div className="mt-10 grid gap-6 md:max-w-[40rem]">
        {about.map((p) => (
          <p key={p} className="prose-serif">
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-16 grid gap-10 border-t border-foam/10 pt-10 sm:grid-cols-3">
        {data.toolbox.map((g) => (
          <div key={g.group}>
            <dt className="text-sm text-mist">{g.group}</dt>
            <dd className="mt-3 space-y-1.5 text-[1.02rem] text-foam">
              {g.items.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
