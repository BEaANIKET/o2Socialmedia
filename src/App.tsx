import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import ReelsPage from './pages/ReelsPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import SearchPage from './pages/SearchPage';
import ExplorePage from './pages/ExplorePage';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}