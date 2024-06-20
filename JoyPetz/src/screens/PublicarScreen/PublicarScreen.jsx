import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";



export default function PublicarScreen({ navigation }) {
  const [image, setImage] = useState();

    const [selectedAge, setSelectedAge] = useState('2 meses');
    const [selectedSex, setSelectedSex] = useState('Fêmea');
  
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



  
 
  function handleimage() {
    alert("Imagem enviada com sucesso!!");
  }
  return (
    <View style={publi.container}>
      <TouchableOpacity style={publi.toque} onPress={handleimage}>
        <FontAwesome name="camera" size={24} color="black" />
        Adicionar foto
      </TouchableOpacity>

      <TextInput label="Digite o nome..." />

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
    
      <TextInput label="Digite a espécie..." />
      <TextInput label="Digite a raça..." />
      <TextInput label="Digite seu contato..." />
      <TextInput label="Digite a descrição..." multiline />
      <Button>Publicar</Button>
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

