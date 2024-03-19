const SongsInfiniteGallery = () => {
  return (
    <section className='flex flex-wrap justify-between'>
      {Array.from({ length: 25 }, (_, index) => (
        //* Repeat this card block for each item
        <div className='w-full sm:w-1/2 lg:w-1/3 mb-4 px-2' key={index}>
          <div className='bg-dark-3 rounded-lg shadow-lg p-4 h-80'>
            {/* <!-- Card content goes here --> */}
          </div>
        </div>
        //* End of card block
      ))}
    </section>
  )
}
export default SongsInfiniteGallery
