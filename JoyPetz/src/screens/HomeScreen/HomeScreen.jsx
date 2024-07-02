import { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Modal, Pressable } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import * as React from 'react';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <Surface style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          closeModal();
        }}
      >
        <View style={styles.containerUp}>
          <View style={styles.modalView2}>
            {selectedItem && (
              <View style={styles.post}>
                <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />
                <Text style={styles.modalText}>{selectedItem.name}</Text>
                <Text>sexo: {selectedItem.selectedSex}</Text>
                <Text>idade: {selectedItem.selectedAge}</Text>
                <Text>espécie: {selectedItem.especie}</Text>
                <Text>raça: {selectedItem.raca}</Text>
                <Text>contato: {selectedItem.contato}</Text>
                <Text>descrição: {selectedItem.desc}</Text>
              </View>
            )}
            <Pressable
              onPress={closeModal}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text>{item.name}</Text>
            <Button onPress={() => openModal(item)} style={[styles.button, styles.buttonOpen]}>Ver mais</Button>
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
    marginTop: 30,
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});