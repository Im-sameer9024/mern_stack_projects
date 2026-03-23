import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { Button } from '../ui/button';

export function PaginationComponent({ pagination, nextPageHandler, prevPageHandler }) {

  const TotalPages = Array(pagination.totalPages)
    .fill(0)
    .map((_, i) => i + 1);


  return (
    <div className=" flex  items-center gap-4 justify-center">
      <Button className={"disabled:cursor-not-allowed"} onClick={prevPageHandler} disabled={pagination.page === 1}>
        <ArrowBigLeft />
        Prev
      </Button>
      <div className=" flex gap-2">
        <span>{pagination.page}</span>
        <span>of</span>
        <span>{pagination.totalPages}</span>
      </div>
      <Button className={"disabled:cursor-not-allowed"} onClick={nextPageHandler} disabled={pagination.page === pagination.totalPages}>
        Next
        <ArrowBigRight />
      </Button>
    </div>
  );
}
