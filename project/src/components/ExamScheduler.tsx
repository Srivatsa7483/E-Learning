import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { Exam } from '../types';

export default function ExamScheduler() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [newExam, setNewExam] = useState({
    title: '',
    subject: '',
    duration: 60,
    scheduledFor: '',
    totalMarks: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exam: Exam = {
      id: Date.now().toString(),
      ...newExam,
      scheduledFor: new Date(newExam.scheduledFor),
    };
    setExams([...exams, exam]);
    setNewExam({
      title: '',
      subject: '',
      duration: 60,
      scheduledFor: '',
      totalMarks: 100,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Schedule Exam</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={newExam.title}
            onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={newExam.subject}
            onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={newExam.duration}
              onChange={(e) => setNewExam({ ...newExam, duration: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Total Marks</label>
            <input
              type="number"
              value={newExam.totalMarks}
              onChange={(e) => setNewExam({ ...newExam, totalMarks: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Schedule Date & Time</label>
          <input
            type="datetime-local"
            value={newExam.scheduledFor}
            onChange={(e) => setNewExam({ ...newExam, scheduledFor: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Schedule Exam
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Scheduled Exams</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-bold text-lg">{exam.title}</h4>
              <p className="text-gray-600">{exam.subject}</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {exam.scheduledFor.toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {exam.duration} minutes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}