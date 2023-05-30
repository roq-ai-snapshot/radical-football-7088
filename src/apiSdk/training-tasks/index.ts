import axios from 'axios';
import queryString from 'query-string';
import { TrainingTaskInterface } from 'interfaces/training-task';
import { GetQueryInterface } from '../../interfaces';

export const getTrainingTasks = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-tasks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrainingTask = async (trainingTask: TrainingTaskInterface) => {
  const response = await axios.post('/api/training-tasks', trainingTask);
  return response.data;
};

export const updateTrainingTaskById = async (id: string, trainingTask: TrainingTaskInterface) => {
  const response = await axios.put(`/api/training-tasks/${id}`, trainingTask);
  return response.data;
};

export const getTrainingTaskById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-tasks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrainingTaskById = async (id: string) => {
  const response = await axios.delete(`/api/training-tasks/${id}`);
  return response.data;
};
