import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getTodos() {
  const rows = await sql('SELECT * FROM todos ORDER BY created_at DESC');
  return rows;
}

export async function createTodo(title: string) {
  const [row] = await sql('INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *', [title, false]);
  return row;
}

export async function updateTodo(id: string, completed: boolean) {
  const [row] = await sql('UPDATE todos SET completed = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [completed, id]);
  return row;
}

export async function deleteTodo(id: string) {
  await sql('DELETE FROM todos WHERE id = $1', [id]);
}