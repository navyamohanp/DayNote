import {StyleSheet} from 'react-native';
import {colors, font} from '../../themes';
import {fontSize} from '../../themes';

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  backButton: {
    //backgroundColor: 'blue',
    //padding: 5,
    //marginTop: 5,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.size24,
    //fontWeight: 'bold',
    color: colors.secondary,
    marginRight: 24,
    fontFamily: font.nunitoMedium,
    //backgroundColor: 'green',
  },
});
export default styles;
