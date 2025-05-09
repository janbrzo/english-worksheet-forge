
import React from "react";

interface ExerciseFillInBlanksProps {
  word_bank?: string[];
  sentences: any[];
  isEditing: boolean;
  viewMode: "student" | "teacher";
  onWordBankChange: (wIndex: number, value: string) => void;
  onSentenceChange: (sIndex: number, field: string, value: string) => void;
}

const ExerciseFillInBlanks: React.FC<ExerciseFillInBlanksProps> = ({
  word_bank, sentences, isEditing, viewMode, onWordBankChange, onSentenceChange
}) => (
  <div>
    {word_bank && (
      <div className="mb-4 p-3 bg-worksheet-purpleLight rounded-md word-bank-container">
        <p className="font-medium mb-2">Word Bank:</p>
        <div className="flex flex-wrap gap-2">
          {word_bank.map((word, wIndex) => (
            <span key={wIndex} className="bg-white px-2 py-1 rounded-md text-sm">
              {isEditing ? (
                <input
                  type="text"
                  value={word}
                  onChange={e => onWordBankChange(wIndex, e.target.value)}
                  className="border-0 bg-transparent p-0 w-full focus:outline-none focus:ring-0"
                />
              ) : word}
            </span>
          ))}
        </div>
      </div>
    )}
    <div className="space-y-0.5">
      {sentences.map((sentence, sIndex) => (
        <div key={sIndex} className="border-b pb-1">
          <div className="flex flex-row items-start">
            <div className="flex-grow">
              <p className="leading-snug">
                {isEditing ? (
                  <input
                    type="text"
                    value={sentence.text}
                    onChange={e => onSentenceChange(sIndex, 'text', e.target.value)}
                    className="w-full border p-1 editable-content"
                  />
                ) : (
                  <>{sIndex + 1}. {sentence.text.replace(/_+/g, "_______________")}</>
                )}
              </p>
            </div>
            {viewMode === 'teacher' && (
              <div className="text-green-600 italic ml-3 text-sm">
                {isEditing ? (
                  <input
                    type="text"
                    value={sentence.answer}
                    onChange={e => onSentenceChange(sIndex, 'answer', e.target.value)}
                    className="border p-1 editable-content w-full"
                  />
                ) : (
                  <span>({sentence.answer})</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ExerciseFillInBlanks;
