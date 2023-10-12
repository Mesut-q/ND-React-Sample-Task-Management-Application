// TaskItem.js (Atom)
function TaskItem({ task, onDelete }) {
  return (
    <div>
      {task.title}
      <button onClick={() => onDelete(task.id)}>Sil</button>
    </div>
  );
}

// TaskForm.js (Atom)
function TaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    onAdd(newTask);
    setNewTask("");
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Ekle</button>
    </div>
  );
}

// TaskList.js (Molecule)
function TaskList({ tasks, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}

// App.js (Organism)
function App() {
  const [tasks, setTasks] = useState(fakeData);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <MainTemplate>
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </MainTemplate>
    </div>
  );
}

// MainTemplate.js (Template)
function MainTemplate({ children }) {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

// TaskManagerPage.js (Page)
function TaskManagerPage() {
  return (
    <App />
  );
}

const fakeData = [
  { id: 1, title: "Görev 1" },
  { id: 2, title: "Görev 2" },
  // Diğer sahte veriler
];
