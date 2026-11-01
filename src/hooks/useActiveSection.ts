import { useEffect, useState } from 'react';

export function useActiveSection<T extends string>(ids: readonly T[]): T {
  const [activeId, setActiveId] = useState<T>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id as T);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
