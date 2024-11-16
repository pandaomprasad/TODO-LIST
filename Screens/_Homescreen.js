import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TaskInput from "../Components/_taskinput_";

const dummyTask = [
  {
    title: "Day 1 - Task Completed",
    isFinished: true,
  },
  {
    title: "Day 2 - Task Completed",
    isFinished: true,
  },
  {
    title: "Day 3 - Task Pending",
    isFinished: false,
  },
  {
    title: "Day 4 - Task Completed",
    isFinished: true,
  },
  {
    title: "Day 5 - Task Pending",
    isFinished: false,
  },
  {
    title: "Day 6 - Task Pending",
    isFinished: false,
  },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTask);
  const [newTask, setNewTask] = useState("");

  const onItemPress = (index) => {
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
      return updatedTasks;
    });
  };

  const handleAddTask = (taskTitle) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      { title: taskTitle, isFinished: false },
    ]);
  };

  return (
    <View style={styles.container}>
      <TaskInput onAddTask={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.taskContainer}
            onPress={() => onItemPress(index)}
          >
            <MaterialCommunityIcons
              name={
                item.isFinished
                  ? "checkbox-marked-circle-outline"
                  : "checkbox-blank-circle-outline"
              }
              size={24}
              color="black"
            />
            <Text
              style={[
                styles.taskFont,
                {
                  textDecorationLine: item.isFinished ? "line-through" : "none",
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
  taskContainer: {
    padding: 10,
    flexDirection: "row",
    gap: 5,
  },
  taskFont: {
    color: "gray",
    fontSize: 15,
    fontFamily: "InterSemi",
  },
  headerContainer: {
    gap: 8,
    flex: 1,
  },
  headerText: {
    color: "red",
    fontSize: 20,
    fontWeight: 800,
    fontFamily: "Inter",
  },
  headerInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    borderRadius: 5,
  },
});
