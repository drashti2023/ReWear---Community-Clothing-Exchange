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
<<<<<<< HEAD
=======
import { getItems, createItem } from './api';
>>>>>>> fada43a (Initial commit for Rewear)

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

<<<<<<< HEAD
  // Initialize demo data
  useEffect(() => {
    const demoItems: Item[] = [
      {
        id: '1',
        title: 'Vintage Band Tee',
        description: 'Authentic 90s vintage tee in excellent condition. Perfect for that retro vibe!',
        images: ['https://images.pexels.com/photos/1464621/pexels-photo-1464621.jpeg?auto=compress&cs=tinysrgb&w=400'],
        category: 'Tops',
        size: 'M',
        condition: 'Excellent',
        color: 'Black',
        brand: 'Vintage',
        tags: ['vintage', 'band', 'streetwear'],
        points: 85,
        userId: 'user1',
        userName: 'Alex M.',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        location: 'NYC',
        rating: 4.9,
        views: 24,
        likes: 8,
        isAIRecommended: true,
        status: 'available',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Floral Summer Dress',
        description: 'Perfect for summer outings and brunches. Lightweight and flowy!',
        images: ['https://images.pexels.com/photos/1798507/pexels-photo-1798507.jpeg?auto=compress&cs=tinysrgb&w=400'],
        category: 'Dresses',
        size: 'S',
        condition: 'Like New',
        color: 'Floral',
        brand: 'Zara',
        tags: ['floral', 'summer', 'casual'],
        points: 120,
        userId: 'user2',
        userName: 'Emma K.',
        userAvatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=100',
        location: 'LA',
        rating: 4.8,
        views: 67,
        likes: 15,
        isAIRecommended: false,
        status: 'available',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12')
      }
    ];
    setItems(demoItems);
=======
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
>>>>>>> fada43a (Initial commit for Rewear)
  }, []);

  const handlePageChange = (page: string, data?: any) => {
    if ((page === 'dashboard' || page === 'add-item' || page === 'ai-styler' || page === 'swap-requests') && !isAuthenticated) {
      setCurrentPage('login');
      return;
    }
<<<<<<< HEAD
    
    if (page === 'item-detail' && data) {
      setSelectedItem(data);
    }
    
=======

    if (page === 'item-detail' && data) {
      setSelectedItem(data);
    }

>>>>>>> fada43a (Initial commit for Rewear)
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

<<<<<<< HEAD
  const handleAddItem = (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const item: Item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0,
      status: 'available'
    };
    setItems(prev => [item, ...prev]);
    setCurrentPage('dashboard');
=======
  const handleAddItem = async (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await createItem(newItem);
      const item = response.data;
      setItems(prev => [item, ...prev]);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
    }
>>>>>>> fada43a (Initial commit for Rewear)
  };

  const handleSwapRequest = (itemId: string, message: string) => {
    if (!currentUser) return;
<<<<<<< HEAD
    
=======

>>>>>>> fada43a (Initial commit for Rewear)
    const newRequest: SwapRequest = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId: items.find(item => item.id === itemId)?.userId || '',
      itemId,
      message,
      status: 'pending',
      createdAt: new Date()
    };
<<<<<<< HEAD
    
    setSwapRequests(prev => [...prev, newRequest]);
    
    // Add notification
=======

    setSwapRequests(prev => [...prev, newRequest]);

>>>>>>> fada43a (Initial commit for Rewear)
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

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> fada43a (Initial commit for Rewear)
