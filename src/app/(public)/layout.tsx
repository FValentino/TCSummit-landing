import Menu from "@/components/common/menu/menu";
import Footer from "@/components/common/footer/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
}