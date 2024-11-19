import HomeFooter from '@/components/shared/HomeFooter'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Divider } from '@mantine/core'
import { Helmet } from 'react-helmet-async'

const AboutPage = () => {
  //? To force errorboundary page to test
  // useEffect(() => {
  //   throw new Error('This is a test error')
  // }, [])

  return (
    <section className='custom-scrollbar flex-between relative mt-14 flex max-h-screen flex-1 flex-col overflow-y-scroll px-4 pb-4 md:px-10'>
      <Helmet>
        <title>About | Synbox</title>
      </Helmet>

      <div className='mx-auto w-full max-w-6xl'>
        <h1 className='my-8 text-center text-3xl font-bold'>Why Synbox?</h1>
        <Divider my='lg' color='pink' />

        <div className='space-y-6'>
          <p className=' text-pretty text-lg'>
            Many Japanese music videos on YouTube lack proper translations. Even
            when captions are available, they have to be viewed in YouTube’s
            default layout. For non-Japanese speakers, singing along to a song
            can feel almost impossible without romaji, which most music videos
            don’t provide. While fan-made videos sometimes include translations
            and romaji, they cannot be viewed alongside the original music
            video. This gap inspired me to create Synbox — a tool to bridge this
            divide and bring a richer experience to fans of Japanese music.
          </p>

          <p className='text-pretty text-lg'>
            Synbox offers a customizable overlay that displays romaji,
            translations, and even furigana annotations for the original
            Japanese lyrics. It’s designed with learners and enthusiasts like
            myself in mind, allowing users to engage with the lyrics in their
            own way—whether by toggling translations, viewing furigana for
            kanji, or enjoying the original text. With Synbox, fans are no
            longer limited by the availability of translations on artist
            channels or the lack of accessibility in YouTube captions. It
            empowers users to generate and display lyrics their way, preserving
            the essence of the original music video while making it more
            accessible and enjoyable for all.
          </p>
        </div>

        <h1 className='my-8 text-center text-3xl font-bold'>FAQs</h1>
        <Divider my='lg' color='pink' />
        <div className='mb-8'>
          <Accordion type='multiple' className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-lg'>
                How does Synbox work?
              </AccordionTrigger>
              <AccordionContent>
                Synbox is your tool to better experience Japanese music. By
                providing a YouTube URL for a Japanese song, you can generate
                English and Chinese translations as well as romaji annotations,
                making all Japanese songs easier to understand and enjoy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-2'>
              <AccordionTrigger className='text-lg'>
                What videos are supported by Synbox?
              </AccordionTrigger>
              <AccordionContent>
                Synbox supports Japanese music videos available on YouTube that
                are between 1 and 8 minutes long.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-3'>
              <AccordionTrigger className='text-lg'>
                Why is the transcription quality sometimes poor for a song?
              </AccordionTrigger>
              <AccordionContent>
                Transcription quality can be affected by several factors, such
                as the length of the song’s intro, the audio quality of the
                video, and the song’s tempo. While I strive for accuracy, music
                videos that has Japanese lyrics already uploaded tend to yield
                the best results as AI transcription can be unpredictable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-4'>
              <AccordionTrigger className='text-lg'>
                What’s next for Synbox?
              </AccordionTrigger>
              <AccordionContent>
                <div className='space-y-4'>
                  <p className='text-white'>
                    Synbox will be evolving! Here are some features I’m excited
                    to work on in the future:
                  </p>

                  <div className='space-y-2'>
                    <div className='grid gap-1.5'>
                      <h3 className='font-medium'>Core Features</h3>
                      <ul className='list-disc pl-6'>
                        <li>
                          Incorporating channel-uploaded translations for lyrics
                          display
                        </li>
                        <li>
                          Introducing individual user accounts with Google login
                        </li>
                        <li>Expanding support for additional languages</li>
                      </ul>
                    </div>

                    <div className='grid gap-1.5'>
                      <h3 className='font-medium'>User Experience</h3>
                      <ul className='list-disc pl-6'>
                        <li>
                          Making the lyrics overlay draggable for a custom
                          viewing height
                        </li>
                        <li>Adding in-site likes and views counters</li>
                        <li>
                          Highlighting whether a video has generated lyrics in
                          video cards
                        </li>
                        <li>Supporting YouTube playlist imports</li>
                        <li>Introducing automatic re-attempts after errors</li>
                        <li>
                          Enhancing mobile responsiveness for a better
                          experience
                        </li>
                      </ul>
                    </div>

                    <div className='grid gap-1.5'>
                      <h3 className='font-medium'>Technical Improvements</h3>
                      <ul className='list-disc pl-6'>
                        <li>Speeding up processing times</li>
                        <li>Adding batch processing for YouTube playlists</li>
                        <li>
                          Improving error handling with more helpful feedback
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-5'>
              <AccordionTrigger className='text-lg'>
                What is Synbox built with?
              </AccordionTrigger>
              <AccordionContent>
                <div className='space-y-4'>
                  <p className='text-white'>
                    Synbox is a full-stack passion project built with:
                  </p>

                  <div className='space-y-2'>
                    <div className='grid gap-1.5'>
                      <h3 className='font-bold'>Frontend</h3>
                      <ul className='list-disc pl-6'>
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>ShadCN UI</li>
                      </ul>
                    </div>

                    <div className='grid gap-1.5'>
                      <h3 className='font-bold'>Backend</h3>
                      <ul className='list-disc pl-6'>
                        <li>Python (Flask Framework)</li>
                        <li>Appwrite</li>
                      </ul>
                    </div>

                    <div className='grid gap-1.5'>
                      <h3 className='font-bold'>Infrastructure & APIs</h3>
                      <ul className='list-disc pl-6'>
                        <li>Netlify (Frontend hosting)</li>
                        <li>Google Cloud Run (Backend deployment)</li>
                        <li>Google Data API (YouTube integration)</li>
                        <li>
                          OpenAI API (for transcription, translation, and
                          annotation)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <h1 className='my-8 text-center text-3xl font-bold'>Disclaimer</h1>
        {/* <Divider my='lg' color='pink' /> */}
        <p className='pb-2 text-sm'>
          Synbox is a personal project created to help me better understand and
          enjoy Japanese music videos. This is a non-commercial project with no
          monetization, intended solely for personal educational purposes. I
          respect all artists' rights and will promptly remove any content upon
          request from the copyright holders.
        </p>
      </div>

      <HomeFooter />
    </section>
  )
}

export default AboutPage
