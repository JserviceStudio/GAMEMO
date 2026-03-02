import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ChevronLeft,
  Users,
  Sun,
  Moon,
  Fingerprint,
  Sparkles,
  LayoutDashboard,
  Activity,
  TrendingUp,
  Settings,
  LogOut,
  Zap
} from 'lucide-react';

// --- Dashboard Component: Elite Refit ---

const DashboardPreview = ({ role }: { role: 'admin' | 'manager' }) => {
  const stats = [
    { label: 'Revenus', value: '1,240€', icon: TrendingUp, color: 'text-gaming-primary' },
    { label: 'Machines', value: '18/20', icon: Activity, color: 'text-gaming-accent' },
    { label: 'Staff', value: '4 Actifs', icon: Users, color: 'text-gaming-secondary' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-6 flex items-center justify-between group hover:bg-white/10"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-muted uppercase">{stat.label}</p>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-muted group-hover:text-white transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Zap size={40} className="text-gaming-primary opacity-20" />
        </div>
        <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Status Global</h3>
        <p className="text-muted text-sm mb-6">Votre établissement fonctionne à 92% de sa capacité optimale.</p>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '92%' }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-full bg-gradient-to-r from-gaming-primary to-gaming-secondary"
          />
        </div>
      </div>
    </div>
  );
};

const DashboardScreen = ({ role, theme, onLogout }: { role: 'admin' | 'manager', theme: 'dark' | 'light', onLogout: () => void, key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full flex flex-col p-8 pt-12"
    >
      <ParticleBackground theme={theme} />
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gaming-primary to-gaming-secondary flex items-center justify-center shadow-lg shadow-gaming-primary/20">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight uppercase">
              {role === 'admin' ? 'Propriétaire' : 'Manager'}
            </h2>
            <p className="text-[10px] font-black tracking-widest text-gaming-primary uppercase">Connecté</p>
          </div>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onLogout}
          className="w-14 h-14 glass-card flex items-center justify-center text-gaming-accent"
        >
          <LogOut size={24} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2">TABLEAU<br /><span className="text-gaming-primary">DE BORD</span></h1>
          <p className="text-muted font-medium">Résumé des activités en temps réel.</p>
        </div>

        <DashboardPreview role={role} />
      </div>

      {/* Floating Bottom Nav */}
      <div className="absolute bottom-8 left-8 right-8 h-20 glass-card flex items-center justify-around px-4">
        <button className="text-gaming-primary"><LayoutDashboard size={24} /></button>
        <button className="text-muted"><Activity size={24} /></button>
        <button className="text-muted"><TrendingUp size={24} /></button>
        <button className="text-muted"><Settings size={24} /></button>
      </div>
    </motion.div>
  );
};

// --- Performance: Particle Background (Canvas) ---

