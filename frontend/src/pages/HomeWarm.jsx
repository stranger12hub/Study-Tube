import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
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
  FaArrowRight,
  FaFire,
  FaMedal,
  FaTrophy
} from 'react-icons/fa';

const HomeWarm = () => {
  const categories = [
    { 
      icon: FaChartLine, 
      name: '12th Mathematics', 
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      description: 'Master calculus, algebra & trigonometry',
      query: '12th maths',
      stats: '50+ videos',
      icon: FaChartLine
    },
    { 
      icon: FaBrain, 
      name: 'Vivek Maths', 
      gradient: 'from-gold-500 to-gold-600',
      bgColor: 'bg-gold-500/10',
      borderColor: 'border-gold-500/30',
      textColor: 'text-gold-400',
      description: 'Expert guidance for competitive exams',
      query: 'vivek maths',
      stats: '100+ videos',
      icon: FaBrain
    },
    { 
      icon: FaGraduationCap, 
      name: 'Ram Maths', 
      gradient: 'from-bronze-500 to-bronze-600',
      bgColor: 'bg-bronze-500/10',
      borderColor: 'border-bronze-500/30',
      textColor: 'text-bronze-400',
      description: 'In-depth mathematical concepts',
      query: 'ram maths',
      stats: '75+ videos',
      icon: FaGraduationCap
    },
    { 
      icon: FaStar, 
      name: 'Exam Preparation', 
      gradient: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      textColor: 'text-rose-400',
      description: 'Public exam 2026 strategies',
      query: 'public exam 2026',
      stats: '30+ videos',
      icon: FaStar
    },
    { 
      icon: FaCertificate, 
      name: 'Centum Tips', 
      gradient: 'from-copper-500 to-copper-600',
      bgColor: 'bg-copper-500/10',
      borderColor: 'border-copper-500/30',
      textColor: 'text-copper-400',
      description: 'Score 100/100 in exams',
      query: 'centum',
      stats: '25+ videos',
      icon: FaCertificate
    },
    { 
      icon: FaBook, 
      name: '10th Mathematics', 
      gradient: 'from-wine-500 to-wine-600',
      bgColor: 'bg-wine-500/10',
      borderColor: 'border-wine-500/30',
      textColor: 'text-wine-400',
      description: 'Foundation for higher studies',
      query: '10th maths',
      stats: '40+ videos',
      icon: FaBook
    },
  ];

  const features = [
    {
      icon: FaRocket,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant search caching',
      gradient: 'from-amber-500 to-gold-500',
      stats: '24h cache'
    },
    {
      icon: FaBrain,
      title: 'Smart Learning',
      description: 'AI-powered recommendations based on your history',
      gradient: 'from-gold-500 to-bronze-500',
      stats: 'Personalized'
    },
    {
      icon: FaInfinity,
      title: 'Unlimited Access',
      description: 'Watch any video, anytime, completely free',
      gradient: 'from-bronze-500 to-copper-500',
      stats: 'No limits'
    },
    {
      icon: FaUsers,
      title: 'Study Together',
      description: 'Join thousands of students learning daily',
      gradient: 'from-copper-500 to-rose-500',
      stats: '10K+ students'
    },
  ];

  const achievements = [
    { icon: FaTrophy, label: 'Top Rated', value: '4.9★', color: 'text-amber-400' },
    { icon: FaMedal, label: 'Success Rate', value: '95%', color: 'text-gold-400' },
    { icon: FaFire, label: 'Daily Active', value: '5K+', color: 'text-rose-400' },
    { icon: FaClock, label: 'Watch Time', value: '10K+ hrs', color: 'text-bronze-400' },
  ];

  const testimonials = [
    {
      name: 'Arjun K.',
      role: '12th Standard Student',
      content: 'Vivek Maths videos helped me score 98 in my board exams. The explanations are crystal clear!',
      rating: 5,
      avatar: '👨‍🎓',
      color: 'from-amber-500 to-gold-500'
    },
    {
      name: 'Priya S.',
      role: 'Engineering Aspirant',
      content: 'Ram Maths channel is a lifesaver for JEE preparation. Complex topics made simple.',
      rating: 5,
      avatar: '👩‍🎓',
      color: 'from-gold-500 to-bronze-500'
    },
    {
      name: 'Karthik R.',
      role: 'Parent',
      content: 'My daughter improved her math grades significantly using StudyTube. Thank you!',
      rating: 5,
      avatar: '👨‍👧',
      color: 'from-bronze-500 to-copper-500'
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Warm Gradient */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-900 to-dark-950 p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-gold-500/30 to-rose-500/30 animate-gradient"></div>
        <div className="relative glass-effect rounded-3xl p-12 lg:p-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Icon */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-gold-500 
                            rounded-3xl animate-pulse-glow opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-gold-500 
                            rounded-3xl animate-ping opacity-30"></div>
              <div className="relative w-32 h-32 bg-gradient-to-r from-amber-500 to-gold-500 
                            rounded-3xl flex items-center justify-center shadow-2xl
                            transform hover:scale-110 transition-transform duration-500">
                <FaYoutube className="text-dark-950 text-6xl animate-flicker" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Master</span>
              <br />
              <span className="text-dark-100">Mathematics & Science</span>
            </h1>
            
            <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students preparing for board exams with curated content 
              from India's best educational channels. Free, forever.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/search?q=vivek maths" 
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-gold-500 
                         text-dark-950 font-bold rounded-xl overflow-hidden
                         hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-105 
                         transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Learning Now
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] 
                              group-hover:translate-x-100 transition-transform duration-700"></div>
              </Link>
              
              <Link 
                to="/search?q=12th maths" 
                className="px-8 py-4 bg-dark-800/80 hover:bg-dark-700 text-dark-200 
                         font-bold rounded-xl border border-dark-700 
                         hover:border-amber-500/50 transition-all duration-300 
                         hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20
                         backdrop-blur-sm"
              >
                Browse 12th Maths
              </Link>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {achievements.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className={`text-4xl ${item.color} mb-2 group-hover:scale-110 
                                    transition-transform duration-300`}>
                      <Icon />
                    </div>
                    <div className="text-2xl font-bold text-gradient">{item.value}</div>
                    <div className="text-sm text-dark-400">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient">Explore</span> by Topic
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Choose from our curated collection of educational content
          </p>
          <div className="divider w-24 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={`/search?q=${category.query}`}
                className="group relative overflow-hidden rounded-2xl bg-dark-900/50 
                         backdrop-blur-sm border border-dark-800/50 p-6
                         hover:border-amber-500/40 hover:bg-dark-900/80
                         transition-all duration-500 hover:-translate-y-2
                         hover:shadow-2xl hover:shadow-amber-500/20"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} 
                                opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center 
                                justify-center mb-4 group-hover:scale-110 
                                group-hover:rotate-3 transition-all duration-300
                                border ${category.borderColor}`}>
                  <Icon className={`text-3xl ${category.textColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 
                             transition-colors">
                  {category.name}
                </h3>
                <p className="text-dark-400 text-sm mb-3">{category.description}</p>
                
                {/* Stats and CTA */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-dark-500">{category.stats}</span>
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
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-gold-500/20 to-rose-500/20 animate-gradient"></div>
        <div className="relative glass-effect rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Students <span className="text-gradient">Love Us</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Everything you need to excel in your studies
            </p>
            <div className="divider w-24 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`relative w-20 h-20 mx-auto mb-4`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} 
                                  rounded-2xl opacity-20 group-hover:opacity-30 
                                  transition-opacity duration-500`}></div>
                    <div className={`relative w-20 h-20 bg-gradient-to-r ${feature.gradient} 
                                  rounded-2xl flex items-center justify-center
                                  group-hover:scale-110 group-hover:rotate-3 
                                  transition-all duration-500 shadow-xl`}>
                      <Icon className="text-dark-950 text-3xl" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-400 
                               transition-colors">{feature.title}</h3>
                  <p className="text-dark-400 text-sm mb-2">{feature.description}</p>
                  <span className="text-xs bg-amber-500/10 text-amber-400 
                                 px-2 py-1 rounded-full border border-amber-500/30">
                    {feature.stats}
                  </span>
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
          <p className="text-dark-400 max-w-2xl mx-auto">
            Join our growing community of successful learners
          </p>
          <div className="divider w-24 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl bg-dark-900/50 
                       backdrop-blur-sm border border-dark-800/50 p-6
                       hover:border-amber-500/40 hover:bg-dark-900/80
                       transition-all duration-500 hover:-translate-y-2
                       hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} 
                              opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${testimonial.color} 
                              rounded-2xl flex items-center justify-center text-3xl
                              group-hover:scale-110 transition-transform duration-300`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-dark-400">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-dark-300 mb-4 italic">"{testimonial.content}"</p>
              
              <div className="flex text-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="animate-pulse-slow" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-gold-500 to-rose-500 
                      animate-gradient bg-size-200"></div>
        <div className="relative p-12 lg:p-20 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-dark-950 mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-dark-800 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students who are already acing their exams with StudyTube
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/search?q=vivek maths" 
              className="group relative px-8 py-4 bg-dark-950 text-amber-400 
                       font-bold rounded-xl overflow-hidden
                       hover:shadow-2xl hover:shadow-dark-950/50 hover:scale-105 
                       transition-all duration-300 border-2 border-dark-950"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <Link 
              to="/search?q=12th maths" 
              className="px-8 py-4 bg-white/20 backdrop-blur-lg text-dark-950 
                       font-bold rounded-xl hover:bg-white/30 hover:scale-105
                       transition-all duration-300 border-2 border-dark-950"
            >
              Browse Content
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeWarm;