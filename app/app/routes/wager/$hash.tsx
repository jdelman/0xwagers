import { useMatches } from "remix";

export default function WagerAt() {
  const matches = useMatches();
  const hash = matches.slice(-1)[0].params.hash!;

  return (
    <section>
      <h2>{ hash }</h2>
    </section>
  );
}