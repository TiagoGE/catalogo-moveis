import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-[#DBCFBC]/90 backdrop-blur-md border-b border-[#CBBDA8]">
            <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">

                {/* Logo / Nome */}
                <Link
                    to="/"
                    className="text-lg font-semibold tracking-wide text-[#2B1E14] transition hover:text-amber-900 active:scale-97"
                >
                    Catálogo de Móveis
                </Link>

                {/* WhatsApp */}
                <a
                    href="https://wa.me/5511999007552"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-green-700 hover:scale-99"
                >
                    WhatsApp
                </a>
            </div>
        </header>
    );
}
