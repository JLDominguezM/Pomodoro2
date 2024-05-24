import { Image, StyleSheet, Platform, Button, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import {Audio} from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function HomeScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("Normal" || "Short" || "Long");
  const [initialTime, setInitialTime] = useState(25 * 60 || 5 * 60 || 15 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time - 1));
      }, 0.1);
    } else {
      clearInterval(interval);
    }

    /* if (currentTime === "Normal" && time === 0) {
      setIsActive(false);
      setIsRunning(prev => !prev);
      setTime(isRunning ? 300 : 1500);
      setCurrentTime("Normal");
    }
    if (currentTime === "Short" && time === 0) {
      setIsActive(false);
      setIsRunning(prev => !prev);
      setTime(isRunning ? 300 : 1500);
      setCurrentTime("Short");
    }
    if (currentTime === "Long" && time === 0) {
      setIsActive(false);
      setIsRunning(prev => !prev);
      setTime(isRunning ? 300 : 15*60);
      setCurrentTime("Long");
    } */

    if (time === 0) {
      setIsActive(false);
      setIsRunning(prev => !prev);
      if (currentTime === "Normal") {
        setTime(25 * 60);	
      } else if (currentTime === "Short") {
        setTime(5 * 60);
      } else {
        setTime(15 * 60);
      }
    }

    return () => clearInterval(interval);
    
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/click.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView style = {[
        styles.container, 
        {backgroundColor: colors[currentTime] 
      }]}
    >
      <View style={{ 
        flex: 1,
        paddingHorizontal:15, 
        paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time}/>

        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{color: "white", fontWeight: "bold"}}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        
      </View> 

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30, 
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 20,
  }
});
