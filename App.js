import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true);
      const req = await fetch("https://api.b7web.com.br/cinema/");
      const json = await req.json();

      if (json) {
        setMovies(json);
      }

      setLoading(false);

    }

    requestMovies();

  }, [])


  return (
    <View style={styles.container}>
      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size='large' color="#ffffff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }
      {!loading &&
        <>
          <Text style={styles.totalMoviesText}>Total de filmes: {movies.length}</Text>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <Text style={styles.movieTitle}>{item.titulo}</Text>
                <Image source={{ uri: item.avatar }}
                  style={styles.movieImage}
                  resizeMode="contain"
                />

              </View>

            )}
            keyExtractor={item => item.titulo}
          />
        </>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  totalMoviesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  list: {
    flex: 1
  },
  movieItem: {
    marginBottom: 30,
  },
  movieImage: {
    height: 400
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff'
  }

});

export default App;

