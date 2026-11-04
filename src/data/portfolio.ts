import { BadgeCheck, Clapperboard, Code2, Github, Instagram, Linkedin, Megaphone, Music2, Palette, Sparkles, Trophy, type LucideIcon } from 'lucide-react';
import heroPhoto from '@/components/sections/Hero/photo_6287293489955410706_y_Nero_AI_Image_Upscaler_Standard_Face.jpeg';
import aboutPhoto from '@/components/sections/About/photo_6285041690141725666_w_(1).jpg';
import javaArchLogo from '@/components/sections/Portfolio/photo_6287293489955410722_w.jpg';
import neoDataraLogo from '@/components/sections/Portfolio/photo_6287293489955410721_w.jpg';
import celestharRing from '@/components/sections/Portfolio/photo_6287293489955410720_y.jpg';
import genshin from '@/components/sections/Portfolio/img.jpg';

//import foto project galeri//



export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const;

export const sectionIds = ['intro', 'about', 'expertise', 'portfolio', 'gallery', 'contact'] as const;

export type SectionId = (typeof sectionIds)[number];

export const profile = {
  name: 'Haryo Bimo Wistoro',
  signature: 'Valeriant Toro de Falkenrath',
  alternateName: 'Valeriant Toro de Falkenrath IV',
  role: 'Digital Enthusiast, Traveler, Volunteer, Creative Designer',
  status: 'Exploring New Horizons',
  statement: 'Digital enthusiast focused on software engineering and creative design.',
  focus: ['Software Engineering', 'Creative Design'],
  portraitUrl: heroPhoto,
  portraitAlt: 'Hiker with a blue backpack overlooking a sea of clouds',
  aboutPortraitUrl: aboutPhoto,
  aboutPortraitAlt: 'Photographer holding a camera',
};

export const aboutContent = {
  lead: 'Driven by curiosity, I turn ideas into meaningful experiences.',
  paragraphs: [
    'Hai, saya Haryo Bimo Wistoro, biasa dipanggil Bimo atau Toro. Di dunia digital, saya dikenal dengan nama Falkenrath atau Falll. Saya adalah seorang digital enthusiast yang memiliki ketertarikan pada software engineering, full-stack development, creative design, serta dunia organisasi dan kepemimpinan. Di luar layar, saya menikmati video editing, menulis, olahraga dan kebugaran, serta perjalanan sebagai backpacker dan solo traveler.',
    'Perjalanan saya juga tumbuh melalui berbagai ruang kolaborasi dan pendidikan. Saya merupakan bagian dari The Celesthar sebagai Aposhtle Fallkenrath IV, pernah mengemban peran sebagai Duta Persada Pendidikan Jatim Junior hingga Senior selama setengah tahun, mengatur incubator startup NeoDatara, serta mendirikan JavaArch Agency sebagai langkah awal perjalanan saya di industri digital dan kreatif.',
  ],
  quote:
    'Great ideas deserve thoughtful execution, and meaningful work is built through curiosity, consistency, and purpose.',
  facts: [
    { label: 'Focus', value: 'Rekayasa perangkat lunak, desain kreatif, dan inovasi digital.' },
    { label: 'Approach', value: 'Memadukan ketelitian teknis, kreativitas, dan pemikiran kolaboratif.' },
    { label: 'Currently', value: 'Mengeksplorasi ide baru, membangun proyek, dan mengembangkan komunitas.' },
  ],
  interests: ['Software Development', 'Creative Design', 'Video Editing', 'Science Innovation', 'Leadership', 'National Volunteering', 'Backpacking', 'Solo Travel'],
  caption: 'Haryo Bimo Wistoro | Valeriant Toro de Falkenrath',
};

