import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer, Zoom, Slide, Bounce, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function transitionAnimation() {
  const list = [Zoom, Slide, Bounce, Flip];
  return list[Math.floor(Math.random() * list.length)];
}

function transitionPosition() {
  const list = ['top-right', 'top-center', 'top-left']
  return list[Math.floor(Math.random() * list.length)];
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/home" replace />} />
      </Routes>
      <ToastContainer
        position={transitionPosition()} autoClose={2000}
        hideProgressBar={false} newestOnTop closeOnClick
        rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover
        transition={transitionAnimation()}
      />
    </>
  );
}

export default App;
