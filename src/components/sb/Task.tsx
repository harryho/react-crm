// import { Button, InputLabel } from "@mui/material";
// import Box from "@mui/material/Box";
// import { Iconify } from "../iconify";

import { Button } from "src/components/sb/Button";

export interface TaskType {
    id: string; title: string; state: string;
}

export interface TaskProps {
    task: TaskType;
    onPinTask: Function;
    onArchiveTask:  Function;
}

export default function Task({ task, onArchiveTask, onPinTask }: TaskProps ) {
    const { id, title, state} = task;
    return (
      <div className={`list-item ${state}`}>
        <label
          htmlFor={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
          className="checkbox"
        >
          <input
            type="checkbox"
            disabled={true}
            name="checked"
            id={`archiveTask-${id}`}
            checked={state === "TASK_ARCHIVED"}
          />
          <span
            className="checkbox-custom"
            onClick={() => onArchiveTask(id)}
          />
        </label>
  
        <label htmlFor={`title-${id}`} aria-label={title} className="title">
          <input
            type="text"
            value={title}
            readOnly={true}
            name="title"
            id={`title-${id}`}
            placeholder="Input title"
            style={{ textOverflow: 'ellipsis' }}
          />
        </label>
  
        {state !== "TASK_ARCHIVED" && (
          <button
            className="pin-button"
            onClick={() => onPinTask(id)}
            id={`pinTask-${id}`}
            aria-label={`pinTask-${id}`}
            key={`pinTask-${id}`}
          >
            <span className={`icon-star`} />
          </button>
        )}
      </div>
    );
  }
