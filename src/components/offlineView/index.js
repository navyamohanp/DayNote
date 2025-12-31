import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  AppState,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styles from './style';

type Props = {
  image: any,
  title: string,
  subTitle: string,
};

type State = {
  isConnected: boolean,
  isInternetReachable: boolean,
};

export default class OfflineView extends Component<Props, State> {
  unsubscribe: any;
  internetCheckInterval: any;
  appStateSubscription: any;

  static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      isConnected: true,
      isInternetReachable: true,
    };
    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.handleConnectivityChange(
        state.isConnected,
        state.isInternetReachable,
      );
    });

    NetInfo.fetch().then(state => {
      this.handleConnectivityChange(
        state.isConnected,
        state.isInternetReachable,
      );
    });

    // Periodically check for internet connectivity
    //this.internetCheckInterval = setInterval(this.checkInternetAccess, 10000);
    // Check every 10 seconds

    // Listen for AppState changes
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    // if (this.internetCheckInterval) {
    //   clearInterval(this.internetCheckInterval);
    // }
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
    }
  }

  handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      setTimeout(() => {
        NetInfo.fetch().then(state => {
          this.handleConnectivityChange(
            state.isConnected,
            state.isInternetReachable,
          );
        });
        this.checkInternetAccess();
      }, 1000); // 1-second delay; adjust as needed
    }
  };

  handleConnectivityChange = (
    isConnected: boolean,
    isInternetReachable: boolean | null,
  ) => {
    const resolvedReachable =
      isInternetReachable === null ? true : isInternetReachable;

    const isOffline = !isConnected || !resolvedReachable;
    this.setState({
      isConnected,
      isInternetReachable: resolvedReachable,
    });
  };

  checkInternetAccess = async () => {
    try {
      const response = await fetch('https://www.google.com', { method: 'GET' });
      this.setState({ isInternetReachable: response.ok });
    } catch (error) {
      this.setState({ isInternetReachable: false });
    }
  };

  render() {
    const { image, title, subTitle } = this.props;
    const { isConnected, isInternetReachable } = this.state;

    // Ensure latest network status before rendering
    // NetInfo.fetch().then(state => {
    //   this.handleConnectivityChange(
    //     state.isConnected,
    //     state.isInternetReachable,
    //   );
    // });

    // const shouldShowOfflineView = !isConnected || !isInternetReachable;
    const shouldShowOfflineView =
      !isConnected || (!isInternetReachable && this.state.isConnected);

    return shouldShowOfflineView ? (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <Image source={image} style={styles.imgStyle} />
        <Text allowFontScaling={false} style={styles.textStyleTitle}>
          {title}
        </Text>
        <Text allowFontScaling={false} style={styles.textStyleSubTitle}>
          {subTitle}
        </Text>
        <TouchableOpacity
          style={styles.retryTextContainer}
          onPress={this.checkInternetAccess}
        >
          <Text allowFontScaling={false} style={styles.retryText}>
            {'Retry'}
          </Text>
        </TouchableOpacity>
      </View>
    ) : null;
  }
}
