import React from "react";
import "./clinic.scss";

export default function Clinic() {
  return (
    <div className="w-[100%]  mx-auto sm:w-[50%]">
      <h1 className="text-[35px] font-semibold">CLINIC</h1>
      <div>
        <div>
          <div className="border border-[grey] p-5 shadow rounded-lg">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="pic"
              className="w-full mb-3 h-[450px] rounded-md"
            />
            <h1>Med Clinic</h1>
            <p>Phone: +998123465897</p>
            <div className="flex gap-3">
              <p>Du-Ju</p>
              <p className="font-semibold text-[#78ff60]">9:00</p>
              <p className="font-semibold text-[#ef4949]">17:00</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-[25px]">Clients</h1>
          <table className="my-3">
            <tr>
              <th>Client</th>
              <th>Doctor</th>
              <th>number</th>
            </tr>
            <tr>
              <td className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="pic"
                  className="w-[30px] mb-3 h-[30px]  rounded-full"
                />
                <p>Hero</p>
              </td>
              <td>Maria Anders</td>
              <td>+99890123456987</td>
            </tr>
            <tr>
              <td className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="pic"
                  className="w-[30px] mb-3 h-[30px]  rounded-full"
                />
                <p>Hero</p>
              </td>
              <td>Maria Anders</td>
              <td>+99890123456987</td>
            </tr>
            <tr>
              <td className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="pic"
                  className="w-[30px] mb-3 h-[30px]  rounded-full"
                />
                <p>Hero</p>
              </td>
              <td>Maria Anders</td>
              <td>+99890123456987</td>
            </tr>
          </table>
        </div>
        <h1 className="text-[32px]">Apteka: 103</h1>
      </div>
    </div>
  );
}
