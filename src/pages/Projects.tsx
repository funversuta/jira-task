import { FC, useEffect, useState } from "react";
import { Edit2, Trash2 } from "react-feather";
import { useNavigate } from "react-router";

import { Input } from "../components/Input/Input";

import { IProject } from "../interface/interfaces";

import "./Project.scss";
import { updateLocalStorageKeyName } from "../helpers/api";
import { Modal } from "../components/Modal/Modal";

interface IProps {
  projects: IProject[];
  setProjects: (project: IProject[]) => void;
}

export const Projects: FC<IProps> = ({ projects, setProjects }) => {
  const navigate = useNavigate();
  const [editable, setEditable] = useState<null | number>(null);
  const [showModal, setShowModal] = useState(false);

  const removeProject = (projectId: number) => {
    const updateProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updateProjects);
  };

  const handleProjects = projects.map((project) => (
    <div
      key={project.id}
      onClick={() => {
        navigate(`/jira-task/${project.name}`);
      }}
    >
      {project.name}
      <section className="project-tools">
        <Edit2
          onClick={(e) => {
            e.stopPropagation();
            setEditable(project.id);
            setShowModal(true);
          }}
        />
        <Trash2
          onClick={(e) => {
            e.stopPropagation();
            removeProject(project.id);
          }}
        />
      </section>
    </div>
  ));

  const addProject = (value: string) => {
    setProjects([...projects, { name: value, id: Math.random() }]);
  };

  const editProject = (value: string, id?: number) => {
    const updateProjects = projects.filter((project) => {
      if (project.id == editable) {
        updateLocalStorageKeyName(project.name, value);
        project.name = value;
      }
    });

    setProjects([...projects, ...updateProjects]);
    setEditable(null);
  };

  return (
    <div className="project-container">
      <h1>Projects</h1>
      {!editable ? (
        handleProjects
      ) : (
        <>
          {handleProjects}
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <Input
                editable={true}
                onSubmit={editProject}
                setEditable={setEditable}
                placeholder="edit"
                buttonText="Save"
              />
            </Modal>
          )}
        </>
      )}
      <Input
        displayClass="new-project"
        text="Start New Project"
        onSubmit={addProject}
      />
    </div>
  );
};
