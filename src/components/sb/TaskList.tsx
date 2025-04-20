import { useDispatch, useSelector } from 'react-redux';
// import { Box, Stack } from '@mui/material';

import Task, { TaskType } from './Task';
import { updateTaskState } from '../../store/store';

export interface TaskListProps {
  loading: boolean;
  tasks: TaskType[];
  onPinTask: Function;
  onArchiveTask:  Function;
}

export default function TaskList() {
  // We're retrieving our state from the store
  const tasks = useSelector((state: any) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t: any)=> t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t: any)=> t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t: any)=> t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    return filteredTasks;
  });

  const { status } = useSelector((state: any) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (value: any) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  };
  const archiveTask = (value: any) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  };
  const LoadingRow = (
    <div className="loading-item">
      <div className="glow-checkbox" />
      <div className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </div>
    </div>
  );
  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key="loading">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key="empty" data-testid="empty">
        <div className="wrapper-message">
          <div className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key="success">
      {tasks.map((task: any) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(t: any) => pinTask(t)}
          onArchiveTask={(t: any) => archiveTask(t)}
        />
      ))}
    </div>
  );
}
