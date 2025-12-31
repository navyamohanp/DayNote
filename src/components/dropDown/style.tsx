import {StyleSheet} from 'react-native';
import {colors, font, fontSize} from '../../themes';
import {Dimension, heightRatio, widthRatio} from '../../utilities/dimensions';

export default StyleSheet.create({
  container: {
    marginTop: 2,
    borderRadius: 5,
    paddingBottom: 15,
    //paddingHorizontal: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: font.regular,
    fontSize: fontSize.average,
    color: colors.black,
    fontWeight: '500',
    flex: 1,
    backgroundColor: colors.white,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 15,
  },
  selectContainer: {
    paddingBottom: 0,
  },
  modalContent: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 8,
    // paddingBottom: 5,
    backgroundColor: colors.white,
    alignSelf: 'center',
    //maxHeight: Dimension.height / 3,
    //height: undefined,
    // marginBottom: 20,
    //position:'absolute',
  },
  optionText: {
    padding: 10,
    fontFamily: font.regular,
    fontSize: fontSize.average,
    color: colors.black,
    fontWeight: '500',
  },
  value: {
    fontFamily: font.regular,
    fontSize: fontSize.average,
    color: colors.black,
    fontWeight: '500',
  },
  placeholderText: {
    fontFamily: font.regular,
    fontSize: fontSize.average,
    color: colors.placeholderTxt,
    fontWeight: '500',
  },
  inputErrorText: {
    fontFamily: font.light,
    fontSize: fontSize.small,
    color: colors.errorTxtFC3E3E,
    marginTop: 6 * heightRatio,
  },
});
