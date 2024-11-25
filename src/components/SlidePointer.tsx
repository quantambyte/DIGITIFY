import { QUESTIONS } from "../constant/Constant";

interface ISelected {
  selected: number;
}

const SlidePointer = ({ selected }: ISelected) => {
  return (
    <div className="flex flex-col gap-2">
      {QUESTIONS.map((question) => (
        <span
          key={question.id}
          className={`${
            selected === question.id ? "bg-transparent" : "bg-white"
          } w-3 h-3 rounded-full  border-white border-[2px]`}
        />
      ))}
    </div>
  );
};

export default SlidePointer;
