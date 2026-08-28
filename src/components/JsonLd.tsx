type Props = { schema: object | object[] };

/**
 * Renders structured data. Next.js documents this exact pattern; the payload is
 * ours (never user input), and `<` is escaped so a stray value can't close the
 * script tag early.
 */
export function JsonLd({ schema }: Props) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
