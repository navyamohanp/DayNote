import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { colors } from '../../themes';
import SvgImage from '../../utilities/svgIcons';

interface BackIconProps {
  navigation?: any;
  title?: string;
  rightButton?: string;
  rightButtonPress?: Function;
  onBack?: Function;
  isdelete?: boolean;
}

export const Header = ({
  title,
  rightButton,
  navigation,
  rightButtonPress,
  onBack,
  isdelete,
}: BackIconProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            if (onBack) {
              onBack();
            } else if (navigation && navigation.pop) {
              navigation.pop();
            }
          }}
        >
          <SvgImage
            icon={'headerBack'}
            height={18}
            width={18}
            strokeColor={colors.secondary}
          />
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={[styles.headerText, isdelete && { width: 200 }]}
        >
          {title}
        </Text>
      </View>
      {rightButton ? (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => {
            if (rightButtonPress) {
              rightButtonPress();
            }
          }}
        >
          <SvgImage
            icon={isdelete ? 'delete' : 'headerAdd'}
            height={isdelete ? 24 : 16}
            width={isdelete ? 24 : 16}
            strokeColor={colors.primary}
            color={isdelete && colors.notificationRed}
          />
          <Text
            allowFontScaling={false}
            style={[
              styles.rightButtonText,
              isdelete && { color: colors.notificationRed },
            ]}
          >
            {rightButton}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
