import { Button } from '../ui/button'

const LoginButtonTest = () => {
  return (
    <div className='flex flex-col justify-center items-center py-4'>
      <Button type='submit' className='shad-button_primary '>
        Test again v2
      </Button>
      <p className='py-4'>{`Current State: ${1 + 1}`}</p>
    </div>
  )
}
export default LoginButtonTest
