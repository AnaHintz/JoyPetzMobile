import { useState } from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button } from 'react-native-paper';

export default function PublicarScreen({ navigation }) {

    const [image, setImage] = useState();

    function chooseImage() {
        const options = {
            title: 'Selecionar imagem',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
    };

    ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
            console.log('Usuário cancelou a seleção de imagem');
        } else if (response.error) {
            console.log('Erro ao selecionar a imagem:', response.error);
        } else {
            // Atualiza o estado da imagem com a imagem selecionada
            setImage(response.uri);
        }
    });
    
    return (
        <View>
            <Text>Olá sou a PScreen</Text>
            <Button title="Escolher imagem" onPress={chooseImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
        </View>
    );
};



