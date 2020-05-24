import path from 'path';
import initStoryshots ,{ multiSnapshotWithOptions} from '@storybook/addon-storyshots';

jest.mock('@storybook/node-logger');

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
    return {
        ...original,
        createPortal: (node: any) => node,
    };
});



// with react-test-renderer
initStoryshots({
  framework: 'react',
  // Ignore integrityOptions for async.storyshot because only run when asyncJest is true
  integrityOptions: { cwd: __dirname, ignore: ['**/**.async.storyshot','**/**.skip-test.stories.storyshot'] },
  configPath: path.join(__dirname, '../..', '.storybook' ),
  
  test: multiSnapshotWithOptions(),
});
