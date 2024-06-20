import { View, StyleSheet, Platform } from "react-native";
import { Button, TextInput} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from "react-native-dropdown-picker";
import storage from '@react-native-firebase/storage';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PublicarScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [uploading, setUploading] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Macho", value: "macho" },
    { label: "Fêmea", value: "femea" },
  ]);
  const [name, setName] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [contato, setContato] = useState("");
  const [desc, setDesc] = useState("");

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
      const storageRef = ref(storage, `images/${Date.now()}-${name}-${value}
      -${idade}-${especie}-${raca}-${contato}-${desc}.jpg`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("Upload realizado com sucesso:", downloadURL);
      setUploading(false);
      setImage(null);
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      setUploading(false);
    }
  };

  return (
    <View style={publi.container}>
      <TouchableOpacity style={publi.toque} onPress={pickImage}>
        <MaterialIcons name="camera" size={24} color="black" />
        Adicionar foto
      </TouchableOpacity>
      <TextInput label="Nome" value={name} onChangeText={setName}/>

      

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Sexo'}
      />
      <TextInput label="Espécie" value={especie} onChangeText={setEspecie}/>
      <TextInput label="Raça" value={raca} onChangeText={setRaca}/>
      <TextInput label="Contato" value={contato} onChangeText={setContato}/>
      <TextInput label="Descrição" multiline value={desc} onChangeText={setDesc}/>
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
