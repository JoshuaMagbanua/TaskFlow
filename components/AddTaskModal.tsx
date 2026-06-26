import { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

export default function AddTaskModal({ visible, onClose, onSubmit }: Props) {
  const [text, setText] = useState("");

  function handleSubmit() {
    if (text.trim() === "") return;

    onSubmit(text);

    setText("");
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Dark Background */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Modal Card */}
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>Add New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter task..."
            value={text}
            onChangeText={setText}
            autoFocus
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2A44",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },

  cancelText: {
    color: "#5A6472",
    fontWeight: "bold",
    paddingVertical: 10,
  },

  addButton: {
    backgroundColor: "#2E5BBA",
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: "center",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
