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

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "12 meses", value: "12m" },
    { label: "11 meses", value: "11m" },
    { label: "10 meses", value: "10m" },
    { label: "9 meses", value: "9m" },
    { label: "8 meses", value: "8m" },
    { label: "7 meses", value: "7m" },
    { label: "6 meses", value: "6m" },
    { label: "5 meses", value: "5m" },
    { label: "4 meses", value: "4m" },
    { label: "3 meses", value: "3m" },
    { label: "2 meses", value: "2m" },
    { label: "1 mês", value: "1m" },
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
        open2={open2}
        value2={value2}
        items2={items2}
        setOpen2={setOpen2}
        setValue2={setValue2}
        setItems2={setItems2}
        placeholder={'Idade'}
      />

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
