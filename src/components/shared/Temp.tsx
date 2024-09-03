import { Progress } from "@/components/ui/progress"

export default function Component() {
  return (
    <div className="fixed inset-0 bg-background">
      <div className="relative w-full h-full">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-lg flex flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="flex items-center gap-2">
            <LoaderIcon className="w-6 h-6 animate-spin" />
            <div className="text-lg font-medium text-primary-foreground">Initializing...</div>
          </div>
          <div className="flex items-center gap-2">
            <DownloadIcon className="w-6 h-6 animate-pulse" />
            <div className="text-lg font-medium text-primary-foreground">Downloading Resources...</div>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-6 h-6 animate-bounce" />
            <div className="text-lg font-medium text-primary-foreground">Ready</div>
          </div>
          <Progress value={100} className="w-full max-w-md" />
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function LoaderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  )
}