import "./global.css";
import { View, Text } from "react-native";
import { useState } from "react";
import QuoteCard from "./src/components/QuoteCard";
import { quotes } from "./src/constants/quotes";

export default function App() {
  const [index, setIndex] = useState(0);

  const nextQuote = () => {
    const next = (index + 1) % quotes.length;
    setIndex(next);
  };

  const quote = quotes[index];

  return (
    <View className="flex-1 bg-[#3b2f2f] items-center justify-center px-6">
      <Text className="text-3xl font-bold text-yellow-200 mb-10">
        BibleQuotes
      </Text>

      <QuoteCard text={quote.text} author={quote.author} onNext={nextQuote} />
    </View>
  );
}
