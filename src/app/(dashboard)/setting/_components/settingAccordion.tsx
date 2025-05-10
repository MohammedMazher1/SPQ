import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface Props {
  label: string;
  accordionContent: React.ReactNode;
  accordionButton: React.ReactNode;
}
export default function SettingAccordion({
  label,
  accordionContent,
  accordionButton,
}: Props) {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="rounded-md bg-white p-2 shadow-sm"
      >
        <AccordionItem value="item-1">
          <div className="relative">
            <AccordionTrigger className="text-on-surface text-xl font-semibold hover:no-underline">
              {label}
            </AccordionTrigger>
            {accordionButton && (
              <Button
                // size={'accordion'}
                className="absolute left-14 top-1/2 -translate-y-1/2"
              >
                {accordionButton}
              </Button>
            )}
          </div>
          <AccordionContent className="m-0 p-0">
            {accordionContent}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
