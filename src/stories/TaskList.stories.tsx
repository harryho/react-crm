import { Provider } from 'react-redux';

import { configureStore, createSlice } from '@reduxjs/toolkit';

import TaskList from '../components/sb/TaskList';
import { TaskType } from '../components/sb/Task';
import * as TaskStories from './Task.stories';
import {
  fireEvent,
  waitFor,
  within,
  waitForElementToBeRemoved
 } from '@storybook/test';



// A simple mock of the state of the store
export const MockedState = {
    tasks: [
      { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
      { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
      { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
      { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
      { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
      { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
    ],
    status: 'idle',
    error: null,
  };
  
  // A super-simple mock of a redux store
  const Mockstore = ({ taskboxState, children }:any) => (
    <Provider
      store={configureStore({
        reducer: {
          taskbox: createSlice({
            name: 'taskbox',
            initialState: taskboxState,
            reducers: {
              updateTaskState: (state, action) => {
                const { id, newTaskState } = action.payload;
                const task = state.tasks.findIndex((t:TaskType) => t.id === id);
                if (task >= 0) {
                  state.tasks[task].state = newTaskState;
                }
              },
            },
          }).reducer,
        },
      })}
    >
      {children}
    </Provider>
  );
  
  export default {
    component: TaskList,
    title: 'TaskList',
    decorators: [(story: any) => <div style={{ margin: '3rem' }}>{story()}</div>],
    tags: ['autodocs'],
    excludeStories: /.*MockedState$/,
  };
  
  export const Default = {
    decorators: [
      (story: any) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
    ],

    play: async ( {canvasElement}: any ) => {
      const canvas = within(canvasElement);
      // Waits for the component to transition from the loading state
      // await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
      // Waits for the component to be updated based on the store
      await waitFor(async () => {
        // Simulates pinning the first task
        await fireEvent.click(canvas.getByLabelText('Task 1'));
        // Simulates pinning the third task
        await fireEvent.click(canvas.getByLabelText('Task 3'));
      });
    },
  };
  
  export const WithPinnedTasks = {
    decorators: [
      (story: any) => {
        const pinnedtasks = [
          ...MockedState.tasks.slice(0, 5),
          { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
        ];
  
        return (
          <Mockstore
            taskboxState={{
              ...MockedState,
              tasks: pinnedtasks,
            }}
          >
            {story()}
          </Mockstore>
        );
      },
    ],
  };
  
  export const Loading = {
    decorators: [
      (story: any) => (
        <Mockstore
          taskboxState={{
            ...MockedState,
            status: 'loading',
          }}
        >
          {story()}
        </Mockstore>
      ),
    ],
    play: async ( {canvasElement}: any ) => {
      const canvas = within(canvasElement);
      await waitFor(async () => {
        // Simulates pinning the first task
        await canvas.findByTestId('loading')

      });
    },
  };
  
  export const Empty = {
    decorators: [
      (story: any) => (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: [],
          }}
        >
          {story()}
        </Mockstore>
      ),
    ],
  };
  
