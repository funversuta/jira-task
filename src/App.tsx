import { FC, useEffect, useState } from "react";

import { Index } from "./components";
import { IProject } from "./interface/interfaces";

export const App: FC = () => {
  const [projects, setProjects] = useState<IProject[]>(
    JSON.parse(
      localStorage.getItem("projects") ?? '[{"name":"Project","id":1}]'
    )
  );
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);
  return (
    <>
      <Index projects={projects} setProjects={setProjects} />
    </>
  );
};
