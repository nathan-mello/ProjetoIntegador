import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  asset
} from 'react-360';

export default class front_vr extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <Image
          style={styles.logo}
          source={asset('logotopounitri.png')}
        />
        <View>
          <Text style={styles.greeting}>
            Antes de preencher leia:
          </Text>

          <Text>
            Por favor, preencha as informações ao lado e faça o upload dos seguintes arquivos:
          </Text>

          <View style={styles.greetingBox}>
            <Text>{`\u2022 RG ou CNH`}</Text>
            <Text>{`\u2022 Comprovante de endereço`}</Text>
            <Text>{`\u2022 Histórico de matérias cursadas`}</Text>
            <Text>{`\u2022 Histórico do Ensino Médio`}</Text>
          </View>

          <Text style={styles.obs}>
            Por favor, nomeie seu documento de RG ou CNH como "identidade.jpg"
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: '#1a316c',
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  logo: {
    marginTop: 30,
    marginBottom: 75,
    height: 108,
    width: 438
  },
  greetingBox: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  obs: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('front_vr', () => front_vr);
