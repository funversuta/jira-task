import { FC } from "react";
import { useParams } from "react-router";

import { ProjectPage } from "../components/ProjectPage/ProjectPage";

export const Tasks: FC = () => {
  const params = useParams();
  return (
    <div>
      <ProjectPage
        LocalStorageKeyName={params.id?.toString() || "0"}
        projectName={params.id}
      />
    </div>
  );
};