export interface ExpertiseArea {
  title: string;
  summary: string;
  icon: LucideIcon;
  skills: string[];
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Company Branding',
    summary: 'Membangun identitas dan citra perusahaan melalui strategi visual, komunikasi merek, dan arah kreatif yang konsisten.',
    icon: Megaphone,
    skills: ['Brand Identity', 'Visual Strategy', 'Logo Design', 'Brand Communication', 'Creative Direction'],
  },
  {
    title: 'Full-Stack Development',
    summary: 'Mengembangkan aplikasi web dari sisi antarmuka hingga logika server dengan fokus pada fungsionalitas dan pengalaman pengguna.',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'],
  },
  {
    title: 'Creative Design',
    summary: 'Mengolah ide menjadi karya visual melalui komposisi, identitas visual, dan eksplorasi desain digital.',
    icon: Palette,
    skills: ['UI/UX Design', 'Graphic Design', 'Visual Composition', 'Figma', 'Affinity', 'Canva'],
  },
  {
    title: 'Digital Media & Innovation',
    summary: 'Mengembangkan konten dan gagasan digital melalui pendekatan kreatif, eksplorasi media, dan inovasi.',
    icon: Clapperboard,
    skills: ['Video Editing', 'Motion Graphics', 'Content Creation', 'Digital Storytelling', 'Creative Innovation'],
  },
];

export const toolsMarquee = [
  'Visual Studio Code',
  'React',
  'Next.js',
  'Figma',
  'Canva',
  'Affinity',
  'Adobe Lightroom',
  'CapCut',
  'GitHub',
  'JavaScript',
  'Ubuntu',
];

export interface Project {
  id: string;
  title: string;
  category: string;
  status?: string;
  summary: string;
  image: string;
  imageAlt: string;
  links: { label: string; href: string }[];
  stack?: string[];
}



export interface TimelineEntry {
  title: string;
  organisation: string;
  summary?: string;
}

export interface TimelineGroup {
  title: string;
  entries: TimelineEntry[];
}

export const experienceGroups: TimelineGroup[] = [
  {
    title: 'Education & leadership',
    entries: [
      {
        title: 'Duta Persada Jawa Timur',
        organisation: 'Duta Persada',
        summary: 'Contribution to educational initiatives, youth development, and community education. Served from Junior to Senior level over half a year.',
      },
      {
        title: 'Python Programming Course',
        organisation: 'Dicoding',
        summary: 'Successfully completed [Memulai Pemrograman dengan Python] by Dicoding Indonesia, gaining foundational knowledge of Python syntax, programming logic, and core concepts.',
      },
      {
        title: 'Data Science Bootcamp',
        organisation: 'Digital Skola',
        summary: 'Completed a Data Science Bootcamp, gaining practical insights into data analysis, data processing, and fundamental data science concepts.',
      },
    ],
  },
  {
    title: 'National volunteering',
    entries: [
      { title: 'Volunteer', organisation: 'Peka Nusantara | West Lombok' },
      { title: 'Volunteer', organisation: 'Rekan Jember | East Java' },
      { title: 'Volunteer', organisation: 'UNEV Indonesia | East Bali' },
      { title: 'Volunteer', organisation: 'WCD Indonesia | East Java' },
      { title: 'Volunteer', organisation: 'Color Runing | East Java' },
      { title: 'Volunteer', organisation: 'Peka Nusantara | West Halmahera' },
    ],
  },
  {
    title: 'Work & Intern',
    entries: [
      { title: 'Creative Designer', organisation: 'Peka Nusantara' },
      { title: 'Kitchen Staff', organisation: 'D Kriuk Jember' },
      { title: 'Intern Creative', organisation: 'NAYS Indonesia' },
      { title: 'Head of Media', organisation: 'Al Miswati Banyuwangi' },
      { title: 'Creative Media', organisation: 'Continuum' },
      { title: 'Creative Media', organisation: 'UNEV Indonesia' },
      { title: 'Creative Media', organisation: 'Cerdas Mandiri' },
    ],
  },
];

export type AchievementKind = 'award' | 'certification' | 'accomplishment';

export interface Achievement {
  kind: AchievementKind;
  title: string;
  detail: string;
}

export const achievementKinds: Record<AchievementKind, { label: string; icon: LucideIcon }> = {
  award: { label: 'Award', icon: Trophy },
  certification: { label: 'Certification', icon: BadgeCheck },
  accomplishment: { label: 'Accomplishment', icon: Sparkles },
};

