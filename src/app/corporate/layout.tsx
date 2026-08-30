import CorporateMenu from "@/components/corporate/menu/menu";
import CorporateFooter from "@/components/corporate/footer/footer";

export default function CorporateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CorporateMenu />
      {children}
      <CorporateFooter />
    </>
  );
}