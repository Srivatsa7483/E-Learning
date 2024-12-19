import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Quiz, Question } from '../types';

export default function QuizManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Partial<Quiz>>({
    title: '',
    duration: 30,
    questions: [],
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setCurrentQuiz({
      ...currentQuiz,
      questions: [...(currentQuiz.questions || []), newQuestion],
    });
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: any) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions?.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    });
  };

  const removeQuestion = (questionId: string) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions?.filter((q) => q.id !== questionId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuiz.title && currentQuiz.questions?.length) {
      const quiz: Quiz = {
        id: Date.now().toString(),
        title: currentQuiz.title,
        duration: currentQuiz.duration || 30,
        questions: currentQuiz.questions,
      };
      setQuizzes([...quizzes, quiz]);
      setCurrentQuiz({
        title: '',
        duration: 30,
        questions: [],
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create Quiz</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Quiz Title</label>
            <input
              type="text"
              value={currentQuiz.title}
              onChange={(e) => setCurrentQuiz({ ...currentQuiz, title: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={currentQuiz.duration}
              onChange={(e) => setCurrentQuiz({ ...currentQuiz, duration: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Questions</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Question</span>
            </button>
          </div>

          {currentQuiz.questions?.map((question, qIndex) => (
            <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Question {qIndex + 1}</span>
                <button
                  type="button"
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <input
                type="text"
                value={question.text}
                onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                placeholder="Enter question text"
                className="w-full p-2 border rounded-md mb-2"
                required
              />

              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`correct-${question.id}`}
                      checked={question.correctAnswer === oIndex}
                      onChange={() => updateQuestion(question.id, 'correctAnswer', oIndex)}
                      required
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[oIndex] = e.target.value;
                        updateQuestion(question.id, 'options', newOptions);
                      }}
                      placeholder={`Option ${oIndex + 1}`}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          disabled={!currentQuiz.questions?.length}
        >
          Create Quiz
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Created Quizzes</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-bold text-lg">{quiz.title}</h4>
              <p className="text-gray-600">{quiz.questions.length} questions</p>
              <p className="text-gray-600">{quiz.duration} minutes</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}