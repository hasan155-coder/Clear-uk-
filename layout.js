export const metadata = {
  title: "ClearPath UK — Your Guide to UK Services",
  description: "Free multilingual guide to UK government services for immigrants and foreigners. GP, school, driving licence, council, benefits and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
