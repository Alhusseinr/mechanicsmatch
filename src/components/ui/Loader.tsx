interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 font-semibold leading-6 text-sm shadow-lg rounded-xl text-white bg-blue-500">
          <svg
            className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      </div>
    </div>
  );
}
