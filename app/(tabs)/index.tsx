import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import AddTaskModal from "../../components/AddTaskModal";
import TaskItem from "../../components/TaskItem";
import { supabase } from "../../lib/supabase";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string | null;
};

export default function HomeScreen() {
  // ==========================
  // STATES
  // ==========================

  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // ==========================
  // READ
  // ==========================

  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      Toast.show({
        type: "error",
        text1: "Could not load tasks",
        text2: error.message,
      });

      return;
    }

    setTasks(data ?? []);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================
  // CREATE
  // ==========================

  async function handleSubmitTask(title: string) {
    if (title.trim() === "") return;

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        completed: false,
      },
    ]);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Could not add task",
        text2: error.message,
      });

      return;
    }

    setModalVisible(false);

    await loadTasks();

    Toast.show({
      type: "success",
      text1: "Task added",
    });
  }

  // ==========================
  // UPDATE
  // ==========================

  async function toggleTask(item: Task) {
    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !item.completed,
      })
      .eq("id", item.id);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Could not update task",
        text2: error.message,
      });

      return;
    }

    await loadTasks();

    Toast.show({
      type: "success",
      text1: "Task updated",
    });
  }

  // ==========================
  // DELETE
  // ==========================

  async function deleteTask(id: number) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Could not delete task",
        text2: error.message,
      });

      console.log(error);

      return;
    }

    await loadTasks();

    Toast.show({
      type: "success",
      text1: "Task deleted",
    });
  }

  // ==========================
  // UI
  // ==========================

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>TaskFlow</Text>
      </View>

      {/* Task List */}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Button */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal */}

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

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

  fab: {
    position: "absolute",
    right: 25,
    bottom: 35,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2E5BBA",
    justifyContent: "center",
    alignItems: "center",

    elevation: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
