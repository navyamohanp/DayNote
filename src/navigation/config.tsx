import colors from '../themes/colors';
// import { CardStyleInterpolators } from '@react-navigation/stack';

// Contains Common configurations for navigation
const navigationConfig = {
  headerStyle: {
    backgroundColor: colors.background,
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  animation: 'slide_from_right',
} as const;

export default navigationConfig;

export type RootStackParamList = {
  Home: undefined;
};
