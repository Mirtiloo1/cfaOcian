import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './historicoPartidasStyles';

export function HistoricoPartidas() {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.colorBorder} />
      <View style={styles.matchCard}>
        <View style={styles.timeUm}>
          <View style={styles.escudoBackground}>
            <Image
              source={require('@/assets/images/SóPreto.png')}
              style={styles.escudoTime}
            />
          </View> 
          <Text style={styles.txtTimeUm} numberOfLines={2}>RESENHA FC</Text>
        </View>

        <View style={styles.placarContainer}>
          <Text style={styles.dataJogo}>25 MAR 2026</Text>
          <View style={styles.golsWrapper}>
            <View style={styles.golBox}>
              <Text style={styles.txtGol}>2</Text>
            </View>
            <Text style={styles.traco}>-</Text>
            <View style={styles.golBox}>
              <Text style={styles.txtGol}>1</Text>
            </View>
          </View>
        </View>

        <View style={styles.timeDois}>
          <View style={styles.escudoBackground}>
            <Image
              source={require('@/assets/images/SóPreto.png')}
              style={styles.escudoTime}
            />
          </View> 
          <Text style={styles.txtTimeDois} numberOfLines={2}>EMOÇÃO FC</Text>
        </View>
        
        <TouchableOpacity>
          <MaterialCommunityIcons name="chart-box-outline" size={30} color="#575757" style={styles.statsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}