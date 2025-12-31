import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ViewStyle,
} from 'react-native';
import { colors, font, fontSize } from '../../themes';
import SvgImage from '../../utilities/svgIcons';
import styles from './style';

interface DropdownProps {
  options: { label: string; value: string | number }[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  half?: boolean;
  placeholder?: string;
  label?: string;
  maxHeight?: number;
  style?: ViewStyle;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  half,
  placeholder,
  label,
  maxHeight = 200,
  style,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setOpen(false);
  };

  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: -10,
    fontSize: 12,
    color: colors.labelGray,
    backgroundColor: colors.white,
    paddingHorizontal: 4,
    zIndex: 1,
  };

  return (
    <View style={[styles.margin, style]}>
      {label && <Text style={labelStyle as any}>{label}</Text>}
      <TouchableOpacity
        style={[styles.dropdownContainer, half && { marginHorizontal: 0 }]}
        onPress={() => {
          setOpen(prev => !prev);
        }}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.text,
            {
              color: options.find(option => option.value === selectedValue)
                ? colors.black
                : colors.placeHolder,
            },
          ]}
        >
          {options.find(option => option.value === selectedValue)?.label ||
            placeholder ||
            'Select'}
        </Text>
        <View style={styles.icon}>
          <SvgImage
            icon={'downArrow'}
            height={18}
            width={18}
            strokeColor={colors.gray}
          />
        </View>
      </TouchableOpacity>

      {open && (
        <View
          style={[
            styles.modalContainer,
            half && { marginHorizontal: 0 },
            { maxHeight: maxHeight },
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={item => item.value.toString()}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
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

export default Dropdown;
