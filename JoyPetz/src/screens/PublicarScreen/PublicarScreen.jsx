import { View, StyleSheet, Text, Platform } from "react-native";
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
      const storageRef = ref(storage, `images/${Date.now()}-${name}-${selectedSex}
      -${selectedAge}-${especie}-${raca}-${contato}-${desc}.jpg`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "posts"), {
        imageUrl: downloadURL,
        caption: caption,
        createdAt: new Date(),
      });

      console.log("Upload realizado com sucesso:", downloadURL);
      setUploading(false);
      setImage(null);
      setContato("");
      setDesc("");
      setEspecie("");
      setName("");
      setRaca("");
      setSelectedAge("");
      setSelectedSex("");
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      setUploading(false);
    }
  };

  return (
    <View style={publi.container}>
      <TouchableOpacity style={publi.toque} onPress={pickImage}>
        <FontAwesome name="camera" size={24} color="black" />
        Adicionar foto
      </TouchableOpacity>
      
      <TextInput label="Nome" value={name} onChangeText={setName} />

      <View style={styles.container}>
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
      <TextInput label="Espécie" value={especie} onChangeText={setEspecie} />
      <TextInput label="Raça" value={raca} onChangeText={setRaca} />
      <TextInput label="Contato" value={contato} onChangeText={setContato} />
      <TextInput label="Descrição" multiline value={desc} onChangeText={setDesc} />

      <Button onPress={uploadImage} disabled={uploading}>Publicar</Button>
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
    backgroundColor: "pink",
    borderRadius: 5,
    fontSize: 17,
    margin: 10,
    marginRight: 130,
  },
});

//style do sexo e idade
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: 220,
    marginBottom: 16,
  },
});

