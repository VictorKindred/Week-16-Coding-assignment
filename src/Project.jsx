import React, { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, deleteProject } from './projectService';
import { Button, Form, ListGroup } from 'react-bootstrap';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await getProjects();
    setProjects(response.data);
  };

  const handleCreateProject = async () => {
    await createProject(newProject);
    fetchProjects();
    setNewProject({ name: '', description: '' });
  };

  const handleUpdateProject = async (id, updatedProject) => {
    await updateProject(id, updatedProject);
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    fetchProjects();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h2>My Projects</h2>
      <Form>
        <Form.Group>
          <Form.Label>Project Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            value={newProject.name} 
            onChange={handleInputChange} 
            placeholder="Enter project name" 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Project Description</Form.Label>
          <Form.Control 
            type="text" 
            name="description"
            value={newProject.description} 
            onChange={handleInputChange} 
            placeholder="Enter project description" 
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreateProject}>Add Project</Button>
      </Form>
      <ListGroup className="mt-3">
        {projects.map(project => (
          <ListGroup.Item key={project.id}>
            <Form.Control 
              type="text" 
              name="name"
              value={project.name} 
              onChange={(e) => handleUpdateProject(project.id, { ...project, name: e.target.value })} 
            />
            <Form.Control 
              type="text" 
              name="description"
              value={project.description} 
              onChange={(e) => handleUpdateProject(project.id, { ...project, description: e.target.value })} 
              className="mt-2"
            />
            <Button variant="danger" onClick={() => handleDeleteProject(project.id)} className="mt-2">Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Project;
