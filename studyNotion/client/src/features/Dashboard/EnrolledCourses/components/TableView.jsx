import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import CourseRow from './CourseRow';
import Image from '/Images/login.webp';

const courses = [
  {
    id: 1,
    title: 'The Complete Python',
    description: 'Short Description',
    duration: '2hr 40m',
    progress: 33,
    image: Image,
  },
  {
    id: 2,
    title: 'React Mastery',
    description: 'Short Description',
    duration: '3hr 20m',
    progress: 80,
    image: Image,
  },
  {
    id: 3,
    title: 'NodeJS Backend',
    description: 'Short Description',
    duration: '4hr 10m',
    progress: 100,
    image: Image,
  },
];

const TableView = () => {
  return (
    <Table>
      <TableHeader className="bg-richBlack-500/60">
        <TableRow>
          <TableHead className="text-white">Course Name</TableHead>
          <TableHead className="text-white hidden sm:table-cell">Duration</TableHead>
          <TableHead className="text-white">Progress</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {courses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;
