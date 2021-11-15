import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existTasks = tasks.find(task => task.title === newTaskTitle)

    if(existTasks) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
         {
           text: "Ok"
         }
        ]
      )
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
  
      setTasks([...tasks, newTask] )
    }
    
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map((task) => {
      if(task.id === id) {
        task.done = !task.done
      }
      return task;
    })

    setTasks(updateTask);
  }

  function handleEditTask(taskId: number, taskTitle: string) {
    const updateTask = tasks.map((task) => {
      if(task.id === taskId) {
        task.title = taskTitle
      }
      return task;
    })

    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
       {
         text: "Sim",
         onPress: () => setTasks(tasks.filter((task) => task.id !== id))
       },
       {
         text: "Não"
       }
      ]
    )
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})