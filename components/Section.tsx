import Reveal from "./Reveal";

type Props = {
  id: string;
  /** Mono label, rendered like a detector class label. */
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
};

/**
 * The only place section chrome is defined — padding, rule, heading scale.
 * Keeping it here avoids competing padding rules between section variants.
 */
export default function Section({ id, eyebrow, title, lede, children }: Props) {
  // No scroll-mt on the section: `scroll-padding-top` on <html> already clears
  // the fixed header, and the two offsets would stack.
  return (
    <section id={id} className="border-t border-line px-6 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="mb-12 md:mb-16">
            <p className="eyebrow flex items-center gap-2.5">
              <span aria-hidden className="size-1.5 bg-detect" />
              {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">{title}</h2>
            {lede ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {lede}
              </p>
            ) : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
