import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TaskInput from "../Components/_taskinput_";

import DropdownExample from "../Components/TinyComponent/__whomtotask__"; // Import the DropdownExample component

const dummyTask = [
  {
    title: "Day 1 - Task Completed",
    isFinished: true,
    date: new Date(),
    assignedTo: null, // Add a property for the assigned person
  },
  {
    title: "Day 2 - Task Completed",
    isFinished: true,
    date: new Date(),
    assignedTo: null,
  },
  // ... (other tasks)
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTask);
  const [selectedName, setSelectedName] = useState(null); // Store the selected name

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
      { title: taskTitle, isFinished: false, date: new Date(), assignedTo: selectedName }, 
    ]);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView>
        <TaskInput onAddTask={handleAddTask} />
        
        {/* Pass setSelectedName to DropdownExample so it can update the selected name */}
        <DropdownExample onSelectName={setSelectedName} /> 

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
              <View style={styles.taskTextContainer}>
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
                <Text style={styles.dateFont}>
                  {formatDate(item.date)}
                </Text>
                {item.assignedTo && (
                  <Text style={styles.assignedToText}>
                    Assigned To: {item.assignedTo}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  taskContainer: {
    padding: 5,
    flexDirection: "row",
    gap: 5,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskFont: {
    color: "gray",
    fontSize: 15,
    fontFamily: "InterSemi",
  },
  dateFont: {
    color: "gray",
    fontSize: 12,
    fontFamily: "Inter",
  },
  assignedToText: {
    color: "blue", // Style for the assigned person's name
    fontSize: 14,
    fontFamily: "Inter",
  },
});
