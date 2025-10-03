import React from 'react';

interface IconProps {
  className?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 12 12" 
    className={className}
    fill="currentColor"
  >
    <path d="M5.37 1.222a1 1 0 0 1 1.26 0l3.814 3.09A1.5 1.5 0 0 1 11 5.476V10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7H5v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.477a1.5 1.5 0 0 1 .556-1.166l3.815-3.089Zm4.445 3.866L6 2L2.185 5.088A.5.5 0 0 0 2 5.477V10h2V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h2V5.477a.5.5 0 0 0-.185-.389Z"/>
  </svg>
);

export const AboutIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 15 15" 
    className={className}
    fill="currentColor"
  >
    <path fillRule="evenodd" d="M7.5.875a3.625 3.625 0 0 0-1.006 7.109c-1.194.145-2.218.567-2.99 1.328c-.982.967-1.479 2.408-1.479 4.288a.475.475 0 1 0 .95 0c0-1.72.453-2.88 1.196-3.612c.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 1 0 .95 0c0-1.88-.497-3.32-1.48-4.288c-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 0 0 7.5.875ZM4.825 4.5a2.675 2.675 0 1 1 5.35 0a2.675 2.675 0 0 1-5.35 0Z" clipRule="evenodd"/>
  </svg>
);

export const ExperienceIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 12 12" 
    className={className}
    fill="currentColor"
  >
    <path d="M4 3v-.75C4 1.56 4.56 1 5.25 1h1.5C7.44 1 8 1.56 8 2.25V3h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1Zm1-.75V3h2v-.75A.25.25 0 0 0 6.75 2h-1.5a.25.25 0 0 0-.25.25ZM3 4a1 1 0 0 0-1 1v.5A1.5 1.5 0 0 0 3.5 7H5v-.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V7h1.5A1.5 1.5 0 0 0 10 5.5V5a1 1 0 0 0-1-1H3Zm5.5 4H7v.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8H3.5A2.489 2.489 0 0 1 2 7.5V9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.5c-.418.314-.937.5-1.5.5Z"/>
  </svg>
);

export const ProjectsIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    className={className}
    fill="currentColor"
  >
    <path d="M2 4.5v4.6l.924-1.6A3 3 0 0 1 5.522 6h6.393A1.5 1.5 0 0 0 10.5 5H7a.5.5 0 0 1-.354-.146L4.94 3.146A.5.5 0 0 0 4.586 3H3.5A1.5 1.5 0 0 0 2 4.5Zm5.069 9.495A.506.506 0 0 1 7 14H3.5A2.5 2.5 0 0 1 1 11.5v-7A2.5 2.5 0 0 1 3.5 2h1.086a1.5 1.5 0 0 1 1.06.44L7.207 4H10.5a2.5 2.5 0 0 1 2.458 2.041c1.647.3 2.586 2.18 1.704 3.709l-1.585 2.745a3 3 0 0 1-2.598 1.5h-3.41ZM5.522 7A2 2 0 0 0 3.79 8l-1.585 2.745a1.5 1.5 0 0 0 1.299 2.25h6.975a2 2 0 0 0 1.732-1l1.585-2.745a1.5 1.5 0 0 0-1.3-2.25H5.522Z"/>
  </svg>
);

