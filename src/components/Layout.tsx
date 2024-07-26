import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({
  setSelectedPost,
  children,
}: {
  setSelectedPost: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header setSelectedPost={setSelectedPost} />
      <main className="overflow-y-scroll">{children}</main>
      <Footer />
    </>
  );
}
