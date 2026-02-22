@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-dark-950 text-dark-300;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background-image: radial-gradient(circle at 50% 0%, rgba(115, 115, 115, 0.03) 0%, transparent 50%);
  }
  
  ::-webkit-scrollbar {
    @apply w-2 h-2;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-dark-900;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-gradient-to-b from-accent-ash to-accent-smoke rounded-full;
  }
}

@layer components {
  .glass-effect {
    @apply bg-dark-900/50 backdrop-blur-xl border border-dark-800/50 shadow-2xl
           hover:border-accent-ash/30 transition-all duration-500;
  }
  
  .glass-card {
    @apply bg-dark-900/40 backdrop-blur-md border border-dark-800/50 
           hover:border-accent-ash/40 hover:bg-dark-900/60
           transition-all duration-500 hover:shadow-2xl 
           hover:shadow-accent-ash/10 hover:-translate-y-1;
  }
  
  .hover-glow {
    @apply hover:shadow-lg hover:shadow-accent-ash/30 hover:-translate-y-0.5 
           transition-all duration-300;
  }
  
  .text-gradient {
    @apply bg-gradient-to-r from-accent-ash via-accent-smoke to-accent-silver 
           bg-clip-text text-transparent bg-size-200 animate-gradient
           font-bold;
  }
  
  .text-gradient-secondary {
    @apply bg-gradient-to-r from-accent-graphite to-accent-charcoal 
           bg-clip-text text-transparent bg-size-200 animate-gradient;
  }
  
  .card-hover {
    @apply transform hover:scale-105 hover:-translate-y-2 transition-all duration-500
           hover:shadow-2xl hover:shadow-accent-ash/20;
  }
  
  .btn-primary {
    @apply px-6 py-3 bg-gradient-to-r from-accent-ash to-accent-smoke 
           text-white font-bold rounded-xl relative overflow-hidden
           hover:shadow-xl hover:shadow-accent-ash/40 hover:scale-105 
           transition-all duration-300 disabled:opacity-50 
           disabled:cursor-not-allowed;
  }
  
  .btn-primary::before {
    content: '';
    @apply absolute inset-0 bg-white/20 translate-x-[-100%] 
           hover:translate-x-100 transition-transform duration-700;
  }
  
  .btn-primary::after {
    content: '';
    @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
           translate-x-[-100%] hover:translate-x-100 transition-transform duration-1000;
  }
  
  .btn-secondary {
    @apply px-6 py-3 bg-dark-800/80 hover:bg-dark-700 text-dark-300 
           font-semibold rounded-xl border border-dark-700 
           hover:border-accent-ash/50 transition-all duration-300 
           hover:scale-105 hover:shadow-lg hover:shadow-accent-ash/20
           backdrop-blur-sm;
  }
  
  .input-field {
    @apply w-full px-5 py-4 bg-dark-800/50 border border-dark-700 rounded-xl 
           focus:outline-none focus:ring-2 focus:ring-accent-ash/50 
           focus:border-accent-ash focus:bg-dark-800/80
           transition-all duration-300 text-dark-300 placeholder-dark-500;
  }
  
  .sidebar-link {
    @apply flex items-center space-x-3 px-4 py-3 text-dark-400 
           hover:bg-gradient-to-r hover:from-accent-ash/10 hover:to-transparent 
           rounded-xl transition-all duration-300 hover:text-accent-ash
           hover:translate-x-1 relative overflow-hidden;
  }
  
  .sidebar-link::after {
    content: '';
    @apply absolute left-0 top-0 h-full w-1 bg-gradient-to-b 
           from-accent-ash to-accent-smoke scale-y-0 
           hover:scale-y-100 transition-transform duration-300;
  }
  
  .sidebar-link.active {
    @apply bg-gradient-to-r from-accent-ash/20 to-transparent 
           text-accent-ash border-l-4 border-accent-ash;
  }
  
  .sidebar-link.active::after {
    @apply scale-y-100;
  }
  
  .premium-card {
    @apply bg-gradient-to-br from-dark-900 to-dark-800 
           border border-dark-800/80 rounded-2xl p-6
           hover:border-accent-ash/40 hover:shadow-2xl 
           hover:shadow-accent-ash/20 transition-all duration-500
           relative overflow-hidden;
  }
  
  .premium-card::before {
    content: '';
    @apply absolute inset-0 bg-gradient-to-r from-accent-ash/5 via-transparent to-transparent
           opacity-0 hover:opacity-100 transition-opacity duration-500;
  }
  
  .badge {
    @apply px-3 py-1 rounded-full text-sm font-medium;
  }
  
  .badge-ash {
    @apply bg-accent-ash/10 text-accent-ash border border-accent-ash/30;
  }
  
  .badge-smoke {
    @apply bg-accent-smoke/10 text-accent-smoke border border-accent-smoke/30;
  }
  
  .badge-silver {
    @apply bg-accent-silver/10 text-accent-silver border border-accent-silver/30;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-glow {
    animation: glow 2.5s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
  
  .bg-size-200 {
    background-size: 200% 200%;
  }
  
  .translate-x-100 {
    --tw-translate-x: 100%;
  }
}

/* Interactive Loading States */
.loading-pulse {
  @apply relative overflow-hidden;
}

.loading-pulse::after {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
         translate-x-[-100%] animate-shimmer;
}

/* Hover Card Effects */
.hover-card {
  @apply transition-all duration-300 hover:scale-105 hover:-translate-y-1
         hover:shadow-2xl hover:shadow-accent-ash/20;
}

/* Gradient Borders */
.gradient-border {
  @apply relative;
}

.gradient-border::before {
  content: '';
  @apply absolute -inset-0.5 bg-gradient-to-r from-accent-ash to-accent-smoke 
         rounded-2xl opacity-0 transition-opacity duration-300 -z-10;
}

.gradient-border:hover::before {
  @apply opacity-100;
}

/* Stats Cards */
.stat-card {
  @apply bg-dark-900/50 rounded-xl p-6 text-center
         border border-dark-800 hover:border-accent-ash/40
         transition-all duration-300 hover:-translate-y-1
         hover:shadow-xl hover:shadow-accent-ash/10;
}

/* Video Card Enhancements */
.video-card {
  @apply relative overflow-hidden rounded-2xl bg-dark-900
         border border-dark-800 transition-all duration-500
         hover:scale-105 hover:-translate-y-2 hover:border-accent-ash/50
         hover:shadow-2xl hover:shadow-accent-ash/20;
}

.video-card-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent
         opacity-0 hover:opacity-100 transition-opacity duration-500;
}

.video-card-play {
  @apply absolute inset-0 flex items-center justify-center
         opacity-0 hover:opacity-100 transition-all duration-500
         transform hover:scale-100 scale-50;
}

/* Progress Bar */
.progress-bar {
  @apply h-1 bg-dark-800 rounded-full overflow-hidden;
}

.progress-bar-fill {
  @apply h-full bg-gradient-to-r from-accent-ash to-accent-smoke
         transition-all duration-300;
}

/* Tooltip */
.tooltip {
  @apply absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2
         px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded
         opacity-0 group-hover:opacity-100 transition-opacity duration-300
         pointer-events-none whitespace-nowrap;
}

/* Floating Action Button */
.fab {
  @apply fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-accent-ash to-accent-smoke
         rounded-full flex items-center justify-center text-white
         shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300
         animate-pulse-glow;
}

/* Loading Skeleton */
.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(115, 115, 115, 0.1) 50%,
    transparent 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2.5s infinite;
}

/* Divider */
.divider {
  @apply h-px bg-gradient-to-r from-transparent via-accent-ash/30 to-transparent my-8;
}

/* Focus Ring */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-accent-ash/50 focus:ring-offset-2 
         focus:ring-offset-dark-950 transition-all duration-300;
}