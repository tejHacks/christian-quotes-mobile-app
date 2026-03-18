// src/components/QuoteCard.tsx

import { View, Text, PanResponder, StyleSheet } from "react-native";
import { useRef } from "react";
import Svg, { Path, Circle } from "react-native-svg";

type Props = {
  text: string;
  author: string;
  reference?: string;
  onNext: () => void;
  onPrev: () => void;
};

function CornerOrnament() {
  return (
    <Svg width={48} height={48} viewBox="0 0 60 60" fill="none">
      <Path d="M4 56 L4 4 L56 4" stroke="#d4a843" strokeWidth={1.5} />
      <Path d="M4 40 L4 4 L40 4" stroke="#d4a843" strokeWidth={0.5} />
      <Circle cx={4} cy={4} r={3} fill="#d4a843" />
    </Svg>
  );
}

export default function QuoteCard({
  text,
  author,
  reference,
  onNext,
  onPrev,
}: Props) {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50) onNext();
        if (gesture.dx > 50) onPrev();
      },
    }),
  ).current;

  return (
    <View {...panResponder.panHandlers} style={styles.card}>
      {/* Double border */}
      <View style={styles.borderOuter} pointerEvents="none" />
      <View style={styles.borderInner} pointerEvents="none" />

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

      <View style={styles.inner}>
        {/* Top ornament */}
        <Text style={styles.ornamentTop}>✦ ✦ ✦</Text>

        {/* Large decorative opening quote */}
        <Text style={styles.bigQuoteMark}>"</Text>

        {/* Quote text */}
        <Text style={styles.quoteText}>{text}</Text>

        {/* Mid divider */}
        <Text style={styles.ornamentMid}>— ✦ —</Text>

        {/* Author */}
        <Text style={styles.author}>{author}</Text>
        {reference && <Text style={styles.reference}>{reference}</Text>}

        {/* Bottom ornament */}
        <Text style={styles.ornamentBot}>· · ·</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#27190f",
    borderRadius: 4,
    position: "relative",
  },
  borderOuter: {
    position: "absolute",
    inset: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(212,168,67,0.3)",
  },
  borderInner: {
    position: "absolute",
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "rgba(212,168,67,0.15)",
  },
  corner: {
    position: "absolute",
    width: 48,
    height: 48,
    opacity: 0.35,
  },
  cornerTL: { top: 8, left: 8 },
  cornerTR: { top: 8, right: 8 },
  cornerBL: { bottom: 8, left: 8 },
  cornerBR: { bottom: 8, right: 8 },
  inner: {
    paddingHorizontal: 32,
    paddingVertical: 36,
  },
  bigQuoteMark: {
    position: "absolute",
    top: 24,
    left: 20,
    fontFamily: "CinzelDecorative-Regular",
    fontSize: 56,
    lineHeight: 56,
    color: "#d4a843",
    opacity: 0.18,
  },
  ornamentTop: {
    textAlign: "center",
    fontSize: 14,
    color: "#d4a843",
    opacity: 0.45,
    marginBottom: 16,
    letterSpacing: 8,
  },
  quoteText: {
    fontFamily: "EBGaramond-Italic",
    fontStyle: "italic",
    fontSize: 18,
    lineHeight: 30,
    color: "#f5ecd7",
    textAlign: "center",
  },
  ornamentMid: {
    textAlign: "center",
    marginVertical: 16,
    color: "#d4a843",
    opacity: 0.4,
    fontSize: 14,
    letterSpacing: 6,
  },
  author: {
    fontFamily: "CinzelDecorative-Regular",
    fontSize: 9,
    letterSpacing: 3,
    color: "#f0cb6e",
    textAlign: "center",
    opacity: 0.9,
    textTransform: "uppercase",
  },
  reference: {
    fontFamily: "EBGaramond-Italic",
    fontStyle: "italic",
    fontSize: 13,
    color: "#8a6a28",
    textAlign: "center",
    marginTop: 4,
  },
  ornamentBot: {
    textAlign: "center",
    marginTop: 16,
    color: "#d4a843",
    opacity: 0.3,
    fontSize: 12,
    letterSpacing: 8,
  },
});
