
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { Box } from '@mui/material';
import { fetchTasks } from '../../store/store';

import TaskList from './TaskList';


export default function InboxScreen() {
  const dispatch = useDispatch();
  // We're retrieving the error field from our updated store
  const { error } = useSelector((state: any) => state.taskbox);
  // The useEffect triggers the data fetching when the component is mounted
  useEffect(() => {
    dispatch(fetchTasks() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <div className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }
  return (
    <div className="page lists-show">
      <div>
        <h1 className="title-page">Taskbox</h1>
      </div>
      <TaskList />
    </div>
  );
}