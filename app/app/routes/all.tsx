import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = async () => {
  const list = await WAGERS_KV.list({ prefix: 'test-' });
  return list;
};

export default function AllWagers() {
  const data = useLoaderData();

  return (
    <section>
      <h2>all wagers</h2>
      <textarea>{ JSON.stringify(data, null, 2) }</textarea>
    </section>
  )
}