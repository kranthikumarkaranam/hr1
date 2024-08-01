import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';

interface ImageSource {
  uri: string;
}

interface ImageItem {
  source: ImageSource;
}

interface MyGalleryProps {
  data: ImageItem[];
}

const MyGallery = ({data}: MyGalleryProps) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.galleryContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        {data.map((item, index) => {
          return (
            <Image
              key={index}
              source={item.source}
              style={[styles.image, {width: screenWidth}]}
              resizeMode="contain"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flexDirection: 'row',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
  },
});

export default MyGallery;
