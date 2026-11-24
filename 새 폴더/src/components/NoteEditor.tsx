'use client';

import React, { useState, useEffect } from 'react';
import { Save, Check, FileEdit } from 'lucide-react';
import { useLearningProgress } from '@/hooks/useLearningProgress';

interface NoteEditorProps {
  lessonId: string;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ lessonId }) => {
  const { getNote, saveNote, isMounted } = useLearningProgress();
  const [text, setText] = useState<string>('');
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  useEffect(() => {
    if (isMounted) {
      setText(getNote(lessonId));
    }
  }, [lessonId, isMounted, getNote]);

  const handleSave = () => {
    saveNote(lessonId, text);
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
    }, 2000);
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
          <FileEdit className="w-3.5 h-3.5 text-amber-400" />
          <span>나만의 학습 메모 & 실습 일지</span>
        </div>
        {savedStatus ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <Check className="w-3 h-3" />
            저장되었습니다
          </span>
        ) : (
          <span className="text-[11px] text-gray-400">
            {text.length}자 작성됨
          </span>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="이 레슨에서 배운 핵심 단축키나 나만의 실습 팁, 발생했던 에러 메모를 남겨보세요. (브라우저에 자동 유지됩니다)"
        rows={3}
        className="w-full text-xs text-gray-200 bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-sky-500 transition-colors resize-y leading-relaxed placeholder:text-gray-400"
      />

      <div className="flex justify-end mt-2">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          메모 저장하기
        </button>
      </div>
    </div>
  );
};