export const achievements: Achievement[] = [
  { kind: 'award', title: '1st Place, Banyuwangi Viper Fight', detail: 'Kick Boxing category' },
  { kind: 'award', title: 'Best Facilitator, Duta Persada Nusantara', detail: 'Selected as the best facilitator' },
  { kind: 'award', title: 'National Volunteer Facilitator', detail: 'Selected three times as a national volunteer facilitator' },
  { kind: 'certification', title: 'Memulai Pemrograman dengan Python', detail: 'Dicoding' },
  { kind: 'certification', title: 'Introduction to Software Engineering', detail: 'RevoU' },
  { kind: 'certification', title: 'MAPID Licence', detail: 'Licence holder' },
  { kind: 'accomplishment', title: 'Semifinalist, MAPID WebGIS Competition 2025', detail: 'Reached the semifinal round' },
  { kind: 'accomplishment', title: 'Top 10 Finisher, PaceSweatCulture Running Event', detail: 'Placed in the top 10 of a running event' },
  { kind: 'accomplishment', title: 'Running Event Finisher', detail: 'Completed more than five running events across Indonesia' },
];

export const activityHighlights = {
  primary: 'Community Involvement',
  others: ['Volunteering', 'Writing', 'Sports & Fitness'],
  communities: ['The Celesthar', 'NeoDatara', 'JavaArch Agency'],
};

export type ActivityCategory = 'Creative' | 'Community';

export interface Activity {
  category: ActivityCategory;
  caption: string;
  image: string;
  alt: string;
  featured?: boolean;
}

export const activityCategories: ActivityCategory[] = ['Creative', 'Community'];

export const activities: Activity[] = [
  {
    category: 'Creative',
    caption: 'Study in form, Elevator light',
    image: 'https://cdn.corenexis.com/f/ErAlGyUy.jpg',
    alt: 'Circular light in a modern elevator shaft with sleek metal lines',
    featured: true,
  },
  {
    category: 'Creative',
    caption: 'Monochrome, Spiral stair',
    image: 'https://cdn.corenexis.com/f/qWTIA9Fq.jpg',
    alt: 'Abstract black and white view of a spiral staircase',
    featured: true,
  },
  {
    category: 'Creative',
    caption: 'Geometry, Ceiling pattern',
    image: 'https://cdn.corenexis.com/f/Jai7EQLu.jpg',
    alt: 'Black and white geometric ceiling design',
    featured: true,
  },
    {
    category: 'Community',
    caption: 'Workshop, Peer session',
    image: 'https://images.pexels.com/photos/39562205/pexels-photo-39562205.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Group of adults attending a seminar in a modern indoor setting',
    featured: true,
  },
    {
    category: 'Community',
    caption: 'Ideation, Team session',
    image: 'https://images.pexels.com/photos/34520939/pexels-photo-34520939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Creative team engaged in a brainstorming session in a studio',
  },
  {
    category: 'Community',
    caption: 'Ideation, Team session',
    image: 'https://images.pexels.com/photos/34520939/pexels-photo-34520939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Creative team engaged in a brainstorming session in a studio',
  },
  {
    category: 'Creative',
    caption: 'Geometry, Ceiling pattern',
    image: 'https://cdn.corenexis.com/f/uiOcYdnT.jpg',
    alt: 'Black and white geometric ceiling design',
    featured: true,
  },

  {
    category: 'Creative',
    caption: 'Geometry, Ceiling pattern',
    image: 'https://cdn.corenexis.com/f/r2wutGV1.jpg',
    alt: 'Black and white geometric ceiling design',
    featured: true,
  },

  {
    category: 'Community',
    caption: 'Outdoor art, Community day',
    image: 'https://images.pexels.com/photos/35577036/pexels-photo-35577036.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Group of people taking part in an outdoor art activity in black and white',
  },
  {
    category: 'Community',
    caption: 'Craft room, Hands-on',
    image: 'https://images.pexels.com/photos/38446264/pexels-photo-38446264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Diverse group of people in an indoor creative workshop',
  },
];

export const contact = {
  email: 'falkenrath.vallery@gmail.com',
  headline: 'Have a project in mind?',
  intro: "Let's build something meaningful together.",
  location: 'Java Island, Indonesia',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/ncho_owen', icon: Instagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/haryo-bimo-wistoro-194782344/', icon: Linkedin },
    { label: 'GitHub', href: 'https://github.com/NexaFalken', icon: Github },
    { label: 'TikTok', href: 'https://www.tiktok.com/@sastaria_falkenrath', icon: Music2 },
  ],
};
