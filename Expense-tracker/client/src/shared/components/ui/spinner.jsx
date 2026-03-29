import { cn } from '@/shared/lib/utils';
// import { Loader2Icon } from "lucide-react"
import { LoaderIcon } from 'lucide-react';

function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
