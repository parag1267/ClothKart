import { useNavigate, useLocation } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className={`min-h-screen flex items-center justify-center px-2 sm:px-3 lg:px-4 
      ${isAdmin ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-indigo-50'}`}>

      <div className={`w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl sm:rounded-3xl border 
        p-6 sm:p-10 lg:p-14 text-center shadow-xl transition-all
        ${isAdmin ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>

        {/* 404 */}
        <h1 className={`text-8xl sm:text-9xl lg:text-[10rem] font-black leading-none tracking-tight
          ${isAdmin ? 'text-amber-400' : 'text-indigo-500'}`}>
          404
        </h1>

        {/* Divider */}
        <div className={`w-16 sm:w-20 h-1 mx-auto my-4 sm:my-5 rounded-full
          ${isAdmin ? 'bg-amber-400' : 'bg-indigo-400'}`} />

        {/* Title */}
        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3
          ${isAdmin ? 'text-slate-100' : 'text-slate-800'}`}>
          {isAdmin ? 'Admin Page Not Found' : 'Page Not Found'}
        </h2>

        {/* Description */}
        <p className={`text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6
          ${isAdmin ? 'text-slate-400' : 'text-slate-500'}`}>
          {isAdmin
            ? 'This admin route does not exist. Check the URL or return to your dashboard.'
            : "The page you're looking for doesn't exist or may have been moved."}
        </p>

        {/* Path Badge */}
        <div className={`rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm mb-6 sm:mb-8 
          border font-mono break-all text-left
          ${isAdmin
            ? 'bg-slate-900 border-slate-600 text-slate-400'
            : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
          <span className="font-semibold">URL: </span>{location.pathname}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base 
              font-semibold border-2 transition-all duration-200 cursor-pointer active:scale-95
              ${isAdmin
                ? 'border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900'
                : 'border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white'}`}
          >
            ← Go Back
          </button>

          <button
            onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/')}
            className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base 
              font-semibold transition-all duration-200 cursor-pointer active:scale-95
              ${isAdmin
                ? 'bg-amber-400 text-slate-900 hover:bg-amber-300'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
          >
            {isAdmin ? '⚙️ Dashboard' : '🏠 Go Home'}
          </button>
        </div>

        {/* Footer note */}
        <p className={`text-xs mt-6 sm:mt-8 ${isAdmin ? 'text-slate-600' : 'text-slate-400'}`}>
          If you think this is a mistake, please contact support.
        </p>

      </div>
    </div>
  )
}

export default NotFound