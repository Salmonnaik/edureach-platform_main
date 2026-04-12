import { coursesContent } from "../data/content";
import { BookOpen, Users, TrendingUp, Award } from "lucide-react";

export default function CoursesSection() {
  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold text-sm uppercase tracking-wide mb-2">
            World-Class Education
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Programs Offered
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of undergraduate and postgraduate programs 
            designed to shape your future career.
          </p>
        </div>

        {/* B.Tech Programs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-red-600 rounded-full"></div>
            B.Tech Programs (4 Years)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesContent.btech.map((course) => (
              <div key={course.name} className="card group cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{course.name}</h4>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          {course.seats} seats
                        </span>
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <TrendingUp className="w-4 h-4" />
                          High Demand
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">4 Years</span>
                    <span className="text-sm font-medium text-red-600">Popular</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* M.Tech & MBA Programs */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* M.Tech Programs */}
          <div className="card">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">M.Tech Programs</h3>
                  <p className="text-gray-600">2 Years Duration</p>
                </div>
              </div>
              <div className="space-y-4">
                {coursesContent.mtech.map((course) => (
                  <div key={course.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">{course.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">{course.seats} seats</span>
                      <span className="text-green-600 font-medium">High Demand</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MBA Program */}
          <div className="card">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">MBA Program</h3>
                  <p className="text-gray-600">2 Years Duration</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 text-lg mb-2">{coursesContent.mba.name}</h4>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    {coursesContent.mba.seats} seats
                  </span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {coursesContent.mba.avg}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Specializations in Finance, Marketing, HR, and IT
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['Finance', 'Marketing', 'HR', 'IT'].map((spec) => (
                    <div key={spec} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium text-purple-900">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white text-blue-600 hover:bg-gray-100">
                Explore Programs
              </button>
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}