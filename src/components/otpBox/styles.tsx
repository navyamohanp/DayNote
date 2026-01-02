import { StyleSheet } from 'react-native';
import { colors, font } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    //flex: 1,
    alignItems: 'center',
    //backgroundColor:'pink',
    height: 52,
  },
  input: {
    width: 40,
    height: 52,
    color: colors.black,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 8,
    fontFamily: font.nunitoSemiBold,
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    // alignItems:'center',
    borderBottomWidth: 0.5,
    marginHorizontal: 6,
    //backgroundColor:'blue'
  },
});
