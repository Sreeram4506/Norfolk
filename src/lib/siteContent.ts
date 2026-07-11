import { exhibitionsConfig } from '../config';

export interface SiteContent {
  heroVideo: string;
  featuredProjectVideo: string;
  featuredProjectLabel: string;
  featuredProjectTitle: string;
  featuredProjectSubtitle: string;
  featuredProjectStatus: string;
  featuredProjectLocation: string;
  exhibitions: Array<{
    id: number;
    title: string;
    date: string;
    video?: string;
    image?: string;
    gallery?: string[];
  }>;
}

export const defaultSiteContent: SiteContent = {
  heroVideo: '/videos/hero.mp4',
  featuredProjectVideo: '/videos/Westwood Fire Training.mov',
  featuredProjectLabel: 'Specialized Infrastructure',
  featuredProjectTitle: 'Westwood',
  featuredProjectSubtitle: 'Fire Training',
  featuredProjectStatus: 'In Progress / Specialized Facility',
  featuredProjectLocation: 'Westwood, Massachusetts',
  exhibitions: exhibitionsConfig.exhibitions.map((entry) => ({ ...entry })),
};
