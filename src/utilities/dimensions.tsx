import {Dimensions} from 'react-native';
const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

export const Dimension = {
  width: dWidth,
  height: dHeight,
};

export const heightRatio = dHeight / 812;
export const widthRatio = dWidth / 390;

export const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  buttonRadius: 8,
  buttonRadius28: 28,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
};
