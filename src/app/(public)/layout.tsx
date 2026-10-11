import Menu from "@/components/common/menu/menu";
import Footer from "@/components/common/footer/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* First tab stop: jumps past the fixed chrome straight to the page content. */}
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Menu />
      <div id="contenido" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
}
