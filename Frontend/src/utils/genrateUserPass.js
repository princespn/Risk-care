import { v4 as uuidv4 } from "uuid";

export default function genratePassword(length = 6) {
  return uuidv4().replace(/-/g, "").slice(0, length);
}
