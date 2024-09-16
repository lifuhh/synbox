import { Helmet } from 'react-helmet-async'

const AboutPage = () => {
  return (
    <section className='custom-scrollbar mt-14 flex flex-1 flex-col overflow-y-scroll px-4 md:px-10'>
      <Helmet>
        <title>About | Synbox</title>
      </Helmet>
      <div>Hi About Page</div>
    </section>
  )
}
export default AboutPage
