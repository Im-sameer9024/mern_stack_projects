import { PiMedalFill } from 'react-icons/pi';
import { FaGraduationCap } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import { FaCode } from 'react-icons/fa6';

const codeStringBlock1 = `
<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>

<body>
     <h1> <a href="/">Header</a> </h1>
</body>
</html>
`;

const codeStringBlock2 = `
<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>

<body>
       <div className="w-full order-1 md:order-0">
          <CodeBlock codeString={codeStringBlock2} />
        </div>
</body>
</html>
`;

const timelineData = [
  {
    id: 1,
    title: 'Leadership',
    des: 'Fully committed to the success company',
    icon: PiMedalFill,
  },
  {
    id: 2,
    title: 'Responsibility',
    des: 'Always take responsibility for my work',
    icon: FaGraduationCap,
  },
  {
    id: 3,
    title: 'Flexibility',
    des: 'The ability to adapt to new situations',
    icon: IoDiamond,
  },
  {
    id: 4,
    title: 'Solve the problem',
    des: 'Code your way to a solution',
    icon: FaCode,
  },
];

const reviewData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos.',
    rating: 3,
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos.',
    rating: 4,
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos.',
    rating: 2,
  },
];

const footerLinks = [
  {
    title: 'Resource',
    links: ['Articles', 'Tutorials', 'Blog', 'News', 'Events', 'FAQs'],
  },
  {
    title: 'Subjects',
    links: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact', 'Privacy Policy', 'Terms & Conditions'],
  },
  {
    title: 'Career Building',
    links: ['Career paths', 'Career services', 'Interview prep', 'Professional certification'],
  },
];

const Roles = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

export const courseStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const userGender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

export const videoStatus = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const availableGender = Object.values(userGender);
export const availableRole = Object.values(Roles);
export const availableCourseStatus = Object.values(courseStatus);
export const availableVideoStatus = Object.values(videoStatus);

export { codeStringBlock1, codeStringBlock2, timelineData, reviewData, footerLinks, Roles };
