import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  bio: string;
  building: string;
  tags: string[];
  avatar_url: string;
};

export default function ProfileCard({ id, name, bio, building, tags, avatar_url }: Props) {
  const initials = (name || 'U').slice(0, 2).toUpperCase();

  return (
    <Link href={`/profile/${id}`} className="block group">
      <div className="bg-dark-200 border border-dark-300 rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 h-full">
        <div className="flex items-center gap-4 mb-4">
          {avatar_url ? (
            <img src={avatar_url} alt={name} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
              {initials}
            </div>
          )}
          <div>
            <h3 className="text-white font-semibold group-hover:text-accent transition">{name || 'Anonymous'}</h3>
            {building && (
              <p className="text-xs text-gray-500 mt-0.5">Building: {building}</p>
            )}
          </div>
        </div>
        {bio && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{bio}</p>}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20">
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-dark-300 text-gray-500">
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
