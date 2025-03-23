"use client"

export default function MathIllustration() {
  return (
    <div className="relative w-full h-64 md:h-80">
      <div className="absolute top-0 right-0 w-full h-full">
        <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Calculator background */}
          <rect x="120" y="20" width="200" height="260" rx="15" fill="#F0F4FF" stroke="#4F7CFF" strokeWidth="2" />

          {/* Calculator screen */}
          <rect x="140" y="40" width="160" height="60" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />

          {/* Score display */}
          <text x="280" y="60" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="end">
            15/100
          </text>

          {/* Calculator buttons */}
          <rect x="140" y="120" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="155" y="140" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            1
          </text>

          <rect x="180" y="120" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="195" y="140" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            2
          </text>

          <rect x="220" y="120" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="235" y="140" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            3
          </text>

          <rect x="260" y="120" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="275" y="140" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            +
          </text>

          <rect x="140" y="160" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="155" y="180" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            4
          </text>

          <rect x="180" y="160" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="195" y="180" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            5
          </text>

          <rect x="220" y="160" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="235" y="180" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            6
          </text>

          <rect x="260" y="160" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="275" y="180" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            -
          </text>

          <rect x="140" y="200" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="155" y="220" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            7
          </text>

          <rect x="180" y="200" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="195" y="220" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            8
          </text>

          <rect x="220" y="200" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="235" y="220" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            9
          </text>

          <rect x="260" y="200" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="275" y="220" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            ×
          </text>

          <rect x="140" y="240" width="70" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="175" y="260" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            0
          </text>

          <rect x="220" y="240" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="235" y="260" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            .
          </text>

          <rect x="260" y="240" width="30" height="30" rx="5" fill="white" stroke="#4F7CFF" strokeWidth="1" />
          <text x="275" y="260" fontFamily="Arial" fontSize="14" fill="#4F7CFF" textAnchor="middle">
            ÷
          </text>

          {/* Person */}
          <g transform="translate(60, 150)">
            {/* Body */}
            <rect x="0" y="30" width="40" height="60" rx="10" fill="#FF9F43" />

            {/* Head */}
            <circle cx="20" cy="15" r="15" fill="#FFD8B4" />

            {/* Eyes */}
            <circle cx="15" cy="12" r="2" fill="#333" />
            <circle cx="25" cy="12" r="2" fill="#333" />

            {/* Smile */}
            <path d="M15 20 Q20 25, 25 20" stroke="#333" strokeWidth="1.5" fill="none" />

            {/* Arms */}
            <rect x="-10" y="40" width="20" height="8" rx="4" fill="#FFD8B4" />
            <rect x="30" y="40" width="40" height="8" rx="4" fill="#FFD8B4" transform="rotate(20, 30, 40)" />

            {/* Legs */}
            <rect x="5" y="90" width="10" height="30" rx="5" fill="#2D3748" />
            <rect x="25" y="90" width="10" height="30" rx="5" fill="#2D3748" />
          </g>

          {/* Math symbols floating */}
          <text x="330" y="70" fontFamily="Arial" fontSize="24" fill="#4F7CFF" textAnchor="middle">
            +
          </text>
          <text x="350" y="100" fontFamily="Arial" fontSize="24" fill="#4F7CFF" textAnchor="middle">
            %
          </text>
          <text x="320" y="130" fontFamily="Arial" fontSize="24" fill="#4F7CFF" textAnchor="middle">
            =
          </text>
          <text x="90" y="90" fontFamily="Arial" fontSize="24" fill="#4F7CFF" textAnchor="middle">
            π
          </text>
          <text x="70" y="120" fontFamily="Arial" fontSize="24" fill="#4F7CFF" textAnchor="middle">
            √
          </text>

          {/* Pencil */}
          <g transform="translate(300, 180) rotate(45)">
            <rect x="0" y="0" width="80" height="10" rx="2" fill="#FFD43B" />
            <polygon points="0,0 0,10 -15,5" fill="#ED8936" />
            <rect x="65" y="0" width="15" height="10" fill="#A0AEC0" />
          </g>
        </svg>
      </div>
    </div>
  )
}

