'use client';
import { Badge }  from '../components/ui/badge';
import { Input }  from '../components/ui/input';
import { Button } from '../components/ui/button';
import { X } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  statusColor: 'yellow' | 'green' | 'blue' | 'red';
  filterValue: string;
  onFilterClear: () => void;
}

export function PageHeader({ title, statusColor, filterValue, onFilterClear }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <Badge className={`bg-${statusColor}-100 text-${statusColor}-600`}>
          <div className={`h-2 w-2 rounded-full bg-${statusColor}-600`} />
        </Badge>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="flex items-center space-x-2">
        {filterValue && (
          <div className="flex items-center border rounded px-2 py-1">
            <span className="mr-1">{filterValue}</span>
            <X size={14} className="cursor-pointer" onClick={onFilterClear} />
          </div>
        )}
        <Input
          placeholder="Filter by…"
          value={filterValue}
          onChange={e => {/* handle live filter */}}
          className="w-48"
        />
      </div>
    </div>
  );
}
