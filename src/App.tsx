import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import PreferencesProvider from "./context/PreferencesProvider";
import PersonalizedPage from "./components/PersonalizedPage";
import NewsSearchPage from "./components/NewsSearchPage";
import PreferencesPage from "./components/PreferencesPage";
import { Space } from "antd";

function App() {
  return (
    <Router>
      <PreferencesProvider>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<PersonalizedPage />} />
            <Route path="search" element={<NewsSearchPage />} />
            <Route path="settings" element={<PreferencesPage />} />
          </Routes>
        </Space>
      </PreferencesProvider>
    </Router>
  );
}

export default App;
