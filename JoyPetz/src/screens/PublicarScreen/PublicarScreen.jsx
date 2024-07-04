import { View, StyleSheet, Text, Platform, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import { storage, db } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function PublicarScreen({ navigation }) {
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [contato, setContato] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedAge, setSelectedAge] = useState('2 meses');
  const [selectedSex, setSelectedSex] = useState('Fêmea');
  const [uploading, setUploading] = useState(false);

  const generateAgeOptions = () => {
    const options = [];
    for (let i = 2; i <= 120; i++) {
      if (i < 24) {
        options.push({ label: `${i} meses`, value: `${i} meses` });
      } else {
        const years = Math.floor(i / 12);
        const months = i % 12;
        options.push({ label: `${years} anos${months > 0 ? ` e ${months} meses` : ''}`, value: `${years} anos${months > 0 ? ` e ${months} meses` : ''}` });
      }
    }
    return options;
  };

  const pickImage = async () => {
    console.log("Iniciando seleção de imagem...");

    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissões para acessar a galeria de imagens.');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Imagem selecionada:", result);

    if (!result.canceled) {
      const uri = Platform.OS === 'web' ? result.assets[0].uri : result.uri;
      setImage(uri);
    } else {
      console.log("Seleção de imagem cancelada.");
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);
    console.log("Iniciando upload da imagem...");

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}-${name}.jpg`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "posts"), {
        imageUrl: downloadURL,
        name: name,
        selectedSex: selectedSex,
        selectedAge: selectedAge,
        especie: especie,
        raca: raca,
        contato: contato,
        desc: desc,
        createdAt: new Date(),
        email: require('../LoginScreen/LoginScreen'),
      });
      console.log("Upload realizado com sucesso:", downloadURL);
      setUploading(false);
      setImage(null);
      navigation.navigate('Home')
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      setUploading(false);
    }
  };

  return (
    <View style={publi.container}>
      <View style={styles.container}>
        <TouchableOpacity style={publi.toque} onPress={pickImage}>
          <FontAwesome name="camera" size={21} color="black" style={publi.icon} />
          <Text style={publi.text}>Adicionar foto</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nome</Text>
        <TextInput activeUnderlineColor="hotpink" label="Nome" value={name} onChangeText={setName} />

        { }
        <View style={styles.inlineContainer}>
          <View style={styles.inlineItem}>
            <Text style={styles.label}>Idade</Text>
            <Picker
              selectedValue={selectedAge}
              onValueChange={(itemValue) => setSelectedAge(itemValue)}
              style={styles.picker}
            >
              {generateAgeOptions().map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.label}>Sexo</Text>
            <Picker
              selectedValue={selectedSex}
              onValueChange={(itemValue) => setSelectedSex(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Fêmea" value="Fêmea" />
              <Picker.Item label="Macho" value="Macho" />
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Especie</Text>
        <TextInput activeUnderlineColor="hotpink" label="Espécie" value={especie} onChangeText={setEspecie} />
        <Text activeUnderlineColor="hotpink" style={styles.label}>Raça</Text>
        <TextInput activeUnderlineColor="hotpink" label="Raça" value={raca} onChangeText={setRaca} />
        <Text activeUnderlineColor="hotpink" style={styles.label}>Contato</Text>
        <TextInput activeUnderlineColor="hotpink" label="Contato" value={contato} onChangeText={setContato} />
        <Text style={styles.desc}>Descrição</Text>
        { }
        <TextInput
          activeUnderlineColor="hotpink"
          label="Adicione uma descrição..."
          multiline
          value={desc}
          onChangeText={setDesc}
          style={styles.descInput}
        />
        <Button style={styles.publicar} mode="contained" onPress={uploadImage} disabled={uploading} buttonColor="hotpink">Publicar</Button>
      </View>
    </View>
  );
}

const publi = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toque: {
    flexDirection: 'row',
    backgroundColor: "hotpink",
    borderRadius: 5,
    fontSize: 17,
    margin: 10,
    marginRight: 130,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8,
  },
  text: {
    fontSize: 13,
    marginRight: 8,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    width: 290,
    padding: 8,
  },
  publicar: {
    marginTop: 20,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inlineItem: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 19,
    marginBottom: 10,
    color: "hotpink",
  },
  desc: {
    fontSize: 19,
    marginBottom: 10,
    color: "hotpink",
  },
  picker: {
    height: 40,
    marginBottom: 16,
  },
  descInput: {
    height: 125,
    textAlignVertical: 'top',
  },
});