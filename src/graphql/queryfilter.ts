export type Maybe<T> = T | null;

export type QueryFilter<T = any> = {
  [P in keyof T | 'and' | 'or' | 'not']?: Maybe<T | T[]>;
};
