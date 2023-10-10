import Image from "next/image";
import { Inter } from "next/font/google";
import { ApiTest } from "@/GraphSql";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="w-full h-screen">
      <ApiTest/>
    </section>
  );
}
