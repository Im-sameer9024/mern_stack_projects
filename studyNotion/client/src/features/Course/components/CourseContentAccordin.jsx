import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const CourseContentAccordion = ({ sections = [] }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Course Content</h2>

      <Accordion type="multiple" className="space-y-2">
        {sections.map((section) => (
          <AccordionItem key={section._id} value={section._id}>
            <AccordionTrigger>{section.name}</AccordionTrigger>

            <AccordionContent>
              {section.subSection?.map((sub) => (
                <div key={sub._id} className="py-2 text-sm text-gray-300">
                  {sub.title}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseContentAccordion;