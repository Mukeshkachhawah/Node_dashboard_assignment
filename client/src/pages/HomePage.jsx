import Navbar from "../components/Navbar/Navbar";
import Taskboard from "../components/TaskBoard";
import WorkspaceUI from "../components/Work-space-ui/WorkspaceNavbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <WorkspaceUI />
      <Taskboard />
    </>
  );
};

export default HomePage;
