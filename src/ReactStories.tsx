import { CSSProperties, useContext, useEffect, useRef } from 'react';
import { initialContext, StoriesContext, StoriesProvider, Story } from './Context';
import { Progress } from './Progress';

export { StoriesContext, StoriesProvider, Story };

export interface ReactStoriesProps {
  stories: Array<Story>;
  storyContainerStyles?: CSSProperties;
  storyProgressContainerStyles?: CSSProperties;
  storyProgressWrapperStyles?: CSSProperties;
  storyProgressStyles?: CSSProperties;
  firstStory?: number;
  defaultInterval?: number;
  onAllStoriesEnd?: () => void;
  onStoryStart?: () => void;
  onStoryEnd?: () => void;
}

const defaultProps = {
  firstStory: initialContext.current,
  defaultInterval: 4000,
  loop: false,
};

export function ReactStories(props: ReactStoriesProps): JSX.Element {
  const {
    stories: initStories,
    firstStory,
    defaultInterval,
    storyContainerStyles,
    storyProgressContainerStyles,
    storyProgressWrapperStyles,
    storyProgressStyles,
    onAllStoriesEnd,
    onStoryStart,
    onStoryEnd,
  } = {
    ...defaultProps,
    ...props,
  };
  const { stories, setStories, current, setCurrent, count, setCount, paused } =
    useContext(StoriesContext);
  const animationFrameId = useRef<number>();
  const currentStory = stories[current];

  const next = () => {
    if (current < stories.length) {
      setCurrent(current + 1);
      setCount(0);
    }
  };

  const storyStartCallback = () => {
    onStoryStart && onStoryStart();
  };

  const storyEndCallback = () => {
    onStoryEnd && onStoryEnd();
  };

  const allStoriesEndCallback = () => {
    onAllStoriesEnd && onAllStoriesEnd();
  };

  const incrementCount: FrameRequestCallback = () => {
    if (count === 0) {
      storyStartCallback();
    }

    if (count < 100) {
      const interval = currentStory?.duration || defaultInterval;
      setCount(count + 100 / ((interval / 1000) * 60));

      return;
    }

    if (typeof animationFrameId.current === 'number') {
      cancelAnimationFrame(animationFrameId.current);
    }

    storyEndCallback();
    if (current === stories.length - 1) {
      allStoriesEndCallback();

      return;
    }

    next();
  };

  useEffect(() => {
    if (!paused && currentStory) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    }

    return () => {
      if (typeof animationFrameId.current === 'number') {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [count, paused, currentStory]);

  useEffect(() => {
    setStories(initStories);
    if (firstStory) {
      setCurrent(firstStory);
    }
  }, [firstStory, initStories, setCurrent, setStories]);

  if (!currentStory) {
    return <></>;
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        ...storyContainerStyles,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '100%',
          width: '100%',
          position: 'absolute',
          padding: '15px',
          alignSelf: 'center',
          zIndex: 99,
          ...storyProgressContainerStyles,
        }}
      >
        {stories.map((_, i) => (
          <Progress
            key={`progress-${i}`}
            data-testid={`progress-${i}`}
            count={count}
            width={1 / stories.length}
            active={i === current ? 1 : i < current ? 2 : 0}
            storyProgressWrapperStyles={storyProgressWrapperStyles}
            storyProgressStyles={storyProgressStyles}
          />
        ))}
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          ...(stories[current].styles || {}),
        }}
      >
        <currentStory.content data-testid={`content`} />
      </div>
    </div>
  );
}
