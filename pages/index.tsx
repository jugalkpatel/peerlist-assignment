import Image from "next/image";
import { Inter } from "next/font/google";
import { candidates as candidatesData } from "@/utils/mock.utils";
import { useEffect, useState } from "react";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [candidates, setCandidates] = useState<typeof candidatesData>([]);

  useEffect(() => {
    setCandidates(candidatesData);
  }, []);

  if (!candidates.length) {
    return null;
  }

  return (
    <div className="bg-white h-vh">
      <Card {...candidates[0]} variant="EXTERNAL" />
    </div>
  );
}
