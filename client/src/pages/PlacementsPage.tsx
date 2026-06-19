import { useState } from "react";
import { topRecruiters, deptPlacements } from "../data/content";
import { Building2, TrendingUp, Users, Briefcase, DollarSign, GraduationCap, Target } from "lucide-react";

export default function PlacementsPage() {
  const [selectedDept, setSelectedDept] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Briefcase className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Placements & Careers</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Excellence in placements with top companies and exceptional career opportunities
          </p>
        </div>
      </div>

      {/* Placement Stats */}
      <div className="py-16 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Placement Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-blue-900 mb-2">92%</div>
              <div className="text-gray-700 font-medium">Placement Rate</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-900 mb-2">₹42 LPA</div>
              <div className="text-gray-700 font-medium">Highest Package</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
              <Building2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-red-900 mb-2">150+</div>
              <div className="text-gray-700 font-medium">Companies Visit</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-purple-900 mb-2">850+</div>
              <div className="text-gray-700 font-medium">Total Offers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Department-wise Placements */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Department-wise Placements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deptPlacements.map((dept, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  selectedDept === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedDept(selectedDept === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    dept.pct >= 80 ? 'bg-green-100 text-green-800' :
                    dept.pct >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {dept.pct}% Placed
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {dept.dept}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Package</p>
                    <p className="text-2xl font-bold text-green-600">{dept.avg}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
                      <span className="text-lg font-bold text-blue-600">{dept.pct}%</span>
                    </div>
                  </div>
                </div>
                
                {selectedDept === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Placement Status</span>
                      <span className={`font-semibold ${
                        dept.pct >= 80 ? 'text-green-600' :
                        dept.pct >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {dept.pct >= 80 ? 'Excellent' :
                         dept.pct >= 60 ? 'Good' : 'Improving'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Recruiters */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Top Recruiters
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {topRecruiters.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="text-center">
                    <Building2 className="w-8 h-8 text-gray-600 group-hover:text-blue-600 mx-auto mb-2 transition-colors" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {company}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Placement Process */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Placement Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Registration</h3>
              <p className="text-gray-600">Students register for placement training and create their profiles</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Training</h3>
              <p className="text-gray-600">Comprehensive training on aptitude, technical skills, and soft skills</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Campus Drives</h3>
              <p className="text-gray-600">Companies visit campus for recruitment drives and interviews</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Selection</h3>
              <p className="text-gray-600">Final selection and offer letters are distributed to successful candidates</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-900 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Target className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            Ready for Your Dream Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our placement program and get placed in top companies with exceptional packages
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
