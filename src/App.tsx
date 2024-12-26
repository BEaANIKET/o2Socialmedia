import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Layout from './components/layout/Layout';
import Feed from './components/Feed';
import ReelsPage from './pages/ReelsPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import SearchPage from './pages/SearchPage';
import ExplorePage from './pages/ExplorePage';
import StoryViewer from './components/story/StoryViewer';
import SignupPage from './pages/SignupPage';

function AppContent() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/stories/:username" element={<StoryViewer />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}