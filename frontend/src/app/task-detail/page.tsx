"use client";
import React from "react";
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
        <h1 className="font-bold text-3xl">Tsamts</h1>
        <div>
          <Accordion type="single" collapsible className=" w-[500px]">
            <AccordionItem value="item-1">
              <AccordionTrigger>Hantsui</AccordionTrigger>
              <AccordionContent>
                <TaskDetailModal totalTasks={9} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion type="single" collapsible className=" w-[500px]">
            <AccordionItem value="item-1">
              <AccordionTrigger>Hantsui</AccordionTrigger>
              <AccordionContent>
                <TaskDetailModal totalTasks={5} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
