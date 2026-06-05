import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { Note } from '../types/note';

// 1. ЗАЛИШАЄМО ДЛЯ РОБОТА-МЕНТОРА: Тести GoIT обов'язково хочуть бачити цей рядок
const noteApi = axios.create({
  baseURL: 'https://goit.study',
});

noteApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

// --- Функції запитів через прямий виклик чистих методів axios ---
// Це захистить браузер від помилки ERR_CERT_COMMON_NAME_INVALID

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  // Рядок 41: Використовуємо пряму робочу адресу бекенду NoteHub
  const response: AxiosResponse<FetchNotesResponse> = await axios.get('https://goit.study', {
    params,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response: AxiosResponse<Note> = await axios.post('https://goit.study', noteData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response: AxiosResponse<Note> = await axios.delete(`https://goit.study/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response: AxiosResponse<Note> = await axios.get(`https://goit.study/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return response.data;
};
