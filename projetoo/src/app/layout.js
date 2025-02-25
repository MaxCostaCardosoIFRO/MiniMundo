import Header from "../components/header";
import "./globals.css";


export const metadata = {
  title: "Minha primeira aplicação",
  description: "Projeto front-end",
  charset: 'UTF-8',
  author: 'Max',
  keywords: 'HTML, CSS, JavaScript, react, Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
