import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center bg-audi-white">
            <div className="w-full max-w-4xl space-y-8 text-center">
                <h1 className="text-7xl font-bold tracking-tighter uppercase text-audi-black leading-none">
                    Pure <span className="text-audi-red">Performance</span>.
                </h1>

                <p className="mx-auto max-w-2xl text-xl font-light text-audi-grey-600 tracking-wide">
                    Elevate your analysis with AI-driven insights.
                    Precision tracking, possession metrics, and physical data at the speed of light.
                </p>

                <div className="pt-10">
                    <Link
                        href="/upload"
                        className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold tracking-widest text-audi-white uppercase transition-all duration-300 bg-audi-black hover:bg-audi-red focus:outline-none focus:ring-2 focus:ring-audi-red focus:ring-offset-2"
                    >
                        <span className="relative">Start Configuration</span>
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-audi-red/20" />
                    </Link>
                </div>
            </div>

            {/* Audi-style bottom accent */}
            <div className="fixed bottom-10 left-0 w-full text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-audi-grey-300">
                    Powered by Computer Vision
                </p>
            </div>
        </main>
    );
}
