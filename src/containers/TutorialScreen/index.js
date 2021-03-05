import React, {useRef, useState} from 'react';
import {Dimensions, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LOCAL_STORAGE_DATA_KEY} from '../../utils/constants';
import {
  deviceHeight,
  deviceWidth,
  RfH,
  RfW,
  storeData,
} from '../../utils/helpers';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CustomImage from '../../components/CustomImage';
import Colors from '../../theme/Colors';
import IconWrapper from '../../components/IconWrapper';
import Images from '../../theme/Images';
import CustomText from '../../components/CustomText';
import NavigationRouteNames from '../../routes/ScreenNames';

const CROUSEL_ITEMS = [
  require('../../assets/tutorialScreen/tutorial1.png'),
  require('../../assets/tutorialScreen/tutorial2.png'),
  require('../../assets/tutorialScreen/tutorial3.png'),
];
function TutorialScreen() {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);

  const crouselRef = useRef(null);

  const onDone = () => {
    storeData(LOCAL_STORAGE_DATA_KEY.TUTORIAL_SHOWN, JSON.stringify(true));
    // navigation.navigate(NavigationRouteNames.LOGIN);
  };

  const onSkip = () => {
    navigation.navigate(NavigationRouteNames.LOGIN);
  };

  const onNextHandler = () => {
    const slideNo = (activeSlide + 1) % CROUSEL_ITEMS.length;
    console.log('slideNo', slideNo);
    setActiveSlide(slideNo);
    crouselRef.current.snapToItem(slideNo);
  };

  const renderCardItem = (item) => (
    <View
      style={{
        width: deviceWidth(),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CustomImage
        image={item}
        imageWidth={deviceWidth()}
        imageHeight={deviceHeight()}
        imageResizeMode={'contain'}
      />
    </View>
  );

  const pagination = () => (
    <Pagination
      dotsLength={CROUSEL_ITEMS.length}
      activeDotIndex={activeSlide}
      containerStyle={{
        position: 'absolute',
        bottom: RfH(15),
        alignSelf: 'center',
      }}
      dotStyle={{
        width: RfH(10),
        height: RfH(10),
        borderRadius: RfH(5),
        marginHorizontal: RfW(1),
        backgroundColor: '#aeaeae',
      }}
      inactiveDotStyle={{
        width: RfH(10),
        height: RfH(10),
        borderRadius: RfH(5),
        marginHorizontal: RfW(1),
        backgroundColor: '#ebebeb',
        // Define styles for inactive dots here
      }}
      inactiveDotOpacity={1}
      inactiveDotScale={1}
    />
  );

  return (
    <SafeAreaView style={{backgroundColor: Colors.white}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: RfH(60),
          right: RfW(30),
          zIndex: 999,
        }}
        onPress={onSkip}>
        <CustomText fontSize={17}>Skip</CustomText>
      </TouchableOpacity>
      <Carousel
        layout={'default'}
        ref={crouselRef}
        data={CROUSEL_ITEMS}
        renderItem={({item, index}) => renderCardItem(item, index)}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={deviceWidth()}
        onSnapToItem={(index) => setActiveSlide(index)}
        autoplay={false}
        snapToItem={activeSlide}
        // autoplayDelay={1000}
        // autoplayInterval={5000}
        loop={false}
      />
      {pagination()}
      <TouchableOpacity
        onPress={
          activeSlide < CROUSEL_ITEMS.length - 1 ? onNextHandler : onSkip
        }
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: RfH(25),
          right: RfW(20),
          alignItems: 'center',
        }}>
        <View>
          <CustomText fontSize={17} fontWeight={'500'}>
            {activeSlide < CROUSEL_ITEMS.length - 1 ? 'Next' : 'Log in'}
          </CustomText>
        </View>
        <IconWrapper
          iconWidth={RfW(42)}
          iconHeight={RfH(42)}
          iconImage={Images.arrowRight}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default TutorialScreen;
