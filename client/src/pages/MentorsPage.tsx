import { useState } from "react";
import { mentorsContent } from "../data/content";
import { Mail, Phone, Calendar, Star, Users, Award, BookOpen } from "lucide-react";

export default function MentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Users className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Our Esteemed Mentors</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Learn from industry experts and renowned academicians who are dedicated to shaping your future
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Award className="w-10 h-10 text-blue-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">150+</div>
              <div className="text-gray-600">Expert Mentors</div>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="w-10 h-10 text-red-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Research Papers</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 text-yellow-500 mb-3" />
              <div className="text-3xl font-bold text-gray-900">15:1</div>
              <div className="text-gray-600">Student Ratio</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 text-green-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">20+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Meet Our Mentor Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {mentorsContent.map((mentor, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {mentor.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">
                          {mentor.role}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedMentor(selectedMentor === index ? null : index)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Star className={`w-5 h-5 ${selectedMentor === index ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {mentor.bio}
                    </p>
                    
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Specializes in:
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        {mentor.teaches}
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Calendar className="w-4 h-4" />
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-900 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Connect with Our Mentors
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get personalized guidance and mentorship to accelerate your career growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book a Session
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
              View All Mentors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
