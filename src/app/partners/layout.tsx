import PartnersMenu from "@/components/partners/menu/menu";
import PartnersFooter from "@/components/partners/footer/footer";

export default function PartnersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PartnersMenu />
      {children}
      <PartnersFooter />
    </>
  );
}