export const GamesIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    className={className}
    fill="currentColor"
  >
    <g>
      <path d="M7.988 13.877c.104 1.1-.483 2.054-1.303 2.12c-.82.065-1.57-.773-1.673-1.873c-.104-1.101.483-2.054 1.303-2.12c.82-.073 1.57.764 1.673 1.873Zm4.697 12.119c.82-.065 1.407-1.018 1.303-2.119c-.103-1.109-.854-1.946-1.673-1.872c-.82.065-1.407 1.018-1.303 2.119c.103 1.1.854 1.938 1.673 1.872Zm13.001-13.992c.82.065 1.406 1.018 1.302 2.119c-.103 1.109-.854 1.946-1.674 1.873c-.82-.066-1.406-1.019-1.302-2.12c.103-1.1.854-1.938 1.674-1.872Zm-1.698 7.119c.104-1.1-.483-2.054-1.302-2.12c-.82-.065-1.57.773-1.674 1.873c-.104 1.101.483 2.054 1.302 2.12c.82.073 1.57-.764 1.674-1.873Zm-4.302 2.881c.82.065 1.406 1.018 1.302 2.119c-.103 1.109-.854 1.946-1.674 1.872c-.82-.065-1.406-1.018-1.302-2.119c.103-1.1.854-1.938 1.674-1.872Z"/>
      <path d="M13.883 2.451L4.494 6.504c-.219.098-.416.23-.59.39A2.498 2.498 0 0 0 2 9.324v14.17a3 3 0 0 0 1.795 2.747l9.701 4.253c.297.13.6.198.9.21a4.511 4.511 0 0 0 3.209 0c.298-.012.602-.08.899-.21l9.7-4.253A3 3 0 0 0 30 23.493V9.323a2.496 2.496 0 0 0-1.782-2.396a2.02 2.02 0 0 0-.61-.423l-9.49-4.053a5.194 5.194 0 0 0-4.235 0ZM15 14.81v13.396a.5.5 0 0 1-.7.457L4.597 24.41A1 1 0 0 1 4 23.493V9.323a.5.5 0 0 1 .706-.455l9.117 4.118A2 2 0 0 1 15 14.81Zm2 13.396V14.808a2 2 0 0 1 1.177-1.823l9.117-4.118a.5.5 0 0 1 .706.456v14.17a1 1 0 0 1-.598.915L17.7 28.662a.5.5 0 0 1-.701-.457ZM16 7.5c-1.657 0-3-.448-3-1s1.343-1 3-1s3 .448 3 1s-1.343 1-3 1Z"/>
    </g>
  </svg>
);

export const ContactIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    className={className}
    fill="currentColor"
  >
    <path d="M6.5 5A4.5 4.5 0 0 0 2 9.5v13A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5v-13A4.5 4.5 0 0 0 25.5 5h-19ZM28 10.403l-12 6.461l-12-6.461V9.5A2.5 2.5 0 0 1 6.5 7h19A2.5 2.5 0 0 1 28 9.5v.903ZM4 12.674l11.526 6.207a1 1 0 0 0 .948 0L28 12.674V22.5a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 22.5v-9.826Z"/>
  </svg>
);

export const ResumeIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M6 2a2 2 0 0 0-2 2v7.498a6.5 6.5 0 0 1 1.5-.422V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10a.5.5 0 0 1-.5.5h-5.732A6.5 6.5 0 0 1 11.19 22H18a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-5.828-5.828A2 2 0 0 0 12.172 2zm11.38 6.5H14a.5.5 0 0 1-.5-.5V4.62zm-5.38 9a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-5-3a.5.5 0 0 0-1 0v4.793l-1.646-1.647a.5.5 0 0 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5a.5.5 0 0 0-.708-.708L7 19.293z"/>
  </svg>
);

export const LinkedinIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 432 432" 
    className={className}
    fill="currentColor"
  >
    <path d="M319 221.5q-8-10.5-30-10.5q-27 0-38 16t-11 45v146q0 5-3 8t-8 3h-76q-4 0-7.5-3t-3.5-8V148q0-4 3.5-7.5t7.5-3.5h74q4 0 6.5 2t3.5 6v5q1 2 1 7q28-27 76-27q53 0 83 27t30 79v182q0 5-3.5 8t-7.5 3h-78q-4 0-7.5-3t-3.5-8V254q0-22-8-32.5zM88 91.5Q73 107 51.5 107T15 91.5t-15-37T15 18T51.5 3T88 18t15 36.5t-15 37zm13 56.5v270q0 5-3.5 8t-7.5 3H14q-5 0-8-3t-3-8V148q0-4 3-7.5t8-3.5h76q4 0 7.5 3.5t3.5 7.5z"/>
  </svg>
);

export const GithubIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 432 416" 
    className={className}
    fill="currentColor"
  >
    <path d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"/>
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export const BlogIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm2 2h12v2H6V7zm0 4h12v2H6v-2zm0 4h8v2H6v-2z"/>
  </svg>
);

export const Blog2Icon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"/>
    <path d="M6 9h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"/>
  </svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M19 3H5a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/>
  </svg>
);