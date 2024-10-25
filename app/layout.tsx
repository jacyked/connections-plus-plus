import '@/app/ui/global.css';
import { montserrat } from '@/app/ui/fonts';
import SideNav from '@/app/ui/dashboard/sidenav';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { createTheme, ThemeProvider } from '@mui/material';
import theme from './ui/theme';




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <AppRouterCacheProvider >
        <ThemeProvider theme={theme}>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="flex-grow p-0 md:overflow-y-auto md:p-12">{children}</div>
          </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
