import { Button, FlatList, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import {products} from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem/ProductListItem';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { Todo } from '@/src/types/types';
import { Entypo, Ionicons } from '@expo/vector-icons';


export default function MenuScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    const todoRef = collection(FIREBASE_DB, 'todo');

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        // console.log('Updated');

        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      }
    });

    return () => subscriber();
  })
  
  const addTodo = async () => {
    const doc = await addDoc(collection(FIREBASE_DB, 'todo'), {title: todo, done: false});
    setTodo('');
  };

  const renderTodo = ({item}: any) => {
    const ref = doc(FIREBASE_DB, `todo/${item.id}`);
    const toggleDone = async() => {
      updateDoc(ref, {done: !item.done});
    };

    const deleteItem = async() => {
      deleteDoc(ref)
    };

    return(
      <View>
        <TouchableOpacity onPress={toggleDone}>
          {!item.done && <Ionicons style={styles.text} name="checkmark-circle"/>}
          {item.done && <Entypo style={styles.text} name="circle"/>}
          <Text style={styles.text} >Test {item.title}</Text>
        </TouchableOpacity>
        <Ionicons style={styles.text} name="trash-bin-outline" size={24} color="white" onPress={deleteItem}/>
      </View>
    );
  }

  return (
    <>
      <TextInput style={styles.text} placeholder='Add new todo' onChangeText={(text:string) => setTodo(text)} value={todo}/>
      <Button onPress={addTodo} title='Add Todo' disabled={todo === ''}/>
      <View>
        {/* {
          todos.map((todo) => (
            <Text style={styles.text} key={todo.id}>{todo.title}</Text>
          ))
        } */}
        <FlatList 
        data={todos}
        renderItem={(item) => renderTodo(item)}
        keyExtractor={(todo: Todo) => todo.id}
        />
      </View>
      <FlatList 
        data = {products} 
        renderItem={({item }) => <ProductListItem product={item}/>}
        numColumns = {2}
        contentContainerStyle={{ gap: 10, padding: 10}}
        columnWrapperStyle={{ gap: 10}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  }
});
