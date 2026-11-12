
export interface ToolkitItem {
  name: string;
  category: string;
  icon: string;
}

export const toolkitItems: ToolkitItem[] = [
  // Development tools
  { name: 'Visual Studio Code', category: 'Development', icon: 'siVisualstudiocode' },
  { name: 'PyCharm', category: 'Development', icon: 'siPycharm' },
  { name: 'Replit', category: 'Development', icon: 'siReplit' },
  { name: 'GitHub', category: 'Development', icon: 'siGithub' },
  { name: 'Vercel', category: 'Deployment & Hosting', icon: 'siVercel',},
  { name: 'Git', category: 'Deployment', icon: 'siGit',},
  
  // Programming languages & data formats
  { name: 'TypeScript', category: 'Languages', icon: 'siTypescript' },
  { name: 'JavaScript', category: 'Languages', icon: 'siJavascript' },
  { name: 'Python', category: 'Languages', icon: 'siPython' },
  { name: 'PHP', category: 'Languages', icon: 'siPhp' },
  { name: 'Ruby', category: 'Languages', icon: 'siRuby' },
  { name: 'Go', category: 'Languages', icon: 'siGo' },
  { name: 'C#', category: 'Languages', icon: 'siCsharp' },
  { name: 'C++', category: 'Languages', icon: 'siCplusplus' },
  { name: 'Kotlin', category: 'Languages', icon: 'siKotlin' },
  { name: 'Rust', category: 'Languages', icon: 'siRust' },
  { name: 'HTML', category: 'Languages', icon: 'siHtml5' },
  { name: 'CSS', category: 'Languages', icon: 'siCss3' },
  { name: 'JSON', category: 'Data Format', icon: 'siJson' },

  // Frameworks & runtime
  { name: 'React', category: 'Frameworks', icon: 'siReact' },
  { name: 'Next.js', category: 'Frameworks', icon: 'siNextdotjs' },
  { name: 'Tailwind CSS', category: 'Frameworks', icon: 'siTailwindcss' },
  { name: 'Node.js', category: 'Runtime', icon: 'siNodedotjs' },

  // Backend
  { name: 'Supabase', category: 'Backend', icon: 'siSupabase' },

  // AI
  { name: 'ChatGPT', category: 'AI', icon: 'siOpenai' },
  { name: 'Claude', category: 'AI', icon: 'siClaude' },

  // Creative tools
  { name: 'Figma', category: 'Creative', icon: 'siFigma' },
  { name: 'Canva', category: 'Creative', icon: 'siCanva' },
  { name: 'Affinity', category: 'Creative', icon: 'siAffinity' },
  { name: 'Adobe Lightroom', category: 'Creative', icon: 'siAdobelightroom' },
  { name: 'CapCut', category: 'Creative', icon: 'siCapcut' },

  // Operating systems
  { name: 'Ubuntu', category: 'Environment', icon: 'siUbuntu' },
  { name: 'Arch Linux', category: 'Environment', icon: 'siArchlinux' },
];
