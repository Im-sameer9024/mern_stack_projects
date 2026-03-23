import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import TableView from './TableView';

const Courses = () => {
  return (
    <div>
      <Tabs defaultValue="All">
        <TabsList className="bg-richBlack-800 p-1 gap-2 rounded-full ">
          {['All', 'Pending', 'Completed'].map((item) => (
            <TabsTrigger
              value={item}
              key={item}
              className="data-[state=active]:bg-richBlack-900 data-[state=active]:text-white rounded-full"
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="All" className="text-slate-400">
          <TableView />
        </TabsContent>
        <TabsContent value="analytics">
          <div>Analytics</div>
        </TabsContent>
        <TabsContent value="reports">
          <div>Reports</div>
        </TabsContent>
        <TabsContent value="settings">
          <div>Settings</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
