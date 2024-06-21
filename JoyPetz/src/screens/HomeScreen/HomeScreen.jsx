import React, { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
 
export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
 
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
 
    return () => unsubscribe();
  }, []);
 
  return (
    <Surface style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text>{item.name}</Text>
            <Button>Ver mais</Button>
          </View>
        )}
      />
    </Surface>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
});