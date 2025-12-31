import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import SvgImage from '../../utilities/svgIcons';
import {widthRatio} from '../../utilities/dimensions';
import Modal from 'react-native-modal';

interface PopupProps {
  visible: boolean;
  icon?: string;
  title: string;
  titleColor: string;
  buttonColor?: string;
  loading?: boolean;
  loadingButton?: string | null;
  optionalMessage1?: string;
  optionalMessage2?: string;
  boldText?: string;
  buttons: {
    text: string;
    onPress: () => void;
    style?: 'primary' | 'secondary' | 'black';
  }[];
  onClose?: () => void;
}

const CelebratoryPopup: React.FC<PopupProps> = ({
  visible,
  icon,
  title,
  titleColor,
  buttonColor,
  buttons,
  optionalMessage1,
  optionalMessage2,
  boldText,
  loading,
  loadingButton,
  onClose,
}) => {
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
      backdropTransitionOutTiming={1}>
      <View>
        <View style={styles.container}>
          {icon && (
            <SvgImage
              icon={icon}
              height={54 * widthRatio}
              width={54 * widthRatio}
            />
          )}
          <Text
            allowFontScaling={false}
            style={[styles.title, {color: titleColor}]}>
            {title}
          </Text>
          <View style={styles.optionalMsgContainer}>
            <Text allowFontScaling={false} style={styles.message2}>
              {optionalMessage1}
              <Text allowFontScaling={false} style={styles.boldText}>
                {boldText}
              </Text>{' '}
              {optionalMessage2}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={button.onPress}
                style={[
                  styles.button,
                  button.style === 'primary'
                    ? {
                        backgroundColor: buttonColor ? buttonColor : titleColor,
                      }
                    : button.style === 'black'
                    ? styles.blackButton
                    : styles.secondaryButton,
                ]}
                disabled={loadingButton === button.text}>
                {loadingButton === button.text ? (
                  <ActivityIndicator
                    size="small"
                    color={button.style === 'black' ? '#fff' : '#000'}
                  />
                ) : (
                  <Text
                    style={[
                      styles.buttonText,
                      button.style !== 'secondary'
                        ? styles.primaryText
                        : styles.secondaryText,
                    ]}
                    allowFontScaling={false}>
                    {button.text}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CelebratoryPopup;
