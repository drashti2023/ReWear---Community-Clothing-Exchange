import { useState, useEffect } from 'react';
import AddItem from './components/AddItem';
import AIStyler from './components/AIStyler';
import Browse from './components/Browse';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';
import Layout from './components/Layout';
import Login from './components/Login';
import Profile from './components/Profile';
import SwapRequests from './components/SwapRequests';
import type { User, Item, SwapRequest } from './types';
import { getItems, createItem } from './api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handlePageChange = (page: string, data?: any) => {
    if ((page === 'dashboard' || page === 'add-item' || page === 'ai-styler' || page === 'swap-requests') && !isAuthenticated) {
      setCurrentPage('login');
      return;
    }

    if (page === 'item-detail' && data) {
      setSelectedItem(data);
    }

    setCurrentPage(page);
  };

  const handleLogin = (userData: User) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleAddItem = async (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await createItem(newItem);
      const item = response.data;
      setItems(prev => [item, ...prev]);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleSwapRequest = (itemId: string, message: string) => {
    if (!currentUser) return;

    const newRequest: SwapRequest = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId: items.find(item => item.id === itemId)?.userId || '',
      itemId,
      message,
      status: 'pending',
      createdAt: new Date()
    };

    setSwapRequests(prev => [...prev, newRequest]);

    setNotifications(prev => [...prev, {
      id: Date.now().toString(),
      type: 'swap_request',
      message: 'Swap request sent successfully!',
      timestamp: new Date()
    }]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'browse':
        return <Browse items={items} onPageChange={handlePageChange} onItemSelect={(item) => handlePageChange('item-detail', item)} />;
      case 'dashboard':
        return <Dashboard user={currentUser} items={items.filter(item => item.userId === currentUser?.id)} onPageChange={handlePageChange} onLogout={handleLogout} />;
      case 'add-item':
        return <AddItem onPageChange={handlePageChange} onAddItem={handleAddItem} currentUser={currentUser} />;
      case 'item-detail':
        return <ItemDetail item={selectedItem} onPageChange={handlePageChange} onSwapRequest={handleSwapRequest} currentUser={currentUser} />;
      case 'profile':
        return <Profile user={currentUser} onPageChange={handlePageChange} />;
      case 'ai-styler':
        return <AIStyler items={items} onPageChange={handlePageChange} currentUser={currentUser} />;
      case 'swap-requests':
        return <SwapRequests requests={swapRequests} onPageChange={handlePageChange} currentUser={currentUser} />;
      case 'login':
        return <Login onLogin={handleLogin} onPageChange={handlePageChange} />;
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  if (currentPage === 'login') {
    return renderPage();
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={handlePageChange}
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
      currentUser={currentUser}
      notifications={notifications}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
