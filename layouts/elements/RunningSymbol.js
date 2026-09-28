
import Image from "next/image";
import Marquee from "react-fast-marquee";
const RunningSymbol = () => {
    return (
       <div className="w-full py-10">
          <div className="flex-row flex gap-5">
        <Marquee autoFill={true} direction="right">
          <div className="flex flex-row items-center px-5">
            <div className="w-[300px] h-[200px] items-center justify-center">
              <Image
                src="/images/home/logoSymbolRunning.png"
                width={1000}
                height={1000}
                className="opacity-25"
                alt="Nusa Quanta"
              />
            </div>
           
          </div>
          
          </Marquee>
          </div>
       </div> 
    );
};

export default RunningSymbol;