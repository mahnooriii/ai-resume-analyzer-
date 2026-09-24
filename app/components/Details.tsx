// import { cn } from "~/lib/utils";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionHeader,
//   AccordionItem,
// } from "./Accordian";

// type CategoryTip = {
//   type: "good" | "improve";
//   tip: string;
//   explanation: string;
// };

// const ScoreBadge = ({ score }: { score: number }) => {
//   const isStrong = score > 70;
//   const isGoodStart = score > 39;
//   const badgeClass = isStrong
//     ? "bg-green-100 text-green-700"
//     : isGoodStart
//       ? "bg-yellow-100 text-yellow-700"
//       : "bg-red-100 text-red-700";

//   return (
//     <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold", badgeClass)}>
//       <img
//         src={isStrong ? "/icons/check.svg" : "/icons/warning.svg"}
//         alt=""
//         className="h-4 w-4"
//       />
//       <span>{score}/100</span>
//     </span>
//   );
// };

// const CategoryContent = ({ tips }: { tips: CategoryTip[] }) => (
//   <div className="space-y-4">
//     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//       {tips.map((tip, index) => (
//         <div className="flex items-start gap-2" key={`${tip.tip}-${index}`}>
//           <img
//             src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
//             alt=""
//             className="mt-0.5 h-4 w-4 shrink-0"
//           />
//           <p className="text-sm text-gray-600">{tip.tip}</p>
//         </div>
//       ))}
//     </div>
//     <div className="space-y-2">
//       {tips.map((tip, index) => (
//         <div
//           className={cn(
//             "rounded-lg border p-3 text-sm",
//             tip.type === "good"
//               ? "border-green-200 bg-green-50 text-green-800"
//               : "border-yellow-200 bg-yellow-50 text-yellow-800"
//           )}
//           key={`${tip.explanation}-${index}`}
//         >
//           <p className="font-medium">{tip.tip}</p>
//           <p className="mt-1">{tip.explanation}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const Details = ({ feedback }: { feedback: Feedback }) => {
//   const categories = [
//     { id: "tone-and-style", title: "Tone & Style", ...feedback.toneAndStyle },
//     { id: "content", title: "Content", ...feedback.content },
//     { id: "structure", title: "Structure", ...feedback.structure },
//     { id: "skills", title: "Skills", ...feedback.skills },
//   ];

//   return (
//     <section className="w-full rounded-2xl bg-white p-4 shadow-md">
//       <h2 className="mb-3 text-2xl font-semibold text-gray-900">Review Details</h2>
//       <Accordion defaultOpen="tone-and-style">
//         {categories.map((category) => (
//           <AccordionItem id={category.id} key={category.id}>
//             <AccordionHeader itemId={category.id}>
//               <div className="flex items-center justify-between gap-3">
//                 <p className="font-semibold text-gray-900">{category.title}</p>
//                 <ScoreBadge score={category.score} />
//               </div>
//             </AccordionHeader>
//             <AccordionContent itemId={category.id}>
//               <CategoryContent tips={category.tips} />
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </section>
//   );
// };

// export default Details;



import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordian";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 69
          ? "bg-badge-green"
          : score > 39
          ? "bg-badge-yellow"
          : "bg-badge-red"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p
        className={cn(
          "text-sm font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
            ? "text-badge-yellow-text"
            : "text-badge-red-text"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="score"
              className="size-5"
            />
            <p className="text-xl text-gray-500 ">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4",
              tip.type === "good"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="score"
                className="size-5"
              />
              <p className="text-xl font-semibold">{tip.tip}</p>
            </div>
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;