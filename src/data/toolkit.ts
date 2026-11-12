

export type ToolkitItem = {
  name: string;
  category: string;
  icon: string;
  monochrome?: boolean;
};

export const toolkitItems: ToolkitItem[] = [
  // Development Tools
  { name: 'Visual Studio Code', category: 'Development Tools', icon: 'siVisualstudiocode' },
  { name: 'PyCharm', category: 'Development Tools', icon: 'siPycharm' },
  { name: 'Replit', category: 'Development Tools', icon: 'siReplit' },
  { name: 'Vercel', category: 'Deployment & Hosting', icon: 'siVercel',},
  { name: 'Git', category: 'Deployment', icon: 'siGit',},
  
  // Version Control & Collaboration
  { name: 'Git', category: 'Version Control', icon: 'siGit' },
  { name: 'GitHub', category: 'Version Control', icon: 'siGithub' },

  // Languages
  { name: 'JavaScript', category: 'Languages', icon: 'siJavascript' },
  { name: 'TypeScript', category: 'Languages', icon: 'siTypescript' },
  { name: 'PHP', category: 'Languages', icon: 'siPhp' },
  { name: 'Ruby', category: 'Languages', icon: 'siRuby' },
  { name: 'Go', category: 'Languages', icon: 'siGo' },
  { name: 'C#', category: 'Languages', icon: 'siCsharp' },
  { name: 'C++', category: 'Languages', icon: 'siCplusplus' },
  { name: 'Kotlin', category: 'Languages', icon: 'siKotlin' },
  { name: 'Rust', category: 'Languages', icon: 'siRust' },
  { name: 'Python', category: 'Languages', icon: 'siPython' },

  // Web Technologies & Data
  { name: 'HTML5', category: 'Web Technologies', icon: 'siHtml5' },
  { name: 'CSS3', category: 'Web Technologies', icon: 'siCss3' },
  { name: 'JSON', category: 'Data Format', icon: 'siJson' },

  // Frameworks & Runtime
  { name: 'React', category: 'Frameworks', icon: 'siReact' },
  { name: 'Next.js', category: 'Frameworks', icon: 'siNextdotjs', monochrome: true },
  { name: 'Tailwind CSS', category: 'Frameworks', icon: 'siTailwindcss' },
  { name: 'Node.js', category: 'Runtime', icon: 'siNodedotjs' },

  // Backend
  { name: 'Supabase', category: 'Backend', icon: 'siSupabase' },

  // AI Tools
  { name: 'ChatGPT', category: 'AI Tools', icon: 'siOpenai', monochrome: true },
  { name: 'Claude', category: 'AI Tools', icon: 'siClaude' },

  // Creative Tools
  { name: 'Figma', category: 'Creative Tools', icon: 'siFigma' },
  { name: 'Canva', category: 'Creative Tools', icon: 'siCanva' },
  { name: 'Affinity', category: 'Creative Tools', icon: 'siAffinitydesigner' },
  { name: 'Adobe Lightroom', category: 'Creative Tools', icon: 'siAdobelightroom' },
  { name: 'CapCut', category: 'Creative Tools', icon: 'siCapcut' },

  // Operating Systems
  { name: 'Ubuntu', category: 'Operating Systems', icon: 'siUbuntu' },
  { name: 'Arch Linux', category: 'Operating Systems', icon: 'siArchlinux' },

  // Deployment & Hosting
  { name: 'Vercel', category: 'Deployment & Hosting', icon: 'siVercel', monochrome: true },
];
