import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "@/redux/Provider";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/layout/Layout";

export const metadata = {
  title: "DevJournal",
  description: "Modern Blog Management System using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Layout>
            {children}
          </Layout>
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}