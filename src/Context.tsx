import { createContext, CSSProperties, FC, useState } from 'react';

export interface Story {
  content: FC;
  duration?: number;
  styles?: CSSProperties;
}

export interface StoryState {
  duration: number;
}

export interface StoriesState {
  stories: Array<Story>;
  setStories: (stories: Array<Story>) => void;
  current: number;
  setCurrent: (current: number) => void;
  count: number;
  setCount: (count: number) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}

export const initialContext: StoriesState = {
  count: 0,
  setCount: () => undefined,
  stories: [],
  setStories: () => undefined,
  current: 0,
  setCurrent: () => undefined,
  paused: false,
  setPaused: () => undefined,
};

export const StoriesContext = createContext<StoriesState>(initialContext);

export const StoriesProvider: FC = ({ children }) => {
  const [count, setCount] = useState(initialContext.count);
  const [stories, setStories] = useState(initialContext.stories);
  const [current, setCurrent] = useState(initialContext.current);
  const [paused, setPaused] = useState(initialContext.paused);

  return (
    <StoriesContext.Provider
      value={{
        count,
        stories,
        current,
        paused,
        setCount: (count: number) => setCount(count),
        setStories: (stories: Array<Story>) => setStories(stories),
        setCurrent: (current: number) => setCurrent(current),
        setPaused: (paused: boolean) => setPaused(paused),
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
};