const ParticleBackground = ({ theme }: { theme: 'dark' | 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = 40;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="canvas-bg" />;
};

// --- UI Components: Elite Refit ---

const ThemeToggle = ({ theme, onToggle }: { theme: 'dark' | 'light', onToggle: (e: React.MouseEvent) => void }) => (
  <motion.button 
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
    onClick={onToggle}
    className="w-14 h-14 glass-card flex items-center justify-center active:scale-90 transition-transform z-50"
  >
    {theme === 'dark' ? (
      <Sun size={24} className="text-gaming-primary" />
    ) : (
      <Moon size={24} className="text-gaming-secondary" />
    )}
  </motion.button>
);

const SmartInput = ({ label, type, icon: Icon, colorClass }: { label: string, type: string, icon: any, colorClass: string }) => (
  <div className="smart-input-container group">
    <Icon className={`absolute left-6 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:${colorClass}`} size={20} />
    <input 
      type={type} 
      placeholder=" "
      className="smart-input pl-16"
    />
    <label className="smart-label left-16">{label}</label>
  </div>
);

// --- Background Elements: Brand Wall (Parallax) ---

const BrandWall = ({ theme }: { theme: 'dark' | 'light' }) => {
  const brands = [
    { id: 'sony', x: '15%', y: '10%', size: 50, path: "M21.6 13.2c-1.2 0-2.4-.4-3.6-.4-1.2 0-2.4.4-3.6.4-1.2 0-2.4-.4-3.6-.4s-2.4.4-3.6.4c-1.2 0-2.4-.4-3.6-.4v1.2c1.2 0 2.4.4 3.6.4 1.2 0 2.4-.4 3.6-.4 1.2 0 2.4.4 3.6.4 1.2 0 2.4-.4 3.6-.4 1.2 0 2.4.4 3.6.4v-1.2zM24 10.8c0-1.2-.4-2.4-.4-3.6 0-1.2.4-2.4.4-3.6h-1.2c0 1.2-.4 2.4-.4 3.6 0 1.2.4 2.4.4 3.6H24zM0 3.6c0 1.2.4 2.4.4 3.6 0 1.2-.4 2.4-.4 3.6h1.2c0-1.2.4-2.4.4-3.6 0-1.2-.4-2.4-.4-3.6H0z" },
    { id: 'nintendo', x: '75%', y: '15%', size: 60, path: "M50 10c-22.1 0-40 8.9-40 20s17.9 20 40 20 40-8.9 40-20-17.9-20-40-20zm0 35c-19.3 0-35-6.7-35-15s15.7-15 35-15 35 6.7 35 15-15.7 15-35 15z" },
    { id: 'xbox', x: '45%', y: '5%', size: 55, path: "M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm26.8 76.8c-2.4-2.4-14.4-12-26.8-12s-24.4 9.6-26.8 12c-4.8-4.8-8.4-10.8-10.4-17.2 2.4-2.4 12-14.4 12-26.8s-9.6-24.4-12-26.8c6.4-2 12.4-5.6 17.2-10.4 2.4 2.4 12 14.4 26.8 14.4s24.4-12 26.8-14.4c4.8 4.8 8.4 10.8 10.4 17.2-2.4 2.4-12 14.4-12 26.8s9.6 24.4 12 26.8c-6.4 2-12.4 5.6-17.2 10.4z" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)' }}>
      {brands.map((brand) => (
        <motion.div
          key={brand.id}
          className="absolute"
          style={{ top: brand.y, left: brand.x, color: 'var(--text-main)' }}
          animate={{
            y: [0, 15, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width={brand.size} height={brand.size} viewBox="0 0 100 100" className="fill-current">
            <path d={brand.path} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// --- Screens: Elite Refit ---

const MorphicRoleSelector = ({ theme, onThemeToggle, onSelectRole }: { theme: 'dark' | 'light', onThemeToggle: (e: React.MouseEvent) => void, onSelectRole: (role: 'admin' | 'manager', screen: 'login' | 'signup') => void, key?: string }) => {
  const [hoveredRole, setHoveredRole] = useState<'admin' | 'manager' | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
      className="h-full w-full flex flex-col items-center justify-between p-8 pt-12"
    >
      <ParticleBackground theme={theme} />
      <BrandWall theme={theme} />
      
      <div className="w-full flex justify-end mb-4">
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>

      <div className="flex flex-col items-center text-center w-full">
        <motion.div 
          layoutId="app-logo"
          className="w-28 h-28 bg-gradient-to-br from-gaming-primary via-gaming-secondary to-gaming-accent rounded-[40px] flex items-center justify-center mb-10 shadow-[0_25px_60px_rgba(0,242,255,0.4)]"
        >
          <Gamepad2 size={56} className="text-white" />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-7xl font-black tracking-tighter mb-4 leading-[0.85]">
            GAME<br />
            <span className="text-gaming-primary">M0</span>
          </h1>
          <p className="text-muted text-lg font-medium tracking-tight max-w-[280px]">
            L'élite du pilotage pour salles de jeux.
          </p>
        </motion.div>
      </div>

      <div className="w-full space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredRole('admin')}
            onHoverEnd={() => setHoveredRole(null)}
            onClick={() => onSelectRole('admin', 'login')}
            className={`glass-card p-8 flex flex-col items-center gap-4 border-2 transition-colors ${hoveredRole === 'admin' ? 'border-gaming-primary bg-gaming-primary/10' : 'border-transparent'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${hoveredRole === 'admin' ? 'bg-gaming-primary text-black' : 'bg-gaming-primary/10 text-gaming-primary'}`}>
              <User size={28} />
            </div>
            <span className="text-xs font-black tracking-[0.3em] uppercase">ADMIN</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredRole('manager')}
            onHoverEnd={() => setHoveredRole(null)}
            onClick={() => onSelectRole('manager', 'login')}
            className={`glass-card p-8 flex flex-col items-center gap-4 border-2 transition-colors ${hoveredRole === 'manager' ? 'border-gaming-secondary bg-gaming-secondary/10' : 'border-transparent'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${hoveredRole === 'manager' ? 'bg-gaming-secondary text-white' : 'bg-gaming-secondary/10 text-gaming-secondary'}`}>
              <Users size={28} />
            </div>
            <span className="text-xs font-black tracking-[0.3em] uppercase">MANAGER</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectRole('admin', 'signup')}
          className="haptic-button bg-white text-black glow-primary"
        >
          CRÉER UN COMPTE ÉLITE
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const LoginScreen = ({ role, theme, onThemeToggle, onBack, onSignup, onRoleChange, onLogin }: { role: 'admin' | 'manager', theme: 'dark' | 'light', onThemeToggle: (e: React.MouseEvent) => void, onBack: () => void, onSignup: () => void, onRoleChange: (role: 'admin' | 'manager') => void, onLogin: () => void, key?: string }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute inset-0 z-20 flex flex-col"
    >
      <ParticleBackground theme={theme} />
      <div className="p-8 pt-12 flex items-center justify-between">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-14 h-14 glass-card flex items-center justify-center">
          <ChevronLeft size={28} />
        </motion.button>
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <div className={`px-5 py-3 glass-card text-[10px] font-black tracking-[0.3em] uppercase ${role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'}`}>
            {role === 'admin' ? 'ADMIN' : 'MANAGER'}
          </div>
        </div>
      </div>

      <div className="flex-1 px-10 flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-5xl font-black mb-3 leading-[0.85]">
            ACCÈS<br />
            <span className={role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'}>
              SÉCURISÉ
            </span>
          </h2>
          <p className="text-muted font-medium mb-10">Identifiez-vous pour piloter GAMEM0.</p>
        </motion.div>

        <div className="ios-card p-1.5 flex mb-10 bg-white/5 rounded-[24px]">
          <button onClick={() => onRoleChange('admin')} className={`flex-1 py-3 rounded-[18px] text-[10px] font-black tracking-widest transition-all ${role === 'admin' ? 'bg-gaming-primary text-black shadow-lg shadow-gaming-primary/20' : 'text-muted'}`}>ADMIN</button>
          <button onClick={() => onRoleChange('manager')} className={`flex-1 py-3 rounded-[18px] text-[10px] font-black tracking-widest transition-all ${role === 'manager' ? 'bg-gaming-secondary text-white shadow-lg shadow-gaming-secondary/20' : 'text-muted'}`}>MANAGER</button>
        </div>

        <div className="space-y-2">
          <SmartInput label="Email Professionnel" type="email" icon={Mail} colorClass={role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'} />
          <SmartInput label="Clé de Sécurité" type="password" icon={Lock} colorClass={role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'} />
        </div>

        <div className="flex justify-between items-center px-2 mb-10">
          <label className="flex items-center gap-3 text-xs font-bold text-muted">
            <input type="checkbox" className={`w-5 h-5 rounded-lg border-white/10 bg-white/5 ${role === 'admin' ? 'accent-gaming-primary' : 'accent-gaming-secondary'}`} />
            Mémoriser
          </label>
          <button className={`text-xs font-black tracking-widest uppercase ${role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'}`}>Reset</button>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogin}
          className={`haptic-button text-black mb-8 ${role === 'admin' ? 'bg-gaming-primary shadow-gaming-primary/30' : 'bg-gaming-secondary text-white shadow-gaming-secondary/30'}`}
        >
          AUTHENTIFICATION
          <Fingerprint size={22} />
        </motion.button>

        <p className="text-center text-muted text-sm font-bold">
          Pas encore de compte ?{' '}
          <button onClick={onSignup} className={`font-black ${role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'}`}>S'INSCRIRE</button>
        </p>
      </div>
    </motion.div>
  );
};

const SignupScreen = ({ role, theme, onThemeToggle, onBack, onLogin, onRoleChange }: { role: 'admin' | 'manager', theme: 'dark' | 'light', onThemeToggle: (e: React.MouseEvent) => void, onBack: () => void, onLogin: () => void, onRoleChange: (role: 'admin' | 'manager') => void, key?: string }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute inset-0 z-30 flex flex-col"
    >
      <ParticleBackground theme={theme} />
      <div className="p-8 pt-12 flex items-center justify-between">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-14 h-14 glass-card flex items-center justify-center">
          <ChevronLeft size={28} />
        </motion.button>
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <div className={`px-5 py-3 glass-card text-[10px] font-black tracking-[0.3em] uppercase ${role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'}`}>
            {role === 'admin' ? 'NEW ADMIN' : 'NEW MANAGER'}
          </div>
        </div>
      </div>

      <div className="flex-1 px-10 flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-5xl font-black mb-3 leading-[0.85]">
            CRÉER UN<br />
            <span className={role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'}>
              PROFIL PRO
            </span>
          </h2>
          <p className="text-muted font-medium mb-10">Rejoignez l'élite GAMEM0.</p>
        </motion.div>

        <div className="ios-card p-1.5 flex mb-10 bg-white/5 rounded-[24px]">
          <button onClick={() => onRoleChange('admin')} className={`flex-1 py-3 rounded-[18px] text-[10px] font-black tracking-widest transition-all ${role === 'admin' ? 'bg-gaming-primary text-black shadow-lg shadow-gaming-primary/20' : 'text-muted'}`}>ADMIN</button>
          <button onClick={() => onRoleChange('manager')} className={`flex-1 py-3 rounded-[18px] text-[10px] font-black tracking-widest transition-all ${role === 'manager' ? 'bg-gaming-secondary text-white shadow-lg shadow-gaming-secondary/20' : 'text-muted'}`}>MANAGER</button>
        </div>

        <div className="space-y-2">
          <SmartInput label="Nom Complet" type="text" icon={User} colorClass={role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'} />
          {role === 'admin' && <SmartInput label="Nom de l'Établissement" type="text" icon={Gamepad2} colorClass="text-gaming-primary" />}
          <SmartInput label="Email" type="email" icon={Mail} colorClass={role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'} />
          <SmartInput label="Mot de Passe" type="password" icon={Lock} colorClass={role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'} />
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`haptic-button text-white mt-4 mb-8 ${role === 'admin' ? 'bg-gaming-primary text-black shadow-gaming-primary/30' : 'bg-gaming-secondary shadow-gaming-secondary/30'}`}
        >
          CRÉER LE COMPTE
          <Sparkles size={22} />
        </motion.button>

        <p className="text-center text-muted text-sm font-bold">
          Déjà membre ?{' '}
          <button onClick={onLogin} className={`font-black ${role === 'admin' ? 'text-gaming-primary' : 'text-gaming-secondary'}`}>SE CONNECTER</button>
        </p>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'login' | 'signup' | 'dashboard'>('intro');
  const [role, setRole] = useState<'admin' | 'manager'>('admin');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [reveal, setReveal] = useState<{ x: number, y: number, active: boolean }>({ x: 0, y: 0, active: false });

  const handleSelectRole = (selectedRole: 'admin' | 'manager', targetScreen: 'login' | 'signup') => {
    setRole(selectedRole);
    setScreen(targetScreen);
  };

  const toggleTheme = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    setReveal({ x, y, active: true });
    
    setTimeout(() => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    }, 400);

    setTimeout(() => {
      setReveal(prev => ({ ...prev, active: false }));
    }, 800);
  };

  return (
    <div className="mobile-container">
      {reveal.active && (
        <div 
          className="theme-transition-overlay bg-gaming-primary"
          style={{ 
            '--reveal-x': `${reveal.x}px`, 
            '--reveal-y': `${reveal.y}px` 
          } as any}
        />
      )}

      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <MorphicRoleSelector 
            key="intro"
            theme={theme}
            onThemeToggle={toggleTheme}
            onSelectRole={handleSelectRole}
          />
        )}
        {screen === 'dashboard' && (
          <DashboardScreen 
            key="dashboard"
            role={role}
            theme={theme}
            onLogout={() => setScreen('intro')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {screen === 'login' && (
          <LoginScreen 
            key="login"
            role={role}
            theme={theme}
            onThemeToggle={toggleTheme}
            onBack={() => setScreen('intro')} 
            onSignup={() => setScreen('signup')}
            onRoleChange={setRole}
            onLogin={() => setScreen('dashboard')}
          />
        )}
        {screen === 'signup' && (
          <SignupScreen 
            key="signup"
            role={role}
            theme={theme}
            onThemeToggle={toggleTheme}
            onBack={() => setScreen('login')} 
            onLogin={() => setScreen('login')}
            onRoleChange={setRole}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
