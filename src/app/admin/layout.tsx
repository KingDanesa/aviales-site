import '../globals.css';

export const metadata = {
  title: 'Админка — Казавиалесоохрана',
  description: 'Панель управления сайтом',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-[#0f1a14] text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
