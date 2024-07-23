import { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Modal, Pressable, Alert, TextInput } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { collection, query, orderBy, onSnapshot, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export default function PerfilScreen() {
  const { toggleTheme, isDarkTheme } = useTheme();
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
        <View style={styles.containerModal}>
          <View style={styles.modalView2}>
            <View style={{ alignSelf: "stretch" }}>
              {selectedItem && (
                <View style={styles.post2}>
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
                    </>
                  ) : (
                    <View>
                      <View style={styles.imageContainer}>
                        <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />
                      </View>
                      <Text style={[styles.modalText, styles.modalFont]}>{selectedItem.name}</Text>
                      <View style={styles.mdFtEspc}>
                        <Text style={styles.label}>Sexo:  <Text style={styles.info}>{selectedItem.selectedSex}</Text></Text>
                        <Text style={styles.label}>Idade:  <Text style={styles.info}>{selectedItem.selectedAge}</Text></Text>
                        <Text style={styles.label}>Espécie:  <Text style={styles.info}>{selectedItem.especie}</Text></Text>
                        <Text style={styles.label}>Raça:  <Text style={styles.info}>{selectedItem.raca}</Text></Text>
                        <Text style={styles.label}>Contato:  <Text style={styles.info}>{selectedItem.contato}</Text></Text>
                        <Text style={styles.label}>Descrição:  <Text style={styles.info}>{selectedItem.desc}</Text></Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
              <View style={styles.buttonRow}>
                <Pressable onPress={closeModal} style={[styles.button2, styles.buttonClose]}>
                  <Text style={styles.textStyle}>Sair</Text>
                </Pressable>
                {editMode ? (
                  <Pressable onPress={handleSave} style={[styles.button2, styles.buttonSave]}>
                    <Text style={styles.textStyle}>Salvar</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={handleEdit} style={[styles.button2, styles.buttonEdit]}>
                    <Text style={styles.textStyle}>Editar</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <FontAwesome5 name="user-circle" size={44} color="hotpink" />
        <Text style={{ color: 'hotpink', fontSize: 22 }} > Olá {emailUser}</Text>
      </View>
      <Button
        mode="contained"
        buttonColor="hotpink"
        style={{ marginBottom: 25, marginLeft: 140 }}
        onPress={toggleTheme}
        icon={() => <FontAwesome5 name="moon" size={20} color="white" />}
      >
        Alterar tema
      </Button>
      <Text variant="titleLarge" style={styles.title}>Suas Publicações</Text>
      <View style={styles.separator} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Button
                onPress={() => openModal(item)}
                style={[styles.button, styles.buttonOpen]}
                labelStyle={styles.buttonText}
              >
                Ver mais
              </Button>
              <Button
                onPress={() => openDeleteConfirmationModal(item)}
                style={[styles.button, styles.buttonClose]}
                labelStyle={styles.buttonText}
              >
                Excluir
              </Button>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteConfirmationVisible}
        onRequestClose={closeDeleteConfirmationModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir?</Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={closeDeleteConfirmationModal}
              >
                <Text style={styles.textStyle}>Não</Text>
              </Pressable>
              <Pressable
                style={[styles.button2, styles.buttonDelete]}
                onPress={() => deletePost(itemToDelete.id)}
              >
                <Text style={styles.textStyle}>Sim</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#C0C0C0",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    borderRadius: 45,
  },
  post2: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    borderRadius: 45,
  },
  label: {
    color: 'hotpink',
    fontWeight: 'bold',
    fontSize: 20,
  },
  info: {
    color: 'black',
    fontSize: 20,
  },
  mdFtEspc: {
    marginLeft: 30,
  },
  modalFont: {
    color: 'hotpink',
    paddingTop: 5,
    fontSize: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    minWidth: 370,
    height: 300,
    marginBottom: 10,
    borderRadius: 45,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView2: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  button: {
    margin: 3,
    borderRadius: 40,
    padding: 10,
    elevation: 2,
  },
  button2: {
    width: 100,
    borderRadius: 40,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: 'hotpink',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  buttonTextModal: {
    color: 'white',
    textAlign: 'center',
  },
  name: {
    flex: 1,
    color: 'black',
    marginRight: 10,
    fontSize: 20,
  },
  buttonClose: {
    backgroundColor: 'gray',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  buttonEdit: {
    backgroundColor: 'hotpink',
  },
  buttonSave: {
    backgroundColor: 'hotpink',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'hotpink',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 10,
  },
  separator: {
    width: "85%",
    height: 2,
    backgroundColor: "hotpink",
    marginBottom: 25,
    marginTop: 10,
  },
  title: {
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: "bold",
    color: "hotpink",
  },
});
