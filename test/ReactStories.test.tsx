import { render, screen, waitFor } from '@testing-library/react';
import { ReactStories, StoriesProvider } from '../src/ReactStories';
import type { Story } from '../src/Context';

const Story1 = (): JSX.Element => <div>Story1</div>;
const Story2 = (): JSX.Element => <div>Story2</div>;

const emptyStories: Array<Story> = [];

const oneStories: Array<Story> = [
  {
    content: Story1,
  },
];

const multipleStories: Array<Story> = [
  {
    duration: 1000,
    content: Story1,
  },
  {
    duration: 1000,
    content: Story2,
    styles: {
      background: 'pink',
    },
  },
];

describe('ReactStories', () => {
  it('renders without crashing', () => {
    render(
      <StoriesProvider>
        <ReactStories stories={emptyStories} />
      </StoriesProvider>,
    );

    expect(screen.queryByTestId('progress-0')).toBeNull();
  });

  it('renders one story', () => {
    render(
      <StoriesProvider>
        <ReactStories stories={oneStories} />
      </StoriesProvider>,
    );

    expect(screen.getByText(/Story1/i)).toBeTruthy();
  });

  it('renders multiple stories', async () => {
    render(
      <StoriesProvider>
        <ReactStories stories={multipleStories} firstStory={1} />
      </StoriesProvider>,
    );

    expect(await waitFor(() => screen.findByText(/Story2/i))).toBeTruthy();
  });
});
