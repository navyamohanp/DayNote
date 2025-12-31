import { StyleSheet } from 'react-native';
import { colors, font, fontSize } from '../../themes';

const styles = StyleSheet.create({
  dropdownContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 56,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    borderColor: colors.borderGray,
    color: colors.lightgray,
    alignItems: 'center',
    fontSize: fontSize.average,
    fontFamily: font.nunitoRegular,
  },

  modalContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGray,
    color: colors.lightgray,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 5,
    zIndex: 1000,
  },
  text: { fontSize: fontSize.average, fontFamily: font.nunitoRegular },
  icon: { position: 'absolute', right: 20 },
  option: {
    paddingVertical: 10,
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 0.4,
  },
  optionText: {
    fontSize: fontSize.average,
    color: colors.black,
    fontFamily: font.nunitoRegular,
  },
  margin: { marginBottom: 13, width: '100%' },
});

export default styles;
