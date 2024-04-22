import { Spotlight } from '../ui/Spotlight'
import { InfiniteScrollGallery } from './InfiniteScrollGallery'

const sample_data = [
  {
    title: 'Stripe',
    description:
      'A technology company that builds economic infrastructure for the internet.',
    link: 'https://stripe.com',
  },
  {
    title: 'Netflix',
    description:
      'A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
    link: 'https://netflix.com',
  },
  {
    title: 'Google',
    description:
      'A multinational technology company that specializes in Internet-related services and products.',
    link: 'https://google.com',
  },
  {
    title: 'Meta',
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: 'https://meta.com',
  },
  {
    title: 'Amazon',
    description:
      'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    link: 'https://amazon.com',
  },
  {
    title: 'Microsoft',
    description:
      'A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    link: 'https://microsoft.com',
  },
  {
    title: 'Apple',
    description:
      'A multinational technology company that designs, manufactures, and markets consumer electronics, computer software, and online services.',
    link: 'https://apple.com',
  },
  {
    title: 'Twitter',
    description:
      'A social media platform that allows users to post and interact with messages known as "tweets".',
    link: 'https://twitter.com',
  },
  {
    title: 'Facebook',
    description:
      'A social media platform that allows users to post and interact with posts known as "facebook posts".',
    link: 'https://facebook.com',
  },
  {
    title: 'Instagram',
    description:
      'Many people use these now adays to share their photos and videos with their friends and family.',
    link: 'https://instagram.com',
  },
  {
    title: 'TikTok',
    description:
      'Popular social media platform that allows users to share short videos.',
    link: 'https://tiktok.com',
  },
  {
    title: 'Snapchat',
    description:
      'A multimedia messaging app popular for its disappearing messages feature.',
    link: 'https://snapchat.com',
  },
  {
    title: 'LinkedIn',
    description:
      'A business and employment-oriented online service that operates via websites and mobile apps.',
    link: 'https://linkedin.com',
  },
]

const SongsInfiniteGallery = () => {
  return (
    <section className='flex flex-wrap justify-between relative'>
      <Spotlight
        className='-top-80 left-40 md:-left-40 md:top-20 scale-x-[-1]'
        fill='pink'
      />
      <div className='max-w-full mx-auto px-8'>
        <InfiniteScrollGallery items={sample_data} />
      </div>
      {/*  
      {Array.from({ length: 25 }, (_, index) => (
        <div className='w-full sm:w-1/2 lg:w-1/3 mb-4 px-2' key={index}>
          <div className='bg-dark-3 rounded-lg shadow-lg p-4 h-80'>
            // <!-- Card content goes here --> 
          </div>
        </div>
      ))}
    */}
    </section>
  )
}
export default SongsInfiniteGallery
