import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import Task from './Task/Task';
import { loadDB, saveDB, updateDB, deleteDataDB } from './database/index';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksList = await loadDB();
        setTasks(tasksList);
      } catch (error) {
        console.error("Error loading tasks: ", error);
      }
    };
    loadTasks();
  }, []);

  const addTask = async () => {
    if (newTaskTitle.trim() !== '') {
      try {
        const newTask = { description: newTaskTitle, done: false };
        const newTaskId = await saveDB(newTask.description, newTask.done);
        setTasks([...tasks, { ...newTask, id: newTaskId }]);
        setNewTaskTitle('');
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const toggleTaskStatus = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);

    try {
      await updateDB(id, !taskToUpdate.done);
    } catch (error) {
      console.error("Error toggling task status: ", error);
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      ));
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDataDB(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App</Text>
      <TextInput
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        placeholder="Enter new task"
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} disabled={newTaskTitle.trim() === ''} />
      <ScrollView style={styles.scrollView}>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onToggle={toggleTaskStatus}
            onDelete={deleteTask}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    paddingTop: 30,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  scrollView: {
    marginTop: 20,
  },
});

export default App;
