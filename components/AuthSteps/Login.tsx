import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { InputField } from "../FormField";
import { useAuth } from "../../context/AuthContext";

type Props = {
  setCurrentScreen: React.Dispatch<React.SetStateAction<number>>;
};

const Login = ({ setCurrentScreen }: Props) => {
  const [password, setPassword] = useState("");

  const { signin, createAnEOA } = useAuth();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="items-center mt-[87px] space-y-[24px]">
        <View className="items-center space-y-[16px]">
          <Text className="text-[24px] font-bold text-[#fff]">
            Log In to your account
          </Text>
          <Text className="text-[14px] font-semibold text-[#fff] text-center">
            Back to the world of Blockchain.
          </Text>
        </View>

        {/** form section */}
        <View className="">
          
          <InputField
            label="Password"
            value={password}
            placeholder="*********"
            onChange={setPassword}
            name=""
          />
        </View>

        <View className="space-y-[8px] pt-[216px]">
          <TouchableOpacity
            className="py-[16px] px-[40px] items-center bg-[#4169E1] rounded-[40px]"
          >
            <Text className="text-[14px] font-bold text-[#fff]">Log In</Text>
          </TouchableOpacity>
          <Text className="text-[14px] text-[#fff] font-bold text-center">
            Don’t have an account?{" "}
            <Text
              onPress={() => setCurrentScreen(0)}
              className="text-[#4169E1]"
            >
              Sign up{" "}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
