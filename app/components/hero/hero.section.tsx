'use client';

export default function HeroSection() {
    return (
        <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
            <div className="text-center px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-4">
                    Florest Plus
                </h1>
                <p className="text-xl md:text-2xl text-green-700">
                    Bem-vindo à Página Home
                </p>
            </div>
        </section>
    );
}