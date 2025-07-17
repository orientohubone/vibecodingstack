import React, { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Star,
  Calendar,
  Users,
  Code,
  Globe,
  Zap,
  Eye,
  GitBranch,
  Activity,
} from "lucide-react";

// Função utilitária para unir classes
function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Corrigido: Tipagem explícita no parâmetro 'currentTime'
function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(
        startValue + (endValue - startValue) * progress
      );
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}</span>;
}


// Glowing card component
function GlowingCard({ children, className = '', theme = 'dark' }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  const cardClasses = theme === 'light' ? 
    cn(
      "relative group rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg",
      "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
      "before:bg-gradient-to-r before:from-blue-500/30 before:via-purple-500/30 before:to-cyan-500/30",
      "before:opacity-0 before:transition-opacity before:duration-300",
      "hover:before:opacity-100 hover:shadow-xl",
      "overflow-hidden",
      "transition-all duration-300 hover:scale-[1.02]",
      className
    ) :
    cn(
      "relative group rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm",
      "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
      "before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-cyan-500/20",
      "before:opacity-0 before:transition-opacity before:duration-300",
      "hover:before:opacity-100",
      "overflow-hidden",
      "transition-all duration-300 hover:scale-[1.02]",
      className
    );
  
  const contentClasses = theme === 'light' ? 
    "relative z-10 bg-white rounded-xl h-full" :
    "relative z-10 bg-gray-900 rounded-xl h-full";
  
  return (
    <div 
      ref={cardRef} 
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, theme = 'dark' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = (status) => {
    if (theme === 'light') {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800 border-green-200';
        case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else {
      switch (status) {
        case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      }
    }
  };
  
  const techColorMap = theme === 'light' ? {
    'React': 'bg-blue-100 text-blue-800 border-blue-200',
    'Next.js': 'bg-gray-100 text-gray-800 border-gray-200',
    'Node.js': 'bg-green-100 text-green-800 border-green-200',
    'TypeScript': 'bg-blue-200 text-blue-900 border-blue-300',
    'Python': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Vue.js': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'MongoDB': 'bg-green-200 text-green-800 border-green-300',
    'PostgreSQL': 'bg-blue-200 text-blue-800 border-blue-300',
    'Firebase': 'bg-orange-100 text-orange-800 border-orange-200',
    'AWS': 'bg-orange-200 text-orange-800 border-orange-300',
    'Docker': 'bg-blue-200 text-blue-800 border-blue-300',
    'GraphQL': 'bg-pink-100 text-pink-800 border-pink-200',
    'Tailwind': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Supabase': 'bg-emerald-200 text-emerald-800 border-emerald-300',
    'OpenAI': 'bg-purple-100 text-purple-800 border-purple-200',
    'FastAPI': 'bg-teal-100 text-teal-800 border-teal-200',
    'Socket.io': 'bg-gray-200 text-gray-800 border-gray-300',
    'Vercel': 'bg-black text-white border-gray-800',
  } : {
    'React': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Next.js': 'bg-white/20 text-white border-white/30',
    'Node.js': 'bg-green-500/20 text-green-400 border-green-500/30',
    'TypeScript': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
    'Python': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Vue.js': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'MongoDB': 'bg-green-600/20 text-green-400 border-green-600/30',
    'PostgreSQL': 'bg-blue-700/20 text-blue-300 border-blue-700/30',
    'Firebase': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'AWS': 'bg-orange-400/20 text-orange-300 border-orange-400/30',
    'Docker': 'bg-blue-400/20 text-blue-300 border-blue-400/30',
    'GraphQL': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    'Tailwind': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'Supabase': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30',
    'OpenAI': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'FastAPI': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    'Socket.io': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'Vercel': 'bg-black/20 text-white border-white/30',
  };
  
  return (
    <div 
      className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] hover:translate-y-[-4px] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlowingCard className="h-full" theme={theme}>
        <div className="p-6 h-full flex">
          {/* Image Section */}
          {project.image && (
            <div className="flex-shrink-0 w-48 mr-6">
              <div className="relative overflow-hidden rounded-lg group h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover min-h-[200px] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.liveUrl && (
                    <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                      <Github className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                {project.stars && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white"><AnimatedCounter value={project.stars} /></span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={cn("text-xl font-bold mb-2 line-clamp-2", theme === 'light' ? 'text-gray-900' : 'text-white')}>
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  {project.category && (
                    <span className={cn("px-2 py-1 rounded-md border", theme === 'light' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-purple-500/20 text-purple-400 border-purple-500/30')}>
                      {project.category}
                    </span>
                  )}
                  {project.status && (
                    <span className={cn("px-2 py-1 rounded-md border", getStatusColor(project.status))}>
                      {project.status.replace('-', ' ')}
                    </span>
                  )}
                </div>
              </div>
              
              {!project.image && project.stars && (
                <div className={cn("flex items-center gap-1 text-sm", theme === 'light' ? 'text-gray-600' : 'text-gray-400')}>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <AnimatedCounter value={project.stars} />
                </div>
              )}
            </div>
            
            {/* Description */}
            <p className={cn("text-sm leading-relaxed mb-4 flex-1", theme === 'light' ? 'text-gray-700' : 'text-gray-300')}>
              {project.description}
            </p>
            
            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, isExpanded ? undefined : 6).map((tech, index) => (
                  <span
                    key={tech.name}
                    className={cn(
                      "px-2 py-1 rounded-md text-xs border font-medium opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]",
                      techColorMap[tech.name] || (theme === 'light' ? "bg-gray-100 text-gray-800 border-gray-200" : "bg-gray-500/20 text-gray-400 border-gray-500/30")
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {tech.name}
                  </span>
                ))}
                {!isExpanded && project.technologies.length > 6 && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className={cn(
                      "px-2 py-1 rounded-md text-xs border transition-colors hover:scale-105",
                      theme === 'light' 
                        ? "border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400" 
                        : "border-gray-500/30 text-gray-400 hover:text-white hover:border-gray-400/50"
                    )}
                  >
                    +{project.technologies.length - 6} more
                  </button>
                )}
              </div>
            </div>
            
            {/* Expandable content */}
            {isExpanded && (
              <div className="space-y-4 mb-4 animate-[fadeIn_0.3s_ease-out]">
                {/* Project metadata */}
                <div className={cn("grid grid-cols-2 gap-4 text-sm", theme === 'light' ? 'text-gray-600' : 'text-gray-400')}>
                  {project.createdAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.contributors && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.contributors} contributors</span>
                    </div>
                  )}
                  {project.commits && (
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      <span>{project.commits} commits</span>
                    </div>
                  )}
                  {project.views && (
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{project.views} views</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all text-sm hover:scale-105 active:scale-95",
                      theme === 'light' 
                        ? "bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300" 
                        : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:text-white hover:border-gray-600/50"
                    )}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all text-sm hover:scale-105 active:scale-95",
                      theme === 'light' 
                        ? "bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-900 hover:border-blue-300" 
                        : "bg-blue-500/20 border-blue-500/30 text-blue-400 hover:text-blue-300 hover:border-blue-400/50"
                    )}
                  >
                    <Globe className="w-4 h-4" />
                    Live
                  </a>
                )}
              </div>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "flex items-center gap-1 text-sm transition-all hover:scale-105",
                  theme === 'light' 
                    ? "text-gray-600 hover:text-gray-900" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {isExpanded ? 'Less' : 'More'}
                <div 
                  className={cn(
                    "transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                >
                  <Zap className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </GlowingCard>
    </div>
  );
}

// Main ProjectShowcase Component
function ProjectShowcase({ projects = [], className, columns = 2, showFilters = true }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Default projects with VibeCoding style
  const defaultProjects = [
    {
      id: "1",
      title: "VibeCoding Stack Platform",
      description: "Plataforma colaborativa para desenvolvedores com stack moderno, integração com IAs e deploy automatizado. Inclui autenticação, banco de dados em tempo real e CI/CD.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      technologies: [
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Supabase" },
        { name: "Tailwind" },
        { name: "Vercel" }
      ],
      githubUrl: "https://github.com/vibecodingstack/platform",
      liveUrl: "https://vibecodingstack.netlify.app/",
      stars: 342,
      category: "Full Stack",
      status: "completed",
      createdAt: "2024-01-15",
      contributors: 8,
      commits: 267,
      views: 1543
    },
    {
      id: "2",
      title: "AI Code Assistant",
      description: "Assistente de código com IA integrada usando Claude e GPT-4. Suporte a múltiplas linguagens, análise de código e sugestões inteligentes em tempo real.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      technologies: [
        { name: "React" },
        { name: "Python" },
        { name: "OpenAI" },
        { name: "FastAPI" },
        { name: "Docker" }
      ],
      githubUrl: "https://github.com/vibecodingstack/ai-assistant",
      liveUrl: "https://ai-assistant-demo.vibecodingstack.com",
      stars: 189,
      category: "AI/ML",
      status: "in-progress",
      createdAt: "2024-02-20",
      contributors: 3,
      commits: 156,
      views: 892
    },
    {
      id: "3",
      title: "Real-time Chat System",
      description: "Sistema de chat em tempo real com WebSocket, salas privadas, compartilhamento de código e integração com ferramentas de desenvolvimento.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      technologies: [
        { name: "Node.js" },
        { name: "Socket.io" },
        { name: "React" },
        { name: "MongoDB" },
        { name: "AWS" }
      ],
      githubUrl: "https://github.com/vibecodingstack/realtime-chat",
      liveUrl: "https://chat.vibecodingstack.com",
      stars: 156,
      category: "Backend",
      status: "completed",
      createdAt: "2024-03-10",
      contributors: 5,
      commits: 234,
      views: 1205
    },
    {
      id: "4",
      title: "Project Analytics Dashboard",
      description: "Dashboard avançado para análise de projetos com métricas em tempo real, visualizações interativas e relatórios automatizados.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      technologies: [
        { name: "Vue.js" },
        { name: "TypeScript" },
        { name: "PostgreSQL" },
        { name: "GraphQL" },
        { name: "Docker" }
      ],
      githubUrl: "https://github.com/vibecodingstack/analytics",
      liveUrl: "https://analytics.vibecodingstack.com",
      stars: 203,
      category: "Data Science",
      status: "planning",
      createdAt: "2024-04-05",
      contributors: 4,
      commits: 89,
      views: 673
    }
  ];
  
  const projectsToShow = projects.length > 0 ? projects : defaultProjects;
  const categories = ['all', ...Array.from(new Set(projectsToShow.map(p => p.category).filter(Boolean)))];
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projectsToShow);
    } else {
      setFilteredProjects(projectsToShow.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);
  
  const getGridCols = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };
  
  return (
    <div className={cn("w-full min-h-screen bg-gray-950", className)}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore nossos projetos desenvolvidos com tecnologias modernas e stack colaborativo
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
          {[
            { label: 'Projetos Ativos', value: filteredProjects.length, icon: Activity },
            { label: 'Total Stars', value: filteredProjects.reduce((acc, p) => acc + (p.stars || 0), 0), icon: Star },
            { label: 'Contributors', value: filteredProjects.reduce((acc, p) => acc + (p.contributors || 0), 0), icon: Users },
            { label: 'Total Views', value: filteredProjects.reduce((acc, p) => acc + (p.views || 0), 0), icon: Eye },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800/50 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-8 opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-all duration-200 capitalize hover:scale-105",
                  selectedCategory === category
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    : "bg-gray-800/50 text-gray-400 border-gray-700/50 hover:text-white hover:border-gray-600/50"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {/* Projects Grid */}
        <div className={cn("grid gap-6 opacity-0 animate-[fadeIn_0.6s_ease-out_0.4s_forwards]", getGridCols())}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
            <p className="text-gray-400">Nenhum projeto encontrado para a categoria selecionada.</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ProjectShowcase;
