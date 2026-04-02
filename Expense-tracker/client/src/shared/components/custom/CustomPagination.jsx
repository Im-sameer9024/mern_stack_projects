import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

const CustomPagination = ({ pagination, onPageChange }) => {

  const pages = Array.from({ length: pagination?.totalPages }, (_, i) => i + 1);

  return (
    <div className="py-4 flex justify-center">
      <Pagination>
        <PaginationContent>

          <PaginationItem>
            <PaginationPrevious
              onClick={() => pagination?.page > 1 && onPageChange(pagination?.page - 1)}
              className={pagination?.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {/* 🔢 Page Numbers */}
          {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === pagination?.page}
                onClick={() => onPageChange(p)}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => pagination?.page < pagination?.totalPages && onPageChange(pagination?.page + 1)}
              className={pagination?.page === pagination?.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;