import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const MultilineInput = ({ placeholder, limit, onChangeHandler }) => {
  const [text, setText] = useState('');

  const handleTextChange = (value) => {
    if (value.length <= limit) {
      setText(value);
      if (onChangeHandler) {
        onChangeHandler(value);
      }
    }
  };

  return (
    <View>
      <TextInput
        multiline={true}
        placeholder={placeholder}
        value={text}
        onChangeText={handleTextChange}
        style={styles.input}
      />
      <Text style={styles.characterLimit}>{limit - text.length} characters remaining</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 120,
    borderColor: '#999',
    padding: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 10,
  },
  characterLimit: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});

export default MultilineInput;
