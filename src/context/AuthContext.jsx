import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('digilocker_currentUser');
    if (stored) {
      setUser(JSON.parse(stored));
      setIsAuthenticated(true);
    }
  }, []);

  const getUsers = () => JSON.parse(localStorage.getItem('digilocker_users') || '[]');
  const saveUsers = (users) => localStorage.setItem('digilocker_users', JSON.stringify(users));

  const signup = (username, email, password, securityQuestion, securityAnswer) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { success: false, message: 'Email already registered.' };
    if (users.find(u => u.username === username)) return { success: false, message: 'Username already taken.' };
    const newUser = { id: Date.now().toString(), username, email, password, securityQuestion, securityAnswer, createdAt: new Date().toISOString() };
    users.push(newUser);
    saveUsers(users);
    return { success: true };
  };

  const login = (identifier, password) => {
    const users = getUsers();
    const found = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
    if (!found) return { success: false, message: 'Invalid credentials.' };
    const { password: _, securityAnswer: __, ...safeUser } = found;
    setUser(safeUser);
    setIsAuthenticated(true);
    localStorage.setItem('digilocker_currentUser', JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('digilocker_currentUser');
  };

  const getSecurityQuestion = (identifier) => {
    const users = getUsers();
    const found = users.find(u => u.email === identifier || u.username === identifier);
    if (!found) return null;
    return found.securityQuestion;
  };

  const resetPassword = (identifier, answer, newPassword) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.email === identifier || u.username === identifier);
    if (idx === -1) return { success: false, message: 'User not found.' };
    if (users[idx].securityAnswer.toLowerCase() !== answer.toLowerCase()) return { success: false, message: 'Incorrect security answer.' };
    users[idx].password = newPassword;
    saveUsers(users);
    return { success: true };
  };

  const updateProfile = (updates) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return { success: false, message: 'User not found.' };
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    const { password: _, securityAnswer: __, ...safeUser } = users[idx];
    setUser(safeUser);
    localStorage.setItem('digilocker_currentUser', JSON.stringify(safeUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, login, logout, getSecurityQuestion, resetPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
