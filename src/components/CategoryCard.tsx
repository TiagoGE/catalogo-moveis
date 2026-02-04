import { Link } from 'react-router-dom';
import type { Category } from '../types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="group relative flex h-56 sm:h-52 items-center justify-center rounded-3xl bg-white border border-[#E2D8CF] shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1"
    >
      {/* faixa de cor */}
      <div className="absolute inset-x-0 bottom-0 h-2 bg-[#9C6B4E] transition-all group-hover:h-3"/>

      <span className="text-xl sm:text-2xl font-semibold uppercase tracking-widest text-[#2B1E14] group-hover:text-[#9C6B4E] transition">
        {category.name}
      </span>
    </Link>
  );
}
