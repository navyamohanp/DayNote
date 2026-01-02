import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SvgImage from '../../utilities/svgIcons';
import styles from './styles';

export const VerificationHeader = ({ title, onPress }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.Header, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <SvgImage icon={'back'} height={18} width={18} />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};
