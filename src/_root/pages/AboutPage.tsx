import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Divider } from '@mantine/core'
import React from 'react'
import { Helmet } from 'react-helmet-async'

const AboutPage = () => {
  return (
    <section className='custom-scrollbar mt-14 flex flex-1 flex-col overflow-y-scroll px-4 md:px-10'>
      <Helmet>
        <title>About | Synbox</title>
      </Helmet>

      <div className='mx-auto w-full max-w-4xl'>
        <h1 className='my-8 text-center text-4xl font-bold'>Why Synbox?</h1>
        <div className='space-y-6'>
          <p className='text-justify'>
            Paragraph 1 Paragraph 1 Paragraph 1 Paragraph 1 Paragraph 1
            Paragraph 1 Paragraph 1 Paragraph 1 Paragraph 1 Paragraph 1
            Paragraph 1 Paragraph 1 Paragraph 1
          </p>

          <p className='text-justify'>
            Paragraph 2 Paragraph 2 Paragraph 2 Paragraph 2 Paragraph 2
            Paragraph 2 Paragraph 2 Paragraph 2 Paragraph 2 Paragraph 2
            Paragraph 2 Paragraph 2 Paragraph 2
          </p>
        </div>
        <Divider my='lg' color='pink' />
        <h1 className='my-8 text-center text-4xl font-bold'>FAQs</h1>
        <div className='my-8'>
          <Accordion type='multiple' className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Accordion 1</AccordionTrigger>
              <AccordionContent>Accordion 1</AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-2'>
              <AccordionTrigger>Accordion 2</AccordionTrigger>
              <AccordionContent>Accordion 2</AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-3'>
              <AccordionTrigger>Accordion 3</AccordionTrigger>
              <AccordionContent>Accordion 3</AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-4'>
              <AccordionTrigger>Accordion 4</AccordionTrigger>
              <AccordionContent>Accordion 4</AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-5'>
              <AccordionTrigger>Accordion 5</AccordionTrigger>
              <AccordionContent>Accordion 5</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
