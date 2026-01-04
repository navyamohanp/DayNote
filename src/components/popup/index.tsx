import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import SvgImage from '../../utilities/svgIcons';
import { widthRatio } from '../../utilities/dimensions';
import strings from '../../utilities/strings';
import Modal from 'react-native-modal';

interface PopupProps {
  visible: boolean;
  icon?: string;
  title: string;
  titleColor: string;
  message: string;
  buttonColor?: string;
  loading?: boolean;
  optionalMessage1?: string;
  optionalMessage2?: string;
  optionalMessage3?: string;
  message2?: string;
  message3?: string;
  message4?: string;
  buttons: {
    text: string;
    onPress: () => void;
    style?: 'primary' | 'secondary';
  }[];
  onClose?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  visible,
  icon,
  title,
  titleColor,
  buttonColor,
  message,
  buttons,
  optionalMessage1,
  optionalMessage2,
  optionalMessage3,
  loading,
  onClose,
  message2,
  message3,
  message4,
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  // Reset button disabled state when popup becomes visible
  useEffect(() => {
    if (visible) {
      setButtonsDisabled(false);
    }
  }, [visible]);

  const handleButtonPress = (onPress: () => void) => {
    if (!buttonsDisabled) {
      setButtonsDisabled(true);
      onPress();
    }
  };
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      renderToHardwareTextureAndroid={true}
      animationIn={'fadeIn'}
      useNativeDriver={true}
      animationOut={'fadeOut'}
      useNativeDriverForBackdrop={true}
      backdropTransitionOutTiming={1}
      //animationOutTiming={1000}
    >
      <View>
        <View style={styles.container}>
          {icon && (
            <SvgImage
              icon={icon}
              height={54 * widthRatio}
              width={54 * widthRatio}
              strokeColor={titleColor}
            />
          )}
          <Text
            allowFontScaling={false}
            style={[styles.title, { color: titleColor }]}
          >
            {title}
          </Text>
          <Text allowFontScaling={false} style={styles.message}>
            {message}
          </Text>
          {message2 && (
            <Text
              allowFontScaling={false}
              style={message3 ? styles.message : styles.message4}
            >
              {message2}
            </Text>
          )}
          {message3 && (
            <Text
              allowFontScaling={false}
              style={message4 ? styles.message : styles.message4}
            >
              {message3}
            </Text>
          )}
          {message4 && (
            <Text allowFontScaling={false} style={styles.message4}>
              {message4}
            </Text>
          )}

          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleButtonPress(button.onPress)}
                disabled={buttonsDisabled || loading}
                style={[
                  styles.button,
                  button.style === 'primary'
                    ? {
                        backgroundColor: buttonColor ? buttonColor : titleColor,
                      }
                    : styles.secondaryButton,
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.buttonText,
                    button.style === 'primary'
                      ? styles.primaryText
                      : styles.secondaryText,
                  ]}
                >
                  {button.text}
                </Text>
                {loading && index === 1 && (
                  <ActivityIndicator
                    style={styles.loader}
                    size="small"
                    color="#fff"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
