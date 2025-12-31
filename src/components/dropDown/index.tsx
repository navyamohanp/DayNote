/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {colors, font, fontSize} from '../../themes';
import SvgImage from '../../utilities/svgIcons';

interface DropdownProps {
  options: {label: string; value: string | number}[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  half?: boolean;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  half,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setOpen(false);
  };

  return (
    <View style={styles.margin}>
      <TouchableOpacity
        style={[styles.dropdownContainer, half && {marginHorizontal: 0}]}
        onPress={() => {
          setOpen(prev => !prev);
        }}>
        <Text allowFontScaling={false} style={styles.text}>
          {options.find(option => option.value === selectedValue)?.label ||
            placeholder ||
            'Select'}
        </Text>
        <View style={styles.icon}>
          <SvgImage icon={'dropdown'} height={24} width={24} />
        </View>
      </TouchableOpacity>

      {open && (
        <View style={[styles.modalContainer, half && {marginHorizontal: 0}]}>
          <FlatList
            data={options}
            keyExtractor={item => item.value.toString()}
            scrollEnabled={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}>
                <Text allowFontScaling={false} style={styles.optionText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 44,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    gap: 10,
    borderColor: colors.gray,
    color: colors.secondary,
    alignItems: 'center',
    fontSize: fontSize.average,
    fontFamily: font.nunitoRegular,
  },

  modalContainer: {
    backgroundColor: colors.white,
    borderWidth: 0.4,
    borderColor: colors.lightgray,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  text: {fontSize: fontSize.average, fontFamily: font.nunitoRegular},
  icon: {position: 'absolute', right: 10},
  option: {
    paddingVertical: 10,
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 0.4,
  },
  optionText: {
    fontSize: fontSize.average,
    color: colors.secondary,
    fontFamily: font.nunitoRegular,
  },
  margin: {marginBottom: 13, width: '100%'},
});

export default Dropdown;
