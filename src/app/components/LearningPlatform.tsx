import { useState } from 'react';
import { BookOpen, Video, FileText, Award, Clock, CheckCircle, Play, Download, Search, Filter, Users } from 'lucide-react';

type CourseCategory = 'livestock' | 'crops' | 'business' | 'technology' | 'safety';
type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
type CourseStatus = 'not-started' | 'in-progress' | 'completed';

interface Course {
  id: number;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  description: string;
  instructor: string;
  modules: number;
  enrolled: number;
  rating: number;
  thumbnail: string;
  progress?: number;
  status: CourseStatus;
}

interface Module {
  id: number;
  courseId: number;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  completed: boolean;
}

export function LearningPlatform() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CourseCategory>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | CourseLevel>('all');
  const [viewMode, setViewMode] = useState<'courses' | 'my-learning'>('courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const courses: Course[] = [
    {
      id: 1,
      title: 'Modern Poultry Farming in Uganda',
      category: 'livestock',
      level: 'beginner',
      duration: '4 hours',
      description: 'Learn best practices for raising chickens, managing layers, and maximizing egg production in Ugandan conditions.',
      instructor: 'Dr. Samuel Mukasa',
      modules: 8,
      enrolled: 45,
      rating: 4.8,
      thumbnail: '🐔',
      progress: 60,
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Sustainable Crop Production',
      category: 'crops',
      level: 'intermediate',
      duration: '6 hours',
      description: 'Master sustainable farming techniques for maize, beans, and other staple crops. Focus on soil health and organic methods.',
      instructor: 'Agnes Nambi',
      modules: 10,
      enrolled: 38,
      rating: 4.9,
      thumbnail: '🌾',
      status: 'not-started'
    },
    {
      id: 3,
      title: 'Farm Business Management',
      category: 'business',
      level: 'intermediate',
      duration: '5 hours',
      description: 'Learn to manage farm finances, track expenses, price products competitively, and grow your agribusiness.',
      instructor: 'David Wasswa',
      modules: 7,
      enrolled: 52,
      rating: 4.7,
      thumbnail: '💼',
      progress: 100,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Pig Farming for Profit',
      category: 'livestock',
      level: 'beginner',
      duration: '3 hours',
      description: 'Complete guide to pig farming including breeding, feeding, disease prevention, and market strategies.',
      instructor: 'Mary Auma',
      modules: 6,
      enrolled: 29,
      rating: 4.6,
      thumbnail: '🐷',
      status: 'not-started'
    },
    {
      id: 5,
      title: 'Digital Farm Management Tools',
      category: 'technology',
      level: 'beginner',
      duration: '2 hours',
      description: 'Learn to use mobile apps, farm management software, and digital tools to improve farm efficiency.',
      instructor: 'John Okello',
      modules: 4,
      enrolled: 67,
      rating: 4.9,
      thumbnail: '📱',
      progress: 25,
      status: 'in-progress'
    },
    {
      id: 6,
      title: 'Organic Vegetable Production',
      category: 'crops',
      level: 'intermediate',
      duration: '5 hours',
      description: 'Grow high-value organic vegetables for urban markets. Covers tomatoes, onions, cabbage, and more.',
      instructor: 'Sarah Nakato',
      modules: 9,
      enrolled: 41,
      rating: 4.8,
      thumbnail: '🥬',
      status: 'not-started'
    },
    {
      id: 7,
      title: 'Livestock Disease Prevention',
      category: 'livestock',
      level: 'advanced',
      duration: '4 hours',
      description: 'Advanced course on identifying, preventing, and managing common livestock diseases in tropical climates.',
      instructor: 'Dr. James Mugisha',
      modules: 8,
      enrolled: 33,
      rating: 4.9,
      thumbnail: '💉',
      status: 'not-started'
    },
    {
      id: 8,
      title: 'Farm Safety & Worker Protection',
      category: 'safety',
      level: 'beginner',
      duration: '2 hours',
      description: 'Essential safety practices for farm workers including handling equipment, chemicals, and emergency procedures.',
      instructor: 'Grace Nambi',
      modules: 5,
      enrolled: 58,
      rating: 4.7,
      thumbnail: '⚠️',
      status: 'not-started'
    },
    {
      id: 9,
      title: 'Value Addition for Farm Products',
      category: 'business',
      level: 'advanced',
      duration: '6 hours',
      description: 'Transform raw farm produce into higher-value products. Learn processing, packaging, and branding.',
      instructor: 'David Wasswa',
      modules: 11,
      enrolled: 26,
      rating: 4.8,
      thumbnail: '📦',
      status: 'not-started'
    },
    {
      id: 10,
      title: 'Climate-Smart Agriculture',
      category: 'crops',
      level: 'advanced',
      duration: '5 hours',
      description: 'Adapt your farming practices to climate change with drought-resistant crops and water conservation.',
      instructor: 'Dr. Samuel Mukasa',
      modules: 9,
      enrolled: 31,
      rating: 4.9,
      thumbnail: '🌍',
      status: 'not-started'
    }
  ];

  const sampleModules: Module[] = [
    {
      id: 1,
      courseId: 1,
      title: 'Introduction to Poultry Farming',
      type: 'video',
      duration: '15 min',
      completed: true
    },
    {
      id: 2,
      courseId: 1,
      title: 'Choosing the Right Chicken Breed',
      type: 'reading',
      duration: '20 min',
      completed: true
    },
    {
      id: 3,
      courseId: 1,
      title: 'Housing and Infrastructure',
      type: 'video',
      duration: '30 min',
      completed: true
    },
    {
      id: 4,
      courseId: 1,
      title: 'Feeding and Nutrition',
      type: 'video',
      duration: '25 min',
      completed: true
    },
    {
      id: 5,
      courseId: 1,
      title: 'Quiz: Poultry Basics',
      type: 'quiz',
      duration: '10 min',
      completed: true
    },
    {
      id: 6,
      courseId: 1,
      title: 'Disease Prevention and Management',
      type: 'video',
      duration: '35 min',
      completed: false
    },
    {
      id: 7,
      courseId: 1,
      title: 'Egg Production Optimization',
      type: 'reading',
      duration: '20 min',
      completed: false
    },
    {
      id: 8,
      courseId: 1,
      title: 'Final Assessment',
      type: 'quiz',
      duration: '15 min',
      completed: false
    }
  ];

  const getCategoryColor = (category: CourseCategory) => {
    switch (category) {
      case 'livestock': return 'bg-blue-100 text-blue-700';
      case 'crops': return 'bg-green-100 text-green-700';
      case 'business': return 'bg-purple-100 text-purple-700';
      case 'technology': return 'bg-orange-100 text-orange-700';
      case 'safety': return 'bg-red-100 text-red-700';
    }
  };

  const getLevelColor = (level: CourseLevel) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
    }
  };

  const getModuleIcon = (type: Module['type']) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Award className="w-4 h-4" />;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (viewMode === 'my-learning') {
      return matchesCategory && matchesLevel && matchesSearch && course.status !== 'not-started';
    }
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const myCourses = courses.filter(c => c.status !== 'not-started');
  const completedCourses = courses.filter(c => c.status === 'completed').length;
  const inProgressCourses = courses.filter(c => c.status === 'in-progress').length;
  const totalHoursLearned = myCourses.reduce((sum, c) => {
    const hours = parseFloat(c.duration);
    const progress = c.progress || 0;
    return sum + (hours * progress / 100);
  }, 0);

  const handleEnrollCourse = (course: Course) => {
    alert(`Enroll in "${course.title}"\n\nIn production, this would:\n1. Add course to your learning dashboard\n2. Unlock all course modules\n3. Track your progress\n4. Award certificate upon completion`);
  };

  const handleStartModule = (module: Module) => {
    alert(`Start Module: "${module.title}"\n\nIn production, this would:\n- Play video lessons\n- Display reading materials\n- Present interactive quizzes\n- Track completion progress`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Learning Platform</h1>
          <p className="text-gray-600">Enhance your farming skills with expert-led courses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Award className="w-4 h-4" />
          My Certificates
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Enrolled Courses</p>
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-semibold mb-1">{myCourses.length}</p>
          <p className="text-blue-600 text-sm">{inProgressCourses} in progress</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Completed</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="font-semibold mb-1">{completedCourses}</p>
          <p className="text-green-600 text-sm">Certificates earned</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Learning Hours</p>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="font-semibold mb-1">{totalHoursLearned.toFixed(1)} hrs</p>
          <p className="text-purple-600 text-sm">Total time learned</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Available Courses</p>
            <Video className="w-5 h-5 text-orange-600" />
          </div>
          <p className="font-semibold mb-1">{courses.length}</p>
          <p className="text-orange-600 text-sm">Browse catalog</p>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {(['courses', 'my-learning'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                viewMode === mode
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode === 'courses' ? 'Browse Courses' : 'My Learning'}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="livestock">Livestock</option>
              <option value="crops">Crops</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="safety">Safety</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 text-center">
              <div className="text-6xl mb-2">{course.thumbnail}</div>
              <div className="flex gap-2 justify-center">
                <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getCategoryColor(course.category)}`}>
                  {course.category}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} • {course.modules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>⭐ {course.rating} • {course.enrolled} enrolled</span>
                </div>
              </div>

              {course.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (course.status === 'not-started') {
                    handleEnrollCourse(course);
                  } else {
                    setSelectedCourse(course);
                  }
                }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  course.status === 'not-started'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : course.status === 'completed'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {course.status === 'not-started' ? (
                  <>
                    <Plus className="w-4 h-4" />
                    Enroll Now
                  </>
                ) : course.status === 'completed' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    View Course
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Continue Learning
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-4xl mb-3">{selectedCourse.thumbnail}</div>
                <h2 className="font-semibold mb-2">{selectedCourse.title}</h2>
                <p className="text-gray-600 mb-3">{selectedCourse.description}</p>
                <div className="flex gap-2 mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getCategoryColor(selectedCourse.category)}`}>
                    {selectedCourse.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getLevelColor(selectedCourse.level)}`}>
                    {selectedCourse.level}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Course Modules</h3>
              <div className="space-y-2">
                {sampleModules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => handleStartModule(module)}
                    className={`w-full flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                      module.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      module.completed ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {module.completed ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{module.title}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          {getModuleIcon(module.type)}
                          {module.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                      </div>
                    </div>
                    <Play className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleStartModule(sampleModules.find(m => !m.completed) || sampleModules[0]);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                {selectedCourse.status === 'not-started' ? 'Start Course' : 'Continue Learning'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Learning Resources */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
        <h2 className="font-semibold mb-4">Additional Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Farming Guides</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Downloadable PDF guides on various farming topics</p>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold">
              <Download className="w-4 h-4" />
              Browse Guides
            </button>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Video Library</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Short tutorial videos for quick learning</p>
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-semibold">
              <Play className="w-4 h-4" />
              Watch Videos
            </button>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Community Forum</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Connect with other farmers and share knowledge</p>
            <button className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold">
              <BookOpen className="w-4 h-4" />
              Join Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
