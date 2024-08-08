import { getBonsai } from "./queries"

export async function loader() {

  const bonsai = await getBonsai();
  return { bonsai };
}