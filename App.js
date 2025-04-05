
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [userPower, setUserPower] = useState(0);
  const [appPower, setAppPower] = useState(0);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let countdown;
    if (gameStarted && timer > 0) {
      countdown = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (gameStarted && timer === 0) {
      clearInterval(countdown);
      const randomAppPower = Math.floor(Math.random() * 100);
      setAppPower(randomAppPower);
      decideWinner(userPower, randomAppPower);
    }
    return () => clearInterval(countdown);
  }, [gameStarted, timer]);

  const decideWinner = (user, app) => {
    if (user > app) setResult("YOU REIGN SUPREME! 👑");
    else if (user < app) setResult("STREAM USURPED! Try again.");
    else setResult("IT'S A TIE! Both mighty streams!");
  };

  const handleTap = () => {
    if (gameStarted && timer > 0) setUserPower(p => p + 5);
  };

  const resetGame = () => {
    setGameStarted(false);
    setUserPower(0);
    setAppPower(0);
    setResult(null);
    setTimer(5);
  };

  if (!gameStarted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEF3C7' }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>Stream King 👑</Text>
        <TouchableOpacity onPress={() => setGameStarted(true)} style={{ backgroundColor: '#FACC15', padding: 16, borderRadius: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Enter the Throne Room</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DBEAFE', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Tap to Pee! 💦</Text>
      <Text style={{ marginBottom: 8 }}>Time Left: {timer}s</Text>

      <ProgressBar progress={userPower / 100} color="#FFD700" style={{ width: '100%', height: 20, marginBottom: 20 }} />

      <TouchableOpacity onPress={handleTap} style={{ backgroundColor: '#FDE68A', padding: 24, borderRadius: 9999, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>PEE!</Text>
      </TouchableOpacity>

      {result && (
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{result}</Text>
          <Text>Your Power: {userPower}</Text>
          <Text>App Power: {appPower}</Text>
          <TouchableOpacity onPress={resetGame} style={{ marginTop: 16, backgroundColor: '#4ADE80', padding: 12, borderRadius: 12 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
