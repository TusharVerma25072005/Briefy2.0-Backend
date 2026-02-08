import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <Navbar />
      <body>
        {children}
      </body>
      <Footer />
    </html>
  );
}
