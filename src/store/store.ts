
/* A simple redux store/actions/reducer implementation.
 * A true app would be more complex and separated into different files.
 */
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/*
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let's not worry about that now
 */
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];
const TaskBoxData = {
  tasks: defaultTasks,
  status: 'idle',
  error: null,
};


/*
 * Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
     const response = await fetch(
       'https://jsonplaceholder.typicode.com/todos?userId=1'
     );
     const data = await response.json();
     const result = data.map((task: any) =>({
       id: `${task.id}`,
       title: task.title,
       state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
     }));
     return result;
   });

/*
 * The store is created here.
 * You can read more about Redux Toolkit's slices in the docs:
 * https://redux-toolkit.js.org/api/createSlice
 */
const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((t: any) =>t.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
   /*
   * Extends the reducer for the async actions
   * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
   */
  extraReducers(builder) {
      builder
      .addCase(fetchTasks.pending, (state: any) => {
        state.status = 'loading';
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        // Add any fetched tasks to the array
        state.tasks = action.payload;
       })
      .addCase(fetchTasks.rejected, (state: any) => {
        state.status = 'failed';
        state.error = "Something went wrong";
        state.tasks = [];
      });
   },
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/*
 * Our app's store configuration goes here.
 * Read more about Redux's configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export default store;