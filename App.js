import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import Task from './Task/Task';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, title: newTaskTitle, isDone: false }]);
      setNewTaskTitle('');
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
