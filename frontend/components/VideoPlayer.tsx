export default function VideoPlayer({ videoPath }: { videoPath: string }) {
    // Ensure the path is properly formatted for the static mount
    // If videoPath is "football_cv\storage\outputs\id.mp4" (Windows), we need to sanitize slashes.
    const sanitizedPath = videoPath.replace(/\\/g, "/");

    return (
        <div className="relative group">
            <video controls width="100%" className="w-full h-auto border-2 border-audi-grey-100 shadow-sm transition-all duration-300 group-hover:border-audi-red/30">
                <source src={`http://localhost:8000/${sanitizedPath}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 left-0 bg-audi-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Live Feed
            </div>
        </div>
    );
}
