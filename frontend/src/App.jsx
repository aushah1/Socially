import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context";
import { PostProvider } from "./features/posts/post.context";
import "./features/shared/styles/global.scss";
import { UserProvider } from "./features/users/user.context";

function App() {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </PostProvider>
      </AuthProvider>
    </>
  );
}

export default App;
