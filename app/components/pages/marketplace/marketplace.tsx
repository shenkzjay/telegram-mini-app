import { Cart } from "@/app/assets/svgs/cart";
import { FooterNavbar } from "../../footer/footer";
import Image from "next/image";
import Pig from "@/app/assets/imgs/pig.png";

export function Marketplace() {
  return (
    <main className=" h-screen flex flex-col justify-between">
      <section className="mx-6">
        {/* search */}
        <div className="flex flex-row gap-6 justify-center items-center rounded-xl  mt-6">
          <div className="py-0 px-0 w-full">
            <label className="sr-only">Search for items</label>
            <input
              type="search"
              name="search"
              id="search"
              className="py-2 px-4 w-full rounded-xl footerbg "
              placeholder="search for items..."
            />
          </div>
          <div>
            <button className="text-white relative flex flex-col">
              <Cart />
              <span className="p-1 absolute top-3 left-0 leading-none text-[10px] font-bold text-[#333] rounded-full flex flex-row justify-center items-center bg-orange-400">
                2
              </span>
            </button>
          </div>
        </div>

        <section>
          <div className=" grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 h-[76vh] overflow-auto mt-6 text-white">
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
            <span className=" entryanime grid grid-rows-subgrid row-span-2 p-2 footerbg text-sm font-semibold justify-center">
              <Image src={Pig} width={100} height={100} alt={"product image"} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="font-bold">Shirt - 4.99TON</p>
                <button className="footerbg p-2 text-xs flex justify-center items-center w-full">
                  ＋ Add to cart
                </button>
              </div>
            </span>
          </div>
        </section>
      </section>
      <FooterNavbar />
    </main>
  );
}
