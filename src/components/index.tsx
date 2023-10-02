import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { Projects } from "../pages/Projects";
import { Tasks } from "../pages/Tasks";

import { IProject } from "../interface/interfaces";

interface IProps {
  projects: IProject[];
  setProjects: (project: IProject[]) => void;
}

export const Index: FC<IProps> = ({ projects, setProjects }) => {
  return (
    <Routes>
      <Route
        index
        element={<Projects projects={projects} setProjects={setProjects} />}
      />
      <Route path="/:id" element={<Tasks />} />
    </Routes>
  );
};
