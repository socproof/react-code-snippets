import {
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useLayoutEffect,
  MutableRefObject,
  useReducer
} from "react";
import {NameContext} from "../context/NameContextProvider";
import {State, Cache, Action} from "../models/state";

export const useMyName = (initialName: string | undefined) => `My name is ${initialName}.`;

export const useMyNameWithState = (initialName: string | undefined) => {
  const [currentName, setCurrentName] = useState(initialName);

  useEffect(() => {
    setCurrentName(initialName);
  }, [initialName])

  return {
    setName: setCurrentName,
    message: `My name is ${currentName}.`,
  }
}

export const useMyNameWithContext = () => {
  const name = useContext(NameContext);
  return `My name is ${name}.`;
}

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useOutsideClick = (ref: RefObject<HTMLElement | null>, callback: (event: Event) => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback
  }, [callback]);

  useEffect(() => {
    const handler: EventListener = (event) => {
      const {current: target} = ref;

      if (target && !target.contains(event.target as HTMLElement)) {
        callbackRef.current(event);
      }
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref]);
}

export const useKeydown = (key: string, callback: (event: Event) => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback
  }, [callback]);

  useEffect(() => {
    const handler: EventListener = (event) => {
      if ((event as KeyboardEvent).key === key) {
        callbackRef.current(event);
      }
    }
    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [key])
}

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mounted = true;

    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handler = (event: MediaQueryListEvent) => {
      if (!mounted) {
        return;
      }
      setMatches(event.matches);
    }
    mediaQueryList.addEventListener('change', handler);

    return () => {
      mounted = false;
      mediaQueryList.removeEventListener('change', handler);
    }
  }, [query]);

  return Boolean(matches);
}
export const useAsync = (callback: Function, immediate = true):
  { execute: (MouseEventHandler<HTMLButtonElement>), status: string, value: string | null, error: Error | null } => {
  const [status, setStatus] = useState<string>('idle');
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return callback()
      .then((response: SetStateAction<string>) => {
        setValue(response as string);
        setStatus('success');
      }).catch((error: string) => {
        setError(new Error(error));
        setStatus('error');
      })
  }, [callback]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return {execute, status, value, error};
}

export const useEventListener = (eventName: string, handler: MouseEventHandler, element = window) => {
  const saveHandler = useRef<MouseEventHandler>();

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!Boolean(element && element.addEventListener)) {
      return;
    }

    const eventListener = (event: MouseEvent) => saveHandler.current?.(event);
    // @ts-ignore
    element.addEventListener(eventName, eventListener);
    // @ts-ignore
    return () => element.removeEventListener(eventName, eventListener);

  }, [eventName, element]);
}

export const useLockBodyScroll = (): void => {
  const setStyle = (style: string) => document.body.style.overflow = style;

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    setStyle('hidden');
    return () => {
      setStyle(originalStyle);
    };
  }, []);
}

export const useOnScreen = <T extends Element>(ref: MutableRefObject<T>, rootMargin = '0px'): boolean => {
  const [isInter, setIsInter] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInter(entry.isIntersecting), {rootMargin});

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    }
  })

  return isInter;
}

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current
}

export const useFetch = <T = unknown>(url?: string, options?: RequestInit): State<T> => {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {...initialState}
      case 'fetched':
        return {...initialState, data: action.payload}
      case 'error':
        return {...initialState, error: action.payload}
      default:
        return state;
    }
  }

  const fetchData = async (url: string) => {
    dispatch({type: 'loading'});

    if (cache.current[url]) {
      dispatch({type: 'fetched', payload: cache.current[url]})
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as T;
      cache.current[url] = data;
      if(cancelRequest.current) return;

      dispatch({type: 'fetched', payload: data})
    } catch (e) {
      if(cancelRequest.current) return;
      dispatch({type: 'error', payload: e as Error})
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    void fetchData(url);

    return () => {
      cancelRequest.current = true;
    }
  }, [url]);

  return state;
}

export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);

  return useCallback(() => isMounted.current, []);
}
