import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data?.session?.user?.email || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold text-pink-600">
        AfyaHer
      </Link>

      <nav className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/appointments" className="hover:underline">Appointments</Link>
        <Link to="/community" className="hover:underline">Community</Link>
        {userEmail && (
          <>
            <span className="text-sm text-gray-600">Hi, {userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
            >
              Logout
            </button>
          </>
        )}
        {!userEmail && (
          <Link
            to="/login"
            className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
