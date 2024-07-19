import { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Modal, Pressable, Alert } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { collection, query, orderBy, onSnapshot, where, limit } from "firebase/firestore";
import { db } from "../../config/firebase";
import * as React from 'react';
import { Picker } from "@react-native-picker/picker";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [resultadosVazios, setResultadosVazios] = useState(false);

  useEffect(() => {
    let q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    if (pesquisa) {
      q = query(collection(db, "posts"),
        where("especie", "==", pesquisa),
        orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });

      if (postsArray.length === 0) {
        setResultadosVazios(true);
      } else {
        setResultadosVazios(false);
      }

      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, [pesquisa]);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const Pesquisar = (itemvalue) => {
    setPesquisa(itemvalue === "Todos" ? null : itemvalue)
  };

  return (
    <Surface style={styles.centeredView}>

      <View style={styles.pesq}>
        <Text style={styles.label}>Buscar por:</Text>
        <Picker
          selectedValue={pesquisa}
          onValueChange={Pesquisar}
          style={styles.pesq2}
        >
          <Picker.Item label="Todos" value="Todos" />
          <Picker.Item label="Cão" value="Cão" />
          <Picker.Item label="Gato" value="Gato" />
          <Picker.Item label="Pássaro" value="Pássaro" />
          <Picker.Item label="Roedor" value="Roedor" />
          <Picker.Item label="Aquático" value="Aquático" />
        </Picker>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          closeModal();
        }}
      >

        <View style={styles.modalView2}>
          {selectedItem && (
            <View style={styles.post}>
              <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />
              <Text style={[styles.modalText, styles.modalFont]}>{selectedItem.name}</Text>
              <View style={styles.mdFtEspc}>
                <Text style={styles.label}>Sexo: <Text style={styles.info}>{selectedItem.selectedSex}</Text></Text>
                <Text style={styles.label}>Idade: <Text style={styles.info}>{selectedItem.selectedAge}</Text></Text>
                <Text style={styles.label}>Espécie: <Text style={styles.info}>{selectedItem.especie}</Text></Text>
                <Text style={styles.label}>Raça: <Text style={styles.info}>{selectedItem.raca}</Text></Text>
                <Text style={styles.label}>Contato: <Text style={styles.info}>{selectedItem.contato}</Text></Text>
                <Text style={styles.label}>Descrição: <Text style={styles.info}>{selectedItem.desc}</Text></Text>
              </View>
            </View>
          )}
          <Pressable
            onPress={closeModal}
            style={[styles.button, styles.buttonOpen]}
          >
            <Text style={styles.buttonTextModal}>Voltar</Text>
          </Pressable>
        </View>

      </Modal>

      {resultadosVazios && pesquisa !== null ? (

        <View>
          <Text>Não há posts com essa espécie.</Text>
        </View>

      ) : (
        <FlatList
          data={pesquisa ? posts.filter(post => post.especie === pesquisa) : posts}
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
              </View>
            </View>
          )}
        />
      )}
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
    backgroundColor: "#DCDCDC",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    borderRadius: 45,
  },
  modalFont: {
    color: 'hotpink',
    paddingTop: 5,
    fontSize: 20,
  },
  modalFontEspc: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
  },
  mdFtEspc: {
    marginLeft: 30,
  },
  image: {
    width: 370,
    height: 300,
    marginBottom: 10,
    borderRadius: 45,
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
    borderRadius: 40,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'hotpink',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  name: {
    flex: 1,
    color: 'black',
    marginRight: 10,
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20, // Aumenta levemente o tamanho da fonte
    color: 'white', // Altera a cor da fonte para branco
  },
  buttonTextModal: {
    color: 'white',
    textAlign: 'center', // Centraliza o texto
  },
  label: {
    color: 'hotpink', // Cor dos tópicos em rosa
    fontWeight: 'bold', // Negrito para os tópicos em rosa
    fontSize: 20, // Tamanho da fonte dos tópicos
    marginTop: 2
  },
  label2: {
    color: 'hotpink', // Cor dos tópicos em rosa
    fontWeight: 'bold', // Negrito para os tópicos em rosa
    fontSize: 20, // Tamanho da fonte dos tópicos
    marginLeft: "30%"
  },
  info: {
    color: 'black',
    fontSize: 20,
  },
  pesq: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
    
  },
  pesq2: {
    height: 30,
    width: 150,
    marginLeft: 10,
    border: "1px solid hotpink",
    backgroundColor: "#FFF",
    borderRadius: 4,
    color: "hotpink",
    fontWeight: 'bold'
  },
  separator: {
    width: "90%",
    height: 2,
    backgroundColor: "hotpink",
    marginBottom: 20,
  },

});
