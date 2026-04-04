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

export function CoordinatorWidget({ className, isNavbar = false }: { className?: string; isNavbar?: boolean }) {
  if (isNavbar) {
    return (
      <div className={className ?? "flex items-center gap-2 md:gap-4"}>
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-[6.5px] xs:text-[8px] font-mono font-bold tracking-[0.1em] xs:tracking-[0.15em] text-white/40 uppercase leading-none">
            Contact Coordinators
          </p>
          <div className="flex items-center gap-1">
            <div className="w-0.5 h-0.5 xs:w-1 xs:h-1 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[6.5px] xs:text-[7px] tracking-widest text-white/20 uppercase">
              Online
            </span>
          </div>
        </div>
        <div className="flex items-center -space-x-2">
          {coordinators.map((c, i) => (
            <a
              key={i}
              href={`https://wa.me/${c.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group transition-transform hover:z-10 hover:scale-110"
              title={`WhatsApp ${c.name}`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#050505] group-hover:border-amber-400/50 transition-all duration-300">
                <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className ?? "absolute top-24 right-6 md:right-16 z-10 flex flex-col items-end gap-2"}>
      <p className="text-[9px] font-mono font-bold tracking-[0.25em] text-white/40 uppercase mb-1">
        Contact Coordinators
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
