import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaCode, 
  FaChartLine, 
  FaBook,
  FaYoutube,
  FaPlayCircle,
  FaStar,
  FaUsers,
  FaInfinity,
  FaRocket,
  FaBrain,
  FaCertificate,
  FaClock,
  FaArrowRight
} from 'react-icons/fa';

const HomeEnhanced = () => {
  const categories = [
    { 
      icon: FaChartLine, 
      name: '12th Mathematics', 
      gradient: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      description: 'Complete 12th standard math curriculum',
      query: '12th maths',
      stats: '50+ videos'
    },
    { 
      icon: FaBrain, 
      name: 'Vivek Maths', 
      gradient: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      description: 'Expert guidance for competitive exams',
      query: 'vivek maths',
      stats: '100+ videos'
    },
    { 
      icon: FaGraduationCap, 
      name: 'Ram Maths', 
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      description: 'In-depth mathematical concepts',
      query: 'ram maths',
      stats: '75+ videos'
    },
    { 
      icon: FaStar, 
      name: 'Exam Preparation', 
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-400',
      description: 'Public exam 2026 strategies',
      query: 'public exam 2026',
      stats: '30+ videos'
    },
    { 
      icon: FaCertificate, 
      name: 'Centum Tips', 
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      description: 'Score 100/100 in exams',
      query: 'centum',
      stats: '25+ videos'
    },
    { 
      icon: FaBook, 
      name: '10th Mathematics', 
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      description: 'Foundation for higher studies',
      query: '10th maths',
      stats: '40+ videos'
    },
  ];

  const features = [
    {
      icon: FaRocket,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant search caching',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '24h cache'
    },
    {
      icon: FaBrain,
      title: 'Smart Learning',
      description: 'AI-powered recommendations based on your history',
      gradient: 'from-purple-500 to-pink-500',
      stats: 'Personalized'
    },
    {
      icon: FaInfinity,
      title: 'Unlimited Access',
      description: 'Watch any video, anytime, completely free',
      gradient: 'from-green-500 to-emerald-500',
      stats: 'No limits'
    },
    {
      icon: FaUsers,
      title: 'Study Together',
      description: 'Join thousands of students learning daily',
      gradient: 'from-orange-500 to-red-500',
      stats: 'Growing community'
    },
  ];

  const testimonials = [
    {
      name: 'Arjun K.',
      role: '12th Standard Student',
      content: 'Vivek Maths videos helped me score 98 in my board exams. The explanations are crystal clear!',
      rating: 5,
      avatar: '👨‍🎓'
    },
    {
      name: 'Priya S.',
      role: 'Engineering Aspirant',
      content: 'Ram Maths channel is a lifesaver for JEE preparation. Complex topics made simple.',
      rating: 5,
      avatar: '👩‍🎓'
    },
    {
      name: 'Karthik R.',
      role: 'Parent',
      content: 'My daughter improved her math grades significantly using StudyTube. Thank you!',
      rating: 5,
      avatar: '👨‍👧'
    },
  ];

  const stats = [
    { label: 'Educational Videos', value: '500+', icon: FaPlayCircle },
    { label: 'Active Students', value: '10K+', icon: FaUsers },
    { label: 'Hours of Content', value: '1000+', icon: FaClock },
    { label: 'Success Rate', value: '95%', icon: FaStar },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-900 to-dark-950 p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/30 via-accent-purple/30 to-accent-pink/30 animate-gradient"></div>
        <div className="relative glass-effect rounded-3xl p-12 lg:p-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Icon */}
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-accent-blue to-accent-purple 
                          rounded-3xl flex items-center justify-center animate-float shadow-2xl">
              <FaYoutube className="text-white text-5xl" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Master</span>
              <br />
              <span className="text-white">Mathematics & Science</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students preparing for board exams with curated content 
              from India's best educational channels. Free, forever.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/search?q=vivek maths" 
                className="btn-primary text-lg px-8 py-4 group"
              >
                Start Learning Now
                <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/search?q=12th maths" 
                className="btn-secondary text-lg px-8 py-4"
              >
                Browse 12th Maths
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card rounded-2xl p-6 text-center group 
                                        hover:scale-105 transition-all duration-500">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-accent-blue/20 
                            to-accent-purple/20 rounded-xl flex items-center justify-center
                            group-hover:scale-110 transition-transform">
                <Icon className="text-accent-blue text-xl" />
              </div>
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </section>

      {/* Categories Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient">Explore</span> by Topic
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our curated collection of educational content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={`/search?q=${category.query}`}
                className="group relative overflow-hidden rounded-2xl bg-dark-900 p-6 
                         hover:transform hover:scale-105 transition-all duration-500
                         border border-dark-800 hover:border-transparent"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} 
                                opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center 
                                justify-center mb-4 group-hover:scale-110 transition-transform duration-300
                                border ${category.borderColor}`}>
                  <Icon className={`text-3xl ${category.textColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                
                {/* Stats and CTA */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">{category.stats}</span>
                  <span className={`text-sm ${category.textColor} font-medium 
                                   group-hover:translate-x-2 transition-transform`}>
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-900 to-dark-950 p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 via-accent-blue/20 to-accent-pink/20 animate-gradient"></div>
        <div className="relative glass-effect rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Students <span className="text-gradient">Love Us</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to excel in your studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${feature.gradient} 
                                  rounded-2xl flex items-center justify-center
                                  group-hover:scale-110 group-hover:rotate-3 
                                  transition-all duration-500 shadow-xl`}>
                    <Icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{feature.description}</p>
                  <span className="text-xs bg-accent-blue/20 text-accent-blue 
                                 px-2 py-1 rounded-full">{feature.stats}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Students <span className="text-gradient">Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our growing community of successful learners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 hover:scale-105 
                                        transition-all duration-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-blue to-accent-purple 
                              rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
              <div className="flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink 
                      animate-gradient bg-size-200"></div>
        <div className="relative p-12 lg:p-20 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students who are already acing their exams with StudyTube
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/search?q=vivek maths" 
              className="px-8 py-4 bg-white text-accent-blue font-bold 
                       rounded-xl hover:shadow-2xl hover:scale-105 
                       transition-all duration-300 shadow-xl"
            >
              Get Started Free
            </Link>
            <Link 
              to="/search?q=12th maths" 
              className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white 
                       font-bold rounded-xl hover:bg-white/30 hover:scale-105
                       transition-all duration-300 border border-white/30"
            >
              Browse Content
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeEnhanced;