import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainContainer } from "./components/MainContainer";

export default function App() {
  return (
    <>
      <Header />
      <main className="flex w-full flex-col px-4">
        <MainContainer />
      </main>
      <Footer />
    </>
  );
}
