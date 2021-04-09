// Convert union to intersection
export type Merge<U> = (U extends unknown ? (x: U) => unknown : never) extends (
  x: infer R
) => unknown
  ? R
  : never;
