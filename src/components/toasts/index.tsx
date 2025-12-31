import {
  Text,
  DeviceEventEmitter,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  SHOW_TOAST_MESSAGE,
  TOAST_ERROR,
  TOAST_NOTIFICATION,
  TOAST_SUCCESS,
  TOAST_WARNING,
} from '../../themes/toasts';
import {styles} from './styles';
import {ToastProps, ToastTypes} from '../helpers/toastHelper';
import SvgImage, {IconsType} from '../../utilities/svgIcons';
import {heightRatio, widthRatio} from '../../utilities/dimensions';
import {colors} from '../../themes';

const Toast = () => {
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<ToastTypes>('Notification');
  const [timeoutMilliSec, setTimeoutMilliSec] = useState(1500);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return Animated.timing(opacity, {
      toValue: timeoutMilliSec / 25,
      useNativeDriver: true,
    }).start();
  }, [opacity, timeoutMilliSec]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
        setMessageType('Notification');
        setTimeoutMilliSec(1500);
      }, timeoutMilliSec);
    }
  }, [message]);

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  });

  const onClose = () => {
    setMessage('');
    setTimeoutMilliSec(1500);
    setMessageType('Notification');
  };

  const findIcon = (type: ToastTypes): IconsType => {
    switch (type) {
      case TOAST_ERROR:
        return 'toastErrorIcon';

      case TOAST_WARNING:
        return 'toastWarningIcon';

      case TOAST_SUCCESS:
        return 'toastSuccessIcon';

      case TOAST_NOTIFICATION:
        return 'toastNotificationIcon';

      default:
        return 'toastNotificationIcon';
    }
  };

  const findColor = (type: ToastTypes): string => {
    switch (type) {
      case TOAST_ERROR:
        return colors.redD84A49;

      case TOAST_WARNING:
        return colors.yellowE7C355;

      case TOAST_SUCCESS:
        return colors.green5BC2A4;

      case TOAST_NOTIFICATION:
        return colors.blue73AFC8;

      default:
        return colors.blue73AFC8;
    }
  };

  const onNewToast = (data: ToastProps) => {
    setMessage(data.message);
    setMessageType(data.type);
    if (data.timeoutMilliSec) {
      setTimeoutMilliSec(data.timeoutMilliSec);
    }
  };

  if (!message) {
    return null;
  } else {
    return (
      <Animated.View
        style={[
          styles.containerStyle,
          {
            backgroundColor: findColor(messageType),
            paddingLeft:
              messageType === TOAST_WARNING ? 12 * widthRatio : 15 * widthRatio,
            paddingTop:
              messageType === TOAST_WARNING
                ? 13 * heightRatio
                : 18 * heightRatio,
            opacity: opacity,
          },
        ]}>
        <View style={styles.containerLeftStyle}>
          <SvgImage
            icon={findIcon(messageType)}
            height={
              messageType === TOAST_WARNING ? 28 * widthRatio : 22 * widthRatio
            }
            width={
              messageType === TOAST_WARNING ? 28 * widthRatio : 22 * widthRatio
            }
          />
          <Text
            style={[
              styles.textStyle,
              {
                marginLeft:
                  messageType === TOAST_WARNING
                    ? 8 * widthRatio
                    : 10 * widthRatio,
              },
            ]}>
            {message}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}>
          <SvgImage
            icon={'closeWhite'}
            height={22 * widthRatio}
            width={22 * widthRatio}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
};

export default Toast;
