import { AuthProvider } from '../../contexts/AuthContext';

export default function Layout({ children }) {
  return (
    <>
      <AuthProvider>
        <main>{children}</main>
      </AuthProvider>
    </>
  );
}
