import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native'
import { Header } from '@/src/components/Header'
import { styles } from './organizarPartidasStyles'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/src/theme/colors'

export default function organizarPartidas() {
    const router = useRouter();
    const [modalVisivel, setModalVisivel] = useState(false);
    const [categoria, setCategoria] = useState('Categoria');

    const CATEGORIAS = ['SUB 12', 'SUB 18', 'SUB 20'];

    const voltar = () => {
        router.back();
    }

    return (
        <View style={styles.container}>
            <Header
                title="ORGANIZAR PARTIDAS"
                iconName="bell"
                showLogo={false}
                icon='arrow-left'
                onPressIcon={voltar}
            />

            <View style={styles.content}>
                <View>
                  <Text style={styles.textTitle}>COMPETIÇÃO</Text>

                  {/* CAMPO QUE ABRE O MODAL */}
                  <TouchableOpacity
                      style={styles.inputContainer}
                      onPress={() => setModalVisivel(true)}
                      activeOpacity={0.7}
                  >
                      <View style={styles.inputContent}>
                          <MaterialCommunityIcons name="trophy" size={24} color={colors.azulClaro} />
                          <Text style={[styles.inputText, categoria !== 'Categoria' && { color: '#FFF' }]}>
                              {categoria}
                          </Text>
                      </View>
                      <MaterialCommunityIcons name="chevron-down" size={24} color={colors.text} />
                  </TouchableOpacity>

                  {/* MODAL DE SELEÇÃO */}
                  <Modal
                      visible={modalVisivel}
                      transparent
                      animationType="fade"
                      onRequestClose={() => setModalVisivel(false)}
                  >
                      <Pressable style={styles.overlay} onPress={() => setModalVisivel(false)}>
                          <View style={styles.modalCard}>
                              <FlatList
                                  data={CATEGORIAS}
                                  keyExtractor={(item) => item}
                                  renderItem={({ item }) => (
                                      <TouchableOpacity
                                          style={styles.opcao}
                                          onPress={() => {
                                              setCategoria(item);
                                              setModalVisivel(false);
                                          }}
                                      >
                                          <Text style={styles.opcaoText}>{item}</Text>
                                      </TouchableOpacity>
                                  )}
                              />
                          </View>
                      </Pressable>
                  </Modal>
                </View>
                
                <View>
                  <Text style={styles.textTitle}>CONFRONTO</Text>

                  <View>
                    <Text>MANDANTE</Text>
                    <Text>Selecione o time</Text>
                  </View>
                </View>
            </View>
        </View>
    )
}