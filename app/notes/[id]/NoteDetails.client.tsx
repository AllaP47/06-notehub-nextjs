'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';

// ВИПРАВЛЕНО: Імпортуємо файл із поточної папки динамічного маршруту
import cssStyles from './details.module.css';

// Сувора типізація стилів для Next.js
const css = (cssStyles || {}) as Record<string, string>;

export default function NoteDetailsClient() {
  const { id } = useParams();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <p style={{ padding: '20px', textAlign: 'center' }}>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p style={{ padding: '20px', textAlign: 'center', color: '#dc3545' }}>Something went wrong.</p>;
  }

  return (
    <div className={css.container || ''}>
      <div className={css.item || ''}>
        <div className={css.header || ''}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag || ''}>{note.tag}</p>
        <p className={css.content || ''}>{note.content}</p>
        <p className={css.date || ''}>
          Created date: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

