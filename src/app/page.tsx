import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <div className="flex-1">Home Page Content</div>
      <Footer />
    </div>
  );
}
