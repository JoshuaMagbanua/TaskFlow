import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import TaskForm from "../../components/TaskForm";
import TaskItem from "../../components/TaskItem";
import { supabase } from "../../lib/supabase";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string | null;
};

export default function HomeScreen() {
  // Input text
  const [task, setTask] = useState("");

  // Tasks from Supabase
  const [tasks, setTasks] = useState<Task[]>([]);

  // ==========================
  // READ - Load all tasks
  // ==========================
  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error loading tasks:", error.message);
      return;
    }

    setTasks(data ?? []);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================
  // CREATE - Add task
  // ==========================
  async function addTask() {
    if (task.trim() === "") return;

    const { error } = await supabase.from("tasks").insert([
      {
        title: task,
        completed: false,
      },
    ]);

    if (error) {
      console.log("Error adding task:", error.message);
      return;
    }

    setTask("");
    loadTasks();
  }

  // ==========================
  // UPDATE - Toggle completed
  // ==========================
  async function toggleTask(item: Task) {
    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !item.completed,
      })
      .eq("id", item.id);

    if (error) {
      console.log("Error updating task:", error.message);
      return;
    }

    loadTasks();
  }

  // ==========================
  // DELETE - Remove task
  // ==========================
  async function deleteTask(id: number) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.log("Error deleting task:", error.message);
      return;
    }

    loadTasks();
  }

  // Wrapper function (Phase 6)
  function handleAddTask() {
    addTask();
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>TaskFlow</Text>
      </View>

      {/* Task Form */}
      <TaskForm task={task} setTask={setTask} onAdd={handleAddTask} />

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F2A44",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
});
