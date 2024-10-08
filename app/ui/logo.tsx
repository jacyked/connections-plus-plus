import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { lusitana, montserrat } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${montserrat.className} flex flex-col items-start leading-none text-white`}
    >
      
      <p className="text-[25px]">Connections++</p>
      
      <p className="text-[12px]">Extreme Difficulty</p>
      </div>
    
  );
}