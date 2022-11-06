import type { SetStateAction } from 'jotai';
import { atom } from 'jotai';

import type { sortOrderT } from '~types/util/sortOrderT';

const SEARCH_DELAY = 300;
const SEARCH_DEFAULT = '';
const SORT_DEFAULT: sortOrderT = 'descending';

const collectionsSearchAtom = atomWithDebounce<string>(SEARCH_DEFAULT, SEARCH_DELAY);
const memoriesSearchAtom = atomWithDebounce<string>(SEARCH_DEFAULT, SEARCH_DELAY);
const memoriesSortAtom = atom<sortOrderT>(SORT_DEFAULT);
const photosSearchAtom = atomWithDebounce<string>(SEARCH_DEFAULT, SEARCH_DELAY);
const photosSortAtom = atom<sortOrderT>(SORT_DEFAULT);

const resetAtom = atom(null, (_get, set) => {
  set(collectionsSearchAtom.debouncedValueAtom, SEARCH_DEFAULT);
  set(memoriesSearchAtom.debouncedValueAtom, SEARCH_DEFAULT);
  set(memoriesSortAtom, SORT_DEFAULT);
  set(photosSearchAtom.debouncedValueAtom, SEARCH_DEFAULT);
  set(photosSortAtom, SORT_DEFAULT);
});

/**
 * Like useDebouncedState, but has full integration with `jotai`, which is the simple
 * global client-side state management library that we are using.
 * @param initialValue
 * @param delayMilliseconds
 * @param shouldDebounceOnReset
 */
function atomWithDebounce<T>(
  initialValue: T,
  delayMilliseconds = 500,
  shouldDebounceOnReset = false,
) {
  const prevTimeoutAtom = atom<ReturnType<typeof setTimeout> | undefined>(undefined);

  // DO NOT EXPORT currentValueAtom as using this atom to set state can cause
  // inconsistent state between currentValueAtom and debouncedValueAtom
  const _currentValueAtom = atom(initialValue);
  const isDebouncingAtom = atom(false);

  const debouncedValueAtom = atom(initialValue, (get, set, update: SetStateAction<T>) => {
    clearTimeout(get(prevTimeoutAtom));

    const prevValue = get(_currentValueAtom);
    const nextValue = typeof update === 'function' ? (update as (prev: T) => T)(prevValue) : update;

    const onDebounceStart = () => {
      set(_currentValueAtom, nextValue);
      set(isDebouncingAtom, true);
    };

    const onDebounceEnd = () => {
      set(debouncedValueAtom, nextValue);
      set(isDebouncingAtom, false);
    };

    onDebounceStart();

    if (!shouldDebounceOnReset && nextValue === initialValue) {
      onDebounceEnd();
      return;
    }

    const nextTimeoutId = setTimeout(() => {
      onDebounceEnd();
    }, delayMilliseconds);

    // set previous timeout atom in case it needs to get cleared
    set(prevTimeoutAtom, nextTimeoutId);
  });

  // exported atom setter to clear timeout if needed
  const clearTimeoutAtom = atom(null, (get, set) => {
    clearTimeout(get(prevTimeoutAtom));
    set(isDebouncingAtom, false);
  });

  return {
    currentValueAtom: atom(get => get(_currentValueAtom)),
    isDebouncingAtom,
    clearTimeoutAtom,
    debouncedValueAtom,
  };
}

export {
  atomWithDebounce,
  collectionsSearchAtom,
  memoriesSearchAtom,
  memoriesSortAtom,
  photosSearchAtom,
  photosSortAtom,
  resetAtom,
};
