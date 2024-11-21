import { FooterNavbar } from "../footer/footer";
import { Youtube } from "@/app/assets/svgs/youtube";
import TaskImage from "@/app/assets/imgs/task.png";
import Image from "next/image";

export function Task() {
  return (
    <section className="h-screen w-full flex flex-col justify-between">
      <div className="text-white mx-6 flex flex-col">
        <div className=" relative flex flex-col justify-center items-center mt-10">
          {/* <h3>Task</h3> */}
          <span className="flex justify-center items-center">
            <Image
              src={TaskImage}
              width={100}
              height={100}
              alt="3d icon of a guy writing on a notepad with a pencil"
              className="w-32 h-32"
            />
          </span>
          <span className="absolute -bottom-16 [background:radial-gradient(ellipse,_rgba(124,120,20,1)_20%,_transparent_50%)] -z-10 w-[60vw] h-[30vh]"></span>
        </div>

        <section className="mt-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-slate-400">Daily login reward</h3>
            <div className="footerbg flex p-4 justify-between items-center">
              <p className="text-sm">✨ Claim your daily reward</p>
              <span className="footerbg w-8 h-8 !rounded-full flex justify-center items-center">
                →
              </span>
            </div>
          </div>

          <div className="mt-6 footerbg p-2 gap-2 flex flex-col">
            <div className="flex flex-row justify-between items-center footerbg p-4">
              <div className="flex flex-row item-center  gap-4 w-2/3">
                <span className="">
                  <Youtube />
                </span>
                <p className="text-sm">What is sok-coin?</p>
              </div>
              <span className="footerbg w-8 h-8 !rounded-full flex justify-center items-center">
                →
              </span>
            </div>
            <div className="flex flex-row justify-between items-center footerbg p-4">
              <div className="flex flex-row item-center  gap-4 w-2/3">
                <span className="">
                  <Youtube />
                </span>
                <p className="text-sm">What is sok-coin?</p>
              </div>
              <span className="footerbg w-8 h-8 !rounded-full flex justify-center items-center">
                →
              </span>
            </div>
            <div className="flex flex-row justify-between items-center footerbg p-4">
              <div className="flex flex-row item-center  gap-4 w-2/3">
                <span className="">
                  <Youtube />
                </span>
                <p className="text-sm">What is sok-coin?</p>
              </div>
              <span className="footerbg w-8 h-8 !rounded-full flex justify-center items-center">
                →
              </span>
            </div>
            <div className="flex flex-row justify-between items-center footerbg p-4">
              <div className="flex flex-row item-center  gap-4 w-2/3">
                <span className="">
                  <Youtube />
                </span>
                <p className="text-sm">What is sok-coin?</p>
              </div>
              <span className="footerbg w-8 h-8 !rounded-full flex justify-center items-center">
                →
              </span>
            </div>
          </div>
        </section>
      </div>
      <div>
        <FooterNavbar />
      </div>
    </section>
  );
}
