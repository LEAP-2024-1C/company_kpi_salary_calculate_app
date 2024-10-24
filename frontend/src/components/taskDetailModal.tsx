"use client";

import React from "react";
import { Button } from "./ui/button";

const TaskDetailModal = () => {
  return (
    <div>
      <dialog id="my_modal_1" className="modal rounded-xl">
        <div className="modal-box w-[900px] h-[500px] p-5">
          <h3 className="font-bold text-xl">Task Name</h3>
          <div className="overflow-x-auto mt-5">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr className="font-bold">
                  <th></th>
                  <td>Хийгдэх ажилууд</td>
                  <td>Тоо</td>
                  <td>Нэгж Үнэ</td>
                  <td>Шаардлагатай тоо</td>
                  <td>Эцсийн хугацаа</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr className="border p-3">
                  <th>1</th>
                  <td>Holboh</td>
                  <td>3</td>
                  <td>250</td>
                  <td>10</td>
                  <td>12/16/2020</td>
                  <td>
                    <Button>Сонгох</Button>
                  </td>
                </tr>
                <tr className="border p-3">
                  <th>2</th>
                  <td>Dotor</td>
                  <td>5</td>
                  <td>1000</td>
                  <td>20</td>
                  <td>12/5/2020</td>
                  <td>
                    <Button>Сонгох</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TaskDetailModal;
