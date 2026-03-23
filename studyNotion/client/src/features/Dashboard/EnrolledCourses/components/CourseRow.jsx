import { TableCell, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { HiDotsVertical } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

const CourseRow = ({ course }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <img
            src={course.image}
            alt="course"
            className="size-10 rounded-md object-cover hidden sm:block"
          />

          <div>
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-xs text-gray-400">{course.description}</p>
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden sm:table-cell">{course.duration}</TableCell>

      <TableCell className="w-55">
        <div className="space-y-1">
          <p className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </p>

          <Progress value={course.progress} />
        </div>
      </TableCell>

      <TableCell>
        <div className="flex justify-end">
          <Button
            variant="icon"
            className=" hover:cursor-pointer rounded-full hover:bg-richBlack-700"
          >
            <HiDotsVertical size={20} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default memo(CourseRow);
