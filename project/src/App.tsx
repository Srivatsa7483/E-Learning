import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ExamScheduler from './components/ExamScheduler';
import QuizManager from './components/QuizManager';

function App() {
  const [activeTab, setActiveTab] = useState<'exams' | 'quizzes'>('exams');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-6">
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'exams'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('exams')}
            >
              Exam Scheduler
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'quizzes'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('quizzes')}
            >
              Quiz Manager
            </button>
          </div>
        </div>

        {activeTab === 'exams' ? <ExamScheduler /> : <QuizManager />}
      </main>
    </div>
  );
}

export default App;