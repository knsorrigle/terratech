const coordinators = [
  {
    avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=KC&chars=2&backgroundColor=F5A623&textColor=000000&fontSize=38&fontWeight=700',
    name: 'Kruthi C',
    phone: '919445858807',
  },
  {
    avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=MZ&chars=2&backgroundColor=ffffff&textColor=000000&fontSize=38&fontWeight=700',
    name: 'Muizzah',
    phone: '919035702955',
  },
];

export function CoordinatorWidget({ className }: { className?: string }) {
  return (
    <div className={className ?? "absolute top-24 right-6 md:right-16 z-10 flex flex-col items-end gap-2"}>
      <p className="text-[9px] tracking-[0.25em] text-white/25 uppercase mb-1">
        Coordinators
      </p>
      <div className="flex items-center gap-2">
        {coordinators.map((c, i) => (
          <a
            key={i}
            href={`https://wa.me/${c.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 group"
            title={`WhatsApp ${c.name}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-amber-400/50 transition-all duration-300 group-hover:scale-110">
              <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[8px] tracking-widest text-white/20 group-hover:text-amber-400 transition-colors uppercase whitespace-nowrap">
              {c.name.split(' ')[0]}
            </span>
          </a>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-1">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[8px] tracking-widest text-white/20 uppercase">
          Available on WhatsApp
        </span>
      </div>
    </div>
  );
}
