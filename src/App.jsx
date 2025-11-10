import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import RequireAuth from "@/components/auth/RequireAuth";

export default function App() {
  return (
    <RequireAuth>
      <Layout>
        <Outlet />
      </Layout>
    </RequireAuth>
  );
}
