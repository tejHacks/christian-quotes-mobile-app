// App.tsx

import "./global.css";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { useFonts } from "expo-font";
import Svg, { Path, Circle, Polyline } from "react-native-svg";
import QuoteCard from "./src/components/QuoteCard";
import { quotes } from "./src/constants/quotes";

function CornerOrnament() {
  return (
    <Svg width={64} height={64} viewBox="0 0 60 60" fill="none">
      <Path d="M4 56 L4 4 L56 4" stroke="#d4a843" strokeWidth={1.5} />
      <Path d="M4 40 L4 4 L40 4" stroke="#d4a843" strokeWidth={0.5} />
      <Circle cx={4} cy={4} r={3} fill="#d4a843" />
    </Svg>
  );
}

function NavButton({
  onPress,
  direction,
}: {
  onPress: () => void;
  direction: "left" | "right";
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.navBtn}
      activeOpacity={0.7}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Polyline
          points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
          stroke="#8a6a28"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    "CinzelDecorative-Regular": require("./assets/fonts/CinzelDecorative-Regular.ttf"),
    "EBGaramond-Italic": require("./assets/fonts/EBGaramond-Italic.ttf"),
    "EBGaramond-Medium": require("./assets/fonts/EBGaramond-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  const animateAndGo = (dir: 1 | -1) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: dir * -40,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => (prev + dir + quotes.length) % quotes.length);
      slideAnim.setValue(dir * 40);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const quote = quotes[index];

  return (
    <View style={styles.app}>
      {/* Corner ornaments */}
      <View style={[styles.corner, styles.cornerTL]}>
        <CornerOrnament />
      </View>
      <View
        style={[
          styles.corner,
          styles.cornerTR,
          { transform: [{ scaleX: -1 }] },
        ]}
      >
        <CornerOrnament />
      </View>
      <View
        style={[
          styles.corner,
          styles.cornerBL,
          { transform: [{ scaleY: -1 }] },
        ]}
      >
        <CornerOrnament />
      </View>
      <View
        style={[
          styles.corner,
          styles.cornerBR,
          { transform: [{ scaleX: -1 }, { scaleY: -1 }] },
        ]}
      >
        <CornerOrnament />
      </View>

      {/* Title */}
      <Text style={styles.appTitle}>Bible Quotes</Text>

      {/* Gold divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLineLeft} />
        <View style={styles.diamond} />
        <View style={styles.dividerLineRight} />
      </View>

      {/* Animated card */}
      <Animated.View
        style={[
          styles.cardWrap,
          { transform: [{ translateX: slideAnim }], opacity: opacityAnim },
        ]}
      >
        <QuoteCard
          text={quote.text}
          author={quote.author}
          onNext={() => animateAndGo(1)}
          onPrev={() => animateAndGo(-1)}
        />
      </Animated.View>

      {/* Nav row */}
      <View style={styles.navRow}>
        <NavButton direction="left" onPress={() => animateAndGo(-1)} />
        <View style={styles.dotsRow}>
          {quotes.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <NavButton direction="right" onPress={() => animateAndGo(1)} />
      </View>

      {/* Swipe hint */}
      <Text style={styles.hint}>Swipe or use arrows to navigate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#1e1610",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 64,
    height: 64,
    opacity: 0.3,
  },
  cornerTL: { top: 16, left: 16 },
  cornerTR: { top: 16, right: 16 },
  cornerBL: { bottom: 16, left: 16 },
  cornerBR: { bottom: 16, right: 16 },
  appTitle: {
    fontFamily: "CinzelDecorative-Regular",
    fontSize: 13,
    letterSpacing: 5,
    color: "#8a6a28",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    marginBottom: 32,
    gap: 10,
  },
  dividerLineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: "#8a6a28",
    opacity: 0.5,
  },
  dividerLineRight: {
    flex: 1,
    height: 1,
    backgroundColor: "#8a6a28",
    opacity: 0.5,
  },
  diamond: {
    width: 6,
    height: 6,
    backgroundColor: "#8a6a28",
    transform: [{ rotate: "45deg" }],
    opacity: 0.7,
  },
  cardWrap: {
    width: "100%",
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    gap: 20,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(212,168,67,0.25)",
    backgroundColor: "rgba(212,168,67,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#8a6a28",
    opacity: 0.35,
  },
  dotActive: {
    opacity: 1,
    backgroundColor: "#d4a843",
    transform: [{ scale: 1.4 }],
  },
  hint: {
    fontFamily: "EBGaramond-Italic",
    fontStyle: "italic",
    fontSize: 12,
    color: "#8a6a28",
    marginTop: 16,
    opacity: 0.6,
    letterSpacing: 0.5,
  },
});
