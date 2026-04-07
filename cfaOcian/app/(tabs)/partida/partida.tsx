import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Header } from '@/src/components/Header';
import { styles } from './partidaStyles'; 
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/theme/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HistoricoPartidas } from '@/src/components/HistoricoPartidas';
import { useRouter } from 'expo-router';

export default function Partida() {

const router = useRouter();
const organizarPartidas = () => {
    router.push('../organizarPartidas/organizarPartidas')
}


  const renderMain = () => (
    <View style={styles.headerGeral}>
      <TouchableOpacity activeOpacity={0.85} onPress={organizarPartidas}>
        <LinearGradient
          colors={['#0E78FF', '#2C88FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.novaPartidaCard}>
          <View style={styles.containerCard}>
            <View style={styles.bgIcon}>
              <MaterialIcons name="add-circle" size={40} color="white" style={styles.icon}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.txtSecondary}>NOVA JORNADA</Text>
              <Text style={styles.txtPrimary}>AGENDAR PARTIDA</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={36} color={colors.secondary} />
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.textsResultados}>
        <Text style={styles.txtResultados}>RESULTADOS RECENTES</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.txtVerTudo}>VER TUDO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProximasPartidas = () => (
    <View style={styles.footerGeral}>
      <Text style={styles.txtResultados}>PRÓXIMOS JOGOS</Text>

      <FlatList 
        horizontal
        data={[...Array(5)]}
        contentContainerStyle={{flexDirection: 'row', gap: 20, marginBottom: 14, paddingRight: 6}}
        decelerationRate="fast"
        snapToInterval={160 + 16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ index }) => (
        <View style={styles.cardProximasPartidas}>

          <View style={styles.topCard}>
            <Image source={require('@/assets/images/SóPreto.png')} style={styles.img}/>
            <Text style={styles.txtTime}>RESENHA FC</Text>
          </View>

          <View style={styles.hr}/>

          <View style={styles.bottomCard}>
            <Text style={styles.txtData}>24 MAR</Text>
            <Text style={styles.txtHorario}>19:30</Text>
          </View>

        </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="PARTIDAS" 
        iconName="bell" 
        showLogo={false}
        icon='soccer'
      />
      
      <FlatList 
        data={[...Array(3)]}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={renderMain}
        ListFooterComponent={renderProximasPartidas}
        renderItem={({ index }) => (<HistoricoPartidas />)}
      />
    </View>
  );
}