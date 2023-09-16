import { getBonzai } from "./queries"

export async function loader() {

  const bonzai = await getBonzai();
  return { bonzai };
}