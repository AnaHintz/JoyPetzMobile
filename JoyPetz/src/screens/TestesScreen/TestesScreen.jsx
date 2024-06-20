import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AgePicker = () => {
  const [selectedAge, setSelectedAge] = useState('12 meses');

  const generateAgeOptions = () => {
    const options = [];
    for (let i = 12; i <= 120; i++) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a idade:</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: 250,
  },
});

export default AgePicker;
