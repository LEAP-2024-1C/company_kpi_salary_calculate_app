"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskDetailModal from "@/components/taskDetailModal";

const TaskDetail = () => {
  return (
    <div className="w-full h-full">
      <div className="p-16 flex flex-col items-start gap-5">
        <h1 className="font-bold text-3xl">Task Name</h1>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Hantsui</AccordionTrigger>
              <AccordionContent>
                <TaskDetailModal />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div></div>
          <ul></ul>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
