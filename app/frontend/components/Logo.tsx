export default function Logo({ className }: { className?: string }) {
    return (
      <svg 
        className={className}
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 书本主体 */}
        <path
          d="M12 8h40v48H12V8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* 书脊 */}
        <path
          d="M12 8v48"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* 书页线 */}
        <path
          d="M20 12v40M28 12v40M36 12v40M44 12v40"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* 笔 */}
        <path
          d="M56 12l-8 8-4-4 8-8 4 4zM48 20l-16 16-4-4 16-16 4 4z"
          fill="currentColor"
        />
        {/* 笔尖 */}
        <path
          d="M32 36l-4 4-8-8 4-4 8 8z"
          fill="currentColor"
        />
      </svg>
    )
  }