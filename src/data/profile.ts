// Content lives in content.json, edited through the CMS at /admin (or by hand).
// This file only adds types so the page gets autocomplete and safe defaults.
import data from './content.json';

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  bio: string[];
  status?: string;
  resumeUrl?: string;
};

export type Project = {
  title: string;
  context?: string;
  description: string;
  tags: string[];
  url?: string;
};

export type Job = {
  role: string;
  company: string;
  period: string;
  highlights?: string[];
};

export type Links = {
  email: string;
  github?: string;
  linkedin?: string;
};

const content = data as {
  profile: Profile;
  skills?: string[];
  projects?: Project[];
  experience?: Job[];
  links: Links;
};

export const profile = content.profile;
export const skills = content.skills ?? [];
export const projects = (content.projects ?? []).map((p) => ({ ...p, tags: p.tags ?? [] }));
export const experience = (content.experience ?? []).map((e) => ({ ...e, highlights: e.highlights ?? [] }));
export const links = content.links;
