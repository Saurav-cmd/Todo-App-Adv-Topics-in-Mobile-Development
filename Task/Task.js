import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={[styles.taskText, task.isDone && styles.taskTextDone]}>
        {task.title}
      </Text>
      <Switch
        value={task.isDone}
        onValueChange={() => onToggle(task.id)}
        style={styles.switch}
      />
      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  taskText: {
    flex: 1,
    marginHorizontal: 10,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  switch: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Task;
