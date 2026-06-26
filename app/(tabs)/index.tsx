import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>TaskFlow</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Enter Task" />

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskRow}>
        <MaterialIcons
          name="check-box-outline-blank"
          size={22}
          color="#5A6472"
        />
        <Text style={styles.taskText}>Study React Native</Text>
      </View>

      <View style={styles.taskRow}>
        <MaterialIcons
          name="check-box-outline-blank"
          size={22}
          color="#5A6472"
        />
        <Text style={styles.taskText}>Finish Assignment</Text>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2A44",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },

  addButton: {
    backgroundColor: "#2E5BBA",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  taskText: {
    fontSize: 16,
  },
});
