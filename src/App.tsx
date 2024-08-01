import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MyGallery from './components/MyGallery';

var img1 = {source: {uri: 'https://i.imgur.com/XP2BE7q.jpg'}};
var img2 = {source: {uri: 'https://i.imgur.com/5nltiUd.jpg'}};

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([img1, img2]);

  // Utility function to validate image URL
  const isValidImageUrl = async (url: string): Promise<boolean | undefined> => {
    try {
      const response = await fetch(url, {method: 'HEAD'});
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        return contentType ? contentType.startsWith('image/') : undefined;
      }
      return false;
    } catch {
      return undefined;
    }
  };

  const addImageHandler = async () => {
    if (imageUrl.trim() === '') {
      Alert.alert('Invalid URL', 'Please enter a valid URL.');
      return;
    }

    const isValid = await isValidImageUrl(imageUrl);

    if (isValid === undefined) {
      Alert.alert('Error', 'An error occurred while validating the image URL.');
      return;
    }

    if (!isValid) {
      Alert.alert('Invalid Image', 'The URL provided is not a valid image.');
      return;
    }

    const newImage = {source: {uri: imageUrl}};
    setImages([...images, newImage]);
    setImageUrl('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          placeholder="Enter url"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <Button title="ADD IMAGE" onPress={addImageHandler} />
      </View>
      <MyGallery data={images} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
