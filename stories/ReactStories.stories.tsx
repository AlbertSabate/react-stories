// import { action } from '@storybook/addon-actions';
import {
  ReactStories,
  ReactStoriesProps,
  StoriesContext,
  StoriesProvider,
} from '../src/ReactStories';
import { useContext } from 'react';

export default {
  title: 'ReactStories',
};

const Story1 = (): JSX.Element => (
  <div
    style={{
      height: '100%',
      padding: '50px 15px',
      color: 'white',
      fontSize: '24px',
      backgroundSize: 'cover',
      backgroundImage:
        'url("https://images.unsplash.com/photo-1611351903570-bb4d3499c046?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")',
    }}
  >
    Unsplash Image
    <br />
    Thanks Наталья Кленова!
  </div>
);

const Story2 = (): JSX.Element => {
  const { current, stories, setCurrent, paused, setPaused, setCount } = useContext(StoriesContext);

  const pause = () => {
    setPaused(!paused);
  };

  /* Note: The component does not limit the usage, setting a not proper context may break */
  /* I do not plan to make it smarter as I wanted to keep it flexible */
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const next = () => {
    if (current < stories.length - 1) {
      setCurrent(current + 1);
    } else {
      setCount(100);
    }
  };

  return (
    <div
      style={{
        padding: '50px 15px',
        fontSize: '24px',
      }}
    >
      Hello {current}
      <button onClick={() => prev()}>Prev</button>
      <button onClick={() => pause()}>Pause</button>
      <button onClick={() => next()}>Next</button>
    </div>
  );
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Basic = (props?: Partial<ReactStoriesProps>): JSX.Element => {
  console.log(props);

  return (
    <StoriesProvider>
      <ReactStories
        stories={[
          {
            duration: 3000,
            content: Story1,
          },
          {
            styles: {
              background: 'pink',
            },
            duration: 10000,
            content: Story2,
          },
        ]}
        storyContainerStyles={{
          width: 360,
          height: 480,
        }}
      />
    </StoriesProvider>
  );
};
