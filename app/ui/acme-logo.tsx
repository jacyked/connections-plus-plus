import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana, montserrat } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${montserrat.className} flex flex-col items-start justify-end leading-none text-white`}
    >
      <p className="text-[25px] justify-center">Connections++</p>
      <p className="text-[16px] ">Extreme Difficulty</p>
    </div>
  );
}
