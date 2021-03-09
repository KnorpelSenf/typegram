/** Intersect all member of a union type U */
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
/** Creates the maximum neighborhood of a type T */
type Neighborhood<T> = string & keyof UnionToIntersection<T>;
/** Creates the boundary of a type T for a given neighborhood N */
type Boundary<T, N extends string> = Record<Exclude<N, keyof T>, undefined>;
/** Creates a closed type for a given type T based on its neighborhood N */
type CloseElement<T, N extends string> = T & Boundary<T, N>;
/** Creates a closed type for each element of a given union type U based on the neighborhood N */
type CloseAll<U, N extends string> = U extends unknown
  ? CloseElement<U, N>
  : never;
/** Creates a closed type for a given type T */
export type Close<T> = CloseAll<T, Neighborhood<T>>;
