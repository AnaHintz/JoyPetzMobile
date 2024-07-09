import { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Modal, Pressable, Alert, TextInput } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { collection, query, orderBy, onSnapshot, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import * as React from 'react';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export default function PerfilScreen() {
  const {toggleTheme, isDarkTheme} = useTheme();
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const emailUser = require('../LoginScreen/LoginScreen');

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        if (postData.email === emailUser) {
          postsArray.push({ ...doc.data(), id: doc.id });
        }
      });
      setPosts(postsArray);
    });
    return () => unsubscribe();
  }, [emailUser]);

  const openModal = (item) => {
    setSelectedItem(item);
    setEditedData(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const postRef = doc(db, 'posts', selectedItem.id);
      await updateDoc(postRef, editedData);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedItem.id ? { ...post, ...editedData } : post
        )
      );
      Alert.alert('Item atualizado com sucesso!');
      closeModal();
    } catch (error) {
      Alert.alert('Erro ao atualizar o item: ', error.message);
    }
  };

  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      Alert.alert('Item deletado com sucesso!');
      setDeleteConfirmationVisible(false);
    } catch (error) {
      Alert.alert('Erro ao deletar o item: ', error.message);
    }
  };

  const openDeleteConfirmationModal = (item) => {
    setItemToDelete(item);
    setDeleteConfirmationVisible(true);
  };

  const closeDeleteConfirmationModal = () => {
    setItemToDelete(null);
    setDeleteConfirmationVisible(false);
  };

  return (
    <Surface style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.container}>
          <View style={styles.modalView2}>
            {selectedItem && (
              <View style={styles.post}>
                {editMode ? (
                  <>
                    <TextInput
                      value={editedData.name}
                      onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                      style={styles.input}
                    />
                    <TextInput
                      value={editedData.selectedSex}
                      onChangeText={(text) => setEditedData({ ...editedData, selectedSex: text })}
                      style={styles.input}
                    />
                    <TextInput
                      value={editedData.selectedAge}
                      onChangeText={(text) => setEditedData({ ...editedData, selectedAge: text })}
                      style={styles.input}
                    />
                    <TextInput
                      value={editedData.especie}
                      onChangeText={(text) => setEditedData({ ...editedData, especie: text })}
                      style={styles.input}
                    />
                    <TextInput
                      value={editedData.raca}
                      onChangeText={(text) => setEditedData({ ...editedData, raca: text })}
                      style={styles.input}
                    />
                    <TextInput
                      value={editedData.contato}
                      onChangeText={(text) => setEditedData({ ...editedData, contato: text })}
                      style={styles.input}
                    />
                    <TextInput
                      value={editedData.desc}
                      onChangeText={(text) => setEditedData({ ...editedData, desc: text })}
                      style={styles.input}
                    />
                    <TextInput
                      value={editedData.email}
                      onChangeText={(text) => setEditedData({ ...editedData, email: text })}
                      style={styles.input}
                    />
                  </>
                ) : (
                  <>
                    <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />
                    <Text style={styles.modalText}>{selectedItem.name}</Text>
                    <Text>sexo: {selectedItem.selectedSex}</Text>
                    <Text>idade: {selectedItem.selectedAge}</Text>
                    <Text>espécie: {selectedItem.especie}</Text>
                    <Text>raça: {selectedItem.raca}</Text>
                    <Text>contato: {selectedItem.contato}</Text>
                    <Text>descrição: {selectedItem.desc}</Text>
                    <Text>email: {selectedItem.email}</Text>
                  </>
                )}
              </View>
            )}
            <Pressable
              onPress={closeModal}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle}>Sair</Text>
            </Pressable>
            {editMode ? (
              <Pressable
                onPress={handleSave}
                style={[styles.button, styles.buttonSave]}
              >
                <Text style={styles.textStyle}>Salvar</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleEdit}
                style={[styles.button, styles.buttonEdit]}
              >
                <Text style={styles.textStyle}>Editar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={deleteConfirmationVisible}
        onRequestClose={closeDeleteConfirmationModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir esta publicação?</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeDeleteConfirmationModal}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  deletePost(itemToDelete.id);
                  closeDeleteConfirmationModal();
                }}
              >
                <Text style={styles.textStyle}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Text><Entypo name="user" size={24} color="black" /> Olá {emailUser}</Text>
      <Button 
      mode="contained" 
      buttonColor="hotpink" 
      onPress={toggleTheme}
      icon={() => <FontAwesome5 name="moon" size={20} color="white" />}
     >
      Alternar tema
    </Button>

      <Text>Suas Publicações</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text>{item.name}</Text>
            <Button onPress={() => openModal(item)} style={[styles.button, styles.buttonOpen]}>Ver mais</Button>
            <Button onPress={() => openDeleteConfirmationModal(item)} style={[styles.button, styles.buttonClose]}>Excluir</Button>
            </View>
        )}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "gray",
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView2: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonEdit: {
    backgroundColor: '#FFB74D',
  },
  buttonSave: {
    backgroundColor: '#4CAF50',
  },
  textStyle: {
    color: 'preto',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  
});


