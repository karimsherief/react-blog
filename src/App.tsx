import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Home, NewBlog, BlogDetails, BlogError, NotFound } from "./pages";
import { BlogsLoader } from "./pages/Home";
import { handleSubmit } from "./pages/new-blog/NewBlog";
import { BlogDetailsLoader } from "./pages/blog-details/BlogDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} loader={BlogsLoader} />
      <Route path="create" element={<NewBlog />} action={handleSubmit} />
      <Route
        path="blogs"
        element={<Navigate to="/" />}
        errorElement={<BlogError />}
      >
        <Route
          path=":id"
          element={<BlogDetails />}
          loader={BlogDetailsLoader}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    basename: import.meta.env.DEV ? "/" : "/react-blog/",
  }
);
export default function App() {
  return <RouterProvider router={router} />;
}
