import { Link } from 'react-router-dom';

export const BreadCrumb = ({ items }) => {
  return (
    <nav className="flex gap-2 flex-wrap">
      {items.map((item, index) => (
        <div key={item.title} className="breadcrumb-item flex gap-2 text-sm">
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-600"
            >
              {item.icon}
              {item.title}
            </Link>
          ) : (
            <p className="flex md:items-center gap-2">
              {item.icon}
              {item.title}
            </p>
          )}
          {index !== items.length - 1 && <span>/</span>}
        </div>
      ))}
    </nav>
  );
};
