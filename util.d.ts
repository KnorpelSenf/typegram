import { Typegram } from "./types";

/** Extracts the parameters of a given method name */
export type Params<M extends keyof Typegram<F>["Telegram"], F> = Parameters<
  Typegram<F>["Telegram"][M]
>;
/** Extracts the return type of a given method name */
export type Ret<M extends keyof Typegram<F>["Telegram"], F> = ReturnType<
  Typegram<F>["Telegram"][M]
>;
/** Promisifies a given method signature */
export type P<M extends keyof Typegram<F>["Telegram"], F> = (
  ...args: Params<M, F>
) => Promise<Ret<M, F>>;
