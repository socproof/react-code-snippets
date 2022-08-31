export interface State<T> {
  data?: T;
  error?: Error;
}

export type Cache<T> = {[url: string]: T}
export type Action<T> = {type: 'loading'} | {type: 'fetched'; payload: T} | {type: 'error'; payload: Error}
