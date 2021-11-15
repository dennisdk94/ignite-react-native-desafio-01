import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';

import {Task} from './TasksList'

interface TaskItemProps {
  index: number,
  toggleTaskDone: (id: number) => void,
  removeTask: (id: number) => void,
  editTask: (id: number, task: string) => void,
  item: Task,
}

export function TaskItem({index, toggleTaskDone, item, removeTask, editTask}: TaskItemProps) {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEdit(!edit);
  }

  function handleCancelEditing() {
    setNewTask(item.title);
    setEdit(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTask);
    setEdit(false);
  }

  useEffect(() => {
    edit === true ? textInputRef.current?.focus() : textInputRef.current?.blur();
  },[edit])
  
  return (
    <>
        <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
                //TODO - use onPress (toggle task) prop
              >
                <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                  style={item.done ? styles.taskTextDone : styles.taskText}
                  value={newTask}
                  onChangeText={setNewTask}
                  editable={edit}
                  onSubmitEditing={handleStartEditing}
                  ref={textInputRef}
                />
                  
              </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
              {edit ? (
                <TouchableOpacity onPress={handleCancelEditing}>
                  <Icon name="x" size={24} color="#B2B2B2" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleStartEditing}>
                  <Image source={penIcon} />
                </TouchableOpacity>
              )}

              <View style={styles.iconsDivider} />

              <TouchableOpacity
                disabled={edit}
                testID={`trash-${index}`}
                onPress={() => removeTask(item.id)}
              >
                <Image source={trashIcon} style={{opacity: edit ? 0.2 : 1}} />
              </TouchableOpacity>
            </View>

            
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    width: 94,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingRight: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
})