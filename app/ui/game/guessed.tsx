import { Group } from "@/app/_types";
import { getWordColour } from "@/app/_utils";

export default function GuessedCategory(props: { group: Group }) {
  const level = props.group.level;
  const bColour = getWordColour(level);

  const concatItems = props.group.words.join(", ");

  return (
    <div
      className={`flex flex-col items-center col-span-4 py-4 rounded-md ${bColour}`}
    >
      <h1 className="text-black font-bold text-md md:text-lg">
        {props.group.category}
      </h1>
      <h2 className="text-black text-sm md:text-md text-center mx-2">{concatItems}</h2>
    </div>
  );
}