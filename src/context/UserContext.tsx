import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.VITE_ENV === 'production') {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const accessToken = localStorage.getItem('accessToken');
      const fetchUserRole = async () => {
        const token = user.token;

        try {
          const response = await fetch(
            `${backendUrl}/api/users/user-role?token=${encodeURIComponent(token)}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response && response.status && response.status === 403) {
            logout();
          }

          if (response.ok) {
            const data = await response.json();
            setRole(data.role);
          } else {
            console.error('Error fetching role:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      };

      fetchUserRole();
    }
  }, [user, backendUrl]);

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };

  return (
    <UserContext.Provider value={{ user, setUser, role, setRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
