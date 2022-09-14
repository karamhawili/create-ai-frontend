import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilesTypeProvider } from '../contexts/FilesTypeContext';
import { WorkspaceProvider } from '../contexts/WorkspaceContext';

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <AuthProvider>
        <FilesTypeProvider>
          <WorkspaceProvider>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </WorkspaceProvider>
        </FilesTypeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
