import { View, StyleSheet } from "react-native";
import { Button, TextInput} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";


export default function PublicarScreen({ navigation }) {
  const [image, setImage] = useState();

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Macho", value: "macho" },
    { label: "Fêmea", value: "femea" },
  ]);

 
  function handleimage() {
    alert("Imagem enviada com sucesso!!");
  }
  return (
    <View style={publi.container}>
      <TouchableOpacity style={publi.toque} onPress={handleimage}>
        <MaterialIcons name="camera" size={24} color="black" />
        Adicionar foto
      </TouchableOpacity>
      <TextInput label="Nome" />

      

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Sexo'}
      />
      <TextInput label="Espécie" />
      <TextInput label="Raça" />
      <TextInput label="Contato" />
      <TextInput label="Descrição" multiline />
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
