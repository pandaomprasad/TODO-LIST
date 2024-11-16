import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import namesData from '../../assets/JSON/names.json'; // Import your JSON file

const DropdownExample = ({ onSelectName }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => onSelectName(value)} // Pass the selected name to the parent component
      items={namesData.names.map((name) => ({
        label: name,
        value: name,
      }))}
    />
  );
};

export default DropdownExample;
