import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = ({ placeholder }) => {
  return (
    <View style={{ backgroundColor: 'green', padding: 10 }}>
      <TextInput
        style={{ height: 40, borderColor: 'white', borderWidth: 1, color: 'white' }}
        placeholder={placeholder}
        placeholderTextColor="white"
      />
    </View>
  );
};

export default SearchBar;
