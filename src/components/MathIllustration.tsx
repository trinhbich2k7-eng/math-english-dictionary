import React from 'react';

interface MathIllustrationProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const MathIllustration: React.FC<MathIllustrationProps> = ({
  type,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    hero: 'w-56 h-56'
  }[size];

  switch (type) {
    // ==========================================
    // 1. GEOMETRIC SHAPES
    // ==========================================
    case 'shape-triangle':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Triangle">
          {/* Subtle grid background */}
          <rect width="120" height="120" rx="16" fill="#F0F9FF" />
          <polygon
            points="60,20 102,96 18,96"
            fill="#38BDF8"
            fillOpacity="0.85"
            stroke="#0284C7"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Vertex dots */}
          <circle cx="60" cy="20" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <circle cx="102" cy="96" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <circle cx="18" cy="96" r="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
        </svg>
      );

    case 'shape-circle':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Circle">
          <rect width="120" height="120" rx="16" fill="#FDF2F8" />
          <circle cx="60" cy="60" r="44" fill="#F472B6" fillOpacity="0.8" stroke="#DB2777" strokeWidth="4" />
          {/* Center point and radius ray */}
          <line x1="60" y1="60" x2="104" y2="60" stroke="#9D174D" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="4.5" fill="#9D174D" />
          <circle cx="104" cy="60" r="3.5" fill="#9D174D" />
        </svg>
      );

    case 'shape-square':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Square">
          <rect width="120" height="120" rx="16" fill="#ECFDF5" />
          <rect x="24" y="24" width="72" height="72" rx="4" fill="#34D399" fillOpacity="0.85" stroke="#059669" strokeWidth="4" />
          {/* 4 Right angle indicators in corners */}
          <path d="M 24 38 L 38 38 L 38 24" fill="none" stroke="#065F46" strokeWidth="2" />
          <path d="M 96 38 L 82 38 L 82 24" fill="none" stroke="#065F46" strokeWidth="2" />
          <path d="M 24 82 L 38 82 L 38 96" fill="none" stroke="#065F46" strokeWidth="2" />
          <path d="M 96 82 L 82 82 L 82 96" fill="none" stroke="#065F46" strokeWidth="2" />
        </svg>
      );

    case 'shape-rectangle':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Rectangle">
          <rect width="120" height="120" rx="16" fill="#FFFBEB" />
          <rect x="14" y="34" width="92" height="52" rx="4" fill="#FBBF24" fillOpacity="0.85" stroke="#D97706" strokeWidth="4" />
          {/* Dimension arrows */}
          <path d="M 14 26 L 106 26" stroke="#B45309" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="14" y1="22" x2="14" y2="30" stroke="#B45309" strokeWidth="1.5" />
          <line x1="106" y1="22" x2="106" y2="30" stroke="#B45309" strokeWidth="1.5" />
        </svg>
      );

    case 'shape-oval':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Oval">
          <rect width="120" height="120" rx="16" fill="#F5F3FF" />
          <ellipse cx="60" cy="60" rx="48" ry="32" fill="#A78BFA" fillOpacity="0.85" stroke="#7C3AED" strokeWidth="4" />
          <ellipse cx="60" cy="60" rx="40" ry="24" fill="none" stroke="#DDD6FE" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'shape-diamond':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Diamond">
          <rect width="120" height="120" rx="16" fill="#FFF7ED" />
          <polygon points="60,16 104,60 60,104 16,60" fill="#FB923C" fillOpacity="0.85" stroke="#EA580C" strokeWidth="4" strokeLinejoin="round" />
          {/* Subtle diagonal inner guide */}
          <line x1="60" y1="16" x2="60" y2="104" stroke="#FFEDD5" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="16" y1="60" x2="104" y2="60" stroke="#FFEDD5" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );

    case 'shape-star':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Star">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          <polygon
            points="60,14 73,44 106,46 80,68 88,100 60,82 32,100 40,68 14,46 47,44"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Sparkle glint */}
          <circle cx="60" cy="46" r="3" fill="#FFF" />
        </svg>
      );

    case 'shape-heart':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Heart">
          <rect width="120" height="120" rx="16" fill="#FFF1F2" />
          <path
            d="M60 98 C20 70 14 42 30 26 C44 14 55 22 60 30 C65 22 76 14 90 26 C106 42 100 70 60 98 Z"
            fill="#F43F5E"
            stroke="#BE123C"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Gloss highlight */}
          <path d="M 36 32 C 32 42 34 52 40 60" fill="none" stroke="#FECDD3" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'shape-sides':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Shape side">
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          {/* Triangle with 1 highlighted side */}
          <polygon points="60,22 100,92 20,92" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
          {/* Glowing active side */}
          <line x1="20" y1="92" x2="100" y2="92" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
          {/* Arrow pointing to side */}
          <path d="M 60 110 L 60 98" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <polygon points="60,94 56,102 64,102" fill="#DC2626" />
        </svg>
      );

    case 'geometry-banner':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Geometry shapes collection">
          <rect width="120" height="120" rx="16" fill="#F8FAFC" />
          {/* Mini circle */}
          <circle cx="36" cy="38" r="18" fill="#F472B6" stroke="#DB2777" strokeWidth="2.5" />
          {/* Mini triangle */}
          <polygon points="84,20 104,54 64,54" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Mini square */}
          <rect x="22" y="68" width="32" height="32" rx="3" fill="#34D399" stroke="#059669" strokeWidth="2.5" />
          {/* Mini star */}
          <polygon points="85,68 90,80 102,81 92,89 95,101 85,94 75,101 78,89 68,81 80,80" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );

    case 'line':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Straight line A to B">
          <rect width="120" height="120" rx="16" fill="#F0F9FF" />
          {/* Straight line with arrows at ends */}
          <line x1="16" y1="60" x2="104" y2="60" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          {/* Left arrow */}
          <polyline points="24,52 14,60 24,68" fill="none" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right arrow */}
          <polyline points="96,52 106,60 96,68" fill="none" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Point A */}
          <circle cx="38" cy="60" r="5" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <text x="38" y="46" textAnchor="middle" fill="#B91C1C" fontWeight="800" fontSize="13">A</text>
          {/* Point B */}
          <circle cx="82" cy="60" r="5" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          <text x="82" y="46" textAnchor="middle" fill="#047857" fontWeight="800" fontSize="13">B</text>
        </svg>
      );

    case 'angle':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Angle vertex">
          <rect width="120" height="120" rx="16" fill="#FFFBEB" />
          {/* Ray 1 horizontal */}
          <line x1="30" y1="85" x2="100" y2="85" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          <polyline points="94,79 102,85 94,91" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          {/* Ray 2 tilted */}
          <line x1="30" y1="85" x2="80" y2="28" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          <polyline points="72,27 82,26 82,36" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          {/* Vertex point */}
          <circle cx="30" cy="85" r="5.5" fill="#DC2626" />
          {/* Angle arc */}
          <path d="M 55 85 A 25 25 0 0 0 46 66" fill="none" stroke="#F59E0B" strokeWidth="4" />
        </svg>
      );

    case 'perimeter':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Perimeter boundary">
          <rect width="120" height="120" rx="16" fill="#ECFDF5" />
          {/* Inner shape */}
          <rect x="22" y="32" width="76" height="56" rx="4" fill="#A7F3D0" fillOpacity="0.4" />
          {/* Outer dashed walking boundary with arrows */}
          <rect x="22" y="32" width="76" height="56" rx="4" fill="none" stroke="#059669" strokeWidth="3.5" strokeDasharray="6 4" />
          {/* Walking path arrows */}
          <polygon points="60,26 66,32 60,38" fill="#047857" />
          <polygon points="104,60 98,66 98,54" fill="#047857" />
          <polygon points="60,94 54,88 60,82" fill="#047857" />
          <polygon points="16,60 22,54 22,66" fill="#047857" />
        </svg>
      );

    case 'area':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Area tiles grid">
          <rect width="120" height="120" rx="16" fill="#FEF3C7" />
          {/* 2 x 3 grid of 6 square unit tiles */}
          <g transform="translate(18, 28)">
            <rect x="0" y="0" width="28" height="32" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <rect x="28" y="0" width="28" height="32" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <rect x="56" y="0" width="28" height="32" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <rect x="0" y="32" width="28" height="32" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <rect x="28" y="32" width="28" height="32" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <rect x="56" y="32" width="28" height="32" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'shape-cube':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="3D Cube">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* Top face */}
          <polygon points="60,18 96,36 60,54 24,36" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Left face */}
          <polygon points="24,36 60,54 60,98 24,80" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Right face */}
          <polygon points="60,54 96,36 96,80 60,98" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="2.5" />
        </svg>
      );

    case 'shape-sphere':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="3D Sphere">
          <defs>
            <radialGradient id="sphereGradClean" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>
          </defs>
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          <circle cx="60" cy="60" r="44" fill="url(#sphereGradClean)" stroke="#065F46" strokeWidth="2.5" />
          {/* Equatorial line */}
          <ellipse cx="60" cy="60" rx="44" ry="14" fill="none" stroke="#A7F3D0" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      );

    // ==========================================
    // 2. ARITHMETIC & OPERATIONS
    // ==========================================
    case 'addition-calc':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Addition 2 + 3 = 5">
          <rect width="120" height="120" rx="16" fill="#ECFDF5" />
          {/* Group 1: 2 red apples */}
          <circle cx="22" cy="42" r="9" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          <circle cx="38" cy="42" r="9" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          {/* Plus sign */}
          <text x="54" y="47" textAnchor="middle" fill="#059669" fontWeight="900" fontSize="20">+</text>
          {/* Group 2: Exactly 3 green apples */}
          <circle cx="70" cy="42" r="9" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
          <circle cx="86" cy="42" r="9" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
          <circle cx="102" cy="42" r="9" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
          {/* Clean dedicated equation plaque: 2 + 3 = 5 */}
          <rect x="20" y="70" width="80" height="32" rx="8" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
          <text x="60" y="92" textAnchor="middle" fill="#065F46" fontWeight="900" fontSize="17" fontFamily="monospace">
            2 + 3 = 5
          </text>
        </svg>
      );

    case 'add-items':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Add items together">
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          {/* Two groups coming together into a tray: 2 yellow and 3 green */}
          <circle cx="32" cy="34" r="8" fill="#F59E0B" />
          <circle cx="48" cy="34" r="8" fill="#F59E0B" />
          <circle cx="74" cy="34" r="8" fill="#10B981" />
          <circle cx="90" cy="34" r="8" fill="#10B981" />
          <circle cx="104" cy="34" r="8" fill="#10B981" />
          {/* Curved merging arrows */}
          <path d="M 40 46 Q 40 64 52 68" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 88 46 Q 88 64 68 68" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
          {/* Basket receiving exactly 5 items (2 yellow + 3 green) */}
          <rect x="18" y="70" width="84" height="34" rx="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="32" cy="87" r="6" fill="#F59E0B" />
          <circle cx="46" cy="87" r="6" fill="#F59E0B" />
          <circle cx="60" cy="87" r="6" fill="#10B981" />
          <circle cx="74" cy="87" r="6" fill="#10B981" />
          <circle cx="88" cy="87" r="6" fill="#10B981" />
        </svg>
      );

    case 'symbol-plus':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Plus symbol">
          <rect width="120" height="120" rx="16" fill="#ECFDF5" />
          <circle cx="60" cy="60" r="42" fill="#D1FAE5" stroke="#10B981" strokeWidth="3" />
          <rect x="52" y="32" width="16" height="56" rx="8" fill="#059669" />
          <rect x="32" y="52" width="56" height="16" rx="8" fill="#059669" />
        </svg>
      );

    case 'sum':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Sum result">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          <rect x="14" y="24" width="92" height="42" rx="10" fill="#FFF" stroke="#EAB308" strokeWidth="2" />
          <text x="36" y="52" fill="#854D0E" fontWeight="800" fontSize="20" fontFamily="monospace">4 + 1 =</text>
          {/* Highlighted Sum circle */}
          <circle cx="84" cy="45" r="15" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <text x="84" y="52" textAnchor="middle" fill="#713F12" fontWeight="900" fontSize="20" fontFamily="monospace">5</text>
          {/* Badge pointing to sum */}
          <rect x="30" y="78" width="60" height="24" rx="6" fill="#CA8A04" />
          <text x="60" y="94" textAnchor="middle" fill="#FFF" fontWeight="800" fontSize="12">SUM</text>
        </svg>
      );

    case 'subtraction-calc':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Subtraction 5 - 2 = 3">
          <rect width="120" height="120" rx="16" fill="#FFF1F2" />
          {/* 3 active dots */}
          <circle cx="24" cy="42" r="9" fill="#F43F5E" />
          <circle cx="44" cy="42" r="9" fill="#F43F5E" />
          <circle cx="64" cy="42" r="9" fill="#F43F5E" />
          {/* 2 crossed out dots */}
          <g>
            <circle cx="84" cy="42" r="9" fill="#FECDD3" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="77" y1="35" x2="91" y2="49" stroke="#BE123C" strokeWidth="2.5" />
          </g>
          <g>
            <circle cx="102" cy="42" r="9" fill="#FECDD3" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="95" y1="35" x2="109" y2="49" stroke="#BE123C" strokeWidth="2.5" />
          </g>
          {/* Equation box */}
          <rect x="20" y="70" width="80" height="32" rx="8" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2" />
          <text x="60" y="92" textAnchor="middle" fill="#9F1239" fontWeight="900" fontSize="17" fontFamily="monospace">
            5 - 2 = 3
          </text>
        </svg>
      );

    case 'take-away':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Take away item">
          <rect width="120" height="120" rx="16" fill="#FFF7ED" />
          {/* Plate with cookies */}
          <ellipse cx="60" cy="80" rx="46" ry="22" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <circle cx="44" cy="80" r="8" fill="#B45309" />
          <circle cx="62" cy="84" r="8" fill="#B45309" />
          <circle cx="76" cy="78" r="8" fill="#B45309" />
          {/* 1 Cookie being lifted away with hand/arrow */}
          <circle cx="60" cy="36" r="9" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <path d="M 60 56 L 60 48" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <polyline points="54,50 60,44 66,50" fill="none" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'symbol-minus':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Minus symbol">
          <rect width="120" height="120" rx="16" fill="#FFF1F2" />
          <circle cx="60" cy="60" r="42" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="3" />
          <rect x="32" y="52" width="56" height="16" rx="8" fill="#E11D48" />
        </svg>
      );

    case 'difference':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Difference 9 - 4 = 5">
          <rect width="120" height="120" rx="16" fill="#F5F3FF" />
          {/* Bar A: 9 blocks (height 63) */}
          <rect x="26" y="24" width="24" height="64" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <text x="38" y="58" textAnchor="middle" fill="#0369A1" fontWeight="900" fontSize="16">9</text>
          {/* Bar B: 4 blocks (height 28) */}
          <rect x="62" y="60" width="24" height="28" rx="4" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
          <text x="74" y="80" textAnchor="middle" fill="#9D174D" fontWeight="900" fontSize="14">4</text>
          {/* Difference gap bracket: 9 - 4 = 5 */}
          <path d="M 52 24 L 58 24 L 58 60 L 52 60" fill="none" stroke="#7C3AED" strokeWidth="2.5" />
          <rect x="60" y="32" width="46" height="22" rx="6" fill="#7C3AED" />
          <text x="83" y="47" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">Diff: 5</text>
        </svg>
      );

    case 'equal-balance':
    case 'compare-scale':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Balanced scale">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          {/* Center post */}
          <rect x="57" y="35" width="6" height="55" rx="3" fill="#78350F" />
          <path d="M 38 90 L 82 90 L 74 98 L 46 98 Z" fill="#92400E" />
          {/* Horizontal balance bar */}
          <line x1="24" y1="40" x2="96" y2="40" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="40" r="5" fill="#F59E0B" />
          {/* Left pan */}
          <line x1="28" y1="40" x2="28" y2="60" stroke="#D97706" strokeWidth="1.5" />
          <path d="M 16 60 Q 28 72 40 60 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <circle cx="28" cy="56" r="6" fill="#3B82F6" />
          {/* Right pan */}
          <line x1="92" y1="40" x2="92" y2="60" stroke="#D97706" strokeWidth="1.5" />
          <path d="M 80 60 Q 92 72 104 60 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <circle cx="92" cy="56" r="6" fill="#3B82F6" />
        </svg>
      );

    case 'equals':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Equals symbol">
          <rect width="120" height="120" rx="16" fill="#FEF3C7" />
          <circle cx="60" cy="60" r="42" fill="#FDE68A" stroke="#F59E0B" strokeWidth="3" />
          <rect x="34" y="44" width="52" height="12" rx="6" fill="#D97706" />
          <rect x="34" y="64" width="52" height="12" rx="6" fill="#D97706" />
        </svg>
      );

    case 'regroup':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Regroup 10 ones to 1 ten">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* 10 small cubes grouped */}
          <g transform="translate(18, 26)">
            {[0, 1, 2, 3, 4].map(i => (
              <rect key={i} x={0} y={i * 12} width="10" height="10" rx="2" fill="#60A5FA" stroke="#2563EB" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4].map(i => (
              <rect key={i + 5} x={12} y={i * 12} width="10" height="10" rx="2" fill="#60A5FA" stroke="#2563EB" strokeWidth="1" />
            ))}
          </g>
          {/* Transition arrow */}
          <path d="M 48 55 L 68 55" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          <polygon points="68,55 62,50 62,60" fill="#2563EB" />
          {/* 1 solid ten rod */}
          <rect x="80" y="24" width="16" height="65" rx="3" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.5" />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
            <line key={i} x1="80" y1={24 + i * 6.5} x2="96" y2={24 + i * 6.5} stroke="#93C5FD" strokeWidth="1" />
          ))}
        </svg>
      );

    case 'borrowing':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Borrowing subtraction 42 - 17">
          <rect width="120" height="120" rx="16" fill="#FFF1F2" />
          {/* Column arithmetic pad */}
          <rect x="22" y="16" width="76" height="88" rx="8" fill="#FFF" stroke="#F43F5E" strokeWidth="2" />
          {/* Tens and Ones header */}
          <text x="44" y="32" textAnchor="middle" fill="#9CA3AF" fontWeight="700" fontSize="10">T</text>
          <text x="74" y="32" textAnchor="middle" fill="#9CA3AF" fontWeight="700" fontSize="10">O</text>
          {/* Crossed out 4 -> 3 */}
          <text x="44" y="52" textAnchor="middle" fill="#9CA3AF" fontWeight="700" fontSize="15" textDecoration="line-through">4</text>
          <text x="44" y="40" textAnchor="middle" fill="#DC2626" fontWeight="800" fontSize="11">3</text>
          {/* 2 becomes 12 */}
          <text x="74" y="52" textAnchor="middle" fill="#9CA3AF" fontWeight="700" fontSize="15" textDecoration="line-through">2</text>
          <text x="74" y="40" textAnchor="middle" fill="#DC2626" fontWeight="800" fontSize="11">12</text>
          {/* Second line: - 1 7 */}
          <text x="28" y="72" fill="#E11D48" fontWeight="800" fontSize="14">-</text>
          <text x="44" y="72" textAnchor="middle" fill="#374151" fontWeight="800" fontSize="15">1</text>
          <text x="74" y="72" textAnchor="middle" fill="#374151" fontWeight="800" fontSize="15">7</text>
          <line x1="28" y1="78" x2="90" y2="78" stroke="#E11D48" strokeWidth="2" />
          {/* Result: 2 5 */}
          <text x="44" y="96" textAnchor="middle" fill="#15803D" fontWeight="900" fontSize="16">2</text>
          <text x="74" y="96" textAnchor="middle" fill="#15803D" fontWeight="900" fontSize="16">5</text>
        </svg>
      );

    case 'carrying':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Carrying addition 18 + 15">
          <rect width="120" height="120" rx="16" fill="#ECFDF5" />
          <rect x="22" y="16" width="76" height="88" rx="8" fill="#FFF" stroke="#10B981" strokeWidth="2" />
          {/* Carried +1 circle */}
          <circle cx="44" cy="28" r="7" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <text x="44" y="32" textAnchor="middle" fill="#854D0E" fontWeight="900" fontSize="10">+1</text>
          {/* First number: 18 */}
          <text x="44" y="52" textAnchor="middle" fill="#374151" fontWeight="800" fontSize="15">1</text>
          <text x="74" y="52" textAnchor="middle" fill="#374151" fontWeight="800" fontSize="15">8</text>
          {/* Second number: + 15 */}
          <text x="28" y="72" fill="#059669" fontWeight="800" fontSize="14">+</text>
          <text x="44" y="72" textAnchor="middle" fill="#374151" fontWeight="800" fontSize="15">1</text>
          <text x="74" y="72" textAnchor="middle" fill="#374151" fontWeight="800" fontSize="15">5</text>
          <line x1="28" y1="78" x2="90" y2="78" stroke="#059669" strokeWidth="2" />
          {/* Result: 3 3 */}
          <text x="44" y="96" textAnchor="middle" fill="#065F46" fontWeight="900" fontSize="16">3</text>
          <text x="74" y="96" textAnchor="middle" fill="#065F46" fontWeight="900" fontSize="16">3</text>
        </svg>
      );

    case 'number-line':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Number line with hops">
          <rect width="120" height="120" rx="16" fill="#F0F9FF" />
          {/* Axis line */}
          <line x1="12" y1="70" x2="108" y2="70" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          {/* Ticks & Numbers */}
          {[
            { x: 22, n: '0' },
            { x: 44, n: '1' },
            { x: 66, n: '2' },
            { x: 88, n: '3' },
          ].map(t => (
            <g key={t.n}>
              <line x1={t.x} y1="62" x2={t.x} y2="78" stroke="#0284C7" strokeWidth="2.5" />
              <text x={t.x} y="94" textAnchor="middle" fill="#0369A1" fontWeight="800" fontSize="12">{t.n}</text>
            </g>
          ))}
          {/* Hopping arc from 0 to 2 */}
          <path d="M 22 62 Q 44 32 66 62" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="3 3" />
          <polygon points="66,62 60,56 62,64" fill="#F59E0B" />
          <text x="44" y="30" textAnchor="middle" fill="#D97706" fontWeight="900" fontSize="12">+2</text>
        </svg>
      );

    case 'mental-math':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Mental math thinking brain">
          <rect width="120" height="120" rx="16" fill="#FDF4FF" />
          {/* Cute brain character */}
          <path
            d="M 40 70 C 26 70 26 50 36 44 C 36 32 50 30 60 38 C 70 30 84 32 84 44 C 94 50 94 70 80 70 Z"
            fill="#F472B6"
            stroke="#DB2777"
            strokeWidth="3"
          />
          {/* Brain folds */}
          <path d="M 60 40 Q 56 55 60 70" fill="none" stroke="#BE123C" strokeWidth="2" />
          {/* Lightbulb idea */}
          <circle cx="60" cy="22" r="9" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <line x1="60" y1="8" x2="60" y2="4" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="14" x2="44" y2="10" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
          <line x1="72" y1="14" x2="76" y2="10" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
          {/* Calculation tag */}
          <rect x="22" y="82" width="76" height="24" rx="6" fill="#9333EA" />
          <text x="60" y="98" textAnchor="middle" fill="#FFF" fontWeight="800" fontSize="11" fontFamily="monospace">
            20 + 30 = 50
          </text>
        </svg>
      );

    case 'round':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Rounding hill 28 rounds to 30">
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          {/* Rounding hill curve */}
          <path d="M 16 88 Q 60 28 104 88" fill="none" stroke="#059669" strokeWidth="4" />
          {/* Ball rolling downhill at 28 towards 30 */}
          <circle cx="88" cy="62" r="9" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <text x="88" y="66" textAnchor="middle" fill="#78350F" fontWeight="900" fontSize="10">28</text>
          {/* End numbers */}
          <text x="20" y="104" textAnchor="middle" fill="#047857" fontWeight="800" fontSize="13">20</text>
          <text x="100" y="104" textAnchor="middle" fill="#047857" fontWeight="900" fontSize="14">30</text>
        </svg>
      );

    case 'estimation':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Estimation jar about 50 candies">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          {/* Glass jar */}
          <path d="M 36 26 L 84 26 L 80 88 Q 80 94 74 94 L 46 94 Q 40 94 40 88 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <rect x="34" y="20" width="52" height="8" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          {/* Colorful candies inside */}
          <circle cx="50" cy="54" r="5" fill="#EF4444" />
          <circle cx="68" cy="52" r="5" fill="#10B981" />
          <circle cx="58" cy="65" r="5" fill="#F59E0B" />
          <circle cx="46" cy="76" r="5" fill="#8B5CF6" />
          <circle cx="66" cy="78" r="5" fill="#EC4899" />
          {/* Tag ~50 */}
          <rect x="42" y="100" width="36" height="16" rx="4" fill="#0284C7" />
          <text x="60" y="112" textAnchor="middle" fill="#FFF" fontWeight="800" fontSize="11">≈ 50</text>
        </svg>
      );

    case 'algorithm':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Step by step algorithm">
          <rect width="120" height="120" rx="16" fill="#EEF2FF" />
          {/* Step 1 */}
          <rect x="22" y="20" width="76" height="20" rx="5" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="1.5" />
          <text x="60" y="34" textAnchor="middle" fill="#312E81" fontWeight="700" fontSize="10">Step 1: Ones</text>
          <path d="M 60 41 L 60 48" stroke="#4F46E5" strokeWidth="2" />
          {/* Step 2 */}
          <rect x="22" y="50" width="76" height="20" rx="5" fill="#A5B4FC" stroke="#4F46E5" strokeWidth="1.5" />
          <text x="60" y="64" textAnchor="middle" fill="#312E81" fontWeight="700" fontSize="10">Step 2: Tens</text>
          <path d="M 60 71 L 60 78" stroke="#4F46E5" strokeWidth="2" />
          {/* Step 3 */}
          <rect x="22" y="80" width="76" height="20" rx="5" fill="#818CF8" stroke="#4F46E5" strokeWidth="1.5" />
          <text x="60" y="94" textAnchor="middle" fill="#FFF" fontWeight="800" fontSize="10">Step 3: Total</text>
        </svg>
      );

    // ==========================================
    // 3. NUMBERS & PLACE VALUE
    // ==========================================
    case 'count':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Counting fingers 1 to 5">
          <rect width="120" height="120" rx="16" fill="#FEF3C7" />
          {/* Hand palm */}
          <path d="M 44 88 L 44 60 C 44 56 50 56 50 60 L 50 88" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <path d="M 50 88 L 50 50 C 50 46 56 46 56 50 L 56 88" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <path d="M 56 88 L 56 46 C 56 42 62 42 62 46 L 62 88" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <path d="M 62 88 L 62 52 C 62 48 68 48 68 52 L 68 88" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <path d="M 36 78 C 30 76 30 68 38 68 L 44 76" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Count badge bubbles */}
          {[
            { x: 30, y: 32, n: '1' },
            { x: 48, y: 22, n: '2' },
            { x: 66, y: 22, n: '3' },
            { x: 84, y: 32, n: '4' },
          ].map(b => (
            <g key={b.n}>
              <circle cx={b.x} cy={b.y} r="8" fill="#3B82F6" />
              <text x={b.x} y={b.y + 4} textAnchor="middle" fill="#FFF" fontWeight="800" fontSize="10">{b.n}</text>
            </g>
          ))}
        </svg>
      );

    case 'numbers':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="1 2 3 Number blocks">
          <rect width="120" height="120" rx="16" fill="#FDF4FF" />
          {/* Block 1 */}
          <rect x="18" y="24" width="34" height="34" rx="6" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          <text x="35" y="49" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="22">1</text>
          {/* Block 2 */}
          <rect x="64" y="24" width="34" height="34" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <text x="81" y="49" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="22">2</text>
          {/* Block 3 */}
          <rect x="42" y="66" width="36" height="36" rx="6" fill="#10B981" stroke="#047857" strokeWidth="2" />
          <text x="60" y="92" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="24">3</text>
        </svg>
      );

    case 'digits':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Digits 0 to 9">
          <rect width="120" height="120" rx="16" fill="#F8FAFC" />
          {/* Keypad of digits */}
          {[
            { n: '0', x: 22, y: 22 },
            { n: '1', x: 50, y: 22 },
            { n: '2', x: 78, y: 22 },
            { n: '3', x: 22, y: 50 },
            { n: '4', x: 50, y: 50 },
            { n: '5', x: 78, y: 50 },
            { n: '7', x: 22, y: 78 },
            { n: '8', x: 50, y: 78 },
            { n: '9', x: 78, y: 78 },
          ].map(d => (
            <g key={d.n}>
              <rect x={d.x} y={d.y} width="20" height="20" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <text x={d.x + 10} y={d.y + 15} textAnchor="middle" fill="#1E293B" fontWeight="800" fontSize="12">{d.n}</text>
            </g>
          ))}
        </svg>
      );

    case 'sequence':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Sequence 10 20 30 40">
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          {/* Row of train cars with numbers */}
          {[
            { n: '10', x: 14, y: 32 },
            { n: '20', x: 64, y: 32 },
            { n: '30', x: 14, y: 72 },
            { n: '40', x: 64, y: 72 },
          ].map((c, i) => (
            <g key={c.n}>
              <rect x={c.x} y={c.y} width="42" height="26" rx="6" fill="#34D399" stroke="#059669" strokeWidth="2" />
              <text x={c.x + 21} y={c.y + 18} textAnchor="middle" fill="#064E3B" fontWeight="900" fontSize="14">{c.n}</text>
            </g>
          ))}
          {/* Connecting arrow */}
          <path d="M 58 45 L 62 45" stroke="#059669" strokeWidth="2" />
          <path d="M 85 58 Q 85 68 58 68" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'total':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Total all stars in jar">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          {/* Collection jar */}
          <path d="M 30 36 L 90 36 L 84 94 L 36 94 Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="2.5" />
          {/* Stars inside */}
          <text x="44" y="58" fontSize="16">⭐</text>
          <text x="66" y="58" fontSize="16">⭐</text>
          <text x="54" y="78" fontSize="16">⭐</text>
          {/* Ribbon Total = 12 */}
          <rect x="22" y="16" width="76" height="22" rx="6" fill="#D97706" />
          <text x="60" y="31" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">TOTAL: 12</text>
        </svg>
      );

    case 'place-value':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Place value table H T O">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          <rect x="14" y="18" width="92" height="84" rx="8" fill="#FFF" stroke="#3B82F6" strokeWidth="2" />
          {/* Column lines */}
          <line x1="44" y1="18" x2="44" y2="102" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="74" y1="18" x2="74" y2="102" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="14" y1="42" x2="106" y2="42" stroke="#93C5FD" strokeWidth="1.5" />
          {/* Headers */}
          <text x="29" y="34" textAnchor="middle" fill="#1E40AF" fontWeight="800" fontSize="12">H</text>
          <text x="59" y="34" textAnchor="middle" fill="#1E40AF" fontWeight="800" fontSize="12">T</text>
          <text x="89" y="34" textAnchor="middle" fill="#1E40AF" fontWeight="800" fontSize="12">O</text>
          {/* Values: e.g. 3 4 5 */}
          <text x="29" y="76" textAnchor="middle" fill="#2563EB" fontWeight="900" fontSize="22">3</text>
          <text x="59" y="76" textAnchor="middle" fill="#2563EB" fontWeight="900" fontSize="22">4</text>
          <text x="89" y="76" textAnchor="middle" fill="#2563EB" fontWeight="900" fontSize="22">5</text>
        </svg>
      );

    case 'tens-blocks':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Tens block rod">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* Two rods of 10 */}
          {[36, 68].map(x => (
            <g key={x}>
              <rect x={x} y={16} width="16" height="84" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <line key={i} x1={x} y1={16 + i * 8.4} x2={x + 16} y2={16 + i * 8.4} stroke="#93C5FD" strokeWidth="1" />
              ))}
            </g>
          ))}
        </svg>
      );

    case 'ones-cubes':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Ones single unit cubes">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* 3 Unit cubes */}
          <g transform="translate(24, 30)">
            <rect x="0" y="0" width="18" height="18" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.5" />
            <polygon points="0,0 6,-6 24,-6 18,0" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
            <polygon points="18,0 24,-6 24,12 18,18" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
          </g>
          <g transform="translate(68, 26)">
            <rect x="0" y="0" width="18" height="18" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.5" />
            <polygon points="0,0 6,-6 24,-6 18,0" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
            <polygon points="18,0 24,-6 24,12 18,18" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
          </g>
          <g transform="translate(46, 68)">
            <rect x="0" y="0" width="18" height="18" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.5" />
            <polygon points="0,0 6,-6 24,-6 18,0" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
            <polygon points="18,0 24,-6 24,12 18,18" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'hundreds-flat':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Hundreds 10x10 flat">
          <rect width="120" height="120" rx="16" fill="#DBEAFE" />
          <rect x="18" y="18" width="84" height="84" rx="4" fill="#93C5FD" stroke="#2563EB" strokeWidth="2.5" />
          {/* 10 x 10 grid */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
            <React.Fragment key={i}>
              <line x1={18 + i * 8.4} y1={18} x2={18 + i * 8.4} y2={102} stroke="#3B82F6" strokeWidth="1" />
              <line x1={18} y1={18 + i * 8.4} x2={102} y2={18 + i * 8.4} stroke="#3B82F6" strokeWidth="1" />
            </React.Fragment>
          ))}
          <rect x="42" y="46" width="36" height="26" rx="4" fill="#1D4ED8" />
          <text x="60" y="64" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="16">100</text>
        </svg>
      );

    case 'thousands-cube':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Thousands 1000 cube">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* Big 3D block with 1,000 label */}
          <polygon points="60,16 98,36 60,56 22,36" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="2.5" />
          <polygon points="22,36 60,56 60,98 22,78" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          <polygon points="60,56 98,36 98,78 60,98" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="2.5" />
          <rect x="36" y="62" width="48" height="22" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <text x="60" y="77" textAnchor="middle" fill="#854D0E" fontWeight="900" fontSize="12">1,000</text>
        </svg>
      );

    case 'base-ten':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Base ten 1 10 100">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* 1 cube */}
          <rect x="16" y="55" width="10" height="10" rx="2" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1" />
          {/* 1 ten rod */}
          <rect x="36" y="25" width="10" height="70" rx="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
          {/* 1 flat 100 */}
          <rect x="58" y="25" width="48" height="70" rx="3" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
          <line x1="58" y1="48" x2="106" y2="48" stroke="#3B82F6" strokeWidth="1" />
          <line x1="58" y1="72" x2="106" y2="72" stroke="#3B82F6" strokeWidth="1" />
          <line x1="82" y1="25" x2="82" y2="95" stroke="#3B82F6" strokeWidth="1" />
        </svg>
      );

    case 'even-pairs':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Even number pairs">
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          {/* 4 complete pairs (8 total) */}
          {[
            { y: 26 },
            { y: 48 },
            { y: 70 },
            { y: 92 },
          ].map((row, i) => (
            <g key={i}>
              <circle cx="44" cy={row.y} r="8" fill="#16A34A" />
              <line x1="44" y1={row.y} x2="76" y2={row.y} stroke="#86EFAC" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="76" cy={row.y} r="8" fill="#16A34A" />
            </g>
          ))}
        </svg>
      );

    case 'odd-dots':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Odd number 1 left over">
          <rect width="120" height="120" rx="16" fill="#FFF7ED" />
          {/* 2 pairs + 1 single */}
          <circle cx="36" cy="34" r="8" fill="#EA580C" />
          <circle cx="64" cy="34" r="8" fill="#EA580C" />
          <circle cx="36" cy="62" r="8" fill="#EA580C" />
          <circle cx="64" cy="62" r="8" fill="#EA580C" />
          {/* 1 left over dot with question mark/halo */}
          <circle cx="36" cy="90" r="8" fill="#EF4444" />
          <circle cx="64" cy="90" r="12" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="64" y="94" textAnchor="middle" fill="#DC2626" fontWeight="900" fontSize="12">?</text>
        </svg>
      );

    case 'pattern-shapes':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Repeating pattern">
          <rect width="120" height="120" rx="16" fill="#FAF5FF" />
          {/* Circle - Square - Circle - Square pattern */}
          <circle cx="28" cy="40" r="12" fill="#F43F5E" />
          <rect x="52" y="28" width="24" height="24" rx="4" fill="#3B82F6" />
          <circle cx="96" cy="40" r="12" fill="#F43F5E" />
          <rect x="28" y="68" width="24" height="24" rx="4" fill="#3B82F6" />
          <circle cx="72" cy="80" r="12" fill="#F43F5E" />
          <rect x="94" y="68" width="20" height="24" rx="4" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'break-apart':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Break apart 15 into 10 and 5">
          <rect width="120" height="120" rx="16" fill="#FEF3C7" />
          {/* Number bond */}
          {/* Top bubble: 15 */}
          <circle cx="60" cy="34" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
          <text x="60" y="40" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="16">15</text>
          {/* Branch lines */}
          <line x1="48" y1="48" x2="34" y2="72" stroke="#B45309" strokeWidth="2.5" />
          <line x1="72" y1="48" x2="86" y2="72" stroke="#B45309" strokeWidth="2.5" />
          {/* Left: 10 */}
          <circle cx="32" cy="86" r="16" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <text x="32" y="92" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="14">10</text>
          {/* Right: 5 */}
          <circle cx="88" cy="86" r="16" fill="#10B981" stroke="#047857" strokeWidth="2" />
          <text x="88" y="92" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="14">5</text>
        </svg>
      );

    case 'greater-than':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Greater than 8 > 3">
          <rect width="120" height="120" rx="16" fill="#FEF2F2" />
          <text x="26" y="68" fill="#B91C1C" fontWeight="900" fontSize="30">8</text>
          {/* Alligator mouth > */}
          <path d="M 50 44 L 72 60 L 50 76" fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Teeth */}
          <polygon points="56,48 58,54 52,54" fill="#FFF" />
          <polygon points="56,72 58,66 52,66" fill="#FFF" />
          <text x="94" y="68" fill="#B91C1C" fontWeight="900" fontSize="30">3</text>
        </svg>
      );

    case 'less-than':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Less than 2 < 6">
          <rect width="120" height="120" rx="16" fill="#FEF2F2" />
          <text x="26" y="68" fill="#B91C1C" fontWeight="900" fontSize="30">2</text>
          {/* Alligator mouth < */}
          <path d="M 70 44 L 48 60 L 70 76" fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Teeth */}
          <polygon points="64,48 62,54 68,54" fill="#FFF" />
          <polygon points="64,72 62,66 68,66" fill="#FFF" />
          <text x="94" y="68" fill="#B91C1C" fontWeight="900" fontSize="30">6</text>
        </svg>
      );

    // ==========================================
    // 4. MEASUREMENT & TIME
    // ==========================================
    case 'length-ruler':
    case 'measure':
    case 'measurement':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Ruler measuring length">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          {/* Pencil */}
          <rect x="22" y="32" width="70" height="14" rx="2" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.5" />
          <polygon points="92,32 104,39 92,46" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          <polygon points="100,36 104,39 100,42" fill="#1E293B" />
          {/* Yellow ruler below pencil */}
          <rect x="14" y="58" width="92" height="34" rx="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          {/* Ticks & cm marks */}
          {[
            { x: 22, cm: '0' },
            { x: 44, cm: '1' },
            { x: 66, cm: '2' },
            { x: 88, cm: '3' },
          ].map(m => (
            <g key={m.cm}>
              <line x1={m.x} y1="58" x2={m.x} y2="70" stroke="#854D0E" strokeWidth="2" />
              <text x={m.x} y="84" textAnchor="middle" fill="#713F12" fontWeight="800" fontSize="10">{m.cm}</text>
            </g>
          ))}
        </svg>
      );

    case 'weight-scale':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Kitchen weight scale">
          <rect width="120" height="120" rx="16" fill="#F0FDFA" />
          {/* Top bowl with red apple */}
          <ellipse cx="60" cy="38" rx="34" ry="10" fill="#99F6E4" stroke="#0D9488" strokeWidth="2" />
          <circle cx="60" cy="28" r="12" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          {/* Scale body */}
          <path d="M 38 48 L 82 48 L 76 96 L 44 96 Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
          {/* Dial face */}
          <circle cx="60" cy="72" r="16" fill="#FFF" stroke="#0D9488" strokeWidth="2" />
          <line x1="60" y1="72" x2="68" y2="64" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'volume-cup':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Measuring cup volume">
          <rect width="120" height="120" rx="16" fill="#F0F9FF" />
          {/* Measuring beaker */}
          <path d="M 32 26 L 86 26 L 80 96 L 38 96 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M 86 26 L 94 22 L 86 34" fill="none" stroke="#0284C7" strokeWidth="2" />
          {/* Liquid inside */}
          <path d="M 35 56 L 83 56 L 80 96 L 38 96 Z" fill="#38BDF8" fillOpacity="0.75" />
          {/* Measurement tick lines */}
          <line x1="36" y1="44" x2="48" y2="44" stroke="#0369A1" strokeWidth="2" />
          <line x1="35" y1="56" x2="52" y2="56" stroke="#0369A1" strokeWidth="2.5" />
          <line x1="36" y1="68" x2="48" y2="68" stroke="#0369A1" strokeWidth="2" />
          <line x1="37" y1="80" x2="52" y2="80" stroke="#0369A1" strokeWidth="2" />
        </svg>
      );

    case 'long-short':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Long vs Short comparison">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* Long blue pencil */}
          <rect x="14" y="32" width="92" height="16" rx="3" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
          <polygon points="106,32 116,40 106,48" fill="#FDE047" />
          {/* Short pink pencil */}
          <rect x="14" y="68" width="44" height="16" rx="3" fill="#F87171" stroke="#DC2626" strokeWidth="2" />
          <polygon points="58,68 68,76 58,84" fill="#FDE047" />
        </svg>
      );

    case 'short-crayon':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Tall crayon and short used crayon">
          <rect width="120" height="120" rx="16" fill="#FFF7ED" />
          {/* Tall crayon */}
          <rect x="30" y="24" width="20" height="74" rx="3" fill="#818CF8" stroke="#4F46E5" strokeWidth="2" />
          <polygon points="30,24 40,12 50,24" fill="#6366F1" />
          {/* Short used stubby crayon */}
          <rect x="70" y="64" width="20" height="34" rx="3" fill="#FB923C" stroke="#EA580C" strokeWidth="2" />
          <polygon points="70,64 80,54 90,64" fill="#F97316" />
        </svg>
      );

    case 'tall-giraffe':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Tall giraffe and small rabbit">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          {/* Tall Giraffe neck & head */}
          <path d="M 38 100 L 42 36 L 54 26 L 64 36 L 56 100 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="58" cy="30" r="2.5" fill="#713F12" />
          <circle cx="48" cy="50" r="4" fill="#B45309" />
          <circle cx="50" cy="74" r="5" fill="#B45309" />
          {/* Tiny rabbit at feet */}
          <ellipse cx="86" cy="92" rx="12" ry="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <ellipse cx="82" cy="78" rx="3" ry="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        </svg>
      );

    case 'unit-cm':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Centimeter eraser 4 cm">
          <rect width="120" height="120" rx="16" fill="#FFF1F2" />
          {/* Pink 4cm eraser */}
          <rect x="22" y="32" width="60" height="24" rx="4" fill="#F472B6" stroke="#BE123C" strokeWidth="2" />
          <text x="52" y="48" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">4 cm</text>
          {/* Ruler below */}
          <rect x="14" y="66" width="92" height="30" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          {[
            { x: 22, n: '0' },
            { x: 37, n: '1' },
            { x: 52, n: '2' },
            { x: 67, n: '3' },
            { x: 82, n: '4' },
          ].map(t => (
            <g key={t.n}>
              <line x1={t.x} y1="66" x2={t.x} y2="76" stroke="#78350F" strokeWidth="1.5" />
              <text x={t.x} y="88" textAnchor="middle" fill="#78350F" fontWeight="800" fontSize="9">{t.n}</text>
            </g>
          ))}
        </svg>
      );

    case 'unit-meter':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Door height 2 meters">
          <rect width="120" height="120" rx="16" fill="#F8FAFC" />
          {/* Classroom door */}
          <rect x="34" y="20" width="44" height="84" rx="2" fill="#FED7AA" stroke="#C2410C" strokeWidth="2.5" />
          <circle cx="70" cy="62" r="3" fill="#B45309" />
          {/* 2m measurement line */}
          <line x1="90" y1="20" x2="90" y2="104" stroke="#2563EB" strokeWidth="2" />
          <polygon points="90,20 86,28 94,28" fill="#2563EB" />
          <polygon points="90,104 86,96 94,96" fill="#2563EB" />
          <text x="104" y="66" textAnchor="middle" fill="#1D4ED8" fontWeight="900" fontSize="12">2m</text>
        </svg>
      );

    case 'clock-time':
    case 'clock-face':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Clock face 3:00">
          <rect width="120" height="120" rx="16" fill="#FFFBEB" />
          <circle cx="60" cy="60" r="44" fill="#FFF" stroke="#F59E0B" strokeWidth="4" />
          {/* Clock numbers */}
          <text x="60" y="28" textAnchor="middle" fill="#78350F" fontWeight="900" fontSize="11">12</text>
          <text x="94" y="64" textAnchor="middle" fill="#78350F" fontWeight="900" fontSize="11">3</text>
          <text x="60" y="98" textAnchor="middle" fill="#78350F" fontWeight="900" fontSize="11">6</text>
          <text x="26" y="64" textAnchor="middle" fill="#78350F" fontWeight="900" fontSize="11">9</text>
          {/* Hands showing 3:00 */}
          <line x1="60" y1="60" x2="60" y2="32" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="60" x2="84" y2="60" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="60" r="4" fill="#1F2937" />
        </svg>
      );

    case 'hour-hand':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Hour hand highlighted">
          <rect width="120" height="120" rx="16" fill="#FFF1F2" />
          <circle cx="60" cy="60" r="44" fill="#FFF" stroke="#E2E8F0" strokeWidth="3" />
          {/* Minute hand faint */}
          <line x1="60" y1="60" x2="60" y2="30" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Active bright red hour hand */}
          <line x1="60" y1="60" x2="86" y2="60" stroke="#EF4444" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="60" cy="60" r="4.5" fill="#DC2626" />
          <circle cx="86" cy="60" r="5" fill="#EF4444" />
        </svg>
      );

    case 'minute-hand':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Minute hand highlighted">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          <circle cx="60" cy="60" r="44" fill="#FFF" stroke="#E2E8F0" strokeWidth="3" />
          {/* Hour hand faint */}
          <line x1="60" y1="60" x2="80" y2="60" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Active bright blue minute hand */}
          <line x1="60" y1="60" x2="60" y2="26" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="60" r="4.5" fill="#1D4ED8" />
          <circle cx="60" cy="26" r="5" fill="#2563EB" />
        </svg>
      );

    case 'money-wallet':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Wallet with banknotes and coins">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          {/* Green paper money sticking out */}
          <rect x="32" y="24" width="56" height="30" rx="4" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="60" cy="38" r="7" fill="#22C55E" />
          {/* Leather wallet */}
          <rect x="22" y="44" width="76" height="54" rx="8" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
          <rect x="68" y="60" width="28" height="20" rx="4" fill="#92400E" />
          <circle cx="76" cy="70" r="3" fill="#FDE047" />
          {/* Gold coin in front */}
          <circle cx="38" cy="84" r="10" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
        </svg>
      );

    case 'coin-gold':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Shiny gold coin">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          <circle cx="60" cy="60" r="44" fill="#FACC15" stroke="#CA8A04" strokeWidth="4" />
          <circle cx="60" cy="60" r="34" fill="#FDE047" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
          <text x="60" y="72" textAnchor="middle" fill="#854D0E" fontWeight="900" fontSize="36">$</text>
        </svg>
      );

    // ==========================================
    // 5. DATA & GRAPHS
    // ==========================================
    case 'data-table':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Data tally checklist table">
          <rect width="120" height="120" rx="16" fill="#F8FAFC" />
          {/* Clipboard pad */}
          <rect x="20" y="20" width="80" height="84" rx="6" fill="#FFF" stroke="#94A3B8" strokeWidth="2" />
          <rect x="44" y="14" width="32" height="10" rx="3" fill="#64748B" />
          {/* Rows of data */}
          <text x="32" y="44" fontSize="12">🍎</text>
          <text x="60" y="44" fill="#047857" fontWeight="800" fontSize="14">||||</text>
          <line x1="26" y1="52" x2="94" y2="52" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="32" y="70" fontSize="12">🍌</text>
          <text x="60" y="70" fill="#047857" fontWeight="800" fontSize="14">|||</text>
          <line x1="26" y1="78" x2="94" y2="78" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="32" y="94" fontSize="12">🍊</text>
          <text x="60" y="94" fill="#047857" fontWeight="800" fontSize="14">|||| |</text>
        </svg>
      );

    case 'chart-diagram':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Pet survey tally chart">
          <rect width="120" height="120" rx="16" fill="#FAF5FF" />
          <rect x="16" y="20" width="88" height="80" rx="8" fill="#FFF" stroke="#C084FC" strokeWidth="2" />
          {/* Cat row */}
          <text x="26" y="48" fontSize="16">🐱</text>
          <text x="56" y="48" fill="#7E22CE" fontWeight="900" fontSize="16">||||</text>
          <line x1="20" y1="60" x2="100" y2="60" stroke="#F3E8FF" strokeWidth="2" />
          {/* Dog row */}
          <text x="26" y="82" fontSize="16">🐶</text>
          <text x="56" y="82" fill="#7E22CE" fontWeight="900" fontSize="16">|||</text>
        </svg>
      );

    case 'graph':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Coordinate line graph">
          <rect width="120" height="120" rx="16" fill="#F0F9FF" />
          {/* Axis */}
          <line x1="24" y1="20" x2="24" y2="96" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="96" x2="104" y2="96" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          {/* Grid lines */}
          <line x1="24" y1="70" x2="100" y2="70" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="24" y1="44" x2="100" y2="44" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
          {/* Trend line and dots */}
          <polyline points="34,80 56,48 78,64 96,28" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="80" r="4.5" fill="#EF4444" />
          <circle cx="56" cy="48" r="4.5" fill="#EF4444" />
          <circle cx="78" cy="64" r="4.5" fill="#EF4444" />
          <circle cx="96" cy="28" r="4.5" fill="#EF4444" />
        </svg>
      );

    case 'bar-graph-bars':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Bar graph bars">
          <rect width="120" height="120" rx="16" fill="#F8FAFC" />
          <line x1="20" y1="16" x2="20" y2="96" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="96" x2="104" y2="96" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          {/* 3 Distinct bars */}
          <rect x="28" y="52" width="18" height="44" rx="3" fill="#38BDF8" />
          <rect x="54" y="28" width="18" height="68" rx="3" fill="#34D399" />
          <rect x="80" y="64" width="18" height="32" rx="3" fill="#F472B6" />
        </svg>
      );

    case 'picture-graph':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Picture graph with stars">
          <rect width="120" height="120" rx="16" fill="#FAF5FF" />
          <rect x="14" y="20" width="92" height="80" rx="8" fill="#FFF" stroke="#A855F7" strokeWidth="2" />
          {/* Row 1 */}
          <text x="24" y="48" fontSize="16">📚</text>
          <text x="50" y="48" fontSize="14">⭐⭐⭐</text>
          <line x1="20" y1="58" x2="100" y2="58" stroke="#F3E8FF" strokeWidth="1.5" />
          {/* Row 2 */}
          <text x="24" y="82" fontSize="16">🧸</text>
          <text x="50" y="82" fontSize="14">⭐⭐</text>
        </svg>
      );

    // ==========================================
    // 6. FRACTIONS
    // ==========================================
    case 'fraction-pizza':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Pizza fraction 1/4 lifted">
          <rect width="120" height="120" rx="16" fill="#FFFBEB" />
          {/* 3 remaining pizza slices */}
          <path d="M 56 60 L 56 16 A 44 44 0 1 0 100 60 Z" fill="#FDE047" stroke="#D97706" strokeWidth="2.5" />
          {/* Pepperoni dots on remaining pizza */}
          <circle cx="36" cy="48" r="4.5" fill="#EF4444" />
          <circle cx="38" cy="74" r="4.5" fill="#EF4444" />
          <circle cx="70" cy="78" r="4.5" fill="#EF4444" />
          {/* 1 slice lifted out (1/4) */}
          <path d="M 68 52 L 68 12 A 44 44 0 0 1 108 52 Z" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="82" cy="34" r="4.5" fill="#EF4444" />
        </svg>
      );

    case 'fraction-half':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Two apple halves">
          <rect width="120" height="120" rx="16" fill="#FFF1F2" />
          {/* Left half */}
          <path d="M 48 30 C 26 30 22 56 32 78 C 38 88 48 88 48 88 Z" fill="#F87171" stroke="#DC2626" strokeWidth="2" />
          <circle cx="42" cy="58" r="2.5" fill="#450A0A" />
          {/* Right half */}
          <path d="M 72 30 C 94 30 98 56 88 78 C 82 88 72 88 72 88 Z" fill="#F87171" stroke="#DC2626" strokeWidth="2" />
          <circle cx="78" cy="58" r="2.5" fill="#450A0A" />
          {/* Knife or split line */}
          <line x1="60" y1="20" x2="60" y2="98" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'fraction-whole':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Whole circular pie">
          <rect width="120" height="120" rx="16" fill="#F0F9FF" />
          <circle cx="60" cy="60" r="44" fill="#38BDF8" stroke="#0284C7" strokeWidth="4" />
          {/* Shiny crust glint */}
          <circle cx="60" cy="60" r="36" fill="none" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      );

    case 'equal-parts':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Equal parts 1/3 each">
          <rect width="120" height="120" rx="16" fill="#ECFDF5" />
          {/* Rectangle divided into 3 equal parts */}
          <rect x="18" y="34" width="84" height="52" rx="4" fill="#FFF" stroke="#059669" strokeWidth="2.5" />
          <rect x="18" y="34" width="28" height="52" rx="2" fill="#34D399" fillOpacity="0.8" />
          <rect x="46" y="34" width="28" height="52" fill="#6EE7B7" fillOpacity="0.8" />
          <rect x="74" y="34" width="28" height="52" rx="2" fill="#A7F3D0" fillOpacity="0.8" />
          <line x1="46" y1="34" x2="46" y2="86" stroke="#059669" strokeWidth="2" />
          <line x1="74" y1="34" x2="74" y2="86" stroke="#059669" strokeWidth="2" />
        </svg>
      );

    // ==========================================
    // 7. MULTIPLICATION & DIVISION
    // ==========================================
    case 'multiplication-groups':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="3 groups of 2 multiplication">
          <rect width="120" height="120" rx="16" fill="#EEF2FF" />
          {/* 3 baskets */}
          {[
            { x: 30, y: 44 },
            { x: 60, y: 44 },
            { x: 90, y: 44 },
          ].map((b, idx) => (
            <g key={idx}>
              <circle cx={b.x} cy={b.y} r="14" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
              <circle cx={b.x - 4} cy={b.y} r="4" fill="#EF4444" />
              <circle cx={b.x + 4} cy={b.y} r="4" fill="#EF4444" />
            </g>
          ))}
          {/* Equation badge */}
          <rect x="22" y="74" width="76" height="26" rx="6" fill="#4F46E5" />
          <text x="60" y="92" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="13" fontFamily="monospace">
            3 × 2 = 6
          </text>
        </svg>
      );

    case 'division-share':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="6 shared into 2 plates equals 3">
          <rect width="120" height="120" rx="16" fill="#F5F3FF" />
          {/* Plate 1 with 3 cookies */}
          <ellipse cx="38" cy="46" rx="20" ry="15" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
          <circle cx="32" cy="46" r="3.5" fill="#8B5CF6" />
          <circle cx="38" cy="42" r="3.5" fill="#8B5CF6" />
          <circle cx="44" cy="46" r="3.5" fill="#8B5CF6" />
          {/* Plate 2 with 3 cookies */}
          <ellipse cx="82" cy="46" rx="20" ry="15" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
          <circle cx="76" cy="46" r="3.5" fill="#8B5CF6" />
          <circle cx="82" cy="42" r="3.5" fill="#8B5CF6" />
          <circle cx="88" cy="46" r="3.5" fill="#8B5CF6" />
          {/* Equation badge */}
          <rect x="22" y="74" width="76" height="26" rx="6" fill="#7C3AED" />
          <text x="60" y="92" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="13" fontFamily="monospace">
            6 ÷ 2 = 3
          </text>
        </svg>
      );

    case 'polygon':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Polygon 5-sided pentagon">
          <rect width="120" height="120" rx="16" fill="#EEF2FF" />
          {/* Pentagon with 5 vertices */}
          <polygon points="60,20 100,50 85,95 35,95 20,50" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="3" />
          {/* 5 Golden vertex markers */}
          {[[60, 20], [100, 50], [85, 95], [35, 95], [20, 50]].map(([x, y], idx) => (
            <circle key={idx} cx={x} cy={y} r="4.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          ))}
          <rect x="30" y="55" width="60" height="20" rx="5" fill="#4338CA" />
          <text x="60" y="69" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="11">5 Sides</text>
        </svg>
      );

    case 'shape-generic':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Geometric shapes">
          <rect width="120" height="120" rx="16" fill="#FDF4FF" />
          <circle cx="36" cy="38" r="16" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
          <rect x="68" y="24" width="30" height="30" rx="3" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
          <polygon points="36,70 54,100 18,100" fill="#34D399" stroke="#059669" strokeWidth="2" />
          <polygon points="84,66 88,77 100,77 90,85 94,96 84,89 74,96 78,85 68,77 80,77" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      );

    case 'units':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Units single unit cube">
          <rect width="120" height="120" rx="16" fill="#EFF6FF" />
          {/* 1 Unit 3D cube */}
          <g transform="translate(42, 30)">
            <rect x="0" y="0" width="34" height="34" rx="4" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
            <polygon points="0,0 12,-12 46,-12 34,0" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="2" />
            <polygon points="34,0 46,-12 46,22 34,34" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
          </g>
          <rect x="22" y="80" width="76" height="24" rx="6" fill="#1D4ED8" />
          <text x="60" y="96" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">1 UNIT</text>
        </svg>
      );

    case 'multi-step':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Multi-step calculation">
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          {/* Step 1 badge */}
          <rect x="12" y="20" width="96" height="30" rx="8" fill="#FFF" stroke="#10B981" strokeWidth="2" />
          <text x="22" y="40" fill="#047857" fontWeight="900" fontSize="12">B1: 10 + 5 =</text>
          <text x="92" y="40" textAnchor="middle" fill="#059669" fontWeight="900" fontSize="13">15</text>
          {/* Connecting arrow */}
          <path d="M 60 52 L 60 62" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="55,59 60,65 65,59" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          {/* Step 2 badge */}
          <rect x="12" y="68" width="96" height="34" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2" />
          <text x="60" y="90" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="13">B2: 15 - 3 = 12</text>
        </svg>
      );

    case 'unit-mm':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Millimeter 10 mm = 1 cm">
          <rect width="120" height="120" rx="16" fill="#FEFCE8" />
          {/* Ruler bar */}
          <rect x="12" y="40" width="96" height="40" rx="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          {/* 10 mm ticks inside 1 cm */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <line
              key={i}
              x1={18 + i * 8.4}
              y1="40"
              x2={18 + i * 8.4}
              y2={i % 5 === 0 ? 58 : 50}
              stroke="#713F12"
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          ))}
          <text x="18" y="72" textAnchor="middle" fill="#713F12" fontWeight="800" fontSize="11">0</text>
          <text x="102" y="72" textAnchor="middle" fill="#713F12" fontWeight="800" fontSize="11">1cm</text>
          <rect x="18" y="16" width="84" height="20" rx="4" fill="#CA8A04" />
          <text x="60" y="30" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="11">1 cm = 10 mm</text>
        </svg>
      );

    case 'unit-km':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Kilometer road 1000m">
          <rect width="120" height="120" rx="16" fill="#ECFDF5" />
          {/* Road receding */}
          <polygon points="50,40 70,40 96,110 24,110" fill="#64748B" />
          <line x1="60" y1="42" x2="60" y2="108" stroke="#FDE047" strokeWidth="2.5" strokeDasharray="6 4" />
          {/* Milestone green road sign */}
          <rect x="30" y="14" width="60" height="30" rx="6" fill="#047857" stroke="#065F46" strokeWidth="2" />
          <text x="60" y="28" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">1 km</text>
          <text x="60" y="39" textAnchor="middle" fill="#A7F3D0" fontWeight="700" fontSize="9">= 1,000 m</text>
        </svg>
      );

    case 'unit-inch':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="1 inch = 2.54 cm">
          <rect width="120" height="120" rx="16" fill="#FEF3C7" />
          {/* Dual comparison ruler */}
          <rect x="14" y="22" width="92" height="42" rx="6" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          {/* 1 Inch mark on top */}
          <line x1="22" y1="22" x2="22" y2="34" stroke="#B45309" strokeWidth="2" />
          <line x1="86" y1="22" x2="86" y2="34" stroke="#B45309" strokeWidth="2" />
          <line x1="22" y1="28" x2="86" y2="28" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="54" y="44" textAnchor="middle" fill="#92400E" fontWeight="900" fontSize="13">1 INCH</text>
          {/* Bottom cm equivalency */}
          <rect x="16" y="74" width="88" height="28" rx="6" fill="#D97706" />
          <text x="60" y="93" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">= 2.54 cm</text>
        </svg>
      );

    case 'unit-foot':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="1 foot = 30.48 cm">
          <rect width="120" height="120" rx="16" fill="#FEF9C3" />
          {/* Long 12-inch ruler */}
          <rect x="12" y="26" width="96" height="38" rx="5" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          {[0, 2, 4, 6, 8, 10, 12].map(i => (
            <line key={i} x1={18 + i * 7} y1="26" x2={18 + i * 7} y2="38" stroke="#854D0E" strokeWidth="1.5" />
          ))}
          <text x="60" y="55" textAnchor="middle" fill="#713F12" fontWeight="900" fontSize="13">1 FOOT (12 in)</text>
          {/* Equivalent badge */}
          <rect x="14" y="74" width="92" height="28" rx="6" fill="#CA8A04" />
          <text x="60" y="93" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">= 30.48 cm</text>
        </svg>
      );

    case 'estimate-verb':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Estimate approximation">
          <rect width="120" height="120" rx="16" fill="#F0F9FF" />
          {/* Estimation jar with colorful items */}
          <path d="M 36 34 L 84 34 L 80 94 L 40 94 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <ellipse cx="60" cy="34" rx="24" ry="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <circle cx="50" cy="80" r="5" fill="#F43F5E" />
          <circle cx="68" cy="82" r="5" fill="#10B981" />
          <circle cx="60" cy="68" r="5" fill="#F59E0B" />
          <circle cx="52" cy="56" r="5" fill="#8B5CF6" />
          {/* Guess tag */}
          <rect x="24" y="8" width="72" height="22" rx="6" fill="#0284C7" />
          <text x="60" y="23" textAnchor="middle" fill="#FFF" fontWeight="900" fontSize="12">ƯỚC LƯỢNG ≈</text>
        </svg>
      );

    case 'line-plots':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Line plot with X marks">
          <rect width="120" height="120" rx="16" fill="#F8FAFC" />
          {/* Number line */}
          <line x1="16" y1="88" x2="104" y2="88" stroke="#334155" strokeWidth="2.5" />
          {/* Ticks 1, 2, 3, 4 */}
          {[
            { x: 30, num: '1', count: 2 },
            { x: 50, num: '2', count: 4 },
            { x: 70, num: '3', count: 1 },
            { x: 90, num: '4', count: 3 }
          ].map(pt => (
            <g key={pt.num}>
              <line x1={pt.x} y1="84" x2={pt.x} y2="92" stroke="#334155" strokeWidth="2" />
              <text x={pt.x} y="104" textAnchor="middle" fill="#475569" fontWeight="800" fontSize="11">{pt.num}</text>
              {/* Plotted X marks above */}
              {Array.from({ length: pt.count }).map((_, idx) => (
                <text
                  key={idx}
                  x={pt.x}
                  y={80 - idx * 13}
                  textAnchor="middle"
                  fill="#2563EB"
                  fontWeight="900"
                  fontSize="13"
                  fontFamily="sans-serif"
                >
                  ✕
                </text>
              ))}
            </g>
          ))}
        </svg>
      );

    case 'partition-rectangles':
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Partition rectangle into 6 equal parts">
          <rect width="120" height="120" rx="16" fill="#F0FDF4" />
          {/* Outer rectangle */}
          <rect x="16" y="24" width="88" height="60" rx="4" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2.5" />
          {/* 2 rows x 3 columns partitions */}
          <line x1="16" y1="54" x2="104" y2="54" stroke="#15803D" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="45.3" y1="24" x2="45.3" y2="84" stroke="#15803D" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="74.6" y1="24" x2="74.6" y2="84" stroke="#15803D" strokeWidth="2" strokeDasharray="3 2" />
          {/* Badge: 6 equal parts */}
          <rect x="18" y="92" width="84" height="20" rx="5" fill="#15803D" />
          <text x="60" y="106" textAnchor="middle" fill="#FFF" fontWeight="800" fontSize="10">6 PHẦN BẰNG NHAU</text>
        </svg>
      );

    // Default clean fallback
    default:
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${className}`} aria-label="Math symbol">
          <rect width="120" height="120" rx="16" fill="#FEF3C7" />
          <circle cx="60" cy="60" r="38" fill="#FDE68A" stroke="#F59E0B" strokeWidth="3" />
          <path d="M 44 44 L 76 76 M 76 44 L 44 76" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
};
