export type Task = {
  id: number;
  title: string;
  notes: string;
};

export const initialTasks: Task[] = [
  { id: 1, title: 'Prepare the Go workshop demo', notes: 'Run the API locally and check the examples before the campus workshop.' },
  { id: 2, title: 'Review my TypeScript practice', notes: 'Revisit Context, typed props and immutable state updates.' },
  { id: 3, title: 'Plan the hackathon pitch', notes: 'Draft the problem, solution and a short demo for our KBTU pitch session.' },
];
