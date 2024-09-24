import Navbar from '../Components/Root-Layout-Comp/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Root-Layout-Comp/Footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SearchDrawer } from '../Components/Root-Layout-Comp/SearchDrawer';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const location = useLocation().pathname;
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
  return (
    <>
      <Toaster />
      <SearchDrawer />
      <Navbar />
      <div className="min-h-screen relative">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
