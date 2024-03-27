export type UnionOmint<
  T,
  K extends string | number | symbol
> = T extends unknown ? Omit<T, K> : never;
