import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserCoursePage from "./pages/UserCoursePage";
import ProfilePage from "./pages/ProfilePage";
import AchievementPage from "./pages/AchievementPage";
import ContentPage from "./pages/ContentPage";
import AdminCoursePage from "./pages/AdminCoursePage";
import CoursePage from "./pages/CoursePage";
import AddModulePage from "./pages/AddModulePage";
import ModulePage from "./pages/ModulePage";
import CreateModulePage from "./pages/CreateModulePage";
import EditModulePage from "./pages/EditModulePage";
import SitePage from "./pages/SitePage";
import LearnersPage from "./pages/LearnersPage";
import AddNewLearnerPage from "./pages/AddNewLearnerPage";
import ViewLearnerPage from "./pages/ViewLearnerPage";
import ModuleTemplateSelection from "./components/ModuleTemplateSelection";
import ModuleDesignTemplate from "./components/ModuleDesignTemplate";
import ModuleTitleTemplate from "./components/ModuleTitleTemplate";
import ModuleFinishTemplate from "./components/ModuleFinishTemplate";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModuleProvider } from "./components/NewModuleContext";
import ProttectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ModuleProvider>
          <BrowserRouter>
            {/* <ProttectedRoute> */}
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="/" element={<ProttectedRoute />}>
                <Route path="home" element={<HomePage />} />
                <Route path="user-courses/:id" element={<UserCoursePage />} />
                <Route path="study" element={<ContentPage />} />
                <Route path="achievements" element={<AchievementPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="courses" element={<AdminCoursePage />} />
                <Route path="course/:id" element={<CoursePage />} />
                <Route path="course-modules/:id" element={<AddModulePage />} />
                <Route path="modules" element={<ModulePage />} />

                <Route path="create-module" element={<CreateModulePage />}>
                  <Route index element={<Navigate to="title" />} />
                  <Route path="title" element={<ModuleTitleTemplate />} />
                  <Route
                    path="templates"
                    element={<ModuleTemplateSelection />}
                  />
                  <Route path="designs" element={<ModuleDesignTemplate />} />
                  <Route path="finish" element={<ModuleFinishTemplate />} />
                </Route>

                <Route path="edit-module/:id" element={<EditModulePage />}>
                  <Route index element={<Navigate to="title" />} />
                  <Route path="title" element={<ModuleTitleTemplate />} />
                  <Route
                    path="templates"
                    element={<ModuleTemplateSelection />}
                  />
                  <Route path="designs" element={<ModuleDesignTemplate />} />
                  <Route path="finish" element={<ModuleFinishTemplate />} />
                </Route>
                <Route path="sites" element={<SitePage />} />
                <Route path="learners" element={<LearnersPage />} />
                <Route path="learners/:id" element={<LearnersPage />} />
                <Route path="sign-up" element={<AddNewLearnerPage />} />
                <Route path="learner/:id" element={<ViewLearnerPage />} />
              </Route>
            </Routes>
            {/* </ProttectedRoute> */}
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </ModuleProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App; /* eslint-disable no-unused-vars */
