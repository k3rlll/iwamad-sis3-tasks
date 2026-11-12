import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { initialTasks, type Task } from '../data/tasks';

type TasksContextValue = {
  tasks: Task[];
  addTask: (title: string, notes: string) => boolean;
  deleteTask: (id: number) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const nextId = useRef(Math.max(...initialTasks.map((task) => task.id)) + 1);

  function addTask(title: string, notes: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return false;
    const task: Task = { id: nextId.current++, title: trimmedTitle, notes: notes.trim() };
    setTasks((current) => [...current, task]);
    return true;
  }

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return <TasksContext.Provider value={{ tasks, addTask, deleteTask }}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks must be used inside TasksProvider');
  return context;
}
