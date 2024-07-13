import { useRoutes } from "react-router-dom";

import ShowCreators from "./pages/ShowCreators";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";

function Router() {
  const routeConfig = [
    { path: "/", element: <ShowCreators /> },
    { path: "/creators", element: <ShowCreators /> },
    {
      path: "/edit-creator",
      element: <EditCreator />,
    },
    { path: "/add-creator", element: <AddCreator /> },
    { path: "/view-creator", element: <ViewCreator /> },
    // Add more route configurations as needed
  ];
  const routeResult = useRoutes(routeConfig);
  return routeResult;
}

export default Router;
