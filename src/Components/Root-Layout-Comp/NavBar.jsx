import { Link } from 'react-router-dom';
import logo from '../../assets/MHLogo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { auth } from '../../firebase';
import { FaUser } from 'react-icons/fa';
import { Dropdown } from 'antd';
import { FaHeart } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Avatar from 'antd/es/avatar/avatar';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './Searchbar';
import { IoMdSearch } from 'react-icons/io';
import { useSearchDrawer } from '../../Context/SearchDrawerContext';
import { Badge } from 'antd';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';

export default function NavBar() {
  const { setShowSearchDrawer } = useSearchDrawer();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState();
  const logoutHandler = async () => {
    await signOut(auth);
    navigate('/login');
  };
  useEffect(() => {
    auth.onAuthStateChanged(setAuthUser);
  }, [authUser]);
  const { cartItems, isCartLoading } = useFetchCartItems();

  const unAuthProfileItems = [
    {
      key: '1',
      label: <Link to={'/login'}>Login</Link>,
    },
    {
      key: '2',
      label: <Link to={'/register'}>Register</Link>,
    },
  ];

  const authProfileItems = [
    {
      key: '1',
      type: 'group',
      label: (
        <div className="user-full-name flex gap-2">
          <Avatar size="small">
            {auth.currentUser?.displayName?.substring(0, 1)}
          </Avatar>
          <span>{auth.currentUser?.displayName}</span>
        </div>
      ),
    },
    {
      key: '2',
      label: <Link to={'/wishlist'}>My Wishlist</Link>,
      icon: <FaHeart className="text-primary" />,
    },
    {
      key: '3',
      label: <Link to="/my-orders">My Orders</Link>,
      icon: <FaShoppingBag className="text-primary" />,
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <div className="logout text-red-500" onClick={logoutHandler}>
          Logout
        </div>
      ),
      icon: <FiLogOut className="text-red-500" />,
    },
  ];

  return (
    <div className="shadow-md bg-white  ">
      {/* Upper */}
      <div className=" bg-gray-50 py-2 paddingX flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
        </div>
        {/* Search */}

        <SearchBar />
        {/* Actions & Account*/}

        <div className=" flex gap-2 items-center font-medium ">
          <IoMdSearch
            onClick={() => setShowSearchDrawer(true)}
            className="text-primary  hover:text-primary/80 text-xl cursor-pointer group-hover:text-primary block sm:hidden "
          />
          {auth.currentUser === null && (
            <div className="space-x-2 divide-x-2 hidden sm:block">
              <Link to="/login">Login</Link>
              <Link to="/register" className="ps-2">
                Register
              </Link>
            </div>
          )}
          <Link
            className="text-primary hover:text-primary/80 group  rounded-full"
            to="/cart"
          >
            <Badge
              count={isCartLoading ? 0 : cartItems.length}
              className="flex items-center"
            >
              <FaShoppingCart className="text-xl drop-shadow-sm cursor-pointer text-primary" />
            </Badge>
          </Link>

          <Dropdown
            menu={{
              items:
                auth.currentUser === null
                  ? unAuthProfileItems
                  : authProfileItems,
            }}
          >
            <FaUser
              className={`text-primary cursor-pointer ${auth.currentUser === null && 'block sm:hidden'}`}
            />
          </Dropdown>
        </div>
      </div>
      {/* Lower */}
      <div className="flex  justify-center p-2">
        <ul className="flex items-center gap-5 font-semibold ">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/stores">Stores</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
