import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure(
  {
    adapter: new Adapter(),
    disableLifecycleMethods: true
    // "setupFiles": ["./src/setupTests.js"]
  });
