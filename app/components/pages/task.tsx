import TaskSvg from "@/app/assets/svgs/task";
import { FooterNavbar } from "../footer/footer";
import { Youtube } from "@/app/assets/svgs/youtube";

export function Task() {
  return (
    <section className="h-screen w-full flex flex-col justify-between">
      <div className="text-white mx-6 flex flex-col">
        <div className="flex flex-col justify-center items-center mt-10 gap-4">
          <h3>Task</h3>
          <span className="flex justify-center items-center">
            <TaskSvg />
          </span>
        </div>

        <section className="mt-12">
          <div className="flex flex-col gap-2">
            <h3 className="text-slate-400">Daily login reward</h3>
            <div className="footerbg flex p-4 justify-between items-center">
              <p className="text-sm">✨ Claim your daily reward</p>
              <span className="footerbg w-8 h-8 !rounded-full flex justify-center items-center">
                →
              </span>
            </div>
          </div>

          <div className="mt-12 footerbg p-2 gap-2 flex flex-col">
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