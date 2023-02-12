import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import SearchIcon from '../../../assets/SearchIcon';

interface Props {
  onHandleInput: (input: string) => void;
}

const SearchBox = (props: Props) => {
  const [textInput, setTextInput] = useState('');

  const onChangeHandler = (input: string) => {
    setTextInput(input);
  };

  const submitSearch = () => {
    props.onHandleInput(textInput);
    setTextInput('');
  };

  return (
    <View style={styles.textContainer}>
      <TouchableOpacity onPress={submitSearch}>
        <SearchIcon />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Search Product..."
        value={textInput}
        onChangeText={onChangeHandler}
        onSubmitEditing={() => submitSearch()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderWidth: 1,
    color: '#434242',
    borderColor: '#F7F7F7',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    width: '90%',
    flexDirection: 'row',
  },
  textInput: {
    width: '80%',
  },
});

export default SearchBox;
