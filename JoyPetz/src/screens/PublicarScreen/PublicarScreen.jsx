import { View, StyleSheet, Text, Platform, Image, Alert } from "react-native";
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

  const validateFields = () => {
    if (!name || !raca || !contato || !desc || !image) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  };

  const uploadImage = async () => {
    if (!validateFields()) {
      return;
    }

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
      setName("");
      setEspecie("");
      setRaca("");
      setContato("");
      setDesc("");
      setSelectedAge('2 meses');
      setSelectedSex('Fêmea');

      navigation.navigate('Home');

    } catch (error) {
      Alert.alert("Erro ao criar post:", error.message);
      setUploading(false);
    }
  };

  const formatarTelefone = (telefone) => {
    // Remove todos os caracteres que não são dígitos
    telefone = telefone.replace(/\D/g, "");

    // Formatação para (99) 99999-9999
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

    return telefone;
  }



  return (
    <View style={publi.container}>
      <View style={styles.container}>
        <TouchableOpacity style={publi.toque} onPress={pickImage}>
          <FontAwesome name="camera" size={21} color="white" style={publi.icon} />
          <Text style={publi.text}  >Adicionar foto</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nome</Text>
        <TextInput activeUnderlineColor="hotpink" placeholder="Digite o nome..." value={name} onChangeText={setName} />

        { }
        <View style={styles.inlineContainer}>
          <View style={styles.inlineItem}>
            <Text style={styles.label}>Idade</Text>
            <Picker
              selectedValue={selectedAge}
              onValueChange={(itemValue) => setSelectedAge(itemValue)}
              style={publi.pesq2}
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
              style={publi.pesq2}
            >
              <Picker.Item label="Fêmea" value="Fêmea" />
              <Picker.Item label="Macho" value="Macho" />
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Espécie</Text>
        <Picker
          selectedValue={especie}
          onValueChange={(itemValue) => setEspecie(itemValue)}
          style={publi.pesq2}
        >
          <Picker.Item label="" />
          <Picker.Item label="Cão" value="Cão" />
          <Picker.Item label="Gato" value="Gato" />
          <Picker.Item label="Pássaro" value="Pássaro" />
          <Picker.Item label="Roedor" value="Roedor" />
          <Picker.Item label="Aquático" value="Aquático" />
        </Picker>

        <Text activeUnderlineColor="hotpink" style={styles.label}>Raça</Text>
        <TextInput activeUnderlineColor="hotpink" placeholder="Digite a raça..." value={raca} onChangeText={setRaca} />
        <Text style={styles.label}>Contato</Text>
        <TextInput
          value={contato}
          onChangeText={(text) => setContato(formatarTelefone(text))}
          keyboardType="phone-pad" // Define o teclado para entrada de telefone
          placeholder="(DDD) Número de telefone"
          activeUnderlineColor="hotpink"  
          maxLength={15}
        />
        <Text style={styles.desc}>Descrição</Text>
        { }
        <TextInput
          activeUnderlineColor="hotpink"
          placeholder="Adicione uma descrição..."
          multiline
          value={desc}
          onChangeText={setDesc}
          style={styles.descInput}
        />
        <Button style={styles.publicar} mode="contained" onPress={uploadImage} disabled={uploading} buttonColor="hotpink" >Publicar</Button>
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
    color: "white",
    fontSize: 13,
    marginRight: 8,
  },
  pesq2: {
    height: 30,
    width: 120,
    marginLeft: 10,
    border: "1px solid hotpink",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black",
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