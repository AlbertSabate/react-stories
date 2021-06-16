import ReactDOM from 'react-dom';
import { ReactStories } from '../src/ReactStories';

describe('ReactStories', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReactStories stories={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
