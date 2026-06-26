import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  task: string;
  setTask: (text: string) => void;
  onAdd: () => void;
};

export default function TaskForm({ task, setTask, onAdd }: Props) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Enter Task"
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
