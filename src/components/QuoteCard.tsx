// src/components/QuoteCard.tsx

import { View, Text, PanResponder } from "react-native";
import { useRef } from "react";

type Props = {
  text: string;
  author: string;
  onNext: () => void;
};

export default function QuoteCard({ text, author, onNext }: Props) {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 20;
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50) {
          onNext(); // swipe left
        }

        if (gesture.dx > 50) {
          onNext(); // swipe right
        }
      },
    }),
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      className="bg-[#5c4033] p-8 rounded-2xl border border-yellow-200 shadow-lg"
    >
      <Text className="text-lg text-yellow-100 text-center leading-7">
        "{text}"
      </Text>

      <Text className="text-sm text-yellow-300 text-center mt-6 font-semibold">
        — {author}
      </Text>

      <Text className="text-xs text-yellow-400 text-center mt-4 opacity-60">
        Swipe left or right
      </Text>
    </View>
  );
}
