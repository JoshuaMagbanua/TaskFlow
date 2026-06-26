import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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

    setTasks(data);
  }

  // Load tasks once
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
  async function toggleTask(item: any) {
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>TaskFlow</Text>
      </View>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() => toggleTask(item)}
            onLongPress={() => deleteTask(item.id)}
          >
            <View style={styles.taskRow}>
              <MaterialIcons
                name={item.completed ? "check-box" : "check-box-outline-blank"}
                size={22}
                color={item.completed ? "#2E5BBA" : "#5A6472"}
              />

              <Text style={styles.taskText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
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

  inputRow: {
    flexDirection: "row",
    marginBottom: 25,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 16,
  },

  addButton: {
    width: 50,
    backgroundColor: "#2E5BBA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  taskText: {
    fontSize: 16,
    color: "#333333",
  },
});
