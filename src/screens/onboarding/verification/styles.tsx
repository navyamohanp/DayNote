import { Platform, StatusBar, StyleSheet } from 'react-native';
import colors from '../../../themes/colors';
import { font } from '../../../themes';
import { fontSize } from '../../../themes';
import { heightRatio } from '../../../utilities/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },

  titleContainer: {
    //backgroundColor: 'pink',
    height: 'auto',

    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 20,
  },
  verificationTitleText: {
    fontSize: fontSize.average,
    color: colors.black,
    fontFamily: font.nunitoRegular,
    textAlign: 'center',
  },
  otpContainer: {
    marginTop: 10,

    height: 60,
    paddingHorizontal: 20,
  },
  resendOtpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12 * heightRatio,
    paddingHorizontal: 20,
  },
  didntreceiveCode: {
    fontSize: fontSize.average,
    color: colors.black,
    fontFamily: font.nunitoRegular,
  },
  resend: {
    color: colors.blue73AFC8,
    marginLeft: 3,
    fontFamily: font.nunitoRegular,
    fontSize: fontSize.average,
  },
  invalidOtpText: {
    fontSize: fontSize.average,
    color: colors.redD84A49,
    marginBottom: 6,
    fontFamily: font.nunitoRegular,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: fontSize.veryLarge,
    color: colors.black,
    fontFamily: font.nunitoBold,
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  lockImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  lockImage: {
    width: 150,
    height: 150,
  },
});
export default styles;
