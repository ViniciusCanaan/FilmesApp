import React, {useState, useEffect} from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';

const App = () =>{

  const [movies, setMovies] = useState([]);

  const handleLoadButton = async() =>{
    const req = await fetch("https://api.b7web.com.br/cinema/");
    const json = await req.json();

    if(json){
      setMovies(json);
    }
    
  }

 return (
   <View>
     <Button title="Carregar filmes" onPress={handleLoadButton}/>
     <Text>Total de filmes: {movies.length}</Text>
     <FlatList
      data={movies}
      renderItem={({item})=>(
       <View>
         <Text>{item.titulo}</Text>
         <Image source={{uri: item.avatar}} style={{width:200, height:200}} />
         
       </View>
        
      )}
      keyExtractor={item => item.titulo}
     />
   </View>
  );
}

export default App;

