import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SubscriptionHeatmap from "../components/profile/SubscriptionHeatmap";
import PaymentModal from "../components/PaymentModal";
import {
  _getAWalletNFT,
  _getUserBalance,
  _getUserFromLocalStorage,
  _getWalletAddress,
  _isWalletAnArtist,
} from "../constants/_helperFunctions";
import NFTs from "../components/NFTs";
import { useAuth } from "../context/AuthContext";

const profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [depositing, setDeposting] = useState(true);

  const { session } = useAuth();
  return (
    <ScrollView
      style={{ flex: 1, minHeight: "100%", marginBottom: 789 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 760, // Adjust padding as needed
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/19230155/pexels-photo-19230155/free-photo-of-a-little-boy-with-curly-hair-standing-outside.jpeg?auto=compress&cs=tinysrgb&w=300",
        }}
        className="h-[296px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#001F3F"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />
      </ImageBackground>
      <View
        style={{
          position: "absolute",
          top: 135,
          right: 0,
          left: 0,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
           John Doe
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#A8A8A8" }}>
            {`Welcome Back`}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              marginTop: 29,
              paddingHorizontal: 24,
              backgroundColor: "#4169E1",
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
              // width: "40%",
              borderRadius: 40,
            }}
            className="mx-auto"
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>
              DEPOSIT
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 9 }}>
          <NFTs />
        </View>
      </View>
      <PaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        depositing={depositing}
      />
    </ScrollView>
  );
};

export default profile;
